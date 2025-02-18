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
    title: "Номер договора",
    types: [],
  },
  {
    id: 3,
    title: "Дата",
    types: [],
  },
  {
    id: 4,
    title: "Поставщик",
    types: [],
  },
  {
    id: 5,
    title: "Получатель",
    types: [],
  },
  {
    id: 6,
    title: "Статус",
    types: [],
  },
  {
    id: 7,
    title: "Сумма",
    types: [],
  },
  // {
  // 	id: 5,
  // 	title: "Статус",
  // 	types: ["Республиканский", "Местный"],
  // },
  // {
  // 	id: 6,
  // 	title: "Тип организации",
  // 	types: [
  // 		"Бюджетная организация",
  // 		"Коммерческая организация",
  // 		"Министерство финансов",
  // 	],
  // },
  // {
  // 	id: 7,
  // 	title: "Список регинов",
  // 	types: [],
  // },
  // {
  // 	id: 8,
  // 	title: "Статус",
  // 	types: ["Активный", "Пассивный"],
  // },
];
