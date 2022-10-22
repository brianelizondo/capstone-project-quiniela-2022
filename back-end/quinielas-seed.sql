-- Insert test users in table USERS
INSERT INTO users
	(first_name, 
    last_name, 
    email, 
    username, 
    password) 
VALUES 
    ('regular', 'user', 'regular@mail.com', 'regularuser', '$2b$12$KCCMfnTiOCaVcBw.7KLgq.WBd/Kxt.I6jbYjE3w0ZLTK1LbvqcVa2'),
    ('admin', 'user', 'admin@mail.com', 'adminuser', '$2b$12$KCCMfnTiOCaVcBw.7KLgq.WBd/Kxt.I6jbYjE3w0ZLTK1LbvqcVa2');


-- Seed basic and independent tables with info
INSERT INTO cities 
    (city) 
VALUES 
    ('Al Khor'),
    ('Al Rayyan'),
    ('Al Wakrah'),
    ('Doha'),
    ('Lusail');

INSERT INTO stadiums 
    (name, city_id) 
VALUES 
    ('Al Bayt Stadium', 1),
    ('Education City Stadium', 2),
    ('Khalifa International Stadium', 2),
    ('Ahmad bin Ali Stadium', 3),
    ('Al Janoub Stadium', 3),
    ('Al Thumama Stadium', 4),
    ('Stadium 974', 4),
    ('Lusail Iconic Stadium', 5);

INSERT INTO teams 
    (name, short_name, api_id) 
VALUES 
    ('Qatar', 'QAT', 1569),
    ('Ecuador', 'ECU', 2382),
    ('Senegal', 'SEN', 13),
    ('Netherlands', 'NED', 1118),
    ('England', 'ENG', 10),
    ('Iran', 'IRN', 22),
    ('USA', 'USA', 2384),
    ('Wales', 'WAL', 767),
    ('Argentina', 'ARG', 26),
    ('Saudi Arabia', 'KSA', 23),
    ('Mexico', 'MEX', 16),
    ('Polonia', 'POL', 24),
    ('France', 'FRA', 2),
    ('Australia', 'AUS', 20),
    ('Denmark', 'DEN', 21),
    ('Tunisia', 'TUN', 28),
    ('Spain', 'ESP', 9),
    ('Costa Rica', 'CRC', 29),
    ('Germany', 'GER', 25),
    ('Japan', 'JPN', 12),
    ('Belgium', 'BEL', 1),
    ('Canada', 'CAN', 5529),
    ('Moroco', 'MAR', 31),
    ('Croatia', 'CRO', 3),
    ('Brazil', 'BRA', 6),
    ('Serbia', 'SRB', 14),
    ('Switzerland', 'SUI', 15),
    ('Cameroon', 'CMR', 1530),
    ('Portugal', 'POR', 27),
    ('Ghana', 'GHA', 1504),
    ('Uruguay', 'URU', 7),
    ('Korea Republic', 'KOR', 17);


-- Seed MATCHES_PHASE_1 and MATCHES_PHASE_2 whit basic info
INSERT INTO matches_phase_1
	(match_date, match_time, stadium_id, city_id, match_group, team_a_id, team_b_id, api_id) 
