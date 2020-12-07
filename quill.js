// let templeteButtonOne = document.querySelector('#t1');
// let templeteButtonTwo = document.querySelector('#t2');
// let templeteButtonThree = document.querySelector('#t3');

// let Inline = Quill.import('blots/inline');

// class SpanBlock extends Inline{    

//     static create(value){
//         let node = super.create();
//         node.setAttribute('class','spanblock');
//         return node;    
//     } 
// }

// SpanBlock.blotName = 'spanblock';
// SpanBlock.tagName = 'div';
// Quill.register(SpanBlock);

// templeteButtonOne.addEventListener('click', function() {


//   //apply it to the text
//     let range = quill.getSelection();
//         if(range){
//             quill.formatText(range,'spanblock',true);
//         }else{

//         }
//   console.log('Templete One: Clicked!');
// });



// templeteButtonTwo.addEventListener('click', function() {


//   console.log('Templete Two : Clicked!');
// });
// templeteButtonThree.addEventListener('click', function() {
//   console.log('Templete Three : Clicked!');
// });


//     let add = document.querySelector('#t1');
//   //Only add it ones!!! Needs to know that it has been clicked, if...else...
//     add.className += "addStyle";


let quill = new Quill ('#editor',  {
    modules:{
        toolbar:'#toolbar-container'
    },
    theme:'bubble'
})

//how to take the othe classes away when pressing normal???

var customButtonNormal = document.querySelector('#customNormal');
var customButton = document.querySelector('#customOne');
var customButtonTwo = document.querySelector('#customTwo');
var customButtonThree = document.querySelector('#customThree');

let content = document.querySelector('.ql-editor')
console.log(content)
let text= quill.getText();
console.log(text)

customButton.addEventListener('click', function() {
console.log('clicked')
  if(quill.getFormat()) {
    content.classList.add('ql-active');
  } else {
    content.classList.remove('ql-active');
  }
});
//the class removes when the next one is being pushed ???

customButtonTwo.addEventListener('click', function() {
console.log('clicked')
  if(quill.getFormat()) {
    content.classList.add('customTwo');
  } else {
    content.classList.remove('customTwo');
  }
});

customButtonThree.addEventListener('click', function() {
console.log('clicked')
  if(quill.getFormat()) {
    content.classList.add('customThree');
  } else {
    content.classList.remove('customThree');
  }
});

//Date function
//Year, month, day, time
