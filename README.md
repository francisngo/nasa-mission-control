# NASA Mission Control

NASA Mission Control is a facility that manages space flights to habitable planets, usually from the point of launch until landing or the end of the mission. 

Using the Kepler data (via CSV file) from NASA, we are able to filter out and find exoplanets that are potentially habitable for humans. 

We are then able to set up a launch date, provide a mission name, rocket type and destination for space flight. 

With this simple data entry application that is built with Node.js, Express Framework, RESTful APIs (GraphQL coming soon) and React for the front end, you are able to input a launch date to an exoplanet, view upcoming and past missions. 

> This is not an official site and is not affliated with NASA or SpaceX in any way.

Why MongoDB? 

While we can't go wrong with PostgreSQL, given the data is unstructured and because the data structure is likely to not change quite as often, it is safe to say that MongoDB would be the best choice for this type of data. SQL on the other hand is great for when the structure of the data is known and is needed to be enforced. For the planet data, it is faily simple. Data in planets are stored as strings which represents the name of the planet. There is very little relational information around each planet. Either SQL or NoSQL could work equally effectively but there is not much gain by referencing the planets. If the planets had moons, each planet could potentially reference another moon in a separate collection. In a situation like that, SQL would begin to shine. MongoDB does have some tools to add relationships between the data however it isn't as effective as a relational database. 