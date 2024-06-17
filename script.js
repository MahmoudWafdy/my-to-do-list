// const { j } = require("vite/dist/node/types.d-AKzkD8vd");

 const darkThemToggleElement = document.querySelector(".DarkThemeToggle");
 const upperBackGroundEllement = document.querySelector(".App__upperBackground");
 const appElement = document.querySelector(".App");
 const inpuputElement = document.querySelector(".TaskSearchBar__input");
 const taskListElement = document.querySelector(".TaskList__list");
 const getDeleteIcons = ()=> document.querySelectorAll(".TaskList__deleteIcon")
 const getCheckBoxElement = ()=> document.querySelectorAll(".TaskList__checkbox");
 const taskListLink = document.querySelector(".TaskList__link");

let isBackgroundImgDarkTheme = true;

const toggleDarkMode = ()=>{
    appElement.classList.toggle("App--isDark");

    // upperBackGroundEllement.classList.toggle("App____upperbackground--isLight");
    if(isBackgroundImgDarkTheme){
        upperBackGroundEllement.style.backgroundImage = 'url("images/bg-desktop-dark.jpg")';
    } else {
        upperBackGroundEllement.style.backgroundImage = 'url("images/bg-desktop-light.jpg")';

    }
    isBackgroundImgDarkTheme = !isBackgroundImgDarkTheme;

    saveToDb("DarkModeFlage",appElement?.classList.contains("App--isDark"));

}

darkThemToggleElement.addEventListener("click", () => toggleDarkMode())

const fetchData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
};
const updateTaskeCount = () => {
    const leftItemEllement = document.querySelector(".TaskList__nav--leftItem");
    const tasks = fetchData("tasks") || [];
    const incompletedTasks = tasks.filter(task => !task.isComplete).length;
    leftItemEllement.textContent=`${incompletedTasks} ${incompletedTasks===1 ? " Item ":" Items "} Left`;
}

const renderTaskList = (tasks) => {
    let taskList = "";
    tasks.forEach(task => {
        taskList += `
        <li class="TaskList__taskContent${task.isComplete ? " TaskList__taskContent--isActive": ""}">
            <div class="TaskList__checkbox" tabindex="0" role="button">
                <img
                    class="TaskList__checkboxImg"
                    src="images/icon-check.svg"
                    alt=""
                />
            </div>
            <div class="TaskList__valueContent">
                <p class="TaskList__value">${task.value}</p>
                <img
                    class="TaskList__deleteIcon"
                    src="images/icon-cross.svg"
                    alt="basket-icone"
                />
            </div>
        </li>`
    })

    taskListElement.innerHTML= taskList;
    inpuputElement.value= "";
}

const deleteTask = (e, index) => {
    const answer = confirm("?هل تريد حذف المهمة")
    if(answer === false) return;

    const tasks = fetchData("tasks");

    tasks.splice(index, 1);
    saveToDb("tasks", tasks);
    initTaskList(tasks);
};

const initTaskListeners = () => {
    getDeleteIcons().forEach((icon, index) => {
        icon.addEventListener("click", (e) => deleteTask(e, index))
    })

    getCheckBoxElement().forEach((box, index) => {
        box.addEventListener("click", (e) => toggleTask(e, index));
        box.addEventListener("keydown", (e) => {
            e.key ==="Enter" && toggleTask(e, index);
        })

    })
    document.querySelector(".Nav__container").style.display="flex"

}

const addTask = () => {
    const taskValue = inpuputElement.value;
    if(!taskValue) return;

    const task = {
        value:taskValue,
        isComplete:false
    }
    const tasks = fetchData("tasks") || [];
    tasks.push(task)

    saveToDb("tasks",tasks);
    initTaskList(tasks);
    updateTaskeCount();
};
const saveToDb = (key,data)=> {
    localStorage.setItem(key,JSON.stringify(data))
}

document.querySelector(".TaskSearchBar__button").addEventListener("click", (event)=>{
    event.preventDefault();
    addTask();
});

const initDataOnStartUp = () =>{
    fetchData("DarkModeFlage") && toggleDarkMode();
    initTaskList(fetchData("tasks"));

}

const renderEmptyState = ()=>{
    const tasks = fetchData("tasks");

    if(!tasks){
        taskListElement.innerHTML=`
        <li class=""EmptyList">
            <img class="EmptyList__img" src="./images/icon-empty.svg" alt="empty-icon"/>
            <p>قائمة المهمام فارغة</p>
        </li>
      `;
      document.querySelector(".Nav__container").style.display="none"

    }else{
        document.querySelector(".Nav__container").style.display="flex"

    }
}
const initTaskList = (tasks)=>{
    if(tasks?.length){
        renderTaskList(tasks);
        initTaskListeners();
        updateTaskeCount()
    }
    else{
        renderEmptyState();
    }

}

const toggleTask = (e, index)=>{
    const tasks = fetchData("tasks");

    e.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive");
    tasks[index].isComplete = !tasks[index].isComplete;
    saveToDb("tasks",tasks); 
    updateTaskeCount();

}

taskListLink.addEventListener("click", e =>{
    taskListElement.classList.toggle("TaskList__list--hideCompleted");
    taskListLink.classList.toggle("TaskList__link--isActive");
    updateTaskeCount()

})

document.querySelector(".Nav__container .TaskList__link").addEventListener("click",()=>{
    const tasks = fetchData("tasks");
    const updatedTasks = tasks.filter(task => !task.isComplete);
    saveToDb("tasks", updatedTasks);
    initTaskList(updatedTasks);
})


const showAllTasks = () => {
    const tasks = fetchData("tasks");
    initTaskList(tasks);
};


const showCompletedTasks = () => {
    const tasks = fetchData("tasks") || [];
    const completedTasks = tasks.filter(task => task.isComplete);
    
    if (completedTasks.length > 0) {
        initTaskList(completedTasks);
    } else {
        taskListElement.innerHTML = `
            <li class=""EmptyList">
            <p class="NoCompletedTasks">No completed tasks</p>
            </li>
        `;
    }
};


const showActiveTasks = () => {
    const tasks = fetchData("tasks") || [];
    const activeTasks = tasks.filter(task => !task.isComplete);
    initTaskList(activeTasks);
};

document.querySelectorAll(".TaskList__nav--link").forEach(link => {
    link.addEventListener("click", (event) => {
        const target = event.target;

        if (target.classList.contains("TaskList__link--all")) {
            showAllTasks();
        } else if (target.classList.contains("TaskList__link--active")) {
            showActiveTasks();
        } else if (target.classList.contains("TaskList__link--completed")) {
            showCompletedTasks();
        }

        document.querySelectorAll(".TaskList__nav--link").forEach(link => {
            link.classList.remove("TaskList__nav--selected");
        });

        target.classList.add("TaskList__nav--selected");
    });
});



initDataOnStartUp();
