//OBTENER LA INFORMACIÓN DEL FORMULARIO

//Seleccionar el Formulario (Elemento Padre)
const taskForm = document.getElementById("task-form");

//Seleccionar el TaskList (Elemento Padre) donde se irán agregando todas las tareas
const taskList = document.getElementById("task-list");

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