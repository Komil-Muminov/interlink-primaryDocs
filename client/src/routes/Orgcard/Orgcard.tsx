import { Button } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./Orgcard.css";

import { OrganizationScheme } from "../../API/services/organizations/OrganizationScheme";

export interface OrgProps {
	data: OrganizationScheme;
}

const Orgcard: React.FC<OrgProps> = ({ data }) => {
	return (
		<>
			<div className="orgcard__content">
				<ul className="orgcard__list">
					{/* Левая карточка */}
					<li className="orgcard__item orgcard__item-left">
						<div className="orgcard__item-left-top">
							<h3 className={`orgcard__item-left-title`}>
								{data?.status === "Активный" && (
									<CheckCircleIcon sx={{ color: "#8bf99f" }} />
								)}{" "}
							</h3>
							<Button className="show-org-structure">
								Показать структуру2
							</Button>
						</div>
						<div className="orgcard__item-left orgcard__item-left-center">
							<BusinessIcon sx={{ fontSize: "75px" }} />
							{data?.name}
						</div>
						<ul className="orgcard__item-left-bottom">
							<li className="orgcard__item-left-item">
								<p>Тип</p>
								{data?.name}
							</li>
							<li className="orgcard__item-left-item">
								<p>Инн</p>
								{data?.address}
							</li>
							<li className="orgcard__item-left-item">
								<p>Адрес</p>
								{data?.address}
							</li>
						</ul>
					</li>

					{/* Правые карточки (директор и бухгалтер) */}
					<li className="orgcard__right-container">
						<li className="orgcard__item orgcard__item-right">
							<div className="orgcard__item-right-top">
								<h3 className="orgcard__item-right-title">
									Директор: Директор директоров
								</h3>
							</div>
							<ul className="orgcard__item-right-bottom">
								<div className="orgcard__item-right orgcard__item-right--nothover">
									<li className="orgcard__item-right-item">
										<p>ФИО</p>
										Директор директоров
									</li>
									<li className="orgcard__item-right-item">
										<p>Инн</p>
										ЛОКАЛЬНО ЧТО НИБУДЬ
									</li>
									<li className="orgcard__item-right-item">
										<p>Телефон</p>
										ЛОКАЛЬНО ЧТО НИБУДЬ
									</li>
								</div>
							</ul>
						</li>
						<li className="orgcard__item orgcard__item-right">
							<div className="orgcard__item-right-top">
								<h3 className="orgcard__item-right-title">
									Главный бухгалтер: Бухгалтер Бухгалтеров
								</h3>
							</div>
							<ul className="orgcard__item-right-bottom">
								<div className="orgcard__item-right orgcard__item-right--nothover">
									<li className="orgcard__item-right-item">
										<p>ФИО</p>
										ЛОКАЛЬНО ЧТО НИБУДЬ
									</li>
									<li className="orgcard__item-right-item">
										<p>Инн</p>
										ЛОКАЛЬНО ЧТО НИБУДЬ
									</li>
									<li className="orgcard__item-right-item">
										<p>Телефон</p>
										ЛОКАЛЬНО ЧТО НИБУДЬ
									</li>
								</div>
							</ul>
						</li>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Orgcard;
