import React from "react";
import "./FilterElement.css";
import { DataFilterType } from "../../../API/data/dataFilter";

interface TProps {
  item: DataFilterType;
}

const FilterElement = ({ item }: TProps) => {
  return (
    <li>
      <p>
        {item.title}: <span>Все</span>
      </p>
    </li>
  );
};

export default FilterElement;
