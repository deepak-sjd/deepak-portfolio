CREATE TABLE public.events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location VARCHAR(150),
    description VARCHAR(300)
);

CREATE TABLE public.tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    due_date DATE,
    display_order INTEGER NOT NULL DEFAULT 0
);