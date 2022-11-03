// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = 3000
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
	res.json({greeting: 'hello API'})
});

app.get('/api/:date?', (req, res) => {
	let date_unix = req.params.date

	const getDate = (unix) => {
		if(unix){
			if(new Date(unix) != 'Invalid Date' && new Date(Number(unix)) == 'Invalid Date'){
				return {
					unix: Date.parse(new Date(unix)),
					utc: new Date(unix).toUTCString()
				}
			} else if(new Date(unix) == 'Invalid Date' && new Date(Number(unix)) != 'Invalid Date'){
				return {
					unix: Number(unix),
					utc: new Date(Number(unix)).toUTCString()
				}			
			} else {
				return {
					error: 'Invalid Date'
				}
			}
	} else {
			return {
				unix: Date.now(),
				utc: new Date().toUTCString()
			}
	}
}

	if(date_unix){
		return res.send(getDate(date_unix))
	}	else {
		return res.send(getDate())
	}


})



// listen for requests :)
var listener = app.listen(process.env.PORT || PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
