var socket = io.connect('http://192.168.1.44:3000');
socket.on('connect', function(){
    console.log('connected');
    socket.on('alert', function(data) {
        console.log(data);
    });
    socket.on('action', function(id, data) {
        //console.log(id, data);
        $('#colors_sketch').sketch('drawActions', data);
    });
    socket.on('buffer', function(data) {
        console.log(data);
        $.each(data, function(key, action) {
            console.log(action);
            $('#colors_sketch').sketch('drawActions', action);
        });
    });
});

$(function() {
    $('#colors_sketch').sketch('', socket);
    var sketch = $.sketch;
    console.log(sketch)
});
