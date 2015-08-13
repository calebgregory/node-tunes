$('.artist-matches').hide();

$('.artist-search form').on('submit', function(e) {

  var artistName = $('input:first').val();
  $.get('/artists/search',
    { name : artistName },
    function(artists) {
      updateMatches(artists);
    });

  $('.artist-matches').show();

  e.preventDefault();

});

function updateMatches(matches) {

  $('#selected-artist').empty()
    .attr('size',matches.length);

  matches.forEach(function(match,i) {
    var html =
      '<option value="'+ match._id+ '"';
    //if(i<1) html+= ' selected'
    html+= '>'+
      match.name+
      '</option>';
    $('#selected-artist').append(html);
  });

};
