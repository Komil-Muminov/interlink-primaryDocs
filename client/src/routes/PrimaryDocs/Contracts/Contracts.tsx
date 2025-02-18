import React, { useEffect, useState } from "react";
import Filter from "../../../components/Filter/Filter";
import { dataFilter } from "../../../API/data/dataFilter";
import Registry from "../../../components/Registry/Registry";
import { Link, Outlet } from "react-router";
import { getOrganizations } from "../../../API/services/organizations/getOrganizations";
import { queryClient } from "../../../API/hooks/queryClient";
import { useQuery } from "@tanstack/react-query";
import { OrganizationScheme } from "../../../API/services/organizations/OrganizationScheme";
import "../PrimaryDocs.css";
import "./Contracts.css";
import NavigationSubmodules from "../../../UI/Navigation of Modules/NavigationOfModules";
import { ContractsScheme } from "../../../API/services/contracts/ContractsScheme";
import { getContracts } from "../../../API/services/contracts/getContracts";

const Contracts: React.FC = () => {
  const [contracts, setContracts] = useState<ContractsScheme[]>([]);

  const getContractsQuery = useQuery(
    {
      queryFn: () => getContracts(),
      queryKey: ["contracts"],
    },
    queryClient
  );

  useEffect(() => {
    if (getContractsQuery.status === "success") {
      setContracts(getContractsQuery.data);
    }
  }, [getContractsQuery.data]);

  const headers = dataFilter
    .filter((e) => {
      return [
        "Номер списка",
        "Номер договора",
        "Дата",
        "Поставщик",
        "Получатель",
        "Статус",
        "Сумма",
      ].includes(e.title);
    })
    .map((e) => e.title);

  const rows = contracts.map((contract: ContractsScheme, index) => [
    contract.id, // Добавляем id в начало строки, но не отображаем его
    index + 1, // Номер списка
    "118", // Номер договора
    contract.date, // Дата
    contract.supplier, // Поставщик
    contract.receiver, // Получатель
    contract.sum,
    contract.state, // Статус
  ]);

  interface SubModulesListScheme {
    id: number;
    title: string;
    link: string;
  }

  const submodulesList: SubModulesListScheme[] = [
    {
      id: 1,
      title: "Договоры",
      link: "/primary-docs/contracts",
    },
    {
      id: 2,
      title: "Счет-фактуры",
      link: "/primary-docs/invoices",
    },
    {
      id: 3,
      title: "Доверенность",
      link: "/primary-docs/overhead",
    },
    {
      id: 4,
      title: "Накладные",
      link: "/primary-docs/power-of-attorney",
    },
    {
      id: 5,
      title: "Командировочные расходы",
      link: "/primary-docs/travel-expenses",
    },
    {
      id: 6,
      title: "Акт выполенных работ",
      link: "/primary-docs/certificate-of-completion-of-work",
    },
  ];

  return (
    <main className="submodule-contracts">
      <NavigationSubmodules list={submodulesList} currentList="Договоры" />
      <section>
        <h1 className="module-title">Реестр</h1>
        <div className="panel-control-filter">
          <Filter data={dataFilter} />
          <Link to="create">
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

export default Contracts;
