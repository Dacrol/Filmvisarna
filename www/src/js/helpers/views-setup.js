// eslint-disable-next-line
import Renderer from '../classes/renderer-base.class';
import Salon from '../classes/salon.class';
import Booking from '../classes/booking.class';
// eslint-disable-next-line
import App from '../classes/app.class';

/**
 * @export
 * @param {App} app
 */
export default function viewsSetup (app) {
  app.bindViewWithJSON(
    'mypage',
    '/mypage',
    '/json/movie-data.json',
    'movies',
    () => {
      $('#sign-out').on('click', function (event) {
        event.preventDefault();
        // @ts-ignore
        app.logInHandler.signOut();
      });
    }
  );

  // The first argument can be null if the selector already has the class pop
  app.bindViewWithJSON('home', '/', '/json/movie-data.json', 'movies', () => {
    // @ts-ignore
    $('.owl-carousel').owlCarousel({
      items: 1,
      merge: false,
      loop: true,
      video: true,
      nav: true,
      lazyLoad: false,
      autoplay: true,
      autoplayHoverPause: true,
      navText: ['<', '>'],
      dots: true,
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        768: {
          items: 1,
          nav: false
        },
        1000: {
          items: 1,
          nav: true
        }
      },
      onPlayVideo: function (event) {
        $('.white-space').addClass('h-0');
        $('.poster').hide('puff', { percent: 125 }, 400);
      },
      onStopVideo: function (event) {
        $('.white-space').removeClass('h-0');
        $('.poster').show('puff', { percent: 145 }, 450);
      }
    });
    // TODO: trigger stopVideo on the end of youtubes
  });
  app.bindViewWithJSON(
    'aktuellfilmer',
    '/current',
    '/json/movie-data.json',
    'movies'
  );
  app.bindViewWithJSON('salonger', '/salons', '/json/salong.json', 'salons');
  app.bindViewWithJSON(
    'salon-template',
    '/salontemplate',
    '/json/salong.json',
    'salons',
    (contextData) => {
      console.log(app.currentBooking);
      let salon;
      if (app.currentBooking) {
        salon = new Salon(app, app.currentBooking.screening.salon);
      } else {
        salon = new Salon(app, contextData.pathParams || 0);
      }
      console.log(salon);
      salon.renderSeats();

      if (!app.logInHandler.currentUser || !app.currentBooking) {
        $('#booking').prop('disabled', true);
      }

      $('#booking').on('click', function (event) {
        event.preventDefault();
        if (app.currentUser) {
          app.allBookings.push(app.currentBooking);
          // console.log(app);
          app.changePage('/boka');
        }
      });
    }
  );
  app.bindView('boka', '/boka', (Renderer, pathParams) => {
    console.log(app.currentBooking);
    if (app.currentBooking) {
      Renderer.renderView('boka', app.currentBooking, () => {
        console.log('Success');
      });
    }
  });
  app.bindViewWithJSON('bio', '/bios', '/json/movie-data.json', 'movies');
  app.bindViewWithJSON('salonger', '/salons', '/json/salong.json', 'salons');
  app.bindViewWithJSON(
    'posterfilm',
    '/film',
    '/json/movie-data.json',
    'movies',
    async (data) => {
      let screenings = await JSON._load('screenings.json');
      // let movies = await JSON._load('movie-data.json');
      let movies = data.movies;
      if (isNaN(data.pathParams)) {
        data.pathParams = movies.findIndex((movie) => {
          return data.pathParams === stringToSlug(movie.title_sv);
        });
      }
      let list = screenings.filter((screening) => {
        if (movies[data.pathParams].title_sv === screening.movie) {
          return true;
        }
      });
      // if there is more then 3 dates then change to today and tomorrow and last on date of the movie
      list.forEach((screening) => {
        $('#up-coming-movies')
          .append(
            `<a class="dropdown-item" href="/salontemplate/${
              screening.salon
            }">${screening.date}</a>`
          )
          .children()
          .last()
          .on('click', function (event) {
            event.preventDefault();
            // @ts-ignore
            app.currentBooking = new Booking(screening, app);
            app.changePage('/salontemplate');
          });
      });
    }
  );
  app.bindView(
    'screenings',
    '/visningar',
    /** @param {Renderer} Renderer */ async (Renderer, pathParams) => {
      let data = await Promise.all([
        $.getJSON('/json/movie-data.json'),
        $.getJSON('/json/screenings.json'),
        $.getJSON('/json/salong.json')
      ]);
      data[0].forEach((movie, index) => {
        Object.assign(movie, { id: index });
      });
      let contextData = data[1].map((screening) => {
        return Object.assign(
          screening,
          {
            movieId: data[0].findIndex((movie) => {
              return movie.title_sv === screening.movie;
            }),
            movieData: data[0].filter((movie) => {
              return movie.title_sv === screening.movie;
            })
          },
          {
            salonData: data[2].filter((salon) => {
              return salon.id === screening.salon;
            })
          }
        );
      });
      const dateOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      contextData.forEach((screening) => {
        const date = new Date(screening.date).toLocaleDateString(
          'sv-SE',
          dateOptions
        );
        Object.assign(screening, {
          dateString: capitalizeFirstLetter(date)
        });
      });
      Renderer.renderView('screenings', { screenings: contextData });
    }
  );
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Slugifies a string, for example: Pacific Rim -> pacific-rim
 *
 * @param {string} str
 * @returns {string}
 */
function stringToSlug (str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // öäå -> oaa
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-');
}
