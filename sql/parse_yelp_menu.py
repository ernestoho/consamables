import requests
from bs4 import BeautifulSoup
import psycopg2
from pprint import pprint

page = requests.get('https://www.yelp.com/menu/coconut-thai-cafe-wellesley/full-menu').text

soup = BeautifulSoup(page, 'html.parser')
menu = soup.find('div', class_='menu-sections')
headings = [x.find('h2').string.strip() for x in menu.find_all('div', class_='menu-section-header')]
sections = menu.find_all('div', class_='menu-section')
all_items = []

conn = psycopg2.connect(dbname='consamables', user='sam', password='pizza')
cur = conn.cursor()
restaurant_id = 8

section_query = """
                INSERT INTO test.menu_section (restaurant_id, name)
                VALUES (%s, %s)
                RETURNING menu_section_id
                """

item_query = """
             INSERT INTO test.item (menu_section_id, name, description, price)
             VALUES (%(menu_section_id)s, %(name)s, %(description)s, %(price)s)
             """

for heading, section in zip(headings, sections):

    cur.execute(section_query, [restaurant_id, heading])
    menu_section_id = cur.fetchone()[0]

    soup = [x.find('div', class_='media-story') for x in section.find_all('div', class_='menu-item')]
    items = []

    for element in soup:
        details = element.find('div', class_='menu-item-details')
        name = details.find('h4') if details.find('h4').string else details.find('h4').find('a')
        description = details.find('p', class_='menu-item-details-description')
        prices = element.find('div', class_='menu-item-prices')
        if prices.find('ul'):
            price = prices.find('ul').find('li')
        elif prices.find('table'):
            price = prices.find('table').find('tr').find('td')
        
        item = {
            'menu_section_id': menu_section_id,
            'name': name.string.strip(),
            'description': description.string.strip() if description else None,
            'price': float(price.string.strip()[1:])
        }

        cur.execute(item_query, item)

        items.append(item)

    conn.commit()

    all_items.append(items)

pprint(all_items)

cur.close()
conn.close()
