// variáveis globai que irão receber os elementos do html que irei manipular
const toDoInput = document.getElementById('todoInput');
const toDoAddBtn = document.getElementById('todoForm');
const toDoList = document.getElementById('todoLista');

// variáveis que irão receber os botões de marcar todos e deletar todos
const btnCheckAll = document.getElementById('todoMarcarTodos');
const btnDeleteAll = document.getElementById('todoRemoverTodos');

// escutadores de evento que irei usar
// nesse caso utilizei o evento de submit ao invés do click pois ele está atribuído a uma ação de envio de formuláro do html
toDoAddBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = toDoInput.value.trim();

    if(input !== ''){
        createToDoItem(input);
    } else {
        alert('escreve uma mensagem');
    }
});

toDoList.addEventListener('click', handleItem);
btnCheckAll.addEventListener('click', checkAll);
btnDeleteAll.addEventListener('click', deleteAll);



// funções que vou usar para criar cada item da lista
function createToDoItem(input){

    const item = document.createElement('li');
    const task = document.createElement('span');
    const removeTask = document.createElement('button');

    removeTask.className = "todo__lista-remove";
    removeTask.innerHTML = "X";

    task.innerHTML = input;

    item.appendChild(task);
    item.appendChild(removeTask);

    // escutadores de eventos do drag and drop
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', dragStart, false);
    item.addEventListener('dragenter', dragEnter, false);
    item.addEventListener('dragover', dragOver, false);
    item.addEventListener('dragleave', dragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', dragEnd, false);

    toDoList.appendChild(item);

    toDoInput.value = '';
}

// funções para tratar os itens da lista individualmente e coletivamente
function handleItem(e){
    const item = e.target;

    if(item.tagName == 'SPAN'){
        checkItem(item);
    } 

    if(item.classList.contains('todo__lista-remove')){
        removeItem(item);
    }
}

function checkItem(item){
    if(item.classList.contains('checked')){
        item.classList.remove('checked');
    } else {
      item.classList.add('checked');  
    }
}

function removeItem(item){
    const deleteItem = item.parentNode;
    toDoList.removeChild(deleteItem);
}

function checkAll(){
    toDoList.childNodes.forEach((item) => {
        if(item.tagName == 'LI'){
            let task = item.firstChild;
            task.classList.add('checked');
        }
    })
}

function deleteAll(){
    toDoList.innerHTML = '';
}


// funções de drag and drop
let dragSrcEl = null;

function dragStart(e) {
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(e) {
  e.preventDefault();

  e.dataTransfer.dropEffect = 'move'; 
  return false;
}

// as functions dragenter e dragleave são responsáveis de alterar a aparência do meu li enquanto ele é arrastado, inlui a linha tracejada mostrando os locais possíveis onde podem ser arrastados 
function dragEnter(e) {
  this.classList.add('over');
}

function dragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  e.stopPropagation();
  
  if (dragSrcEl != this) {

    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}

function dragEnd(e) {
  let items = document.querySelectorAll('.todo__lista');

  items.forEach((item) => {
    item.classList.remove('over');
  });
}