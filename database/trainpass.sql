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

INSERT INTO linhas (id, nome, origem, destino, status) VALUES
(1, 'L-001', 'Joinville', 'São Francisco do Sul', 'Ativa'),
(2, 'L-002', 'Joinville', 'Araquari', 'Ativa'),
(3, 'L-003', 'Joinville', 'Guaramirim', 'Ativa'),
(4, 'L-004', 'Joinville', 'São Bento do Sul', 'Em manutenção'),
(5, 'L-005', 'Joinville', 'Campo Alegre', 'Ativa'),
(6, 'L-006', 'Joinville', 'Rio Negrinho', 'Inativa'),
(7, 'L-007', 'Joinville', 'Mafra', 'Ativa'),
(8, 'L-008', 'Joinville', 'Corupá', 'Em manutenção'),
(9, 'L-009', 'Joinville', 'Curitiba', 'Ativa'),
(10, 'L-010', 'Guaramirim', 'Jaraguá do Sul', 'Inativa');

INSERT INTO trens (nome, status, linha_id, modelo, tipo) VALUES
('TP-001', 'Em operação', 1, 'Alstom Metropolis', 'Passageiros'),
('TP-002', 'Em operação', 2, 'CAF Série 5000', 'Passageiros'),
('TP-003', 'Em manutenção', 3, 'Siemens Inspiro', 'Passageiros'),
('TP-004', 'Em operação', 5, 'Alstom Citadis', 'Passageiros'),
('TP-005', 'Parado', 7, 'CAF Série 6000', 'Passageiros'),
('TC-001', 'Em operação', 1, 'GE Evolution ES44', 'Carga'),
('TC-002', 'Em operação', 4, 'EMD SD70ACe', 'Carga'),
('TC-003', 'Em manutenção', 6, 'GE AC44i', 'Carga'),
('TC-004', 'Em operação', 9, 'EMD SD40-2', 'Carga'),
('TC-005', 'Parado', 10, 'GE Dash 9', 'Carga');

INSERT INTO sensores (codigo, tipo, status, linha_id) VALUES
('VEL-001', 'Sensor de velocidade', 'OK', 1),
('VEL-002', 'Sensor de velocidade', 'Falha', 2),
('PROX-001', 'Sensor de proximidade', 'OK', 3),
('PROX-002', 'Sensor de proximidade', 'Em manutenção', 4),
('UMID-001', 'Sensor de umidade', 'OK', 5),
('UMID-002', 'Sensor de umidade', 'Falha', 6),
('TEMP-001', 'Sensor de temperatura', 'OK', 7),
('TEMP-002', 'Sensor de temperatura', 'Em manutenção', 8),
('FALHA-001', 'Sensor de falha', 'OK', 9),
('FALHA-002', 'Sensor de falha', 'Falha', 10);

INSERT INTO alertas (codigo, descricao, linha_id, status, gravidade) VALUES
('A-001', 'Velocidade acima do limite permitido', 1, 'Ativo', 'Alta'),
('A-002', 'Falha de comunicação com sensor', 2, 'Resolvido', 'Média'),
('A-003', 'Temperatura elevada nos trilhos', 3, 'Ativo', 'Alta'),
('A-004', 'Manutenção preventiva necessária', 4, 'Ativo', 'Média'),
('A-005', 'Umidade elevada na via', 5, 'Resolvido', 'Baixa'),
('A-006', 'Sensor de proximidade sem resposta', 6, 'Ativo', 'Alta'),
('A-007', 'Vibração acima do padrão esperado', 7, 'Resolvido', 'Média'),
('A-008', 'Possível obstrução na linha', 8, 'Ativo', 'Alta'),
('A-009', 'Oscilação na temperatura do equipamento', 9, 'Resolvido', 'Baixa'),
('A-010', 'Falha detectada no sistema de monitoramento', 10, 'Ativo', 'Alta');