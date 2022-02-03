create database movies_checkpoint;
use movies_checkpoint;

DROP TABLE IF EXISTS user;
CREATE TABLE user(
 `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `hashedPassword` varchar(100) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT "user"
);

DROP TABLE IF EXISTS new_movies;
CREATE TABLE new_movies(
`id`INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(40) NOT NULL,
`review` TEXT NULL,
`score` INT NOT NULL,
`user_id` INT NOT NULL,
FOREIGN KEY(`user_id`) REFERENCES user(id) 
);




