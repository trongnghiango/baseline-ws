CREATE DATABASE SQLDBQuery

USE SQLDBQuery

-- Thêm record cho bảng giáo viên
INSERT INTO GiaoVien (MaGV, Name)
VALUES (3, N'Kha Bờ Đơ Con Dơ');
GO

-- Sửa bảng thêm cột ngày sinh
ALTER TABLE GiaoVien ADD NgaySinh Date
GO


-- Thêm cột email cho bảng giáo viên
ALTER TABLE GiaoVien ADD Email CHAR(30) NOT NULL DEFAULT 'default email' 
GO


-- Thêm cột giới tính cho HocSinh
ALTER TABLE GiaoVien ADD GioiTinh BIT NOT NULL DEFAULT '0'
GO

UPDATE GiaoVien
SET Email = 'giaovien1@gmail.com', GioiTinh = '1'
WHERE MaGV = 0;

-- list danh sách giáo viên
SELECT * FROM GiaoVien