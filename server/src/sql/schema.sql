CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	song_artist text NOT NULL,
	song_album text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, song_artist, song_album, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)','ludwig van beethoven' ,'CSC600 Demo' , 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, song_artist, song_album, notes)
VALUES (2,"POPCORN",'Hot Butter' ,'Popcorn (single)',  "B5 A5 B5 Gb5 D5 Gb5 B4 B5 A5 B5 Gb5 D5 Gb5 B4 B5 Db6 D6 Db6 D6 B5 Db6 B5 Db6 A5 B5 G5 B5 A5 B5");

INSERT INTO songs (id, song_title, song_artist, song_album, notes)
VALUES (3,"Megalovania", 'Toby Fox' ,'Undertale Soundtrack', "D4 D4 D5 A4 G4 F4 D4 F4 G4 E4 E4 D5 A4 G4 F4 D4 F4 G4 D4 D4 D5 A4 G4 F4 D4 F4 G4 E4 E4 D5 A4 G4 F4 D4 F4 G4");

INSERT INTO songs (id, song_title, song_artist, song_album, notes)
VALUES (4,"Song of Storms",'Koji Kondo' ,'Ocarina of Time Soundtrack', "Gb5 B4 Db5 Gb5 B4 Db5 Gb5 D5 Gb5 Db5 Gb5 D5 B4 Gb5 Db5 Gb5 B4 Gb5 Db5 Gb5 D5 Gb5 Db5 Gb5 B4 Db5 Gb5 B4 Db5 A4 B4 Gb5");