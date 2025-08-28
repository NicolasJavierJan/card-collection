CREATE TABLE recommendations_blacklisted_cards (
    card_id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now()
);  