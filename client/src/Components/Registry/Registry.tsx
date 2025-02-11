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
    if (location.pathname === "/crm") {
      navigate(`/crm/show/${rowId}`); // Навигация на нужный путь
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

    // <div className="flex-table-body">
    //   {rows?.map((row: any[], rowIndex: React.Key | null | undefined) => (
    //     <Link
    //       key={rowIndex}
    //       to={`${location.pathname === "/crm" ? `/crm/show/${row[0]}` : "#"}`}
    //     >
    //       {/* Используем id для навигации */}
    //       <div className="flex-row">
    //         {row.slice(1).map(
    //           (
    //             cell,
    //             cellIndex // Пропускаем id, чтобы не отображать его в таблице
    //           ) => (
    //             <div key={cellIndex} className="flex-cell">
    //               <p
    //                 className={
    //                   cell === status.active
    //                     ? "active-status"
    //                     : cell === status.inactive
    //                     ? "inactive-status"
    //                     : ""
    //                 }
    //               >
    //                 {cell}
    //               </p>
    //             </div>
    //           )
    //         )}
    //       </div>
    //     </Link>
    //   ))}
    // </div>
  );
};

export default Registry;
