

// ======================== Add notes ==============
let notes = [];
const createNote = document.querySelector('.btn-create-note');

notes.forEach((elem) => {
    console.log(elem);
});

createNote.addEventListener('click',()=>{
    notes.push(90);
    console.log(notes);
    }

)