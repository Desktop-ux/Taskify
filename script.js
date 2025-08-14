// let currentdate = new Date()
// currentdate.setHours(0,0,0,0)

// console.log(currentdate)


// let today = currentdate.getDay()
// let daysname = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

// let day = daysname[today]

// let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


// let label = document.querySelector(".time h2")



// // label.innerHTML = `${days[today]}`






// let boxes = document.querySelectorAll(".box")
// // After rendering


// boxes.forEach(box => {
//     let daytext = box.querySelector(".box p").innerHTML
//     if (daytext == day) {

//         box.style.backgroundColor = '#439AE1';
//         box.style.color = '#fff';
//         box.style.border = 'none';
//         label.innerHTML = `${currentdate.toLocaleString("en-us",{weekday : "long"} )}`
//     } else {
//         box.style.backgroundColor = 'transparent';
//         box.style.color = '#439AE1';
//         box.style.border = '1px solid #439AE1';
//     }
// })



let boxes = document.querySelectorAll(".box");
let label = document.querySelector(".label");
let time = document.querySelector(".time p");

let today = new Date();
let todayDayShort = today.toLocaleString("en-us", { weekday: "short" });

// reset all boxes

function resetallboxes() {
    boxes.forEach(b => {
        b.style.backgroundColor = "transparent"
        b.style.border = `1px solid ##439AE1`
        b.style.color = `#439AE1`

        let innerp = b.querySelector("p")
        let innerh3 = b.querySelector("h3")
        innerh3.style.color = '#439AE1'
        innerp.style.color = '#439AE1'
    })
}

// HIghlight all boxes

function highlightbox(box) {
    let p = box.querySelector("p")
    let h3 = box.querySelector("h3")

    box.style.backgroundColor = `#439ae1`
    box.style.color = `#fff`
    box.style.border = 'none';
    p.style.color = '#fff';
    h3.style.color = "white";


    label.innerHTML = today.toLocaleString("en-us", { weekday: "long" });
    time.innerHTML = `${today.toLocaleString("en-us", { weekday: "long" })}, ${today.getDate()} ${today.toLocaleString("en-us", { month: "long" })}`


    box.scrollIntoView({
        behavior: "smooth",
        // inline: "center",
        block: "nearest"
    });
}


// select the clicked box

boxes.forEach(box => {
    box.addEventListener("click", function () {
        resetallboxes()
        highlightbox(box)
        let p = box.querySelector("p").innerText.trim(); // e.g. "Mon"
        let dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p);

        // Build date for this week's matching day
        let today = new Date();
        let diff = dayIndex - today.getDay();
        let targetDate = new Date(today);
        targetDate.setDate(today.getDate() + diff);

        rendertaskforDate(targetDate.toISOString().split("T")[0]);
    })
})
let calendartask = document.getElementById("calendar")
calendartask.addEventListener("change", function () {
    let selectedDate = calendar.value; // already YYYY-MM-DD
    rendertaskforDate(selectedDate);
});

window.addEventListener("DOMContentLoaded", function () {
    let today = new Date().toISOString().split("T")[0];
    rendertaskforDate(today);
});

// Reset all boxes

window.addEventListener("DOMContentLoaded", function () {
    boxes.forEach(box => {
        let p = box.querySelector("p")
        if (p.innerText.trim() === todayDayShort) {
            resetallboxes();
            highlightbox(box);
        }
    })
})

let calendar = document.getElementById("calendar")
calendar.value = today.toISOString().split("T")[0]


let start_time = document.getElementById("start")
const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');





// Set default time
start_time.value = `${hours}:${minutes}`;

let end_time = document.getElementById("end")

end_time.value = `${hours}:${minutes}`;

let back = document.querySelector(".icon1")
let new_task = document.querySelector(".new")
let menu = document.querySelector(".icon2")

back.addEventListener("click", function () {
    new_task.style.transform = `translate(100%, 0)`
})

menu.addEventListener("click", function () {
    new_task.style.transform = `translate(100%, 0)`
})

let add = document.querySelector(".add")

add.addEventListener("click", function () {
    new_task.style.transform = `translate(0, 0)`
})

let menuicon = document.querySelector(".menu")

menuicon.addEventListener("click", function () {
    new_task.style.transform = `translate(0, 0)`
})

