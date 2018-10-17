'use strict';


var app = require('~/cartridge/scripts/app');
var guard = require('~/cartridge/scripts/guard');
var logging= require('dw/system/Logger');



function start (){
	var params = request.httpParameterMap;
    var product = params.pid.stringValue;
    var abc = 'singhal';
   
    if (product != null){
    	//logging.debug('nisha',product);
    	 response.getWriter().println('singhal');
    	app.getView('Product', {
    		product: product
        }).render('jnotEmpty');
    	}else{
    		
    		app.getView().render('jempty');
       	}
   
}

function getProductDetails(){
	var params = request.httpParameterMap;
    var Product = app.getModel('Product');
    var product = Product.get(params.pid.stringValue);
    //var pricebook = app.getModel('PriceBook');
    
    if (product.isVisible()){
    	
    	app.getView('Product',{
    		product: product,
    		name:product.getName(),
    		description: product.getShortDescription(),
    		//price: product.object.priceModel.maxPrice.decimalValue
    		price: product.getPriceModel().getPrice()
    		//pricebook: pricebook.getPriceBookPriceInfo('list-price')
    	}).render('productDetails');
    }else{
		app.getView().render('jempty');
   	}
    
}
    

function getAvailability() {
	var params = request.httpParameterMap;
    var Product = app.getModel('Product');
    var product = Product.get(params.pid.stringValue);

    if (product.isVisible()) {
        app.getView('Product',{
    		product : product
    		
    	}).render('productDetails');
    					
    }else{
       app.getView().render('jempty');
       
        }

}

function hitTile() {
	
	var params = request.httpParameterMap;
    var Product = app.getModel('Product');
    var product = Product.get(params.pid.stringValue);

    if (product.isVisible()) {
        var productView = app.getView('Product', {
            product: product,
            showswatches: true,
            showpricing: true,
            showpromotion: true,
            showrating: true,
            showcompare: true
        });

        productView.product = product.object;
        productView.render(product.getTemplate() || 'SiteGenesis_core/cartridge/templates/product/producttile');
    }

}
 
exports.HitTile = guard.ensure(['get'], hitTile);

exports.GetAvailability = guard.ensure(['get'], getAvailability);

exports.GetProductDetails = guard.ensure(['get'], getProductDetails);

exports.Start = guard.ensure(['get'], start);


