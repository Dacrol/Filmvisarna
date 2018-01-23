import PopStateHandler from './pop-state-handler.class.js';
const urlRegex = /(\W\w*)\W?(.*)/;
/** Class for rendering views */
class Renderer extends PopStateHandler {
  /**
   * Binds a view to a selector
   *
   * @param {string} [selector]
   * @param {string} view
   * @param {string} url
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function
   * @memberof Renderer
   */
  bindView (selector, view, url, tagArgs) {
    let viewMethod = () => {
      // @ts-ignore
      Renderer.bindView(...arguments);
    };
    this.bindViewToPopState(url, viewMethod);
    viewMethod();
  }

  /**
   * Binds a view to a selector and a URL, and fetches JSON data to use as tag arguments. For more complex operations than basic JSON fetching, please use the normal bindView with tagArgs supplied as a function.
   *
   * @param {string} [selector]
   * @param {string} view
   * @param {string} url
   * @param {string} jsonUrl
   * @param {string[]|string} tagVariables name of the tags as they are written in the html template file, for example: ['salong1', 'salong2'] for a template with the tags {{:salong1}} & {{:salong2}}. Pass a single string to access the entire JSON object as is.
   * @param {string} [tagVariableKey] name of the object key that holds the desired data, for example: 'name' in salons.json
   * @memberof Renderer
   */
  bindViewWithJSON (selector, view, url, jsonUrl, tagVariables, tagVariableKey) {
    let viewMethod = () => {
      // @ts-ignore
      Renderer.bindViewWithJSON(...arguments);
    };
    this.bindViewToPopState(url, viewMethod);
    viewMethod();
  }

  /**
   * Renders a view
   *
   * @param {string} viewFile
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   * @param {string} [selector='#root'] default #root
   * @param {string} [viewsFolder='/views/'] default /views/
   * @memberof Renderer
   */
  renderView (viewFile, tagArgs, selector = '#root', viewsFolder = '/views/') {
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
   * Binds a view to a selector and a URL
   *
   * @static
   * @param {string} [selector]
   * @param {string} view
   * @param {string} url
   * @param {Object} tagArgs Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function
   * @memberof Renderer
   */
  static bindView (selector = null, view, url, tagArgs) {
    // if (selector) {
    //   $(selector).unbind('click');
    //   $(selector).click(function (e) {
    //     e.preventDefault();
    //     if (typeof tagArgs !== 'function') {
    //       Renderer.renderView(view, tagArgs);
    //     } else {
    //       tagArgs();
    //     }
    //   });
    // }
    Renderer.bindViewToUrl(view, url, tagArgs);
  }

  /**
   * Binds a view to a selector and a URL, and fetches JSON data to use as tag arguments. For more complex operations than basic JSON fetching, please use the normal bindView with tagArgs supplied as a function.
   *
   * @static
   * @param {string} [selector]
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
    Renderer.bindView(selector, view, url, function (pathParams) {
      $.getJSON(jsonUrl, function (json) {
        let tagArgs = {'path_params': pathParams};
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
   * @param {string} [viewsFolder='/views/'] default /views/
   * @memberof Renderer
   */
  static renderView (
    viewFile,
    tagArgs,
    selector = '#root',
    viewsFolder = '/views/'
  ) {
    // console.log(...arguments);
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
      console.log(tagArgs);
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
      const path = location.pathname;
      const urlParts = urlRegex.exec(path);
      // console.log(urlParts);
      try {
        if (urlParts[1] === url && typeof tagArgs !== 'function') {
          // console.log('!')
          Object.assign(tagArgs, {'path_params': urlParts[2]});
          // console.log(tagArgs);
          Renderer.renderView(view, tagArgs);
        } else if (urlParts[1] === url) {
          tagArgs(urlParts[2]);
        }
      } catch (error) {
        console.warn('Invalid url: ', error);
      }
    });
  }
}

export default Renderer;
