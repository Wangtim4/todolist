let add = document.querySelector('form button');

let section = document.querySelector('section');



add.addEventListener('click', e => {
    e.preventDefault();

    // console.log(e.target.parentElement);
    let form = e.target.parentElement;

    // 1.獲取元素值
    // console.log(form.children);
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDay = form.children[2].value;

    // if(todoText === ""||todoMonth===""||todoDay===""){
    //     alert("不能空白");
    //     return;
    // }


    // 2.建立TODO結構
    let todo = document.createElement('div');
    // 3.在div加樣式
    todo.classList.add('todo');

    // 2.DOM 節點的新增 - createElement
    let text = document.createElement('p');
    // 3.節點新增樣式
    text.classList.add('todo-text')
    // 4.將獲取元素值寫入
    text.innerText = todoText;

    let time = document.createElement('p');
    time.classList.add('todo-time');
    time.innerText = todoMonth + "/" + todoDay;

    // 5.appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
    todo.appendChild(text);
    todo.appendChild(time);

    let checkbtn = document.createElement('button');
    checkbtn.classList.add("check");
    checkbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkbtn.addEventListener('click', e => {
        // console.log(e.target.parentElement);
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle('done')
    })

    let delbtn = document.createElement('button');
    delbtn.classList.add("delete");
    delbtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delbtn.addEventListener('click', e => {
        // console.log(e.target);
        let todoItem = e.target.parentElement;
        // todoItem結束時
        todo.addEventListener("animationend", (() => {
            // 4.刪除暫存
            let text = todoItem.children[0].innerHTML;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if (item.todoText == text) {

                    myListArray.splice(index, 1);
                    localStorage.setItem('list', JSON.stringify(myListArray));
                }
            })

            todoItem.remove();
        }))
        // todoItem動畫
        todoItem.style.animation = 'scaleDowm 0.3s forwards'
        // todoItem.remove();
    })

    todo.appendChild(checkbtn);
    todo.appendChild(delbtn);

    todo.style.animation = "scaleUp 0.5s forwards";

    // #2-1建立物件
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDay: todoDay
    };
    // 2-2.暫存myTodo物件https://ithelp.ithome.com.tw/articles/10251508
    let myList = localStorage.getItem("list");
    // console.log(myList);

    // 如果暫存myList為空，將暫存存入
    if (myList == null) {
        // #JSON.stringify把資料轉成陣列存進去
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        // 如果暫存myList有值，將值存入myListArray
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));

    }

    console.log(JSON.parse(localStorage.getItem("list")));

    // 6.新增完清空
    form.children[0].value = '';
    form.children[1].value = '';
    form.children[2].value = '';

    section.appendChild(todo);

})

loadData();

function loadData() {

    // 3.將暫存顯示
    let myList = localStorage.getItem('list');
    if (myList !== null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {

            let todo = document.createElement("div");
            todo.classList.add("todo");
            let text = document.createElement("p");
            text.classList.add("todo-text");
            let time = document.createElement("p");
            time.classList.add("todo-time");
            text.innerText = item.todoText;
            time.innerText = item.todoMonth + "/" + item.todoDay;

            todo.appendChild(text);
            todo.appendChild(time);

            let checkbtn = document.createElement("button");
            checkbtn.classList.add("check");
            checkbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            checkbtn.addEventListener('click', e => {
                console.log(e.target.parentElement);
                let todoItem = e.target.parentElement;
                todoItem.classList.toggle('done');
            })

            let delbtn = document.createElement("button");
            delbtn.classList.add("delete");
            delbtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

            delbtn.addEventListener('click', e => {
                let todoItem = e.target.parentElement;
                todoItem.style.animation = 'scaleDowm 0.3s forwards';

                todo.addEventListener('animationend', () => {
                    // 4.刪除暫存
                    let text = todoItem.children[0].innerHTML;
                    let myListArray = JSON.parse(localStorage.getItem("list"));
                    myListArray.forEach((item, index) => {
                        if (item.todoText == text) {

                            myListArray.splice(index, 1);
                            localStorage.setItem('list', JSON.stringify(myListArray));
                        }
                    })

                    todo.remove();
                })

                // 4.刪除暫存
                let text = todoItem.children[0].innerHTML;
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    if (item.todoText == text) {

                        myListArray.splice(index, 1);
                        localStorage.setItem('list', JSON.stringify(myListArray));
                    }
                })
            })

            todo.appendChild(checkbtn);
            todo.appendChild(delbtn);

            section.appendChild(todo);
        });
    }
}

// 依時間排列
function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
            result.push(arr2[j]);
            j++;
        } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
            result.push(arr1[i]);
            i++;
        } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
            if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
                result.push(arr2[j]);
                j++;
            } else {
                result.push(arr1[i]);
                i++;
            }
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let right = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);

        return mergeTime(mergeSort(right), mergeSort(left));
    }
}

console.log(mergeSort(JSON.parse(localStorage.getItem("list"))));

let sortBtn = document.querySelector("div.sort button");

sortBtn.addEventListener('click', () => {
    // sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));

    // remove data
    let len = section.children.length;
    for (let i = 0; i < len; i++) {
        section.children[0].remove();
    }

    loadData();

})