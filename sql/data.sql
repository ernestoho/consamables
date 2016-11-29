--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: test; Type: SCHEMA; Schema: -; Owner: sam
--

CREATE SCHEMA test;


ALTER SCHEMA test OWNER TO sam;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = test, pg_catalog;

--
-- Name: group_phase; Type: TYPE; Schema: test; Owner: postgres
--

CREATE TYPE group_phase AS ENUM (
    'pending',
    'active',
    'ordered'
);


ALTER TYPE group_phase OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: group; Type: TABLE; Schema: test; Owner: sam
--

CREATE TABLE "group" (
    group_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    phase group_phase NOT NULL,
    min_people integer DEFAULT 4 NOT NULL,
    duration integer,
    time_created timestamp with time zone DEFAULT now() NOT NULL,
    time_started timestamp with time zone,
    time_ordered timestamp with time zone
);


ALTER TABLE "group" OWNER TO sam;

--
-- Name: group_group_id_seq; Type: SEQUENCE; Schema: test; Owner: sam
--

CREATE SEQUENCE group_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE group_group_id_seq OWNER TO sam;

--
-- Name: group_group_id_seq; Type: SEQUENCE OWNED BY; Schema: test; Owner: sam
--

ALTER SEQUENCE group_group_id_seq OWNED BY "group".group_id;


--
-- Name: item; Type: TABLE; Schema: test; Owner: sam
--

CREATE TABLE item (
    item_id integer NOT NULL,
    name text NOT NULL,
    description text,
    price numeric(4,2),
    restaurant_id integer NOT NULL
);


ALTER TABLE item OWNER TO sam;

--
-- Name: item_item_id_seq; Type: SEQUENCE; Schema: test; Owner: sam
--

CREATE SEQUENCE item_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE item_item_id_seq OWNER TO sam;

--
-- Name: item_item_id_seq; Type: SEQUENCE OWNED BY; Schema: test; Owner: sam
--

ALTER SEQUENCE item_item_id_seq OWNED BY item.item_id;


--
-- Name: order; Type: TABLE; Schema: test; Owner: sam
--

CREATE TABLE "order" (
    order_id integer NOT NULL,
    group_id integer NOT NULL,
    user_id integer NOT NULL,
    item_id integer NOT NULL
);


ALTER TABLE "order" OWNER TO sam;

--
-- Name: order_data; Type: TABLE; Schema: test; Owner: sam
--

CREATE TABLE order_data (
    order_id integer NOT NULL,
    data json
);


ALTER TABLE order_data OWNER TO sam;

--
-- Name: order_order_id_seq; Type: SEQUENCE; Schema: test; Owner: sam
--

CREATE SEQUENCE order_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_order_id_seq OWNER TO sam;

--
-- Name: order_order_id_seq; Type: SEQUENCE OWNED BY; Schema: test; Owner: sam
--

ALTER SEQUENCE order_order_id_seq OWNED BY "order".order_id;


--
-- Name: restaurant; Type: TABLE; Schema: test; Owner: sam
--

CREATE TABLE restaurant (
    restaurant_id integer NOT NULL,
    name text NOT NULL,
    location json NOT NULL,
    hours json NOT NULL,
    url text
);


ALTER TABLE restaurant OWNER TO sam;

--
-- Name: restaurant_restaurant_id_seq; Type: SEQUENCE; Schema: test; Owner: sam
--

CREATE SEQUENCE restaurant_restaurant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE restaurant_restaurant_id_seq OWNER TO sam;

--
-- Name: restaurant_restaurant_id_seq; Type: SEQUENCE OWNED BY; Schema: test; Owner: sam
--

ALTER SEQUENCE restaurant_restaurant_id_seq OWNED BY restaurant.restaurant_id;


--
-- Name: user; Type: TABLE; Schema: test; Owner: sam
--

CREATE TABLE "user" (
    user_id integer NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    password_salt text NOT NULL
);


ALTER TABLE "user" OWNER TO sam;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: test; Owner: sam
--

CREATE SEQUENCE user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_user_id_seq OWNER TO sam;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: test; Owner: sam
--

ALTER SEQUENCE user_user_id_seq OWNED BY "user".user_id;


--
-- Name: vote; Type: TABLE; Schema: test; Owner: sam
--

