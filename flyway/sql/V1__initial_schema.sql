CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Variants (Dark, Light, EX, VMAX, Etc)
CREATE TABLE VariantTypes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Type (Pokemon, Trainer, Energy)
CREATE TABLE CardTypes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- Pokémon, Trainer, Energy
);

-- Location
CREATE TABLE Locations (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- Binder, CardDex, BTB
);

-- Trainer Subtypes
CREATE TABLE TrainerSubtypes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- Item, Stadium, etc.
);

-- Energy Subtypes
CREATE TABLE EnergySubtypes (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Pokemon Trainers
CREATE TABLE PokemonTrainers (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- Blaine's, Erika's, etc.
);

-- Pokemon Species (Bulbasaur, Ivysaur, Venusaur, etc)
CREATE TABLE PokemonSpecies (
    id INT PRIMARY KEY, -- National Dex number
    name TEXT UNIQUE NOT NULL
);

-- Languages
CREATE TABLE Languages (
    id SERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,  -- e.g. 'EN'
    name TEXT UNIQUE NOT NULL   -- e.g. 'English'
);

-- Card Sets (Base Set, Fossil, etc)
CREATE TABLE CardSets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    language_id INT NOT NULL REFERENCES Languages(id),
    card_total INT NOT NULL
);

-- The Main Table (Pokemon Cards!)
CREATE TABLE Pokemon_Cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_name TEXT NOT NULL,
    species_id INT REFERENCES PokemonSpecies(id),
    variant_type_id INT REFERENCES VariantTypes(id),
    card_type_id INT REFERENCES CardTypes(id),
    set_id INT REFERENCES CardSets(id),
    card_number INT NOT NULL,
    language_id INT NOT NULL REFERENCES Languages(id),
    first_edition BOOLEAN DEFAULT FALSE,
    location_id INT REFERENCES Locations(id),
    trainer_subtype_id INT REFERENCES TrainerSubtypes(id),
    energy_subtype_id INT REFERENCES EnergySubtypes(id),
    pokemon_trainer_id INT REFERENCES PokemonTrainers(id),
    image_path TEXT
);