let createtask = document.querySelector("button.create")
let add_task = document.querySelector(".tasks")

let deletetask = document.querySelector(".delete")
let task = document.querySelectorAll(".task")




createtask.addEventListener("click", function () {
    new_task.style.transform = `translate(100%, 0)`;

    let title = task_name.value.trim();
    let description = desc.value.trim();
    let tasktime = end_time.value;
    let taskdate = calendar.value;
    let taskcat = selectedCategory;
    let iconSrc = "";


    if (!title || !description || !tasktime || !taskdate || !taskcat) {
        alert("Please fill all fields");
        return;

    }



    if (taskcat === "Shopping") {
        iconSrc = "shopping.jpg";
    } else if (taskcat === "Work") {
        iconSrc = "work.jpg";
    } else if (taskcat === "Study") {
        iconSrc = "study.jpg";
    } else if (taskcat === "Personal") { // typo fixed: "Perosonal" → "Personal"
        iconSrc = "personal.jpg";
    } else if (taskcat === "Wishlist") {
        iconSrc = "wishlist.jpg";
    }

    const taskHTML = `
        <div class="task">
        <div class="delete">
                    <i class="fa-solid fa-xmark"></i>
                </div>

                <div class="completed">
                    <i class="fa-solid fa-check"></i>
                </div>
              

            <div class="circle">
                <img src="${iconSrc}" alt="${taskcat}">
            </div>
            <div class="details">
                <h2>${title}</h2>
                <p>${description}</p>
            </div>
            <div class="tasktime">
                <h3>${taskdate}</h3>
                <p>${tasktime}</p>
            </div>
        </div>
    `;



    let taskobj = {
        title: title,
        description: description,
        date: taskdate,   // yyyy-mm-dd
        start: start_time.value,
        end: tasktime,
        category: taskcat,
        icon: iconSrc
    }
    savetask(taskobj)
    let notask = document.querySelector(".notask")

    if (notask) {
        notask.remove()
        notask = null
    }

    add_task.insertAdjacentHTML("beforeend", taskHTML);

    task_name.value = "";
    desc.value = "";
    resetallcats()
});



let task_name = document.getElementById("task_name")
let category = document.querySelectorAll("button.option")

// reset all categories
function resetallcats() {
    category.forEach(but => {
        but.style.backgroundColor = "transparent"
        but.style.border = `1px solid ##439AE1`
        but.style.color = `#439AE1`
    })
}


// highlight the clicked category
function highlightcat(but) {
    but.style.backgroundColor = `#439ae1`
    but.style.color = `#fff`
    but.style.border = 'none';


    but.scrollIntoView({
        behavior: "smooth",
        // inline: "center",
        block: "nearest"
    });
}

let selectedCategory = ""; // global

category.forEach(but => {
    but.addEventListener("click", function () {
        resetallcats();
        highlightcat(but);

        selectedCategory = but.innerHTML; // updates global
    });
});

// Now you can use it anywhere after a click


// function gettaskname(){
//     let task = task_name.value

// }
let taskicons = [
    "personal.jpg",
    "work.jpg",
    "study.jpg",
    "shopping.jpg",
    "wishlist.jpg"
]

let desc = document.querySelector("#desc")
let task_icon = document.querySelector(".circle img")


// to delete the task 

add_task.addEventListener("click", function (e) {
    if (e.target.closest(".delete")) {
        const taskElement = e.target.closest(".task");

        // Get title and date/time to identify the task in localStorage
        const title = taskElement.querySelector(".details h2").innerText.trim();
        const date = taskElement.querySelector(".tasktime h3").innerText.trim();
        const end = taskElement.querySelector(".tasktime p").innerText.trim();

        // Remove from localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => !(t.title === title && t.date === date && t.end === end));
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Remove from DOM
        taskElement.remove();

        // Show "No tasks" if empty
        if (add_task.children.length === 0) {
            add_task.innerHTML = `<div class="notask"><span>No tasks created</span></div>`;
        }
    }
});


