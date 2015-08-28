var hideOtherFrames = (f,numFrames) => {
  for (var i = 0; i < numFrames; i++) {
    if(i !== f) $(`#frame-${i}`).hide();
  }
  console.log(`change to ${f}`);
}

$(window).resize(() => {
  var w = $(window).width();
  console.log('width:',w);
  var len = $('pre').length; // number of frames
  var p = 1200; // pixel value of first frame [0]

  if(w >= p) {

    $('#frame-0').show();
    hideOtherFrames(0,len);

  } else if(w >= p - 60) {

    $('#frame-1').show();
    hideOtherFrames(1,len);

  } else if(w >= p - 120) {

    $('#frame-2').show();
    hideOtherFrames(2,len);

  } else if(w >= p - 160) {

    $('#frame-3').show();
    hideOtherFrames(3,len);

  } else if(w >= p - 200) {

    $('#frame-4').show();
    hideOtherFrames(4,len);

  } else if(w >= p - 220) {

    $('#frame-5').show();
    hideOtherFrames(5,len);

  } else if(w >= p - 240) {

    $('#frame-6').show();
    hideOtherFrames(6,len);

  } else if(w >= p - 360) {

    $('#frame-7').show();
    hideOtherFrames(7,len);

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

