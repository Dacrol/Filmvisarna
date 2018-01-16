let url = location.pathname;

if (url === '/' || url === '') {
  renderView('/home.html');
}

$('a#pills-home').click(function (e) {
  e.preventDefault();
  renderView('home.html');
});

$('a#pills-test').click(function (e) {
  e.preventDefault();
  renderView('test');
});

$('a#pills-current').click(function (e) {
  e.preventDefault();
  renderView('/current', {movie: '<a href="http://www.imdb.com/title/tt1663662/">Pacific Rim</a>'});
});

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
