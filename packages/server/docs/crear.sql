-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 08, 2017 at 07:11 PM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- DROP USER 'sistrac'@'localhost';
CREATE USER 'sistrac'@'localhost' IDENTIFIED BY 'andueza';

--
-- Database: `sistrac`
--
DROP DATABASE IF EXISTS `sistrac`;
CREATE DATABASE IF NOT EXISTS `sistrac` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES,
  EXECUTE, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EVENT, TRIGGER
  ON `sistrac`.* TO 'sistrac'@'localhost';


USE `sistrac`;
-- --------------------------------------------------------

--
-- Table structure for table `Escalas`
--

CREATE TABLE `Escalas` (
  `idEscala` int(11) NOT NULL,
  `idEstacion` char(3) NOT NULL,
  `llega` int(11) NOT NULL DEFAULT '0',
  `idItinerario` int(11) NOT NULL DEFAULT '0',
  `orden` int(11) NOT NULL DEFAULT '0',
  `sale` int(11) NOT NULL DEFAULT '0'
);

--
-- Dumping data for table `Escalas`
--

INSERT INTO `Escalas` (`idEscala`, `idEstacion`, `llega`, `idItinerario`, `orden`, `sale`) VALUES
(1, 'RET', 0, 1, 1, 0),
(2, 'ZRT', 60, 1, 2, 65),
(3, 'SPD', 97, 1, 3, 102),
(4, 'SNC', 150, 1, 4, 155),
(5, 'RSN', 180, 1, 5, 180),
(6, 'MGT', 0, 2, 0, 0),
(7, 'SCT', 5, 2, 0, 6),
(8, 'TNV', 8, 2, 0, 8);

-- --------------------------------------------------------

--
-- Table structure for table `Estaciones`
--

CREATE TABLE `Estaciones` (
  `idEstacion` char(3) NOT NULL DEFAULT '',
  `nombre` varchar(100) NOT NULL DEFAULT '',
  `latitud` double NOT NULL DEFAULT '0',
  `longitud` double NOT NULL DEFAULT '0'
);

--
-- Dumping data for table `Estaciones`
--

INSERT INTO `Estaciones` (`nombre`, `latitud`, `idEstacion`, `longitud`) VALUES
('Retiro', -34.590672, 'RET', -58.377158),
('3 de Febrero', -34.5719, '3FB', -58.425296),
('Carranza', -34.57584, 'CRZ', -58.435669),
('Colegiales', -34.573025, 'CLG', -58.448114),
('Rosario norte', -32.930863, 'RSN', -60.657509),
('Zárate', -34.097548, 'ZRT', -59.038071),
('San Pedro', -33.694033, 'SPD', -59.680496),
('San Nicolás', -33.344411, 'SNC', -60.226147),
('Miguelete Tecnotrén', -34.581334, 'MGT', -58.516368),
('Tornavía Tecnotrén', -34.578076, 'TNV', -58.52605),
('Sociales Tecnotrén', -34.58084, 'SCT', -58.521459);

-- --------------------------------------------------------

--
-- Table structure for table `Eventos`
--

