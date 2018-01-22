class PopStateHandler {
  constructor () {
    this.addEventHandler();
    this.changePage();
    window.addEventListener('popstate', () => this.changePage());
  }

  addEventHandler () {
    let that = this;

    $(document).on('click', 'a.pop', function (e) {
      let href = $(this).attr('href');
      history.pushState(null, null, href);

      that.changePage();

      e.preventDefault();
    });
  }

  changePage () {
    let url = location.pathname;

    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active');

    let urls = {
      '/': 'home',
      '/current': 'aktuella',
      '/salons': 'salonger'
    };

    let methodName = urls[url];
    this[methodName]();
  }

  home () {
    // $('main').empty();
    // console.log('hem')
  }
  aktuella () {
    // $('main').empty();
    // console.log('aktuella')
  }
  salonger () {
    // $('main').empty();
    // console.log('salonger')
  }
}

export default PopStateHandler;
