const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Divakar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Divakar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'We married on 15th Nov, 2020',
        title: 'Help',
        name: 'Divakar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided!'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
           return res.send({
               error
           })
        }     
    
        forecast(latitude, longitude,(error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    });
    // res.send({
    //     forecast: 'Chances of rain 0%',
    //     location: 'Toronto',
    //     address: req.query.address
    // });
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        message: 'Help article not found.',
        title: '404',
        name: 'Divakar'
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        message: 'Page not found.',
        title: '404',
        name: 'Divakar'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port:3000');
})