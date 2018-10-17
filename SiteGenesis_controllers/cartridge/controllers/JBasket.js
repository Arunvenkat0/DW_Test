'use strict';


var app = require('~/cartridge/scripts/app');
var guard = require('~/cartridge/scripts/guard');
var BasketMgr = require('dw/order/BasketMgr');

function start (){
		
	  	var basket = BasketMgr.getCurrentBasket();
  				
		if (basket != null){
	    	app.getView('Cart', {
	    		basket: basket
	        }).render('showBasket');
	    	}else{
	    		app.getView().render('jempty');
	       	}

	}


function getBonusProducts() {
	
	
}

 exports.Start = guard.ensure(['get'], start);

