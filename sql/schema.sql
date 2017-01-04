\c consamables sam;

DROP SCHEMA test CASCADE;

CREATE SCHEMA test AUTHORIZATION sam;

SET search_path TO test;

CREATE TYPE group_phase AS ENUM ('pending', 'active', 'ordered');

CREATE TYPE group_type AS ENUM ('delivery', 'carryout', 'outing', 'delivery or carryout', 'any');

CREATE TABLE "user"
(
    user_id bigserial NOT NULL,
    email text UNIQUE NOT NULL,
    password_hash bytea NOT NULL,
    password_salt bytea NOT NULL,
    CONSTRAINT user_pk
        PRIMARY KEY (user_id)
);

CREATE TABLE access_token
(
    access_token_id uuid NOT NULL,
    user_id bigint NOT NULL,
    last_access_time timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT access_token_pk
        PRIMARY KEY (access_token_id),
    CONSTRAINT access_token_user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES "user" (user_id)
);

CREATE TABLE restaurant
(
    restaurant_id bigserial NOT NULL,
    name text NOT NULL,
    location json NOT NULL,
    hours json NOT NULL,
    url text,
    has_delivery boolean NOT NULL DEFAULT FALSE,
    data json,
    CONSTRAINT restaurant_pk
        PRIMARY KEY (restaurant_id)
);

CREATE TABLE menu_section
(
    menu_section_id bigserial NOT NULL,
    restaurant_id bigint NOT NULL,
    name text NOT NULL,
    CONSTRAINT menu_section_pk
        PRIMARY KEY (menu_section_id),
    UNIQUE (restaurant_id, name),
    CONSTRAINT menu_section_restaurant_id_fk
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurant (restaurant_id)
);

CREATE TABLE item
(
    item_id bigserial NOT NULL,
    menu_section_id bigint NOT NULL,
    name text NOT NULL,
    description text,
    price decimal(4, 2),
    data json,
    CONSTRAINT item_pk
        PRIMARY KEY (item_id),
    CONSTRAINT item_menu_section_id_fk
        FOREIGN KEY (menu_section_id)
        REFERENCES menu_section (menu_section_id)
);

CREATE TABLE "group"
(
    group_id bigserial NOT NULL,
    restaurant_id bigint NOT NULL,
    type group_type NOT NULL,
    phase group_phase NOT NULL,
    min_people int,
    duration_minutes int,
    organizer_id bigint,
    time_created timestamp with time zone NOT NULL DEFAULT now(),
    time_started timestamp with time zone,
    time_ordered timestamp with time zone,
    CONSTRAINT group_pk
        PRIMARY KEY (group_id),
    CONSTRAINT group_restaurant_id_fk
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurant (restaurant_id),
    CONSTRAINT group_organizer_id_fk
        FOREIGN KEY (organizer_id)
        REFERENCES "user" (user_id)
);

CREATE TABLE "order"
(
    order_id bigserial NOT NULL,
    group_id bigint NOT NULL,
    user_id bigint NOT NULL,
    data json,
    time_placed timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT order_pk
        PRIMARY KEY (order_id),
    CONSTRAINT order_group_id_fk
        FOREIGN KEY (group_id)
        REFERENCES "group" (group_id),
    CONSTRAINT order_user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES "user" (user_id)
);

CREATE TABLE order_item
(
    order_item_id bigserial NOT NULL,
    order_id bigint NOT NULL,
    item_id bigint NOT NULL,
    quantity int NOT NULL,
    data json,
    CONSTRAINT order_item_pk
        PRIMARY KEY (order_item_id),
    CONSTRAINT order_item_order_id_fk
        FOREIGN KEY (order_id)
        REFERENCES "order" (order_id),
    CONSTRAINT order_item_item_id_fk
        FOREIGN KEY (item_id)
        REFERENCES item (item_id)
);

CREATE TABLE vote
(
    user_id bigint NOT NULL,
    group_id bigint NOT NULL,
    minutes_interested int NOT NULL,
    can_drive boolean NOT NULL,
    time_placed timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT vote_pk
        PRIMARY KEY (user_id, group_id),
    CONSTRAINT vote_user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES "user" (user_id),
    CONSTRAINT vote_group_id_fk
        FOREIGN KEY (group_id)
        REFERENCES "group" (group_id)
);
