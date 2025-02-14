import org from "../../assets/Organization .png";
const CardOrg: React.FC = () => {
	return (
		<>
			<div className="card__content">
				<div className="card card__left">
					<img src={org} alt="org" className="card__left-img" />
					<div className="card__left-info">
						<ul className="card__left-list">
							<li className="card__left-item">333</li>
							<li className="card__left-item">333</li>
							<li className="card__left-item">333</li>
						</ul>
					</div>
					<div className="card__left-actions"></div>
				</div>
				<div className="card card__right"></div>
			</div>
		</>
	);
};
