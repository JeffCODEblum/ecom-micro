const Moment = require('moment');
const Config = require('./config');
module.exports = function(docs) {
    var reviewMarkup = '';
    var reviewCount = 0;
    var starTotal = 0;
    for (var i = 0; i < docs.length; i++) {
        var doc = docs[i];
        if (!doc.hidden) {
            starTotal += doc.stars;
            reviewCount++;
            var starMarkup = '';
            var timestamp =  Moment(parseInt(doc.timestamp)).format('MMMM Do YYYY');
            for (var j = 1; j < 6; j++) {
                if (doc.stars >= j) {
                    starMarkup += `<span class="fa fa-star checked"></span>`;
                }
                else {
                    starMarkup += `<span class="fa fa-star"></span>`;
                }
            }
            reviewMarkup += `
                <hr>
                <div><span style="color: #333; font-size: 1.2em;">${doc.name}</span> <span style="font-size: 0.8em">on ${timestamp}</span></div>
                ${starMarkup}
                <div style="color: #333;">${doc.comment}</div>
            `;
        }
    }
    var starAverage = starTotal / reviewCount;
    starAverage = starAverage.toFixed(1);

    var starMarkup = '';
    for (var i = 1; i < 6; i++) {      
        if (starAverage >= i) {
            starMarkup += '<span class="fa fa-star checked"></span>';
        }
        else if (starAverage < i) {
            if (starAverage <= i - 1) {
                starMarkup += '';
            }
            else if (starAverage > i - 1) {
                starMarkup += '<span class="fa fa-star-half checked"></span>'
            }
        }
    }
    
    var page = `
    <div style="width: 100%; display: flex; flex-direction: row; justify-content: center;">
        <div style="width: 100%; max-width: 300px; display: flex; flex-direction: column;">
            <div style="margin-top: 10px; background-color: #efefef; width: 300px; height: 300px;">
                <img class="main-img" style="width: 300px; height: 300px;" src='./img1.png' />
            </div>
            <div style="margin-top: 10px; display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
                <div style="margin-right: 10px; background-color: #efefef; width: 65px; height: 65px;">
                    <img class="img-thmb" style="border: 1px solid #ccc; margin-right: 10px; width: 65px; height: 65px;" src="./img1.png" data-src="./img1.png" />
                </div>
                <div style="margin-right: 10px; background-color: #efefef; width: 65px; height: 65px;">
                    <img class="img-thmb" style="border: 1px solid #ccc; margin-right: 10px; width: 65px; height: 65px;" src="./img2.png" data-src="./img2.png" />
                </div>
            </div>
            <div style="margin-top: 10px; color: #333;">
                ${starMarkup}
                <span style="font-size: 0.8em;">(${starAverage} / 5 based on ${reviewCount} reviews)</span>
            </div>
            <div style="font-size: 1.4em; color: #333; font-weight: bold;">${Config.productName}</div>
            <div style="display: flex; flex-direction: column; margin-top: 20px; justify-content: center;">
                <div style="text-align: center; color: #333;">
                    <span style="font-size: 1em">
                        <s>$${Config.comparePrice}</s>
                    </span>
                    <span style="font-size: 1.4em;">
                        <b>$${Config.sellingPrice}</b>
                    </span>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 10px;">
                    <div id="form-container" style="margin-top: 10px;">
                        <button id="sq-google-pay" class="button-google-pay"></button>
                    </div>
                </div>
            </div>
            <div style="color: #333; margin-top: 30px; text-align: center">
                ${Config.productDescription}
            </div>
            <div style="color: #333; margin-top: 30px; font-weight: bold; font-size: 1.4em;">
                Customer Reviews
            </div>
            <div id="leave-review-div" style="text-align: center; margin-top: 30px;">
                <button id="leave-review-btn" class="btn btn-default" style="width: 200px; border: 1px solid #333; border-radius: 0px; color: #222;">Leave a Review</button>
            </div>
            <div id="review-form-div" style="display: none; margin-top: 30px;">
                <span id="star-btn-1" class="star-btn fa fa-star checked" data-index="1"></span>
                <span id="star-btn-2" class="star-btn fa fa-star checked" data-index="2"></span>
                <span id="star-btn-3" class="star-btn fa fa-star checked" data-index="3"></span>
                <span id="star-btn-4" class="star-btn fa fa-star checked" data-index="4"></span>
                <span id="star-btn-5" class="star-btn fa fa-star checked" data-index="5"></span>
                <div class="form-group" style="margin-top: 10px;">
                    <input id="email-input" class="form-control" maxlength="48" style="border-radius: 0px; border: 1px solid #333;" placeholder="Email" />
                </div>
                <div class="form-group">
                    <input id="name-input" class="form-control" maxlength="16" style="border-radius: 0px; border: 1px solid #333;" placeholder="Name" />
                </div>
                <div class="form-group">
                    <textarea id="comment-input" maxlength="256" class="form-control" style="border-radius: 0px; border: 1px solid #333;" rows="6" placeholder="Write review here"></textarea>
                </div>
                <div class="form-group text-right">
                    <button id="comment-btn" class="btn btn-default" style="border: 1px solid #333; border-radius: 0px; color: #333;">Post</button>
                </div>
            </div>
            <div id="review-success-div" style="display: none; margin-top: 30px;">
                <div style="display: flex; justify-content: center; align-items: center;">
                    <div style="width: 200px; padding: 10px; background-color: #22a022; color: white; text-align: center; font-weight: bold; font-size: 1.2em">Review Submitted</div>
                </div>
            </div>
            <div style="margin-top: 30px; margin-bottom: 30px;">
                ${reviewMarkup}
            </div>
            <div style="font-size: 2em; color: #333; margin-top: 30px; display: flex; flex-direction: row; justify-content: center; align-items:center;">
                <div style="padding: 15px;"><i class="fab fa-cc-visa"></i></div>
                <div style="padding: 15px;"><i class="fab fa-cc-mastercard"></i></div>
                <div style="padding: 15px;"><i class="fab fa-cc-discover"></i></div>
                <div style="padding: 15px;"><i class="fab fa-cc-amex"></i></div>
            </div>
        </div>
    </div>
    `;
    return(page);
};
