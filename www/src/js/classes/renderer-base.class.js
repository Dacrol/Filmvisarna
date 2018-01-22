/** Class for rendering views */
class Renderer {
  /**
   * Binds a view to a selector
   *
   * @param {string} selector
   * @param {string} view
   * @param {string} url
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function
   * @memberof Renderer
   */
  bindView (selector, view, url, tagArgs) {
    // @ts-ignore
    Renderer.bindView(...arguments);
  }

  /**
   * Binds a view to a selector and a URL, and fetches JSON data to use as tag arguments. For more complex operations than basic JSON fetching, please use the normal bindView with tagArgs supplied as a function.
   *
   * @param {string} selector
   * @param {string} view
   * @param {string} url
   * @param {string} jsonUrl
   * @param {string[]|string} tagVariables name of the tags as they are written in the html template file, for example: ['salong1', 'salong2'] for a template with the tags {{:salong1}} & {{:salong2}}. Pass a single string to access the entire JSON object as is.
   * @param {string} [tagVariableKey] name of the object key that holds the desired data, for example: 'name' in salons.json
   * @memberof Renderer
   */
  bindViewWithJSON (selector, view, url, jsonUrl, tagVariables, tagVariableKey) {
    // @ts-ignore
    Renderer.bindViewWithJSON(...arguments);
  }

  /**
   * Renders a view
   *
   * @param {string} viewFile
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   * @param {string} [selector='#root'] default #root
   * @param {string} [viewsFolder='./views/'] default ./views/
   * @memberof Renderer
   */
  renderView (viewFile, tagArgs, selector = '#root', viewsFolder = './views/') {
    // @ts-ignore
    Renderer.renderView(...arguments);
  }

  /**
   * Binds a view to a URL
   *
   * @param {string} view
   * @param {string} url
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   * @memberof Renderer
   */
  bindViewToUrl (view, url, tagArgs) {
    // @ts-ignore
    Renderer.bindViewToUrl(...arguments);
  }

  /**
   * Binds a view to a selector
   *
   * @static
   * @param {string} selector
   * @param {string} view
   * @param {string} url
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function
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
   * Binds a view to a selector and a URL, and fetches JSON data to use as tag arguments. For more complex operations than basic JSON fetching, please use the normal bindView with tagArgs supplied as a function.
   *
   * @static
   * @param {string} selector
   * @param {string} view
   * @param {string} url
   * @param {string} jsonUrl
   * @param {string[]|string} tagVariables name of the tags as they are written in the html template file, for example: ['salong1', 'salong2'] for a template with the tags {{:salong1}} & {{:salong2}}. Pass a single string to access the entire JSON object as is.
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
        let tagArgs = {};
        if (!Array.isArray(tagVariables)) {
          Object.assign(tagArgs, { [tagVariables]: json });
        } else {
          tagVariables.forEach((tagVariable, index) => {
            !tagVariableKey
              ? Object.assign(tagArgs, { [tagVariable]: json[index] })
              : Object.assign(tagArgs, {
                [tagVariable]: json[index][tagVariableKey]
              });
          });
        }
        Renderer.renderView(view, tagArgs);
      });
    });
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
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function
   * @memberof Renderer
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
