function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

$('.doanhthu').html(format($('.doanhthu').html()))

