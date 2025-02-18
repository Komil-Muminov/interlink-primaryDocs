import { useEffect, useState } from "react";
import TitleSection from "../../../../UI/Title of Section/TitleSection";
import PanelControl from "../../../../UI/Panel Control/PanelControl";
import { Button, setRef } from "@mui/material";

// ---------------------------------------------------------------------
import { useForm } from "react-hook-form";
import { OrganizationScheme } from "../../../../API/services/organizations/OrganizationScheme";
import Input from "../../../../UI/Input/Input";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../API/hooks/queryClient";
import { createOrganization } from "../../../../API/services/organizations/createOrganization";
import { useNavigate } from "react-router";
import { useValid } from "../../../../API/hooks/useValid";
import OrganizationCard from "../../../../UI/Card/Organization Card/OrganizationCard";
import UserCard from "../../../../UI/Card/User Card/UserCard";
import { useScroll } from "../../../../API/hooks/useScroll";
import "./CreateContracts.css";
import { createContract } from "../../../../API/services/contracts/createContract";
import { generateUniqueId } from "../../../../API/hooks/generateUniqueId";

// import { generateUniqueId } from "../../../../API/hooks/generateUniqueId";
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

const CreateContracts = () => {
  const { register, watch, handleSubmit, setValue, getValues } =
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

  // const orgType = watch("orgType");

  // const [age, setAge] = React.useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  // const navigate = useNavigate();

  const formValues = watch();

  // Функция для удаления файла по индексу
  // const handleDelete = (fileIndex: number) => {
  // 	const currentFiles = getValues("files") || [];
  // 	const updatedFiles = currentFiles.filter(
  // 		(_: any, index: number) => index !== fileIndex,
  // 	);
  // 	setValue("files", updatedFiles);
  // };

  // Watch INN
  const { validInn } = useValid();
  const Inn = getValues("tax");
  const [isValidInn, setIsValidInn] = useState<boolean>(false);

  const handleCheckInnMutate = useMutation(
    {
      mutationFn: () => validInn(Inn),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["organization"] }),
      onError: (error) => {
        console.log(error.message);
        setIsValidInn(false);
      },
    },
    queryClient
  );

  const handleCheckInnSubmit = (data: string) => {
    handleCheckInnMutate.mutate(data);
  };

  const [getOrgByTin, setGetOrgByTin] = useState<OrganizationScheme>();
  useEffect(() => {
    if (handleCheckInnMutate.data) {
      setGetOrgByTin(handleCheckInnMutate.data);
      setIsValidInn(true);
    }
  }, [Inn, handleCheckInnMutate.data]);

  // Подтвердить данные при создание дока (AMI)
  // const [confirm, setConfirm] = useState<boolean>(false);
  // useEffect(() => {
  // Если confirm то рендирить(или переход) надо компонент согласование
  // }, [confirm]);

  // data: OrganizationScheme; arg func

  const navigate = useNavigate();

  const onSubmit = () => {
    const formData = new FormData();
    // Добавляем остальные текстовые поля
    const contractId = generateUniqueId();
    formData.append("id", contractId);
    formData.append("orgId", String(getOrgByTin?.id));
    formData.append(
      "supplier",
      `ГУП "Центр финансовых информационных технологий"`
    );
    formData.append("receiver", String(getOrgByTin?.name));
    formData.append("date", new Date().toISOString().split("T")[0]); // Формат YYYY-MM-DD
    formData.append("sum", "0");
    // Добавляем файлы
    // data.files.forEach((file, index) => {
    //   formData.append("files", file);
    // });

    formData.append("state", "1");

    createContractMutate.mutate(formData);
  };

  const createContractMutate = useMutation<any, Error, FormData>({
    mutationFn: (formData: FormData) => createContract(formData),
    onSuccess: (_, variables) => {
      const contractId = variables.get("id");
      queryClient.invalidateQueries({ queryKey: "contracts" });
      navigate(`/primary-docs/contracts/show/${contractId}`);
    },
    onError: (error) => {
      console.error("Ошибка при создании договора:", error.message);
      alert("Для данной организации договор уже существует!");
    },
  });

  // ScrollTo
  const { setRefs, scrollTo } = useScroll();
  useEffect(() => {
    scrollTo("contracts");
  }, [isValidInn]);

  return (
    <main className="contracts create-contracts">
      <TitleSection title="Новый договор" />
      <PanelControl
        handleSubmit={handleSubmit(onSubmit)}
        saveButtonState={true}
        // editButtonState
      />
      <TitleSection title="Данные организации" />
      <section>
        <form
          style={{ marginBottom: `${isValidInn ? "20px" : "0"}` }}
          className="confirm-org-form"
          onSubmit={handleSubmit(handleCheckInnSubmit)}
        >
          <Input
            register={register}
            classname="crtPrimaryDocs__form--isDataSuccess"
            idValue="tax"
            labelValue="ИНН *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="85%"
            disabled={isValidInn ? true : false}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isValidInn ? true : false}
          >
            Получить данные
          </Button>
        </form>
        {isValidInn && (
          <>
            <div ref={setRefs("contracts")} className="contracts__docs-content">
              {/* <CardOrganization item={getOrgByTin} /> */}
              <OrganizationCard data={getOrgByTin} />
              <div className="contracts__docs-ucard">
                <UserCard
                  id="1"
                  fullname="Рохбар Рохбаров"
                  position="Руководитель"
                />
                <UserCard
                  id="2"
                  fullname="Сармухосиб Сармухосибев"
                  position="Бухгалтер"
                />
              </div>
            </div>
            {/* <TitleSection title="Данные для договора" /> */}
            {/* <section> */}
            {/* <div className="wrapper-documents">
							<InputFile setValue={setValue} getValues={getValues} />
							{formValues.files &&
								formValues.files.map((file: File, index: number) => (
									<FileList
										key={index}
										item={file}
										onDelete={() => handleDelete(index)}
									/>
								))}
						</div> */}

            {/* </section> */}
          </>
        )}
      </section>
    </main>
  );
};

export default CreateContracts;
