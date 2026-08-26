-- If your "notes" table does not exist yet (fresh database), uncomment this block first:
--
-- CREATE TABLE notes (
--     id BIGSERIAL PRIMARY KEY,
--     title VARCHAR(200) NOT NULL,
--     category VARCHAR(100) NOT NULL,
--     summary VARCHAR(500) NOT NULL,
--     content TEXT NOT NULL,
--     slug VARCHAR(100) NOT NULL UNIQUE,
--     published BOOLEAN NOT NULL DEFAULT FALSE,
--     display_order INTEGER NOT NULL DEFAULT 0,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

CREATE TABLE note_resources (
    id BIGSERIAL PRIMARY KEY,
    note_id BIGINT NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL,
    label VARCHAR(150) NOT NULL,
    url VARCHAR(1000) NOT NULL,
    file_name VARCHAR(255),
    file_size BIGINT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_note_resources_note_id ON note_resources(note_id);
