BEGIN;

    DROP TABLE IF EXISTS words CASCADE;

    CREATE TABLE words 
    (
        word TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        language VARCHAR(20)
    );

COMMIT;