VALUES 
    ('2022-11-20', '11:00', 1, 1, 'A', 1, 2, 855736),
    ('2022-11-21', '11:00', 6, 4, 'A', 3, 4, 855734),
    ('2022-11-21', '08:00', 3, 2, 'B', 5, 6, 855735),
    ('2022-11-21', '14:00', 4, 3, 'B', 7, 8, 866681),
    ('2022-11-22', '14:00', 5, 3, 'D', 13, 14, 871850),
    ('2022-11-22', '08:00', 2, 2, 'C', 15, 16, 855738),
    ('2022-11-22', '11:00', 7, 4, 'D', 11, 12, 855739),
    ('2022-11-22', '05:00', 8, 5, 'C', 9, 10, 855737),
    ('2022-11-23', '14:00', 4, 3, 'F', 21, 22, 855742),
    ('2022-11-23', '11:00', 6, 4, 'E', 17, 18, 871851),
    ('2022-11-23', '08:00', 3, 2, 'E', 19, 20, 855741),
    ('2022-11-23', '05:00', 1, 1, 'F', 23, 24, 855740),
    ('2022-11-24', '05:00', 5, 3, 'G', 27, 28, 855743),
    ('2022-11-24', '08:00', 2, 2, 'H', 31, 32, 855744),
    ('2022-11-24', '11:00', 7, 4, 'H', 29, 30, 855745),
    ('2022-11-24', '14:00', 8, 5, 'G', 25, 26, 855746),
    ('2022-11-25', '05:00', 4, 3, 'B', 8, 6, 866682),
    ('2022-11-25', '08:00', 6, 4, 'A', 1, 3, 855747),
    ('2022-11-25', '11:00', 3, 2, 'A', 4, 2, 855748),
    ('2022-11-25', '14:00', 1, 1, 'B', 5, 7, 855749),
    ('2022-11-26', '05:00', 5, 3, 'D', 16, 14, 871852),
    ('2022-11-26', '08:00', 2, 2, 'C', 12, 10, 855750),
    ('2022-11-26', '11:00', 7, 4, 'D', 13, 15, 855751),
    ('2022-11-26', '14:00', 8, 5, 'C', 9, 11, 855752),
    ('2022-11-27', '05:00', 4, 3, 'E', 20, 18, 871853),
    ('2022-11-27', '08:00', 6, 4, 'F', 21, 23, 855753),
    ('2022-11-27', '11:00', 3, 2, 'F', 24, 22, 855754),
    ('2022-11-27', '14:00', 1, 1, 'E', 17, 19, 855755),
    ('2022-11-28', '05:00', 5, 3, 'G', 28, 26, 855756),
    ('2022-11-28', '08:00', 2, 2, 'H', 32, 30, 855757),
    ('2022-11-28', '11:00', 7, 4, 'G', 25, 27, 855758),
    ('2022-11-28', '14:00', 8, 5, 'H', 29, 31, 855759),
    ('2022-11-29', '14:00', 4, 3, 'B', 8, 5, 866683),
    ('2022-11-29', '14:00', 6, 4, 'B', 6, 7, 855762),
    ('2022-11-29', '10:00', 3, 2, 'A', 2, 3, 855761),
    ('2022-11-29', '10:00', 1, 1, 'A', 4, 1, 855760),
    ('2022-11-30', '10:00', 5, 3, 'D', 14, 15, 871854),
    ('2022-11-30', '10:00', 2, 2, 'D', 16, 13, 855763),
    ('2022-11-30', '14:00', 7, 4, 'C', 12, 9, 855764),
    ('2022-11-30', '14:00', 8, 5, 'C', 10, 11, 855765),
    ('2022-12-01', '10:00', 4, 3, 'F', 24, 21, 855766),
    ('2022-12-01', '10:00', 6, 4, 'F', 22, 23, 855767),
    ('2022-12-01', '14:00', 3, 2, 'E', 20, 17, 855768),
    ('2022-12-01', '14:00', 1, 1, 'E', 18, 19, 871855),
    ('2022-12-02', '10:00', 5, 3, 'H', 30, 31, 855770),
    ('2022-12-02', '10:00', 2, 2, 'H', 32, 29, 855769),
    ('2022-12-02', '14:00', 7, 4, 'G', 26, 27, 855772),
    ('2022-12-02', '14:00', 8, 5, 'G', 28, 25, 855771);

INSERT INTO matches_phase_2 
	(match_date, match_time, stadium_id, city_id, match_phase, team_a_classified, team_b_classified) 
VALUES 
    ('2022-12-03', '10:00', 3, 2, 'R16', '1A', '2B'),
    ('2022-12-03', '14:00', 4, 3, 'R16', '1C', '2D'),
    ('2022-12-04', '14:00', 1, 1, 'R16', '1B', '2A'),
    ('2022-12-04', '10:00', 6, 4, 'R16', '1D', '2C'),
    ('2022-12-05', '10:00', 5, 3, 'R16', '1E', '2F'),
    ('2022-12-05', '14:00', 7, 4, 'R16', '1G', '2H'),
    ('2022-12-06', '10:00', 2, 2, 'R16', '1F', '2E'),
    ('2022-12-06', '14:00', 8, 5, 'R16', '1H', '2G'),
    ('2022-12-09', '14:00', 8, 5, 'QF', 'Winner 49', 'Winner 50'),
    ('2022-12-09', '10:00', 2, 2, 'QF', 'Winner 53', 'Winner 54'),
    ('2022-12-10', '14:00', 1, 1, 'QF', 'Winner 51', 'Winner 52'),
    ('2022-12-10', '10:00', 6, 4, 'QF', 'Winner 55', 'Winner 56'),
    ('2022-12-13', '14:00', 8, 5, 'SF', 'Winner 57', 'Winner 58'),
    ('2022-12-14', '14:00', 1, 1, 'SF', 'Winner 59', 'Winner 60'),
    ('2022-12-17', '10:00', 3, 2, '3P', 'Loser 61', 'Loser 62'),
    ('2022-12-18', '10:00', 8, 5, 'F', 'Winner 61', 'Winner 62');