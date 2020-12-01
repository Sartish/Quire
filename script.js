//Global variables 
const addForm = document.querySelector('.add');
const newNote = document.querySelector('.new-note');
const list = document.querySelector('.note-list');
const search =document.querySelector('.search input');


//SECOND STEP 
//We want to generate a new template, where the "notes" we add goes to. So we need to add a new function "generate template "
//now we want to take this template and inject in the ul. We need to store this in a variable. (html)
//what we are doing is that we are passing in the "notes" in this generatetemplate 
//we target the ul tag and add the HTML template that we have generated in second step 'html'

//Adding quill


//Make a "clean" option to empty the editor
let toolbarOptions=[
        [{ 'header': '1' }, { 'header': '2' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}],
        ['bold', 'italic']
];

let quill = new Quill ('#editor', {
    modules:{
        toolbar:toolbarOptions
    },
    placeholder: 'Type something here',
    theme:'snow'
})

var Delta = Quill.import('delta');
var change = new Delta();
quill.on('text-change', function(delta) {
  change = change.compose(delta);
});



const generateTemplate = notes => {

    const html = `<li>
    <span>${notes}</span>
    <i class="far fa-trash-alt delete"></i>
    </li>`;

list.innerHTML += html;

};
//FIRST STEP
//We need to add eventlistener to the button, så we can add new notes.A varibale newNote, conected to the button 
//we need to 'fetch' what is inside the textfield, which is aded as a variable addForm. We use .value
//We also want ot generate a new HTML template when click, so we add a new HTML template were the notes are added
newNote.addEventListener('click', e => {

    e.preventDefault();
    const notes = addForm.value;
   // ge invoke the function generate template here, so we can add the notes

    generateTemplate(notes)
    

});

//THIRD STEP: DELETE NOTES
//We want to add delete to our added notes, which is found in the UL tag. "list"
//If there is a trash can, we want the option to press delete. (e.target finds out if e is trash can that is clicked)
// if e.target contains the "delete" class then we want to remove the whole li tag. 
//So we need to find the parent, which is the li tag, so we can remove the whole tag. 
list.addEventListener('click', e => {   
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }

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
.forEach((note) => note.classList.add('filtered'))

Array.from(list.children)
.filter((note) => note.textContent.includes(term))
.forEach((note) =>note.classList.remove('filtered'))
    
};


//FOURTH STEP: FILTERING THE NOTES 
//We need to get a reference for the input field, where we search for notes. 
//we need reference to input and not search, because we will listen to a keyup event and not a submit event
//So we need the search class and listen to the input inside it.

//Key up event that is listening to what ever we type in the search input field 
//When ever a user type a leter int he field, a callback function fires targeting existing li notes
//we call this callback function filterNotes everytime a user preces letter on keyboard

search.addEventListener('keyup', () => {
    const term = search.value.trim();
    filterNotes(term)
});
