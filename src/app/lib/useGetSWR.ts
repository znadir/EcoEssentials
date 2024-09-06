import useSWR from "swr";

export function getCookie(cname: string) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

export default function useGetSWR(url: string, isApiHost = true) {
	const { data, error, isLoading } = useSWR(url, async () => {
		const token = getCookie("token");

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		if (!response.ok) {
			throw new Error("An error occurred while fetching the data.");
		}

		const data = await response.json();

		return data;
	});

	return {
		data,
		error,
		isLoading,
	};
}
