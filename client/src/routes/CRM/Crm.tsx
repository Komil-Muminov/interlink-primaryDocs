import React, { useEffect, useState } from "react";
import "./Crm.css";
import Filter from "../../components/Filter/Filter";
import { dataFilter } from "../../API/data/dataFilter";
import Registry from "../../components/Registry/Registry";
import { Link } from "react-router";
import { getOrganizations } from "../../API/services/organizations/getOrganizations";
import { queryClient } from "../../API/hooks/queryClient";
import { useQuery } from "@tanstack/react-query";
import { OrganizationScheme } from "../../API/services/organizations/OrganizationScheme";

const Crm = () => {
  const [organizations, setOrganizations] = useState<OrganizationScheme[]>([]);

  const getOrganizationsQuery = useQuery(
    {
      queryFn: () => getOrganizations(),
      queryKey: ["organizations"],
    },
    queryClient
  );

  useEffect(() => {
    if (getOrganizationsQuery.status === "success") {
      setOrganizations(getOrganizationsQuery.data);
    }
  }, [getOrganizationsQuery.data]);

  const headers = dataFilter
    .filter((e) => {
      return [
        "Номер списка",
        "Идентификатор",
        "Наименование",
        "ИНН организации",
        "Тип организации",
        "Статус",
      ].includes(e.title);
    })
    .map((e) => e.title);

  const rows = organizations.map((org: OrganizationScheme, index) => [
    org.id, // Добавляем id в начало строки, но не отображаем его
    index + 1, // Номер списка
    org.identificator, // Идентификатор
    org.name, // Наименование
    org.tax, // ИНН организации
    org.orgType, // Тип организации
    org.status, // Статус
  ]);

  return (
    <main className="submodule-crm">
      <section>
        <h1 className="module-title">Реестр</h1>
        <div className="panel-control-filter">
          <Filter data={dataFilter} />
          <Link to="/crm/create">
            <button>Добавить</button>
          </Link>
        </div>
      </section>
      <section>
        <Registry
          headersProps={headers}
          rowsProps={rows}
          status={{ active: "Активный", inactive: "Неактивный" }}
        />
      </section>
    </main>
  );
};

export default Crm;
