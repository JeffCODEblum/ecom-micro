const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var crypto = require('crypto');
var squareConnect = require('square-connect');

const detailPage = require('./detail.js');
const privacyPage = require('./privacy.js');
const page = require('./page.js');
const termsPage = require('./terms.js');
const squareConfig = require('./square-config.js');
const config = require('./config.js');

const app = express();
app.use(express.static('public'))
app.use(bodyParser.json());

const defaultClient = squareConnect.ApiClient.instance;
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = squareConfig.accessToken;
defaultClient.basePath = 'https://connect.squareupsandbox.com';

mongoose.connect('mongodb://localhost/ecom1', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const ReviewSchema = new mongoose.Schema({
    email: String, 
    name: String, 
    comment: String, 
    timestamp: String, 
    hidden: Boolean, 
    stars: Number
});
const ReviewModel = new mongoose.model('ReviewModel', ReviewSchema);

const OrderSchema = new mongoose.Schema({
    name: String,
    email: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    qty: String,
    ts: String,
    filled: String
});
const OrderModel = new mongoose.model('OrderModel', OrderSchema);

ReviewModel.find(function(err, docs) {
    if (err) console.log(err);
    if (docs.length == 0) {
        const reviewModel = new ReviewModel({
            email: 'foo@mail.com', 
            name: 'foo manchu', 
            comment: 'this is a pretty good itemz foo', 
            timestamp: Date.now(), 
            hidden: false, 
            stars: 3
        });
        reviewModel.save();

        const reviewModel2 = new ReviewModel({
            email: 'foo@mail.com', 
            name: 'bar me', 
            comment: 'best one ever for realz', 
            timestamp: Date.now(), 
            hidden: false, 
            stars: 4
        });
        reviewModel2.save();
    }
})

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.post('/post-comment', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;
    const timestamp = Date.now() + '';
    const stars = req.body.stars;

    console.log(name, email, comment, timestamp, stars);
    
    if (!(name && email && comment && timestamp && stars)) {
        res.sendStatus(400);
        return;
    }
    if (stars > 5 || stars < 1) {
        res.sendStatus(400);
        return;
    }

    const reviewModel = new ReviewModel({
        name: name,
        email: email,
        comment: comment,
        hidden: true,
        timestamp: timestamp,
        stars: stars
    });

    console.log('saving model');
    reviewModel.save((err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        if (doc) {
            console.log("save success");
            res.send(true);
        }
        return;
    });
    return;
});

app.post('/process-payment', async (req, res) => {
    console.log('process payment hit');
    const request_params = { nonce: req.body.nonce };

    // length of idempotency_key should be less than 45
    const idempotency_key = crypto.randomBytes(22).toString('hex');
 
    // Charge the customer's card
    const payments_api = new squareConnect.PaymentsApi();
    const request_body = {
      source_id: request_params.nonce,
      amount_money: {
        amount: 100,
        currency: 'USD'
      },
      idempotency_key: idempotency_key
    };
 
    try {
        const response = await payments_api.createPayment(request_body);

        console.log("pay response", response);
        // const orderModel = new OrderModel({
        //     name: name,
        //     email: email,
        //     address1: address1,
        //     address2: address2,
        //     city: city,
        //     state: state,
        //     zip: zip,
        //     country: country,
        //     qty: qty,
        //     ts: Date.now(),
        //     filled: '0'
        // });
        // orderModel.save();

      res.status(200).json({
        'title': 'Payment Successful',
        'result': response
      });
    } catch(error) {
      res.status(500).json({
        'title': 'Payment Failure',
        'result': error.response.text
      });
    }
});

app.get('/privacy', function(req, res) {
    res.writeHead(200);
    res.end(page(privacyPage()));
});

app.get('/terms', function(req, res) {
    res.writeHead(200);
    res.end(page(termsPage()));
});

app.get('/', function(req, res) {
    ReviewModel.find(function(err, docs) {
        if (err) {
            console.log(err);
            res.end(page(detailPage([])));
        }
        if (docs) {
            res.writeHead(200);
            res.end(page(detailPage(docs)));
        }
    });
});

https.createServer(options, app).listen(443, function() {
    console.log("server running on port 443");
});