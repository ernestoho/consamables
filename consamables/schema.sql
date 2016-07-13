DROP DATABASE consamables;

CREATE DATABASE consamables
	OWNER sam
	ENCODING 'utf8';

\c consamables sam;

CREATE TABLE consumer
(
	consumer_id serial NOT NULL,
	email text NOT NULL,
	password_hash text NOT NULL,
	password_salt text NOT NULL,
	CONSTRAINT consumer_pk
		PRIMARY KEY (consumer_id)
);

CREATE TABLE restaurant
(
	restaurant_id serial NOT NULL,
	name text NOT NULL,
	location text NOT NULL,
	hours text NOT NULL,
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

CREATE TABLE food_group
(
	food_group_id serial NOT NULL,
	restaurant_id int NOT NULL,
	start_time timestamp with time zone,
	duration int,
	min_people int,
	phase text,
	CONSTRAINT food_group_pk
		PRIMARY KEY (food_group_id),
	CONSTRAINT food_group_restaurant_id_fk
		FOREIGN KEY (restaurant_id)
		REFERENCES restaurant (restaurant_id)
);

CREATE TABLE food_order
(
	food_order_id serial NOT NULL,
	food_group_id int NOT NULL,
	consumer_id int NOT NULL,
	item_id int NOT NULL,
	CONSTRAINT food_order_pk
		PRIMARY KEY (food_order_id),
	CONSTRAINT food_order_food_group_id_fk
		FOREIGN KEY (food_group_id)
		REFERENCES food_group (food_group_id),
	CONSTRAINT food_order_consumer_id_fk
		FOREIGN KEY (consumer_id)
		REFERENCES consumer (consumer_id),
	CONSTRAINT food_order_item_id_fk
		FOREIGN KEY (item_id)
		REFERENCES item (item_id)
);

CREATE TABLE food_order_data
(
	food_order_id int NOT NULL,
	data json,
	CONSTRAINT food_order_data_pk
		PRIMARY KEY (food_order_id),
	CONSTRAINT food_order_data_fk
		FOREIGN KEY (food_order_id)
		REFERENCES food_order (food_order_id)
);

CREATE TABLE vote
(
	consumer_id int NOT NULL,
	food_group_id int NOT NULL,
	CONSTRAINT vote_pk
		PRIMARY KEY (consumer_id, food_group_id),
	CONSTRAINT vote_consumer_id_fk
		FOREIGN KEY (consumer_id)
		REFERENCES consumer (consumer_id),
	CONSTRAINT vote_food_group_id_fk
		FOREIGN KEY (food_group_id)
		REFERENCES food_group (food_group_id)
);
