var rocky = require('rocky');

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  var d = new Date();
  var uts_clock_start = Math.round( d.setHours(8,0,0,0) / 1000 );
  var uts_clock_now = Math.round(Date.now() / 1000);
  var clock_time = uts_clock_now - uts_clock_start;
  
  if( clock_time < 0 ) { 
    clock_time += 86400;
  }
  
  // Set the text color
  if ( clock_time >= 0 && clock_time < 32400 ) {
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx.fillStyle = '#e70012';
    ctx.fill();
    ctx.fillStyle = 'white';
  } else if ( clock_time >= 32400 && clock_time < 54000 ) {
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.fillStyle = '#123524';
  } else {
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx.fillStyle = '#191970';
    ctx.fill();
    ctx.fillStyle = 'white';
  }
  

  // Center align the text
  ctx.textAlign = 'center';
  ctx.font = '42px bold numbers Leco-numbers';
  
  
  // Display the time, in the middle of the screen
  ctx.fillText( pad( clock_time, 5 ), w / 2, h / 3 );

});

rocky.on('secondchange', function(event) {
  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});