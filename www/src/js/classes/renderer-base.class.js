class Renderer {
  bindView (...args) {
    Renderer.bindView(...args);
  }
  renderView (...args) {
    Renderer.renderView(...args);
  }
  bindViewWithJSON (...args) {
    Renderer.bindViewWithJSON(...args);
  }

  static bindViewWithJSON (
    selector,
    view,
    url,
    jsonUrl,
    tagVariables = [],
    tagVariableKey = null
  ) {
    if (!jsonUrl.startsWith('/')) {
      jsonUrl = '/' + jsonUrl;
    }
    Renderer.bindView(selector, view, url, function () {
      $.getJSON(jsonUrl, function (json) {
        const tagArgs = {};
        tagVariables.forEach((tagVariable, index) => {
          !tagVariableKey
            ? Object.assign(tagArgs, { [tagVariable]: json[index] })
            : Object.assign(tagArgs, {
              [tagVariable]: json[index][tagVariableKey]
            });
        });
        Renderer.renderView('salonger', tagArgs);
      });
    });
  }

  static bindView (selector, view, url, tagArgs) {
    $(selector).click(function (e) {
      e.preventDefault();
      if (typeof tagArgs !== 'function') {
        Renderer.renderView(view, tagArgs);
      } else {
        // console.log(tagArgs);
        tagArgs();
      }
    });
    Renderer.bindViewToUrl(view, url, tagArgs);
  }

  static renderView (
    viewFile,
    tagArgs,
    selector = '#root',
    viewsFolder = './views/'
  ) {
    console.log(...arguments);
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
  }

  static bindViewToUrl (view, url, tagArgs) {
    $(document).ready(function () {
      let path = location.pathname;
      if (path === url && typeof tagArgs !== 'function') {
        Renderer.renderView(view, tagArgs);
      } else if (path === url) {
        tagArgs();
      }
    });
  }
}

export default Renderer;
