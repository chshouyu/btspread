
$('.magnet-list .btn').each(function(index, elem) {
    var $elem = $(elem);
    $elem.after('<a class="btn btn-primary btn-get-target get-target" href="#">获取</a>');
});

$('.magnet-list').on('click', '.get-target', function(e) {
    e.preventDefault();
    var $this = $(this);

    $this.text('...');

    $.ajax({
        url: $this.prev('.btn').attr('href'),
        dataType: 'text'
    }).done(function(data) {
        var $html = $(data),
            targetLink = $html.find('#magnetLink').text();

        $this.removeClass('get-target btn-primary').addClass('btn-success').attr('href', targetLink).text('地址');
    });
});