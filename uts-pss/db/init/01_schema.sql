CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  role ENUM('admin','staff','customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  sku VARCHAR(64) NOT NULL UNIQUE,
  price DECIMAL(12,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO users (name, email, role) VALUES
('Admin', 'admin@example.com', 'admin'),
('Fandi', 'fandi@example.com', 'staff')
ON DUPLICATE KEY UPDATE email=VALUES(email);

INSERT INTO products (name, sku, price, stock) VALUES
('Pulpen Biru', 'SKU-PULPEN-BLU', 4500, 100),
('Buku Tulis A5', 'SKU-BUKU-A5', 12000, 50)
ON DUPLICATE KEY UPDATE sku=VALUES(sku);
