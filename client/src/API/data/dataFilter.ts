export interface DataFilterType {
  id: number;
  title: string;
  types: string[];
}

export const dataFilter: DataFilterType[] = [
  {
    id: 1,
    title: "Номер списка",
    types: [],
  },
  {
    id: 2,
    title: "Идентификатор",
    types: [],
  },
  {
    id: 3,
    title: "Наименование",
    types: [],
  },
  {
    id: 4,
    title: "ИНН организации",
    types: [],
  },
  {
    id: 5,
    title: "Категория бюджета",
    types: ["Республиканский", "Местный"],
  },
  {
    id: 6,
    title: "Тип организации",
    types: [
      "Бюджетная организация",
      "Коммерческая организация",
      "Министерство финансов",
    ],
  },
  {
    id: 7,
    title: "Список регинов",
    types: [],
  },
  {
    id: 8,
    title: "Статус",
    types: ["Активный", "Пассивный"],
  },
];
