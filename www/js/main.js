let url = location.pathname;

if (url === '/' || url === '') {
  renderView('/home.html');
}

bindSelector('a#pills-home', 'home.html');
bindSelector('a#pills-test', 'test');
bindSelector('a#pills-current', '/current', {movie: '<a href="http://www.imdb.com/title/tt1663662/">Pacific Rim</a>'});

function renderView (viewFile, tagArgs, selector = '#root', viewsFolder = './views/') {

  if (!(tagArgs instanceof Object)) {
    tagArgs = {};
  }
  if (viewFile.startsWith('/')) {
    viewFile = /[^/](.*)$/.exec(viewFile)[0];

  }
  if (!viewFile.endsWith('.html')) {
    viewFile = viewFile + '.html';
  }
  if (!viewsFolder.endsWith('/')) {
    viewsFolder = viewsFolder + '/';
  }
  console.log(viewFile);
  const url = viewsFolder + viewFile;
  $.get(url, function (data) { $(selector).html($.templates(data).render(tagArgs)); });
}

function bindSelector (selector, view, tagArgs) {
  $(selector).click(function (e) {
    e.preventDefault();
    renderView(view, tagArgs);
  });
}
