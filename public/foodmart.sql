-- MySQL dump 10.13  Distrib 5.5.8, for osx10.6 (i386)
--
-- Host: localhost    Database: foodmart
-- ------------------------------------------------------
-- Server version	5.5.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sales_fact_1997`
--

DROP TABLE IF EXISTS `sales_fact_1997`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_fact_1997` (
  `product_id` int(11) NOT NULL,
  `time_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `promotion_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `store_sales` decimal(10,4) NOT NULL,
  `store_cost` decimal(10,4) NOT NULL,
  `unit_sales` decimal(10,4) NOT NULL,
  KEY `i_sls_97_cust_id` (`customer_id`),
  KEY `i_sls_97_prod_id` (`product_id`),
  KEY `i_sls_97_promo_id` (`promotion_id`),
  KEY `i_sls_97_store_id` (`store_id`),
  KEY `i_sls_97_time_id` (`time_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_fact_1997`
--