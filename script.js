var topics = ['power rangers', 'TMNT', 'pokemon', 'yu-gi-oh', 'digimon']

// for (var i=0; i < topics.length; i++) {
$.each(topics, function () {
    var newButton = $('<button>')
    newButton.text(this)
    newButton.attr('data-item', this)
    $('#buttons').append(newButton)
})

//giphy api key - rLCmewZGFqjx3RGUFJwTcyeHco1wzQp2


$(document).ready(function() {
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=rLCmewZGFqjx3RGUFJwTcyeHco1wzQp2&q=chair&limit=10&offset=0&rating=G&lang=en"

    //wont generate a new button if val is empty
    $('#buttonSubmit').on("click", function() {
        if ($('#newButtonName').val()) {
            var newButton = $('<button>')
            var newButtonVal = $('#newButtonName').val()
            newButton.text(newButtonVal)
            newButton.attr('data-item', newButtonVal)
            $('#buttons').append(newButton)
            $('#newButtonName').val('')
        }
    })

    $(document.body).on("click","button", function() {
        //Creates a giphy API call based off button pressed
        var callUrl = "https://api.giphy.com/v1/gifs/search?api_key=rLCmewZGFqjx3RGUFJwTcyeHco1wzQp2&q="+ $(this).data('item') + "&limit=10&offset=0&rating=G&lang=en"
        $.ajax({
            url: callUrl,
            method: "GET"
        }).then(function(response) {
            //empty the gif box of any gifs that are already there
            $('#gifBox').empty();
    
            for(var i = 0; i<response.data.length; i++) {   
                //Creates a new card for each gif and displays them on the page. 
                if (i%2===0) {
                    var newDiv = $('<div class=row>')
                }

                var gifHead = $('<div>')
                gifHead.attr('class', 'card w-50')
                var gifCardBody = $('<div>')
                gifCardBody.attr('class', "card-body")
                var gifImg = $('<img>')
                gifImg.attr('class', 'gif mx-auto mt-3 ml-10')
                gifImg.attr('src', response.data[i].images.fixed_height_still.url)
                gifImg.css("width", response.data[i].images.fixed_height_still.width)
                gifImg.attr('data-still', response.data[i].images.fixed_height_still.url)
                gifImg.attr('data-animate', response.data[i].images.fixed_height.url)
                gifImg.attr('data-state', 'still')

                gifHead.append(gifImg)
                gifHead.append(gifCardBody)
                $('#gifBox').append(gifHead)

                var gifRating = $('<p>')
                gifRating.text("Rating: " + response.data[i].rating +  " -------  Score: " + response.data[i]._score)
                var metaData=$('<p>')
                metaData.text("Title: " + response.data[i].title)
                gifCardBody.append(gifRating)
                gifCardBody.append(metaData)
            }        
        });
    })

    $(document.body).on("click","img", function() {
        console.log('working')
        var state = $(this).data('state');
        var state=$(this).attr("data-state")
        if (state==='still') {
        $(this).attr("data-state", 'animate')
        $(this).attr("src", $(this).attr('data-animate'))
        } else if (state==='animate') {
        $(this).attr("data-state", 'still')
        $(this).attr("src", $(this).attr('data-still'))
        }
    })
})    
