
const addForm = document.querySelector(".add");
const newNote = document.querySelector(".new-note");
const list = document.querySelector(".note-list");
const search = document.querySelector(".search input");
const noteList = document.querySelector(".note-list");
const titleInput = document.querySelector(".title");
const star = document.querySelector(".star");
let Delta = Quill.import('delta');

let allNotes = [];
let arrayByFav = [];
let activeNoteID;
let clickedStar = false;


window.addEventListener("DOMContentLoaded", popUpLoad);
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
  
  return allNotes.find((note) => note.id == id);
}
function setEditor(note) {
  
  quill.setContents(note.content);
  document.querySelector(".title").value = note.title;
  
}
function setActiveNoteID(id) {
  activeNoteID = id;
}
function updateNote(id) {
  
  let noteObj = allNotes.find((note) => note.id == id);
  noteObj.content = quill.getContents();
  noteObj.note = quill.getText();
  noteObj.title = titleInput.value;

  saveNotes();
  
}


newNote.addEventListener("click", (e) => {
  console.log("Save button pressed");
  e.preventDefault();
  if (activeNoteID) {
    
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
    checked: false,
  };
  setActiveNoteID(noteObject.id);

 
  allNotes.push(noteObject);
  saveNotes();
 
  generateTemplate(noteObject.id, note, title);
});


window.onload = () => {
  let change = new Delta();
  quill.on('text-change', function(delta) {
    change = change.compose(delta);
  });
  setInterval(function() {
    if (change.length() > 0) {

      if (activeNoteID) {
        
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
    
    newNoteObject = JSON.parse(newNoteObject);
    newNoteObject.forEach((note) => {
      generateTemplate(note.id, note.note, note.title);
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
    

    } else if (evt.target.classList.contains("favorite")) {
      toggleFav(clickedID);
    } else {
      console.log("load detected!")
    
    setEditor(readNote(clickedID));
    setActiveNoteID(clickedID);
  }
  });
};
function renderNotesList() {
  if (clickedStar = true)
  {
    noteList.innerHTML ="";
    arrayByFav.forEach((note) => {
      generateTemplate(note.id, note.note, note.title);
    });;
  }
  else if(clickedStar = false){
  noteList.innerHTML ="";
  allNotes.forEach((note) => {
    generateTemplate(note.id, note.note, note.title);
  });
}


}

const generateTemplate = (id, note, title) => {
  const shortTitle = title.substring(0, 15);
  const shortNote = note.substring(0, 10);
  const time = new Date(id).toLocaleString();
 
  let noteObj = allNotes.find((note) => note.id == id);  
 
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
  
  allNotes[index].checked = !allNotes[index].checked;
 
  saveNotes();
  noteList.innerHTML = "";
  renderNotesList();
}

const check_list = document.querySelector(".note-list");



function ClearFields() {
  document.getElementById("myInput").value = "";
 
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

star.addEventListener("click",() =>{
  clickedStar = !clickedStar;
  
  
  function filterByFav(noteObj){
    if (noteObj.checked){
      return true;
    }
    else{
      return false;
    }
  }
  
  arrayByFav = allNotes.filter(filterByFav);
  console.log("allNotes",allNotes,"arrayByFav",arrayByFav)
  noteList.innerHTML = "";
  renderNotesList(arrayByFav);
});

const filterNotes = (term) => {
  Array.from(list.children)
    .filter((note) => !note.textContent.includes(term))
    .forEach((note) => note.classList.add("filtered"));

  Array.from(list.children)
    .filter((note) => note.textContent.includes(term))
    .forEach((note) => note.classList.remove("filtered"));
};