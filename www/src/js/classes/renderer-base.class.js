import PopStateHandler from './pop-state-handler.class.js';
const urlRegex = /(\W\w*)\W?(.*)/;
/** Class for rendering views */
class Renderer extends PopStateHandler {
  /**
   * Binds a view to a selector and a URL
   *
   * @param {string} [selector] Only necessary if the selector does not have the class 'pop'
   * @param {string} view
   * @param {string} url
   * @param {Object} contextData Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function
   * @memberof Renderer
   */
  bindView (selector, view, url, contextData) {
    let viewMethod = () => {
      // @ts-ignore
      Renderer.bindView(...arguments);
    };
    this.bindViewToPopState(url, viewMethod);
    viewMethod();
  }

  /**
   * Binds a view to a selector and a URL, and fetches JSON data to use as tag arguments. For more complex operations than basic JSON fetching, please use the normal bindView with contextData supplied as a function.
   *
   * @param {string} [selector] Only necessary if the selector does not have the class 'pop'
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
   * @param {Object} contextData Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   * @param {string} [selector='#root'] default #root
   * @param {string} [viewsFolder='/views/'] default /views/
   * @memberof Renderer
   */
  renderView (viewFile, contextData, selector = '#root', viewsFolder = '/views/') {
    // @ts-ignore
    Renderer.renderView(...arguments);
  }

  /**
   * Binds a view to a URL
   *
   * @param {string} view
   * @param {string} url
   * @param {Object} contextData Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function for complex operations
   * @memberof Renderer
   */
  bindViewToUrl (view, url, contextData) {
    let viewMethod = () => {
      // @ts-ignore
      Renderer.bindViewToUrl(...arguments);
    };
    this.bindViewToPopState(url, viewMethod);
    viewMethod();
  }

  /**
   * Binds a view to a selector and a URL
   *
   * @static
   * @param {string} [selector] Only necessary if the selector does not have the class 'pop'
   * @param {string} view
   * @param {string} url
   * @param {Object} contextData Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function
   * @memberof Renderer
   */
  static bindView (selector = null, view, url, contextData) {
    if (selector && !$(selector).hasClass('pop')) {
      $(selector).unbind('click');
      $(selector).click(function (e) {
        e.preventDefault();
        if (typeof contextData !== 'function') {
          Renderer.renderView(view, contextData);
        } else {
          contextData();
        }
      });
    }
    Renderer.bindViewToUrl(view, url, contextData);
  }

  /**
   * Binds a view to a selector and a URL, and fetches JSON data to use as tag arguments. For more complex operations than basic JSON fetching, please use the normal bindView with contextData supplied as a function.
   *
   * @static
   * @param {string} [selector] Only necessary if the selector does not have the class 'pop'
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
        let contextData = {'path_params': pathParams};
        if (!Array.isArray(tagVariables)) {
          Object.assign(contextData, { [tagVariables]: json });
        } else {
          tagVariables.forEach((tagVariable, index) => {
            !tagVariableKey
              ? Object.assign(contextData, { [tagVariable]: json[index] })
              : Object.assign(contextData, {
                [tagVariable]: json[index][tagVariableKey]
              });
          });
        }
        Renderer.renderView(view, contextData);
      });
    });
  }

  /**
   * Renders a view
   *
   * @static
   * @param {string} viewFile
   * @param {Object} contextData Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}
   * @param {string} [selector='#root'] default #root
   * @param {string} [viewsFolder='/views/'] default /views/
   * @memberof Renderer
   */
  static renderView (
    viewFile,
    contextData,
    selector = '#root',
    viewsFolder = '/views/'
  ) {
    // console.log(...arguments);
    if (!(contextData instanceof Object)) {
      contextData = {};
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
      $(selector).html($.templates(data).render(contextData));
      console.log(contextData);
    });
  }
  /**
   * Binds a view to a URL
   *
   * @static
   * @param {string} view
   * @param {string} url
   * @param {Object} contextData Object containing tag arguments, for example: {salong1: salongName} for the tag {{:salong1}}, or a function
   * @memberof Renderer
   */
  static bindViewToUrl (view, url, contextData) {
    $(document).ready(function () {
      const path = location.pathname;
      const urlParts = urlRegex.exec(path);
      // console.log(urlParts);
      try {
        if (urlParts[1] === url && typeof contextData !== 'function') {
          // console.log('!')
          Object.assign(contextData, {'path_params': urlParts[2]});
          // console.log(contextData);
          Renderer.renderView(view, contextData);
        } else if (urlParts[1] === url) {
          contextData(urlParts[2]);
        }
      } catch (error) {
        console.warn('Invalid url: ', error);
      }
    });
  }
}

export default Renderer;
