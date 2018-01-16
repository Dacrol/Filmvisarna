
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
