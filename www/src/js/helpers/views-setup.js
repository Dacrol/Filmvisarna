// eslint-disable-next-line
import Renderer from '../classes/renderer-base.class';
export default function viewsSetup (app) {
  // The first argument can be null if the selector already has the class pop
  app.bindViewWithJSON(
    'a#pills-home',
    'home',
    '/',
    '/json/movie-data.json',
    'movies'
  );
  app.bindView('a#pills-current', 'aktuellfilmer', '/current', {});
  app.bindViewWithJSON(
    'a#pills-salonger',
    'salonger',
    '/salons',
    '/json/salong.json',
    ['salong1', 'salong2'],
    'name'
  );
  app.bindViewWithJSON(
    null,
    'posterfilm',
    '/film',
    '/json/movie-data.json',
    'movies'
  );
  app.bindView(
    null,
    'screenings',
    '/visningar',
    /** @param {Renderer} Renderer */ async (Renderer, pathParams) => {
      let data = await Promise.all([
        $.getJSON('/json/movie-data.json'),
        $.getJSON('/json/screenings.json'),
        $.getJSON('/json/salong.json')
      ]);
      let contextData = data[1].map(screening => {
        return Object.assign(
          screening,
          {
            movieData: data[0].filter(movie => {
              return movie.title_sv === screening.movie;
            })
          },
          {
            salonData: data[2].filter(salon => {
              return salon.id === screening.salon;
            })
          }
        );
      });
      Renderer.renderView('screenings', { screenings: contextData });
    }
  );
}
