import React from "react";
import "./CardOrganization.css";
import { OrganizationScheme } from "../../API/services/organizations/OrganizationScheme";

interface TProps {
  item: OrganizationScheme;
}

const CardOrganization = ({ item }: TProps) => {
  return (
    <div className="card-organization">
      <div className="organization-info">
        <p className="organization-info__title">Информация об организации</p>
        <div className="data-info">
          <p>
            Имя организации: <span>{item?.name}</span>
          </p>
          <p>
            ИНН: <span>{item?.tax}</span>
          </p>
          <p>
            Идентификатор: <span>{item?.identificator}</span>
          </p>
          <p>
            Номер договора: <span>{item?.docNo}</span>
          </p>
          <p>
            Дата договора:<span>{item?.dateDoc?.toString()}</span>
          </p>
          <p>
            Адрес: <span>{item?.address}</span>
          </p>
          <p>
            Территориальный код: <span>{item?.terCode}</span>
          </p>
          <p>
            Единица учета: <span>{item?.unitAccountingTer}</span>
          </p>
        </div>
      </div>
      <div className="user-info">
        <p className="organization-info__title">Информация о пользователях</p>
        <div className="data-info">
          <p>
            Имя организации: <span>{item?.name}</span>
          </p>
          <p>
            ИНН: <span>{item?.tax}</span>
          </p>
          <p>
            Идентификатор: <span>{item?.identificator}</span>
          </p>
          <p>
            Номер договора: <span>{item?.docNo}</span>
          </p>
          <p>
            Дата договора:<span>{item?.dateDoc?.toString()}</span>
          </p>
          <p>
            Адрес: <span>{item?.address}</span>
          </p>
          <p>
            Территориальный код: <span>{item?.terCode}</span>
          </p>
          <p>
            Единица учета: <span>{item?.unitAccountingTer}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardOrganization;
