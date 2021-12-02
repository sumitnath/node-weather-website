// console.log('This is index file')
// fetch('https://puzzle.mead.io/puzzle').then((response)=>{response.json()
// .then((data)=>{console.log(data)
// })
// })

 const weatherForm = document.querySelector('form');
 const search = document.querySelector('input');
 const messageOne = document.querySelector('#message-1');
 const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location= search.value
  console.log(location);
  
  messageOne.textContent = 'loading....';
  messageTwo.textContent = '';
 // fetch('http://localhost:3000/weather?address='+encodeURIComponent
// change for both horoku and local use
fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
  response.json().then((data)=>{
    if(data.error){
//console.log(data.error)
  messageOne.textContent = data.error
    }else{
     //console.log(data)
    //   console.log(data.location)
      console.log(data.forecast)
    messageOne.textContent = data.location;
    messageTwo.textContent = data.forecast.weatherReport;
    }
  })
})
})


