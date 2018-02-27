var mysql = require('mysql');
var inquirer = require('inquirer');
var term = require('terminal-kit');


inquirer.prompt([
{
	type:'list',
	message:'select an option : ',
	choices:['View Product Sales by Department','Create New Department'],
	name:'supervisorInput'
}


	]).then(function(supervisorInfo){



	})


	function productsSalesByDepart(){
		
	}