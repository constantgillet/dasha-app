-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 20 juin 2020 à 14:48
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `application_dashboard`
--

-- --------------------------------------------------------

--
-- Structure de la table `applications`
--

DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campain` int(11) NOT NULL,
  `company` varchar(255) NOT NULL,
  `logotype` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `applications`
--

INSERT INTO `applications` (`id`, `campain`, `company`, `logotype`) VALUES
(78, 44, 'Sony', 'https://logo.clearbit.com/sony.jp'),
(77, 44, 'Facebook', 'https://logo.clearbit.com/facebook.com'),
(76, 44, 'Qarnot', 'https://logo.clearbit.com/qarnot.com'),
(75, 44, 'Test', '/images/company_logo.jpg'),
(74, 44, 'Renault', 'https://logo.clearbit.com/renault.com.br'),
(73, 44, 'Heetch', 'https://logo.clearbit.com/heetch.com'),
(72, 44, 'OVH cloud', 'https://logo.clearbit.com/ovhcloud.com'),
(71, 44, 'Amazon', 'https://logo.clearbit.com/amazon.com'),
(70, 44, 'Google', 'images/frichti_logo.png'),
(69, 44, 'Facebook', 'https://logo.clearbit.com/facebook.com');

-- --------------------------------------------------------

--
-- Structure de la table `campains`
--

DROP TABLE IF EXISTS `campains`;
CREATE TABLE IF NOT EXISTS `campains` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `campains`
--

INSERT INTO `campains` (`id`, `owner`, `name`) VALUES
(3, 4, 'test'),
(4, 4, 'test'),
(5, 4, 'test 223'),
(6, 1, 'dzdqdqz'),
(7, 1, 'dzdqdqz'),
(8, 1, 'dzdqdqz'),
(9, 1, 'dzdqdqz'),
(44, 4, 'stage 2016'),
(43, 4, 'campagne stage'),
(42, 4, 'google'),
(41, 4, 'facebook'),
(40, 4, 'Stage 2grd'),
(39, 4, 'Campagne 2010'),
(38, 4, 'test de campagne'),
(37, 4, 'Stage été 2020'),
(36, 4, 'Campagne 2023'),
(35, 4, 'test de'),
(34, 4, 'Développeur 2020');

-- --------------------------------------------------------

--
-- Structure de la table `timelines`
--

DROP TABLE IF EXISTS `timelines`;
CREATE TABLE IF NOT EXISTS `timelines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `text` text DEFAULT NULL,
  `date` int(11) NOT NULL,
  `notify_date` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `timelines`
--

INSERT INTO `timelines` (`id`, `application`, `title`, `color`, `text`, `date`, `notify_date`) VALUES
(4, 69, 'Ajout de la candidature', 'info', '', 1589619241, NULL),
(2, 67, 'Ajout de la candidature', 'info', NULL, 1589556211, NULL),
(3, 68, 'Ajout de la candidature', 'info', NULL, 1589556260, NULL),
(5, 70, 'Ajout de la candidature', 'info', NULL, 1589619248, NULL),
(6, 71, 'Ajout de la candidature', 'info', NULL, 1589619260, NULL),
(7, 72, 'Ajout de la candidature', 'info', '', 1589644481, NULL),
(8, 73, 'Ajout de la candidature', 'info', 'Commentaire', 1589644701, NULL),
(21, 76, 'Ajout de la candidature', 'info', '', 1589885614, NULL),
(20, 75, 'Candidature acceptée', 'info', 'ffsqzsfsefdqz\nqzdqzdq\ndqzdq\nzqdqzqdqz', 1589791104, 1592383104),
(19, 71, 'Candidature acceptée', 'info', 'Ceci est un commentaire', 1589791076, 1592383076),
(18, 75, 'Ajout de la candidature', 'info', 'zqdzq\nqzdqzdqzzdqz', 1589787954, NULL),
(17, 74, 'Ajout de la candidature', 'info', 'Ceci est une étape de votre recrutement.', 1589787905, NULL),
(27, 77, 'Ajout de la candidature', 'info', 'test qzdqzfsfsese dqzdqfsefseffsefse fqzuqhfiuz', 1592257536, NULL),
(22, 76, 'Rufusé', 'danger', '', 1590061644, NULL),
(23, 76, 'Entretient', 'primary', 'dzqdqz\nqzdqzdqz\n,ldlzjqljqnzjdqz', 1590061893, NULL),
(24, 71, 'Entrient', 'success', 'ddjkqzbhjdqzd', 1590067286, NULL),
(25, 73, 'Entretient en attente', 'success', 'dqzdqzd', 1590067343, NULL),
(26, 72, 'Rufusé', 'danger', '', 1590067467, NULL),
(28, 71, 'Entretien', 'info', '', 1592663507, NULL),
(29, 78, 'Ajout de la candidature', 'info', '', 1592663527, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`) VALUES
(6, 'Constant Gillet', 'rider.constant@fgmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b'),
(5, 'Constant Gillet', 'test@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b'),
(4, 'Constant Gillet', 'rider.constant@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b'),
(7, 'Constant Gillet', 'rider.constant@gmail.cf', '7c4a8d09ca3762af61e59520943dc26494f8941b'),
(8, 'Constant Gillet', 'rider.consdtant@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
