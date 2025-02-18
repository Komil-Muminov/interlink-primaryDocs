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
  disabled?: boolean;
}

const Input = ({
  register,
  classname,
  idValue,
  labelValue,
  borderRadiusStyle,
  heightStyle,
  widthStyle,
  disabled,
}: TProps) => {
  return (
    <TextField
      {...register(idValue)}
      id={idValue}
      label={labelValue}
      disabled={disabled}
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
