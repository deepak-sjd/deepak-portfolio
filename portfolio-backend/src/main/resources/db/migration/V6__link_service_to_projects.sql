-- Adds a demo-video link to projects, and a many-to-many link between
-- services and the project(s) that showcase them — so a Service card can
-- show "here's proof of this, click through to GitHub/live demo/video".

ALTER TABLE public.projects
    ADD COLUMN video_url character varying(500);

CREATE TABLE public.service_projects (
    service_id     bigint  NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    project_id     bigint  NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    display_order  integer NOT NULL DEFAULT 0,
    PRIMARY KEY (service_id, project_id)
);

CREATE INDEX idx_service_projects_service_id ON public.service_projects(service_id);
CREATE INDEX idx_service_projects_project_id ON public.service_projects(project_id);