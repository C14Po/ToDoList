const baseUrl = "http://localhost:3000/";

const getData = async () => {
	try {
		const res = await fetch(baseUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await res.json();
	} catch (err) {
		console.log(err);
	}
};

const postTask = async (input) => {
	const data = { description: input, done: false };
	await fetch(baseUrl, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json",
		},
	});
};

const deleteTask = async (id) => {
	try {
		await fetch(baseUrl + id, {
			method: "DELETE",
		});
	} catch (err) {
		console.log(err);
	}
};
