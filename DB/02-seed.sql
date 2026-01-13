USE docente_app;

INSERT INTO users (username, password, role) 
VALUES 
('admin', '$2a$10$EpW.S.w.w.w.w.w.w.w.w.O.w.w.w.w.w.w.w.w.w.w.w.w.w.w.e', 'admin');


-- Insertar una Escuela de prueba para el admin (ID usuario 1)
--INSERT INTO schools (user_id, name, academic_year) VALUES (1, 'Escuela Técnica N°1', 2026);

-- Insertar un Alumno de prueba en esa escuela (ID escuela 1)
--INSERT INTO students (school_id, first_name, last_name, dni) VALUES (1, 'Juan', 'Pérez', '40123456');

-- Insertar una Nota al alumno (ID alumno 1)
--INSERT INTO grades (student_id, concept, value, date) VALUES (1, 'Examen Inicial', 8.50, '2026-03-15');