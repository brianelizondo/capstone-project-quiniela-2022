CREATE TABLE users ( 
	id SERIAL NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT false,
	status INTEGER NOT NULL DEFAULT 1,
	
    CONSTRAINT pk_users PRIMARY KEY ( id ),
	CONSTRAINT unq_users UNIQUE ( email ),
	CONSTRAINT unq_users_0 UNIQUE ( username )
);