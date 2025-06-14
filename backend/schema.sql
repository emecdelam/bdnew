-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: bookdb
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bd`
--

DROP TABLE IF EXISTS `bd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bd` (
  `bid` varchar(255) NOT NULL,
  `cote` varchar(255) NOT NULL,
  `titreserie` varchar(255) DEFAULT NULL,
  `titrealbum` varchar(255) DEFAULT NULL,
  `numtome` varchar(20) DEFAULT NULL,
  `scenariste` varchar(255) NOT NULL,
  `dessinateur` varchar(255) NOT NULL,
  `collection` varchar(255) DEFAULT NULL,
  `editeur` varchar(255) DEFAULT NULL,
  `genre` varchar(200) DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `titre_norm` varchar(255) DEFAULT NULL,
  `serie_norm` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bid`),
  UNIQUE KEY `cote` (`cote`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bdpass`
--

DROP TABLE IF EXISTS `bdpass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bdpass` (
  `mid` int NOT NULL,
  `nblocations` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`mid`),
  CONSTRAINT `bdpass_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `membres` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `bid` varchar(255) NOT NULL,
  `mid` int NOT NULL,
  `date` date NOT NULL DEFAULT '0000-00-00',
  `paye` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'true si payé, false sinon',
  `mail_rappel_1_envoye` tinyint(1) NOT NULL DEFAULT '0',
  `mail_rappel_2_envoye` tinyint(1) NOT NULL DEFAULT '0',
  `debut` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`bid`,`date`) USING BTREE,
  KEY `mid` (`mid`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `bd` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `locations_ibfk_2` FOREIGN KEY (`mid`) REFERENCES `membres` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `membres`
--

DROP TABLE IF EXISTS `membres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membres` (
  `mid` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `gsm` varchar(15) NOT NULL,
  `rue` varchar(255) NOT NULL,
  `numero` int NOT NULL,
  `boite` varchar(10) DEFAULT NULL,
  `codepostal` int NOT NULL,
  `ville` varchar(255) NOT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `caution` int NOT NULL,
  `remarque` longtext,
  `bdpass` varchar(10) NOT NULL DEFAULT '0',
  `abonnement` date DEFAULT NULL,
  `vip` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`mid`),
  UNIQUE KEY `nom` (`nom`,`prenom`)
) ENGINE=InnoDB AUTO_INCREMENT=371 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-14  2:42:16
