-- create USERS table
CREATE TABLE users ( 
	id 			SERIAL 		PRIMARY KEY,
	first_name 	VARCHAR(50) NOT NULL,
	last_name 	VARCHAR(50) NOT NULL,
	email 		VARCHAR(50) UNIQUE NOT NULL,
	username 	VARCHAR(20) UNIQUE NOT NULL,
	password 	VARCHAR 	NOT NULL,
	is_admin 	BOOLEAN 	NOT NULL DEFAULT false,
	status 		INTEGER 	NOT NULL DEFAULT 0
);

-- create QUINIELAS table
CREATE TABLE quinielas ( 
	id 			SERIAL 		PRIMARY KEY,
	created_at 	DATE 		NOT NULL DEFAULT CURRENT_DATE,
	ended_at 	DATE 		DEFAULT NULL,
	user_id 	INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	status 		INTEGER 	NOT NULL DEFAULT 0
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


-- tables about games for each phase
-- create MATCHES_PHASE_1 table
CREATE TABLE matches_phase_1 ( 
	id			SERIAL		PRIMARY KEY,
	match_date	DATE 		NOT NULL,
	match_time 	TIME		NOT NULL,
	stadium_id 	INTEGER 	NOT NULL REFERENCES stadiums ( id ) ON DELETE CASCADE,
	city_id 	INTEGER 	NOT NULL REFERENCES cities ( id ) ON DELETE CASCADE,
	match_group	VARCHAR(1)  NOT NULL,
	team_a_id	INTEGER 	NOT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	team_b_id	INTEGER 	NOT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	match_result VARCHAR(5) DEFAULT NULL,
	match_status INTEGER 	NOT NULL DEFAULT 0,
	api_id		INTEGER 	NOT NULL
);
-- create MATCHES_PHASE_2 table
CREATE SEQUENCE sec_matches_phase_2 START WITH 49;
CREATE TABLE matches_phase_2 ( 
	id			INTEGER		PRIMARY KEY	DEFAULT NEXTVAL('sec_matches_phase_2'),
	match_date 	DATE 		NOT NULL,
	match_time	TIME		NOT NULL,
	stadium_id	INTEGER 	NOT NULL REFERENCES stadiums ( id ) ON DELETE CASCADE,
	city_id 	INTEGER 	NOT NULL REFERENCES cities ( id ) ON DELETE CASCADE,
	match_phase VARCHAR(3)  NOT NULL,
	team_a_classified    	VARCHAR(25),
	team_a_id	INTEGER 	REFERENCES teams ( id ) ON DELETE CASCADE,
	team_a_result INTEGER 	DEFAULT NULL,
	team_b_classified    	VARCHAR(25),
	team_b_id	INTEGER 	REFERENCES teams ( id ) ON DELETE CASCADE,
	team_b_result INTEGER 	DEFAULT NULL,
	match_result VARCHAR(5) DEFAULT NULL,
	match_status INTEGER 	NOT NULL DEFAULT 0,
	api_id		INTEGER 	DEFAULT NULL
);


-- tables for matches associated to users quinielas
-- create QUINIELAS_PHASE_1 matches table
CREATE TABLE quinielas_phase_1 ( 
	id          SERIAL 		PRIMARY KEY,
	quiniela_id INTEGER 	NOT NULL REFERENCES quinielas ( id ) ON DELETE CASCADE,
	user_id     INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	match_id    INTEGER 	NOT NULL REFERENCES matches_phase_1 ( id ) ON DELETE CASCADE,
	team_a_result INTEGER 	DEFAULT NULL,
	team_b_result INTEGER 	DEFAULT NULL
);

-- create QUINIELAS_PHASE_2 matches table
CREATE TABLE quinielas_phase_2 ( 
	id          SERIAL 		PRIMARY KEY,
	quiniela_id INTEGER 	NOT NULL REFERENCES quinielas ( id ) ON DELETE CASCADE,
	user_id     INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	match_id    INTEGER 	NOT NULL REFERENCES matches_phase_2 ( id ) ON DELETE CASCADE,
	team_a      INTEGER 	DEFAULT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	team_a_result INTEGER 	DEFAULT NULL,
	team_b      INTEGER 	DEFAULT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	team_b_result INTEGER 	DEFAULT NULL
);