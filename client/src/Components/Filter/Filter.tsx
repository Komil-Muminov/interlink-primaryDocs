import React from "react";
import "./Filter.css";
import { DataFilterType } from "../../API/data/dataFilter";
import FilterElement from "./FilterElement/FilterElement";

interface TProps {
  data: DataFilterType[];
}

const Filter = ({ data }: TProps) => {
  return (
    <ul className="wrapper-filter">
      {data.map((e) => {
        return <FilterElement item={e} />;
      })}
    </ul>
  );
};

export default Filter;
