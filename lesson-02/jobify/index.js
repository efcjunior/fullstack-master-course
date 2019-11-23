const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (request, response) => {
    console.log(new Date())
    //response.send('<h1>Hello World</h1>')
    response.render('home')
} )

app.get('/vaga', (request, response) => {
    console.log(new Date())
    //response.send('<h1>Hello World</h1>')
    response.render('vaga')
} )

app.listen(3000, (err) => {
    if(err){
        console.log('Error')
    }else{
        console.log('its running ' + new Date().toString())
    }
})