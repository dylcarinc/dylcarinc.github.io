var currentIndex = 0;
var trackList = []
$.ajax({
  dataType: "jsonp",
  jsonpCallback: "parseQuote",
  url: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=thewwdc&api_key=e62caada26f13f1f30556b61299dbf83&format=json",
  success: function(results) {
    trackList = results.recenttracks.track;
    $('#totalTracks').text(trackList.length);
    displayTrack(0);
  },
  error: function(xhr,status,error) {
    console.log(error);
  }
});
function displayTrack(index) {
  if (index < 0 || index >= trackList.length) return;
  
  currentIndex = index;
  var track = trackList[index];
  
  $('#success #Track').text(track.name);
  $('#success #Album').text(track.album['#text']);
  $('#success #Artist').text(track.artist['#text']);
  $('#success #Cover').html('<img src="' + track.image[2]['#text'] + '" />');
  $('#currentTrack').text(index + 1);
  

  $('#success #Wikipedia').text('');
  $('#success #Link').html('');
  $('#success #Picture').html('');

  var artist = track.artist['#text'].replaceAll(' ', '_');
  $.ajax({
    dataType: "json",
    method: 'GET',
    url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + artist,
    success: function(results) {
      $('#success #Wikipedia').text(results.extract);
      $('#success #Link').html(`<a href="${results.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>`);
      if (results.originalimage) {
        $('#success #Picture').html('<img src="' + results.originalimage.source + '" />');
      }
    },
    error: function(xhr, status, error) {
      $('#success #Wikipedia').text('Wikipedia information not available for this artist.');
      console.log(error);
    }
  });
  
  updateButtons();
}  
function updateButtons() {
  $('#prevBtn').prop('disabled', currentIndex === 0);
  $('#nextBtn').prop('disabled', currentIndex === TrackList.length - 1);
}

$('#prevBtn').click(function() {
  if (currentIndex > 0) {
    displayTrack(currentIndex - 1);
  }
});

$('#nextBtn').click(function() {
  if (currentIndex < trackList.length) {
    displayTrack(currentIndex + 1);
  }
});