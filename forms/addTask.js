let db; //===== create
const openOrCreateDB = window.indexedDB.open('todo_db', 1);

openOrCreateDB.addEventListener('error', () => console.error('Error opening DB'));

openOrCreateDB.addEventListener('success', () => {
    console.log('Successfully opened DB');
    db = openOrCreateDB.result;
});

openOrCreateDB.addEventListener('upgradeneeded', init => {
    db = init.target.result;

    db.onerror = () => {
        console.error('Error loading database.');
    };

    const table = db.createObjectStore('todo_tb', { keyPath: 'id', autoIncrement:true });
    const note = db.createObjectStore('note_tb', { keyPath: 'id', autoIncrement:true });

    note.createIndex('title', 'title', { unique: false });
    // note.createIndex('desc', 'desc', { unique: false });
    table.createIndex('descNote', 'descNote', { unique: false });
});

//========== Save

const todos = document.querySelector('div');
const form = document.querySelector('form');
const noteTitle = document.querySelector('#titleNote');
const noteDesc = document.querySelector('#descNote');
const submit = document.querySelector('button');

form.addEventListener('submit', addTodo);

function addTodo(e) {
    e.preventDefault();
    const newTodo = { title: noteTitle.value, body: noteDesc.value };
    const transaction = db.transaction(['note_tb'], 'readwrite');
    const objectStore = transaction.objectStore('note_tb');
    const query = objectStore.add(newTodo);
    query.addEventListener('success', () => {
        noteTitle.value = '';
        noteDesc.value = '';
    });
    // transaction.addEventListener('complete', () => {
    //     showTodos();
    // });
    transaction.addEventListener('error', () => console.log('Transaction error'));
}






