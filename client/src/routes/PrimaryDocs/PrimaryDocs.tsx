import React from "react";
import "./PrimaryDocs.css";
import { Outlet } from "react-router";
import NavigationSubmodules from "../../UI/Navigation of Submodules/NavigationSubmodules";

const PrimaryDocs = () => {
  return (
    <main>
      <NavigationSubmodules />
      <div className="wrapper-submodules-card">
        
      </div>
    </main>
  );
};

export default PrimaryDocs;
