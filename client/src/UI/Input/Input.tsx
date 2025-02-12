import "./Input.css";
import { TextField } from "@mui/material";

interface TProps {
	register: any;
	idValue: string;
	labelValue: string;
	borderRadiusStyle: string;
	heightStyle: string;
	widthStyle: string;
	classname: string | undefined;
}

const Input = ({
	register,
	classname,
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
			className={classname}
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
