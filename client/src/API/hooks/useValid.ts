export interface ValidInnProps {
	tax: string | undefined;
}

export const useValid = () => {
	const validInn = async (inn: string): Promise<ValidInnProps> => {
		return fetch(`http://localhost:3000/organizations/checkinn`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ inn }),
		}).then((res: Response) => {
			if (!res.ok) {
				throw new Error(`Ошибка запроса: ${res.status} ${res.statusText}`);
			}
			return res.json();
		});
	};
	return {
		validInn,
	};
};
