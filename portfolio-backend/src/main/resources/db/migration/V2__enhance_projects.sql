ALTER TABLE public.projects
    ADD COLUMN display_order integer NOT NULL DEFAULT 0;

ALTER TABLE public.projects
    ADD COLUMN created_at timestamp(6) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE public.projects
    ADD COLUMN updated_at timestamp(6) with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;