class Renderer {
  /**
   * Binds a view to a selector
   *
   // @ts-ignore
   * @param {string} selector
   // @ts-ignore
   * @param {string} view
   // @ts-ignore
   * @param {string} url
   // @ts-ignore
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   * @memberof Renderer
   */
  bindView (...args) {
    // @ts-ignore
    Renderer.bindView(...args);
  }

  /**
   * Binds a view to a selector and a URL, and fetches JSON data to use as tag arguments. For more complex operations than basic JSON fetching, please use the normal bindView with tagArgs supplied as a function.
   *
   // @ts-ignore
   * @param {string} selector
   // @ts-ignore
   * @param {string} view
   // @ts-ignore
   * @param {string} url
   // @ts-ignore
   * @param {string} jsonUrl
   // @ts-ignore
   * @param {string[]} tagVariables name of the tags as they are written in the html template file, for example ['salong1', 'salong2'] for a template with the tags {{:salong1}} & {{:salong2}}
   // @ts-ignore
   * @param {string} [tagVariableKey] name of the object key that holds the desired data, for example: 'name' in salons.json
   * @memberof Renderer
   */
  bindViewWithJSON (...args) {
    // @ts-ignore
    Renderer.bindViewWithJSON(...args);
  }

  /**
   * Renders a view
   *
   // @ts-ignore
   * @param {string} viewFile
   // @ts-ignore
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   // @ts-ignore
   * @param {string} [selector='#root'] default #root
   // @ts-ignore
   * @param {string} [viewsFolder='./views/'] default ./views/
   * @memberof Renderer
   */
  renderView (...args) {
    // @ts-ignore
    Renderer.renderView(...args);
  }

  /**
   * Binds a view to a selector and a URL, and fetches JSON data to use as tag arguments. For more complex operations than basic JSON fetching, please use the normal bindView with tagArgs supplied as a function.
   *
   * @static
   * @param {string} selector
   * @param {string} view
   * @param {string} url
   * @param {string} jsonUrl
   * @param {string[]} tagVariables name of the tags as they are written in the html template file, for example: ['salong1', 'salong2'] for a template with the tags {{:salong1}} & {{:salong2}}
   * @param {string} [tagVariableKey] name of the object key that holds the desired data, for example: 'name' in salons.json
   * @memberof Renderer
   */
  static bindViewWithJSON (
    selector,
    view,
    url,
    jsonUrl,
    tagVariables,
    tagVariableKey
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

  /**
   * Binds a view to a selector
   *
   * @static
   * @param {string} selector
   * @param {string} view
   * @param {string} url
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   * @memberof Renderer
   */
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

  /**
   * Renders a view
   *
   * @static
   * @param {string} viewFile
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   * @param {string} [selector='#root'] default #root
   * @param {string} [viewsFolder='./views/'] default ./views/
   * @memberof Renderer
   */
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
  /**
   * Binds a view to a URL
   *
   * @static
   * @param {string} view
   * @param {string} url
   * @param {Object} tagArgs
   * @memberof Renderer Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   */
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
