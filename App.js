let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

var app = module.exports = express();
app.use(bodyParser.json())
app.use(cors());

app.get('/api/timestamp/:dateString?', function(req, res, next) {
    let dateString = req.params.dateString;
    
    let date;

    if(!dateString) {
        date = new Date();
    } else {
        if(isNaN(dateString)) { 
        date = new Date(dateString)
    } else {
        date = new Date(parseInt(dateString))
    }
    }

    if(date.toString() === "Invalid Date") {
        res.json({Error: "Invalid Date"})
    } else {
        res.json({unix: date.getTime(), utc: date.toUTCString()})
    }
      
})

app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.sendFile(`${__dirname}/views/index.html`)
})


const portNumber = process.env.PORT || 8000;

app.listen(portNumber)