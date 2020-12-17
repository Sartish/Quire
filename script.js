//Global variables
const addForm = document.querySelector(".add");
const newNote = document.querySelector(".new-note");
const list = document.querySelector(".note-list");
const search = document.querySelector(".search input");
const noteList = document.querySelector(".note-list");
const titleInput = document.querySelector(".title");
let Delta = Quill.import('delta');

let allNotes = [];
let activeNoteID;

<<<<<<< HEAD

popup
window.addEventListener('DOMContentLoaded', popUpLoad);
=======
//popup
window.addEventListener("DOMContentLoaded", popUpLoad);
>>>>>>> d133df5a95300f47ddc0df2412f2ff92c1c8a765
function closePopUp() {
  let popup = document.querySelector("#popUp");
  popup.style.display = "none";
  localStorage.setItem("savePopUp", true);
  document.body.classList.remove("blurMe");
}

function popUpLoad() {
  if (!localStorage.getItem("savePopUp")) {
    document.getElementById("popUp").classList.toggle("showPopUp");
    document.body.classList.add("blurMe");
  }
  quill.focus();
}

//FIRST STEP
//We need to add eventlistener to the button, så we can add new notes.A varibale newNote, conected to the button
//we need to 'fetch' what is inside the textfield, which is aded as a variable addForm. We use .value
//We also want ot generate a new HTML template when click, so we add a new HTML template were the notes are added

// saxat från kj start
function loadNotes() {
  let notesArrStr = localStorage.getItem("key");
  if (!notesArrStr) {
    return;
  }
  allNotes = JSON.parse(notesArrStr);
}
function saveNotes() {
  localStorage.setItem("key", JSON.stringify(allNotes));
}
function readNote(id) {
  // hitta ett noteobjekt vars id matchar med argumentet id
  return allNotes.find((note) => note.id == id);
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
  let noteObj = allNotes.find((note) => note.id == id);
  noteObj.content = quill.getContents();
  noteObj.note = quill.getText();
  noteObj.title = titleInput.value;

  saveNotes();
  //renderNotesList(notesArr);
}
// saxat kj end

newNote.addEventListener("click", (e) => {
  console.log("Save button pressed");
  e.preventDefault();
  if (activeNoteID) {
    // användaren har redan klickat på en note!
    // ev. gör en save
    updateNote(activeNoteID);
    renderNotesList();
    return;
  }

  const note = quill.getText();
  const content = quill.getContents();
  const title = document.querySelector(".title").value;
  const noteObject = {
    title: title,
    content: content,
    note: note,
    id: Date.now(),
<<<<<<< HEAD
    time:time,
    checked: false,
  }
  setActiveNoteID(noteObject.id)
  
  
//Get items from what is written in notes and title
// gets the item "keyNote" in order to able to store it. 
=======
    checked: false,
  };
  setActiveNoteID(noteObject.id);

  //Get items from what is written in notes and title
  // gets the item "keyNote" in order to able to store it.
>>>>>>> d133df5a95300f47ddc0df2412f2ff92c1c8a765
  //let notes = localStorage.getItem("key");

  //if (notes === null ) {
  //  notes ='[]'
  //}

  // Parse  makes the string to an array
  // Enables us to add notes in existing array (noteObject)
  //notes = JSON.parse(notes)
  allNotes.push(noteObject);
  saveNotes();
<<<<<<< HEAD
  //Stringify will make it to a string. To save since local storage only saves strings 
  //let noteObject_serialized = JSON.stringify(notes);
  //localStorage.setItem("key", noteObject_serialized);
  //loadNotes()
  // const notes = JSON.stringify(quill.getContents());
  // ge invoke the function generate template here, so we can add the notes
  generateTemplate(noteObject.id, note, title, time);
  
=======
 
  generateTemplate(noteObject.id, note, title);
>>>>>>> d133df5a95300f47ddc0df2412f2ff92c1c8a765
});

