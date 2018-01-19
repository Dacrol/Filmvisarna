let render = function() {

    $.getJSON('/json/salong.json',
        function(json) {
            let salonger = json;
            bindSelector('a#pills-salonger', 'salonger', {
                salong1: salonger[0].name,
                salong2: salonger[1].name
            });
        }
    );

    let url = location.pathname;

    if (url === '/' || url === '') {
        renderView('/home.html');
    }
    if (url === '/salons') {
        $.getJSON('/json/salong.json',
        function(json) {
            let salonger = json;
                    renderView('/salonger.html', {
                salong1: salonger[0].name,
                salong2: salonger[1].name
            });
        }
    );

    }
    if (url === '/current') {
        renderView('/current.html', {
            movie: '<a href="http://www.imdb.com/title/tt1663662/">Pacific Rim</a>'
        });
    }

    bindSelector('a#pills-home', 'home.html');
    bindSelector('a#pills-current', '/current', {
        movie: '<a href="http://www.imdb.com/title/tt1663662/">Pacific Rim</a>'
    });

    function renderView(viewFile, tagArgs, selector = '#root', viewsFolder = './views/') {

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
        $.get(url, function(data) {
            $(selector).html($.templates(data).render(tagArgs));
        });
    }

    function bindSelector(selector, view, tagArgs) {
        $(selector).click(function(e) {
            e.preventDefault();
            renderView(view, tagArgs);
        });
    }
}

export default render;