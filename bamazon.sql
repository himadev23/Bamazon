
DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

 USE Bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(20) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price_in_USD FLOAT NOT NULL,
	stock_quantity VARCHAR(20) NOT NULL,
	product_sales INTEGER DEFAULT 0,
	PRIMARY KEY(item_id)
);
USE Bamazon;

CREATE TABLE department(
department_id INTEGER  AUTO_INCREMENT NOT NULL,
department_name VARCHAR(20) NOT NULL,
over_head_costs INTEGER,
total_profit INTEGER DEFAULT 0,
PRIMARY KEY(department_id)
);





