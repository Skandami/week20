const button = document.getElementById("button");
const selector = document.getElementById("selector");
const result = document.getElementById("result");
const number = document.getElementById("number");

async function getStarWars() {
	const numberValue = number.value;
    const selectorValue = selector.value;
    result.innerHTML = '<p>ждем ответа от сервера...</p><img src="https://sonobel.com.br/assets/img/loading%20(2).gif" alt="loading" class="img">';
    result.classList.remove("error");
	try {
        if (numberValue == "" || selectorValue =="") {
            throw new Error("empty");
        }
    const response = await fetch(`https://swapi.dev/api/${selectorValue}/${numberValue}/`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        let data = await response.json();
        let text = "";
        if (selectorValue == "films") {
            text = JSON.stringify(data.title).replace(/['"]+/g, '')
        } else {
        text = JSON.stringify(data.name).replace(/['"]+/g, '')
        }
        result.textContent = text;
} catch (error) {
    let text = ""
    if (error.message == "empty") {
        text = "введите данные для поиска"
    }
    if (error.message == 401) {
        text = `не авторизован (номер ошибки: ${error.message})`
    }
    if (error.message == 403) {
        text = `доступ запрещен (номер ошибки: ${error.message})`
    }
    if (error.message == 404) {
        text = `страница не найдена, попробуйте ввести другое число (номер ошибки: ${error.message})`
    }
    if (error.message == 500) {
        text = `внутренняя ошибка сервера, (номер ошибки: ${error.message})`
    }
        result.classList.add("error");
        result.textContent = `${text}`;
};
}

button.addEventListener("click", getStarWars);