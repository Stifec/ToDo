
// ============== Open database ============

let db;
let openOrCreateDB;
openData(readNote)
function openData(dat) {

    openOrCreateDB = window.indexedDB.open('todo_db', 1);

    openOrCreateDB.onsuccess = function (e) {
        db = e.target.result;
        console.log('База открыта>>>>', db)
        dat();
    }
  }



// =========== READ database =================
const todos = document.querySelector('.list');
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

            // newNote.innerHTML = `
            //     <h3>${cursor.value.title}</h3>
            //     <p class="item-discription">${cursor.value.body}</p>
            //     <div class="btn-note">
            //        <button>
            //             <svg class="btn-note-edit"><use href="../images/1symbol-defs.svg#icon-pencil">pencil</use></svg>
            //             Edit
            //         </button>
            //         <button class="delete" id="${cursor.value.id}">
            //             <svg class="btn-note-edit"><use href="../images/1symbol-defs.svg#icon-bin2">bin2</use></svg>
            //             Delete ${cursor.value.id}
            //         </button>
            //     </div>
            // `;
            const h3 =document.createElement('h3')
            const pg = document.createElement('p')
            pg.classList.add("item-discription")
            pg.textContent = cursor.value.body
            h3.textContent = cursor.value.title
            newNote.appendChild(h3);
            newNote.appendChild(pg);
            const btnGroup = document.createElement('div')
            btnGroup.classList.add('btn-note')
            newNote.appendChild(btnGroup)
            const btn = document.createElement('button')
            btn.classList.add('delete')
            btn.textContent = 'DELETE'
            btnGroup.appendChild(btn)
            btn.addEventListener('click', deleteItem)


            todos.appendChild(newNote);
            // let deleteBtn = document.querySelector('.delete')
            // console.log('>>>', deleteBtn)
            // deleteBtn.addEventListener('click', deleteItem)
            cursor.continue();



        } else {
            if(!todos.firstChild) {
                let newNote = document.createElement('div');
                newNote.classList.add("item-note");
                newNote.innerHTML = `
                <h3>No todos.</h3>
                `;
                todos.appendChild(newNote);
            }
            console.log("All read notes")
        }


    }
}

//====== delete

function deleteItem(e) {
    console.log("DELETE !!!!")
    const todoId = Number(e.target.parentNode.parentNode.getAttribute('data-id'));

    console.log('id>>>', todoId)

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



