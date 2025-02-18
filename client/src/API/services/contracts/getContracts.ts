const API = "http://localhost:3000";

export const getContracts = async () => {
  try {
    const response = await fetch(`${API}/contracts`);
    if (!response.ok) {
      throw new Error("Ошибка в запросе getContracts");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
