$(document).ready(function() {

  $.getJSON(base_url + "organizations.geojson", function (response){

    $(".mobile-menu").click(function(e){
      e.preventDefault();
      $(".nav-global-secondary ul").slideToggle();
    })

    var orgs = response;
    var cfallOrgs = [];
    orgs.features.forEach(function(org) {

      if (org.properties.type.indexOf("Code for All") != -1){
          org.properties.icon = {}
          org.properties.icon.iconSize = [38, 38]
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [0, 25]

        if (org.properties['name'] == 'Code for America'){
          org.properties.icon['iconUrl'] = base_url + "images/cfamerica.png"
        }
        if (org.properties['name'] == 'Codigo para la Ciudad de Mexico'){
          org.properties.icon['iconUrl'] = base_url + "images/labplc.jpeg"
        }
        if (org.properties['name'] == 'Code for the Caribbean'){
          org.properties.icon['iconUrl'] = base_url + "images/cfcaribbean.png"
        }
        if (org.properties['name'] == 'Code for Africa'){
          org.properties.icon['iconUrl'] = base_url + "images/cfafrica.png"
        }
        if (org.properties['name'] == 'Code for South Africa'){
          org.properties.icon['iconUrl'] = base_url + "images/cfsa.png"
        }
        if (org.properties['name'] == 'Code for Kenya'){
          org.properties.icon['iconUrl'] = base_url + "images/cfke.png"
        }
        if (org.properties['name'] == 'Code for Nigeria'){
          org.properties.icon['iconUrl'] = base_url + "images/cfng.png"
        }
        if (org.properties['name'] == 'Code for Ghana'){
          org.properties.icon['iconUrl'] = base_url + "images/cfgh.png"
        }
        if (org.properties['name'] == 'Code for Ireland'){
          org.properties.icon['iconUrl'] = base_url + "images/cfireland.png"
        }
        if (org.properties['name'] == 'Code for Germany'){
          org.properties.icon['iconUrl'] = base_url + "images/cfgermany.jpeg"
        }
        if (org.properties['name'] == 'Code for Poland'){
          org.properties.icon['iconUrl'] = base_url + "images/cfpoland.svg"
        }
        if (org.properties['name'] == 'Code for Pakistan'){
          org.properties.icon['iconUrl'] = base_url + "images/cfpakistan.png"
        }
        if (org.properties['name'] == 'Code for Seoul'){
          org.properties.icon['iconUrl'] = base_url + "images/cfseoul.png"
        }
        if (org.properties['name'] == 'Code for Japan'){
          org.properties.icon['iconUrl'] = base_url + "images/cfjapan.png"
        }
        if (org.properties['name'] == 'Code for Australia'){
          org.properties.icon['iconUrl'] = base_url + "images/cfaustralia.jpeg"
        }
        if (org.properties['name'] == 'g0v.tw'){
          org.properties.icon['iconUrl'] = base_url + "images/g0v.png"
        }
        if (org.properties['name'] == 'Codeando México'){
          org.properties.icon['iconUrl'] = base_url + "images/cfmexico.png"
        }
        if (org.properties['name'] == 'Code for Ghana'){
          org.properties.icon['iconUrl'] = base_url + "images/ghana.png"
        }
        if (org.properties['name'] == 'Code for Nigeria'){
          org.properties.icon['iconUrl'] = base_url + "images/nigeria.png"
        }
        if (org.properties['name'] == 'Code for Kenya'){
          org.properties.icon['iconUrl'] = base_url + "images/kenya.png"
        }
        if (org.properties['name'] == 'Code for Africa'){
          org.properties.icon['iconUrl'] = base_url + "images/c4africa.png"
        }
        if (org.properties['name'] == 'Code for Tomorrow'){
          org.properties.icon['iconUrl'] = base_url + "images/cftomorrow.png"
        }
        if (org.properties['name'] == 'CodeNamu(Code for Korea)'){
          org.properties.icon['iconUrl'] = base_url + "images/codenamu.png"
        }

        cfallOrgs.push(org);
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
      //if (feature.properties.icon && feature.properties.icon.iconUrl) {
    //   return {icon: L.icon(feature.properties.icon)};
     //}
    };

    function worldStyle(feature) {
      var fillcolor = "#ccc";
      if (feature.properties.chapter) {
        fillcolor = "#3273dc";
      }
      if (feature.properties.type && feature.properties.type.toLowerCase() == "governing partner") {
        fillcolor = "#ffdd57"
      }
      return {
          fillColor: fillcolor,
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
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
