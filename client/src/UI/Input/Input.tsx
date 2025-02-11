import "./Input.css";
import { TextField } from "@mui/material";

interface TProps {
	register: any;
	idValue: string;
	labelValue: string;
	borderRadiusStyle: string;
	heightStyle: string;
	widthStyle: string;
}

const Input = ({
	register,
	idValue,
	labelValue,
	borderRadiusStyle,
	heightStyle,
	widthStyle,
}: TProps) => {
	return (
		<TextField
			{...register(idValue)}
			id={idValue}
			label={labelValue}
			sx={{
				"& .MuiOutlinedInput-root": {
					borderRadius: borderRadiusStyle,
					height: heightStyle,
				},

				width: widthStyle,
			}}
		/>
	);
};

export default Input;
