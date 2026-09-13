-- Adds a read/unread flag to contact messages, so the admin tool can show
-- an inbox-style unread count instead of every message looking the same.

ALTER TABLE public.contact_messages
    ADD COLUMN is_read boolean NOT NULL DEFAULT false;