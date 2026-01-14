USE docente_db;

INSERT INTO users (username, dni, password, role) 
VALUES 
('admin', '00000000', '$2b$10$3j4o7yJv0.qcgtdyYUwgmeRmgt.upVth.ut73Wwmrximj.rhbelAK', 'admin');


-- Insertar una Escuela de prueba para el admin (ID usuario 1)
--INSERT INTO schools (user_id, name, academic_year) VALUES (1, 'Escuela Técnica N°1', 2026);

-- Insertar un Alumno de prueba en esa escuela (ID escuela 1)
--INSERT INTO students (school_id, first_name, last_name, dni) VALUES (1, 'Juan', 'Pérez', '40123456');

-- Insertar una Nota al alumno (ID alumno 1)
--INSERT INTO grades (student_id, concept, value, date) VALUES (1, 'Examen Inicial', 8.50, '2026-03-15');