-- Languages
INSERT INTO Languages (code, name) VALUES
  ('EN', 'English'),
  ('ES', 'Spanish'),
  ('JP', 'Japanese');

-- Variant Types
INSERT INTO VariantTypes (name) VALUES
  ('Legend'), ('Dark'), ('Light'),
  ('EX'), ('GX'), ('V'), ('VMAX');

-- Card Types
INSERT INTO CardTypes (name) VALUES
  ('Pokemon'), ('Trainer'), ('Energy');

-- Locations
INSERT INTO Locations (name) VALUES
  ('Binder'), ('CardDex'), ('BTB');

-- Trainer Subtypes
INSERT INTO TrainerSubtypes (name) VALUES
  ('Item'), ('Stadium'), ('Supporter'), ('Tool');

-- Energy Subtypes
INSERT INTO EnergySubtypes (name) VALUES
  ('Aurora'), ('Colorless'), ('Dark'), ('Fighting'), ('Fire'),
  ('Fusion Strike'), ('Grass'), ('Lightning'), ('Metal'),
  ('Plasma'), ('Psychic'), ('Rainbow'), ('Water');

-- Pokemon Trainers
INSERT INTO PokemonTrainers (name) VALUES
  ('Arven''s'), ('Blaine''s'), ('Brock''s'), ('Cynthia''s'), ('Erika''s'),
  ('Ethan''s'), ('Giovanni''s'), ('Hop''s'), ('Iono''s'), ('Koga''s'),
  ('Lillie''s'), ('St. Surge''s'), ('Misty''s'), ('N''s'), ('Sabrina''s'),
  ('Team Aqua''s'), ('Team Rocket''s');