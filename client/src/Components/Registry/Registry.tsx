import React from "react";
import "./Registry.css";
import { useLocation, useNavigate } from "react-router";
import { statusOfDocument } from "../../API/data/statusOfDocument";

interface TProps {
  headersProps: string[];
  rowsProps: any;
}

const Registry = ({ headersProps, rowsProps }: TProps) => {
  const headers = headersProps;
  const rows = rowsProps;
  const location = useLocation();
  const navigate = useNavigate();

  const handleRowClick = (rowId: string) => {
    if (location.pathname === "/primary-docs/contracts") {
      navigate(`/primary-docs/contracts/show/${rowId}`);
    }
  };

  return (
    <table className="registry">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row: any[], rowIndex: React.Key | null | undefined) => (
          <tr key={rowIndex} onClick={() => handleRowClick(row[0])}>
            {row.slice(1).map((cell, cellIndex) => {
              const status = statusOfDocument.find(
                (s) => s.statusCode === cell
              );
              const statusClass = status
                ? `status-${status.statusClass.toLowerCase()}`
                : "";

              return (
                <td key={cellIndex}>
                  <p className={statusClass}>
                    {status ? status.statusName : cell}
                  </p>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Registry;
