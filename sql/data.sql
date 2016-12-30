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
1	Domino's Pizza	{"latitude":42.276982,"longitude":-71.237564,"address":{"city":"Needham","state":"MA","street":"240 Chestnut St","zip":"02492"}}	{"Monday":"10:30AM-12AM","Tuesday":"10:30AM-12AM","Friday":"10:30AM-12AM","Wednesday":"10:30AM-12AM","Thursday":"10:30AM-12AM","Sunday":"10:30AM-12AM","Saturday":"10:30AM-12AM"}	www.dominos.com
2	Taco Bell	{"address":{"city":"West Roxbury","street":"1560 VFW Pkwy","state":"MA","zip":"02132"},"latitude":42.267739,"longitude":-71.168602}	{"Monday":"7AM-1AM","Tuesday":"7AM-1AM","Wednesday":"7AM-1AM","Thursday":"7AM-1AM","Friday":"7AM-1AM","Saturday":"7AM-1AM","Sunday":"7AM-1AM"}	www.tacobell.com
3	Domino's Pizza	{"address":{"city":"Wellesley","street":"868 Worcester St","state":"MA","zip":"02482"},"latitude":42.305059,"longitude":-71.31391}	{"Monday":"10:30AM-1AM","Tuesday":"10:30AM-1AM","Friday":"10:30AM-3AM","Wednesday":"10:30AM-1AM","Thursday":"10:30AM-3AM","Sunday":"10:30AM-1AM","Saturday":"10:30AM-3AM"}	www.dominos.com
4	Coconut Thai Cafe	{"address":{"city":"Wellesley","street":"257 Washington St","state":"MA","zip":"02481"},"latitude":42.313829,"longitude":-71.273716}	{"Monday":"11:30AM-10PM","Tuesday":"11:30AM-10PM","Friday":"11:30AM-10:30PM","Wednesday":"11:30AM-10PM","Thursday":"11:30AM-10PM","Sunday":"11:30AM-10PM","Saturday":"11:30AM-10:30PM"}	www.coconutthaicafe.com
\.


--
-- Data for Name: group; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY "group" (group_id, restaurant_id, type, phase, min_people, duration, time_created, time_started, time_ordered) FROM stdin;
\.


--
-- Name: group_group_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('group_group_id_seq', 4, true);


--
-- Data for Name: menu_section; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY menu_section (menu_section_id, restaurant_id, name) FROM stdin;
1	4	Appetizers
2	4	Thai Herbs Soups
3	4	Yum (Thai Salad)
4	4	Favorite Thai Noodle Soups
5	4	Thai Pan Fried
6	4	Coconut Curry Dishes
7	4	Wok-ing Noodles Dishes
8	4	Wok-ing Rice Dishes
9	4	Special Thai Dishes
10	4	Side Order
11	4	Desserts
12	4	Drinks
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: test; Owner: sam
--

