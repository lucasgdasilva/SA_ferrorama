CREATE DATABASE IF NOT EXISTS trainpass
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE trainpass;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    codigo_recuperacao VARCHAR(255) NULL,
    codigo_expira_em DATETIME NULL,
    foto VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS linhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    origem VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    status ENUM('Ativa', 'Inativa', 'Em manutenção')
        NOT NULL DEFAULT 'Ativa',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS trens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('Em operação', 'Em manutenção', 'Parado')
        NOT NULL DEFAULT 'Em operação',
    linha_id INT NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    tipo ENUM('Carga', 'Passageiros') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_trens_linhas
        FOREIGN KEY (linha_id) REFERENCES linhas(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sensores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    tipo ENUM(
        'Sensor de velocidade',
        'Sensor de proximidade',
        'Sensor de umidade',
        'Sensor de temperatura',
        'Sensor de falha'
    ) NOT NULL,
    status ENUM('OK', 'Falha', 'Em manutenção')
        NOT NULL DEFAULT 'OK',
    linha_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sensores_linhas
        FOREIGN KEY (linha_id) REFERENCES linhas(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS alertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255) NOT NULL,
    linha_id INT NOT NULL,
    status ENUM('Ativo', 'Resolvido')
        NOT NULL DEFAULT 'Ativo',
    gravidade ENUM('Baixa', 'Média', 'Alta')
        NOT NULL DEFAULT 'Média',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_alertas_linhas
        FOREIGN KEY (linha_id) REFERENCES linhas(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
