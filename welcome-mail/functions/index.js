const functions = require('firebase-functions');
const admin = require('firebase-admin');
const SENDGRID_API_KEY = 'your-api-key'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

admin.initializeApp();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
	const email = user.email; 
	const displayName = user.displayName; 

	const msg = {
			to: email,
			from: 'no.reply@sattvikrecipes.com',
			subject: 'Welcome to Sattvik Recipes',
			
            templateId: 'your-template-id',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
                          name: displayName
                        }
	};

	return sgMail.send(msg)
	.then(() => console.log("Email Sent"))
	.catch(err => console.log(err));
});
