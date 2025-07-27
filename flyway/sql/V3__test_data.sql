INSERT INTO Card_Sets (name, code, card_total) VALUES
    ('Test', 'T', '10');

INSERT INTO Pokemon_Cards (card_name, pokemon_species_id, variant_type_id, card_type_id,
                            card_set_id, card_number, first_edition, location_id, 
                            trainer_subtype_id, energy_subtype_id, pokemon_trainer_id, card_language_id, image_path) VALUES
    ('Test Card 1', 1, 1, 1, 1, 1, TRUE, 1, NULL, NULL, NULL, 1, 'en/t/t-1.png'),
    ('Test Card 2', NULL, NULL, 2, 1, 2, FALSE, 2, 1, NULL, NULL, 2, 'en/t/t-1.png'),
    ('Test Card 3', NULL, NULL, 3, 1, 3, FALSE, 3, NULL, 1, NULL, 3, 'en/t/t-1.png');
