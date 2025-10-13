CREATE TABLE `viajes` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`origen` text NOT NULL,
	`destino` text NOT NULL,
	`fechasalida` integer NOT NULL,
	`fecharetorno` integer NOT NULL,
	`motivo` text NOT NULL,
	`estado` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
