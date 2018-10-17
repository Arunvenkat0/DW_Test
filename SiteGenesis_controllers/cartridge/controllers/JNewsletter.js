'use strict'; 

/** @module controllers/JNewsletter */ 


var app = require('~/cartridge/scripts/app');
var guard = require('~/cartridge/scripts/guard');


var newsletterForm= require('dw/web/Form');


function showForm(){
	
	 app.getForm('newsletter').clear();
	 app.getView('Form').render('newsletter');
		
}

function handleForm(){
	
	var newsletterForm = app.getForm('newsletter');
	
	 var TriggeredAction = newsletterForm.triggeredAction;
	 response.getWriter().println('Hello World from pipeline  controllers!'+TriggeredAction);  
	
	 if ( (TriggeredAction != null) && (TriggeredAction.formId == 'subscribe') ){
		
		//response.getWriter().println('Hello World from pipeline  controllers!'+newsletterForm.fname.value);  
		
		  app.getView('Form',{
			  CurrentForms : session.forms
	    		
	    	}).render('newslettersuccess');
		
	}
	
	else{
		
		 app.getView('Form',{
			  ContinueURL : dw.web.URLUtils.https('JNewsletter‐HandleForm'),
			  CurrentForms : session.forms
	    		
	    	}).render('newsletter');
	}
	
}
	/*var newsletterResult = newsletterForm.handleAction({
        send: function (formgroup) {
            // Change the MailTo in order to send to the newsletter subscribed email address. It defaults to the
            // user's email.
            var Email = app.getModel('Email');
            return Email.get('mail/contactus', formgroup.email.value)
                .setFrom(formgroup.email.value)
                .setSubject(formgroup.myquestion.value)
                .send({});
        },
        error: function () {
            // No special error handling if the form is invalid.
            return null;
        }
    });*/
	
	


exports.HandleForm = guard.ensure(['get'], handleForm);  

exports.ShowForm = guard.ensure(['get'], showForm);  