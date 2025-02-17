import React from "react";
import "./NavigationSubmodules.css";

const NavigationSubmodules = () => {
  const submodulesList = [
    "Договоры",
    "Счет-фактуры",
    "Доверенность",
    "Накладные",
    "Командировочные расходы",
    "Акт выполенных работ",
  ];

  return (
    <ul className="submodules-list">
      {submodulesList.map((e, index) => {
        return (
          <li className={e === "Договоры" ? "active" : ""} key={index}>
            {e}
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationSubmodules;
