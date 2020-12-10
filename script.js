//Global variables
const addForm = document.querySelector('.add');
const newNote = document.querySelector(".new-note");
const list = document.querySelector(".note-list");
const search = document.querySelector(".search input");
const noteList = document.querySelector('.note-list');
const titleInput = document.querySelector(".title");


let allNotes = [];
let activeNoteID;


//FIRST STEP
//We need to add eventlistener to the button, så we can add new notes.A varibale newNote, conected to the button
//we need to 'fetch' what is inside the textfield, which is aded as a variable addForm. We use .value
//We also want ot generate a new HTML template when click, so we add a new HTML template were the notes are added

// saxat från kj start
function loadNotes() {
  let notesArrStr = localStorage.getItem('key');
  if (!notesArrStr) {
      return;
  }
  allNotes = JSON.parse(notesArrStr);
}
function saveNotes() {
  localStorage.setItem('key', JSON.stringify(allNotes));
}
function readNote(id) {
  // hitta ett noteobjekt vars id matchar med argumentet id
  return allNotes.find(note => note.id == id);
}
function setEditor(note) {
  // console.log(note)
  // uppdatera innehållet i edtiron
  // sätt activenoteID
  quill.setContents(note.content);
  document.querySelector(".title").value = note.title;
  //setActiveNoteID(note.id);

}
function setActiveNoteID(id) {
  activeNoteID = id;
}
function updateNote(id) {
  // skapa INGEN ny note, istället uppdatera en befintlig note
  let noteObj = allNotes.find(note => note.id == id);
  noteObj.content = quill.getContents();
  noteObj.note = quill.getText();
  noteObj.title = titleInput.value;

  saveNotes();
  //renderNotesList(notesArr);

}
// saxat kj end

newNote.addEventListener("click", (e) => {
  e.preventDefault();
  if (activeNoteID) {
    // användaren har redan klickat på en note!
    // ev. gör en save
  }
  
  const note = quill.getText();
  const content = quill.getContents();
  const title = document.querySelector(".title").value;
  const noteObject = {
    title : title,
    content: content, 
    note: note,
    id: Date.now()
  }
  setActiveNoteID(noteObject.id)
  
  
//Get items from what is written in notes and title
// gets the item "keyNote" in order to able to store it. 
  //let notes = localStorage.getItem("key");

  //if (notes === null ) {
  //  notes ='[]'
  //} 
  
  // Parse  makes the string to an array 
  // Enables us to add notes in existing array (noteObject)
  //notes = JSON.parse(notes)
  allNotes.push(noteObject)
  saveNotes();
  //Stringify will make it to a string. To save since local storage only saves strings 
  //let noteObject_serialized = JSON.stringify(notes);
  //localStorage.setItem("key", noteObject_serialized);
  //loadNotes()
  // const notes = JSON.stringify(quill.getContents());
  // ge invoke the function generate template here, so we can add the notes
  generateTemplate(noteObject.id, note, title);
  
});

// get my array to a constant 
// If array not get lopa through, so all notes are saved. 
window.onload = () =>{
  loadNotes();
  let newNoteObject = localStorage.getItem("key");
  if (newNoteObject !== null) {

// Loping through all notes 
    newNoteObject = JSON.parse(newNoteObject)
    newNoteObject.forEach((note) => {
      generateTemplate(note.id, note.note, note.title)
    });
  } 
  noteList.addEventListener('click', function (evt) {
    let clickedLI = evt.target.closest('li');
    let clickedID = clickedLI.getAttribute('data-id');
    setEditor(readNote(clickedID));
    setActiveNoteID(clickedID);
})
}

//SECOND STEP
//We want to generate a new template, where the "notes" we add goes to. So we need to add a new function "generate template "
//now we want to take this template and inject in the ul. We need to store this in a variable. (html)
//what we are doing is that we are passing in the "notes" in this generatetemplate
//we target the ul tag and add the HTML template that we have generated in second step 'html'

