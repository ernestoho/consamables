\c consamables sam;

DROP SCHEMA test CASCADE;

CREATE SCHEMA test AUTHORIZATION sam;

SET search_path TO test;

CREATE TYPE group_phase AS ENUM ('pending', 'active', 'ordered');

CREATE TABLE "user"
(
	user_id serial NOT NULL,
	email text NOT NULL,
	password_hash text NOT NULL,
	password_salt text NOT NULL,
	CONSTRAINT user_pk
		PRIMARY KEY (user_id)
);

CREATE TABLE restaurant
(
	restaurant_id serial NOT NULL,
	name text NOT NULL,
	location json NOT NULL,
	hours json NOT NULL,
	url text,
	CONSTRAINT restaurant_pk
		PRIMARY KEY (restaurant_id)
);

CREATE TABLE item
(
	item_id serial NOT NULL,
	name text NOT NULL,
	description text,
	price decimal(4, 2),
	restaurant_id int NOT NULL,
	CONSTRAINT item_pk
		PRIMARY KEY (item_id),
	CONSTRAINT item_restaurant_id_fk
		FOREIGN KEY (restaurant_id)
		REFERENCES restaurant (restaurant_id)
);

CREATE TABLE "group"
(
	group_id serial NOT NULL,
	restaurant_id int NOT NULL,
	phase group_phase NOT NULL,
	min_people int NOT NULL DEFAULT 4,
	duration int,
	time_created timestamp with time zone NOT NULL DEFAULT now(),
	time_started timestamp with time zone,
	time_ordered timestamp with time zone,
	CONSTRAINT group_pk
		PRIMARY KEY (group_id),
	CONSTRAINT group_restaurant_id_fk
		FOREIGN KEY (restaurant_id)
		REFERENCES restaurant (restaurant_id)
);

CREATE TABLE "order"
(
	order_id serial NOT NULL,
	group_id int NOT NULL,
	user_id int NOT NULL,
	item_id int NOT NULL,
	CONSTRAINT order_pk
		PRIMARY KEY (order_id),
	CONSTRAINT order_group_id_fk
		FOREIGN KEY (group_id)
		REFERENCES "group" (group_id),
	CONSTRAINT order_user_id_fk
		FOREIGN KEY (user_id)
		REFERENCES "user" (user_id),
	CONSTRAINT order_item_id_fk
		FOREIGN KEY (item_id)
		REFERENCES item (item_id)
);

CREATE TABLE order_data
(
	order_id int NOT NULL,
	data json,
	CONSTRAINT order_data_pk
		PRIMARY KEY (order_id),
	CONSTRAINT order_data_fk
		FOREIGN KEY (order_id)
		REFERENCES "order" (order_id)
);

CREATE TABLE vote
(
	user_id int NOT NULL,
	group_id int NOT NULL,
	CONSTRAINT vote_pk
		PRIMARY KEY (user_id, group_id),
	CONSTRAINT vote_user_id_fk
		FOREIGN KEY (user_id)
		REFERENCES "user" (user_id),
	CONSTRAINT vote_group_id_fk
		FOREIGN KEY (group_id)
		REFERENCES "group" (group_id)
);
