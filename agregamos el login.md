Darwin - Sistema de Gestión y Trazabilidad Operativa
Darwin es una solución Full-Stack orientada a la gestión, control y trazabilidad de operaciones técnicas en campo. El sistema centraliza información crítica relacionada con personal, actividades, logística y ubicación geográfica, garantizando integridad de datos y seguimiento detallado de cada operación.

Este proyecto fue desarrollado como parte de la formación en Ingeniería de Software con Inteligencia Artificial en SENATI.

Descripción General
El sistema permite registrar, consultar y auditar operaciones técnicas mediante un modelo relacional estructurado. Cada registro consolidado mantiene relaciones entre múltiples entidades, permitiendo trazabilidad completa desde el tipo de acción hasta la ubicación donde se ejecutó.

Está diseñado bajo un enfoque práctico, priorizando:

Integridad referencial

Automatización de interfaz

Escalabilidad del modelo de datos

Simplicidad en el uso

Características Principales
Autenticación y Seguridad (Nuevo)
Sistema de Login y Registro de usuarios protegido. Utiliza encriptación avanzada de contraseñas y manejo de sesiones persistentes para garantizar que solo personal autorizado acceda al panel de control operativo.

Gestión Integral de Datos
Administración de múltiples entidades relacionadas como agentes, acciones, actividades, transporte y zonas geográficas.

Trazabilidad Completa
Cada registro en el sistema consolida información cruzada mediante claves foráneas, permitiendo seguimiento detallado de cada operación.

Interfaz Dinámica
Generación automática de formularios, tablas y modales basada en un diccionario de datos.

Validación Relacional
Uso de listas desplegables (selects) para garantizar consistencia en el ingreso de datos.

Dashboard
Visualización del estado del sistema mediante consultas en tiempo real y perfiles de usuario dinámicos.

Generación de Reportes
Creación de reportes individuales listos para impresión o exportación.

CRUD Completo
Operaciones de creación, lectura, actualización y eliminación en todas las entidades.

Stack Tecnológico
Backend
Node.js

Express.js

MySQL (MySQL2)

Dotenv

CORS

Bcryptjs (Encriptación de contraseñas)

JSON Web Token / JWT (Manejo y validación de sesiones)

Frontend
HTML5

CSS3 (Glassmorphism)

JavaScript (ES6+)

Fetch API

LocalStorage API (Persistencia de sesión en el cliente)

Sistema de Autenticación (Módulo de Seguridad)
El sistema integra un flujo de autenticación profesional y robusto:

Registro Seguro: Al crear un nuevo usuario, la contraseña es procesada con bcryptjs (Salting & Hashing) antes de ser almacenada en la base de datos, garantizando que no se guarden en texto plano.

Login y JWT: Al validar las credenciales correctas, el backend genera un token de acceso (JWT) firmado digitalmente y válido por 8 horas.

Guardián de Interfaz: El frontend implementa una capa de seguridad que verifica constantemente la existencia y validez del token en el localStorage. Si un usuario intenta acceder al Dashboard sin estar logueado, es redirigido inmediatamente a la pantalla de inicio de sesión.

Perfil Dinámico: El sistema extrae la información del usuario logueado para personalizar la interfaz, mostrando su nombre, rol y un menú desplegable interactivo para cerrar la sesión de forma segura y destruir el token.

Modelo del Sistema
El sistema se basa en entidades principales y un módulo de acceso:

Usuario (Control de Acceso)

Tipo de Agente

Acción

Acción Específica

Actividad

Subacción

Tipo de Transporte

Provincia

Distrito

Detalle de Registro

Estas entidades están relacionadas mediante claves foráneas para garantizar consistencia e integridad de datos.

Instalación y Ejecución
Clonar repositorio
Bash
git clone https://github.com/usian24/DASHBOARD_DARWIN.git
Entrar a la carpeta
Bash
cd 27-04-26 
(Esta es la carpeta principal donde se ejecutarán los demás comandos)

Instalar dependencias
Asegúrate de instalar todos los paquetes necesarios (incluyendo bcryptjs y jsonwebtoken):

Bash
npm install
Configuración de Base de Datos
Crear la base de datos con el nombre db_darwin y ejecutar el siguiente script dentro de tu gestor de base de datos (ej. HeidiSQL, phpMyAdmin):

SQL
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

-- Creamos la tabla para el Sistema de Login
CREATE TABLE `usuario` (
  `id_usuario` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre_completo` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `rol` VARCHAR(50) DEFAULT 'Administrador'
);
Variables de Entorno
Crear un archivo .env en la raíz del proyecto y pegar esta información:

Fragmento de código
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_darwin
DB_PORT=3306
Ejecución
Inicia el servidor backend:

Bash
node index.js
Acceder desde el navegador a la ruta principal (que te redirigirá al Login si no tienes sesión):
http://localhost:3001

(Al hacer correr te mandará el propio puerto en la consola de Visual Studio Code... mantén presionada la tecla Ctrl y presiona click a esa URL y te mandará al proyecto).