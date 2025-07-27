CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Variants (Dark, Light, EX, VMAX, Etc)
CREATE TABLE Variant_Types (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Type (Pokemon, Trainer, Energy)
CREATE TABLE Card_Types (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- Pokémon, Trainer, Energy
);

-- Location
CREATE TABLE Locations (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- Binder, CardDex, BTB
);

-- Trainer Subtypes
CREATE TABLE Trainer_Subtypes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- Item, Stadium, etc.
);

-- Energy Subtypes
CREATE TABLE Energy_Subtypes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Pokemon Trainers
CREATE TABLE Pokemon_Trainers (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- Blaine's, Erika's, etc.
);

-- Pokemon Species (Bulbasaur, Ivysaur, Venusaur, etc)
CREATE TABLE Pokemon_Species (
    id SERIAL PRIMARY KEY, -- National Dex number
    name TEXT UNIQUE NOT NULL
);

-- Languages
CREATE TABLE Card_Languages (
    id SERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,  -- e.g. 'EN'
    name TEXT UNIQUE NOT NULL   -- e.g. 'English'
);

-- Card Sets (Base Set, Fossil, etc)
CREATE TABLE Card_Sets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    card_total INT NOT NULL,
    UNIQUE (name, code)
);

-- The Main Table (Pokemon Cards!)
CREATE TABLE Pokemon_Cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_name TEXT NOT NULL,
    pokemon_species_id INT REFERENCES Pokemon_Species(id),
    variant_type_id INT REFERENCES Variant_Types(id),
    card_type_id INT REFERENCES Card_Types(id),
    card_set_id INT REFERENCES Card_Sets(id),
    card_number INT NOT NULL,
    first_edition BOOLEAN DEFAULT FALSE,
    location_id INT REFERENCES Locations(id),
    trainer_subtype_id INT REFERENCES Trainer_Subtypes(id),
    energy_subtype_id INT REFERENCES Energy_Subtypes(id),
    pokemon_trainer_id INT REFERENCES Pokemon_Trainers(id),
    card_language_id INT NOT NULL REFERENCES Card_Languages(id),
    image_path TEXT
);