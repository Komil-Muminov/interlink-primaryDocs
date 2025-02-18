const API = "http://localhost:3000";

export const createContract = async (formData: FormData) => {
  try {
    const response = await fetch(`${API}/contracts`, {
      method: "POST",
      body: formData,
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Ошибка в запросе createContract");
    }

    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
