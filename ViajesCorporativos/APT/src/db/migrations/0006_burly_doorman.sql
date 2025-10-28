CREATE TABLE `viajes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`origin` text NOT NULL,
	`destination` text NOT NULL,
	`departure_date` text NOT NULL,
	`return_date` text NOT NULL,
	`motive` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
