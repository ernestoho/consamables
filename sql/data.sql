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

SET search_path = test, pg_catalog;

--
-- Data for Name: restaurant; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY restaurant (restaurant_id, name, location, hours, url) FROM stdin;
8	Coconut Thai Cafe	{"address":{"city":"Wellesley","street":"257 Washington St","state":"MA","zip":"02481"},"latitude":42.313829,"longitude":-71.273716}	{"Monday":"11:30AM-10PM","Tuesday":"11:30AM-10PM","Friday":"11:30AM-10:30PM","Wednesday":"11:30AM-10PM","Thursday":"11:30AM-10PM","Sunday":"11:30AM-10PM","Saturday":"11:30AM-10:30PM"}	www.coconutthaicafe.com
6	Domino's Pizza	{"latitude":42.276982,"longitude":-71.237564,"address":{"city":"Needham","state":"MA","street":"240 Chestnut St","zip":"02492"}}	{"Monday":"10:30AM-12AM","Tuesday":"10:30AM-12AM","Friday":"10:30AM-12AM","Wednesday":"10:30AM-12AM","Thursday":"10:30AM-12AM","Sunday":"10:30AM-12AM","Saturday":"10:30AM-12AM"}	www.dominos.com
9	Taco Bell	{"address":{"city":"West Roxbury","street":"1560 VFW Pkwy","state":"MA","zip":"02132"},"latitude":42.267739,"longitude":-71.168602}	{"Monday":"7AM-1AM","Tuesday":"7AM-1AM","Wednesday":"7AM-1AM","Thursday":"7AM-1AM","Friday":"7AM-1AM","Saturday":"7AM-1AM","Sunday":"7AM-1AM"}	www.tacobell.com
7	Domino's Pizza	{"address":{"city":"Wellesley","street":"868 Worcester St","state":"MA","zip":"02482"},"latitude":42.305059,"longitude":-71.31391}	{"Monday":"10:30AM-1AM","Tuesday":"10:30AM-1AM","Friday":"10:30AM-3AM","Wednesday":"10:30AM-1AM","Thursday":"10:30AM-3AM","Sunday":"10:30AM-1AM","Saturday":"10:30AM-3AM"}	www.dominos.com
\.


--
-- Data for Name: group; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY "group" (group_id, restaurant_id, phase, min_people, duration, time_created, time_started, time_ordered) FROM stdin;
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
-- Data for Name: user; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY "user" (user_id, email, password_hash, password_salt) FROM stdin;
\.


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
-- Name: restaurant_restaurant_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('restaurant_restaurant_id_seq', 9, true);


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
-- PostgreSQL database dump complete
--

