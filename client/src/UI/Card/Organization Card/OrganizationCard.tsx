import React from "react";
import "./OrganizationCard.css";

import orgCardImage from "../../../assets/organization-card-image-1.png";
import { Button } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import { OrganizationScheme } from "../../../API/services/organizations/OrganizationScheme";

interface TProps {
  data: OrganizationScheme;
  handleClick: (state: boolean) => void;
  target?: string;
}

const OrganizationCard = ({ data, handleClick, target }: TProps) => {
  return (
    <div className="organization-card">
      <div className="wrapper-image"></div>
      <div className="content">
        <div className="wrapper-info">
          <p className="title">{data?.name}</p>
          <ul className="info-list">
            <li>
              <CorporateFareOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                Тип организации: <span>{data?.orgType}</span>
              </p>
            </li>
            <li>
              <ArticleOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                ИНН: <span>{data?.tax}</span>
              </p>
            </li>
            <li>
              <Grid3x3OutlinedIcon sx={{ color: "#313131" }} />
              <p>
                Идентификатор: <span>{data?.identificator}</span>
              </p>
            </li>
            <li>
              <DocumentScannerOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                Номер договора: <span>{data?.docNo}</span>
              </p>
            </li>
            <li>
              <CalendarMonthOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                Дата договора: <span>{data?.dateDoc?.toString()}</span>
              </p>
            </li>
            <li>
              <HomeOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                Адрес: <span>{data?.address}</span>
              </p>
            </li>
            <li>
              <TerrainOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                Код территории: <span>{data?.terCode}</span>
              </p>
            </li>
            {/* <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>Единица учета: </p>
            </li>
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>ГРБС (Ответственный): </p>
            </li>
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>ГРБС: </p>
            </li>
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>ПБС: </p>
            </li>
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>Бюджетные заявки: </p>
            </li>
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>Реквизиты: </p>
            </li> */}
          </ul>
        </div>
        <div className="panel-control">
          <Button
            onClick={() => handleClick(true, target)}
            variant="contained"
            sx={{}}
          >
            Подробнее
          </Button>
          <Button variant="contained">Структура</Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;
