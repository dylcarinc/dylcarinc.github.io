    var artist = "";
    $.ajax({
      dataType: "jsonp",
      jsonpCallback: "parseQuote",
      url: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=thewwdc&api_key=e62caada26f13f1f30556b61299dbf83&format=json",
      success: function(results) {
        $('#success #Track').text(results.recenttracks.track[0].name);
        $('#success #Album').text(results.recenttracks.track[0].album['#text']);
        $('#success #Artist').text(results.recenttracks.track[0].artist['#text']);
        artist = (results.recenttracks.track[0].artist['#text']).replaceAll(' ', '_');
        $('#success #Cover').html('<img src="' + results.recenttracks.track[0].image[2]['#text'] + '" />');
         $.ajax({
                dataType: "json",
                method: 'GET',
                url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + artist,
                success: function(results) {
                    $('#success #Wikipedia').text(results.extract);
                    $('#success #Link').html(`<a href="${results.content_urls.desktop.page}">Read more on Wikipedia</a>`);
                },
                error: function(xhr,status,error) {
                    console.log(error);
                }
                });
      },
      error: function(xhr,status,error) {
        console.log(error);
      }
    });