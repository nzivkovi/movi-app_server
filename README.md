To download movie-app server clone git repository: https://github.com/nzivkovi/movi-app_server.git

- list of movies is at location ./resources/movies.json and moveis are loaded to the db while server is starting
- server port is configurable and it can be confiure in ./config/config.js
- to start server run comman: npm stat

REST API endpoints:
- POST /tmbd/ can be used to add new movie
- PUT /tmbd/id can be used to update existed movie with _id == id
- DELETE /tmbd/id  can be used to delete existed movie with _id == id

- GET /tmbd/ will fetch first 20 movies from db for main app screen
- GET /tmbd/?searchField=<string> will fetch first 20 movies from db that contain <string> in title for main app screen
- GET /tmbd/onScrollDown will fetch 20 more movies from db depend on that which sort flag is turn on (this enpodint should be used on scrollDown event)
- GET /tmbd/onScrollDown/?searchField=<string> will fetch 20 more movies from db that contain <string> in title and depend on that which sort flag is turn on(this enpodint should be used on scrollDown event)
- GET /tmbd/sortedByTitleAlphabetically will fetch 20 movies sorted by title alphabetically
- GET /tmbd/sortedByTitleAlphabetically/?searchField=<string> will fetch 20 movies sorted by title alphabetically that contain <string> in title
- GET /tmbd/sortedByPublicationYearDescending will fetch 20 movies sorted by publication year descending
- GET /tmbd/sortedByPublicationYearDescending/?searchField=<string> will fetch 20 movies sorted by publication year descending that contain <string> in title
- GET /tmbd/id will get data about movie with _id == id for movie details screen
