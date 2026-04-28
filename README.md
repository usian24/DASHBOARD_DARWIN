# Sistema de Gestion y Trazabilidad Operativa "Darwin"

Este proyecto es una solucion Full-Stack robusta diseñada para el control, registro y mantenimiento de la trazabilidad de operaciones tecnicas en campo. Permite la gestion integral de personal, recursos logisticos y ubicaciones geograficas mediante una arquitectura de base de datos relacional de 9 tablas interconectadas.

Desarrollado como proyecto para la especialidad de Ingenieria de Software con Inteligencia Artificial en el instituto SENATI.

---

## Especificaciones Tecnicas

### Backend (Servidor y Logica)
* Entorno de ejecucion: Node.js v24.14.0
* Framework: Express.js
* Gestion de Base de Datos: MySQL 2 (Driver relacional)
* Seguridad y Configuracion: CORS (Cross-Origin Resource Sharing) y Dotenv para manejo de variables de entorno sensibles.

### Frontend (Interfaz de Usuario)
* Estilo Visual: Glassmorphism (Efecto de vidrio esmerilado con profundidad mediante CSS moderno).
* Maquetacion: HTML5 y CSS3 (Diseño responsivo y amigable al usuario).
* Logica de Cliente: JavaScript Vanilla (ES6+) con Fetch API para comunicacion asincrona con el servidor.

---

## Arquitectura del Sistema

El sistema administra 9 modulos fundamentales que garantizan la integridad de los datos:

1. Tipos de Agente (Roles de personal)
2. Acciones (Categorias principales)
3. Acciones Especificas (Subcategorias de labor)
4. Actividades (Tareas tecnicas programadas)
5. Subacciones (Detalles operativos)
6. Tipos de Transporte (Vehiculos y logistica)
7. Provincias (Ubicacion regional)
8. Distritos (Ubicacion local)
9. Registro Maestro (Consolidado de operacion con trazabilidad completa)

---

## Funcionalidades Destacadas

* Dashboard Estadistico: Panel principal que realiza consultas asincronas a la base de datos para mostrar el conteo real de registros y el estado de los servicios.
* Motor de UI Dinamico: Sistema que genera automaticamente tablas, formularios y modales de edicion a partir de un diccionario de datos centralizado.
* Integridad Referencial UX: Los formularios detectan automaticamente las llaves foraneas y muestran menus desplegables (Selects) para evitar errores de ingreso de datos manuales.
* Impresion de Reportes: Funcion integrada para generar reportes individuales en formato de boleta profesional, formateados para impresion o guardado como PDF.
* CRUD Completo: Capacidad de Crear, Leer, Actualizar y Eliminar registros en todas las tablas del sistema.

---

## Guia de Instalacion y Despliegue Local

Siga estrictamente estos pasos para ejecutar el proyecto en su computador:

### 1. Clonacion del Proyecto
Descargue el codigo fuente desde el repositorio oficial:
```bash
git clone <URL_DEL_REPOSITORIO>
cd 27-04-26
2. Instalacion de Dependencias
Ejecute el siguiente comando para reconstruir la carpeta "node_modules" y descargar las librerias necesarias (Express, MySQL2, etc.):

Bash
npm install
3. Configuracion de la Base de Datos
Es obligatorio restaurar la base de datos antes de iniciar el servidor:

Inicie su servicio MySQL (Laragon).

Cree una base de datos nueva llamada: darwin_db

Importe el archivo "darwin_db.sql" ubicado en la raiz de este proyecto dentro de la base de datos creada.

4. Archivo de Configuracion (.env)
Debe crear un archivo de texto llamado ".env" en la raiz del proyecto (al nivel de index.js) con el siguiente contenido:

Fragmento de código
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=darwin_db
DB_PORT=3306
5. Ejecucion del Sistema
Para iniciar el servidor de manera oficial, utilice el comando estandar de Node.js:

Bash
node index.js
El sistema confirmara el inicio con el mensaje: "Sistema Darwin corriendo en http://localhost:3001".

6. Acceso
Abra su navegador y entre a: http://localhost:3001

Autor
Desarrollador: Jhon Alberto Aguilar Quispe

Institucion: SENATI (Huánuco, Peru)
**********************************************************************************************************************+++++
base de datos:


CREATE DATABASE IF NOT EXISTS `db_darwin`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE `db_darwin`;

-- Tabla: accion
CREATE TABLE IF NOT EXISTS `accion` (
  `ID_ACCION` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_ABREVIADO` VARCHAR(50) DEFAULT NULL,
  `NOMBRE_ACCION` VARCHAR(50) DEFAULT NULL,
  `CODIGO_A_E` VARCHAR(50) DEFAULT NULL,
  `CODIGO_P_ACCION` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`ID_ACCION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: accion_especifica
CREATE TABLE IF NOT EXISTS `accion_especifica` (
  `ID_AE` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_ABREVIADO` VARCHAR(50) NOT NULL,
  `ACCION_ESPECIFICA` VARCHAR(50) NOT NULL,
  `CODIGO_A_E` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID_AE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: tipo_agente
