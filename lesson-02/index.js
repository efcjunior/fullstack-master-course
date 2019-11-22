const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (request, response) => {
    console.log(new Date())
    //response.send('<h1>Hello World</h1>')
    response.render('home',{
        date: new Date()
    })
} )

app.listen(3000, (err) => {
    if(err){
        console.log('Error')
    }else{
        console.log('running')
    }
})