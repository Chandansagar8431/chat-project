import { React, useState } from "react";
import Navbar from "../Navbar/Navbar";

const Homepage = ({ mode, handlemode }) => {
  return (
    <div>
      <Navbar mode={mode} handlemode={handlemode} />
    </div>
  );
};

export default Homepage;
