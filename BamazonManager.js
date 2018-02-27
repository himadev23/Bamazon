var inquirer = require('inquirer');
var product = require('./bamazon.js');
var mysql = require('mysql');
var Table = require('cli-table-redemption');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hima",
    database: "Bamazon"
});


var manager = function() {

    inquirer.prompt([

        {
            type: 'list',
            message: 'Choose an Action',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product','quit'],
            name: 'managerChoice'

        }

    ]).then(function(managerAction) {

        console.log(managerAction);

        if (managerAction.managerChoice === 'View Products for Sale') {
            product.productTable();
           setTimeout(manager,500);

        } else if (managerAction.managerChoice === 'View Low Inventory') {
            viewLowInventory();
            setTimeout(manager,500);
        } else if (managerAction.managerChoice === 'Add to Inventory') {
            addToInventory();
            setTimeout(manager,500);

        }
        else if(managerAction.managerChoice === 'Add New Product'){
        		addNewProduct();

        }
        else if(managerAction.managerChoice === 'quit'){
        	process.exit();
        }

    });


}

function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity<5', function(err, quantityData) {
        if (err) throw err;

        var table = new Table({
            head: ['item_id', 'product_name', 'department_name', 'price_in_USD', 'stock_quantity'],

        });

        for (var i = 0; i < quantityData.length; i++) {
            table.push(
                [quantityData[i].item_id, quantityData[i].product_name, quantityData[i].department_name, quantityData[i].price_in_USD, quantityData[i].stock_quantity]
            );
        }
        console.log(table.toString());
    });

}

function addToInventory() {
    inquirer.prompt([{
            type: 'input',
            message: 'Enter item Name to add Quantity : ',
            name: 'itemName',
            validate: function(input) {
                if (isNaN(input)) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        {
            type: 'input',
            message: 'Enter how many items you want to add to that stock : ',
            name: 'quantity',
            validate: function(input) {
                if (isNaN(input)) {
                    return false;
                } else {
                    return true;
                }
            }
        }


    ]).then(function(addStocks) {

        console.log(addStocks);

        connection.query('select stock_quantity from products WHERE?', { product_name: addStocks.itemName }, function(err, data) {
            if (err) throw err;

            var stock = parseInt(data[0].stock_quantity) + parseInt(addStocks.quantity);
            //console.log(stock);
            connection.query('UPDATE products SET ? WHERE ?', [{
                stock_quantity: stock

            }, {
                product_name: addStocks.itemName


            }], function(err, data) {
                if (err) throw err;
                else {
                    product.productTable();
                }

            })
        })
    });

}

function addNewProduct(){
	inquirer.prompt([
	{
		type:'input',
		message:'Enter product name : ',
		name:'productName',
		validate:function(input){
			if(isNaN(input)){
				return true
			}
			else{
				return false
			}
		}
	},
	{
		type:'list',
		message:'Enter department name : ',
		choices:['kitech_Needs','Furniture','Bedding','Accessories'],
		name:'departName',
		validate:function(input){
			if(isNaN(input)){
				return true
			}
			else{
				return false
			}
		}

	},
	{
		type:'input',
		message:'enter the product price',
		name:'price',
		validate:function(input){
			if(isNaN(input)){
				return false
			}
			else{
				return true
			}
		}
	},
	{
		type:'input',
		message:'enter the product quantity',
		name:'quantity',
		validate:function(input){
			if(isNaN(input)){
				return false
			}
			else{
				return true
			}
		}

	}


		]).then(function(addProductData){
			//console.log(addProductData);
			
			var myQuery = 'INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)'+
						'VALUES("'+addProductData.productName+'","'+addProductData.departName+'",'+addProductData.price+','+addProductData.quantity+')';

				//console.log(myQuery);
			connection.query(myQuery,function(err,data){
				if(err) throw err;

				console.log('data added');
				product.productTable();
			});



		})


}



module.exports = { manager }