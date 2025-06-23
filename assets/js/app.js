//OBTENER LA INFORMACIÓN DEL FORMULARIO

//Seleccionar el Formulario (Elemento Padre)
const taskForm = document.getElementById("task-form");

//Seleccionar el TaskList (Elemento Padre) donde se irán agregando todas las tareas
const taskList = document.getElementById("task-list");

//Seleccionar botón switch
const toggleButton = document.getElementById("toggle-theme-btn");
//Seleccionar el contenedor padre del tema
const currentTheme = localStorage.getItem("theme");
console.log(currentTheme);

//Llamado de la función que carga las tareas que ya estaban en el LOCALSTORAGE


//Agregar el evento de SUBMIT
taskForm.addEventListener("submit", (e) => {

    //Prevenir el comportamiento por DEFAULT de refrescar la página en cada click al botón
    e.preventDefault();

    //Seleccionar el INPUT dentro del formulario
    const taskInput = document.getElementById("task-input");

    //Agarra el valor introducido en teclado por el usuario
    const task = taskInput.value;
    //Muestra dicho valor para confirmar que el código funciona hasta acá en la consola
    console.log(task);

    //Valida si es verdadero para agregar una nueva tarea
      if(task){
        //Agrega con APPEND la nueva tarea después de la tarea por default
        //Para esto se llama a la función createTaskElement
        taskList.append(createTaskElement(task));
        //Guarda la tarea en el LOCAL STORAGE
        storeTaskInLocalStorage(task);
        //Limpia el valor del input
        taskInput.value = "";
    }    
});

//CREAR NUEVAS TAREAS
function createTaskElement() {
    //Selecciona un elemento padre li para crear la nueva tarea
    const lista = document.createElement("li");
    //Crear el elemento p (donde se agregará el texto para que no modifique el diseño de las list)
    const parrafo = document.createElement("p");

    //Agregar el texto de la tarea (recibido por input)
    parrafo.textContent = task;
    // Agregar el párrafo al li
    lista.appendChild(p);

    //A cada li se le crean los dos botones de modificaciones
    lista.append(createButton("Delete", "delete-btn"), createButton("Edit", "edit-btn"));
      return lista;
}

//CREAR LOS BOTONES DE CADA TAREA NUEVA
//Parámetros el texto, y la clase

function createButton(text, className) {
   //Crea el nuevo botón 1 sola vez
  const btn = document.createElement("button");
  //Le agrega el texto al botón
  btn.textContent = text
  //Le agrega la clase al botón
  btn.className = className;
  
  return btn;
}

//INTERACCIÓN CON BOTONES

//Evento que viene desde el padre y él decide en qué botón ocurre el evento
taskList.addEventListener("click", (e) =>{

    //Valida si contiene la clase del botón para eliminar tareas
    if(e.target.classList.contains("delete-btn")){
        //LLAMADO a la función para REMOVER la tarea
        deleteTask(e.target.parentElement);
        //Valida si contiene la clase del botón para editar tareas
    }else if(e.target.classList.contains("edit-btn")){
        editTask(e.target.parentElement);
    }
})

//taskItem: el parámetro seleccionado

//Función para BORRAR TAREAS
function deleteTask(taskItem){
  // validacion con el usuario
  if(confirm("¿Estás seguro de borrar esta tarea?")){
    //Remueve las tareas del LOCAL STORAGE
    removeFromLocalStorage(taskItem.firstChild.textContent);
    //Remueve el elemento
    taskItem.remove();
  }
}

//Función para EDITAR TAREAS
function editTask(taskItem) {
   //Valida con el usuario
  //Me trae el contenido del texto que tiene la tarea para editarla

  const editedTask = prompt("Edita tu tarea:", taskItem.querySelector("p").firstChild.textContent);

  if(editTask !== null){
    //Si es diferente a null REESCRIBE EL CONTENIDO
    taskItem.querySelector("p").firstChild.textContent = editedTask
    //Traer el estado actual para guardarlo en LOCAL STORAGE
    updateLocalStorage();
  }
}

//DARK MODE - BUTTON SWITCH EVENTO

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  //Validación del tema
  const themeToggle = document.classList.contains("dark-theme") ? "dark" : "Light";

    //Guardar en el storage
    localStorage.setItem("theme", themeToggle);
});

if(currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}