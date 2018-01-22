export default function viewsSetup (app) {
  app.bindViewWithJSON('a#pills-home', 'home', '/', '/json/movie-data.json', 'movies');
  app.bindView('a#pills-current', 'current', '/current', {
    movie: '<a href="http://www.imdb.com/title/tt1663662/">Pacific Rim</a>'
  });
  app.bindViewWithJSON(
    'a#pills-salonger',
    'salonger',
    '/salons',
    '/json/salong.json',
    ['salong1', 'salong2'],
    'name'
  );
}

