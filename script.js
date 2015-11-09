var Promise = require("bluebird");
var request = require('request');
Promise.promisifyAll(require("request"));


request.getAsync("http://shopicruit.myshopify.com/products.json")
.then(function(response){
    var body = JSON.parse(response.body);
    return body.products;
}).then(function(products){
    var cost = 0;
    var walletCount = 0;
    var lampCount = 0;
    for (var i = 0; i < products.length; i++) {
        if (products[i].product_type === 'Lamp' ||  products[i].product_type === 'Wallet'){
            for (var j = 0; j < products[i].variants.length; j++){
                cost += Number(products[i].variants[j].price); 
            }
        }   
    }
    return cost;
}).then(function(totalCost){
    console.log("The cost to purchase all variants of lamps and wallets from Shopicruit is: $" + totalCost + " + tax & shipping.")
})
