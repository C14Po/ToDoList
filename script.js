const input = document.getElementById("inputBar");
const list = document.getElementById("taskList");
const addBtn = document.getElementById("addButton");

const updateList = async (input) => {
	await postTask(input.value);
	addToList();
};

const addToList = async () => {
	const currentList = await getData();
	const newTask = currentList[currentList.length - 1].description;
	const newId = currentList[currentList.length - 1]._id;
	const newItem = document.createElement("li");
	list.appendChild(newItem);
	newItem.innerHTML = newTask;
	newItem.id = newId;

	showList();
};

const showList = async () => {
	list.querySelectorAll("*").forEach((item) => item.remove());
	const current = await getData();
	current.forEach((item) => {
		// New listitem
		const newItem = document.createElement("li");
		newItem.innerHTML = `${item.description}`;
		newItem.id = `${item._id}`;
		list.appendChild(newItem);
		list.insertBefore(newItem, list.getElementsByTagName("li")[0]);

		// Checkbox
		const checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.classList.add("checkbox");
		newItem.appendChild(checkbox);

		checkbox.addEventListener("click", () => {
			newItem.classList.toggle("line");
		});

		// Delete button
		const deleteBtn = document.createElement("button");
		deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
		deleteBtn.classList.add("deleteButton");

		newItem.appendChild(deleteBtn);

		deleteBtn.addEventListener("click", async () => {
			const id = newItem.id;
			await deleteTask(id);
			var element = document.getElementById(id);
			element.parentNode.removeChild(element);
		});
	});
};

addBtn.addEventListener("click", () => {
	updateList(input);
	input.value = " ";
});

input.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		updateList(input);
		input.value = " ";
	}
});

showList();
