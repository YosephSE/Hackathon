import React from "react";
import api from "../../api/vents";
import { useNavigate } from "react-router-dom";

function MyVent({ id, img, title, handleChange }) {
  const navigate = useNavigate();

  const editVent = async () => {
    navigate(`/editblog/${id}`);
  };

  const deleteVent = async () => {
    handleChange(true);
    try {
      await api.delete(`/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center m-3">
      <div className="bg-white flex mx-3 my-2 rounded-xl w-[90] sm:w-[80%] md:w-3/5 lg:w-1/2">
        <div className="flex items-center flex-grow">
          <p className="title p-3 font-semibold cursor-pointer items-center">
            {title}
          </p>
        </div>
        <div className="buttons flex flex-row ml-auto min-h-32">
          <button
            className="bg-white w-14 py-2 rounded-lg my-auto mx-1 border-black border-2"
            onClick={editVent}
          >
            Edit
          </button>
          <button
            className="bg-black text-white w-14 py-2 rounded-lg mx-1 my-auto border-black border-2 mr-2"
            onClick={deleteVent}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyVent;
