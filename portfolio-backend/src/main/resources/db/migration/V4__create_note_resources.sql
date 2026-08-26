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