CREATE TABLE vote (
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE vote OWNER TO sam;

--
-- Name: group group_id; Type: DEFAULT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "group" ALTER COLUMN group_id SET DEFAULT nextval('group_group_id_seq'::regclass);


--
-- Name: item item_id; Type: DEFAULT; Schema: test; Owner: sam
--

ALTER TABLE ONLY item ALTER COLUMN item_id SET DEFAULT nextval('item_item_id_seq'::regclass);


--
-- Name: order order_id; Type: DEFAULT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "order" ALTER COLUMN order_id SET DEFAULT nextval('order_order_id_seq'::regclass);


--
-- Name: restaurant restaurant_id; Type: DEFAULT; Schema: test; Owner: sam
--

ALTER TABLE ONLY restaurant ALTER COLUMN restaurant_id SET DEFAULT nextval('restaurant_restaurant_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "user" ALTER COLUMN user_id SET DEFAULT nextval('user_user_id_seq'::regclass);


--
-- Data for Name: group; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY "group" (group_id, restaurant_id, phase, min_people, duration, time_created, time_started, time_ordered) FROM stdin;
2	9	pending	4	\N	2016-11-27 18:00:43.516908-05	\N	\N
3	6	pending	4	\N	2016-11-28 01:07:47.78744-05	\N	\N
4	8	pending	2	\N	2016-11-28 01:11:23.541134-05	\N	\N
\.


--
-- Name: group_group_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('group_group_id_seq', 4, true);


--
-- Data for Name: item; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY item (item_id, name, description, price, restaurant_id) FROM stdin;
\.


--
-- Name: item_item_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('item_item_id_seq', 1, false);


--
-- Data for Name: order; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY "order" (order_id, group_id, user_id, item_id) FROM stdin;
\.


--
-- Data for Name: order_data; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY order_data (order_id, data) FROM stdin;
\.


--
-- Name: order_order_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('order_order_id_seq', 1, false);


--
-- Data for Name: restaurant; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY restaurant (restaurant_id, name, location, hours, url) FROM stdin;
8	Coconut Thai Cafe	{"address":{"city":"Wellesley","street":"257 Washington St","state":"MA","zip":"02481"},"latitude":42.313829,"longitude":-71.273716}	{"Monday":"11:30AM-10PM","Tuesday":"11:30AM-10PM","Friday":"11:30AM-10:30PM","Wednesday":"11:30AM-10PM","Thursday":"11:30AM-10PM","Sunday":"11:30AM-10PM","Saturday":"11:30AM-10:30PM"}	www.coconutthaicafe.com
6	Domino's Pizza	{"latitude":42.276982,"longitude":-71.237564,"address":{"city":"Needham","state":"MA","street":"240 Chestnut St","zip":"02492"}}	{"Monday":"10:30AM-12AM","Tuesday":"10:30AM-12AM","Friday":"10:30AM-12AM","Wednesday":"10:30AM-12AM","Thursday":"10:30AM-12AM","Sunday":"10:30AM-12AM","Saturday":"10:30AM-12AM"}	www.dominos.com
7	Domino's Pizza	{"address":{"city":"Wellesley","street":"868 Worcester St","state":"MA","zip":"02482"},"latitude":42.305059,"longitude":-71.31391}	{"Monday":"10:30AM-1AM","Tuesday":"10:30AM-1AM","Friday":"10:30AM-3AM","Wednesday":"10:30AM-1AM","Thursday":"10:30AM-3AM","Sunday":"10:30AM-1AM","Saturday":"10:30AM-3AM"}	www.dominos.com
9	Taco Bell	{"address":{"city":"West Roxbury","street":"1560 VFW Pkwy","state":"MA","zip":"02132"},"latitude":42.267739,"longitude":-71.168602}	{"Monday":"7AM-1AM","Tuesday":"7AM-1AM","Wednesday":"7AM-1AM","Thursday":"7AM-1AM","Friday":"7AM-1AM","Saturday":"7AM-1AM","Sunday":"7AM-1AM"}	www.tacobell.com
\.


--
-- Name: restaurant_restaurant_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('restaurant_restaurant_id_seq', 9, true);


--
-- Data for Name: user; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY "user" (user_id, email, password_hash, password_salt) FROM stdin;
\.


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('user_user_id_seq', 1, false);


--
-- Data for Name: vote; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY vote (user_id, group_id) FROM stdin;
\.


--
-- Name: group group_pk; Type: CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "group"
    ADD CONSTRAINT group_pk PRIMARY KEY (group_id);


--
-- Name: item item_pk; Type: CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY item
    ADD CONSTRAINT item_pk PRIMARY KEY (item_id);


--
-- Name: order_data order_data_pk; Type: CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY order_data
    ADD CONSTRAINT order_data_pk PRIMARY KEY (order_id);


--
-- Name: order order_pk; Type: CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT order_pk PRIMARY KEY (order_id);


--
-- Name: restaurant restaurant_pk; Type: CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY restaurant
    ADD CONSTRAINT restaurant_pk PRIMARY KEY (restaurant_id);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pk PRIMARY KEY (user_id);


--
-- Name: vote vote_pk; Type: CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_pk PRIMARY KEY (user_id, group_id);


--
-- Name: group group_restaurant_id_fk; Type: FK CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "group"
    ADD CONSTRAINT group_restaurant_id_fk FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id);


--
-- Name: item item_restaurant_id_fk; Type: FK CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY item
    ADD CONSTRAINT item_restaurant_id_fk FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id);


--
-- Name: order_data order_data_fk; Type: FK CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY order_data
    ADD CONSTRAINT order_data_fk FOREIGN KEY (order_id) REFERENCES "order"(order_id);


--
-- Name: order order_group_id_fk; Type: FK CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT order_group_id_fk FOREIGN KEY (group_id) REFERENCES "group"(group_id);


--
-- Name: order order_item_id_fk; Type: FK CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT order_item_id_fk FOREIGN KEY (item_id) REFERENCES item(item_id);


--
-- Name: order order_user_id_fk; Type: FK CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT order_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(user_id);


--
-- Name: vote vote_group_id_fk; Type: FK CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_group_id_fk FOREIGN KEY (group_id) REFERENCES "group"(group_id);


--
-- Name: vote vote_user_id_fk; Type: FK CONSTRAINT; Schema: test; Owner: sam
--

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(user_id);


--
-- PostgreSQL database dump complete
--

