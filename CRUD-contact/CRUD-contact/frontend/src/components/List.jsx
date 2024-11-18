import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store/index";
import Skeleton from "./skeleton";
import { useThunks } from "../hooks/use-thunks";
import UserListItem from "./userListItem";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const onAddContact = () => {
    navigate("/addContact");
  };

  const [doFetchUsers, isLoading, isError] = useThunks(fetchUsers);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const { data } = useSelector((state) => {
    return state.users;
  });
  let content;
  if (isLoading) {
    content = (
      <div>
        <Skeleton times={6} className="h-10 w-full" />
      </div>
    );
  } else if (isError) {
    content = <div>SOMETHING WENT WRONG....</div>;
  } else {
    if (data && data.data && data.data.contacts)content = data.data.contacts.map((x) => {
      return <UserListItem key={x.id} user={x} />;
    });
  }
  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Contacts</h1>
        <button className="bg-blue-500 rounded-md h-8" onClick={onAddContact}>
          ADD CONTACT
        </button>
      </div>
      {content}
    </div>
  );
};

export default List;
