import React from "react";
import "./Registry.css";
import { dataFilter } from "../../API/data/dataFilter";
import { OrganizationScheme } from "../../API/services/organizations/OrganizationScheme";
import { Link, useLocation, useNavigate } from "react-router";

interface TProps {
  headersProps: string[];
  rowsProps: any;
  status: any;
}

const Registry = ({ headersProps, rowsProps, status }: TProps) => {
  const headers = headersProps;

  const rows = rowsProps;

  const location = useLocation();

  const navigate = useNavigate();

  const handleRowClick = (rowId: string) => {
    if (location.pathname === "/primary-docs/contracts") {
      navigate(`/primary-docs/contracts/show/${rowId}`); // Навигация на нужный путь
    }
  };

  return (
    <table className="registry">
      <thead>
        <tr>
          {headers.map((headers, index) => {
            return <th key={index}>{headers}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row: any[], rowIndex: React.Key | null | undefined) => (
          <tr
            key={rowIndex}
            onClick={() => handleRowClick(row[0])} // Передаем id для навигации
          >
            {row.slice(1).map((cell, cellIndex) => (
              <td key={cellIndex}>
                <p
                  className={
                    cell === status.active
                      ? "active-status"
                      : cell === status.inactive
                      ? "inactive-status"
                      : ""
                  }
                >
                  {cell}
                </p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Registry;
