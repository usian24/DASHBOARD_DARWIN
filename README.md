# Darwin - Sistema de Gestión y Trazabilidad Operativa

Darwin es una solución Full-Stack orientada a la gestión, control y trazabilidad de operaciones técnicas en campo. El sistema centraliza información crítica relacionada con personal, actividades, logística y ubicación geográfica, garantizando integridad de datos y seguimiento detallado de cada operación.

Este proyecto fue desarrollado como parte de la formación en Ingeniería de Software con Inteligencia Artificial en SENATI.

---

## Descripción General

El sistema permite registrar, consultar y auditar operaciones técnicas mediante un modelo relacional estructurado. Cada registro consolidado mantiene relaciones entre múltiples entidades, permitiendo trazabilidad completa desde el tipo de acción hasta la ubicación donde se ejecutó.

Está diseñado bajo un enfoque práctico, priorizando:
- Integridad referencial
- Automatización de interfaz
- Escalabilidad del modelo de datos
- Simplicidad en el uso

---

## Características Principales

### Gestión Integral de Datos
Administración de múltiples entidades relacionadas como agentes, acciones, actividades, transporte y zonas geográficas.

### Trazabilidad Completa
Cada registro en el sistema consolida información cruzada mediante claves foráneas, permitiendo seguimiento detallado de cada operación.

### Interfaz Dinámica
Generación automática de formularios, tablas y modales basada en un diccionario de datos.

### Validación Relacional
Uso de listas desplegables (selects) para garantizar consistencia en el ingreso de datos.

### Dashboard
Visualización del estado del sistema mediante consultas en tiempo real.

### Generación de Reportes
Creación de reportes individuales listos para impresión o exportación.

### CRUD Completo
Operaciones de creación, lectura, actualización y eliminación en todas las entidades.

---

## Stack Tecnológico

### Backend
- Node.js
- Express.js
- MySQL (MySQL2)
- Dotenv
- CORS

### Frontend
- HTML5
- CSS3 (Glassmorphism)
- JavaScript (ES6+)
- Fetch API

---

## Modelo del Sistema

El sistema se basa en 9 entidades principales:

1. Tipo de Agente  
2. Acción  
3. Acción Específica  
4. Actividad  
5. Subacción  
6. Tipo de Transporte  
7. Provincia  
8. Distrito  
9. Detalle de Registro  

Estas entidades están relacionadas mediante claves foráneas para garantizar consistencia e integridad de datos.

---

## Instalación y Ejecución

