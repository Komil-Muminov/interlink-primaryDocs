import React, { useEffect, useState } from "react";
import TitleSection from "../../../UI/Title of Section/TitleSection";
import PanelControl from "../../../UI/Panel Control/PanelControl";
import { Button } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectUI from "../../../UI/Select/SelectUI";

// ---------------------------------------------------------------------
import InputFile from "../../../components/File Service/File Service Input File/InputFile";
import FileList from "../../../components/File Service/File Service File List/FileList";
import { useForm } from "react-hook-form";
import { OrganizationScheme } from "../../../API/services/organizations/OrganizationScheme";
import Input from "../../../UI/Input/Input";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../API/hooks/queryClient";
import { createOrganization } from "../../../API/services/organizations/createOrganization";
import { generateUniqueId } from "../../../API/hooks/generateUniqueId";
import { useNavigate } from "react-router";
import { useValid } from "../../../API/hooks/useValid";
import "./Constructor.css";

// import FindInPageIcon from "@mui/icons-material/FindInPage";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import DatePickerUI from "../../../UI/Date Picker/DatePickerUI";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreatePrimaryDoc = () => {
	const { register, watch, control, handleSubmit, setValue, getValues } =
		useForm<OrganizationScheme>({
			defaultValues: {
				tax: "",
				identificator: "",
				name: "",
				docNo: "",
				dateDoc: null,
				address: "",
				terCode: "",
				unitAccountingTer: "",
				grbsResonsible: "",
				grbs: "",
				pbs: "",
				bz: [],
				details: [],
				categoryBudget: "",
				orgType: "Бюджетная организация",
				files: [],
			},
		});

	const orgType = watch("orgType");

	const [age, setAge] = React.useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	const navigate = useNavigate();

	const formValues = watch();

	const createOrganizationMutate = useMutation<any, Error, FormData>({
		mutationFn: (formData: FormData) => createOrganization(formData),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: "organizations" }),
	});

	const onSubmit = (data: OrganizationScheme) => {
		const formData = new FormData();

		// Добавляем остальные текстовые поля
		const orgId = generateUniqueId();
		formData.append("id", orgId);
		formData.append("tax", data.tax);
		formData.append("identificator", data.identificator);
		formData.append("name", data.name);
		formData.append("docNo", data.docNo);
		// Если поле dateDoc не пустое, можно привести к строке:
		if (data.dateDoc) {
			formData.append("dateDoc", data.dateDoc.toISOString());
		}
		formData.append("address", data.address);
		formData.append("terCode", data.terCode);
		formData.append("unitAccountingTer", data.unitAccountingTer);
		formData.append("grbsResonsible", data.grbsResonsible);
		formData.append("grbs", data.grbs);
		formData.append("pbs", data.pbs);
		formData.append("categoryBudget", data.categoryBudget);
		formData.append("orgType", data.orgType);

		// Для массивов (например, bz и details) можно сериализовать JSON-строкой или отправлять как есть,
		// в зависимости от серверной логики.
		formData.append("bz", JSON.stringify(data.bz));
		formData.append("details", JSON.stringify(data.details));

		// Добавляем файлы
		data.files.forEach((file, index) => {
			formData.append("files", file);
		});

		formData.append("status", "Активный");

		createOrganizationMutate.mutate(formData);

		navigate(`/crm/show/${orgId}`);
	};

	// Функция для удаления файла по индексу
	const handleDelete = (fileIndex: number) => {
		const currentFiles = getValues("files") || [];
		const updatedFiles = currentFiles.filter(
			(_: any, index: number) => index !== fileIndex,
		);
		setValue("files", updatedFiles);
	};

	// Watch INN
	const { validInn } = useValid();
	const [debounceInn, setDebounceInn] = useState<string>("");
	const isValidInn = watch("tax");
	useEffect(() => {
		const setTimeOut = setTimeout(() => setDebounceInn(isValidInn), 5000);
		return () => clearTimeout(setTimeOut);
	});

	const handleCheckInnMutate = useMutation(
		{
			mutationFn: () => validInn(debounceInn),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["organizations"] }),
		},
		queryClient,
	);

	const handleCheckInnSubmit = (data: string) => {
		handleCheckInnMutate.mutateAsync(data);
	};
	return (
		// Логику рендера доработать ) условный рендер
		<main className="create-crm">
			<TitleSection title="Новый договор" />
			<PanelControl
				handleSubmit={handleSubmit(onSubmit)}
				editButtonState={true}
				saveButtonState={false}
			/>
			<TitleSection title="Данные организации" />
			<section>
				<form
					onSubmit={handleSubmit(handleCheckInnSubmit)}
					className="form crtPrimaryDocs__form"
				>
					<Input
						register={register}
						classname="crtPrimaryDocs__form--isDataSuccess"
						idValue="tax"
						labelValue="ИНН *"
						borderRadiusStyle="30px"
						heightStyle="90%"
						widthStyle="85%"
					/>
					<Button type="submit" className="btn-mui constructon__btn--active">
						{/* <FindInPageIcon sx={{ alignSelf: "center" }} />{" "} */}
						Получить данные
					</Button>

					<SelectUI
						disable={!debounceInn}
						control={control}
						nameValue="unitAccountingTer"
						labelValue="Шаблон договора"
						borderRadiusStyle="30px"
						widthStyle="100%"
						data={[
							{ id: 1, title: "Договор № 1" },
							{ id: 2, title: "Договор № 2" },
							{ id: 3, title: "Договор № 3" },
						]}
					/>
				</form>
			</section>
			<TitleSection title="Данные для договора" />
			<section>
				<div className="wrapper-documents">
					<InputFile setValue={setValue} getValues={getValues} />
					{formValues.files &&
						formValues.files.map((file: File, index: number) => (
							<FileList
								key={index}
								item={file}
								onDelete={() => handleDelete(index)}
							/>
						))}
				</div>
			</section>
		</main>
	);
};

export default CreatePrimaryDoc;
