# Consamables
A social networking application for crowdsourcing food-related delivery orders and group outings. Consamables is meant to change the way we order food together.

## Features

### Nearby Restaurants
Consamables shows you the restaurants in your area, along with the menu, prices, and hours for those restaurants.

### Join or Start an Order
If you want something to eat (and want others to join in), you can start an order at any time. If people are already planning to get food, you can easily add your order to the group.

### Order Queueing
If you want to let people know you're hungry for something but don't want to commit to ordering it, you can add yourself to a queue. Consamables will start an order if the queue reaches critical mass.

### Integrated Payments
Often the most complicated part of ordering in a group is settling up afterward. Consamables keeps track of what each person owes, and uses the Splitwise API to let fellow orderers resolve debts.

##Technologies

### [Dropwizard](http://www.dropwizard.io/1.0.5/docs/)
Consamables uses Dropwizard for its API backend. Dropwizard packages a bunch of useful Java libraries (Jetty, Jersey, Jackson, JDBI, etc.) into a robust toolset for creating web services.

### [React](https://facebook.github.io/react/)
Consamables is implemented as a Single Page Application and uses React for its component-based Javascript UI. With React, you define declarative, composable views, which allows you to manage encapsulated and easily debuggable state without messing with the DOM.

### [PostgreSQL](https://www.postgresql.org/)
Consamables is designed to use Postgres as a database backend. Postgres is stable, open source, and has a number of useful features that build on the SQL standard.
