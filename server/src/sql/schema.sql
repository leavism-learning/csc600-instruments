CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes)
VALUES (2,"POPCORN",  "B5 A5 B5 Gb5 D5 Gb5 B4 B5 A5 B5 Gb5 D5 Gb5 B4 B5 Db6 D6 Db6 D6 B5 Db6 B5 Db6 A5 B5 G5 B5 A5 B5");

INSERT INTO songs (id, song_title, notes)
VALUES (3,"Megalovania",  "D4 D4 D5 A4 G4 F4 D4 F4 G4 E4 E4 D5 A4 G4 F4 D4 F4 G4 D4 D4 D5 A4 G4 F4 D4 F4 G4 E4 E4 D5 A4 G4 F4 D4 F4 G4");

INSERT INTO songs (id, song_title, notes)
VALUES (4,"Song of storm's", "Gb5 B4 Db5 Gb5 B4 Db5 Gb5 D5 Gb5 Db5 Gb5 D5 B4 Gb5 Db5 Gb5 B4 Gb5 Db5 Gb5 D5 Gb5 Db5 Gb5 B4 Db5 Gb5 B4 Db5 A4 B4 Gb5");