import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { queryClient } from "../../../../API/hooks/queryClient";
import { OrganizationScheme } from "../../../../API/services/organizations/OrganizationScheme";
import { getOrganizationById } from "../../../../API/services/organizations/getOrganizationById";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import TitleSection from "../../../../UI/Title of Section/TitleSection";

import "./ShowContracts.css";
import OrganizationCard from "../../../../UI/Card/Organization Card/OrganizationCard";
import UserCard from "../../../../UI/Card/User Card/UserCard";
import { getOrganizations } from "../../../../API/services/organizations/getOrganizations";
import { ContractsScheme } from "../../../../API/services/contracts/ContractsScheme";
import { getContracts } from "../../../../API/services/contracts/getContracts";

import { renderAsync } from "docx-preview";
import { useScroll } from "../../../../API/hooks/useScroll";
import { Button } from "@mui/material";
import InputFile from "../../../../Components/File Service/File Service Input File/InputFile";

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

  const { setRefs, scrollTo } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollTo("contacts");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    if (containerRef.current) {
      const totalHeight = containerRef.current.scrollHeight;
      setNumPages(Math.ceil(totalHeight / 950));
    }
  }, [textOfDoc]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <main className="show-contracts">
      <TitleSection title={organizationsById ? organizationsById?.name : ""} />
      <PanelControl editButtonState={false} saveButtonState={true} />
      <TitleSection title="Карточка организации" />
      <section>
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
        <InputFile handleFileUpload={handleFileUpload} />
        {/* <input type="file" onChange={handleFileUpload} accept=".docx" /> */}
        {textOfDoc && (
          <div className="doc-viewer">
            <div className="doc-container" ref={containerRef}>
              <div
                className="doc-content"
                style={{
                  transform: `translateY(-${currentPage * 950}px)`,
                }}
                dangerouslySetInnerHTML={{ __html: textOfDoc }}
              />
            </div>
            <div className="pagination-controls">
              <Button
                variant="contained"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                Назад
              </Button>

              <span>
                Страница {currentPage + 1} из {numPages}
              </span>
              <Button
                variant="contained"
                onClick={nextPage}
                disabled={currentPage === numPages - 1}
              >
                Вперёд
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ShowContracts;
