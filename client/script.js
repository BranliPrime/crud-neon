const apiUrl = "http://localhost:3000/api/tareas";
const taskList = document.getElementById("task-list");
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const searchInput = document.getElementById("search-input");

// Elementos de error
const titleError = document.getElementById("title-error");
const descriptionError = document.getElementById("description-error");

let editingTask = null;
let allTasks = [];

// Obtener tareas desde el backend
async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        allTasks = data;
        renderTasks(data);
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
    }
}

// Renderizar tareas
function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add(
            "flex",
            "justify-between",
            "items-center",
            "bg-white",
            "p-4",
            "rounded-lg",
            "shadow-md",
            "hover:shadow-xl",
            "transition",
            "transform",
            "hover:scale-105"
        );
        taskItem.innerHTML = `
            <div>
                <input type="text" value="${task.titulo}" id="edit-title-${task.id}" class="border p-2 rounded-lg w-40"/>
                <input type="text" value="${task.descripcion}" id="edit-desc-${task.id}" class="border p-2 rounded-lg w-60"/>
            </div>
            <div>
                <button onclick="editTask(${task.id})" class="bg-yellow-500 text-white p-2 rounded-lg mr-2 transition hover:bg-yellow-600">
                    Editar
                </button>
                <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white p-2 rounded-lg transition hover:bg-red-600">
                    Eliminar
                </button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Validar y mostrar errores
function validateInputs() {
    let isValid = true;

    if (!titleInput.value.trim()) {
        titleInput.classList.add("border-red-500");
        titleError.textContent = "El título es obligatorio.";
        isValid = false;
    } else {
        titleInput.classList.remove("border-red-500");
        titleError.textContent = "";
    }

    if (!descriptionInput.value.trim()) {
        descriptionInput.classList.add("border-red-500");
        descriptionError.textContent = "La descripción es obligatoria.";
        isValid = false;
    } else {
        descriptionInput.classList.remove("border-red-500");
        descriptionError.textContent = "";
    }

    return isValid;
}

// Escuchar eventos de entrada para limpiar errores en tiempo real
titleInput.addEventListener("input", validateInputs);
descriptionInput.addEventListener("input", validateInputs);

// Agregar tarea
async function addTask(titulo, descripcion) {
    if (!validateInputs()) return;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, descripcion }),
        });

        if (!response.ok) {
            console.error("Error al agregar tarea");
            return;
        }

        fetchTasks();
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

// Editar tarea
function editTask(id) {
    const titleField = document.getElementById(`edit-title-${id}`);
    const descField = document.getElementById(`edit-desc-${id}`);

    titleInput.value = titleField.value;
    descriptionInput.value = descField.value;
    editingTask = id;

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.textContent = "Actualizar Tarea";
    submitButton.classList.remove("bg-blue-500");
    submitButton.classList.add("bg-yellow-500");
}

// Actualizar tarea
async function updateTask(id, titulo, descripcion) {
    if (!validateInputs()) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, descripcion }),
        });

        if (!response.ok) {
            console.error("Error al actualizar la tarea.");
            return;
        }

        fetchTasks();
    } catch (error) {
        console.error("Error en la actualización:", error);
    }
}

// Eliminar tarea
async function deleteTask(id) {
    if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;

    try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchTasks();
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
    }
}

// Manejo del formulario
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titulo = titleInput.value.trim();
    const descripcion = descriptionInput.value.trim();

    if (!validateInputs()) return;

    if (editingTask) {
        await updateTask(editingTask, titulo, descripcion);
        editingTask = null;
    } else {
        await addTask(titulo, descripcion);
    }

    titleInput.value = "";
    descriptionInput.value = "";

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.textContent = "Agregar Tarea";
    submitButton.classList.remove("bg-yellow-500");
    submitButton.classList.add("bg-blue-500");
});
// Filtrar tareas en tiempo real
function searchTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = allTasks.filter(task =>
        task.titulo.toLowerCase().includes(searchTerm)
    );
    renderTasks(filteredTasks);
}

// Escuchar eventos de entrada en el campo de búsqueda
searchInput.addEventListener("input", searchTasks);


fetchTasks();
