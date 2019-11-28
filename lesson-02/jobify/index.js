const express = require('express')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const dbConnection = sqlite.open(path.resolve(__dirname, 'database.sqlite'), {Promise})

const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', async (request, response) => {
    const db = await dbConnection
    const listCategory = await db.all('select * from categories')
    const listJob = await db.all('select * from job')
    
    const categories = listCategory.map(category => {
        return {
            ...category,
            jobs: listJob.filter(job => category.id === job.category)
        }
    })

    response.render('home', {categories})
} )

app.get('/vaga/:id', async (request, response) => {
    const db = await dbConnection
    const job = await db.get(`select * from job where id = ${request.params.id}`)
    console.log(job)
    response.render('vaga', {job})
} )

app.get('/admin', (request, response) =>{
    response.render('admin/home')
})

app.get('/admin/vagas/delete/:id', async (request, response) =>{
    const db = await dbConnection
    await db.run(`delete from job where id = ${request.params.id}`)
    response.redirect('/admin/vagas')
})

app.get('/admin/vagas/nova', async (request, response) => {
    const db = await dbConnection
    const categories = await db.all('select * from categories')
    response.render('admin/nova-vaga', {categories})
})

app.post('/admin/vagas/nova', async (request, response) => {
    const db = await dbConnection
    const id = Math.round(Math.random() * 1000 + 1);
    const {title, description, category} = request.body
    await db.run(`insert into JOB values (${id}, '${category}','${title}', '${description}')`)
    response.redirect('/admin/vagas')
})

app.post('/admin/vagas/edit/:id', async (request, response) => {
    const db = await dbConnection
    const {title, description, category} = request.body
    await db.run(`update JOB set category = '${category}', title = '${title}', description = '${description}' where id = ${request.params.id} `)
    response.redirect('/admin/vagas')
})

app.get('/admin/vagas/edit/:id', async (request, response) =>{
    const db = await dbConnection
    const job = await db.get(`select * from job where id = ${request.params.id}`)
    const categories = await db.all('select * from categories')
    response.render('admin/edita-vaga', 
        {
            'job': job,
            'categories' : categories
        }) 
})

app.get('/admin/vagas', async (request, response) =>{
    const db = await dbConnection
    const jobs = await db.all('select * from job')
    response.render('admin/vagas', {jobs})
})

app.get('/admin/categorias', async (request, response) => {
    const db = await dbConnection
    const categories = await db.all('select * from categories')
    response.render('admin/categorias', {categories})
})

app.get('/admin/categorias/nova', async (request, response) => {
    response.render('admin/nova-categoria')
})

app.post('/admin/categorias/nova', async (request, response) => {
    const db = await dbConnection
    const id = Math.round(Math.random() * 1000 + 1);
    const {category} = request.body;    
    await db.run(`insert into categories values (${id},'${category}')`)
    response.redirect('/admin/categorias')
})

app.get('/admin/categorias/edit/:id', async (request, response) => {
    const db = await dbConnection
    const category = await db.get(`select * from categories where id = ${request.params.id}`)
    response.render('admin/edita-categoria', {category})
})

app.post('/admin/categorias/edit/:id', async (request, response) => {
    const db = await dbConnection
    const {category} = request.body;
    await db.run(`update categories set category = '${category}' where id = ${request.params.id}`)
    response.redirect('/admin/categorias')
})

app.get('/admin/categorias/delete/:id', async (request, response) => {
    const db = await dbConnection
    await db.run(`delete from categories where id = ${request.params.id}`)
    response.redirect('/admin/categorias')
})

const init = async () => {
    const db = await dbConnection
    await db.run('create table if not exists categories (id INTEGER PRIMARY KEY, category TEXT)')
    await db.run('create table if not exists job (id INTEGER PRIMARY KEY, category INTEGER, title TEXT, description TEXT)')
    //const category = 'Engineering'
    const title = 'Python Developer (Remote)'
    const description = 'PYthon EE'
    //await db.run(`insert into categories values (2,'${category}')`)
    //await db.run(`insert into JOB values (3, 2,'${title}', '${description}')`)
}

init()

app.listen(port, (err) => {
    if(err){
        console.log('Error')
    }else{
        console.log('its running ' + new Date().toString())
    }
})