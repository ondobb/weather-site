const express = require('express');
const path = require('path');
const request = require('request');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js')

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const public = path.join(__dirname, '../public');
const views = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');

// Setup handelbars engine and views locations
app.set('view engine', 'hbs');
app.set('views', views);
hbs.registerPartials(partials);

// Setup static directory to server
app.use(express.static(public));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Ondo B. Bindang'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Ondo B. Bindang'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'For a propper location search ',
        author: 'Ondo B. Bindang'
    });
});

app.get('/weather', (req, res) => {

    let address = req.query.address;
    let error = 'You must provide the Address!';

    if (!(address)) 
    {
        return res.send({
            error
        });
    }

    geocode(address, (error, {latitude, longtitude, location } = {}) => {

        if (error) 
        {
            return res.send({error});
        }

        forecast(latitude, longtitude, ({error}, dataF) => {

            if (error) 
            {
                return res.send(error);
            }

            res.send({
                location,
                temperature: dataF
            })

        });


    });

    // res.send({
    //     name: 'Ondo',
    //     port,
    //     address
    // });
});

// app.get('/products', (req, res) => {
//     let address = req.query.search
//     let error = 'You must provide a location';
    
//     if (!(address)) 
//     {
//          return res.send(error);
//     }
//     res.send({
//         location : 'Malabo',
//         name: 'Ondo',
//         address
//     });
// });

app.get('/help/*', (req, res) => {
    res.render('404*', {
        title: 'Page article not found',
        author: 'Ondo B. Bindang',
        error
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        author: 'Ondo B. Bindang'
    })
});



app.listen(port, () => {
    console.log('❄️ ⓷ ⓪ ⓪ ⓪');
});