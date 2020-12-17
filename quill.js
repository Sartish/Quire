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
allContent.classList='normal';
});

customButton.addEventListener('click', function() { 
allContent.classList='customOne';
}); 

customButtonTwo.addEventListener('click', function(){
allContent.classList='customTwo';
});

customButtonThree.addEventListener('click', function(){
allContent.classList='customThree';
});

//Add time and date

const now= new Date;
const currentTime=now.toLocaleTimeString();
const currentDate=now.toLocaleDateString();
// console.log(currentTime, currentDate);

<<<<<<< HEAD
const time =`${currentTime}    ${currentDate}`
=======
//const time =`${currentTime}  ${currentDate}`
>>>>>>> d133df5a95300f47ddc0df2412f2ff92c1c8a765

console.log(time)

