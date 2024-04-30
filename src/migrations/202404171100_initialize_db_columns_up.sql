CREATE TABLE `smartplanner`.`classes` (
  `idclasses` VARCHAR(50) NOT NULL,
  `active` BOOL DEFAULT 1 NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `created` INT UNSIGNED NOT NULL,
  `updated` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idclasses`));

CREATE TABLE `smartplanner`.`users` (
  `idusers` VARCHAR(45) NOT NULL,
  `active` BOOL DEFAULT 1 NOT NULL,
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
  `active` BOOL DEFAULT 1 NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `created` INT UNSIGNED NOT NULL,
  `updated` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idlessons`));

-- After switching to new db
CREATE TABLE smartplanner.timeplans (
	idtimeplans varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	active TINYINT DEFAULT 1 NOT NULL,
	created INT UNSIGNED NOT NULL,
	updated INT UNSIGNED NOT NULL,
	CONSTRAINT timeplans_pk PRIMARY KEY (idtimeplans)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE smartplanner.classtimeplans (
	idclasstimeplans varchar(100) NOT NULL,
	idclasses varchar(100) NOT NULL,
	minutes LONG VARCHAR NOT NULL,
	idcustomers varchar(100) NOT NULL,
	idtimeplans varchar(100) NOT NULL,
  created INT UNSIGNED NOT NULL,
	updated INT UNSIGNED NOT NULL,
	CONSTRAINT classtimeplans_pk PRIMARY KEY (idclasstimeplans),
	CONSTRAINT classtimeplans_classes_FK FOREIGN KEY (idclasses) REFERENCES smartplanner.classes(idclasses),
	CONSTRAINT classtimeplans_customers_FK FOREIGN KEY (idcustomers) REFERENCES smartplanner.customers(idcustomers),
	CONSTRAINT classtimeplans_timeplans_FK FOREIGN KEY (idtimeplans) REFERENCES smartplanner.timeplans(idtimeplans)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

ALTER TABLE smartplanner.classes ADD idcustomers varchar(45) NOT NULL;
ALTER TABLE smartplanner.classes ADD CONSTRAINT classes_customers_FK FOREIGN KEY (idcustomers) REFERENCES smartplanner.customers(idcustomers);

ALTER TABLE smartplanner.lessons ADD idcustomers varchar(45) NULL;
ALTER TABLE smartplanner.lessons ADD CONSTRAINT lessons_customers_FK FOREIGN KEY (idcustomers) REFERENCES smartplanner.customers(idcustomers);

ALTER TABLE smartplanner.users ADD idcustomers varchar(45) NULL;
ALTER TABLE smartplanner.users ADD CONSTRAINT users_customers_FK FOREIGN KEY (idcustomers) REFERENCES smartplanner.customers(idcustomers);

ALTER TABLE smartplanner.timeplans ADD idcustomers varchar(100) NOT NULL;
ALTER TABLE smartplanner.timeplans ADD CONSTRAINT timeplans_customers_FK FOREIGN KEY (idcustomers) REFERENCES smartplanner.customers(idcustomers);

ALTER TABLE smartplanner.classtimeplans MODIFY COLUMN minutes mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;


