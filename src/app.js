
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { send } = require('process')
const app = express()
const port = process.env.PORT || 3000
const request = require('postman-request')
const forecast = require('./utils/weatherapi')
const geocodingApi = require('./utils/geocodingApi')
console.log(path.join(__dirname,'../public'))
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views locations
// dynamic path
app.set('view engine', 'hbs');
//use below line if code not work
//app.set('views', path.join(__dirname, '../views'))
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//static path directory to serve
app.use(express.static(publicDirectoryPath))    
// routing to index dynamically

app.get('',(req,res)=>{
  res.render('index',{
    title: 'Weather App',
    name: 'Sumit Nath',
  })
})
app.get('/aboutus',(req,res)=>{
  res.render('aboutus',{
    title: 'About App',
    name: 'Sumit Nath'
  })
})
app.get('/helpme',(req,res)=>{
  res.render('helpme',{
    title: 'Need help App',
    name: 'Sumit ',
    message: 'this is a messge from sumit Nath'
  })
})

app.get('/blog',(req,res) =>{
  res.render('blog',{
    blog: 'Blog by Sumit',
    blogname: 'How to win',
    blogMessage: 'Our most comprehensive study material is curated by subject matter experts that empowers you with an in-depth understanding of all crucial topics from various subjects to help you stay ahead of the curve',
    edge: 'Integrated Teaching Our integrated teaching approach not only makes you shine in your school/ board exams but also ensures that you are listed as a top achiever in competitive exams like JEE, NEET, Olympiads, NTSE, KVPY etc.',
    name: 'Sumit ',
  })
})
// as the default path of server is changed public/index.html
// app.get('',(req,res)=>{
//   res.send('<h1>hello express</h1>')
// })

//  app.get('/help',(req,res)=>{
//    res.send({
//      name:'sumit',
//      age:45,
//      nationality: 'indian'
//    })
//  })
// app.get('/about',(req,res)=>{
//   res.send('<h2>this is  <span>about</span> page</h2> ')
// })

//default path
app.get('/contact',(req,res)=>{  
  res.send([
    {
    name:'sumit',
    age:45,
    nationality: 'indian'
  },
 { name:'rhout',
  age:5,
  nationality: 'pakistam'
},
{ name:'rhbsoout',
  age:5,
  nationality: 'japanise'
}
])
})


app.get('/products',(req,res)=>{  
  if(!req.query.search){
    return res.send({error : 'You must provide search term'
    })
  }
    console.log(req.query)
    res.send({
      product:[]
    })
})

app.get('/weather',(req,res)=>{  
  if(!req.query.address){
   return res.send({error:'Please provide a address'})
  }
  geocodingApi(req.query.address,(error,{latitude,longitude,location} ={}) => {
    if(error){
      return res.send({error})
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if(error){
      return res.send({error})
        }
       console.log(forecastData)
      res.send({ 
        forecast:forecastData,
        location,latitude, longitude,
        address:req.query.address,
   })
    })
      
      })
  
})

// for not found pages of help 
app.get('/help/*',(req,res)=>{
  res.render('404',{
    title: 'Help',
    name: 'Sumit ',
    errorMessage: 'Help article not found'
  })
})
// for not found pages
// it should be last so that the code work properly
app.get('*', (req,res)=>{
  res.render('404',{
    title: 'Help',
    name: 'Sumit ',
    errorMessage: 'Page not found'
  })
})
// 
// app.listen(3000,()=>{
// console.log('Server is upo the 3000')
// })
// change port for both locally & horku
app.listen(port,()=>{
  console.log('Server is upo the' + port)
  })
