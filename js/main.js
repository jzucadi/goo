// Swipe Menu SVG - by @eustachethomas

$(function() {

  var wH = $(window).height(),
      wW = $(window).width(),
      menuW = $('.menu').width(),
      menuH = $('.menu').height(),
      decX,
      decY,
      mouseX,
      mouseY,
      s = Snap('.menu svg'),
      newPath,
      pathEl = s.select('path'),
      pathOrigin = $('.menu-svg path').attr('d'),
      init = function() {
        wH = $(window).height();
        wW = $(window).width();
        menuW = $('.menu').width();
        menuH = $('.menu').height();
        $('.menu-svg')[0].setAttribute('viewBox','0 0 '+menuW+' '+menuH);
        $('.menu-svg path').attr('d', 'M 0 0 C 0 0, 0 '+menuH+', 0 '+menuH+' C 0 '+menuH+', 0 '+menuH+', 0 '+menuH+' C 0 60, 0 0, 0 0 C 0 0, 0 0, 0 0');
      };

  init();

  $(window).resize(function() {
    init();
  });

  $('body').on('click touchend', '.overlay', function() {

    newPath = pathOrigin;

    $('.overlay').fadeOut(300, function() {
      $('.overlay').remove();
    });

    $('html, body').css('overflow', 'auto');

    pathEl.stop().animate({
      path: newPath
    }, 600, mina.elastic, function() {
      $('.menu').removeClass('touch open');
    });

    return false;

  });

  // Swipe
  $('.menu').swipe({

    swipeStatus: function(event, phase) {

      if(phase == 'start' && !$('.overlay').length) {
        $('body').append('<div class="overlay"></div>');
        $('.overlay').fadeIn(250);
        $('.menu').addClass('touch');
        $('html, body').css('overflow', 'hidden');
        menuW = $('.menu').width();
        menuH = $('.menu').height();
        $('.menu-svg')[0].setAttribute('viewBox','0 0 '+wW+' '+wH);
      }

      if(phase == 'move' && !$('.menu').hasClass('open')) {

        if(event.type == 'touchmove') {
          mouseX = event.touches[0].clientX;
          mouseY = event.touches[0].clientY;
        } else {
          mouseX = event.x;
          mouseY = event.y;
        }

        decX = parseInt(mouseX / menuW * 100);
        decY = parseInt(mouseY / menuH * 100);

        newPath = 'M 0 0 C 0 0, 0 '+menuH+', 0 '+menuH+' C 0 '+menuH+', 0 '+menuH+', 0 '+menuH+' C '+(menuW*decX/100)+' '+(menuH*(decY-20)/100)+', '+(menuW*decX/100)+' '+(menuH*(decY+20)/100)+', 0 0 C 0 0, 0 0, 0 0 C 0 0, 0 0, 0 0';

        $('.menu-svg path').attr('d', newPath);

        if(decX > 60) {

          newPath = 'M 0 0 L 0 '+menuH+' L '+menuW+' '+menuH+' L '+menuW+' 0 Z';

          pathEl.stop().animate({
            path: newPath
          }, 800, mina.elastic);

          $('.menu').addClass('open');
          $('.menu').removeClass('touch');

          return false;

        }

      }

      if(phase == 'end') {

        $('html, body').css('overflow', 'auto');

        if(decX < 60) {

          decX = decY = 0;
          newPath = pathOrigin;

          $('.overlay').fadeOut(300, function() {
            $('.overlay').remove();
          });

          pathEl.stop().animate({
            path: newPath
          }, 600, mina.elastic, function() {
            $('.menu').removeClass('touch');
          });

        } else {

          newPath = 'M 0 0 L 0 '+menuH+' L '+menuW+' '+menuH+' L '+menuW+' 0 Z';
          pathEl.stop().animate({
            path: newPath
          }, 800, mina.elastic);

          $('.menu').addClass('open');
          $('.menu').removeClass('touch');

        }

      }

    }
  });

});
