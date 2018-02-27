var readline = require('readline');
var mysql = require('mysql');
var inquirer = require('inquirer');
var term = require('terminal-kit');
// var table = require('markdown-table');
var Table = require('cli-table-redemption');



    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "hima",
        database: "Bamazon"
    });


var productTable = function() {

    connection.query('select * from products', function(err, productData) {
        if (err) {
            console.log(err);
        } else {
            var table = new Table({
                head: ['item_id', 'product_name', 'department_name', 'price_in_USD', 'stock_quantity','product_sales']

            });

            for (var i = 0; i < productData.length; i++) {
                table.push(
                 [productData[i].item_id, productData[i].product_name, productData[i].department_name, productData[i].price_in_USD, productData[i].stock_quantity,productData[i].product_sales]
                );
            }
            console.log(table.toString());

        }
    });
}

var purchase = function() {
    inquirer.prompt([{
            type: 'input',
            message: 'Enter product id to purchase',
            name: 'productId',
            validate: function(i) {
                if (isNaN(i)) {
                    return false;
                } else {
                    return true;
                }
            }

        },
        {
            type: 'input',
            message: ' How may items you want to buy ? ',
            name: 'productQuantity',
            validate: function(i) {
                if (isNaN(i)) {
                    return false;
                } else {

                    return true;
                }
            }

        }

    ]).then(function(productInfo) {

        var query = 'SELECT item_id,product_name,price_in_USD,stock_quantity,product_sales FROM products WHERE item_id=' + productInfo.productId
        connection.query(query, function(err, productData) {
            if (err) {
                console.log(err)
            } else {


                if (productData[0].stock_quantity <= 0) {
                    console.log('OUT OF Stack');
                    //console.log('you want to buy anything');
                    process.exit();
                } else {
                	var totalAmount=productData[0].price_in_USD * productInfo.productQuantity;
                    console.log('******************************');
                    console.log('Item you are purchasing: ' + productData[0].product_name);
                    console.log('Your total purchase amount: ' + totalAmount);

                    //console.log(productData[0].product_name);
                    console.log('******************************');
                    
                    inquirer.prompt([{
                            type: 'confirm',
                            message: 'confirm the order ?',
                            name: 'conformation'
                        }

                    ]).then(function(orderConfirm) {
                        if (orderConfirm.conformation) {
                            console.log('Your order conformed..... Thank you for purchasing');
                            var updatedStock = productData[0].stock_quantity - productInfo.productQuantity;
                            var productSaleAmount = productData[0].product_sales+totalAmount;
                            console.log('productSaleAmount', productData[0].product_sales);
                            //console.log('updatedStock'+ updatedStock);
                            connection.query('UPDATE products SET  ? WHERE ?', [{
                                    stock_quantity: updatedStock,
                                    product_sales:productSaleAmount

                                }, {
                                    item_id: productInfo.productId
                                }],
                                function(err, res) {
                                    if (err){
                                    	console.log('error');
                                    }

                                });
                            
                    
                            /*connection.query('UPDATE products SET ? WHERE ?',
                            	[{product_sales:productSaleAmount},
                            	{item_id: productInfo.productId}] 
                            	,function(err,data){
                    				if(err) throw err;
                    	console.log('productsales inserted');
                    });*/
                            productTable();

                            setTimeout(purchase, 500);
                            quit();

                        } else {
                            console.log('Soory!!!Try next time');
                            process.exit();
                        }
                    });
                }

            }
        })


    })


}

var quit = function() {
    
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'q') {
            process.exit();

        }

    });
    console.log('[Presss to quit(q)]');

}


module.exports = 
{productTable, quit, purchase}