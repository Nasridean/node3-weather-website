const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const request = require('request')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get ('', (req, res) => {
    res.render('index', {
        message: 'This is the index page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page'
    })
})
app.get ('/about', (req, res) => {
    res.render('about', {
        message: 'This is the about page'
    })
})
app.get ('/weather', (req, res) => {
    if (req.query.adress) {
        return geocode(req, (error, data) => {
                if (error){
                    return res.send({
                        error: error
                    })
                } 
            
                forecast(data[1], data[0], (error, forecastData) => {
                     if(error) {
                        return res.send({
                            error: error
                        })
                    } 
            
                     res.send({
                         location: req.query.adress,
                         temperature: forecastData
                    })
            })
        
        })
    }
    res.send({
    error: 'No adress provided'
    })
    
})
app.get ('/help/*', (req, res) => {
    res.render('404', {
        message: 'help page is not found'
    })
})
app.get ('*', (req, res) => {
    res.render('404', {
        message: 'page is not found'
    })
})

app.listen(3000, () => {
    console.log('Running on server 3000')
})