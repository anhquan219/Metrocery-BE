-- Khởi tạo database cho Metrocery
CREATE DATABASE IF NOT EXISTS metrocery;
USE metrocery;

-- Tạo user nếu chưa tồn tại
CREATE USER IF NOT EXISTS 'metrocery'@'%' IDENTIFIED BY '123123';
GRANT ALL PRIVILEGES ON metrocery.* TO 'metrocery'@'%';
FLUSH PRIVILEGES;

-- Log thông báo
SELECT 'Database metrocery đã được khởi tạo thành công!' as message;
