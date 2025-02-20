import { useMutation, useQuery } from "@tanstack/react-query";
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
import { updateContractById } from "../../../../API/services/contracts/updateContractById";
import { getContractById } from "../../../../API/services/contracts/getContractById";
import FileList from "../../../../Components/File Service/File Service File List/FileList";

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

  // GET CONTRACT BY ID

  const getContractByIdQuery = useQuery(
    {
      queryFn: () => getContractById(contractId ? contractId : 0),
      queryKey: [`contracts-${contractId}`],
    },
    queryClient
  );

  const [contract, setContract] = useState<ContractsScheme | null>(null);

  useEffect(() => {
    if (getContractByIdQuery.status === "success") {
      setContract(getContractByIdQuery.data);
    } else if (getContractByIdQuery.status === "error") {
      console.error(getContractByIdQuery.error);
    }
  }, [getContractByIdQuery]);

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

  console.log(contract);

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

  const contractState =
    typeof contract?.state === "string" && parseInt(contract.state) > 1;

  const { setRefs, scrollTo } = useScroll();

  useEffect(() => {
    if (!contractState) scrollTo("contracts");
  }, [contract]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    if (containerRef.current) {
      const totalHeight = containerRef.current.scrollHeight;
      setNumPages(Math.ceil(totalHeight / 950));
    }
  }, [contract?.htmlContent ? contract?.htmlContent : textOfDoc]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleRefreshFile = () => {
    setTextOfDoc("");
  };

  const updateContractByIdMutate = useMutation<any, Error>({
    mutationFn: (data) => updateContractById(data),
    onSuccess: () => {
      // const contractId = variables.get("id");
      queryClient.invalidateQueries({ queryKey: [`contracts-${contractId}`] });
      // navigate(`/primary-docs/contracts/show/${contractId}`);
    },
    onError: (error) => {
      console.error("Ошибка при обновлении договора:", error.message);
    },
  });

  const handleUpdateData = () => {
    updateContractByIdMutate.mutate({
      contractId: contractId,
      htmlContent: textOfDoc,
    });
  };

  const showContract = contract?.htmlContent
    ? contract?.htmlContent
    : textOfDoc;

  console.log(contractState);

  useEffect(() => {
    if (!contractState) scrollTo("docViewer");
  }, [showContract]);

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
      <section ref={setRefs("contracts")} className="section">
        {contract?.htmlContent ? (
          <FileList />
        ) : (
          <InputFile
            disabled={contract?.htmlContent ? true : false}
            handleFileUpload={handleFileUpload}
          />
        )}

        {/* <input type="file" onChange={handleFileUpload} accept=".docx" /> */}
        {showContract && (
          <div className="doc-viewer">
            <div className="doc-container" ref={containerRef}>
              <div
                className="doc-content"
                style={{
                  transform: `translateY(-${currentPage * 950}px)`,
                }}
                dangerouslySetInnerHTML={{ __html: showContract }}
              />
            </div>
            <div className="wrapper-doc-viewer-buttons">
              <div className="panel-control-doc-viewer">
                <Button
                  disabled={contract?.htmlContent ? true : false}
                  onClick={handleUpdateData}
                  variant="contained"
                >
                  Подтвердить
                </Button>
                <Button
                  disabled={contract?.htmlContent ? true : false}
                  onClick={handleRefreshFile}
                  variant="contained"
                >
                  Удалить файл
                </Button>
              </div>
              <div ref={setRefs("docViewer")} className="pagination-controls">
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
          </div>
        )}
      </section>
      {contractState && (
        <>
          <TitleSection title="Соглосование" />
          <section></section>
        </>
      )}
    </main>
  );
};

export default ShowContracts;
