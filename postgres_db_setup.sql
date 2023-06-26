-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;

CREATE TABLE IF NOT EXISTS public.doctor
(
    id SERIAL PRIMARY KEY,    
    category_id integer NOT NULL,
    name TEXT COLLATE pg_catalog."default" NOT NULL,
    surname TEXT COLLATE pg_catalog."default" NOT NULL,
    medical_center TEXT COLLATE pg_catalog."default" NOT NULL,
    email TEXT COLLATE pg_catalog."default" NOT NULL,
    password TEXT COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE IF NOT EXISTS public.appointment
(
    id SERIAL PRIMARY KEY,
    patient_id integer NOT NULL,
    doctor_id integer NOT NULL,
    status_id integer NOT NULL,
    appointment_date date NOT NULL,
    appointment_time time without time zone NOT NULL,
    patient_note TEXT COLLATE pg_catalog."default",
    doctor_note TEXT COLLATE pg_catalog."default"
);

CREATE TABLE IF NOT EXISTS public.patient
(
    id SERIAL PRIMARY KEY,
    name TEXT COLLATE pg_catalog."default" NOT NULL,
    surname TEXT COLLATE pg_catalog."default" NOT NULL,
    email TEXT COLLATE pg_catalog."default" NOT NULL,
    password TEXT COLLATE pg_catalog."default" NOT NULL,
    birth_date date NOT NULL,
    gender character(1) COLLATE pg_catalog."default"
);

CREATE TABLE IF NOT EXISTS public.status
(
    id SERIAL PRIMARY KEY,
    value TEXT COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE IF NOT EXISTS public.category
(
    id SERIAL PRIMARY KEY,
    value TEXT COLLATE pg_catalog."default" NOT NULL
);

ALTER TABLE IF EXISTS public.doctor
    ADD CONSTRAINT doctor_to_category FOREIGN KEY (category_id)
    REFERENCES public.category (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.appointment
    ADD CONSTRAINT appointment_to_doctor FOREIGN KEY (doctor_id)
    REFERENCES public.doctor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.appointment
    ADD CONSTRAINT appointment_to_patient FOREIGN KEY (patient_id)
    REFERENCES public.patient (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.appointment
    ADD CONSTRAINT appointment_to_status FOREIGN KEY (status_id)
    REFERENCES public.status (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


INSERT INTO public.category (value) VALUES 
    ('Neurologist'),
    ('Neurology'),
    ('Dermatologist'),
    ('Ophthalmology'),
    ('Pathologist'),
    ('Pediatrics'),
    ('Dermatology'),
    ('Psychiatry'),
    ('Family medicine'),
    ('Surgeon'),
    ('Endocrinology'),
    ('Urology'),
    ('Radiology'),
    ('Gastroenterology'),
    ('Rheumatology'),
    ('Cardiology'),
    ('Oncology'),
    ('Internal medicine'),
    ('Anesthesiology'),
    ('Otorhinolaryngology'),
    ('Pulmonology'),
    ('Nephrology');

INSERT INTO public.status (value) VALUES 
    ('Pending'),
    ('Confirmed'),
    ('Cancelled'),
    ('Completed');


INSERT INTO public.doctor (category_id, name, surname, medical_center, email, password) VALUES
(14, 'Hans', 'Schmidt', 'Hauptstraße 10, 10115 Berlin, Germany', 'hans.schmidt@doctor.com', 'password1'),
(7, 'Sophie', 'Dubois', 'Rue de la Paix 5, 75002 Paris, France', 'sophie.dubois@doctor.com', 'password2'),
(3, 'Miguel', 'Garcia', 'Calle Gran Vía 1, 28013 Madrid, Spain', 'miguel.garcia@doctor.com', 'password3'),
(21, 'Lena', 'Andersen', 'Strandvejen 20, 2900 Hellerup, Denmark', 'lena.andersen@doctor.com', 'password4'),
(11, 'Giovanni', 'Ricci', 'Via Roma 50, 20121 Milan, Italy', 'giovanni.ricci@doctor.com', 'password5'),
(6, 'Anna', 'Jansen', 'Amsterdamstraat 100, 1012 AB Amsterdam, Netherlands', 'anna.jansen@doctor.com', 'password6'),
(19, 'Sebastian', 'Fischer', 'Hauptstraße 50, 10115 Berlin, Germany', 'sebastian.fischer@doctor.com', 'password7'),
(9, 'Isabella', 'Rossi', 'Via dei Condotti 10, 00187 Rome, Italy', 'isabella.rossi@doctor.com', 'password8'),
(15, 'Andreas', 'Lindberg', 'Drottninggatan 20, 11151 Stockholm, Sweden', 'andreas.lindberg@doctor.com', 'password9'),
(2, 'Emma', 'Mueller', 'Müllerstraße 1, 10178 Berlin, Germany', 'emma.mueller@doctor.com', 'password10'),
(8, 'David', 'González', 'Carrer de Provença 100, 08029 Barcelona, Spain', 'david.gonzalez@doctor.com', 'password11'),
(4, 'Clara', 'Leroy', 'Rue du Faubourg Saint-Honoré 20, 75008 Paris, France', 'clara.leroy@doctor.com', 'password12'),
(18, 'Niklas', 'Lindström', 'Sveavägen 15, 111 45 Stockholm, Sweden', 'niklas.lindstrom@doctor.com', 'password13'),
(12, 'Giulia', 'Moretti', 'Piazza Navona 1, 00186 Rome, Italy', 'giulia.moretti@doctor.com', 'password14'),
(5, 'Lucas', 'Müller', 'Hauptbahnhofplatz 1, 80335 Munich, Germany', 'lucas.muller@doctor.com', 'password15'),
(20, 'Elena', 'Silva', 'Rua da Boavista 50, 1200-067 Lisbon, Portugal', 'elena.silva@doctor.com', 'password16'),
(13, 'Rasmus', 'Nielsen', 'Nørregade 10, 1165 Copenhagen, Denmark', 'rasmus.nielsen@doctor.com', 'password17'),
(1, 'Sophia', 'Smith', 'Kings Road 100, SW3 4EE London, United Kingdom', 'sophia.smith@doctor.com', 'password18'),
(17, 'Pablo', 'Hernández', 'Calle Mayor 25, 28013 Madrid, Spain', 'pablo.hernandez@doctor.com', 'password19'),
(10, 'Laura', 'Dupont', 'Avenue des Champs-Élysées 10, 75008 Paris, France', 'laura.dupont@doctor.com', 'password20'),
(16, 'Filippo', 'Ricci', 'Via Veneto 5, 00187 Rome, Italy', 'filippo.ricci@doctor.com', 'password21'),
(13, 'Marta', 'Sánchez', 'Calle de Alcalá 50, 28014 Madrid, Spain', 'marta.sanchez@doctor.com', 'password22'),
(5, 'Maximilian', 'Schneider', 'Rathausplatz 10, 1010 Vienna, Austria', 'maximilian.schneider@doctor.com', 'password23'),
(18, 'Elsa', 'Bergman', 'Kungsgatan 15, 111 56 Stockholm, Sweden', 'elsa.bergman@doctor.com', 'password24'),
(2, 'Alessandro', 'Conti', 'Piazza del Duomo 1, 20122 Milan, Italy', 'alessandro.conti@doctor.com', 'password25'),
(9, 'Sophie', 'Müller', 'Friedrichstraße 100, 10117 Berlin, Germany', 'sophie.muller@doctor.com', 'password26'),
(14, 'Gabriel', 'Lopez', 'Carrer de Balmes 50, 08007 Barcelona, Spain', 'gabriel.lopez@doctor.com', 'password27'),
(7, 'Emma', 'Martin', 'Rue Royale 10, 1000 Brussels, Belgium', 'emma.martin@doctor.com', 'password28'),
(21, 'Luca', 'Rinaldi', 'Via Garibaldi 20, 00153 Rome, Italy', 'luca.rinaldi@doctor.com', 'password29'),
(11, 'Olivia', 'Johansson', 'Drottninggatan 10, 111 51 Stockholm, Sweden', 'olivia.johansson@doctor.com', 'password30'),
(6, 'Noah', 'Weber', 'Musterstraße 1, 10178 Berlin, Germany', 'noah.weber@doctor.com', 'password31'),
(19, 'Laura', 'González', 'Calle Mayor 50, 28013 Madrid, Spain', 'laura.gonzalez@doctor.com', 'password32'),
(10, 'Elena', 'Rousseau', 'Rue du Faubourg Saint-Honoré 30, 75008 Paris, France', 'elena.rousseau@doctor.com', 'password33'),
(16, 'Oscar', 'Lund', 'Karl Johans gate 5, 0154 Oslo, Norway', 'oscar.lund@doctor.com', 'password34'),
(3, 'Sara', 'Moretti', 'Via della Conciliazione 10, 00120 Vatican City', 'sara.moretti@doctor.com', 'password35'),
(15, 'Anton', 'Becker', 'Bahnhofstraße 20, 10115 Berlin, Germany', 'anton.becker@doctor.com', 'password36'),
(8, 'Isabella', 'Russo', 'Carrer de Provença 75, 08029 Barcelona, Spain', 'isabella.russo@doctor.com', 'password37'),
(20, 'Liam', 'Garcia', 'Rua Augusta 100, 1100-048 Lisbon, Portugal', 'liam.garcia@doctor.com', 'password38'),
(4, 'Eva', 'Dubois', 'Rue de Rivoli 10, 75001 Paris, France', 'eva.dubois@doctor.com', 'password39'),
(17, 'Niklas', 'Hansen', 'Nyhavn 15, 1051 Copenhagen, Denmark', 'niklas.hansen@doctor.com', 'password40'),
(12, 'Hugo', 'Bergmann', 'Unter den Linden 10, 10117 Berlin, Germany', 'hugo.bergmann@doctor.com', 'password41'),
(5, 'Léa', 'Lefèvre', 'Avenue des Champs-Élysées 50, 75008 Paris, France', 'lea.lefevre@doctor.com', 'password42'),
(19, 'Diego', 'Santos', 'Rua do Comércio 20, 1100-150 Lisbon, Portugal', 'diego.santos@doctor.com', 'password43'),
(10, 'Emma', 'Fischer', 'Am Hofgarten 15, 80538 Munich, Germany', 'emma.fischer@doctor.com', 'password44'),
(14, 'Rafael', 'Silva', 'Carrer de Mallorca 75, 08029 Barcelona, Spain', 'rafael.silva@doctor.com', 'password45'),
(7, 'Amelia', 'Petrova', 'Nevsky Prospekt 10, 191186 St. Petersburg, Russia', 'amelia.petrova@doctor.com', 'password46'),
(2, 'Leon', 'Andersson', 'Kungsgatan 20, 111 56 Stockholm, Sweden', 'leon.andersson@doctor.com', 'password47'),
(16, 'Chiara', 'Ricci', 'Via Veneto 50, 00187 Rome, Italy', 'chiara.ricci@doctor.com', 'password48'),
(11, 'Lucas', 'Meier', 'Bahnhofstraße 5, 8001 Zurich, Switzerland', 'lucas.meier@doctor.com', 'password49'),
(6, 'Olivia', 'Kovács', 'Andrássy út 10, 1061 Budapest, Hungary', 'olivia.kovacs@doctor.com', 'password50'),
(18, 'Liam', 'Müller', 'Kaiserstraße 50, 60329 Frankfurt, Germany', 'liam.muller@doctor.com', 'password51'),
(3, 'Sophia', 'Morales', 'Paseo de la Castellana 10, 28046 Madrid, Spain', 'sophia.morales@doctor.com', 'password52'),
(15, 'Matteo', 'Rossi', 'Piazza San Marco 1, 30124 Venice, Italy', 'matteo.rossi@doctor.com', 'password53'),
(8, 'Hannah', 'Eriksson', 'Sveavägen 10, 111 57 Stockholm, Sweden', 'hannah.eriksson@doctor.com', 'password54'),
(20, 'Arthur', 'Leroy', 'Rue de Rivoli 50, 75001 Paris, France', 'arthur.leroy@doctor.com', 'password55'),
(4, 'Elena', 'Hernández', 'Calle Gran Via 75, 28013 Madrid, Spain', 'elena.hernandez@doctor.com', 'password56'),
(17, 'Luca', 'Weber', 'Königsallee 20, 40212 Düsseldorf, Germany', 'luca.weber@doctor.com', 'password57'),
(12, 'Mila', 'Müller', 'Kurfürstendamm 10, 10719 Berlin, Germany', 'mila.muller@doctor.com', 'password58'),
(5, 'Noah', 'Dupont', 'Avenue Louise 10, 1050 Brussels, Belgium', 'noah.dupont@doctor.com', 'password59'),
(19, 'Lara', 'Kovač', 'Trg bana Jelačića 15, 10000 Zagreb, Croatia', 'lara.kovac@doctor.com', 'password60'),
(10, 'Mia', 'Sørensen', 'Nørre Voldgade 10, 1358 Copenhagen, Denmark', 'mia.sorensen@doctor.com', 'password61'),
(14, 'David', 'Lopez', 'Carrer de Valencia 50, 08015 Barcelona, Spain', 'david.lopez@doctor.com', 'password62'),
(7, 'Ella', 'Müller', 'Neumarkt 10, 8001 Zurich, Switzerland', 'ella.muller@doctor.com', 'password63'),
(2, 'Luca', 'Rossi', 'Via Condotti 10, 00187 Rome, Italy', 'luca.rossi@doctor.com', 'password64'),
(16, 'Sophie', 'Andersen', 'Frederiksberg Alle 5, 1820 Frederiksberg, Denmark', 'sophie.andersen@doctor.com', 'password65'),
(11, 'Oscar', 'Schmidt', 'Friedrichstraße 100, 10117 Berlin, Germany', 'oscar.schmidt@doctor.com', 'password66'),
(6, 'Luisa', 'González', 'Carrer de Mallorca 100, 08029 Barcelona, Spain', 'luisa.gonzalez@doctor.com', 'password67'),
(19, 'Felix', 'Weber', 'Königsallee 50, 40212 Düsseldorf, Germany', 'felix.weber@doctor.com', 'password68'),
(3, 'Sophia', 'Lefèvre', 'Rue du Faubourg Saint-Honoré 75, 75008 Paris, France', 'sophia.lefevre@doctor.com', 'password69'),
(15, 'Maximilian', 'Hansen', 'Bredgade 10, 1260 Copenhagen, Denmark', 'maximilian.hansen@doctor.com', 'password70'),
(8, 'Emma', 'Lopez', 'Calle Serrano 10, 28001 Madrid, Spain', 'emma.lopez@doctor.com', 'password71'),
(20, 'Alexander', 'Müller', 'Lange Reihe 50, 20099 Hamburg, Germany', 'alexander.muller@doctor.com', 'password72'),
(4, 'Clara', 'Dubois', 'Rue de Rivoli 75, 75001 Paris, France', 'clara.dubois@doctor.com', 'password73'),
(17, 'Liam', 'Johansson', 'Stortorget 15, 111 29 Stockholm, Sweden', 'liam.johansson@doctor.com', 'password74'),
(12, 'Maja', 'Kovač', 'Ilica 10, 10000 Zagreb, Croatia', 'maja.kovac@doctor.com', 'password75'),
(5, 'Oliver', 'Becker', 'Mittelstraße 10, 50672 Cologne, Germany', 'oliver.becker@doctor.com', 'password76'),
(18, 'Eva', 'Petrova', 'Nevsky Prospekt 20, 191186 St. Petersburg, Russia', 'eva.petrova@doctor.com', 'password77'),
(13, 'Matteo', 'Molinari', 'Piazza San Pietro 1, 00120 Vatican City', 'matteo.molinari@doctor.com', 'password78'),
(9, 'Ava', 'Silva', 'Avenida da Liberdade 10, 1250-096 Lisbon, Portugal', 'ava.silva@doctor.com', 'password79'),
(1, 'Hugo', 'Müller', 'Hauptstraße 1, 10178 Berlin, Germany', 'hugo.muller@doctor.com', 'password80'),
(16, 'Elena', 'Ricci', 'Via Veneto 50, 00187 Rome, Italy', 'elena.ricci@doctor.com', 'password81'),
(13, 'Daniel', 'Andersen', 'Frederiksberggade 10, 1459 Copenhagen, Denmark', 'daniel.andersen@doctor.com', 'password82'),
(5, 'Emma', 'Lefèvre', 'Avenue Louise 50, 1050 Brussels, Belgium', 'emma.lefevre@doctor.com', 'password83'),
(18, 'Liam', 'Schneider', 'Hohenzollernring 15, 50672 Cologne, Germany', 'liam.schneider@doctor.com', 'password84'),
(2, 'Clara', 'González', 'Carrer de Provença 100, 08029 Barcelona, Spain', 'clara.gonzalez@doctor.com', 'password85'),
(9, 'Lucas', 'Müller', 'Bahnhofstraße 5, 8001 Zurich, Switzerland', 'lucas.muller@doctor.com', 'password86'),
(14, 'Sara', 'Weber', 'Kurfürstendamm 10, 10719 Berlin, Germany', 'sara.weber@doctor.com', 'password87'),
(7, 'Olivia', 'Hansen', 'Nørrebrogade 50, 2200 Copenhagen, Denmark', 'olivia.hansen@doctor.com', 'password88'),
(21, 'Maximilian', 'Rossi', 'Via Condotti 20, 00187 Rome, Italy', 'maximilian.rossi@doctor.com', 'password89'),
(11, 'Mia', 'Schmidt', 'Friedrichstraße 100, 10117 Berlin, Germany', 'mia.schmidt@doctor.com', 'password90'),
(6, 'Noah', 'Lopez', 'Calle de Serrano 10, 28001 Madrid, Spain', 'noah.lopez@doctor.com', 'password91'),
(19, 'Sophia', 'Müller', 'Königsallee 50, 40212 Düsseldorf, Germany', 'sophia.muller@doctor.com', 'password92'),
(3, 'Alexander', 'Dubois', 'Rue de Rivoli 75, 75001 Paris, France', 'alexander.dubois@doctor.com', 'password93'),
(15, 'Ella', 'Johansson', 'Sturegatan 15, 114 35 Stockholm, Sweden', 'ella.johansson@doctor.com', 'password94'),
(8, 'Leon', 'Kovač', 'Ilica 20, 10000 Zagreb, Croatia', 'leon.kovac@doctor.com', 'password95'),
(20, 'Mila', 'Becker', 'Klosterstraße 10, 10179 Berlin, Germany', 'mila.becker@doctor.com', 'password96'),
(4, 'Hannah', 'Petrova', 'Nevsky Prospekt 20, 191186 St. Petersburg, Russia', 'hannah.petrova@doctor.com', 'password97'),
(17, 'Luca', 'Molinari', 'Piazza San Pietro 1, 00120 Vatican City', 'luca.molinari@doctor.com', 'password98'),
(12, 'Lara', 'Silva', 'Avenida da Liberdade 10, 1250-096 Lisbon, Portugal', 'lara.silva@doctor.com', 'password99'),
(1, 'David', 'Müller', 'Hauptstraße 1, 10178 Berlin, Germany', 'david.muller@doctor.com', 'password100');


INSERT INTO public.patient (name, surname, email, password, birth_date, gender) VALUES
('Liam', 'Smith', 'liam.smith@patient.com', 'password1', '1990-05-15', 'M'),
('Emma', 'Johnson', 'emma.johnson@patient.com', 'password2', '1985-09-21', 'F'),
('Noah', 'Brown', 'noah.brown@patient.com', 'password3', '1992-03-08', 'M'),
('Olivia', 'Taylor', 'olivia.taylor@patient.com', 'password4', '1994-11-30', 'F'),
('William', 'Wilson', 'william.wilson@patient.com', 'password5', '1988-07-12', 'M'),
('Ava', 'Anderson', 'ava.anderson@patient.com', 'password6', '1991-02-25', NULL),
('James', 'Thomas', 'james.thomas@patient.com', 'password7', '1993-06-19', 'M'),
('Sophia', 'Roberts', 'sophia.roberts@patient.com', 'password8', '1987-12-03', 'F'),
('Oliver', 'Walker', 'oliver.walker@patient.com', 'password9', '1990-08-27', 'M'),
('Isabella', 'Harris', 'isabella.harris@patient.com', 'password10', '1995-04-17', NULL);


END;
