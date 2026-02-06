    var track = "";
    var artist = "";
    $.ajax({
      dataType: "jsonp",
      jsonpCallback: "parseQuote",
      url: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=thewwdc&api_key=e62caada26f13f1f30556b61299dbf83&format=json",
      success: function(results) {
        $('#success #Track').text(results.recenttracks.track[0].name);
        track = encodeURI(results.recenttracks.track[0].name);
        $('#success #Album').text(results.recenttracks.track[0].album['#text']);
        $('#success #Artist').text(results.recenttracks.track[0].artist['#text']);
        artist = encodeURI(results.recenttracks.track[0].artist['#text']);
        $('#success #Cover').html('<img src="' + results.recenttracks.track[0].image[2]['#text'] + '" />');
         $.ajax({
                dataType: "json",
                method: 'GET',
                url: "https://api.lyrics.ovh/v1/" + artist + "/" + track,
                success: function(results) {
                    $('#success #Lyrics').text(results.lyrics);
                },
                error: function(xhr,status,error) {
                    console.log("https://api.lyrics.ovh/v1/" + artist + "/" + track);
                }
                });
      },
      error: function(xhr,status,error) {
        console.log(error);
      }
    });