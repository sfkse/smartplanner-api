CREATE TABLE `smartplanner`.`classes` (
  `idclasses` VARCHAR(50) NOT NULL,
  `active` INT NOT NULL DEFAULT 1,
  `name` VARCHAR(200) NOT NULL,
  `created` INT UNSIGNED NOT NULL,
  `updated` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idclasses`));

CREATE TABLE `smartplanner`.`users` (
  `idusers` VARCHAR(45) NOT NULL,
  `active` INT NOT NULL DEFAULT 1,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NULL,
  `email` VARCHAR(200) NULL,
  `password` VARCHAR(200) NULL,
  `profession` VARCHAR(45) NULL,
  `usertype` INT NOT NULL DEFAULT 1,
  `created` INT UNSIGNED NOT NULL,
  `updated` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idusers`));

CREATE TABLE `smartplanner`.`lessons` (
  `idlessons` VARCHAR(45) NOT NULL,
  `active` INT NOT NULL DEFAULT 1,
  `name` VARCHAR(45) NOT NULL,
  `created` INT UNSIGNED NOT NULL,
  `updated` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idlessons`));

ALTER TABLE smartplanner.classes DROP FOREIGN KEY classes_customers_FK;
ALTER TABLE smartplanner.classes DROP COLUMN idcustomers;
ALTER TABLE smartplanner.classes ADD idcustomers varchar(45) NOT NULL;
ALTER TABLE smartplanner.classes ADD CONSTRAINT classes_customers_FK FOREIGN KEY (idcustomers) REFERENCES smartplanner.customers(idcustomers);
