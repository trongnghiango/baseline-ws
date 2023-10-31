CREATE DATABASE SQLDBQuery
GO

use SQLDBQuery
GO

-- Xóa db
use master
GO
DROP DATABASE SQLDBQuery
GO

-- Tạo bảng gv
CREATE TABLE GiaoVien
(
    MaGV VARCHAR(10) NOT NULL,
    Name NVARCHAR(100)

    PRIMARY KEY (MaGV)
)
GO

CREATE TABLE HocSinh
(
    MaHS NVARCHAR(10),
    Name NVARCHAR(100)

    PRIMARY KEY (MaHS)
)
GO

DROP TABLE HocSinh
GO 
DROP TABLE GiaoVien
GO

-- Thêm record cho bảng giáo viên
INSERT INTO GiaoVien (MaGV, Name)
VALUES (0, N'Giáo Viên 1');
GO

INSERT INTO GiaoVien (MaGV, Name)
VALUES (1, N'Giáo Viên 2');
GO

INSERT INTO GiaoVien (MaGV, Name)
VALUES (2, N'Giáo Viên 3');
GO

-- Thêm RECORDs cho bảng HOCSINH
INSERT INTO HocSinh (MaHS, Name)
VALUES (1, 'Nguyễn Văn A')
GO

INSERT INTO HocSinh (MaHS, Name)
VALUES (2, 'Quách Thị Què')
GO

INSERT INTO HocSinh (MaHS, Name)
VALUES (3, 'Con Thị Bò Cừ')
GO

SELECT * FROM GiaoVien


SELECT * FROM dbo.HocSinh

-- Sửa bảng thêm cột ngày sinh
ALTER TABLE GiaoVien ADD NgaySinh Date


-- Xóa toàn bộ dữ liệu của bảng.
TRUNCATE TABLE HocSinh

-- Gỡ BẢNG khoi db
DROP TABLE HocSinh
GO

-- Gỡ BẢNG khoi db
DROP TABLE GiaoVien
GO

use SQLDBQuery
GO

DROP TABLE [User]
GO

USE [master]
GO

IF  EXISTS (SELECT name FROM sys.databases WHERE name = N'SQLDBQuery')
DROP DATABASE [SQLDBQuery]
GO
SP_WHO