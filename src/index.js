const todoFormEl = document.querySelector(".todo-form");

const todoListEl = document.querySelector(".todo-list");

// 요일, 시간 표시 추가

var timeInterval = 1000;

function showCurrentTime() {
  var timestamp = getCurrentTimestamp();

  var timestampString = buildTimestampString(timestamp);

  appendTimestamp(timestampString, timestamp);
};

function getCurrentTimestamp() {
  var months = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  var dateObj = new Date();

  var timestamp = {
    day: dateObj.getDate(),
    month: months[dateObj.getMonth()],
    year: dateObj.getFullYear(),
    hour: dateObj.getHours(),
    minutes: (dateObj.getMinutes() <= 9 ? '0' + dateObj.getMinutes() : dateObj.getMinutes())
  }

  return timestamp;
}

function buildTimestampString(timestamp) {
  var string = timestamp.month +
    ' ' + timestamp.day +
    ' ' + timestamp.year +
    '<br />' + timestamp.hour +
    ':' + timestamp.minutes +
    ' ' + (timestamp.hour <= 11 ? 'am' : 'pm');

  return string;
}
function appendTimestamp(timestampString, timestamp) {
  var timeDiv = document.getElementById('time');

  if (timeDiv !== null) {
    timeDiv.innerHTML = timestampString;
    timeDiv.setAttribute('datetime', timestamp.year + '-' +
      (timestamp.month + 1 <= 9 ? '0' + (timestamp.month + 1) : timestamp.month + 1) + '-' + timestamp.day + ' ' + timestamp.hour + ':' + timestamp.minutes);

  };
}

setInterval(showCurrentTime, timeInterval);
// ---------------------------------------------

// todo-form에서 입력된 Input이 할일 목록에 생성되게 하기.
todoFormEl.addEventListener("submit", e => {
  e.preventDefault();

  // 입력된 input의 값이 추가를 눌렀을 경우 발생하는 이벤트
  addTodo(e.target.elements.todo.value);
  // 추가를 누른 후, input창이 리셋
  e.target.reset();
});

// 사용자가 input 작성 후 추가 시, ul에 li(inpu)을 추가하는 함수.

function addTodo(newTodoText) {
  const todoItemEl = document.createElement("li");

  todoItemEl.textContent = newTodoText;

  todoListEl.appendChild(todoItemEl);

  // 체크 박스를 생성하여, 클릭하면 line-through 효과 발생.
  // 할일 목록 맨 앞에 체크 박스를 오게 하기 위한 코드.
  const theFirstEl = todoItemEl.firstChild;
  const checkBoxEl = document.createElement("input");
  document.createElement("input");
  checkBoxEl.type = "checkbox";
  todoItemEl.insertBefore(checkBoxEl, theFirstEl);
  checkBoxEl.addEventListener("click", e => {
    todoItemEl.classList.toggle("done");
  });

  // li가 생성될 시 옆에 delete기능이 있는 버튼을 옆에 생성하기.
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "delete";
  deleteButtonEl.classList.add("deleteButton");
  todoItemEl.appendChild(deleteButtonEl);

  // 삭제 버튼을 클릭했을 때 할일 항목이 삭제되도록 하기
  deleteButtonEl.addEventListener("click", e => {
    todoListEl.removeChild(todoItemEl);
  });

  // ------ 위로 이동 버튼 생성 ------
  // li 생성 시, 위로 버튼을 li 옆에 생성.
  const upButtonEl = document.createElement("button");
  upButtonEl.textContent = "up";
  todoItemEl.appendChild(upButtonEl);

  // 위로 버튼을 눌렀을 때, 할일 목록이 위로 이동.
  upButtonEl.addEventListener("click", e => {
    // 첫번째 li요소가 위로 버튼이 눌렸을 시, 맨 아래로 가는 것을 방지.
    if (todoItemEl.previousElementSibling != null) {
      todoListEl.insertBefore(todoItemEl, todoItemEl.previousElementSibling);
    }
  });

  // ------ 아래로 버튼 생성 ------
  // li 생성 시, 아래로 버튼을 li 옆에 생성.
  const downButtonEl = document.createElement("button");
  downButtonEl.textContent = "down";
  todoItemEl.appendChild(downButtonEl);

  // 아래로 버튼을 눌렀을 때, 할일 목록이 아래로 이동.
  downButtonEl.addEventListener("click", e => {
    // 마지막 li요소가 아래로 버튼이 눌렸을 시, 에러가 나는 것을 방지.

    if (todoItemEl.nextElementSibling !== null) {
      todoListEl.insertBefore(
        todoItemEl,
        todoItemEl.nextElementSibling.nextElementSibling
      );
    }
  });
}
