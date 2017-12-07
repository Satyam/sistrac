SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


--
-- Database: `sistrac`
--
DROP DATABASE IF EXISTS `sistrac`;
CREATE DATABASE IF NOT EXISTS `sistrac` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `sistrac`;

-- --------------------------------------------------------

--
-- Table structure for table `escalas`
--

DROP TABLE IF EXISTS `escalas`;
CREATE TABLE IF NOT EXISTS `escalas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Estacion` int(11) NOT NULL DEFAULT '0',
  `Llega` int(11) NOT NULL DEFAULT '0',
  `Itinerario` int(11) NOT NULL DEFAULT '0',
  `Orden` int(11) NOT NULL DEFAULT '0',
  `Sale` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 ;

--
-- Dumping data for table `escalas`
--

INSERT INTO `escalas` (`ID`, `Estacion`, `Llega`, `Itinerario`, `Orden`, `Sale`) VALUES
(1, 1, 0, 1, 1, 0),
(2, 9, 60, 1, 2, 65),
(3, 10, 97, 1, 3, 102),
(4, 11, 150, 1, 4, 155),
(5, 8, 180, 1, 5, 180),
(6, 12, 0, 2, 0, 0),
(7, 14, 5, 2, 0, 6),
(8, 13, 8, 2, 0, 8);

-- --------------------------------------------------------

--
-- Table structure for table `estaciones`
--

DROP TABLE IF EXISTS `estaciones`;
CREATE TABLE IF NOT EXISTS `estaciones` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL DEFAULT '',
  `Latitud` double NOT NULL DEFAULT '0',
  `Sigla` varchar(100) NOT NULL DEFAULT '',
  `Longitud` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=17 ;

--
-- Dumping data for table `estaciones`
--

INSERT INTO `estaciones` (`ID`, `Nombre`, `Latitud`, `Sigla`, `Longitud`) VALUES
(1, 'Retiro', -34.590672, 'RET', -58.377158),
(2, '3 de Febrero', -34.5719, '3FB', -58.425296),
(3, 'Carranza', -34.57584, 'CRZ', -58.435669),
(7, 'Colegiales', -34.573025, 'CLG', -58.448114),
(8, 'Rosario norte', -32.930863, 'RSN', -60.657509),
(9, 'Zárate', -34.097548, 'ZRT', -59.038071),
(10, 'San Pedro', -33.694033, 'SPD', -59.680496),
(11, 'San Nicolás', -33.344411, 'SNC', -60.226147),
(12, 'Miguelete Tecnotrén', -34.581334, 'MGT', -58.516368),
(13, 'Tornavía Tecnotrén', -34.578076, 'TNV', -58.52605),
(14, 'Sociales Tecnotrén', -34.58084, 'SCT', -58.521459),
(15, 'Ecuatorlal', 0, 'ECT', 0),
(16, 'Ecuatorial', 0, 'ECT', 0);

