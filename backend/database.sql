 -- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 26 Octobre 2017 à 13:53
-- Version du serveur :  5.7.19-0ubuntu0.16.04.1
-- Version de PHP :  7.0.22-0ubuntu0.16.04.1
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de données :  `simple-mvc`
--
-- --------------------------------------------------------
CREATE TABLE `adm` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `temporaryPassword` varchar(255),
  `question` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `preorder` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `lastname` varchar(80) NOT NULL,
  `firstname` varchar(80) NOT NULL,
  `email` varchar(255) NOT NULL,
  `checkboxStatus` boolean NULL DEFAULT 0,
  `archived` boolean NULL DEFAULT 0,
  `dates` varchar(255) NOT NULL,
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- datetime default now fait un timestamp et inject automatiquement une date quand une donnée est créée
-- on ne specifie pas dans la query les champs id,checkboxStatus et date car id est auto incrémenté, checkbox par défaut est 0 et date est remplis avec l'explication au dessus

CREATE TABLE `pictures` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `file` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `pictogram` varchar(255) NULL,
  `text_id` int NULL,
  `categories` enum(
    "carousel",
    "home",
    "methode",
    "propos",
    "contact"
  ),
  `picSection` int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `text` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NULL,
  `body` mediumtext NULL,
  `page` enum(
    "home",
    "methode",
    "propos",
    "contact"
  ) NOT NULL,
  `textSection` int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- ce cas précis des valeurs doivent être passées en null car si l'insert exige des champs en not null, nous sommes obligé de les renseigner pour pouvoir insérer nos valeurs 
INSERT INTO
  `text`(`title`, `body`, `page`, `textSection`)
VALUES
  (
    'Acceuil 1',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam nulla. Praesent volutpat hendrerit dictum.
    Sed vel dignissim nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam et nulla eu neque pretium sodales ut et metus. Donec a magna sit amet 
    dui congue luctus vel quis lacus. In luctus at arcu eget dapibus. Nam vehicula suscipit metus, nec mollis justo fringilla at. Nunc eu blandit sem. Proin mollis, purus id sollicitudin varius, odio',
    'home',
    1
  ),
  (
    'Acceuil 2',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam nulla. Praesent volutpat hendrerit dictum.',
    'home',
    2
  ),
  -- text pour la page a propos
  (
    'Membre 1',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam nulla. Praesent volutpat hendrerit dictum.psum dolor sit amet, consectetur adipiscing elit. Sed vitae diam nulla. Praesent volutpat hendrerit dictum.
    Sed vel dignissim nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam et nulla eu neque pretium sodales ut et metus. Donec a magna sit amet 
    dui congue luctus vel quis lacus. In luctus at arcu eget',
    'propos',
    1
  ),
  ('Membre 2', '', 'propos', 2),
  -- exemple insertion d'un membre d'équipe à supprimer plus tard
  ('Membre 3', '', 'propos', 3),
  (
    'Membre 4',
    '',
    'propos',
    2
  ),
  -- text pour la page methode
  (
    'Pratique 1',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam nulla. Praesent volutpat 
    hendrerit dictum. Sed vel dignissim nibh. Orci varius natoque penatibus et magnis dis parturient montes,
     nascetur ridiculus mus. Etiam et nulla eu neque pretium sodales ut et metus. Donec a magna sit amet dui congue ',
    'methode',
    1
  ),
  (
    'Pratique 2',
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam nulla. Praesent volutpat hendrerit dictum.
     Sed vel dignissim nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
    Etiam et nulla eu neque pretium sodales ut et metus. Donec a magna sit amet dui congue ",
    'methode',
    2
  ),
  (
    'Pratique 3',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam nulla. Praesent volutpat hendrerit dictum. 
    Sed vel dignissim nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
    Etiam et nulla eu neque pretium sodales ut et metus. Donec a magna sit amet dui congue ',
    'methode',
    3
  ),
  (
    'Pratique 4',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam nulla. 
    Praesent volutpat hendrerit dictum. Sed vel dignissim nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
    Etiam et nulla eu neque pretium sodales ut et metus. Donec a magna sit amet dui congue ',
    'methode',
    4),
  ('Membre 5', '', 'propos', 4),
  ('Membre 6', '', 'propos', 5),
  ('Membre 7', '', 'propos', 6),
  ('Membre 8', '', 'propos', 7),
  ('Membre 9', '', 'propos', 8)
  ;
