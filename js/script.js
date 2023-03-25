window.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector(".table");
  const tableBody = table.querySelector("tbody");
  const addRowBtn = document.querySelector(".table__button--add");
  const submitBtn = document.querySelector(".table__button--submit");
  const searchInp = document.querySelector(".search__input");

  // функция добавления новой строки
  function addRow() {
    const newRow = document.createElement("tr");
    newRow.classList.add("table__row");
    newRow.innerHTML = `
    <td class="table__cell table__cell--name"><input type="text" class="table__input"></td>
    <td class="table__cell table__cell--position">
      <select class="table__select">
        <option value="аналитик">Аналитик</option>
        <option value="менеджер">Менеджер</option>
        <option value="программист">Программист</option>
        <option value="юрист">Юрист</option>
      </select>
    </td>
    <td class="table__cell table__cell--age"><input type="number" class="table__input"></td>
    <td class="table__cell table__cell--skills"><input type="text" class="table__input"></td>
    <td class="table__cell"><button class="table__button">Удалить</button></td>
  `;
    tableBody.appendChild(newRow);

    // добавляем обработчик для кнопки удаления строки
    const deleteBtn = newRow.querySelector(".table__button");
    deleteBtn.addEventListener("click", () => {
      newRow.remove();
    });
  }

  // обработчик клика на кнопку "Добавить"
  addRowBtn.addEventListener("click", addRow);

  // функция валидации заполнения всех полей в строке
  function validateRow(row) {
    const inputs = row.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        return false;
      }
    }

    const ageInput = row.querySelector('input[type="number"]');
    if (ageInput && ageInput.value <= 0) {
      alert("возраст должен быть больше 0");
      return false;
    }

    return true;
  }

  // обработчик клика на кнопку "Отправить"
  submitBtn.addEventListener("click", () => {
    const rows = tableBody.querySelectorAll("tr");
    const data = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // валидация заполнения всех полей
      if (!validateRow(row)) {
        alert("Заполните все поля в строке " + (i + 1));
        return;
      }

      // получение данных из полей в строке
      const fio = row.querySelector('input[type="text"]').value;
      const position = row.querySelector("select").value;
      const age = row.querySelector('input[type="number"]').value;
      const skills = row.querySelectorAll('input[type="text"]')[1].value;

      // добавление данных в массив
      data.push({
        fio: fio,
        position: position,
        age: age,
        skills: skills,
      });
    }

    // преобразование массива в JSON и вывод в консоль
    console.log(JSON.stringify(data));
  });

  // поиск значения и подсветка красным найденных совпадений

  searchInp.addEventListener("input", () => {
    const rows = table.querySelectorAll("input");
    if (searchInp.value) {
      rows.forEach((row) => {
        if (row.value.toLowerCase().includes(searchInp.value.toLowerCase())) {
          row.style.backgroundColor = "red";
        } else {
          row.style.backgroundColor = "";
        }
      });
    } else {
      rows.forEach((row) => {
        row.style.backgroundColor = "";
      });
    }
  });
});
