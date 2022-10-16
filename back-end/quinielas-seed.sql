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