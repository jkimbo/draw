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
    $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
      $('.tools').append("<a href='#colors_sketch' data-color='" + this + "' style='width: 10px; background: " + this + ";'></a> ");
    });
    $.each([3, 5, 10, 15], function() {
      $('.tools').append("<a href='#colors_sketch' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
    }); 
    $('#colors_sketch').sketch('', socket);
    var sketch = $.sketch;
    console.log(sketch)
});
