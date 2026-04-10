-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: portfolio_database
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `about`
--

DROP TABLE IF EXISTS `about`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(2000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about`
--

LOCK TABLES `about` WRITE;
/*!40000 ALTER TABLE `about` DISABLE KEYS */;
INSERT INTO `about` VALUES (1,'I am a passionate Full Stack Developer with strong expertise in building scalable and efficient web applications using Java, Python, React, and Spring Boot. I have hands-on experience in both frontend and backend development, along with a solid understanding of REST APIs and database management using MySQL.\r\n\r\nIn addition to web development, I have a strong foundation in Data Analytics, working with tools like Pandas, NumPy, and Matplotlib to analyze data and extract meaningful insights. I have also worked on Machine Learning projects, applying algorithms to solve real-world problems such as acupressure point detection and cancer prediction.\r\n\r\nDuring my internship at TechVritti, I contributed to a real-world e-commerce platform, handling both frontend and backend modules and ensuring smooth system integration. I enjoy solving complex problems, learning new technologies, and continuously improving my skills to build impactful solutions.','https://portfolio-production-9608.up.railway.app/uploads/1775735153280_My_photo.jpeg','Bheemesh Gouda','Software Developer','https://portfolio-production-9608.up.railway.app/uploads/1775735153298_BHEEMESH_GOUDA_CV.pdf'),(2,'I am Bheemesh Gouda, a passionate software developer with a Master’s degree in Computer Applications (MCA). I specialize in building full-stack web applications using technologies like Java, Spring Boot, Python, Flask, React, and MySQL. I have hands-on experience in developing real-world projects that integrate modern technologies including Artificial Intelligence and Machine Learning.\r\n\r\nI enjoy solving complex problems, designing scalable systems, and creating user-friendly applications. My projects reflect my ability to work across both frontend and backend, implement secure authentication systems, and build intelligent features such as recommendation systems.\r\n\r\nI am continuously learning and exploring new technologies to enhance my skills and stay updated with industry trends. My goal is to contribute to innovative projects and grow as a professional software engineer.\r\n','https://portfolio-production-9608.up.railway.app/uploads/about/1775809097533_my_photo.jpg','Bheemesh Gouda','Software Developer','https://portfolio-production-9608.up.railway.app/uploads/about/1775809097549_BHEEMESH_GOUDA_CV.pdf'),(3,'I am Bheemesh Gouda, a passionate software developer with a Master’s degree in Computer Applications (MCA). I specialize in building full-stack web applications using technologies like Java, Spring Boot, Python, Flask, React, and MySQL. I have hands-on experience in developing real-world projects that integrate modern technologies including Artificial Intelligence and Machine Learning.\r\n\r\nI enjoy solving complex problems, designing scalable systems, and creating user-friendly applications. My projects reflect my ability to work across both frontend and backend, implement secure authentication systems, and build intelligent features such as recommendation systems.\r\n\r\nI am continuously learning and exploring new technologies to enhance my skills and stay updated with industry trends. My goal is to contribute to innovative projects and grow as a professional software engineer.\r\n','https://portfolio-production-9608.up.railway.app/uploads/about/1775811060420_My_photo.jpeg','Bheemesh Gouda','Full Stack Developer','https://portfolio-production-9608.up.railway.app/uploads/about/1775811060432_BHEEMESH_GOUDA_CV.pdf'),(4,'sadfkjnascovuhboindshf','https://portfolio-production-9608.up.railway.app/uploads/about/1775815578724_My_photo.jpeg','Bheemesh Gouda','Software Dev',NULL),(5,'I’m Bheemesh Gouda, a passionate full-stack developer who enjoys building modern and scalable web applications. I specialize in technologies like Java, Spring Boot, React, Python, and MySQL, and I love turning ideas into real-world digital solutions.\r\n\r\nI have experience developing complete end-to-end applications, including backend APIs, frontend interfaces, and features like authentication, file uploads, and dynamic content management. I also have a strong interest in Artificial Intelligence and Machine Learning, and I enjoy integrating smart features into my projects.\r\n\r\nI’m always eager to learn new technologies, solve challenging problems, and continuously improve my skills. My goal is to build impactful software and grow as a professional developer.\r\n','https://portfolio-production-9608.up.railway.app/uploads/about/1775815987037_My_photo.jpeg','Bheemesh Gouda','Software Developer',NULL);
/*!40000 ALTER TABLE `about` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKcp8822350s9vtyww7xdbgeuvu` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'bheemeshgouda8@gmail.com','Bheemeshgouda','19a6405fa4edc624f3689ae97b69d655818c97f7c9c23ccabaec1c2eba9b7c51','8660844868');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
INSERT INTO `certificate` VALUES (6,'https://portfolio-production-9608.up.railway.app/uploads/certificates/1775822978098_udemy.jpeg','Learn Blockchain and Cryptocurrency from Beginning'),(8,'https://portfolio-production-9608.up.railway.app/uploads/certificates/1775823445557_TapAcademy.png','Full Stack Web Development  - TapAcademy'),(9,'https://portfolio-production-9608.up.railway.app/uploads/certificates/1775823499099_Udemy_web.png','Full Stack developer course for Web Applications: Bootcamp   -  Udemy'),(10,'https://portfolio-production-9608.up.railway.app/uploads/certificates/1775823571302_MOOC.png','Introduction to Machine Learning  -  MOOC');
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_read` bit(1) NOT NULL,
  `message` varchar(5000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'2026-04-10 16:19:14.996432','chidanand@gmail.com',_binary '','Hi i\'m Chidanand Khot i want to collaborate with you','Chidhu');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(2000) DEFAULT NULL,
  `github_link` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Developed a web-based Placement Management System to automate campus recruitment processes, featuring student registration, job application tracking, admin management, and eligibility filtering using Spring Boot/Flask and MySQL.','https://github.com/Bheemeshgouda/Placement-Management-System','https://portfolio-production-9608.up.railway.app/uploads/1775745571250_indeximg1.jpg','Placement-Management-System',NULL),(2,'A web-based application that streamlines the campus recruitment process by connecting students, administrators, and recruiters on a single platform. It allows students to create profiles and apply for jobs, while admins manage data and recruiters post openings and shortlist candidates. The system improves efficiency, reduces manual work, and ensures smooth communication.','https://github.com/Bheemeshgouda/Placement-Management-System','https://portfolio-production-9608.up.railway.app/uploads/1775762228202_indeximg1.jpg','Placement Management System',NULL),(3,'A web-based application that streamlines the campus recruitment process by connecting students, administrators, and recruiters on a single platform. It allows students to create profiles and apply for jobs, while admins manage data and recruiters post openings and shortlist candidates. The system improves efficiency, reduces manual work, and ensures smooth communication.','https://github.com/Bheemeshgouda/Placement-Management-System','https://portfolio-production-9608.up.railway.app/uploads/1775763183043_6774100.png','Placement Management System','https://portfolio-production-9608.up.railway.app/uploads/1775763183060_DGED0056.MP4');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(2000) DEFAULT NULL,
  `github_link` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (6,'Placement Management System is a web-based application designed to manage and streamline the campus recruitment process. It allows students to register, upload resumes, and apply for jobs, while administrators can manage company details, job postings, and student data. The system helps in organizing placement activities efficiently, reducing manual work, and improving communication between students, colleges, and recruiters.','https://github.com/Bheemeshgouda/Placement-Management-System','https://portfolio-production-9608.up.railway.app/uploads/1775824137524_Placement.jpg','Placement-Management-System',NULL),(7,'Prompt to Sketch Generation is a system that converts textual descriptions into visual sketches using AI techniques. Users provide a prompt (text input), and the system generates a corresponding sketch by understanding shapes, objects, and context. It is useful in design, art creation, and rapid prototyping, helping users visualize ideas quickly without manual drawing.','https://github.com/Bheemeshgouda/Prompt-to-sketch-generation','https://portfolio-production-9608.up.railway.app/uploads/1775824353473_imagepromptorg.jpg','Prompt to Sketch Generation',NULL),(8,'AI Chatbot is an intelligent system that simulates human conversation using Artificial Intelligence and Natural Language Processing (NLP). It interacts with users, understands their queries, and provides automated responses in real time. The chatbot is widely used for customer support, information retrieval, and task automation, helping reduce human effort and improve efficiency.','https://github.com/Bheemeshgouda/Prompt-to-sketch-generation','https://portfolio-production-9608.up.railway.app/uploads/1775824471619_ai-chatbot-powerpoint-presentation.png','AI Chatbot-Powerpoint Presentation',NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'https://portfolio-production-9608.up.railway.app/uploads/1775760827512_Java.png','Java'),(2,'https://portfolio-production-9608.up.railway.app/uploads/1775761114585_HTML.png','HTML'),(3,'https://portfolio-production-9608.up.railway.app/uploads/1775761128907_css.png','CSS'),(4,'https://portfolio-production-9608.up.railway.app/uploads/1775761144870_JS.png','JavaScript'),(5,'https://portfolio-production-9608.up.railway.app/uploads/1775761158085_PHP.jpg','PHP'),(6,'https://portfolio-production-9608.up.railway.app/uploads/1775761172612_sql.png','MySQL'),(7,'https://portfolio-production-9608.up.railway.app/uploads/1775761185961_Spring_Boot.png','SpringBoot'),(8,'https://portfolio-production-9608.up.railway.app/uploads/1775761214315_Python.png','Python'),(9,'https://portfolio-production-9608.up.railway.app/uploads/1775761318693_Pandas.jpg','Pandas'),(10,'https://portfolio-production-9608.up.railway.app/uploads/1775761343842_Matplotlib.png','Matplotlib'),(11,'https://portfolio-production-9608.up.railway.app/uploads/1775761441338_Flask.png','Flask'),(12,'https://portfolio-production-9608.up.railway.app/uploads/1775761477743_React.png','ReactJS');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (2,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775803870970_Java.png','JAVA'),(3,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775803891938_Python.png','Python'),(4,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775803907060_HTML.png','HTML'),(5,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775803932410_JS.png','JavaScript'),(6,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775803953999_React.png','ReactJS'),(7,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775803986418_css.png','CSS'),(8,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775804003985_PHP.jpg','PHP'),(9,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775804056158_Spring_Boot.png','SpringBoot'),(10,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775804080044_Flask.png','Flask'),(11,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775804105845_sql.png','MySQL'),(12,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775804122632_Pandas.jpg','Pandas'),(13,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775804137056_Numpy.png','Numpy'),(14,'https://portfolio-production-9608.up.railway.app/uploads/skills/1775804159921_Matplotlib.png','MatPlotlib');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-10 18:50:50

