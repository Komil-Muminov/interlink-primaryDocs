import { Form } from "../../../UI/Form/Form";
import { useMutation } from "@tanstack/react-query";
import "./Logme.css";
import { useAuth } from "../../../API/hooks/useAuth";
import { useNavigate } from "react-router";
import { queryClient } from "../../../API/hooks/queryClient";
// RTQ
const Logme: React.FC = () => {
	const navigate = useNavigate();
	const { logMe } = useAuth();
	const logMeMutation = useMutation({
		mutationFn: (data: { username: string; password: string }) => logMe(data),
		onSuccess: () =>
			navigate("/crm") &&
			queryClient.invalidateQueries({ queryKey: ["organizations"] }),
	});

	const onsubmit = (data: { username: string; password: string }) => {
		logMeMutation.mutate(data);
	};

	return (
		<>
			<Form
				inputs={[
					{
						name: "username",
						type: "text",
						placeholder: "Логин",
						classname: "input",
					},
					{
						name: "password",
						type: "password",
						placeholder: "Введите пароль",
						classname: "input",
					},
				]}
				classname="auth-form logme__form"
				submitText="Войти"
				submitClassname="btn-mui regme__sbt"
				onSubmit={onsubmit}
			></Form>
		</>
	);
};
export default Logme;
