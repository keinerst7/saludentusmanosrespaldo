-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2025 a las 21:56:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saludentusmanos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `completed_meditations`
--

CREATE TABLE `completed_meditations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `meditation_id` int(11) NOT NULL,
  `completed_date` date NOT NULL,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `meditation_sessions`
--

CREATE TABLE `meditation_sessions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mood_entries`
--

CREATE TABLE `mood_entries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `mood` tinyint(4) NOT NULL CHECK (`mood` between 1 and 5),
  `stress` tinyint(4) DEFAULT NULL CHECK (`stress` between 1 and 5),
  `energy` tinyint(4) DEFAULT NULL CHECK (`energy` between 1 and 5),
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mood_triggers`
--

CREATE TABLE `mood_triggers` (
  `id` int(11) NOT NULL,
  `mood_entry_id` int(11) NOT NULL,
  `trigger_text` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'Usuario'),
(2, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sleep_entries`
--

CREATE TABLE `sleep_entries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `hours` decimal(4,2) DEFAULT NULL CHECK (`hours` >= 0 and `hours` <= 24),
  `quality` tinyint(4) DEFAULT NULL CHECK (`quality` between 1 and 5),
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `document` varchar(10) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `goal` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `joinDate` date DEFAULT curdate(),
  `state` varchar(50) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `completed_meditations`
--
ALTER TABLE `completed_meditations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_completed_meditations_user` (`user_id`),
  ADD KEY `fk_completed_meditations_session` (`meditation_id`),
  ADD KEY `idx_completed_meditations_user_date` (`user_id`,`completed_date`);

--
-- Indices de la tabla `meditation_sessions`
--
ALTER TABLE `meditation_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mood_entries`
--
ALTER TABLE `mood_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mood_entries_user` (`user_id`),
  ADD KEY `idx_mood_entries_user_date` (`user_id`,`date`);

--
-- Indices de la tabla `mood_triggers`
--
ALTER TABLE `mood_triggers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mood_triggers_entry` (`mood_entry_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sleep_entries`
--
ALTER TABLE `sleep_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sleep_entries_user` (`user_id`),
  ADD KEY `idx_sleep_entries_user_date` (`user_id`,`date`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `document` (`document`),
  ADD KEY `fk_users_roles` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `completed_meditations`
--
ALTER TABLE `completed_meditations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `meditation_sessions`
--
ALTER TABLE `meditation_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mood_entries`
--
ALTER TABLE `mood_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mood_triggers`
--
ALTER TABLE `mood_triggers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sleep_entries`
--
ALTER TABLE `sleep_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `completed_meditations`
--
ALTER TABLE `completed_meditations`
  ADD CONSTRAINT `fk_completed_meditations_session` FOREIGN KEY (`meditation_id`) REFERENCES `meditation_sessions` (`id`),
  ADD CONSTRAINT `fk_completed_meditations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `mood_entries`
--
ALTER TABLE `mood_entries`
  ADD CONSTRAINT `fk_mood_entries_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `mood_triggers`
--
ALTER TABLE `mood_triggers`
  ADD CONSTRAINT `fk_mood_triggers_entry` FOREIGN KEY (`mood_entry_id`) REFERENCES `mood_entries` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sleep_entries`
--
ALTER TABLE `sleep_entries`
  ADD CONSTRAINT `fk_sleep_entries_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