COPY item (item_id, menu_section_id, name, description, price) FROM stdin;
1	1	Grilled Satay	Thai barbecued meat grilled, served with cucumber salad and peanut sauce.	6.75
2	1	Seaweed Salad	Imported Japanese seaweed salad.	5.95
3	1	Grilled Tofu	Grilled marinated tofu with mixed vegetables and topped with yellow curry sauce or ginger sauce.	6.95
4	1	Thai Rolls or Veggies Rolls	Crispy fried spring rolls, served with sweet sauce.	5.75
5	1	Golden Triangle	Crispy fried tofu, served with ground peanut and sweet sauce.	5.50
6	1	Edamame	Steamed green peas with lightly salt.	5.25
7	1	Bangkok Fresh Rolls	Fresh vegetables, vermicelli noodles, mixture of shrimp, mint leaves wrapped in rice skins, served with mixed hoisin sauce.	5.95
8	1	Tod Man	Thai traditional shrimp cake with Thai herbs and spices fried to golden brown, served with ground peanut, and cucumber in Thai sweet sauce.	7.25
9	1	Chicken Wings	Marinated with Thai herbs, deep fried to perfection, served with Thai sweet sauce.	6.25
10	1	Coconut Pancake	Mixed flour pancake topped with shredded coconut meat, served with Thai sweet sauce.	6.50
11	1	Shumai	Shrimp stuffs wrapped in wonton skins, served with black sweet soy sauce.	6.50
12	1	Pork Dumpling	Pork stuffs wrapped in wonton skins, served with black sweet soy sauce.	6.25
13	1	Crab Rangoon	Imitated crab meat with cream cheese wrapped in wonton sheets and deep fried to golden brown, served with sweet sauce.	6.95
14	1	Roti	Deep fried scallion pancake served with beef.	6.50
15	2	Tom Kah Soup	Healthy Thai herbs with coconut milk broth and mushrooms cooked to perfect taste, choice of tofu, chicken, shrimps, fish filets or veggies.	3.50
16	2	Tom Yum Soup Ped Nid Noi	Thai herbs soup cooked to hot and sour with mushrooms, choice of tofu, chicken shrimps, fish filets or veggies.	3.50
17	2	Vegetable Soup	Mixed vegetable broth and Thai herbs and spices cooked with oriental veggies, choice of tofu, chicken, shrimps, fish filets or veggies.	3.50
18	3	Chicken Salad	Grilled chicken satays on top of garden salad, boiled egg, and golden tofu, served with peanut sauce dressing or oriental dressing.	8.00
19	3	Pra Nur	Grilled beef strips mixed with Thai seasonings, Thai spices, red onions, white onions, scallions, hot peppers, Served on the bed of mixed salads.	11.95
20	3	Pra Koong	Cooked shrimps mixed with Thai seasonings, Thai spices, red onions, white onions, scallions, hot peppers, Served on the bed of mixed salads.	12.95
21	3	Pra Seafood	Shrimps, scallops, squids and salmon bits mixed with Thai seasonings, Thai spices, red, white onions, scallions, hot peppers. Served on the bed of mixed salads.	12.95
22	3	Yum Hed Kai Koong	Grilled shrimps and cooked chicken mixed with chili paste, Thai seasonings, red onions, white onions, scallions, gingers, oriental mushrooms, roasted peanuts, hot peppers, coriander served on the bed of mixed salads.	11.95
23	3	Som Tam Koong	Sliced green papaya with shrimps, tomatoes, string beans, peanuts, fresh chili, garlic, mixed with lime juice and Thai sauce. (added dried shrimps to a full flavor of thai's favorite salad called "Som Tum Thai").	7.95
24	4	S Kuay Teaw Nam	Bangkok style noodle soup, bean sprouts, Chinese vegetable fried onions and garlic, with your favorite meat.	9.95
25	4	T Kuay Teaw Heang Salad	Bangkok style noodle salad, bean sprouts, Chinese vegetable served with Thai chef's dressing, ground peanuts, fried onions and garlic, a piece of lime and your favorite meat on top.	9.95
26	4	U Bangkok Canal Noodle Soups	(Noodle Nam Tok). Beef or pork only the tasty Bangkok style noodle dish, rich spicy broths and fresh water vegetables.	9.95
27	4	V Tom Yum Noodle Soup	Hot and sour soup with oriental vegetables, rice noodles, topped with ground peanut and fried garlic.	9.95
28	5	Sweet Basil Stir Fry	With onions, green and red peppers, carrots, bamboo slices stir fried with Thai chef hot sauce.	10.95
29	5	Kratiam Prik Thai Stir Fry	Garlic and pepper stir fried with Thai sauce, pineapples, cucumbers, served with rice.	10.95
30	5	Prik Pao Sauce	Assorted veggies stir fried with Thai chef chili paste sauce.	10.95
31	5	Ginger and Scallion Stir Fry	Thai spiced oyster sauce stir fried with onions, mushrooms, carrots, gingers, Italian peppers and scallions.	10.95
32	5	Chili and Garlic Stir Fry	Chopped garlic and chili sauce stir fried with tomatoes paste, gingers, scallions and assorted vegetables.	10.95
33	5	Thai Hot Sweet and Sour Stir Fry	Hot chili and sweet and sour sauce cooked with assorted vegetables.	10.95
34	5	BKK Style Black Bean Sauce	Assorted veggies stir fried with Thai chef black bean sauce.	10.95
35	5	Zucchini N Curry	Onions, mushrooms, carrots, tomatoes, green peas stir fried in Thai curry spices with beaten egg.	10.95
36	5	Tamarind Sauce Stir Fry	Thai tamarind sauce stir fried with onions, mushrooms, carrots, scallions, red and green peppers, zucchinis, pineapples and sliced gingers.	10.95
37	5	Thai Sweet and Sour Sauce	Assorted vegetables stir fried with Thai sweet and sour sauce.	10.95
38	5	Broccoli Stir Fry	Thai sauce stir fried with broccoli, mushrooms and carrots.	10.95
39	5	Pineapple and Peppers Stir Fry	Curry powder cooked with onions, carrots, green peppers, red peppers, baby corns, tomatoes, scallions and Thai sauce.	10.95
40	5	Baby Corns and Mushrooms Stir Fry	Thai Garlic Sauce cooked with onions, mushrooms, carrots, scallions, tomatoes	10.95
41	5	Snow Peas	Pan fried snow peas in Thai garlic sauce with onions, mushrooms, carrots scallions, and tomatoes.	10.95
42	5	Cashew Nut Stir Fry	Thai sauce stir fried with assorted vegetables.	10.95
43	5	Rama Long song	Steamed assorted vegetables with peanut sauce.	10.95
44	6	Red Curry	Thai herbs and red curry paste with coconut milk, string beans, green peppers, red peppers, bamboo slices, carrots and sweet basil.	10.95
45	6	Yellow Curry	Thai herbs and yellow curry paste with coconut milk, onions, carrots, green peppers, red peppers, zucchinis, tomatoes and pineapples.	10.95
46	6	Green Curry	Thai herbs spices and green curry paste with coconut milk, egg plants, zucchinis, bamboo slices, green peppers, red peppers and sweet basil.	10.95
47	6	Massaman Curry	Thai spices and peanut curry paste pan fried with coconut milk, onions, carrots potatoes, tomatoes and roasted peanuts.	10.95
102	12	Juice	\N	1.50
100	12	Bottle of Spring Water	\N	2.00
48	6	Panang Curry	Thai herbs and panang curry pan fried with coconut milk, string beans, carrots, snow peas, green peas, green peppers, red peppers, hot peppers, ground peanuts, shredded lime leaves and sweet basil.	10.95
49	6	Choo Chee Curry	Choo-chee curry paste and tamarind pan fried with coconut milk, green peas, snow peas, green peppers, zucchinis, onions, tomatoes.	10.95
50	6	Prik King Curry	Prik king curry paste with coconut milk, sweet chili sauce, carrots, zucchinis, onions, green, red peppers and mint leaves.	10.95
51	6	Prik King Thai Country Style	Prik king curry and Thai herbs stir fried with string beans, cashew nuts, carrots, mushrooms, green peppers, red peppers, sweet basil and Thai sauce. (no coconut milk added).	10.95
53	7	Pad Thai Noodles Bangkok Style	Thai rice noodles pan fried with egg, tofu, Thai hot chili sauce, bean sprouts scallions, ground peanuts and pad Thai sauce.	9.25
54	7	Crystal Pad Thai Noodles	The traditional pad Thai is made with crystal noodles.	9.25
55	7	Crispy Pad Thai Noodles	Crispy yellow noodles stir fried with egg, scallions, ground peanuts, bean sprouts and pad Thai sauce.	9.25
56	7	Crispy Pad Thai Noodles Bangkok Style	Crispy yellow noodles stir fried with Thai hot chili sauce, egg, scallions, ground peanuts, bean sprouts and pad Thai sauce.	9.25
57	7	Pad Kee Mow Drunken Noodles	Stir fried wide rice noodles with Thai hot basil sauce, egg, sweet basil and assorted vegetables.	9.25
58	7	Rad Na Noodles	Thai gravy sauce pan fried with choice of Chinese broccoli or assorted vegetables served on a bed of wide rice noodles.	9.25
59	7	Chicken Noodles	Pan fried chicken with egg, bean sprouts, ground peanuts, lettuce and Thai soy sauce.	9.25
60	7	Pad See You	Wide rice noodles pan fried with egg, Chinese broccoli and Thai sweet soy sauce.	9.25
61	7	Lo Mein Noodle Bangkok Style	Yellow noodles stir fired with vegetables, and Thai sauce.	9.25
62	7	Udon Noodles Stir Fried	Japanese noodles stir fried with vegetables, and Thai sauce.	9.25
63	8	Thai Fried Rice	Pan fried jasmine rice with onions, green peas, carrots, scallions and egg, served with tomatoes and cucumbers.	9.95
64	8	Basil Fried Rice	Pan fried jasmine rice with basil, onions, egg, snow peas and Thai chill sauce, served with tomatoes and cucumbers.	9.95
65	8	Garlic Fried Rice	Pan fried jasmine rice with crushed garlic, white pepper, red and green peppers, egg and carrots, served with tomatoes and cucumbers.	9.95
66	8	Indonesian Fried Rice	Fried rice indonesian style with crispy chicken on top, served with fried egg, tomatoes, cucumbers and sweet sauce.	10.95
67	8	Thai Curry Fried Rice	Curry pasts fried rice Bangkok style, peppers, string bean with your favorite meat, served with tomatoes and cucumbers.	10.95
68	9	A Chicken Asparagus	Pan fried of asparagus, mushrooms, onions, carrots, tomatoes, cashew nuts with Thai sauce.	10.95
69	9	B Kai Sub Krapao	Ground chicken stir fried with hot chili, peppers, onions, garlic, basil and Thai chili sauce.	10.50
70	9	C Chicken Mango Curry	Yellow coconut curry sauce with summer squash, onions, green peppers, red peppers, carrots and tomatoes.	11.50
71	9	D Kaeng Ped Yang	Chili paste coconut curry with string beans, tomatoes, broccoli, hot peppers, green and red peppers, Italian peppers, green peas, snow peas, and tomatoes.	14.95
72	9	E Pla Choo Chee	Grilled filet of salmon with choo chee curry sauce, asparagus, onions, mushrooms, green, red peppers, Italian peppers, green peas, snow peas, and tomatoes.	14.95
73	9	F Pla Rad Prik	Deep fried filet of tilapia fish with hot sweet Thai chili sauce, chopped green and red peppers, onions, tomatoes, and garlic, served on a bed of salads.	15.95
74	9	G Seafood a La Phuket	Stir fried of shrimps, scallops, squids, mussels with our chef's spicy sauce, onions, mushrooms, served on a bed of salads.	14.95
75	9	H Seafood a La Samui	Fried soft shell crabs, large shrimps, squids, stir fried with thailand's southern style sauce, Chinese eggplants, mushrooms, onions, peppers served on bed of salads.	15.95
76	9	I KaNom Chine Keaw Wan	Green coconut curry, Chinese eggplants, bamboo slices, peppers, basil with Thai spaghetti (ka nom chine) and chicken tenders marinated in Thai spices and grilled to perfection on top.	11.95
77	9	J Nur Pad Namman Hoy	Stir fried beef with mushrooms, scallions, cashew nuts and Thai chef's sauce, served on rice.	10.75
78	9	K Tofu Ginger Noodles	Steamed tofu with ginger sauce, served with spinach noodles.	10.50
79	9	L Udon n Curry	Chicken coconut curry with udon noodles. (Japanese noodle).	10.95
80	9	M Yum Woon Sen	Crystal noodles mixed with yum Thai sauce and ground chicken, shrimps, served with salad.	10.95
81	9	N Laab Kai Sub	Cooked ground chicken mixed with Thai chef dressing and chili powder, served with Thai salad.	10.95
82	9	O Grilled Fish Black Bean Sauce	Trout fish grilled to perfection, topped with vegetables stir fried with Thai black bean sauce.	15.95
83	9	P Pad Pak Boong	Ong choy (oriental vegetable) stir fried with Thai sauce, chili, ground chicken, shrimps, served with steamed rice.	10.95
84	9	Q Nur Nam Tok Beef Water Fall	Grilled sliced beef mixed with Thai chef salad dressing, onions, mints, chili, and Thai herbs, served with Thai salad.	11.95
85	9	R Tilapia N Spicy Ginger Scallion	Chunk of deep fried tilapia filet stir fried with Thai chili ginger sauce, onions, mushrooms, celery, peppers.	15.95
86	10	Steamed White Rice	\N	1.50
87	10	Brown Rice	\N	1.50
88	10	Fried Rice	\N	4.00
89	10	Steamed Noodle	\N	2.50
90	10	Steamed Vegetables	\N	4.00
91	10	Pad Thai Noodle	\N	4.00
92	10	Udon Noodle	\N	3.00
93	10	Sticky Rice	\N	2.50
94	11	Mangoes with Sweet Sticky Rice	Coconut milk added.	6.00
95	11	Fried Banana	\N	4.00
96	12	Thai Ice Tea	\N	2.75
97	12	Thai Ice Tea with Boba	\N	3.75
98	12	Thai Ice Coffee	\N	2.75
99	12	Thai Ice Coffee with Boba	\N	3.75
101	12	Soda	\N	1.50
52	7	Pad Thai Noodles	Thai rice noodles pan fried with egg, bean sprouts, scallions, ground peanuts and pad Thai sauce.	9.25
\.


--
-- Name: item_item_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('item_item_id_seq', 102, true);


--
-- Name: menu_section_menu_section_id_seq; Type: SEQUENCE SET; Schema: test; Owner: sam
--

SELECT pg_catalog.setval('menu_section_menu_section_id_seq', 12, true);


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

