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
VALUES (2,'POPCORN','Hot Butter' ,'Popcorn (single)',  'B5 A5 B5 Gb5 D5 Gb5 B4 B5 A5 B5 Gb5 D5 Gb5 B4 B5 Db6 D6 Db6 D6 B5 Db6 B5 Db6 A5 B5 G5 B5 A5 B5');

INSERT INTO songs (id, song_title, song_artist, song_album, notes)
VALUES (3,'Megalovania', 'Toby Fox' ,'Undertale Soundtrack', 'D4 D4 D5 A4 G#4 G4 F4 D4 F4 G4 C4 C4 D5 A4 G#4 G4 F4 D4 F4 G4 B3 B3 D5 A4 G#4 G4 F4 D4 F4 G4 A#3 A#3 D5 A4 G#4 G4 F4 D4 F4 G4');

INSERT INTO songs (id, song_title, song_artist, song_album, notes)
VALUES (4,'Song of Storms','Koji Kondo' ,'Ocarina of Time Soundtrack', 'Gb5 B4 Db5 Gb5 B4 Db5 Gb5 D5 Gb5 Db5 Gb5 D5 B4 Gb5 Db5 Gb5 B4 Gb5 Db5 Gb5 D5 Gb5 Db5 Gb5 B4 Db5 Gb5 B4 Db5 A4 B4 Gb5');

INSERT INTO songs (id, song_title, song_artist, song_album, notes)
VALUES (5,'A Simple Diversion','Toby Fox' ,'Deltarune Ch. 2 Soundtrack', 'C#5 C5 C#5 E5 C#5 C5 C#5 G#5 A5 G#5 F#5 E5 F#5 G#5 A5 G#5');

INSERT INTO songs (id, song_title, song_artist, song_album, notes)
VALUES (6,'Lancer','Toby Fox' ,'Deltarune Ch. 1 Soundtrack', 'C#4 e4 g4 G#4 C#4 e4 g4 G#4 C#5 G#4 C#5 G#4 E4 G4 A#3 C#4 E4 F#4 A#3 C#4 E4 F#4 e4 c4 D#4 c4 g#3 C#4');