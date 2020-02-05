var stars = 5;
var Config = {
    sellingPrice: '' + $("#selling-price").data("selling-price"),
    appId: '' + $("#app-id").data("app-id")
};

$(".img-thmb").click(function(e) {
    e.preventDefault();
    $(".main-img").attr("src", $(e.target).data("src"));
});

$("#leave-review-btn").click(function(e) {
    e.preventDefault();
    $("#leave-review-div").hide();
    $("#review-form-div").show();
});

$(".star-btn").click(function(e) {
    e.preventDefault();
    var index = $(e.target).data('index');
    stars = index;
    for (var i = 1; i < 6; i++) {
        $("#star-btn-" + i).removeClass("checked");
    }
    for (var i = 1; i <= index; i++) {
        $("#star-btn-" + i).addClass("checked");
    }
});

$("#comment-btn").click(function(e) {
    var name = $("#name-input").val();
    var email = $("#email-input").val();
    var comment = $("#comment-input").val();

    if (!(name && email && comment)) {
        return;
    }
    var payload = {
        name: name,
        email: email,
        stars: stars,
        comment: comment
    };

    $.ajax({
        type: 'POST',
        url: 'post-comment',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(payload)
    }).done(function(data) {
        $('#review-form-div').hide();
        $('#review-success-div').show();
    });
});


function postPayment(data) {

    $.dialog({
        content: function() {
            var self = this;
            self.setContent('Processing...');
            return $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: 'process-payment',
                contentType: 'application/json',
                data: JSON.stringify(data),
                method: 'post'
            }).done(function(res) {
                self.setTitle('<div style="padding: 5px; color: #333"><b>Thank You</b></div>');
                self.setContent(`
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div><i class="fas fa-check-circle" style="color: #0b0; font-size: 4em; padding: 5px;"></i></div>
                    <div style="color: #333; text-align: center; padding: 5px;">Your order has been placed.</div>
                </div>
                `);
            }).fail(function() {
                self.setTitle('Uh oh...');
                self.setContent('Your order could not be processed. Please check the payment information and try again.');
            });
        }
    })
}

const paymentForm = new SqPaymentForm({
    applicationId: Config.appId,
    locationId: 'US',
    inputClass: 'sq-input',
    autoBuild: false,
    googlePay: {
        elementId: 'sq-google-pay'
    },
    inputStyles: [{
        fontSize: '16px',
        lineHeight: '24px',
        padding: '16px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
    }],
    callbacks: {
        methodsSupported: function(methods, unsupportedReason) {
            console.log(methods);

            var googlePayBtn = document.getElementById('sq-google-pay');

            // Only show the button if Google Pay on the Web is enabled
            if (methods.googlePay === true) {
                googlePayBtn.style.display = 'inline-block';
            } else {
                console.log('UNSUPPORTED REASON', unsupportedReason);
            }
        },
        createPaymentRequest: function() {
            console.log('Creating google payment request');
            var paymentRequestJson = {
                requestShippingAddress: true,
                requestBillingInfo: true,
                shippingContact: {
                  familyName: "CUSTOMER LAST NAME",
                  givenName: "CUSTOMER FIRST NAME",
                  email: "mycustomer@example.com",
                  country: "USA",
                  region: "CA",
                  city: "San Francisco",
                  addressLines: [
                    "1455 Market St #600"
                  ],
                  postalCode: "94103",
                  phone:"14255551212"
                },
                currencyCode: "USD",
                countryCode: "US",
                total: {
                  label: "Millennial Marketing Firm",
                  amount: Config.sellingPrice,
                  pending: false
                },
                lineItems: [
                  {
                    label: "Subtotal",
                    amount: Config.sellingPrice,
                    pending: false
                  },
                  {
                      label: "Shipping",
                      amount: "0.00",
                      pending: true
                  }
                ],
                shippingOptions: [
                  {
                    id: "1",
                    label: "Standard Shipping",
                    amount: "0.00"
                  }
               ]
              };
        
              return paymentRequestJson;
        },
        cardNonceResponseReceived: function (errors, nonce, cardData, billingcontact, shippingContact, shippingOption) {
            console.log('Card nonce response received!', cardData, shippingContact, shippingOption);
            const data = {
                nonce,
                name: shippingContact.givenName,
                email: shippingContact.email,
                country: shippingContact.country,
                region: shippingContact.region,
                city: shippingContact.city,
                addressLines: shippingContact.addressLines,
                postalCode: shippingContact.postalCode,
                phone: shippingContact.phone
            };
            if (errors) {
                console.log(errors);
                $.alert({title: 'Error', content: 'Your payment could not be processed. Please try again.'});
                return;
            }
            else {
                postPayment(data);
            }
        }
    }
});

function onGetCardNonce(event) {
    console.log("on get card nonce fired", event);
    event.preventDefault();
    paymentForm.requestCardNonce();
}

paymentForm.build();