-- --------------------------------------------------------

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
CREATE TABLE IF NOT EXISTS `eventos` (
  `Fecha` bigint(20) NOT NULL DEFAULT '0',
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` int(11) NOT NULL DEFAULT '0',
  `Funcion` int(11) NOT NULL DEFAULT '0',
  `Tren` int(11) NOT NULL DEFAULT '0',
  `Estacion` int(11) NOT NULL DEFAULT '0',
  `Combustible` int(11) NOT NULL DEFAULT '0',
  `Observaciones` blob NOT NULL,
  `Longitud` double NOT NULL DEFAULT '0',
  `Velocidad` double NOT NULL DEFAULT '0',
  `Latitud` double NOT NULL DEFAULT '0',
  `TipoEmergencia` int(11) NOT NULL DEFAULT '0',
  `Tipo` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=41 ;

--
-- Dumping data for table `eventos`
--

INSERT INTO `eventos` (`Fecha`, `ID`, `Usuario`, `Funcion`, `Tren`, `Estacion`, `Combustible`, `Observaciones`, `Longitud`, `Velocidad`, `Latitud`, `TipoEmergencia`, `Tipo`) VALUES
(1473564966, 7, 7, 3, 2, 9, 0, '', -59.038071, 0, -34.097548, 0, 3),
(1473564585, 5, 7, 3, 2, 1, 0, '', -58.377158, 0, -34.590672, 0, 1),
(1473564776, 6, 7, 3, 2, 9, 0, '', -59.038071, 0, -34.097548, 0, 2),
(1473565229, 8, 7, 3, 2, 10, 0, '', -59.680496, 0, -33.694033, 0, 2),
(1473565417, 9, 7, 3, 2, 10, 0, '', -59.680496, 0, -33.694033, 0, 3),
(1473565846, 10, 7, 3, 2, 11, 0, '', -60.226147, 0, -33.344411, 0, 2),
(1473565974, 11, 7, 3, 2, 11, 0, '', -60.226147, 0, -33.344411, 0, 3),
(1473566355, 12, 7, 3, 2, 8, 0, 0x46696e616c, -60.657509, 0, -32.930863, 0, 4),
(1474053643, 13, 2, 1, 8, 1, 0, 0x53616c65206465206c61207465726d696e616c, -58.377158, 0, -34.590672, 0, 1),
(1474053954, 14, 2, 1, 8, 9, 0, '', -59.038071, 0, -34.097548, 0, 2),
(1474054020, 15, 2, 1, 8, 9, 0, '', -59.038071, 0, -34.097548, 0, 3),
(1474054265, 16, 2, 1, 8, 10, 0, '', -59.680496, 0, -33.694033, 0, 2),
(1474054390, 17, 2, 1, 8, 10, 0, '', -59.680496, 0, -33.694033, 0, 3),
(1474054457, 18, 2, 1, 8, 11, 0, '', -60.226147, 0, -33.344411, 0, 2),
(1474054826, 19, 2, 1, 8, 11, 0, '', -60.226147, 0, -33.344411, 0, 3),
(1474056935, 20, 2, 1, 8, 8, 0, '', -60.657509, 0, -32.930863, 0, 4),
(1474055831, 21, 7, 3, 7, 1, 0, 0x53616c652064652052657469726f, -58.377158, 0, -34.590672, 0, 1),
(1474056559, 22, 7, 3, 7, 9, 0, 0x4c6c6567612061205ac3a172617465, -59.038071, 0, -34.097548, 0, 2),
(1474598264, 23, 2, 1, 1, 1, 0, 0x416361626f2064652073616c69722c206c6f636f, -58.4344687, 0, -34.6176428, 0, 1),
(1474598396, 24, 2, 1, 1, 9, 0, 0x44616c652c20666f72726f, -58.4344687, 0, -34.6176428, 0, 2),
(1474726109, 25, 2, 1, 1, 9, 0, 0x506973c3a920756e206368616e63686f, -58.4344687, 0, -34.6176428, 3, 7),
(1474726636, 26, 2, 1, 1, 9, 0, 0x4d652073616cc3ad, -58.4344687, 0, -34.6176428, 4, 7),
(1474728889, 27, 2, 1, 1, 9, 0, 0x412076657220736920616e646120746f646f, -58.4344687, 0, -34.6176428, 8, 7),
(1474728917, 28, 2, 1, 1, 9, 0, 0x546f646f2061727265676c61646f, -58.4344687, 0, -34.6176428, 7, 8),
(1474773682, 29, 2, 1, 1, 9, 0, 0x457870657269656d6e746f, -58.4344687, 0, -34.6176428, 1, 7),
(1474774240, 30, 2, 1, 1, 9, 0, '', -58.4344687, 0, -34.6176428, 7, 8),
(1474774303, 31, 2, 1, 1, 9, 0, 0x4f747261206dc3a173, -58.4344687, 0, -34.6176428, 1, 7),
(1474774325, 32, 2, 1, 1, 9, 0, 0x546f646f2072657375656c746f, -58.4344687, 0, -34.6176428, 7, 8),
(1475074415, 33, 2, 1, 1, 9, 0, '', 1.8039035, 0, 41.2382201, 7, 3),
(1475074616, 34, 2, 1, 1, 10, 0, 0x536f6e616d6f730d0a, 1.8038793, 0, 41.2381851, 1, 7),
(1475074998, 35, 2, 1, 1, 10, 0, '', 1.8038871, 0, 41.2382194, 7, 8),
(1475206871, 36, 2, 1, 9, 1, 0, 0x426c61, 0, 0, 0, 7, 1),
(1475189410, 37, 2, 1, 9, 9, 0, 0x4c6c65677565, 0, 0, 0, 7, 2),
(1475189525, 38, 2, 1, 9, 9, 0, 0x486f6c61, -58.3807908, 0, -34.6288901, 2, 7),
(1475777618, 39, 2, 1, 10, 1, 0, 0x53616c696d6f732064652052657469726f, 0, 0, 0, 7, 1),
(1475796051, 40, 2, 1, 10, 9, 0, '', -58.3807693, 0, -34.6288651, 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `itinerarios`
--

DROP TABLE IF EXISTS `itinerarios`;
CREATE TABLE IF NOT EXISTS `itinerarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 ;

--
-- Dumping data for table `itinerarios`
--

INSERT INTO `itinerarios` (`ID`, `Nombre`) VALUES
(1, 'Retiro-Rosario'),
(2, 'Probador');

-- --------------------------------------------------------

--
-- Table structure for table `pings`
--

DROP TABLE IF EXISTS `pings`;
CREATE TABLE IF NOT EXISTS `pings` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` int(11) NOT NULL DEFAULT '0',
  `Tiempo` bigint(20) NOT NULL DEFAULT '0',
  `Latitud` double NOT NULL DEFAULT '0',
  `Velocidad` int(11) NOT NULL DEFAULT '0',
  `Direccion` int(11) NOT NULL DEFAULT '0',
  `TiempoAgregado` bigint(20) NOT NULL DEFAULT '0',
  `Longitud` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `revisiones`
--

DROP TABLE IF EXISTS `revisiones`;
CREATE TABLE IF NOT EXISTS `revisiones` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Observaciones` blob NOT NULL,
  `Usuario` int(11) NOT NULL DEFAULT '0',
  `Fecha` bigint(20) NOT NULL DEFAULT '0',
  `Apto` tinyint(1) NOT NULL DEFAULT '0',
  `Chapa` int(11) NOT NULL DEFAULT '0',
  `Combustible` int(11) NOT NULL DEFAULT '0',
  `Estacion` int(11) NOT NULL DEFAULT '0',
  `Numero` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 ;

--
-- Dumping data for table `revisiones`
--

INSERT INTO `revisiones` (`ID`, `Observaciones`, `Usuario`, `Fecha`, `Apto`, `Chapa`, `Combustible`, `Estacion`, `Numero`) VALUES
(1, 0x73646667, 0, 1474753063, 1, 0, 0, 1, 9069),
(2, 0x73646667, 0, 1474753063, 1, 45, 0, 2, 0),
(3, 0x43686f72726561206772617361, 0, 1474753185, 0, 0, 0, 3, 9069),
(4, 0x73646667, 0, 1474753185, 1, 45, 0, 1, 0),
(5, 0x546f646f206269656e2d746f, 5, 1474755644, 1, 0, 5000, 1, 9084),
(6, 0x546f646f206d616c2d746f, 5, 1474755768, 0, 0, 6, 1, 9084),
(7, 0x41727265676c616461, 5, 1474757991, 1, 0, 43, 1, 9084),
(8, 0x4f6b, 5, 1475075353, 1, 0, 100, 1, 9069),
(9, '', 5, 1475075353, 1, 45, 0, 1, 0),
(10, 0x4f6b, 5, 1475075373, 1, 0, 100, 1, 9069),
(11, 0x426f6e69746f0d0a, 5, 1475075373, 1, 45, 0, 1, 0),
(12, 0x4f6b, 5, 1475075433, 1, 0, 100, 1, 9069),
(13, 0x426f6e69746f0d0a, 5, 1475075433, 1, 45, 0, 1, 0),
(14, 0x6e616461, 5, 1475795941, 1, 0, 500, 1, 9069);

-- --------------------------------------------------------

--
-- Table structure for table `tipoemergencias`
--

DROP TABLE IF EXISTS `tipoemergencias`;
CREATE TABLE IF NOT EXISTS `tipoemergencias` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 ;

--
-- Dumping data for table `tipoemergencias`
--

INSERT INTO `tipoemergencias` (`ID`, `Tipo`) VALUES
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
-- Table structure for table `tipoevento`
--

DROP TABLE IF EXISTS `tipoevento`;
CREATE TABLE IF NOT EXISTS `tipoevento` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Preposicion` varchar(100) NOT NULL DEFAULT '',
  `Tipo` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 ;

--
-- Dumping data for table `tipoevento`
--

INSERT INTO `tipoevento` (`ID`, `Preposicion`, `Tipo`) VALUES
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
-- Table structure for table `trenes`
--

DROP TABLE IF EXISTS `trenes`;
CREATE TABLE IF NOT EXISTS `trenes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Itinerario` int(11) NOT NULL DEFAULT '0',
  `Fecha` bigint(20) NOT NULL DEFAULT '0',
  `Chapa` int(11) NOT NULL DEFAULT '0',
  `Guarda` int(11) NOT NULL DEFAULT '0',
  `Ayudante` int(11) NOT NULL DEFAULT '0',
  `Conductor` int(11) NOT NULL DEFAULT '0',
  `Locomotora` int(11) NOT NULL DEFAULT '0',
  `Estado` int(11) NOT NULL DEFAULT '0',
  `EstadoAnterior` int(11) NOT NULL DEFAULT '0',
  `Numero` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=11 ;

--
-- Dumping data for table `trenes`
--

INSERT INTO `trenes` (`ID`, `Itinerario`, `Fecha`, `Chapa`, `Guarda`, `Ayudante`, `Conductor`, `Locomotora`, `Estado`, `EstadoAnterior`, `Numero`) VALUES
(1, 1, 1475056800, 45, 2, 7, 3, 9069, 3, 1, 303),
(2, 1, 1473564300, 11, 9, 7, 8, 8447, 3, 0, 300),
(3, 0, 1474053600, 45, 9, 7, 3, 9069, 0, 0, 303),
(4, 0, 1474053600, 45, 9, 7, 8, 9069, 0, 0, 303),
(5, 0, 1474053600, 45, 9, 7, 8, 9069, 0, 0, 303),
(6, 0, 1474052940, 45, 9, 7, 8, 9069, 0, 0, 303),
(7, 1, 1474053600, 45, 9, 7, 8, 9069, 2, 0, 303),
(8, 1, 1474055400, 45, 2, 4, 3, 9069, 3, 0, 305),
(9, 1, 1475166600, 13, 9, 7, 3, 9096, -1, 2, 309),
(10, 1, 1475770500, 12, 2, 7, 8, 9069, 7, 2, 507);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Password` varchar(100) NOT NULL DEFAULT '',
  `Usuario` varchar(100) NOT NULL DEFAULT '',
  `Nivel` int(11) NOT NULL DEFAULT '0',
  `RolGuarda` tinyint(1) NOT NULL DEFAULT '0',
  `RolDios` tinyint(1) NOT NULL DEFAULT '0',
  `RolSupervisor` tinyint(1) NOT NULL DEFAULT '0',
  `RolMecanico` tinyint(1) NOT NULL DEFAULT '0',
  `Funcion` int(11) NOT NULL DEFAULT '0',
  `Nombre` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 ;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Password`, `Usuario`, `Nivel`, `RolGuarda`, `RolDios`, `RolSupervisor`, `RolMecanico`, `Funcion`, `Nombre`) VALUES
(1, 'e24fa5f1901c2c38540e9adef2e3b0a1', 'themistocles', 1, 1, 1, 1, 1, 0, 'Ricardo Barreiro'),
(2, '54e8a1106eeb36711ecb8c94598bcc70', 'juanperez', 0, 1, 0, 0, 0, 1, 'Juan Pérez'),
(3, '013d3a82435fe0809d1e6396b3e4f69c', 'franciscosavio', 0, 1, 0, 0, 0, 2, 'Francisco Savio'),
(4, '1d7a2cf22fb3fc2fd245ab070478b3f7', 'marcelosoto', 0, 1, 0, 0, 0, 3, 'Marcelo Soto'),
(5, 'cfac7d176dc9e1bc857d91c1a140056d', 'emmetbrown', 0, 0, 0, 0, 1, 0, 'Emmet Brown'),
(6, '154ce8c1bd53ea5afa066f92b3c60683', 'lich', 0, 0, 0, 1, 0, 0, 'Lisandro Iturralde'),
(7, '067391c21645e28c9ead2c41f5308b0c', 'leandromelluso', 0, 1, 0, 0, 0, 3, 'Leandro Melluso'),
(8, 'afa27acf2e8fc7161ee993c421502674', 'caseyjones', 0, 1, 0, 0, 0, 2, 'Casey Jones'),
(9, 'cd616f2f57739f3831531950d63c7d2f', 'juanmajic', 0, 1, 0, 0, 0, 1, 'Juan Majic');

CREATE UNIQUE INDEX `usuarios-Usuario` ON usuarios (Usuario);
