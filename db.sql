-- ============================================
--  VetFácil — Script de Criação do Banco
--  Sistema de Consultas Veterinárias
-- ============================================

CREATE DATABASE IF NOT EXISTS vetfacil
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vetfacil;

-- --------------------------------------------
-- Tabela: usuarios
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- --------------------------------------------
-- Tabela: tutor
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS tutor (
  id         INT          NOT NULL AUTO_INCREMENT,
  nome       VARCHAR(100) NOT NULL,
  telefone   VARCHAR(20)  NOT NULL,
  email      VARCHAR(100),
  criado_em  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- --------------------------------------------
-- Tabela: animal
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS animal (
  id         INT          NOT NULL AUTO_INCREMENT,
  tutor_id   INT          NOT NULL,
  nome       VARCHAR(100) NOT NULL,
  especie    VARCHAR(50)  NOT NULL,   -- ex: Cão, Gato, Coelho
  raca       VARCHAR(100),
  criado_em  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_animal_tutor
    FOREIGN KEY (tutor_id) REFERENCES tutor(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- --------------------------------------------
-- Tabela: consulta
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS consulta (
  id          INT          NOT NULL AUTO_INCREMENT,
  animal_id   INT          NOT NULL,
  data_hora   DATETIME     NOT NULL,
  motivo      VARCHAR(255) NOT NULL,
  status      ENUM('agendada', 'cancelada') NOT NULL DEFAULT 'agendada',
  criado_em   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_consulta_animal
    FOREIGN KEY (animal_id) REFERENCES animal(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- ============================================
--  Dados de exemplo
-- ============================================

-- Usuário admin
-- senha: admin123 (hash bcrypt)
INSERT INTO usuarios (nome_usuario, login, senha) VALUES
  ('Administrador', 'admin', '$2b$10$hKiWThHF3HoU7YT/ZtQmk./DjmcaAOn3Dg9IaXLBW55LswGI/QA4m');

INSERT INTO tutor (nome, telefone, email) VALUES
  ('Ana Souza',    '(11) 91234-5678', 'ana@email.com'),
  ('Carlos Lima',  '(11) 99876-5432', 'carlos@email.com');

INSERT INTO animal (tutor_id, nome, especie, raca) VALUES
  (1, 'Bolinha', 'Cão',  'Shih Tzu'),
  (1, 'Mimi',    'Gato', 'Siamês'),
  (2, 'Rex',     'Cão',  'Labrador');

INSERT INTO consulta (animal_id, data_hora, motivo) VALUES
  (1, '2025-06-10 09:00:00', 'Vacinação anual'),
  (2, '2025-06-10 10:00:00', 'Consulta de rotina'),
  (3, '2025-06-11 14:00:00', 'Dor na pata traseira');
