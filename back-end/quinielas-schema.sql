-- create USERS table
CREATE TABLE users ( 
	id 			SERIAL 		PRIMARY KEY,
	first_name 	VARCHAR(50) NOT NULL,
	last_name 	VARCHAR(50) NOT NULL,
	email 		VARCHAR(50) UNIQUE NOT NULL CHECK (position('@' IN email) > 1),
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
	team_a_result INTEGER 	DEFAULT NULL CHECK (team_a_result >= 0),
	team_b_id	INTEGER 	NOT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	team_b_result INTEGER 	DEFAULT NULL CHECK (team_b_result >= 0),
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
	team_a_result INTEGER 	DEFAULT NULL CHECK (team_a_result >= 0),
	team_b_classified    	VARCHAR(25),
	team_b_id	INTEGER 	REFERENCES teams ( id ) ON DELETE CASCADE,
	team_b_result INTEGER 	DEFAULT NULL CHECK (team_b_result >= 0),
	match_status INTEGER 	NOT NULL DEFAULT 0,
	api_id		INTEGER 	DEFAULT NULL
);
-- table to handle groups/team points
-- create GROUPS_STANDINGS table
CREATE TABLE groups_standings ( 
	"group"		VARCHAR(1)  NOT NULL,
	team_id		INTEGER 	UNIQUE NOT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	games_played INTEGER 	NOT NULL DEFAULT 0 CHECK (games_played >= 0),
	games_won   INTEGER 	NOT NULL DEFAULT 0 CHECK (games_won >= 0),
	games_draws INTEGER 	NOT NULL DEFAULT 0 CHECK (games_draws >= 0),
	games_lost  INTEGER 	NOT NULL DEFAULT 0 CHECK (games_lost >= 0),
	goals_for   INTEGER 	NOT NULL DEFAULT 0 CHECK (goals_for >= 0),
	goals_against INTEGER 	NOT NULL DEFAULT 0 CHECK (goals_against >= 0),
	goals_diff  INTEGER 	NOT NULL DEFAULT 0,
	points      INTEGER 	NOT NULL DEFAULT 0 CHECK (points >= 0)
);


-- tables for matches associated to users quinielas
-- create QUINIELAS_PHASE_1 matches table
CREATE TABLE quinielas_phase_1 ( 
	id          SERIAL 		PRIMARY KEY,
	quiniela_id INTEGER 	NOT NULL REFERENCES quinielas ( id ) ON DELETE CASCADE,
	user_id     INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	match_id    INTEGER 	NOT NULL REFERENCES matches_phase_1 ( id ) ON DELETE CASCADE,
	team_a_result INTEGER 	DEFAULT NULL CHECK (team_a_result >= 0),
	team_b_result INTEGER 	DEFAULT NULL CHECK (team_b_result >= 0),
	points		INTEGER		NOT NULL DEFAULT 0
);

-- create QUINIELAS_PHASE_2 matches table
CREATE TABLE quinielas_phase_2 ( 
	id          SERIAL 		PRIMARY KEY,
	quiniela_id INTEGER 	NOT NULL REFERENCES quinielas ( id ) ON DELETE CASCADE,
	user_id     INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	match_id    INTEGER 	NOT NULL REFERENCES matches_phase_2 ( id ) ON DELETE CASCADE,
	team_a      INTEGER 	DEFAULT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	team_a_result INTEGER 	DEFAULT NULL CHECK (team_a_result >= 0),
	team_b      INTEGER 	DEFAULT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	team_b_result INTEGER 	DEFAULT NULL CHECK (team_b_result >= 0),
	points		INTEGER		NOT NULL DEFAULT 0
);


-- table to handle quiniela points
-- create QUINIELAS_POINTS table 
CREATE TABLE quinielas_points ( 
	quiniela_id INTEGER 	NOT NULL REFERENCES quinielas ( id ) ON DELETE CASCADE,
	user_id 	INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	champion_team_id 		INTEGER 	DEFAULT NULL REFERENCES teams ( id ) ON DELETE CASCADE,
	points 		INTEGER 	NOT NULL DEFAULT 0 CHECK (points >= 0),
	status		INTEGER 	NOT NULL DEFAULT 0
);


-- table to handle quiniela payments
-- create PAYMENTS table
CREATE TABLE payment ( 
	user_id		INTEGER 	NOT NULL REFERENCES users ( id ) ON DELETE CASCADE,
	quiniela_id INTEGER 	NOT NULL REFERENCES quinielas ( id ) ON DELETE CASCADE,
	payment_date DATE 		NOT NULL DEFAULT CURRENT_DATE,
	amout 		MONEY 		NOT NULL DEFAULT 0,
	status		INTEGER 	NOT NULL DEFAULT 0 
);