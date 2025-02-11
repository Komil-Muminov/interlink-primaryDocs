import React, { useEffect, useState } from "react";
import "./CreateCRM.css";
import TitleSection from "../../../UI/Title of Section/TitleSection";
import PanelControl from "../../../UI/Panel Control/PanelControl";
import { IconButton, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectUI from "../../../UI/Select/SelectUI";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import AddIcon from "@mui/icons-material/Add";
import InputFile from "../../../components/File Service/File Service Input File/InputFile";
import FileList from "../../../components/File Service/File Service File List/FileList";

import { Controller, useForm } from "react-hook-form";
import { OrganizationScheme } from "../../../API/services/organizations/OrganizationScheme";
import Input from "../../../UI/Input/Input";
import DatePickerUI from "../../../UI/Date Picker/DatePickerUI";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../API/hooks/queryClient";
import { createOrganization } from "../../../API/services/organizations/createOrganization";
import { generateUniqueId } from "../../../API/hooks/generateUniqueId";
import { useNavigate } from "react-router";

const CreateCRM = () => {
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

  console.log(formValues);
  console.log(getValues("files"));

  // Функция для удаления файла по индексу
  const handleDelete = (fileIndex: number) => {
    const currentFiles = getValues("files") || [];
    const updatedFiles = currentFiles.filter(
      (_: any, index: number) => index !== fileIndex
    );
    setValue("files", updatedFiles);
  };

  return (
    <main className="create-crm">
      <TitleSection title="Новая организация" />
      <PanelControl
        handleSubmit={handleSubmit(onSubmit)}
        editButtonState={true}
        saveButtonState={false}
      />
      <TitleSection title="Создание организации" />
      <section>
        <form action="">
          <Input
            register={register}
            idValue="tax"
            labelValue="ИНН *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
          />
          <Input
            register={register}
            idValue="identificator"
            labelValue="Идентификатор *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
          />
          <Input
            register={register}
            idValue="name"
            labelValue="Название *"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
          />
          <Input
            register={register}
            idValue="docNo"
            labelValue="Номер договора"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
          />
          <DatePickerUI
            control={control}
            nameValue="dateDoc"
            labelValue="Дата договора"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
          />
          <Input
            register={register}
            idValue="address"
            labelValue="Адрес"
            borderRadiusStyle="30px"
            heightStyle="90%"
            widthStyle="48%"
          />
          <SelectUI
            control={control}
            nameValue="terCode"
            labelValue="Код территории"
            borderRadiusStyle="30px"
            widthStyle="48%"
            data={[
              { id: 1, title: "Бадахшан" },
              { id: 2, title: "Хатлон" },
              { id: 3, title: "Душанбе" },
            ]}
          />
          <SelectUI
            control={control}
            nameValue="unitAccountingTer"
            labelValue="Единица учета"
            borderRadiusStyle="30px"
            widthStyle="48%"
            data={[
              { id: 1, title: "100-Сарраёсати хазинадории марказии ҶТ" },
              { id: 2, title: "101-шаҳри Душанбе" },
              { id: 3, title: "102-ноҳияи Синои" },
            ]}
          />

          <SelectUI
            control={control}
            nameValue="grbsResonsible"
            labelValue="ГРБС (Ответственный)"
            borderRadiusStyle="30px"
            widthStyle="48%"
            data={[
              { id: 1, title: "103-Сарраёсати хазинадории марказии ҶТ" },
              { id: 2, title: "104-шаҳри Душанбе" },
              { id: 3, title: "105-ноҳияи Синои" },
            ]}
          />
          <SelectUI
            control={control}
            nameValue="grbs"
            labelValue="ГРБС"
            borderRadiusStyle="30px"
            widthStyle="48%"
            data={[
              {
                id: 1,
                title: "108-108-Вазорати корҳои дохилии Ҷумҳурии Тоҷикистон",
              },
              { id: 2, title: "109-109-Вазорати мудофиаи Ҷумҳурии Тоҷикистон" },
              {
                id: 3,
                title:
                  "101-101-Дастгоҳи иҷроияи Президенти Ҷумҳурии Тоҷикистон",
              },
            ]}
          />
          <SelectUI
            control={control}
            nameValue="grbs"
            labelValue="ПБС"
            borderRadiusStyle="30px"
            widthStyle="48%"
            data={[
              {
                id: 1,
                title: "10801013-10801013-Шуъбаи корҳои дохилии ноҳияи Лахш",
              },
              {
                id: 2,
                title:
                  "10703001-10703001-Дастгоҳи марказии Бозрасии назорати давлатии тухмии Вазорати кишоварзии Ҷумҳурии Тоҷикистон",
              },
              {
                id: 3,
                title:
                  "10703002-10703002-Бозрасии назорати давлатии тухмӣ дар вилояти Хатлон",
              },
            ]}
          />
          <SelectUI
            control={control}
            nameValue="bz"
            labelValue="Бюджетные заявки *"
            borderRadiusStyle="30px"
            widthStyle="48%"
            data={[
              {
                id: 1,
                title: "63581",
              },
              { id: 2, title: "63582" },
              {
                id: 3,
                title: "63583",
              },
            ]}
          />
          <SelectUI
            control={control}
            nameValue="details"
            labelValue="Реквизиты"
            borderRadiusStyle="30px"
            widthStyle="44%"
            data={[
              {
                id: 1,
                title: "123",
              },
              { id: 2, title: "1234" },
              {
                id: 3,
                title: "12345",
              },
            ]}
          />
          <IconButton>
            <AddIcon />
          </IconButton>
          <SelectUI
            control={control}
            nameValue="orgType"
            labelValue="Тип организации"
            borderRadiusStyle="30px"
            widthStyle="48%"
            data={[
              {
                id: 1,
                title: "Бюджетная организация",
              },
              { id: 2, title: "Коммерческая организация" },
              {
                id: 3,
                title: "Министерство финансов",
              },
            ]}
          />
        </form>
      </section>
      <TitleSection title="Документы" />
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

export default CreateCRM;
