const API = "http://localhost:3000";

export const getContractById = async (contractId: string | number) => {
  try {
    const response = await fetch(`${API}/contracts/${contractId}`);
    if (!response.ok) {
      throw new Error("Ошибка в запросе getContractById");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
