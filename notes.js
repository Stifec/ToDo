let timeNow = document.querySelector('.time')
timeNow.innerHTML = `TODAY IS: ${new Date().toLocaleDateString()}`


// ============== Open database ============

let db;


    const openOrCreateDB = window.indexedDB.open('todo_db', 1);

    openOrCreateDB.onsuccess = function (e) {
        db = e.target.result;
        console.log('База открыта>>>>', db)
        readNote();
    }


// =========== READ database =================




const todos = document.querySelector('.list');
    let sum =document.querySelector('.counter')
function readNote () {

    const  transaction = db.transaction(["note_tb"]);
    const objectStore = transaction.objectStore("note_tb");
    const request = objectStore.openCursor();

    request.onsuccess = function (e) {
        const cursor = e.target.result;

        if (cursor) {

            let newNote = document.createElement("div");
            newNote.classList.add("item-note");
            newNote.setAttribute('data-id', cursor.value.id)

            const h3 =document.createElement('h3')
            const pg = document.createElement('p')
            const tm = document.createElement('span')
            pg.classList.add("item-discription")
            pg.textContent = cursor.value.body
            h3.textContent = cursor.value.title
            tm.textContent = cursor.value.time
            newNote.appendChild(h3);
            newNote.appendChild(pg);
            newNote.appendChild(tm);
            const btnGroup = document.createElement('div')
            btnGroup.classList.add('btn-note')
            newNote.appendChild(btnGroup)
            const btn = document.createElement('button')
            btn.classList.add('delete')
            btn.textContent = 'DELETE'
            btnGroup.appendChild(btn)
            btn.addEventListener('click', deleteItem)
            todos.appendChild(newNote);

            setInterval(() => {
                {
                    let koli = todos.childElementCount
                    sum.textContent = koli}
            }, 500)

            newNote.addEventListener('dblclick', ()=>{
                newNote.style.boxShadow = '5px 5px 5px red';

            })
            // newNote.addEventListener('click', ()=>{
            //     newNote.style.boxShadow = '5px 5px 5px green';
            // })





            cursor.continue();
        } else {
            if(!todos.firstChild) {
                let newNote = document.createElement('div');
                newNote.classList.add("item-note");
                newNote.innerHTML = `
                <h3>No todos.</h3>
                `;
                todos.appendChild(newNote);

                sum.textContent = '0'
            }
           
        }

        document.querySelectorAll("p").forEach(function(el) {
            el.innerHTML = el.innerHTML.split('', 5).join('').padEnd(8, '.');
        })

    }
}


function updateStudent(e) {

    const todoId = Number(e.target.parentNode.getAttribute('data-id'));
    const transaction = db.transaction(["note_tb"], "readwrite");
    const objectStore = transaction.objectStore("note_tb");
    const request = objectStore.get(todoId);

    request.onerror = function(event) {
        console.log("Ошибка получения студента для обновления: " + event.target.error);
    };
    let newGrade = 'newGrad';
    request.onsuccess = function(event) {

        const data = event.target.result;
        data.body = newGrade;


        const updateRequest = objectStore.put(data);

        updateRequest.onerror = function(event) {
            console.log("Ошибка обновления студента: " + event.target.error);
        };

        updateRequest.onsuccess = function(event) {
            console.log("Студент успешно обновлен");
        };
        window.location.reload()
    };
}

 todos.addEventListener('click', updateStudent)




//====== delete

function deleteItem(e) {
    const todoId = Number(e.target.parentNode.parentNode.getAttribute('data-id'));
    const transaction = db.transaction(["note_tb"], "readwrite");
    const objectStore = transaction.objectStore("note_tb");
    objectStore.delete(todoId);
    transaction.addEventListener('complete', () => {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        alert(`Note with id of ${todoId} deleted`)
        console.log(`Note:${todoId} deleted.`);
        if(!todos.firstChild) {
            let newNote = document.createElement('div');
            newNote.classList.add("item-note");
            newNote.innerHTML = `
                <h3>No todos.</h3>
                `;
            todos.appendChild(newNote);
        }
    });
    transaction.addEventListener('error', () => console.log('Transaction error'));
}



