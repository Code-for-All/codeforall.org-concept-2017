$(document).ready(function() {

  $.getJSON(base_url + "resources.json", function (response){
    // loop the response.
    response.forEach(function(resource) {
        console.log(resource.name);

        // create card
        var card = $('<div/>', {
          class: 'card'
        });
        var cardContent = $('<div/>',{
          class: 'card-content'
        }).appendTo(card);
        var media = $('<div/>',{
          class: 'media'
        }).appendTo(cardContent);
        var mediaLeft = $('<div/>',{
          class: 'media-left'
        }).appendTo(media);
        var figure = $('<figure/>',{
          class: 'image is-48x48'
        }).appendTo(mediaLeft);
        //var figureLink = $('<a/>',{
        //  class: 'button is-large ' + resource.type,
        //  href: resource.link.url
        //}).appendTo(figure);
        //var figureIcon = $('<i/>',{
        //  class: 'fas ' + resource.link.type
        //}).appendTo(figureLink);
        var smallImage = $('<img/>',{
          src: resource.author.avatar || "https://bulma.io/images/placeholders/96x96.png",
          alt: resource.author.name || ""
        }).appendTo(figure) ;
        var mediacontent = $('<div/>',{
          class: 'media-content'
        }).appendTo(media);
        var title = $('<p/>',{
          class: 'title is-4'
        }).html('<a href="' + resource.link.url + '">' + resource.name + '</a>').appendTo(mediacontent);
        var title = $('<p/>',{
          class: 'subtitle is-6'
        }).html(resource.year).appendTo(mediacontent);
        // Add details
        $('<div/>',{
          class: 'content'
        }).append(resource.description).appendTo(cardContent);

        // append card to correct column
        $('#' + resource.group).append(card);
    });
  });
});
