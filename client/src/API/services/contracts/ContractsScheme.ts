export interface ContractsScheme {
  id?: string | number;
  orgId: string;
  supplier: string;
  receiver: string;
  date: string;
  sum: string;
  state: string | number;
  htmlContent?: string;
}
