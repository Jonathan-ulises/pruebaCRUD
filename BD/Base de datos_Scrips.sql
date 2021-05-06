/*
AUTOR: Jonathan Ulises Sanchez Parra
FECHA DE CREACION: 05/05/2021
*/
DROP DATABASE IF EXISTS pruebaCRUD;
CREATE DATABASE pruebaCRUD;
USE pruebaCRUD;

-- TABLAS --
DROP TABLE IF EXISTS clientes;
CREATE TABLE clientes(
	idCliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    a_paterno VARCHAR(20) NOT NULL,
    a_materno VARCHAR(20) NOT NULL,
    telefono VARCHAR(13) NOT NULL,
    rfc VARCHAR(13) NOT NULL,
    longitud DOUBLE NOT NULL,
    latitud DOUBLE NOT NULL,
    estatus BOOLEAN NOT NULL DEFAULT 1
)

/*-----------STORED PROCEDURES--------------*/
-- INSERT CLIENTE --
DELIMITER $$
CREATE PROCEDURE insertCliente(
	IN nom VARCHAR(20),
    IN a_pat VARCHAR(20),
    IN a_mat VARCHAR(20),
    IN tel VARCHAR(13),
    IN rfcC VARCHAR(13),
    IN longt DOUBLE,
    IN latit DOUBLE
)
BEGIN
	INSERT INTO clientes (nombre, a_paterno, a_materno, telefono, rfc, longitud, latitud)
		VALUES (nom, a_pat, a_mat, tel, rfcC, longt, latit);
END
$$

-- UPDATE CLIENTE --
DELIMITER $$
CREATE PROCEDURE updateCliente(
	IN nom VARCHAR(20),
    IN a_pat VARCHAR(20),
    IN a_mat VARCHAR(20),
    IN tel VARCHAR(13),
    IN rfcC VARCHAR(13),
    IN longt DOUBLE,
    IN latit DOUBLE,
    IN idC INT
)
BEGIN
	UPDATE clientes SET 
		nombre = nom,
        a_paterno = a_pat,
        a_materno = a_mat,
        telefono = tel,
        rfc = rfcC,
        longitud = longt,
        latitud = latit
	WHERE idCliente = idC;
END
$$

-- DELETE CLIENTE --
DELIMITER $$
CREATE PROCEDURE deleteCliente(
	IN idC INT
)
BEGIN
	UPDATE clientes SET
		estatus = 0
	WHERE idCliente = idC;
END
$$
/*-------------------------------------------*/

/*-------------------VIEWS-------------------*/
-- VIEW FOR CLIENTES --
CREATE VIEW vCliente AS
	SELECT * FROM clientes WHERE estatus = 1;
    
SELECT * FROM vCliente;

/*--------------------------------------------*/
-- Datos de prueba --
call insertCliente('Jonathan', 'sanchez', 'parra', '4774473667', '1234567890asd', 0.0, 0.0);
call insertCliente('Roberto', 'Ortiz', 'Ramires', '4778385292', 'asd1234567890', 0.0, 0.0);

call updateCliente('Ulises', 'SANCHEZ', 'PARRA', '4776001449', '12A3456S789D0', 1.0, 1.0,1);

call deleteCliente(2);