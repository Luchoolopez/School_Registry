USE docente_db;

-- 1. Usuarios (Solo admins o docentes creados por el admin)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    dni VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Guardará el hash de bcrypt
    role ENUM('admin', 'docente') DEFAULT 'docente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

-- 2. Escuelas
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    academic_year INT NOT NULL, -- Ej: 2024, 2025
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Archivos de Escuela (Planillas, Cronogramas, etc.)
CREATE TABLE IF NOT EXISTS school_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL, -- Nombre original del archivo
    path VARCHAR(255) NOT NULL, -- Ruta donde se guarda en el servidor
    mimetype VARCHAR(50) NOT NULL, -- Ej: application/pdf
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

-- 4. Alumnos
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    dni VARCHAR(20), -- Opcional
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

-- 5. Notas (Grades)
CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    concept VARCHAR(100) NOT NULL, -- Ej: "Parcial 1", "TP Final"
    value DECIMAL(4, 2) NOT NULL, -- Permite notas como 10.00 o 7.50
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 6. Ausencias
CREATE TABLE IF NOT EXISTS absences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    justified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);