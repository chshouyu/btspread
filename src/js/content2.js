var searchInput = document.querySelector('#search-keyword'),
    primaryBtns = document.querySelectorAll('.magnet-list .btn');

var makeArray = function(list) {
    return [].slice.call(list);
};

var ajax = function(opts) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.status === 200 || this.status === 304) {
            opts.success(opts.responseType ? this.response : this.responseText, this);
        } else {    
            opts.error(this.responseText, this);
        }
    };
    if (opts.timeout && opts.ontimeout) {
        xhr.timeout = opts.timeout;
        xhr.ontimeout = opts.ontimeout;
    }
    xhr.responseType = opts.responseType || 'text';
    xhr.onprogress = opts.onprogress || function() {};
    xhr.open(opts.method, opts.url, true);
    xhr.send(opts.data);
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

    var handlePage = function(html) {
        var targetLink = '##',
            magnetLink = html.querySelector('#magnetLink');
            targetLink = magnetLink.innerText;
        target.classList.remove('get-target');
        target.classList.remove('btn-primary');
        target.classList.add('btn-success');
        target.href = targetLink;
        target.textContent = 'Link';
        var tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="4" class="magnet-td"><input class="link-address" type="text" value="' + targetLink + '"></td>';
        var parentTr = target.parentNode.parentNode;
        var tbody = parentTr.parentNode;
        tbody.insertBefore(tr, parentTr.nextSibling);
        tr.querySelector('.link-address').select();
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
                success: function(html) {
                    handlePage(html);
                },
                error: function() {},
                responseType: 'document'
            });
        }
    };
    var focusTimer;
    var focusLink = function(e) {
        var input;
        clearTimeout(focusTimer);
        focusTimer = setTimeout(function() {
            if ((input = e.target).classList.contains('link-address')) {
                input.select();
            }    
        }, 200);
    };

    document.querySelector('.magnet-list').addEventListener('click', requestPage, false);
    document.querySelector('.magnet-list').addEventListener('mouseover', focusLink, false);
}

