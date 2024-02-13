//유저가 값을 입력
//+버튼 입력시 할일 추가
//delete버튼을 누르면 할일이 삭제됨
//check버튼 누르면 할일이 끝나면서 삭선이 그어짐
//1. check 버튼을 클릭하는 순간 true
//2. true면 끝난걸로 간주하고 삭선
//3. false면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면 언더바가 이동
//끝남탭은 끝난 요소만, 진행중은 진행중인 요소만
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput=document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []
addButton.addEventListener("click", addTask);

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    render();
}

function render(){
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete==true){
            resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`
        }else{
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`
        };
        document.getElementById("task-board").innerHTML = resultHTML;

    }
}

function toggleComplete(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);
            break;
        }
    }
    render()
}

function randomIDGenerate() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };