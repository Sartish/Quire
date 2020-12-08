let quill = new Quill ('#editor',  {
    modules:{
        toolbar:'#toolbar-container'
    },
    theme:'bubble'
})

let customNormal =document.querySelector('#normal');
let customButton = document.querySelector('#customOne');
let customButtonTwo = document.querySelector('#customTwo');
let customButtonThree = document.querySelector('#customThree');
let content = document.querySelector('.ql-editor')
console.log(content)
let text= quill.getText();
console.log(text)

customNormal.addEventListener('click', function(){
content.classList='normal';
});

customButton.addEventListener('click', function() { 
content.classList='customOne';
}); 

customButtonTwo.addEventListener('click', function(){
content.classList='customTwo';
});

customButtonThree.addEventListener('click', function(){
content.classList='customThree';
});

