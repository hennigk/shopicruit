var Promise = require("bluebird");
var request = require('request');
Promise.promisifyAll(require("request"));

/*this program calculates the total cost to purchase all variants
of lamps and wallets
all items listed require tax and for all items shipping is available
*/

request.getAsync("http://shopicruit.myshopify.com/products.json")
.then(function(response){
    var body = JSON.parse(response.body);
    return body.products;
}).then(function(products){
    var cost = 0;
    var lampCount = 0;
    var walletCount = 0;
    for (var i = 0; i < products.length; i++) {
        if (products[i].product_type === 'Lamp' ||  products[i].product_type === 'Wallet'){
            if (products[i].product_type === 'Lamp'){
                lampCount += products[i].variants.length;
            }
            if (products[i].product_type === 'Wallet'){
                walletCount += products[i].variants.length;
            }
            for (var j = 0; j < products[i].variants.length; j++){
                cost += Number(products[i].variants[j].price); 
            }
        }   
    }
    return {lampCount: lampCount, walletCount: walletCount, cost: cost};
}).then(function(totals){
    console.log("The cost to purchase all " + totals.lampCount + " variants of lamps and all " + totals.walletCount + " variants of wallets from Shopicruit is: $" + totals.cost + " + tax & shipping.");
})