// remove task on completion
let finished = document.querySelectorAll(".finish")
add_task.addEventListener("click", function (e) {

    if (e.target.closest(".completed")) {
        const taskElement = e.target.closest(".task");

        // Get title and date/time to identify the task in localStorage
        const title = taskElement.querySelector(".details h2").innerText.trim();
        const date = taskElement.querySelector(".tasktime h3").innerText.trim();
        const end = taskElement.querySelector(".tasktime p").innerText.trim();

        // Remove from localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => !(t.title === title && t.date === date && t.end === end));
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Remove from DOM
        setTimeout(function () {
            taskElement.remove();
        }, 100)


        // Show "No tasks" if empty
        if (add_task.children.length === 0) {
            add_task.innerHTML = ` <div class="notask"><span>No tasks created</span></div> `;
        }
    }
});





setInterval(() => {
    let now = new Date();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    document.querySelectorAll(".task").forEach(t => {
        let dateText = t.querySelector(".tasktime h3").innerText.trim();
        let timeText = t.querySelector(".tasktime p").innerText.trim();
        let titleText = t.querySelector(".details h2").innerText.trim();
        let descText = t.querySelector(".details p").innerText.trim();
        let categoryText = t.getAttribute("data-category") || "";
        let iconText = t.querySelector("img")?.getAttribute("src") || "";

        let [year, month, day] = dateText.split("-").map(Number);
        let [hour, minute] = timeText.split(":").map(Number);

        let taskEnd = new Date(year, month - 1, day, hour, minute);

        let diffMs = taskEnd - now;
        let diffMin = Math.floor(diffMs / 60000);
        let diffSec = Math.floor(diffMs / 1000);

        if (diffMs <= 0) { // expired
            t.remove();

            tasks = tasks.filter(task =>
                !(task.title === titleText &&
                    task.description === descText &&
                    task.taskdate === dateText &&
                    task.tasktime === timeText &&
                    task.taskcat === categoryText &&
                    task.iconSrc === iconText)
            );

            localStorage.setItem("tasks", JSON.stringify(tasks));

             // ✅ Always create a notification for each expired task
    let savedNotes = localStorage.getItem("taskNotifications") || "";
    savedNotes += `<div class="note">
        <p>The task named "${titleText}" has been deleted due to end time</p>
    </div>`;
    localStorage.setItem("taskNotifications", savedNotes);
    notes.innerHTML = savedNotes;

    // Only handle empty task UI separately
    if (document.querySelectorAll(".task").length === 0) {
         localStorage.removeItem("tasks", JSON.stringify(tasks));
        add_task.innerHTML = `<div class="notask"><span>No tasks created</span></div>`;
    }
        }
    });
},  1000);



// localStorage.clear() 


let clearAllNotify = document.querySelector(".backward p")

clearAllNotify.addEventListener("click", function(){
    // let savedNotes = localStorage.getItem("taskNotifications");
    notes.innerHTML = ""
    localStorage.removeItem("taskNotifications")
    
})

function savetask(taskobj) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.push(taskobj)
    localStorage.setItem("tasks", JSON.stringify(tasks));

}


//  Display tasks for selected date

function rendertaskforDate(date) {
    add_task.innerHTML = "" // clear old
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let filtered = tasks.filter(t => t.date === date);


    if (filtered.length === 0) {
        add_task.innerHTML = `<p class="notask">No tasks created</p>`;
        return;
    }


    filtered.forEach(t => {
        const taskHTML = `
            <div class="task">
                
                <div class="completed">
                    <i class="fa-solid fa-check"></i>
                </div>
               

                <div class="delete"><i class="fa-solid fa-xmark"></i></div>
                <div class="circle"><img src="${t.icon}" alt="${t.category}"></div>
                <div class="details">
                    <h2>${t.title}</h2>
                    <p>${t.description}</p>
                </div>
                <div class="tasktime">
                    <h3>${t.date}</h3>
                    <p>${t.end}</p>
                </div>
            </div>
        `;
        add_task.insertAdjacentHTML("beforeend", taskHTML);
    });
}



let notify = document.querySelector(".notify")
let notificationContainer = document.querySelector(".notification")
let backward = document.querySelector(".backward i")
let notes = document.querySelector(".notecontainer")


notify.addEventListener("click", function () {
    notificationContainer.style.transform = `translate(0, 0)`
    notificationContainer.style.transformOrigin = "0 0"
})

backward.addEventListener("click", function () {
    notificationContainer.style.transform = `translate(-100%, 0)`
    notificationContainer.style.transformOrigin = "0 0"
})


// console.log(localStorage.getItem("tasks"));


