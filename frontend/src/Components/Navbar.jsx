import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-[8vh]  shadow-sm flex sticky top-0 z-10 backdrop-blur-lg justify-center items-center ">
      <div className="text-2xl flex  gap-4 ">
        <Link className="cursor-pointer font-semibold p-2" to="/">Home</Link>
        <Link className="cursor-pointer font-semibold   p-2 rounded-full" to="/update/:id">Create</Link>
      </div>
    </div>
  );
};

export default Navbar;
