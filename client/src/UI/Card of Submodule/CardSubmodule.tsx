import React from "react";
import "./CardSubmodule.css";
import { useNavigate } from "react-router";
import { SubModulesListScheme } from "../../routes/PrimaryDocs/PrimaryDocs";

interface TProps {
  item: SubModulesListScheme;
}

const CardSubmodule = ({ item }: TProps) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(item.link)} className="card-submodule">
      <div className="image">
        <img src={item?.image} alt="" />
      </div>
      <div className="title">
        <p>{item?.title}</p>
      </div>
    </div>
  );
};

export default CardSubmodule;