CREATE TABLE `Eventos` (
  `idEvento` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idUsuario` int(11) NOT NULL DEFAULT '0',
  `funcion` int(11) NOT NULL DEFAULT '0',
  `idTren` int(11) NOT NULL DEFAULT '0',
  `idEstacion` char(3) NOT NULL,
  `combustible` int(11) NOT NULL DEFAULT '0',
  `observaciones` text NOT NULL,
  `longitud` double NOT NULL DEFAULT '0',
  `velocidad` double NOT NULL DEFAULT '0',
  `latitud` double NOT NULL DEFAULT '0',
  `idTipoEmergencia` int(11) NOT NULL DEFAULT '0',
  `idTipoEvento` int(11) NOT NULL DEFAULT '0'
);

--
-- Dumping data for table `Eventos`
--

INSERT INTO `Eventos` (`idEvento`, `fecha`, `idUsuario`, `funcion`, `idTren`, `idEstacion`, `combustible`, `observaciones`, `longitud`, `velocidad`, `latitud`, `idTipoEmergencia`, `idTipoEvento`) VALUES
(7, '2016-09-11 03:36:06', 7, 3, 2, 'ZRT', 0, '', -59.038071, 0, -34.097548, 0, 3),
(5, '2016-09-11 03:29:45', 7, 3, 2, 'RET', 0, '', -58.377158, 0, -34.590672, 0, 1),
(6, '2016-09-11 03:32:56', 7, 3, 2, 'ZRT', 0, '', -59.038071, 0, -34.097548, 0, 2),
(8, '2016-09-11 03:40:29', 7, 3, 2, 'SPD', 0, '', -59.680496, 0, -33.694033, 0, 2),
(9, '2016-09-11 03:43:37', 7, 3, 2, 'SPD', 0, '', -59.680496, 0, -33.694033, 0, 3),
(10, '2016-09-11 03:50:46', 7, 3, 2, 'SNC', 0, '', -60.226147, 0, -33.344411, 0, 2),
(11, '2016-09-11 03:52:54', 7, 3, 2, 'SNC', 0, '', -60.226147, 0, -33.344411, 0, 3),
(12, '2016-09-11 03:59:15', 7, 3, 2, 'RSN', 0, 'Final', -60.657509, 0, -32.930863, 0, 4),
(13, '2016-09-16 19:20:43', 2, 1, 8, 'RET', 0, 'Sale de la Terminal', -58.377158, 0, -34.590672, 0, 1),
(14, '2016-09-16 19:25:54', 2, 1, 8, 'ZRT', 0, '', -59.038071, 0, -34.097548, 0, 2),
(15, '2016-09-16 19:27:00', 2, 1, 8, 'ZRT', 0, '', -59.038071, 0, -34.097548, 0, 3),
(16, '2016-09-16 19:31:05', 2, 1, 8, 'SPD', 0, '', -59.680496, 0, -33.694033, 0, 2),
(17, '2016-09-16 19:33:10', 2, 1, 8, 'SPD', 0, '', -59.680496, 0, -33.694033, 0, 3),
(18, '2016-09-16 19:34:17', 2, 1, 8, 'SNC', 0, '', -60.226147, 0, -33.344411, 0, 2),
(19, '2016-09-16 19:40:26', 2, 1, 8, 'SNC', 0, '', -60.226147, 0, -33.344411, 0, 3),
(20, '2016-09-16 20:15:35', 2, 1, 8, 'RSN', 0, '', -60.657509, 0, -32.930863, 0, 4),
(21, '2016-09-16 19:57:11', 7, 3, 7, 'RET', 0, 'Sale de Retiro', -58.377158, 0, -34.590672, 0, 1),
(22, '2016-09-16 20:09:19', 7, 3, 7, 'ZRT', 0, 'Llega a Zárate', -59.038071, 0, -34.097548, 0, 2),
(23, '2016-09-23 02:37:44', 2, 1, 1, 'RET', 0, 'Acabo de salir, loco', -58.4344687, 0, -34.6176428, 0, 1),
(24, '2016-09-23 02:39:56', 2, 1, 1, 'ZRT', 0, 'Dale, forro', -58.4344687, 0, -34.6176428, 0, 2),
(25, '2016-09-24 14:08:29', 2, 1, 1, 'ZRT', 0, 'Pisé un chancho', -58.4344687, 0, -34.6176428, 3, 7),
(26, '2016-09-24 14:17:16', 2, 1, 1, 'ZRT', 0, 'Me salí', -58.4344687, 0, -34.6176428, 4, 7),
(27, '2016-09-24 14:54:49', 2, 1, 1, 'ZRT', 0, 'A ver si anda todo', -58.4344687, 0, -34.6176428, 8, 7),
(28, '2016-09-24 14:55:17', 2, 1, 1, 'ZRT', 0, 'Todo Arreglado', -58.4344687, 0, -34.6176428, 7, 8),
(29, '2016-09-25 03:21:22', 2, 1, 1, 'ZRT', 0, 'Experimento', -58.4344687, 0, -34.6176428, 1, 7),
(30, '2016-09-25 03:30:40', 2, 1, 1, 'ZRT', 0, '', -58.4344687, 0, -34.6176428, 7, 8),
(31, '2016-09-25 03:31:43', 2, 1, 1, 'ZRT', 0, 'Otra más', -58.4344687, 0, -34.6176428, 1, 7),
(32, '2016-09-25 03:32:05', 2, 1, 1, 'ZRT', 0, 'Todo resuelto', -58.4344687, 0, -34.6176428, 7, 8),
(33, '2016-09-28 14:53:35', 2, 1, 1, 'ZRT', 0, '', 1.8039035, 0, 41.2382201, 7, 3),
(34, '2016-09-28 14:56:56', 2, 1, 1, 'SPD', 0, 'Sonamos', 1.8038793, 0, 41.2381851, 1, 7),
(35, '2016-09-28 15:03:18', 2, 1, 1, 'SPD', 0, '', 1.8038871, 0, 41.2382194, 7, 8),
(36, '2016-09-30 03:41:11', 2, 1, 9, 'RET', 0, 'Bla', 0, 0, 0, 7, 1),
(37, '2016-09-29 22:50:10', 2, 1, 9, 'ZRT', 0, 'Llegue', 0, 0, 0, 7, 2),
(38, '2016-09-29 22:52:05', 2, 1, 9, 'ZRT', 0, 'Hola', -58.3807908, 0, -34.6288901, 2, 7),
(39, '2016-10-06 18:13:38', 2, 1, 10, 'RET', 0, 'Salimos de Retiro', 0, 0, 0, 7, 1),
(40, '2016-10-06 23:20:51', 2, 1, 10, 'ZRT', 0, '', -58.3807693, 0, -34.6288651, 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Itinerarios`
--

CREATE TABLE `Itinerarios` (
  `idItinerario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL DEFAULT ''
);

--
-- Dumping data for table `Itinerarios`
--

INSERT INTO `Itinerarios` (`idItinerario`, `nombre`) VALUES
(1, 'Retiro-Rosario'),
(2, 'Probador');

-- --------------------------------------------------------

--
-- Table structure for table `Pings`
--

CREATE TABLE `Pings` (
  `idPing` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL DEFAULT '0',
  `tiempo` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `latitud` double NOT NULL DEFAULT '0',
  `velocidad` int(11) NOT NULL DEFAULT '0',
  `direccion` int(11) NOT NULL DEFAULT '0',
  `tiempoAgregado` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `longitud` double NOT NULL DEFAULT '0'
);

-- --------------------------------------------------------

--
-- Table structure for table `Revisiones`
--

CREATE TABLE `Revisiones` (
  `idRevision` int(11) NOT NULL,
  `observaciones` text NOT NULL,
  `idUsuario` int(11) NOT NULL DEFAULT '0',
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `apto` tinyint(1) NOT NULL DEFAULT '0',
  `chapa` int(11) NOT NULL DEFAULT '0',
  `combustible` int(11) NOT NULL DEFAULT '0',
  `idEstacion` char(3) NOT NULL,
  `numero` int(11) NOT NULL DEFAULT '0'
);

--
-- Dumping data for table `Revisiones`
--

INSERT INTO `Revisiones` (`idRevision`, `observaciones`, `idUsuario`, `fecha`, `apto`, `chapa`, `combustible`, `idEstacion`, `numero`) VALUES
(1, 'sdfg', 0, '2016-09-24 21:37:43', 1, 0, 0, 'RET', 9069),
(2, 'sdfg', 0, '2016-09-24 21:37:43', 1, 45, 0, '3FB', 0),
(3, 'Chorrea grasa', 0, '2016-09-24 21:39:45', 0, 0, 0, 'CRZ', 9069),
(4, 'sdfg', 0, '2016-09-24 21:39:45', 1, 45, 0, 'RET', 0),
(5, 'Todo bien-to', 5, '2016-09-24 22:20:44', 1, 0, 5000, 'RET', 9084),
(6, 'Todo mal-to', 5, '2016-09-24 22:22:48', 0, 0, 6, 'RET', 9084),
(7, 'Arreglada', 5, '2016-09-24 22:59:51', 1, 0, 43, 'RET', 9084),
(8, 'Ok', 5, '2016-09-28 15:09:13', 1, 0, 100, 'RET', 9069),
(9, '', 5, '2016-09-28 15:09:13', 1, 45, 0, 'RET', 0),
(10, 'Ok', 5, '2016-09-28 15:09:33', 1, 0, 100, 'RET', 9069),
(11, 'Bonito', 5, '2016-09-28 15:09:33', 1, 45, 0, 'RET', 0),
(12, 'Ok', 5, '2016-09-28 15:10:33', 1, 0, 100, 'RET', 9069),
(13, 'Bonito', 5, '2016-09-28 15:10:33', 1, 45, 0, 'RET', 0),
(14, 'nada', 5, '2016-10-06 23:19:01', 1, 0, 500, 'RET', 9069);

-- --------------------------------------------------------

--
-- Table structure for table `TipoEmergencias`
--

CREATE TABLE `TipoEmergencias` (
  `idTipoEmergencia` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL DEFAULT ''
);

--
-- Dumping data for table `TipoEmergencias`
--

INSERT INTO `TipoEmergencias` (`idTipoEmergencia`, `tipo`) VALUES
(1, 'Choque con vehículo'),
(2, 'Atropello de persona'),
(3, 'Atropello de ganado'),
(4, 'Descarrilamiento'),
(5, 'Detención por problemas técnicos'),
(6, 'Detención por otros problemas'),
(7, 'Problemas de salud con pasajero'),
(8, 'Riña con pasajero');

-- --------------------------------------------------------

--
-- Table structure for table `TipoEvento`
--

CREATE TABLE `TipoEvento` (
  `idTipoEvento` int(11) NOT NULL,
  `preposicion` varchar(100) NOT NULL DEFAULT '',
  `tipo` varchar(100) NOT NULL DEFAULT ''
);

--
-- Dumping data for table `TipoEvento`
--

INSERT INTO `TipoEvento` (`idTipoEvento`, `preposicion`, `tipo`) VALUES
(1, 'de', 'Sale de terminal'),
(2, 'a', 'Llega'),
(3, 'de', 'Sale'),
(4, 'a', 'Llega a terminal'),
(5, 'en', 'Revisión técnica'),
(6, 'en', 'Relevo de personal'),
(7, 'en', 'Emergencia'),
(8, 'en', 'Fin de emergencia');

-- --------------------------------------------------------

--
-- Table structure for table `Trenes`
--

CREATE TABLE `Trenes` (
  `idTren` int(11) NOT NULL,
  `idItinerario` int(11) NOT NULL DEFAULT '0',
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chapa` int(11) NOT NULL DEFAULT '0',
  `idGuarda` int(11) NOT NULL DEFAULT '0',
  `idAyudante` int(11) NOT NULL DEFAULT '0',
  `idConductor` int(11) NOT NULL DEFAULT '0',
  `locomotora` int(11) NOT NULL DEFAULT '0',
  `estado` int(11) NOT NULL DEFAULT '0',
  `estadoAnterior` int(11) NOT NULL DEFAULT '0',
  `numero` int(11) NOT NULL DEFAULT '0'
);

--
-- Dumping data for table `Trenes`
--

INSERT INTO `Trenes` (`idTren`, `idItinerario`, `fecha`, `chapa`, `idGuarda`, `idAyudante`, `idConductor`, `locomotora`, `estado`, `estadoAnterior`, `numero`) VALUES
(1, 1, '2016-09-28 10:00:00', 45, 2, 7, 3, 9069, 3, 1, 303),
(2, 1, '2016-09-11 03:25:00', 11, 9, 7, 8, 8447, 3, 0, 300),
(3, 0, '2016-09-16 19:20:00', 45, 9, 7, 3, 9069, 0, 0, 303),
(4, 0, '2016-09-16 19:20:00', 45, 9, 7, 8, 9069, 0, 0, 303),
(5, 0, '2016-09-16 19:20:00', 45, 9, 7, 8, 9069, 0, 0, 303),
(6, 0, '2016-09-16 19:09:00', 45, 9, 7, 8, 9069, 0, 0, 303),
(7, 1, '2016-09-16 19:20:00', 45, 9, 7, 8, 9069, 2, 0, 303),
(8, 1, '2016-09-16 19:50:00', 45, 2, 4, 3, 9069, 3, 0, 305),
(9, 1, '2016-09-29 16:30:00', 13, 9, 7, 3, 9096, -1, 2, 309),
(10, 1, '2016-10-06 16:15:00', 12, 2, 7, 8, 9069, 7, 2, 507);

-- --------------------------------------------------------

--
-- Table structure for table `Usuarios`
--

CREATE TABLE `Usuarios` (
  `idUsuario` int(11) NOT NULL,
  `password` varchar(100) NOT NULL DEFAULT '',
  `usuario` varchar(100) NOT NULL DEFAULT '',
  `nivel` int(11) NOT NULL DEFAULT '0',
  `rolGuarda` tinyint(1) NOT NULL DEFAULT '0',
  `rolDios` tinyint(1) NOT NULL DEFAULT '0',
  `rolSupervisor` tinyint(1) NOT NULL DEFAULT '0',
  `rolMecanico` tinyint(1) NOT NULL DEFAULT '0',
  `funcion` int(11) NOT NULL DEFAULT '0',
  `nombre` varchar(100) NOT NULL DEFAULT ''
);

--
-- Dumping data for table `Usuarios`
--

INSERT INTO `Usuarios` (`idUsuario`, `password`, `usuario`, `nivel`, `rolGuarda`, `rolDios`, `rolSupervisor`, `rolMecanico`, `funcion`, `nombre`) VALUES
(1, 'e24fa5f1901c2c38540e9adef2e3b0a1', 'themistocles', 1, 1, 1, 1, 1, 0, 'Ricardo Barreiro'),
(2, '54e8a1106eeb36711ecb8c94598bcc70', 'juanperez', 0, 1, 0, 0, 0, 1, 'Juan Pérez'),
(3, '013d3a82435fe0809d1e6396b3e4f69c', 'franciscosavio', 0, 1, 0, 0, 0, 2, 'Francisco Savio'),
(4, '1d7a2cf22fb3fc2fd245ab070478b3f7', 'marcelosoto', 0, 1, 0, 0, 0, 3, 'Marcelo Soto'),
(5, 'cfac7d176dc9e1bc857d91c1a140056d', 'emmetbrown', 0, 0, 0, 0, 1, 0, 'Emmet Brown'),
(6, '154ce8c1bd53ea5afa066f92b3c60683', 'lich', 0, 0, 0, 1, 0, 0, 'Lisandro Iturralde'),
(7, '067391c21645e28c9ead2c41f5308b0c', 'leandromelluso', 0, 1, 0, 0, 0, 3, 'Leandro Melluso'),
(8, 'afa27acf2e8fc7161ee993c421502674', 'caseyjones', 0, 1, 0, 0, 0, 2, 'Casey Jones'),
(9, 'cd616f2f57739f3831531950d63c7d2f', 'juanmajic', 0, 1, 0, 0, 0, 1, 'Juan Majic'),
(10, '94964d16964622c8a5f605bf7f82bc73', 'satyam', 1, 1, 1, 1, 1, 0, 'Daniel Barreiro');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Escalas`
--
ALTER TABLE `Escalas`
  ADD PRIMARY KEY (`idEscala`);

--
-- Indexes for table `Estaciones`
--
ALTER TABLE `Estaciones`
  ADD PRIMARY KEY (`idEstacion`),
  ADD UNIQUE KEY `Estaciones-Nombre` (`nombre`),
  ADD UNIQUE KEY `Estaciones-Sigla` (`idEstacion`);

--
-- Indexes for table `Eventos`
--
ALTER TABLE `Eventos`
  ADD PRIMARY KEY (`idEvento`);

--
-- Indexes for table `Itinerarios`
--
ALTER TABLE `Itinerarios`
  ADD PRIMARY KEY (`idItinerario`);

--
-- Indexes for table `Pings`
--
ALTER TABLE `Pings`
  ADD PRIMARY KEY (`idPing`);

--
-- Indexes for table `Revisiones`
--
ALTER TABLE `Revisiones`
  ADD PRIMARY KEY (`idRevision`);

--
-- Indexes for table `TipoEmergencias`
--
ALTER TABLE `TipoEmergencias`
  ADD PRIMARY KEY (`idTipoEmergencia`);

--
-- Indexes for table `TipoEvento`
--
ALTER TABLE `TipoEvento`
  ADD PRIMARY KEY (`idTipoEvento`);

--
-- Indexes for table `Trenes`
--
ALTER TABLE `Trenes`
  ADD PRIMARY KEY (`idTren`);

--
-- Indexes for table `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `Usuarios-Usuario` (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Escalas`
--
ALTER TABLE `Escalas`
  MODIFY `idEscala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `Eventos`
--
ALTER TABLE `Eventos`
  MODIFY `idEvento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `Itinerarios`
--
ALTER TABLE `Itinerarios`
  MODIFY `idItinerario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Pings`
--
ALTER TABLE `Pings`
  MODIFY `idPing` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Revisiones`
--
ALTER TABLE `Revisiones`
  MODIFY `idRevision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `TipoEmergencias`
--
ALTER TABLE `TipoEmergencias`
  MODIFY `idTipoEmergencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `TipoEvento`
--
ALTER TABLE `TipoEvento`
  MODIFY `idTipoEvento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `Trenes`
--
ALTER TABLE `Trenes`
  MODIFY `idTren` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
