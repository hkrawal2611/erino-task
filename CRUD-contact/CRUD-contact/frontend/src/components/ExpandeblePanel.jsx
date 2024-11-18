/* eslint-disable react/prop-types */
import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

const ExpandeblePanel = ({ user, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center ">
        <div className="flex flex-row items-center">{user.name}</div>
        <div>
          <button onClick={handleClick}>
            {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
          </button>
        </div>
      </div>
      {isExpanded && <div className="p-2 border-t"> {children}</div>}
    </div>
  );
};

export default ExpandeblePanel;
