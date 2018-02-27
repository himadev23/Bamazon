var mysql = require('mysql');
var inquirer = require('inquirer');
var product = require('./bamazon.js');
var bamazonManager = require('./bamazonManager.js');



inquirer.prompt([{
        type: 'list',
        message: 'Are you a User or Admin ?',
        choices: ['User', 'Admin'],
        name: 'personIdentity',

    }


]).then(function(identity) {
    if (identity.personIdentity === 'User') {

        product.productTable();

        setTimeout(product.purchase, 500);
        product.quit();

    } else {
        bamazonManager.manager();
    }
});