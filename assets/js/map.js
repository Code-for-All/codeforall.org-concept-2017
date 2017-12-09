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
          console.log(org.id.toLowerCase());
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


  function showMap(cfallOrgs){
    // codeforamerica.j113mi4d - code for all
    // codeforamerica.map-hhckoiuj - brigade
    var map = L.mapbox.map('map', 'codeforamerica.j113mi4d',
    {
      scrollWheelZoom:false
    });
    var latlon = [27, 0], zoom = 2;
    map.setView(latlon, zoom);

    // Add the cfall orgs to the map
    var featureLayer = L.mapbox.featureLayer(cfallOrgs)

    featureLayer.eachLayer(function(marker) {
      feature = marker.feature;
      if (feature.properties.icon['iconUrl']){
        marker.setIcon(L.icon(feature.properties.icon));
      }

    });

    featureLayer.addTo(map);
    featureLayer.on('mouseover', function(e){
      $('#' + e.layer.feature.id.toLowerCase()).addClass("map-highlight");
      $('#map-info').text(e.layer.feature.properties.name);
    });
    featureLayer.on('mouseout', function(e){
      $('#' + e.layer.feature.id.toLowerCase()).removeClass("map-highlight");
      $('#map-info').html("&nbsp;");
    });
    featureLayer.on('click', function(e) {
      $('#map-info').text(e.layer.feature.properties.name);
      $('#' + e.layer.feature.id.toLowerCase()).addClass("map-highlight");
    });

  };

});
