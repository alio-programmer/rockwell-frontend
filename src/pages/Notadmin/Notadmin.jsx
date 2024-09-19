import React from "react";

const Notadmin = () => {
  const handlebutton = () => {
    window.location.href = "/home";
  };
  return (
    <div className=" container">
      <h1 className=" text-3xl font-extrabold">
        This page is only accessible to Admins
      </h1>
      <button
        onClick={handlebutton}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded-xl"
      >
        Return Home
      </button>
    </div>
  );
};

export default Notadmin;
