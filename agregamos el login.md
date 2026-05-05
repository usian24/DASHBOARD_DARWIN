-- Seleccionamos la base de datos por si acaso
USE `db_darwin`;

-- Creamos la tabla para el Login
CREATE TABLE `usuario` (
  `id_usuario` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre_completo` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `rol` VARCHAR(50) DEFAULT 'Administrador'
);

-- Insertamos un usuario administrador de prueba 
-- (Nota: En un entorno real, la contraseña debe ir encriptada)
INSERT INTO `usuario` (`nombre_completo`, `username`, `password`, `rol`) 
VALUES ('Administrador Darwin', 'admin', 'admin123', 'Administrador');