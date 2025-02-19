import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { queryClient } from "../../../../API/hooks/queryClient";
import { OrganizationScheme } from "../../../../API/services/organizations/OrganizationScheme";
import { getOrganizationById } from "../../../../API/services/organizations/getOrganizationById";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import TitleSection from "../../../../UI/Title of Section/TitleSection";
import Orgcard from "../../../../UI/Card of Organization/Orgcard/Orgcard";
import Registry from "../../../../components/Registry/Registry";
import "./ShowContracts.css";
import OrganizationCard from "../../../../UI/Card/Organization Card/OrganizationCard";
import UserCard from "../../../../UI/Card/User Card/UserCard";
import { getOrganizations } from "../../../../API/services/organizations/getOrganizations";
import { ContractsScheme } from "../../../../API/services/contracts/ContractsScheme";
import { getContracts } from "../../../../API/services/contracts/getContracts";
// import CardOrganization from "../../../UI/Card of Organization/CardOrganization";
// import { getOrganizations } from "../../../API/services/organizations/getOrganizations";
// import { dataFilter } from "../../../API/data/dataFilter";

// import Mammoth from "mammoth";

import { renderAsync } from "docx-preview";
import { useScroll } from "../../../../API/hooks/useScroll";

const ShowContracts = () => {
  const { id: contractId } = useParams();

  // GET ORGANIZATIONS

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

  // GET CONTRACTS

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

  const contract = contracts.find((contract) => contract.id === contractId);

  const orgId = contract?.orgId;

  const getOrganizationByIdQuery = useQuery(
    {
      queryFn: () => getOrganizationById(orgId ? orgId : 0),
      queryKey: [`organizations-${orgId}`],
    },
    queryClient
  );

  const [organizationsById, setOrganizationsById] =
    useState<OrganizationScheme | null>(null);

  useEffect(() => {
    if (getOrganizationByIdQuery.status === "success") {
      setOrganizationsById(getOrganizationByIdQuery.data);
    } else if (getOrganizationByIdQuery.status === "error") {
      console.error(getOrganizationByIdQuery.error);
    }
  }, [getOrganizationByIdQuery]);

  // PARSER DOCX-PREVIEW

  const [textOfDoc, setTextOfDoc] = useState<string>("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".docx")) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const container = document.createElement("div"); // Временный контейнер для рендера
        await renderAsync(arrayBuffer, container);
        setTextOfDoc(container.innerHTML); // Записываем сгенерированный HTML
      };
      reader.readAsArrayBuffer(file);
    }
  };

  console.log(textOfDoc);

  const { setRefs, scrollTo } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollTo("contacts");
    }, 100);
    return () => clearTimeout(timer); // Очистка таймера
  }, []);

  // PARSER MAMMOTH

  // const [textOfDoc, setTextOfDoc] = useState<string>("");

  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.name.endsWith(".docx")) {
  //     const reader = new FileReader();
  //     reader.onload = async (e) => {
  //       const arrayBuffer = e.target.result;
  //       const result = await Mammoth.convertToHtml({
  //         arrayBuffer,
  //         styleMap: [
  //           "p => p:fresh",
  //           "strong => strong",
  //           "em => em",
  //           "u => u",
  //           "h1 => h1",
  //           "h2 => h2",
  //           "h3 => h3",
  //           "h4 => h4",
  //           "h5 => h5",
  //           "h6 => h6",
  //           "p[style-name='Normal'] => p.normal",
  //           "p[style-name='Heading 1'] => h1",
  //           "p[style-name='Heading 2'] => h2",
  //           "p[style-name='Heading 3'] => h3",
  //           "p[style-name='Heading 4'] => h4",
  //           "p[style-name='Heading 5'] => h5",
  //           "p[style-name='Heading 6'] => h6",
  //         ],
  //       });
  //       setTextOfDoc(result.value.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")); // Заменяем табы
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  return (
    <main className="show-contracts">
      <TitleSection title={organizationsById ? organizationsById?.name : ""} />
      <PanelControl editButtonState={false} saveButtonState={true} />
      <TitleSection title="Карточка организации" />
      <section>
        {/* <CardOrganization item={organizationsById} /> */}
        {/* <Orgcard
          data={organizationsById}
          orgName="km"
          orgType="bo"
          orgInn="1123"
          orglocation="испечак 2"
          directorName="km"
          headAccountantName="km"
        /> */}
        <div className="contracts__docs-content">
          {/* <CardOrganization item={getOrgByTin} /> */}
          <OrganizationCard data={organizationsById} />
          <div className="contracts__docs-ucard">
            <UserCard
              id="1"
              fullname="Рохбар Рохбаров"
              position="Руководитель"
            />
            <UserCard
              id="2"
              fullname="Сармухосиб Сармухосибев"
              position="Бухгалтер"
            />
          </div>
        </div>
      </section>
      <TitleSection title="Договор" />
      <section ref={setRefs("contacts")} className="section">
        <input type="file" onChange={handleFileUpload} accept=".docx" />
        <div
          dangerouslySetInnerHTML={{ __html: textOfDoc }}
          className="text-of-doc"
        />
      </section>
    </main>
  );
};

export default ShowContracts;
