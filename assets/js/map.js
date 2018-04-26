$(document).ready(function() {
  //$.getJSON(base_url + "organizations.geojson", function (response){
  $.getJSON("http://api.codeforamerica.org/api/organizations.geojson", function (response){
    $(".mobile-menu").click(function(e){
      e.preventDefault();
      $(".nav-global-secondary ul").slideToggle();
    })
    function getIcon(properties){
      var icon = {
        iconSize: [ 38, 38],
        className: 'marker',
        iconAnchor: [0,25],
        shadowUrl: '/assets/images/white.png',
        shadowSize: [ 38, 38],
      };
      if(properties.logo_url){
        icon.iconUrl = properties.logo_url;
        return icon;
      }
      
      switch (properties.id.toLowerCase()){
        case "code-for-nl":
          icon.iconUrl = base_url + "images/logo/netherlands.jpg";
          return icon;
        case "code-for-poland":
          icon.iconUrl = base_url + "images/logo/cfpoland.svg";
          return icon;
        default:
          return icon;
      }
    }

    var orgs = response;
    var cfallOrgs = [];
    orgs.features.forEach(function(org) {
      if (org.properties.tags.indexOf("Code for All") != -1){
        org.properties.icon = getIcon(org.properties);
        if(org.properties.id.toLowerCase() !== 'hacking-monterrey'){
          cfallOrgs.push(org);
        }
        
      }
    });

    showMap(cfallOrgs);
  });


  function hasMatch(feature, collection){
    collection.filter(function(a){
      console.log(a.id);
      console.log(feature);
      return a.id.toLowerCase() == feature.id.toLowerCase })[0];
  }
  function showMap(cfallOrgs){
    // codeforamerica.j113mi4d - code for all
    // codeforamerica.map-hhckoiuj - brigade
    var worldLayer;
    var latlon = [27, 0], zoom = 2;
    var map = L.map('map').setView(latlon, zoom);

    function iconStyle(feature) {
      if (feature.properties.icon && feature.properties.icon.iconUrl) {
        return {icon: L.icon(feature.properties.icon)};
      }
    };

    function worldStyle(feature) {
      var fillcolor = "#ccc";
      //if (feature.properties.partner) {
      //  fillcolor = "#3273dc";
      //}
      if (feature.properties.type && feature.properties.type.toLowerCase() == "governing partner") {
        fillcolor = "#3273dc";
        //fillcolor = "#ffdd57"
      }
      return {
          fillColor: fillcolor,
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 1
      };
    };

    function zoomToFeature(e) {
      var layer = e.target;
      $('#map-info').text(layer.feature.properties.name);
      if(layer.feature.id) {
        $('#' + layer.feature.id.toLowerCase()).addClass("map-highlight");
      } else {
        map.fitBounds(layer.getBounds());
      }
    }

    function resetHighlight(e) {
      var layer = e.target;
      worldLayer.resetStyle(layer);
      if(layer.feature.id) {
        $('#' + layer.feature.id.toLowerCase()).removeClass("map-highlight");
      }
      $('#map-info').html("&nbsp;");
    }

    function highlightFeature(e) {
      var layer = e.target;
      if(layer.feature.id) {
        $('#' + layer.feature.id.toLowerCase()).addClass("map-highlight");
        $('#map-info').html('<em>' + layer.feature.properties.name + '</em>');
      } else {
        layer.setStyle({
          color: '#3273dc'
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
        $('#map-info').html('<i>' + layer.feature.properties.NAME + '</i>');
      }

    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    // Add the worldmap
    //.addTo(map);
    $.getJSON( base_url + 'worldmap.geojson', function (response) {
      worldLayer = L.geoJSON(response,{style: worldStyle, onEachFeature: onEachFeature}).addTo(map);
    });

    featureLayer = L.geoJSON(cfallOrgs, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, iconStyle(feature));
        }, onEachFeature: onEachFeature
    }).addTo(map);
    map.fitBounds(featureLayer.getBounds());
  };

});
