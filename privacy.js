
const Config = require('./config');
module.exports = function() { 
    return (`
    <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; width: 100%;">
        <div style="display: flex; flex-direction: column; justify-content: center; max-width: 600px; padding: 10px;">
            <h1>Privacy Notice</h1>
            <p>This privacy notice discloses the privacy practices for ${Config.pageTitle}. This privacy notice applies solely to information collected by this website. It will notify you of the following:</p>
            <ul>
                <li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
                <li>What choices are available to you regarding the use of your data.</li>
                <li>The security procedures in place to protect the misuse of your information.</li>
                <li>How you can correct any inaccuracies in the information.</li>
                <li>Information Collection, Use, and Sharing</li>
            </ul>
            <h4>Data</h4>
            <p>We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.</p>
            <p>We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.</p>
            <p>Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.</p>
            <p>Your Access to and Control Over Information</p>
            <p>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:</p>
            <p>See what data we have about you, if any.</p>
            <p>Change/correct any data we have about you.</p>
            <p>Have us delete any data we have about you.</p>
            <p>Express any concern you have about our use of your data.</p>
            <h4>Security</h4>
            <p>We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.</p>
            <p>Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https" at the beginning of the address of the Web page.</p>
            <p>While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.</p>
            <p>We request information from you on our order form. To buy from us, you must provide contact information (like name and shipping address) and financial information (like credit card number, expiration date). This information is used for billing purposes and to fill your orders. If we have trouble processing an order, we'll use this information to contact you.</p>
            <p>We use "cookies" on this site. A cookie is a piece of data stored on a site visitor's hard drive to help us improve your access to our site and identify repeat visitors to our site. For instance, when we use a cookie to identify you, you would not have to log in a password more than once, thereby saving time while on our site. Cookies can also enable us to track and target the interests of our users to enhance the experience on our site. Usage of a cookie is in no way linked to any personally identifiable information on our site.</p>
            <p>Some of our business partners may use cookies on our site (for example, advertisers). However, we have no access to or control over these cookies.</p>
            <p>We share aggregated demographic information with our partners and advertisers. This is not linked to any personal information that can identify any individual person.</p>
            <p>We use an outside shipping company to ship orders, and a credit card processing company to bill users for goods and services. These companies do not retain, share, store or use personally identifiable information for any secondary purposes beyond filling your order.</p>
            <p>If you feel that we are not abiding by this privacy policy, you should contact us immediately via email at ${Config.contactEmail}.</p>
        </div>
    </div>
    `);
};