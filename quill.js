let quill = new Quill ('#editor',  {
    modules:{
        toolbar:'#toolbar-container'
    },
    placeholder: 'Write your note here...',
    theme:'bubble'
})

let customNormal =document.querySelector('#normal');
let customButton = document.querySelector('#customOne');
let customButtonTwo = document.querySelector('#customTwo');
let customButtonThree = document.querySelector('#customThree');
let allContent = document.querySelector('.ql-editor')
let text= quill.getText();

customNormal.addEventListener('click', function(){
    allContent.classList.remove('customOne');
    allContent.classList.remove('customTwo');
    allContent.classList.remove('customThree');
});

customButton.addEventListener('click', function() { 
allContent.classList.add('customOne');
allContent.classList.remove('customTwo');
allContent.classList.remove('customThree');
}); 

customButtonTwo.addEventListener('click', function(){
allContent.classList='customTwo';
});

customButtonThree.addEventListener('click', function(){
allContent.classList='customThree';
});



const now= new Date;
const currentTime=now.toLocaleTimeString();
const currentDate=now.toLocaleDateString();