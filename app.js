let add = document.querySelector('form button');

let section = document.querySelector('section');



add.addEventListener('click', e =>{
    e.preventDefault();

    // console.log(e.target.parentElement);
    let form = e.target.parentElement;

    // 1.獲取元素值
    // console.log(form.children);
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDay = form.children[2].value;

    if(todoText === ""||todoMonth===""||todoDay===""){
        alert("不能空白");
        return;
    }
    

    // 2.建立TODO結構
    let todo = document.createElement('div');
    // 3.在div加樣式
    todo.classList.add('todo');
    
    // 2.DOM 節點的新增 - createElement
    let text =document.createElement('p');
    // 3.節點新增樣式
    text.classList.add('todo-text')
    // 4.將獲取元素值寫入
    text.innerText = todoText;

    let time =document.createElement('p');
    time.classList.add('todo-time');
    time.innerText = todoMonth + "/" + todoDay ;

    // 5.appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
    todo.appendChild(text);
    todo.appendChild(time);

    let checkbtn = document.createElement('button');
    checkbtn.classList.add("check");
    checkbtn.innerHTML='<i class="fa-solid fa-check"></i>';
    checkbtn.addEventListener('click', e =>{
        // console.log(e.target.parentElement);
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle('done')
    })
    
    let delbtn = document.createElement('button');
    delbtn.classList.add("delete");
    delbtn.innerHTML='<i class="fa-solid fa-trash"></i>';
    delbtn.addEventListener('click',e=>{
        // console.log(e.target);
        let todoItem = e.target.parentElement;
        // todoItem結束時
        todo.addEventListener("animationend",(()=>{
            todoItem.remove();
        }))
        // todoItem動畫
        todoItem.style.animation='scaleDowm 0.3s forwards'
        // todoItem.remove();
    })

    todo.appendChild(checkbtn);
    todo.appendChild(delbtn);

    todo.style.animation = "scaleUp 0.5s forwards";

    // #2-1建立物件
    let myTodo ={
        todoText:todoText,
        todoMonth:todoMonth,
        todoDay:todoDay
    };
    // 2-2.暫存myTodo物件https://ithelp.ithome.com.tw/articles/10251508
    let myList = localStorage.getItem("list");
    // console.log(myList);

    // 如果暫存myList為空，將暫存存入
    if(myList == null ) {
        // #JSON.stringify把資料轉成陣列存進去
        localStorage.setItem("list",JSON.stringify([myTodo]));
    }else{
         // 如果暫存myList有值，將值存入myListArray
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list",JSON.stringify(myListArray));

    }

    console.log(JSON.parse(localStorage.getItem("list")));

    // 6.新增完清空
    form.children[0].value ='';
    form.children[1].value ='';
    form.children[2].value ='';

    section.appendChild(todo);

})