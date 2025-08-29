ALTER TABLE locations ADD COLUMN Type VARCHAR(50);

UPDATE locations SET Type = 'CardDex' WHERE Name = 'CardDex';
UPDATE locations SET Type = 'Binder' WHERE Name LIKE 'Binder%';
UPDATE locations SET Type = 'Box' WHERE Name LIKE 'BTB%';
