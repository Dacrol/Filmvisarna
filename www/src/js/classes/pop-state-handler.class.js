import Base from './base.class';
const urlRegex = /(\W[^/]*)\/?(.*)/;
class PopStateHandler extends Base {
  constructor () {
    super();
    this.viewMethods = {};
    // this.changePage();
    window.addEventListener('popstate', () => this.changePage());
    $(function () {
      $('header a').removeClass('active');
      $(`header a[href="${location.pathname}"]`).addClass('active');
    });
    this.addEventHandler();
  }

  bindViewToPopState (url, viewMethod) {
    // console.log(this.viewMethods);
    Object.assign(this.viewMethods, { [url]: viewMethod });
  }

  addEventHandler () {
    let that = this;
    // $('a.pop').unbind('click');
    $(document).off('click', 'a.pop');
    $(document).on('click', 'a.pop', function (e) {
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      that.changePage();
      e.preventDefault();
    });
  }

  changePage (newUrl) {
    if (newUrl && !(newUrl.startsWith('/'))) {
      history.pushState(null, null, '/' + newUrl);
    } else if (newUrl) {
      history.pushState(null, null, newUrl);
    }
    let url = location.pathname;
    let urlParts = urlRegex.exec(url);
    // console.log(urlParts[1])
    $('header a').removeClass('active');
    $(`header a[href="${urlParts[1]}"]`).addClass('active');
    let urlPart = urlParts[1];
    this.viewMethods[urlPart]();
    this.addEventHandler();
    window.scrollTo(0, 0);
  }
}

export default PopStateHandler;
