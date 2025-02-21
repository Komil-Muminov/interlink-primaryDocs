import React from "react";
import "./PanelControl.css";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";

interface TProps {
  handleSubmit?: React.MouseEventHandler;
  handleApproval?: any;
  editButtonState?: boolean;
  saveButtonState: boolean;
  scrollTo: any;
  setCurrentPage: any;
  lastPages: number;
}

const PanelControl = ({
  // editButtonState,
  handleSubmit,
  handleApproval,
  saveButtonState,
  scrollTo,
  setCurrentPage,
  lastPages,
}: TProps) => {
  const navigate = useNavigate();

  return (
    <div className="panel-control">
      <div className="back-button">
        <Button
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "20px",
          }}
          variant="text"
        >
          <ArrowBackIosIcon /> <p>Назад</p>
        </Button>
      </div>
      <div className="action-buttons">
        {/* <Button
					disabled={editButtonState}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						borderRadius: "20px",
					}}
					variant="text"
				>
					<EditIcon /> <p>Редактировать</p>
				</Button> */}
        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "20px",
          }}
          variant="text"
        >
          <SaveIcon /> <p>Сохранить</p>
        </Button>
        <Button
          disabled={saveButtonState}
          onClick={() => {
            handleApproval();
            scrollTo("contracts");
            setCurrentPage(lastPages - 1);
          }}
          type="submit"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "20px",
          }}
          variant="text"
        >
          <SaveIcon /> <p>Утвердить</p>
        </Button>
      </div>
    </div>
  );
};

export default PanelControl;
