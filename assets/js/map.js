var MapComponent = {
  /** @public **/
  init: function() {

    this.myLatlng = {lat: 41.3700964, lng: 2.129584614};

    this.map = new google.maps.Map(document.getElementById('gmap'), {
         zoom: 4,
         center: this.myLatlng,
         styles: [{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"},{"weight":"2.29"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#a1f199"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#afa0a0"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#e4dfd9"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#84b09e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#fafeb8"},{"weight":"1.25"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#f1ffb8"},{"weight":"1.48"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#5ddad6"}]}]
       });

       var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';


        var infowindow = new google.maps.InfoWindow({
           content: contentString
        });



       var marker = new google.maps.Marker({
         position: this.myLatlng,
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
           infowindow.open(this.map, marker);
         }).bind(this), 3000);
       }).bind(this));

       marker.addListener('click', (function() {
           this.map.setZoom(8);
           this.map.setCenter(marker.getPosition());
       }).bind(this));

       marker.addListener('dragend', (function() {
         alert('Dragged');
       }).bind(this));
  }
}
