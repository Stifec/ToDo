
// ============== Open database ============
openData(readNote)
let db;
function openData(dat) {

    const openOrCreateDB = window.indexedDB.open('todo_db', 1);

    openOrCreateDB.onsuccess = function (e) {
        db = e.target.result;
        console.log('База открыта>>>>', db)
        dat();
    }
  }

// =========== READ database =================
const todos = document.querySelector('ol');
function readNote () {

    const  transaction = db.transaction(["note_tb"]);
    const objectStore = transaction.objectStore("note_tb");
    const request = objectStore.openCursor();

    request.onsuccess = function (e) {
        const cursor = e.target.result;

        if (cursor) {
            const listItem = document.createElement('li');
            const h3 = document.createElement('h3');
            const pg = document.createElement('p');
            listItem.appendChild(h3);
            listItem.appendChild(pg);
            todos.appendChild(listItem);
            h3.textContent = cursor.value.title;
            pg.textContent = cursor.value.body;
            listItem.setAttribute('data-id', cursor.value.id);
            const deleteBtn = document.createElement('button');
            listItem.appendChild(deleteBtn);
            deleteBtn.textContent = 'Remove';
            // deleteBtn.addEventListener('click', deleteItem);

            console.log(`ID: ${cursor.key}, Value: ${cursor.value.title}, Value2: ${cursor.value.content}`);
            cursor.continue();
        } else {
            if(!todos.firstChild) {
                const listItem = document.createElement('li');
                listItem.textContent = 'No Todo.'
                todos.appendChild(listItem);
            }
            console.log("All read notes")
        }

    }
}

