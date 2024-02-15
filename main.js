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
let tabs = document.querySelectorAll(".task-tab div")
let mode = "all"
let filterList = []
let underLine = document.getElementById("under-line")
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
  });
taskInput.addEventListener("focus", function(){taskInput.value = ""})

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

function addTask(){
    if(taskInput.value == ""){
        addButton.disabled == true
    }else{
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    render();
}
}

function render(){
    // 1. 내가 선택한 탭에 따라서
    // let list = [];
    if(mode === "all"){
        //tasklist
        list = taskList
    }else if(mode==="ongoing" || mode==="done"){
        //ongoing, done -> filterList
        list = filterList
    }
    // 2. 리스트를 달리 보여준다
    let resultHTML = "";
    if(list.length ==0){
        resultHTML += "";
    }else{
        for(let i=0; i<list.length; i++){
            if(list[i].isComplete==true){
                resultHTML += `<div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button class = "btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                    <button class = "del-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>`;
            }else{
                resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button class = "btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-circle-check"></i></button>
                    <button class = "del-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>`;
            }
    }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
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
    for(let i=0; i<list.length;i++){
        if(list[i].id==id){
            list.splice(i,1)
            taskList = list
            break;
        }
    }
    console.log(list)
    render();
}

function filter(event){
    console.log(event.target.id)
    mode = event.target.id
    filterList = []
    if(mode === "all"){
        //전체리스트를 보여준다
        render()
    }else if(mode ==="ongoing"){
        //진행중인 아이템을 보여준다.
        //task.isComplete = false
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render()
        console.log("진행중", filterList)
    }else if(mode ==="done"){
        //끝난 아이템을 보여준다
        //task.isComplete = true
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete ===true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function randomIDGenerate() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}

tabs.forEach(menu=>menu.addEventListener("click", (e)=>underlineIndicator(e)))

function underlineIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight-4 + "px";
}