$(function() {
  var handleWeatherResponse = function(data) {
    console.log(data)

    // Put your code here to change the "markup" variable.
    // Don't change any other code in this file. You will be sad.

    var markup =
      "<p> Current Weather: " + data.currently.temperature + "&deg;, " + data.currently.summary +
      "<p> Tomorrow: " + "High - " + data.daily.data[0].temperatureMax + "&deg;, " + "Low - " +data.daily.data[0].temperatureMin + "&deg;, " + data.daily.data[0].summary +
      "<p> The Day After Tomorrow: " + "High - " + data.daily.data[1].temperatureMax + "&deg;, " + "Low - " + data.daily.data[1].temperatureMin + "&deg;, " + data.daily.data[1].summary +
      "<p> The Day After the Day After Tomorrow: " + "High - " + data.daily.data[2].temperatureMax + "&deg;, " + "Low - " + data.daily.data[1].temperatureMin + "&deg;, " + data.daily.data[2].summary;

      ! function(Math) {

      	"use strict";

      	var run = function() {
      		requestAnimationFrame(run);
      		ctx.drawImage(background, 0, 0);
      		pointer.isDown && down();
      		for (var i = 0; i < 2000; i++) {
      			var p = particles[i];
      			if (p.active) p.fall();
      		}
      	};

      	var down = function() {
      		var n = 10;
      		for (var i = 0; i < 2000; i++) {
      			var p = particles[i];
      			if (!p.active) {
      				n--;
      				if (Math.random() > 0.95) {
      					var x = Math.random() * resolutionX;
      					var y = -pS * 3;
      				} else {
      					var x = pointer.x;
      					var y = pointer.y;
      				}
      				p.init(x, y);
      				if (n <= 0) break;
      			}
      		}
      	}

      	var Particle = function Particle() {
      		this.x = 0;
      		this.y = 0;
      		this.sx = 0;
      		this.sy = 0;
      		this.my = 0;
      		this.active = false;
      		this.touch = false;
      	};

      	Particle.prototype.init = function(x, y) {
      		this.x = x / pS;
      		this.y = y;
      		this.sx = Math.random() - 0.5;
      		this.sy = -4 * Math.random();
      		this.my = 1 + Math.random() * 2;
      		this.active = true;
      		this.touch = false;
      	};

      	Particle.prototype.fall = function() {
      		if (this.x < 0 || this.x > resolutionX / pS) {
      			this.active = false;
      			return;
      		}
      		var x = (this.x + 0.5) | 0;
      		if (this.y > P[x] - pS) {
      			this.touch = true;
      			if (P[x - 1] > this.y + pS) {
      				this.x--;
      			} else if (P[x + 1] > this.y + pS) {
      				this.x++;
      			} else {
      				if (this.y < P[x] + pS) {
      					if (P[x] > pS) {
      						P[x] -= pS;
      						backctx.drawImage(Math.random() > 0.95 ? snow : snowback, (x * pS) - ihW * 0.5, P[x]);
      					}
      					this.active = false;
      					return;
      				} else {
      					this.y = P[x] - pS;
      				}
      			}
      		} else {
      			this.y += this.sy;
      			if (this.sy < this.my) this.sy += 0.1;
      			this.x += this.sx;
      			this.sx *= 0.998;
      		}
      		if (this.touch) {
      			ctx.save();
      			ctx.translate(this.x * pS, this.y);
      			ctx.rotate(this.x * 0.5);
      			ctx.drawImage(snow, -ihW, -ihW);
      			ctx.restore();
      		} else {
      			ctx.drawImage(snow, (this.x * pS) - ihW, this.y - ihW);
      		}
      	};

      	var canvas = document.createElement('canvas');
      	var ctx = canvas.getContext('2d');
      	document.body.appendChild(canvas);
      	var resolutionX = canvas.width = Math.round(canvas.offsetWidth / 1);
      	var resolutionY = canvas.height = Math.round(canvas.offsetHeight / 1);

      	var pointer = {
      		x: resolutionX / 2,
      		y: resolutionY,
      		isDown: false,
      		add: function(elem, events, fn) {
      			for (var i = 0, e = events.split(','); i < e.length; i++) {
      				elem.addEventListener(e[i], fn.bind(pointer), false);
      			}
      		},
      		pointer: function(e) {
      			var touchMode = e.targetTouches,
      				pointer;
      			if (touchMode) {
      				e.preventDefault();
      				pointer = touchMode[0];
      			} else pointer = e;
      			this.x = (-canvas.offsetLeft + pointer.clientX) * resolutionX / canvas.offsetWidth;
      			this.y = (-canvas.offsetTop + pointer.clientY) * resolutionY / canvas.offsetHeight;
      		}
      	};
      	pointer.add(window, 'mousemove,touchmove', function(e) {
      		this.pointer(e);
      	});
      	pointer.add(canvas, 'mousedown,touchstart', function(e) {
      		this.isDown = true;
      		this.pointer(e);
      	});
      	pointer.add(window, 'mouseup,touchend,touchcancel', function(e) {
      		this.isDown = false;
      		e.preventDefault();
      	});

      	var pS = 6,
      		ihW = 12;
      	var background = document.createElement('canvas');
      	background.width = resolutionX;
      	background.height = resolutionY;
      	var backctx = background.getContext('2d');
      	backctx.fillStyle = "#222";
      	backctx.fillRect(0, 0, resolutionX, resolutionY);

      	var snowback = document.createElement('canvas');
      	snowback.width = ihW;
      	snowback.height = ihW;
      	var snowbackctx = snowback.getContext('2d');

      	snowbackctx.fillStyle = "#fff";
      	snowbackctx.arc(ihW / 2, ihW / 2, ihW / 2, 0, 2 * Math.PI);
      	snowbackctx.fill();

      	var P = new Uint16Array(resolutionX / pS);

      	for (var i = 0; i < resolutionX / pS; i++) {
      		P[i] = resolutionY;
      	}

      	var particles = [];
      	for (var i = 0; i < 2000; i++) {
      		particles.push(new Particle());
      	}

      	var snow = new Image();
      	snow.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/222599/snow.gif";

      	if (window.location.href.indexOf("fullcpgrid") > -1) pointer.isDown = true;

      	run();

      }(Math);

    // End of your code

    $('.weather-report').html(markup);
  }
  $('a.get-the-weather').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      type: 'GET',
      url: 'https://api.forecast.io/forecast/6dbe98374cc5b8f9ea63d5ec73de9c04/42.056459,-87.675267?callback=?',
      dataType: 'jsonp',
      contentType: "application/json",
      success: handleWeatherResponse
    });
  });
});
