 -- product table data
USE Bamazon;
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Juice Glass','kitech_Needs',5,50);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Patio Chairs','Furniture',30,20);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Love Seats','Furniture',50,10);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Dinner Set','kitech_Needs',40,20);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Bed Sheets','Bedding',25,30);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Comforter','Bedding',34,40);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Neck Chain','Accessories',3,40);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Hand Ring','Accessories',10,50);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Organizer','Furniture',20,8);
INSERT INTO products(product_name,department_name,price_in_USD,stock_quantity)
VALUES('Pans','kitech_Needs',100,9);


INSERT INTO department(department_name,over_head_costs) VALUES('kitech_Needs',5000);
INSERT INTO department(department_name,over_head_costs)VALUES('Furniture',8000);
INSERT INTO department(department_name,over_head_costs)VALUES('Bedding',7000);
INSERT INTO department(department_name,over_head_costs)VALUES('Accessories',9000);





select department.department_id,department.department_name,department.over_head_costs,(sum(product_sales) FROM products GROUP BY products.department_name) FROM department INNER JOIN products ON department.department_name = products.department_name;




