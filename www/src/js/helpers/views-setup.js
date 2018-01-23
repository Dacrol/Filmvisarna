export default function viewsSetup (app) {
  app.bindViewWithJSON('a#pills-home', 'home', '/', '/json/movie-data.json', 'movies');
  app.bindView('a#pills-current', 'aktuellfilmer', '/current', 'movie');
  app.bindViewWithJSON(
    'a#pills-salonger',
    'salonger',
    '/salons',
    '/json/salong.json',
    ['salong1', 'salong2'],
    'name'
  );
  app.bindViewWithJSON(
    '',
    'posterfilm',
    '/film',
    '/json/movie-data.json',
    'movies')
}

