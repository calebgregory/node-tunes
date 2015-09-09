$(document).ready(function() {

  var len = $('pre').length; // number of frames
  var p = 1200; // pixel value of first frame [0]

  var changeFrame = (f,numFrames) => {
    $(`#frame-${f}`).show();
    for (var i = 0; i < numFrames; i++) {
      if(i !== f) $(`#frame-${i}`).hide();
    }
  }

  changeFrame(0,len);

  $(window).resize(() => {
    var w = $(window).width();

    if(w >= p) {

      changeFrame(0,len);

    } else if(w >= p - 60) {

      changeFrame(1,len);

    } else if(w >= p - 80) {

      changeFrame(2,len);

    } else if(w >= p - 100) {

      changeFrame(3,len);

    } else if(w >= p - 120) {

      changeFrame(4,len);

    } else if(w >= p - 140) {

      changeFrame(5,len);

    } else if(w >= p - 160) {

      changeFrame(6,len);

    } else if(w >= p - 180) {

      changeFrame(7,len);

    } else if(w >= p - 200) {

      changeFrame(8,len);

    } else if(w >= p - 220) {

      changeFrame(9,len);

    } else if(w >= p - 240) {

      changeFrame(10,len);

    } else if(w >= p - 260) {

      changeFrame(11,len);

    } else if(w >= p - 280) {

      changeFrame(12,len);

    } else if(w >= p - 300) {

      changeFrame(13,len);

    } else if(w >= p - 320) {

      changeFrame(14,len);

    } else if(w >= p - 340) {

      changeFrame(15,len);

    } else if(w >= p - 360) {

      changeFrame(16,len);

    } else if(w >= p - 380) {

      changeFrame(17,len);

    } else if(w >= p - 400) {

      changeFrame(18,len);

    } else if(w >= p - 420) {

      changeFrame(19,len);

    } else if(w >= p - 440) {

      changeFrame(20,len);

    } else if(w >= p - 460) {

      changeFrame(21,len);

    } else if(w >= p - 480) {

      changeFrame(22,len);

    } else if(w >= p - 500) {

      changeFrame(23,len);

    } else if(w >= p - 520) {

      changeFrame(24,len);

    } else if(w >= p - 540) {

      changeFrame(25,len);

    } else if(w >= p - 560) {

      changeFrame(26,len);

    } else if(w >= p - 580) {

      changeFrame(27,len);

    } else if(w >= p - 600) {

      changeFrame(28,len);

    } else if(w >= p - 620) {

      changeFrame(29,len);

    } else if(w >= p - 640) {

      changeFrame(30,len);

    } else if(w >= p - 660) {

      changeFrame(31,len);

    } else if(w >= p - 680) {

      changeFrame(32,len);

    } else if(w >= p - 700) {

      changeFrame(33,len);

    } else if(w >= p - 720) {

      changeFrame(34,len);

    } else if(w >= p - 740) {

      changeFrame(35,len);

    }
  });

  // w = window width
  // P = pixel value of frame 0
  // f = frame number
  //
  // if(w >= P)      // f = 0
  //   frame-0 show,
  //   for(i=0;i<frames.length;i++)
  //     if i != 0
  //       frame-i hide
  // else if(w < P && w >= P - k*20)
  //    frame-k show
  //    for(i=0;1<frames.length;i++)
  //      if i != k
  //        frame-i hide

  // function hideOtherFrames(f,frames) {
  //   for(i < 0; i<frames.length; i++) {
  //     if (i !== f) frames[i].hide()
  //   }
  // }

  // when the window is decreasing,
  // animate the frames
  //   by hiding and showing
  //   the elements on a page
  //   at a given time.

  // change will occur
  // in X pixel increments,
  // meaning beginning with 1015px width,
  // frame     | pixel
  // ----------|----------
  // 1         | 1020
  // 2         | 980
  // 3         | 960
  // 4         | 940
  // 5         | 920
  // 6         | 900
  // ...         ...

  // if(w >= 1020),
  // frame-1 show
  // frame-k hide, k = ( x|x!=1 ).
  // if(w < 1020 && w >= 1000)
  // frame-k hide, k = ( x|x!=2 ).
  // ...

});
