CREATE TABLE card_set_locations (
    card_set_id INT NOT NULL,
    location_id INT NOT NULL,
    PRIMARY KEY (card_set_id, location_id),
    CONSTRAINT fk_card_set FOREIGN KEY (card_set_id)
        REFERENCES card_sets (id) ON DELETE CASCADE,
    CONSTRAINT fk_location FOREIGN KEY (location_id)
        REFERENCES locations (id) ON DELETE CASCADE
);