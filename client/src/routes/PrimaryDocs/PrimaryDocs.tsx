import React from "react";
import "./PrimaryDocs.css";
import { Outlet } from "react-router";

const PrimaryDocs = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrimaryDocs;
