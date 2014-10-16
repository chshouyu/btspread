var searchInput = document.querySelector('#search-keyword'),
    primaryBtns = document.querySelectorAll('.magnet-list .btn');

var makeArray = function(list) {
    return [].slice.call(list);
};

var ajax = function(opts) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        var completed = 4;
        if (xhr.readyState === completed) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                opts.success(xhr.responseText, xhr);
            } else {
                opts.error(xhr.responseText, xhr);
            }
        }
    };
    xhr.open(opts.method, opts.url, true);
    xhr.send(opts.data);
};

var parseHTML = function(htmlString) {
    var c = document.createElement('div');
    c.innerHTML = htmlString;
    return c.children;
};

if (!searchInput.value.trim()) {
    searchInput.focus();
}

if (primaryBtns.length > 0) {
    var target = null;

    makeArray(primaryBtns).forEach(function(elem, index) {
        var a = document.createElement('a');
        a.className = 'btn btn-primary btn-get-target get-target';
        a.href = '#';
        a.textContent = 'Get';
        elem.parentNode.appendChild(a);
    });

    var handlePage = function(htmlString) {
        var pageDom = parseHTML(htmlString),
            targetLink = '##',
            magnetLink;
        makeArray(pageDom).forEach(function(elem) {
            if (magnetLink = elem.querySelector('#magnetLink')) {
                targetLink = magnetLink.textContent;
                return false;
            }
        });

        target.classList.remove('get-target');
        target.classList.remove('btn-primary');
        target.classList.add('btn-success');
        target.href = targetLink;
        target.textContent = 'Link';
        var tr = document.createElement('tr'),
            td = document.createElement('td'),
            input = document.createElement('input');
        input.type = 'text';
        input.style.width = '910px';
        input.style.fontSize = '12px;';
        input.style.marginBottom = '0px';
        input.style.padding = '2px 3px';
        input.value = targetLink;
        input.className = 'link-address';
        td.setAttribute('colspan', '4');
        td.style.borderTop = '0px';
        td.style.paddingTop = '2px';
        td.appendChild(input);
        tr.appendChild(td);
        var parentTr = target.parentNode.parentNode;
        var tbody = parentTr.parentNode;
        tbody.insertBefore(tr, parentTr.nextSibling);
        input.select();
    };

    var requestPage = function(e) {
        e.preventDefault();
        target = e.target;
        if (target.classList.contains('get-target')) {
            target.textContent = '...';
            var requestUrl = target.previousElementSibling.href;
            ajax({
                url: requestUrl,
                method: 'GET',
                success: function(htmlString) {
                    handlePage(htmlString);
                },
                error: function() {}
            });
        }
    };

    var focusLink = function(e) {
        var input;
        if ((input = e.target).classList.contains('link-address')) {
            input.select();
        }
    };

    document.querySelector('.magnet-list').addEventListener('click', requestPage, false);
    document.querySelector('.magnet-list').addEventListener('mouseover', focusLink, false);
}

