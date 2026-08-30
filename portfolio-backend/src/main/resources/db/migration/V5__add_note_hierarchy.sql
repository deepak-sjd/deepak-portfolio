ALTER TABLE notes ADD COLUMN parent_id BIGINT NULL REFERENCES notes(id) ON DELETE CASCADE;

CREATE INDEX idx_notes_parent_id ON notes(parent_id);

-- content becomes optional: pure "folder" nodes (Fields/Topics that only group children) may have no body text.
ALTER TABLE notes ALTER COLUMN content DROP NOT NULL;
