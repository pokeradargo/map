var MapComponent = {
  /** @public **/
  init: function() {

    this.defaultCenter = {lat: 41.3700964, lng: 2.129584614};

    this.map = new google.maps.Map(document.getElementById('gmap'), {
         zoom: 4,
         center: this.defaultCenter,
         styles: [{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"},{"weight":"2.29"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#a1f199"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#afa0a0"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#e4dfd9"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#84b09e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#fafeb8"},{"weight":"1.25"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"},{"weight":"1.48"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#5ddad6"}]}]
       });

        var infowindow = new google.maps.InfoWindow({
           content: '<h3>0 Pokémons Found </h3> <p>No information to display yet</p>'
        });



       var marker = new google.maps.Marker({
         position: this.defaultCenter,
         map: this.map,
         title: 'Your Location',
         html: '<h3>Pokémon to appear</h3>',
         draggable: true
       });

       this.map.addListener('center_changed', (function() {
         // 3 seconds after the center of the map has changed, pan back to the
         // marker.
         window.setTimeout((function() {
             this.map.panTo(marker.getPosition());
         }).bind(this), 3000);
       }).bind(this));

       marker.addListener('click', (function() {
           this.map.setZoom(8);
           this.map.setCenter(marker.getPosition());
           infowindow.open(this.map, marker);
       }).bind(this));

       marker.addListener('dragend', (function() {
           //$.getJSON( "assets/js/response_mock.json", function( data ) {
               var data = {
                   "pokemon_prediction": [
                       {
                           "id": 56,
                           "name": "Mankey",
                           "probability": 0.8656
                       },
                       {
                           "id": 84,
                           "name": "Doduo",
                           "probability": 0.75343
                       }
                   ]
               };

               var totalPokemons = data['pokemon_prediction'].length;
               var title = '<h3>' + totalPokemons + ' Pokémons Found </h3>';

               var content = '<ul>';
               data['pokemon_prediction'].forEach(function(pokemon) {
                   content += '<li>#' + pokemon.id + ' ' + pokemon.name + ' with a probability of ' + pokemon.probability + '</li>';
               });
               content += '</ul>';


               infowindow.setContent(title + '<div>' + content + '</div>');
           //});
       }).bind(this));
  }
}
