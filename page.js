const Config = require('./config');
module.exports = function(body) {
    return (`
    <!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>${Config.pageTitle}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="https://js.squareupsandbox.com/v2/paymentform"></script>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
            <link rel="stylesheet" href="./style.css"></style>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
            <script>
                Config = {
                    sellingPrice: ${Config.sellingPrice}
                };
            </script>
        </head>
        <body>
            <div id="promo-bar" style="width: 100%; height: 30px; background-color: #000; color: white; display: flex; flex-direction: row; justify-content: center; align-items: center; letter-spacing: 3px; font-size: 0.8em;">
                ${Config.promoText}
            </div>
            <!--
            <div id="nav-bar" style="display: flex; flex-direction: row; align-items: center; justify-content: flex-end; border-bottom: 1px solid #ccc; background-color: white; width: 100%; height: 60px;">
                <div style="padding: 5px; font-size: 2em; color: #333;">
                    <span class="fa fa-bars"></span>
                </div>-->
            </div>
            ${body}
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; background-color: black; width: 100%; height: 80px; color: #efefef">
                <div style="padding: 15px;"><a href="/terms" style="color: #efefef; text-decoration: none;">Terms</a></div>
                <div style="padding: 15px;"><a href="/privacy" style="color: #efefef; text-decoration: none;">Privacy</a></div>
            </div>
            <div style="padding-bottom: 10px; text-align: center; background-color: black; color: #efefef">Copyright 2019 all rights reserved</div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
            <script src="./index.js"></script>
        </body>
    </html>
    `);
}