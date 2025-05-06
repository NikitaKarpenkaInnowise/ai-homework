-- ================================================
-- SQL Analysis: Sales Data for Online Store (2024)
-- ================================================

-- Table Definition and Sample Data
-- (Run this section first if the table doesn't exist)

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- Optional: Clear old data to prevent duplicates
DELETE FROM orders;

-- Insert sample orders
INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- ================================================
-- 1. Calculate Total Sales for March 2024
-- ================================================
-- This query sums all order amounts in March 2024

SELECT 
    SUM(amount) AS total_sales_march
FROM 
    orders
WHERE 
    strftime('%Y-%m', order_date) = '2024-03';

-- ================================================
-- 2. Find the Customer Who Spent the Most Overall
-- ================================================
-- This query groups orders by customer and finds the top spender

SELECT 
    customer, 
    SUM(amount) AS total_spent
FROM 
    orders
GROUP BY 
    customer
ORDER BY 
    total_spent DESC
LIMIT 1;

-- ================================================
-- 3. Calculate Average Order Value for Jan–Mar 2024
-- ================================================
-- This query calculates the average amount per order
-- for the first three months of 2024

SELECT 
    ROUND(AVG(amount), 2) AS avg_order_value
FROM 
    orders
WHERE 
    order_date >= '2024-01-01' AND order_date < '2024-04-01';
