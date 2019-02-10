var request = require("request")
var express = require("express")
var bodyParser = require('body-parser')
var cors = require("cors")

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 3000

app.get('/app', function (req,res){
	console.log('loading page')
	res.sendFile(__dirname + '/index.html')
})

app.post('/app', function (req, res) {
	console.log(req.body)
	takeMeHome(req.body.origin, req.body.destination, req.body.modeOfTravel, req.body.language, (data)=>{
		res.send(data)
	})
})

app.listen(port, () => console.log(`Server up my dudes :)\n-From alex with love <3\nYour port: ${port}`))

app.get('/count', function(req,res){
	sendMsg();
	console.log("message sent");
})

// var mapData = takeMeHome("McGill Quebec","Concordia","Walk","en");

function takeMeHome(origin, destination, modeOfTravel, language, callback){
	var mapURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
	tempUrl = mapURL += `origins=place_id:${origin}&destinations=place_id:${destination}&mode=${modeOfTravel}&language=${language}&key=YOUR_API_KEY`;
	console.log(tempUrl)
	request({
	    url: tempUrl,
	    json: true
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	    	callback(body)
	    }
	})

}

const accountSid = 'YOUR_TWILIO_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);


function sendMsg(){
client.messages.create({
     body: 'JOEY IS LATE',
     from: 'USER_PHONE_NUMBER',
     to: 'EMERGENCY_CONTACT_PHONE_NUMBER'
   })
  .done();
}