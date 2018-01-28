var rocky = require('rocky');

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  var m = new Date();
  var m2 = m.setHours(0,0,0,0);
  var last_midnight = Math.round( m2 / 1000 );
  var d = new Date();
  var now_time = Math.round(Date.now() / 1000);
  var print_time = now_time - last_midnight;
  // Set the text color
  ctx.fillStyle = 'white';

  // Center align the text
  ctx.textAlign = 'center';
  
  if (rocky.userPreferences.contentSize === 'x-large') {
    ctx.font = '42px bold numbers Leco-numbers';
  } else {
    ctx.font = '32px bold numbers Leco-numbers';
  }
  
  // Display the time, in the middle of the screen
  ctx.fillText( print_time, w / 2, h / 3 );
//   ctx.fillText( d.toLocaleTimeString(). w / 2, h / 2);
});

rocky.on('secondchange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});