CREATE TABLE IF NOT EXISTS `tipo_agente` (
  `ID_TA` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_TA` VARCHAR(50),
  PRIMARY KEY (`ID_TA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: actividad
CREATE TABLE IF NOT EXISTS `actividad` (
  `ID_ACTIVIDAD` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_ACTIVIDAD` VARCHAR(50) NOT NULL,
  `CODIGO_ACTIVIDAD` VARCHAR(50) NOT NULL,
  `ID_TA` INT,
  PRIMARY KEY (`ID_ACTIVIDAD`),
  FOREIGN KEY (`ID_TA`) REFERENCES `tipo_agente`(`ID_TA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: subaccion
CREATE TABLE IF NOT EXISTS `subaccion` (
  `ID_SA` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_ABREVIADO` VARCHAR(50) NOT NULL,
  `SUB_ACCION_ESP` VARCHAR(50) NOT NULL,
  `CONCAT` VARCHAR(50) NOT NULL,
  `CODIGO_S_A_E` VARCHAR(50) NOT NULL,
  `ID_AE` INT NOT NULL,
  PRIMARY KEY (`ID_SA`),
  FOREIGN KEY (`ID_AE`) REFERENCES `accion_especifica`(`ID_AE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: tipo_transporte
CREATE TABLE IF NOT EXISTS `tipo_transporte` (
  `id_tt` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_TRANSPORTE` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_tt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: zona_provincia
CREATE TABLE IF NOT EXISTS `zona_provincia` (
  `id_zp` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_PROVINCIA` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_zp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: zona_distrito
CREATE TABLE IF NOT EXISTS `zona_distrito` (
  `id_zd` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE_DISTRITO` VARCHAR(50),
  `id_zp` INT,
  PRIMARY KEY (`id_zd`),
  FOREIGN KEY (`id_zp`) REFERENCES `zona_provincia`(`id_zp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: detalle_registro
CREATE TABLE IF NOT EXISTS `detalle_registro` (
  `ID_REGISTRO` INT NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`ID_REGISTRO`),
  FOREIGN KEY (`ID_ACCION`) REFERENCES `accion`(`ID_ACCION`),
  FOREIGN KEY (`ID_AE`) REFERENCES `accion_especifica`(`ID_AE`),
  FOREIGN KEY (`ID_SA`) REFERENCES `subaccion`(`ID_SA`),
  FOREIGN KEY (`ID_TA`) REFERENCES `tipo_agente`(`ID_TA`),
  FOREIGN KEY (`id_tt`) REFERENCES `tipo_transporte`(`id_tt`),
  FOREIGN KEY (`id_zd`) REFERENCES `zona_distrito`(`id_zd`),
  FOREIGN KEY (`id_zp`) REFERENCES `zona_provincia`(`id_zp`),
  FOREIGN KEY (`ID_ACTIVIDAD`) REFERENCES `actividad`(`ID_ACTIVIDAD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;