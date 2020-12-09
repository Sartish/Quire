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
// const time=document.querySelector('#time')

// const tick = () => {
// const now = new Date();

// const day = now.getDate();
// const month = now.getMonth() + 1; //January has position 0!
// const year = now.getFullYear();
// const h = now.getHours();
// const min= now.getMinutes();
// const sec=now.getSeconds();
// // console.log (day,month,year,h, min,sec)
// const today = h + '.' + min + '.' + sec + '  ' + day + '/' + month + '/' + year ;
// //  console.log(today);
//  return today;
// }
// setInterval(tick,1000);

// console.log(today)

// function savedDate(id) {
//     var date = new Date(id);
//     return date.toLocaleString();
// }
// console.log(savedDate)


// var now = new Date;
// document.write(now.getHours() + '.' + now.getMinutes() + '.' + now.getSeconds() + ' ' + now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear())

// console.log(currentTime)

// let date = new Date();

// document.getElementById('time').innerHTML = date.toDateString();

// //Get the time and date to a varible to put in to the object
// //it needs to be able to get updated without refresh

//   let myTime=setInterval(function(){myTimer()},1000);
//      function myTimer()
//      {
//         var d=new Date();
//         var t=d.toLocaleTimeString();
//         document.getElementById("time").innerHTML=t;
//       }
//     function myStopFunction()
//      {
//     clearInterval(myTime);
//       }

// console.log(myTimer());

