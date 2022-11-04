const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const weather = require('./utils/weather')

const app = express()

// expressjs.com - further info

// paths for express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handle bars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static dir public
app.use(express.static(publicPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Ric'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help page',
        name: 'This is the help page !!'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Me',
        name: 'Ric'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address not provided'
        })
    }

    geoCode(req.query.address, (error, geo) => {

        if (error) {
            return res.send({
                error: error
            })
        }
    
        weather(geo, (error, {area, message}) => {
    
            if (error) {
                return res.send({
                    error: error
                })
            } 
            
            res.send({
                location: area,
                forecast: message,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found !!',
        title: '404',
        name: 'Ric'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        error: 'Page not found !!',
        title: '404',
        name: 'Ric'
    })
})

app.listen(80, () => {
    console.log('Server started on port 3000')
})