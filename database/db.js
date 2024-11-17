CREATE DATABASE palace_of_goods;
\c palace_of_goods;

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  amount NUMERIC NOT NULL,
  memo TEXT,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'created'
);
