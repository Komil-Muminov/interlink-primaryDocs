const API = "http://localhost:3000";

export const updateContractById = async (newData) => {
  try {
    const response = await fetch(`${API}/contracts/${newData.contractId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Ошибка в запросе updateContractById");
    }

    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
