export default function viewsSetup (app) {
  app.bindView('a#pills-home', 'home', '/');
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

  /*  app.bindView('a#pills-salonger', 'salonger', '/salons', function () {
    $.getJSON('/json/salong.json', function (json) {
      let salonger = json;
      app.renderView('salonger', {
        salong1: salonger[0].name,
        salong2: salonger[1].name
      });
    });
  });
   */
}
