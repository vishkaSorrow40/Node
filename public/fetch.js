const useName= document.getElementById("apik");
const getApiKey = document.getElementById("signup");
const login = document.getElementById("login");
const upTodate= document.getElementById("updateBut");
const table = document.getElementById("models");

console.log("loginName:", useName);
console.log("getApiKey:", getApiKey);

let api = "";

getApiKey.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("getApiKey");
    const name = useName.value;
    console.log("name:", name);
    fetch(`/v1/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "userName": `${name}` })
    })
        .then((response) => {
            console.log("response:", response);
            return response.json();
        })
        .then((data) => {
            console.log("data:", data);
            alert("пользователь авторизован");
            api = data.api;
            console.log("api:", api);
            return;
        })
        .catch((err) => {
            console.log("err:", err);
            alert("Произошла ошибка при получении api_key");
        });
});

login.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("getApi");
    const id = useName.value;
    console.log("api:", id);
    api = id;
    console.log("api:", api);
    })


function getAllModels() {
    fetch(`/v1/models`)
        .then((response) => {
            console.log("response:", response);
            return response.json();
        })
        .then((data) => {
            console.log("data:", data);
            if (data == null || data.length == 0) {
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerHTML = "No models";
                tr.appendChild(td1);
                table.appendChild(tr);
                return;
            }
            console.log("table:", table);
            let i = 0;
            data.forEach((element) => {
                i++;
                console.log("element:", element);
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                
                const buttonShow = document.createElement("button");
                buttonShow.innerHTML = "Show";
                buttonShow.classList.add("btn_show");
                buttonShow.dataset.id = element._id;
                const buttonDelete = document.createElement("button");
                buttonDelete.innerHTML = "Delete";
                buttonDelete.classList.add("btn_del");
                buttonDelete.dataset.id = element._id;
                td1.innerHTML = "name model " + i + ": " + element.modelName;
                const divBut = document.createElement("div");
                divBut.appendChild(buttonShow);
                divBut.appendChild(buttonDelete);
                tr.appendChild(td1);
                tr.appendChild(divBut);
                table.appendChild(tr);
            });
        })
        .catch((err) => {
            console.log("err:", err);
            alert("Произошла ошибка при получении моделей");
        });
}

table.addEventListener("click", (e) => {
    console.log("e.target:", e.target);
    console.log("e.target.classList:", e.target.classList);
    console.log("e.target.dataset.id:", e.target.dataset.id);
    if (e.target.classList.contains("btn_show")) {
        console.log("show model");
        const id = e.target.dataset.id;
        console.log("id:", id);
        fetch(`/v1/model/${id}`)
            .then((response) => {
                console.log("response:", response);
                if (response == null) {
                    err = new Error;
                    return err;
                }
                return response.json();
            })
            .then((data) => {
                console.log("data:", data);
                if (data == null) {
                    alert("Нет такой модели лель");
                    return;
                }
                // show model
                alert(
                    "Model: " +
                    data.modelName +
                    "\n" +
                    "UserName: " +
                    data.userName +
                    "\n" +
                    "code: " +
                    data.code +
                    "\n" +
                    "Description: " +
                    data.description +
                    "\n" +
                    "Comments: " +
                    data.comments +
                    "\n" +
                    "created: " +
                    data.created +
                    "\n" +
                    "modified: " +
                    data.modified
                );
            })
            .catch((err) => {
                console.log("err:", err);
                alert("Произошла ошибка при получении модели");
            });
    }
    if (e.target.classList.contains("btn_del")) {
        console.log("delete model");
        const id = e.target.dataset.id;
        console.log("id:", id);
        console.log("api:", api);
        fetch(`/v1/models/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                api: api,
            },
        })
            .then((response) => {
                console.log("response:", response);
                if (response.statusText == "Unauthorized") {
                    alert("Не авторизован");
                    return;
                }
                return response.json();
            })
            .then((data) => {
                console.log("data:", data);
                if (data == null) {
                    //   alert("No such model");
                    return;
                }
                // delete model
                alert("Model deleted");
                table.innerHTML = "";

                getAllModels();
            })
            .catch((err) => {
                console.log("err:", err);
                alert("Произошла ошибка при удалении модели");
            });
    }
});

upTodate.addEventListener("click", () => {
    console.log("refresh");
    table.innerHTML = "";
    getAllModels();
});

getAllModels();