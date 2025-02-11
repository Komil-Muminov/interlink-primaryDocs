import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

interface FormProps {
	inputs: {
		name: string;
		type?: string;
		placeholder?: string;
		classname?: string;
	}[];
	classname?: string;
	onSubmit: (data: unknown) => void;
	submitText?: string;
	submitClassname?: string;
}

export const Form: React.FC<FormProps> = ({
	inputs,
	classname,
	onSubmit,
	submitText,
	submitClassname,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<form className={classname} onSubmit={handleSubmit(onSubmit)}>
			{inputs?.map(({ name, type, placeholder, classname }) => (
				<>
					<input
						{...register(name, { required: `Поле ${name} обязательно` })}
						type={type || "text"}
						placeholder={placeholder || "Введите данные"}
						className={classname}
					/>
					{errors[name] && <span>{errors[name]?.message}</span>}
				</>
			))}

			<Button type="submit" className={submitClassname}>
				{submitText}
			</Button>
		</form>
	);
};
