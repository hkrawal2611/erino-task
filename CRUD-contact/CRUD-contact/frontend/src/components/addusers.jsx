import { Formik } from "formik";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useThunks } from "../hooks/use-thunks";
import { addUsers, editUser } from "../store";
import axios from "axios";

const Addusers = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from the route
  const [doCreateUser] = useThunks(addUsers);
  const [doEditUser] = useThunks(editUser);

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    if (userId) {
      axios
          .get(`http://localhost:4000/contact/${userId}`)
          .then((res) => {
              console.log(res)
            setInitialValues({
                name: res.data.data.first_name,
                email: res.data.data.email,
                contact: res.data.data.phone_number
            });
          })
          .catch((err) => {
            console.error("Failed to fetch user:", err);
          });
    }
  }, [userId]);

  const handleSubmit = async (values) => {
    try {
      if (userId) {
        await doEditUser({ id: userId, ...values }); // Edit user
      } else {
        await doCreateUser(values); // Add user
      }
      navigate("/"); // Redirect after submission
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.contact) errors.contact = "Contact is required";
    return errors;
  };

  return (
      <>
        <button
            className="bg-blue-500 rounded-md h-8"
            onClick={() => navigate("/")}
        >
          USER LIST
        </button>
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validate={validate}
            onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
              <Form onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <label>Name</label>
                  <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className="border border-black"
                  />
                  {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <label>Email</label>
                  <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="border border-black"
                  />
                  {errors.email && <div className="text-red-500">{errors.email}</div>}
                </div>
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <label>Contact</label>
                  <input
                      type="tel"
                      name="contact"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contact}
                      className="border border-black"
                  />
                  {errors.contact && <div className="text-red-500">{errors.contact}</div>}
                </div>

                <button type="submit" className="bg-blue-500 rounded-md h-8">
                  {userId ? "UPDATE USER" : "ADD USER"}
                </button>
              </Form>
          )}
        </Formik>
      </>
  );
};

export default Addusers;
