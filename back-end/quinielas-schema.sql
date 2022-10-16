CREATE TABLE users ( 
	id 			SERIAL 		PRIMARY KEY,
	first_name 	VARCHAR(50) NOT NULL,
	last_name 	VARCHAR(50) NOT NULL,
	email 		VARCHAR(50) UNIQUE NOT NULL,
	username 	VARCHAR(20) UNIQUE NOT NULL,
	password 	VARCHAR 	NOT NULL,
	is_admin 	BOOLEAN 	NOT NULL DEFAULT false,
	status 		INTEGER 	NOT NULL DEFAULT 1
);

CREATE TABLE quinielas ( 
	id 			SERIAL 		PRIMARY KEY,
	created_at 	DATE 		NOT NULL DEFAULT CURRENT_DATE,
	ended_at 	DATE 		DEFAULT NULL,
	user_id 	INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	status 		INTEGER 	DEFAULT 0 NOT NULL
 );

-- create USERS table
CREATE TABLE users ( 
	id 			SERIAL 		PRIMARY KEY,
	first_name 	VARCHAR(50) NOT NULL,
	last_name 	VARCHAR(50) NOT NULL,
	email 		VARCHAR(50) UNIQUE NOT NULL,
	username 	VARCHAR(20) UNIQUE NOT NULL,
	password 	VARCHAR 	NOT NULL,
	is_admin 	BOOLEAN 	NOT NULL DEFAULT false,
	status 		INTEGER 	NOT NULL DEFAULT 1
);

-- create QUINIELAS table
CREATE TABLE quinielas ( 
	id 			SERIAL 		PRIMARY KEY,
	created_at 	DATE 		NOT NULL DEFAULT CURRENT_DATE,
	ended_at 	DATE 		DEFAULT NULL,
	user_id 	INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	status 		INTEGER 	DEFAULT 0 NOT NULL
 );


-- basic and independent tables
-- create CITIES table
CREATE TABLE cities ( 
	id			SERIAL		PRIMARY KEY,
	city		VARCHAR(50) NOT NULL
 );

-- create STADIUMS table
CREATE TABLE stadiums ( 
	id			SERIAL		PRIMARY KEY,
	name		VARCHAR(50)	NOT NULL,
	city_id		INTEGER NOT NULL REFERENCES cities ( id ) ON DELETE CASCADE
 );

 -- create TEAMS table
 CREATE TABLE teams ( 
	id			SERIAL		PRIMARY KEY,
	name		VARCHAR(50) NOT NULL,
	short_name	VARCHAR(3) 	UNIQUE NOT NULL,
	api_id		INTEGER 	UNIQUE NOT NULL
 );