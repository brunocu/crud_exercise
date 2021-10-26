import app from "./index.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const db = getFirestore(app);

const taskForm = document.querySelector("#task-form");
const taskContainer = document.querySelector("#tasks-container");

let editStatus = false;
let id = "";

const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), {
    title,
    description
  });

const getTasks = () => getDocs(collection(db, "tasks"));

const getTask = (id) => getDoc(doc(db, "tasks", id));

const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

const updateTask = (id, updatedTask) =>
  updateDoc(doc(db, "tasks", id), updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      taskContainer.innerHTML += `<div class="card card-body mt-2
      border-primary">
        <h3 class="h5">${task.title}</h3>
        <p>${task.description}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">Delete</button>
          <button class="btn btn-Secondary btn-edit" data-id="${doc.id}">Edit</button>
        </div>
      </div>`;
    });

    const btnsDelete = document.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        await deleteTask(e.target.dataset.id);
      });
    });

    const btnsEdit = document.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const docSnap = await getTask(e.target.dataset.id);
        const task = docSnap.data();

        editStatus = true;
        id = docSnap.id;

        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;
        taskForm["btn-task-form"].innerText = "Update";
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  if (!editStatus) {
    await saveTask(title.value, description.value);
  } else {
    await updateTask(id, {
      title: title.value,
      description: description.value
    });

    editStatus = false;
    id = "";
    taskForm["btn-task-form"].innerText = "Save";
  }

  taskForm.reset();
  title.focus();
});
