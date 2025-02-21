import React from "react";
import "./MoreOrgInfo.css";

import { IconButton } from "@mui/material";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";

const MoreOrgInfo = ({ handleClick, data }: any) => {
  return (
    <div className="more-wrapper-info">
      <div className="info-navigate">
        <IconButton onClick={() => handleClick(false, "moreOrgInfo")}>
          <ArrowCircleLeftOutlinedIcon sx={{ fontSize: "35px" }} />
        </IconButton>
        <p className="title">{data?.name}</p>
      </div>
      <ul className="info-list">
        <li>
          <ul className="more-info-list">
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
          </ul>
        </li>
        <li>
          <ul className="more-info-list">
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
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                Единица учета: <span>{data?.unitAccountingTer}</span>
              </p>
            </li>
          </ul>
        </li>
        <li>
          <ul className="more-info-list">
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                ГРБС (Ответственный): <span>{data?.grbsResonsible}</span>
              </p>
            </li>
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                ГРБС: <span>{data?.grbs}</span>
              </p>
            </li>
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                ПБС: <span>{data?.pbs}</span>
              </p>
            </li>
            <li>
              <DatasetOutlinedIcon sx={{ color: "#313131" }} />
              <p>
                Бюджетные заявки: <span>{data?.bz}</span>
              </p>
            </li>
          </ul>
        </li>
        <li>
          <DatasetOutlinedIcon sx={{ color: "#313131" }} />
          <p>
            Реквизиты: <span>{data?.details}</span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default MoreOrgInfo;
