const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
var http = require('http').createServer(app);

//Nagle Algorithm off
app.use(function(req,res,next){
	req.connection.setNoDelay(true);
	if (req.url.match(/^\/(css|js|img|font|png|jpg|jpeg|gif|bmp)\/.+/)) {
	} else {
		res.header("Cache-Control", 'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '0');
		res.header('Pragma', 'no-cache');
	}
	respCorsHeader(req,res);
	next();
});

//temp
app.options('/employees', (req,res,next) => {
	respCorsHeader(req,res)
	res.send()
})

app.options('/reviews', (req,res,next) => {
	respCorsHeader(req,res)
	res.send()
})

function respCorsHeader(req,res) {
	// res.header("Access-Control-Allow-Origin", req.protocol+"://" + apiinfo.origin_domain);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", true);
	return res;
}

//fb
const fbadmin = require('firebase-admin')
const serviceAccount = require('./testdemo2-95d1d-firebase-adminsdk-lbn4t-e1315df355.json')

fbadmin.initializeApp({
  credential: fbadmin.credential.cert(serviceAccount)
})
const fbdb = fbadmin.firestore()

require('./apis')(app, fbdb);

http.listen(3500, function(){
  console.log('server is running on port 3500')
});