### Clonar repositorio
```bash
git clone https://github.com/usian24/DASHBOARD_DARWIN.git
### Entrar a la carpeta
- cd 27-04-26 -> carpeta principal donde se pondran los demas comandos 

*************************************

Instalar dependencias: 
- npm install

*************************************

Configuración de Base de Datos 
Crear la base de datos con el nombre db_darwin y ejecutar el siguiente script dentro de la base de datos: 



CREATE DATABASE IF NOT EXISTS `db_darwin`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE `db_darwin`;

CREATE TABLE `accion` (
  `ID_ACCION` INT AUTO_INCREMENT PRIMARY KEY,
  `NOMBRE_ABREVIADO` VARCHAR(50),
  `NOMBRE_ACCION` VARCHAR(50),
  `CODIGO_A_E` VARCHAR(50),
  `CODIGO_P_ACCION` VARCHAR(50)
);

CREATE TABLE `accion_especifica` (
  `ID_AE` INT AUTO_INCREMENT PRIMARY KEY,
  `NOMBRE_ABREVIADO` VARCHAR(50) NOT NULL,
  `ACCION_ESPECIFICA` VARCHAR(50) NOT NULL,
  `CODIGO_A_E` VARCHAR(50) NOT NULL
);

CREATE TABLE `tipo_agente` (
  `ID_TA` INT AUTO_INCREMENT PRIMARY KEY,
  `NOMBRE_TA` VARCHAR(50)
);

CREATE TABLE `actividad` (
  `ID_ACTIVIDAD` INT AUTO_INCREMENT PRIMARY KEY,
  `NOMBRE_ACTIVIDAD` VARCHAR(50) NOT NULL,
  `CODIGO_ACTIVIDAD` VARCHAR(50) NOT NULL,
  `ID_TA` INT,
  FOREIGN KEY (`ID_TA`) REFERENCES `tipo_agente`(`ID_TA`)
);

CREATE TABLE `subaccion` (
  `ID_SA` INT AUTO_INCREMENT PRIMARY KEY,
  `NOMBRE_ABREVIADO` VARCHAR(50) NOT NULL,
  `SUB_ACCION_ESP` VARCHAR(50) NOT NULL,
  `CONCAT` VARCHAR(50) NOT NULL,
  `CODIGO_S_A_E` VARCHAR(50) NOT NULL,
  `ID_AE` INT NOT NULL,
  FOREIGN KEY (`ID_AE`) REFERENCES `accion_especifica`(`ID_AE`)
);

CREATE TABLE `tipo_transporte` (
  `id_tt` INT AUTO_INCREMENT PRIMARY KEY,
  `NOMBRE_TRANSPORTE` VARCHAR(50) NOT NULL
);

CREATE TABLE `zona_provincia` (
  `id_zp` INT AUTO_INCREMENT PRIMARY KEY,
  `NOMBRE_PROVINCIA` VARCHAR(50) NOT NULL
);

CREATE TABLE `zona_distrito` (
  `id_zd` INT AUTO_INCREMENT PRIMARY KEY,
  `NOMBRE_DISTRITO` VARCHAR(50),
  `id_zp` INT,
  FOREIGN KEY (`id_zp`) REFERENCES `zona_provincia`(`id_zp`)
);

CREATE TABLE `detalle_registro` (
  `ID_REGISTRO` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_ACCION` INT,
  `ID_AE` INT,
  `ID_SA` INT,
  `ID_TA` INT,
  `id_tt` INT,
  `id_zd` INT,
  `id_zp` INT,
  `ID_ACTIVIDAD` INT,
  `NUM_SUPERVISORES` VARCHAR(50),
  `EMPRESA_SUPERVISORA` VARCHAR(50),
  `CALIDAD_ENTREGABLE` VARCHAR(50),
  `NRO_EXPEDIENTE` VARCHAR(50),
  `CARTA_LINEA` VARCHAR(50),
  `OBSERVACIONES` VARCHAR(50),
  `CONTRATO` VARCHAR(50),

  FOREIGN KEY (`ID_ACCION`) REFERENCES `accion`(`ID_ACCION`),
  FOREIGN KEY (`ID_AE`) REFERENCES `accion_especifica`(`ID_AE`),
  FOREIGN KEY (`ID_SA`) REFERENCES `subaccion`(`ID_SA`),
  FOREIGN KEY (`ID_TA`) REFERENCES `tipo_agente`(`ID_TA`),
  FOREIGN KEY (`id_tt`) REFERENCES `tipo_transporte`(`id_tt`),
  FOREIGN KEY (`id_zd`) REFERENCES `zona_distrito`(`id_zd`),
  FOREIGN KEY (`id_zp`) REFERENCES `zona_provincia`(`id_zp`),
  FOREIGN KEY (`ID_ACTIVIDAD`) REFERENCES `actividad`(`ID_ACTIVIDAD`)
);
Variables de Entorno

Crear un archivo .env en la raíz del proyecto:
y pegar esta informacion: 

PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_darwin
DB_PORT=3306

---
**********************************************************
Ejecución: 

- node index.js

Acceder desde el navegador: 

http://localhost:3001 -> al hacer correr te madnara el propio puerto en la consola de visual... manten presionado la tecla (Ctrl) y presiona click a esa url y te mandara al proyecto
