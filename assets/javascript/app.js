var buttonArry = ['security cam', 'funny fail', 'diving', "star trek", 'snakes', 'dance']

// make new button
function makeButton() {
    $(".buttons").empty();
    for (var i = 0; i < buttonArry.length; i++) {
        $(".buttons").append('<button class="btn" offset=0>' + buttonArry[i] + '</button>');
    }
}

// add to array
$("#inputButton").on('click', function() {
    if ($("#inputField").val() !== '') {

        if (buttonArry.indexOf($("#inputField").val()) === -1) {
            buttonArry.push($("#inputField").val());

            makeButton();
        }
    }

});

// make giphys
function makeGiphys() {
    var self = this
    $(".btn").removeClass("active");
    $(self).addClass("active");
    var search = $(self).text();
    var offset = $(self).attr('offset');
    console.log($(self).attr('offset'));
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + offset;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);

        $(".giphys").empty();

        //offset response
        if (response.pagination.total_count < 5000) {
            offset = Math.floor((Math.random() * response.pagination.total_count) - 10);
            console.log("<");
        } else {
            offset = Math.floor((Math.random() * 5000) - 10);
        }
        $(self).attr('offset', offset);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifButton = $('<button class="gif" still="Y" > <img src=' + results[i].images.fixed_height_still.url + ' ><p>Rating: ' + results[i].rating + '</p></button>');

            $(".giphys").append(gifButton);
        }

    });
};

//play and stop giphy
function playGiphy() {
    if ($(this).attr("still") == "Y") {
        var link = $('img', this).attr("src").split("_s.gif");
        $('img', this).attr("src", link[0] + ".gif");
        $(this).attr("still", "N");
    } else {
        var link = $('img', this).attr("src").split(".gif");
        $('img', this).attr("src", link[0] + "_s.gif");
        $(this).attr("still", "Y");
    }
}


$(document).on("click", ".btn", makeGiphys);
$(document).on("click", ".gif", playGiphy);
makeButton();
