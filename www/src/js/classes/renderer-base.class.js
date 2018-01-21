class Renderer {
  bindView (...args) {
    Renderer.bindView(...args);
  }

  static bindView (selector, view, tagArgs, url = null) {
    $(selector).click(function (e) {
      e.preventDefault();
      Renderer.renderView(view, tagArgs);
    });
  }

  static renderView (
    viewFile,
    tagArgs,
    selector = '#root',
    viewsFolder = './views/'
  ) {
    if (!(tagArgs instanceof Object)) {
      tagArgs = {};
    }
    if (viewFile.startsWith('/')) {
      viewFile = /[^/](.*)$/.exec(viewFile)[0];
    }
    if (!(viewFile.endsWith('.html') || viewFile.endsWith('.htm'))) {
      viewFile = viewFile + '.html';
    }
    if (!viewsFolder.endsWith('/')) {
      viewsFolder = viewsFolder + '/';
    }
    const url = viewsFolder + viewFile;
    $.get(url, function (data) {
      $(selector).html($.templates(data).render(tagArgs));
    });
    return url;
  }
}

export default Renderer;