const generateTemplate = (id, note, title) => {
  const shortTitle= title.substring(0,15);
  const shortNote=note.substring(0,15);
  // kolla titles längd (.length)
  // om den är över 15 tecken, ta enbart de 15 första att visa
  // ev lägg på ...
  const html = `<li class="listStyle" data-id=${id}>
   <span class="styleTime">${new Date()}</span>
    <span class="styleTitle">${title}</span>
    <span class="styleNote">${note}</span>
  <input class="checkbox" id="${id}" type="checkbox"/>
  <label for="${id}" class="favorite"></label>
  <i class="far fa-trash-alt delete"></i>
    </li>`;
const shortHtml = `<li class="listStyle" data-id=${id}>
   <span class="styleTime">${new Date()}</span>
    <span class="styleTitle">${shortTitle}</span>
    <span class="note">${shortNote}</span>
  <input class="checkbox" id="${id}" type="checkbox"/>
  <label for="${id}" class="favorite"></label>
  <i class="far fa-trash-alt delete"></i>
    </li>`;

  if(title.length >= 15 && note.length >= 15) {
   list.innerHTML += shortHtml;
  }
else{
  list.innerHTML += html;
};
};


//THIRD STEP: DELETE NOTES
//We want to add delete to our added notes, which is found in the UL tag. "list"
//If there is a trash can, we want the option to press delete. (e.target finds out if e is trash can that is clicked)
// if e.target contains the "delete" class then we want to remove the whole li tag.
//So we need to find the parent, which is the li tag, so we can remove the whole tag.

//Todo - delete local storage 
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let clickedLI = e.target.closest('li');
    let clickedID = clickedLI.getAttribute('data-id');
    allNotes = allNotes.filter(note => note.id != clickedID)
    e.target.parentElement.remove();
    saveNotes();
    //need to remove local storage for only one note 
    //localStorage.removeItem(key.note);
  }
});

//Clearing fields when clicking button clear 
function ClearFields() {

  document.getElementById("myInput").value = "";
  document.querySelector(".ql-editor p").innerText ="";
}

//FOURTH STEP: FILTERING THE NOTES
//We need to get a reference for the input field, where we search for notes.
//we need reference to input and not search, because we will listen to a keyup event and not a submit event
//So we need the search class and listen to the input inside it.

//Key up event that is listening to what ever we type in the search input field
//When ever a user type a leter int he field, a callback function fires targeting existing li notes
//we call this callback function filterNotes everytime a user preces letter on keyboard

search.addEventListener("keyup", () => {
  const term = search.value.trim();
  filterNotes(term);
});


//FIFTH STEP
//Creating a callback function that triggers everytime we write something in search
//We want to target what ever is in the li, in order to remove the li
//We therefore listen to the ul (the parent) tag which contains the lists of notes (children)
//We need to filter through arrays, so we convert the li's to arrays (Array.from) method
//it takes the children html collection and turns it into and array
//when doing this we enable the possiblity to use filter and forEch method
//We are chaining the methods, therefore switch rows

//Filter method, return us a new array, whatever items we are keeping into it
//we want to filter out what is not matching what I type
//notes.content looks for text inside the span tag
//we compare the term, with the text content and it will return true or false
//we reverse the boolean "negate it"
//filtering arrays which does not contain the notes

//For each
//we want to filter out the notes that do match. so we can remove the filter class
//we add a for Ech method to filter out the notes that does not match. We apply a class, so they disapear
//filter class rule is added in the css.

const filterNotes = (term) => {
  Array.from(list.children)
    .filter((note) => !note.textContent.includes(term))
    .forEach((note) => note.classList.add("filtered"));

  Array.from(list.children)
    .filter((note) => note.textContent.includes(term))
    .forEach((note) => note.classList.remove("filtered"));
};

//template button for the different layouts 
// on click change existing html layout for notes (textarea) 
// on click the html layout will change to a chosen to css attribute, which is connected to the different layouts 
// on click add css class (add/remove classes on click )

//FRÅGA KRISTAIN OM TEXTAREA QUILL 
//SÄTTA UPP MÅL OCH PRIORITERA 
//ADDERA DATUM I OBJEKT
//DELETE LOCAL STORAGE
//LÄGG TILL MALLAR
//FIXA CSS
