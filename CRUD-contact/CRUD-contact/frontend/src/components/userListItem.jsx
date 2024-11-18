/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import ExpandeblePanel from "./ExpandeblePanel";
import { deleteUser } from "../store/thunks/deleteuser";
import { useDispatch } from "react-redux";

const UserListItem = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEditUser = () => {
    navigate(`/edituser/${user.id}`);
  };
  const onDeleteUser = () => {
    dispatch(deleteUser(user.id));
  };
  return (
    <>
      <ExpandeblePanel user={user}>
        <div className="flex flex-row justify-between">
          <div>
            <p> NAME:</p> <div>{user.first_name}</div>
          </div>
          <div>
            <p> CONTECT:</p> <div>{user.phone_number}</div>
          </div>
          <div>
            <p> EMAIL:</p> <div>{user.email}</div>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white rounded-md px-3 py-1"
              onClick={onEditUser}
            >
              Edit
            </button>
          </div>
          <div>
            <button
              className="bg-red-500 text-white rounded-md px-3 py-1"
              onClick={onDeleteUser}
            >
              Delete
            </button>{" "}
          </div>
        </div>
      </ExpandeblePanel>
    </>
  );
};

export default UserListItem;
