$(document).ready(function() {
  $('.cookie').click(function() {
    $.ajax({
      dataType: "jsonp",
      jsonpCallback: "parseQuote",
      url: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=thewwdc&api_key=e62caada26f13f1f30556b61299dbf83&format=json",
      success: function(results) {
        $('#Track').text(results["recenttracks.track.0.name"]);
      },
      error: function(xhr,status,error) {
        console.log(error);
      }
    });
  });
});