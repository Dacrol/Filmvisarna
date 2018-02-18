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
    ['/json/movie-data.json', '/json/bookings.json'],
    '',
    (data) => {
      let myBookings = data[1].filter((booking) => {
        return booking.user.id === app.currentUser.id;
      })
      let now = new Date()
      myBookings.forEach(booking => {
        let date = new Date(booking.screening.date)
        let target = date > now ? $('#current-bookings') : $('#past-bookings');
        console.log(target)
        target.append(`
        <a class="text-light" alt="" href="/bokning/${booking.confirmationNumber}">
        <dt> ${booking.screening.movie} </dt>
        <dl> ${toSwedishDate(date)} </dl>
        </a>
        `);
      })

      console.log(data);

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
      salon.renderSeats().then(async () => {
        if (app.currentBooking && app.currentBooking.screening) {
          let screening = app.currentBooking.screening;
          let occupied = await Booking.getOccupied(screening);
          occupied.forEach((seat) => {
            $(`.seat[data-seatnumber="${seat.seatnumber}"]`).addClass(
              'unavailable'
            );
            salon.unavailableSeats.push(+seat.seatnumber);
          });
          salon.refreshSeatEvents();
        }
        if (!app.currentBooking || app.currentBooking.seats.length < 1) {
          $('#booking').prop('disabled', true);
        }
      });

      if (!app.logInHandler.currentUser) {
        $('#booking').addClass('disabled');
      }

      $('#booking').on('click', function (event) {
        event.preventDefault();
        if (app.currentUser && app.currentBooking) {
          if (!app.currentBooking.user) {
            app.currentBooking.user = app.currentUser;
          }
          let seats = $('.selected')
            .map(function () {
              return $(this).data();
            })
            .get();
          if (seats.length > 0) {
            app.currentBooking.seats = seats;
            // console.log(app);
            app.changePage('/boka');
          }
        } else if (!app.currentUser) {
          $('#login-modal').modal('toggle');
        }
      });
    }
  );
  app.bindView('boka', '/boka', (Renderer, pathParams) => {
    if (app.currentBooking) {
      Renderer.renderView('boka', app.currentBooking, async (booking) => {
        // console.log(booking);
        let tickets = booking.seats.length;
        booking.ticketTypes = { adults: tickets, juniors: 0, seniors: 0 };
        // console.log(booking, app.currentBooking);
        $('#adults').text(tickets);
        let updatePrice;
        (updatePrice = () => {
          $('#price').text(
            booking.price ||
              booking.ticketTypes.adults * 85 +
                booking.ticketTypes.seniors * 75 +
                booking.ticketTypes.juniors * 65
          );
        })();
        // updatePrice();
        $('.plus-minus.plus').click(function (e) {
          e.preventDefault();
          let quantity = parseInt(
            $(this)
              .siblings('.quantity')
              .first()
              .text()
              .toString()
          );
          if (+$('#juniors').text() + +$('#seniors').text() < tickets) {
            let type = $(this)
              .siblings('.quantity')
              .text(quantity + 1)
              .prop('id');
            booking.ticketTypes[type] = quantity + 1;
            booking.ticketTypes.adults--;
            $('#adults').text(booking.ticketTypes.adults);
            updatePrice();
            // console.log(booking);
          }
        });

        $('.plus-minus.minus').click(function (e) {
          e.preventDefault();
          let quantity = parseInt(
            $(this)
              .siblings('.quantity')
              .text()
              .toString()
          );
          if (quantity > 0) {
            let type = $(this)
              .siblings('.quantity')
              .text(quantity - 1)
              .prop('id');
            booking.ticketTypes[type] = quantity - 1;
            booking.ticketTypes.adults++;
            $('#adults').text(booking.ticketTypes.adults);
            updatePrice();
            // console.log(booking);
          }
        });
        $('#booking-confirm').on('click', async function (event) {
          event.preventDefault();
          if (!app.currentUser) {
            $('#login-modal').modal('show');
            return;
          }
          if (!booking.user) {
            booking.user = app.currentUser;
          }
          const confirmationNumber = await booking.save();
          app.changePage('/bokning/' + confirmationNumber);
        });
      });
    } else {
      app.changePage('/visningar'); // Redirect if not actually booking
    }
  });
  app.bindView('confirmation', '/bokning', async (Renderer, pathParams) => {
    try {
      let booking =
        app.currentBooking &&
        app.currentBooking.confirmationNumber &&
        app.currentBooking.confirmationNumber === pathParams
          ? app.currentBooking
          : pathParams
            ? await Booking.fetch(pathParams)
            : void app.changePage(
              app.currentBooking.confirmationNumber
                ? '/bokning' + app.currentBooking.confirmationNumber
                : '/'
            );
      let user = app.currentUser || (await app.logInHandler.verifySession());
      if (booking && user) {
        Renderer.renderView('confirmation', booking);
      } else {
        throw new Error('Unauthorized');
      }
    } catch (e) {
      app.changePage('/');
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
            }">${toSwedishDate(new Date(screening.date))}</a>`
          )
          .children()
          .last()
          .on('click', function (event) {
            event.preventDefault();
            // @ts-ignore
            app.currentBooking = new Booking(screening);
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
      contextData.forEach((screening) => {
        const date = toSwedishDate(new Date(screening.date));
        Object.assign(screening, {
          dateString: date
        });
      });
      Renderer.renderView('screenings', { screenings: contextData });
    }
  );
}

function toSwedishDate (date) {
  const dateOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  return capitalizeFirstLetter(date.toLocaleDateString(
    'sv-SE',
    dateOptions
  ));
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
