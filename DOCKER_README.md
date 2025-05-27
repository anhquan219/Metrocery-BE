# 🐳 Docker Setup cho Metrocery Backend

## 📁 Cấu trúc thư mục

```
metrocery-be/
├── docker/                    ← Thư mục Docker
│   ├── docker-compose.yml     ← Docker compose chính
│   └── mysql/
│       └── init/
│           └── 01-init.sql    ← SQL khởi tạo database
└── database/                  ← Database files (future)
    ├── migrations/
```

## 🚀 Cách sử dụng

### **1. Khởi động MySQL**

```bash
cd docker
docker-compose up -d
```

### **2. Dừng MySQL**

```bash
cd docker
docker-compose down
```

### **3. Xem logs**

```bash
cd docker
docker-compose logs -f mysql
```

### **4. Kiểm tra trạng thái**

```bash
docker ps
```

## 🔧 Thông tin kết nối

### **MySQL Database**

- **Host**: localhost
- **Port**: 3306
- **Database**: metrocery
- **Username**: metrocery
- **Password**: 123123

### **DBeaver Connection**

1. Tạo connection mới
2. Chọn MySQL
3. Nhập thông tin trên
4. Test connection

## 📝 Best Practices

### **1. Tổ chức files**

- ✅ Docker files trong thư mục `docker/`
- ✅ SQL init files trong `docker/mysql/init/`
- ✅ Utility scripts trong `scripts/`
- ✅ Database migrations trong `database/migrations/`

### **2. Naming convention**

- ✅ SQL files: `01-init.sql`, `02-seed-data.sql`
- ✅ Scripts: `docker-start.bat`, `docker-stop.bat`
- ✅ Containers: `metrocery-mysql`

### **3. Environment variables**

- ✅ Sử dụng `.env` file
- ✅ Fallback values trong docker-compose
- ✅ Không commit sensitive data

## 🔍 Troubleshooting

### **Port đã được sử dụng**

```bash
netstat -ano | findstr :3306
taskkill /PID <PID> /F
```

### **Reset database**

```bash
cd docker
docker-compose down -v
docker-compose up -d
```