// get my array to a constant
// If array not get lopa through, so all notes are saved.
window.onload = () => {
  let change = new Delta();
  quill.on('text-change', function(delta) {
    change = change.compose(delta);
  });
  setInterval(function() {
    if (change.length() > 0) {

      if (activeNoteID) {
        // användaren har redan klickat på en note!
        // ev. gör en save
        updateNote(activeNoteID);
        renderNotesList();
        setActiveNoteID(null)
      }
      change = new Delta();
    }
  }, 1*500);
  window.onbeforeunload = function() {
    if (change.length() > 0) {
      return 'There are unsaved changes. Are you sure you want to leave?';
    }
  }

  loadNotes();
  let newNoteObject = localStorage.getItem("key");
  if (newNoteObject !== null) {
    // Loping through all notes
    newNoteObject = JSON.parse(newNoteObject);
    newNoteObject.forEach((note) => {
<<<<<<< HEAD
      generateTemplate(note.id, note.note, note.title, note.time)
=======
      generateTemplate(note.id, note.note, note.title);
>>>>>>> d133df5a95300f47ddc0df2412f2ff92c1c8a765
    });
  }
  noteList.addEventListener("click", function (evt) {
    let clickedLI = evt.target.closest("li");
    let clickedID = clickedLI.getAttribute("data-id");
    if (evt.target.classList.contains("delete")) {
      console.log("Delete detected!");
      let clickedLI = evt.target.closest("li");
      let clickedID = clickedLI.getAttribute("data-id");
      allNotes = allNotes.filter((note) => note.id != clickedID);
      clickedLI.remove();
      saveNotes();
      if (clickedID == activeNoteID) {
        quill.setText('');
        titleInput.value="";
      }
      //need to remove local storage for only one note
      //localStorage.removeItem(key.note);

    } else if (evt.target.classList.contains("favorite")) {
      console.log("fav detected!")
      //const itemKey = evt.target.parentElement.dataset.key;
      console.log("checked clicked");
      toggleFav(clickedID);
    } else {
      console.log("load detected!")
    
    setEditor(readNote(clickedID));
    setActiveNoteID(clickedID);
  }
  });
};
function renderNotesList() {
  noteList.innerHTML ="";
  allNotes.forEach((note) => {
    generateTemplate(note.id, note.note, note.title);
  });


<<<<<<< HEAD
const generateTemplate = (id, note, title,time,checked) => {
  const shortTitle= title.substring(0,15);
  const shortNote=note.substring(0,10);
=======
}
>>>>>>> d133df5a95300f47ddc0df2412f2ff92c1c8a765

const generateTemplate = (id, note, title, checked) => {
  const shortTitle = title.substring(0, 15);
  const shortNote = note.substring(0, 10);
  const time = new Date(id).toLocaleString();
  ////////////////////////////////////////////////////////////////
  //Kolla om noten är favoriserad/checked
  let noteObj = allNotes.find((note) => note.id == id);
  //console.log(noteObj);
  const isChecked = noteObj.checked ? "fav" : "";
 
  const html = `<li class="listStyle" data-id=${id}>
  <i class="favorite fa${noteObj.checked ? 's' : 'r'} fa-star" aria-hidden="true"></i>
  <i class="far fa-trash-alt delete"></i>
   <span class="styleTime">${time}</span>
    <span class="styleTitle">${title}</span>
    <span class="styleNote">${note}</span>

    </li>`;
  const shortHtml = `<li class="listStyle" data-id=${id}>
  <i class="favorite fa${noteObj.checked ? 's' : 'r'} fa-star" aria-hidden="true"></i>
  <i class="far fa-trash-alt delete"></i>
   <span class="styleTime">${time}</span>
    <span class="styleTitle">${shortTitle}</span>
    <span class="styleNote">${shortNote}</span>

    </li>`;
  

  if (title.length >= 15 || note.length >= 15) {
    list.innerHTML += shortHtml;
  } else {
    list.innerHTML += html;
  }
};


function toggleFav(key) {
  console.log("toggleFav called with arg:" + key)
  const index = allNotes.findIndex((item) => item.id === Number(key));
  console.log(index);
  allNotes[index].checked = !allNotes[index].checked;
  //generateTemplate(allNotes[index]);
  //localStorage.setItem("allNotes", JSON.stringify(allNotes));
  saveNotes();
  console.log(index);
  console.log(allNotes[index].checked);
  noteList.innerHTML = "";
  renderNotesList();
}

const check_list = document.querySelector(".note-list");


//Clearing fields when clicking button clear
function ClearFields() {
  document.getElementById("myInput").value = "";
  //document.querySelector(".ql-editor p").innerText = "";
  quill.setText('');
  const note = quill.getText();
  const content = quill.getContents();
  const title = document.querySelector(".title").value;
  const noteObject = {
    title: title,
    content: content,
    note: note,
    id: Date.now(),
    checked: false,
  };
  setActiveNoteID(noteObject.id);
  allNotes.push(noteObject);
  saveNotes();
  generateTemplate(noteObject.id, note, title);

}

search.addEventListener("keyup", () => {
  const term = search.value.trim();
  filterNotes(term);
});

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


// /FIFTH STEP
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
//FOURTH STEP: FILTERING THE NOTES
//We need to get a reference for the input field, where we search for notes.
//we need reference to input and not search, because we will listen to a keyup event and not a submit event
//So we need the search class and listen to the input inside it.

//Key up event that is listening to what ever we type in the search input field
//When ever a user type a leter int he field, a callback function fires targeting existing li notes
//we call this callback function filterNotes everytime a user preces letter on keyboard
//check_list.addEventListener("click", (e) => {
  /* if (e.target.classList.contains("favorite")) {
    const itemKey = e.target.parentElement.dataset.key;
    console.log("checked clicked");
    toggleFav(itemKey);
  } */
//});
////////////////////////////////////////////////////////////////
//to-do add an eventlistner that can check if the checkbox is checked/unchecked
// list.addEventListener("click", (e) =>{
//  if (e.target.classList.contains("checkbox")){
//    let clickedLI = e.target.closest("li");
//    let clickedID = clickedLI.getAttribute("data-id");
//    allNotes.id = clickedID;
//    const isChecked = clickedID.checked ? 'done' : '';
//    clickedID.setAttribute('class', `clickedID ${isChecked}`);

//    console.log("checkbox clicked");
//    console.log(checked);
//    console.log(clickedID);
//    getChecked();
//    saveNotes();
// }});

// function getChecked(id){
//   if (id = checked)
//   {
//     localStorage.setItem(checked.id = true);
//   }
// }
////////////////////////////////////////////////////////////////

//THIRD STEP: DELETE NOTES
//We want to add delete to our added notes, which is found in the UL tag. "list"
//If there is a trash can, we want the option to press delete. (e.target finds out if e is trash can that is clicked)
// if e.target contains the "delete" class then we want to remove the whole li tag.
//So we need to find the parent, which is the li tag, so we can remove the whole tag.

//Todo - delete local storage
//list.addEventListener("click", (e) => {
  /* if (e.target.classList.contains("delete")) {
    let clickedLI = e.target.closest("li");
    let clickedID = clickedLI.getAttribute("data-id");
    allNotes = allNotes.filter((note) => note.id != clickedID);
    e.target.parentElement.remove();
    saveNotes();
    //need to remove local storage for only one note
    //localStorage.removeItem(key.note);
  } */
//});

////////////////////////////////////////////////////////////////
//to-do add an eventlistner that can check if the checkbox is checked/unchecked

 //noteObj.setAttribute('class', `todo-item ${isChecked}`);
  //console.log(isChecked);
  //const node = document.createElement("li");

  //node.setAttribute("class", `noteObject${isChecked}`);
  ////////////////////////////////////////////////////////////////


  // <i class="fa fa-star" aria-hidden="true"></i>
// <i class="fa fa-star-o" aria-hidden="true"></i>
  // kolla titles längd (.length)
  // om den är över 15 tecken, ta enbart de 15 första att visa
  // ev lägg på ...
  /*
  <input class="checkbox" id="${id}" name="${id}" type="checkbox" ${noteObj.checked ? 'checked' : ''}/>
  <label for="${id}" class="favorite"></label>*/

  //SECOND STEP
//We want to generate a new template, where the "notes" we add goes to. So we need to add a new function "generate template "
//now we want to take this template and inject in the ul. We need to store this in a variable. (html)
//what we are doing is that we are passing in the "notes" in this generatetemplate
//we target the ul tag and add the HTML template that we have generated in second step 'html'
      //console.log('Saving changes', change);
      // Save the entire updated text to localStorage
      //const data = JSON.stringify(quill.getContents())
      //localStorage.setItem('storedText', data);

       //Stringify will make it to a string. To save since local storage only saves strings
  //let noteObject_serialized = JSON.stringify(notes);
  //localStorage.setItem("key", noteObject_serialized);
  //loadNotes()
  // const notes = JSON.stringify(quill.getContents());
  // ge invoke the function generate template here, so we can add the notes