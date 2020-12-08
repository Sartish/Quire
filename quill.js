let quill = new Quill ('#editor',  {
    modules:{
        toolbar:'#toolbar-container'
    },
    theme:'bubble'
})

//how to take the othe classes away when pressing normal???

let customButton = document.querySelector('#customOne');
let customButtonTwo = document.querySelector('#customTwo');
let customButtonThree = document.querySelector('#customThree');

let content = document.querySelector('.ql-editor')


customButton.addEventListener('click', function() {
content.classList.toggle('customOne') 
// return;
});

customButtonTwo.addEventListener('click', function(){
  content.classList.toggle('customTwo')
});

customButtonThree.addEventListener('click', function(){
  content.classList.toggle('customThree')
});



