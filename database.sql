-- ============================================================
--   BillEase - Billing & Invoice System
--   MySQL Database Schema
--   Final Year BCA Project by Nayila
-- ============================================================

CREATE DATABASE IF NOT EXISTS billease_db;
USE billease_db;

-- ────────────────────────────────────────────────
-- TABLE 1: customers
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100) NOT NULL,
  phone       VARCHAR(20),
  gst_number  VARCHAR(20),
  address     TEXT,
  city        VARCHAR(50),
  state       VARCHAR(50),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ────────────────────────────────────────────────
-- TABLE 2: products
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  category    ENUM('Electronics','Clothing','Food & Beverages','Software','Services','Other') DEFAULT 'Other',
  price       DECIMAL(10,2) NOT NULL,
  unit        VARCHAR(30) DEFAULT 'Piece',
  hsn_code    VARCHAR(20),
  stock       INT DEFAULT 0,
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ────────────────────────────────────────────────
-- TABLE 3: invoices
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS invoices (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(20) UNIQUE NOT NULL,
  customer_id   INT NOT NULL,
  invoice_date  DATE NOT NULL,
  due_date      DATE,
  subtotal      DECIMAL(10,2) NOT NULL DEFAULT 0,
  gst_rate      DECIMAL(5,2) NOT NULL DEFAULT 18,
  gst_amount    DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount  DECIMAL(10,2) NOT NULL DEFAULT 0,
  status        ENUM('Pending','Paid','Overdue') DEFAULT 'Pending',
  notes         TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- ────────────────────────────────────────────────
-- TABLE 4: invoice_items
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS invoice_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id  INT NOT NULL,
  product_id  INT,
  description VARCHAR(200) NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  unit_price  DECIMAL(10,2) NOT NULL,
  amount      DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- ============================================================
-- SAMPLE DATA
-- ============================================================

-- Sample Customers
INSERT INTO customers (name, email, phone, gst_number, city, state, address) VALUES
('Rahul Sharma',   'rahul@email.com',   '9876543210', '27AAAAA0000A1Z5', 'Mumbai',    'Maharashtra', '12, MG Road, Andheri West'),
('Priya Patel',    'priya@email.com',   '9845001234', '24BBBBB1111B2Z6', 'Ahmedabad', 'Gujarat',     '45, CG Road, Navrangpura'),
('Amit Verma',     'amit@email.com',    '9765432100', '07CCCCC2222C3Z7', 'Delhi',     'Delhi',       '78, Connaught Place'),
('Sneha Reddy',    'sneha@email.com',   '9654321009', '36DDDDD3333D4Z8', 'Hyderabad', 'Telangana',   '23, Banjara Hills'),
('Kiran Kumar',    'kiran@email.com',   '9543210098', '29EEEEE4444E5Z9', 'Bangalore', 'Karnataka',   '56, Indiranagar');

-- Sample Products - Electronics
INSERT INTO products (name, category, price, unit, hsn_code, description) VALUES
('Laptop',               'Electronics', 55000, 'Piece', '84713010', 'High performance laptop'),
('Smartphone',           'Electronics', 15000, 'Piece', '85171200', 'Android smartphone'),
('Headphones',           'Electronics',  1200, 'Piece', '85183000', 'Over-ear headphones'),
('Bluetooth Speaker',    'Electronics',  2500, 'Piece', '85182200', 'Portable bluetooth speaker'),
('Wireless Mouse',       'Electronics',   700, 'Piece', '84716060', 'Wireless computer mouse'),
('Keyboard',             'Electronics',   900, 'Piece', '84716040', 'USB mechanical keyboard'),
('USB Cable',            'Electronics',   250, 'Piece', '85444290', 'USB-C data & charging cable'),
('Power Bank 10000mAh',  'Electronics',  1500, 'Piece', '85076000', '10000mAh portable power bank'),
('Pendrive 32GB',        'Electronics',   600, 'Piece', '84717090', '32GB USB 3.0 pen drive'),
('Smart Watch',          'Electronics',  4500, 'Piece', '91021900', 'Fitness smart watch'),
('Tablet 10 inch',       'Electronics', 18000, 'Piece', '84713020', 'Android 10 inch tablet'),
('Webcam HD',            'Electronics',  1800, 'Piece', '85258030', '1080p HD webcam');

-- Sample Products - Clothing
INSERT INTO products (name, category, price, unit, hsn_code, description) VALUES
('Men T-Shirt',    'Clothing',  399, 'Piece', '61091000', '100% cotton round neck T-shirt'),
('Women Kurti',    'Clothing',  699, 'Piece', '62044200', 'Printed cotton kurti'),
('Jeans Men',      'Clothing', 1299, 'Piece', '62034200', 'Regular fit denim jeans'),
('Formal Shirt',   'Clothing',  899, 'Piece', '62052000', 'Men cotton formal shirt'),
('Saree',          'Clothing', 2500, 'Piece', '54071000', 'Silk blend traditional saree'),
('Kids T-Shirt',   'Clothing',  299, 'Piece', '61112000', 'Soft cotton kids T-shirt'),
('Winter Jacket',  'Clothing', 2200, 'Piece', '62011300', 'Padded warm winter jacket');

-- Sample Products - Food & Beverages
INSERT INTO products (name, category, price, unit, hsn_code, description) VALUES
('Basmati Rice 5kg',   'Food & Beverages', 450, 'Kg',    '10063020', 'Premium aged basmati rice'),
('Cooking Oil 1L',     'Food & Beverages', 180, 'Litre', '15079010', 'Refined sunflower cooking oil'),
('Wheat Flour 10kg',   'Food & Beverages', 380, 'Kg',    '11010000', 'Whole wheat atta flour'),
('Mineral Water 1L',   'Food & Beverages',  20, 'Litre', '22011010', 'Packaged drinking water'),
('Cold Drink 600ml',   'Food & Beverages',  45, 'Piece', '22021010', 'Carbonated soft drink'),
('Biscuit Pack',       'Food & Beverages',  30, 'Piece', '19053100', 'Cream biscuit 100g pack'),
('Instant Noodles',    'Food & Beverages',  15, 'Piece', '19023010', 'Masala flavour instant noodles');

-- Sample Products - Software
INSERT INTO products (name, category, price, unit, hsn_code, description) VALUES
('Antivirus 1 Year',   'Software',   999, 'Year',  '99831100', 'PC antivirus 1 device 1 year'),
('MS Office License',  'Software',  4999, 'Year',  '99831100', 'Microsoft Office 365 annual'),
('Tally ERP License',  'Software', 18000, 'Year',  '99831100', 'Tally ERP 9 business license'),
('Website Domain 1yr', 'Software',   799, 'Year',  '99831100', '.com domain registration 1 year'),
('Web Hosting 1yr',    'Software',  3500, 'Year',  '99831100', 'Shared web hosting annual plan'),
('Mobile App Basic',   'Software', 25000, 'Piece', '99831100', 'Basic Android mobile app');

-- Sample Products - Services
INSERT INTO products (name, category, price, unit, hsn_code, description) VALUES
('Website Design',     'Services', 15000, 'Piece', '99831100', 'Static business website design'),
('Logo Design',        'Services',  2500, 'Piece', '99831100', 'Professional brand logo design'),
('AC Service',         'Services',   500, 'Piece', '99851210', 'Air conditioner servicing'),
('Computer Repair',    'Services',   800, 'Piece', '99851910', 'Laptop/PC repair & cleaning'),
('Home Cleaning',      'Services',  1200, 'Piece', '99851010', 'Full home deep cleaning service'),
('Plumber Visit',      'Services',   400, 'Piece', '99854100', 'Plumbing repair home visit'),
('Electrician Visit',  'Services',   350, 'Piece', '99854200', 'Electrical repair home visit');

-- Sample Products - Other
INSERT INTO products (name, category, price, unit, hsn_code, description) VALUES
('Laptop Bag',          'Other', 1200, 'Piece', '42021200', '15.6 inch laptop carry bag'),
('Office Chair',        'Other', 5500, 'Piece', '94013000', 'Ergonomic mesh office chair'),
('Study Table',         'Other', 4200, 'Piece', '94030010', 'Wooden study/work table'),
('Notebook A4 100pg',   'Other',   60, 'Piece', '48202000', 'Single line 100 page notebook'),
('Pen Pack of 10',      'Other',   50, 'Set',   '96081000', 'Ball point pen pack'),
('Printer Paper A4',    'Other',  450, 'Set',   '48025590', '500 sheet A4 printer paper ream');

-- ============================================================
-- USEFUL QUERIES FOR YOUR PROJECT
-- ============================================================

-- Get all invoices with customer name
-- SELECT i.invoice_number, c.name, i.invoice_date, i.total_amount, i.status
-- FROM invoices i JOIN customers c ON i.customer_id = c.id
-- ORDER BY i.created_at DESC;

-- Get total revenue
-- SELECT SUM(total_amount) AS total_revenue FROM invoices WHERE status = 'Paid';

-- Get pending invoices
-- SELECT * FROM invoices WHERE status = 'Pending';

-- Get invoice items with product details
-- SELECT ii.description, ii.quantity, ii.unit_price, ii.amount
-- FROM invoice_items ii
-- WHERE ii.invoice_id = 1;

-- Get top customers by revenue
-- SELECT c.name, SUM(i.total_amount) AS total
-- FROM invoices i JOIN customers c ON i.customer_id = c.id
-- GROUP BY c.id ORDER BY total DESC LIMIT 5;

-- Get total GST collected
-- SELECT SUM(gst_amount) AS total_gst FROM invoices;
