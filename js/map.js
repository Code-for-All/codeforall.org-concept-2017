$(document).ready(function() {

  $.getJSON("http://codeforamerica.org/api/organizations.geojson", function (response){

    $(".mobile-menu").click(function(e){
      e.preventDefault();
      $(".nav-global-secondary ul").slideToggle();
    })

    var orgs = response;
    var cfallOrgs = [];
    orgs.features.forEach(function(org) {
      if (org.properties.type.indexOf("Code for All") != -1){

          org.properties.icon = {}
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [0, 25]

        if (org.properties['name'] == 'Code for America'){
          org.properties.icon['iconUrl'] = "images/cfamerica.png"
        }
        if (org.properties['name'] == 'Codigo para la Ciudad de Mexico'){
          org.properties.icon['iconUrl'] = "images/labplc.jpeg"
        }
        if (org.properties['name'] == 'Code for the Caribbean'){
          org.properties.icon['iconUrl'] = "images/cfcaribbean.png"
        }
        if (org.properties['name'] == 'Code for Africa'){
          org.properties.icon['iconUrl'] = "images/cfafrica.png"
        }
        if (org.properties['name'] == 'Code for South Africa'){
          org.properties.icon['iconUrl'] = "images/cfsa.png"
        }
        if (org.properties['name'] == 'Code for Kenya'){
          org.properties.icon['iconUrl'] = "images/cfke.png"
        }
        if (org.properties['name'] == 'Code for Nigeria'){
          org.properties.icon['iconUrl'] = "images/cfng.png"
        }
        if (org.properties['name'] == 'Code for Ghana'){
          org.properties.icon['iconUrl'] = "images/cfgh.png"
        }
        if (org.properties['name'] == 'Code for Ireland'){
          org.properties.icon['iconUrl'] = "images/cfireland.png"
        }
        if (org.properties['name'] == 'Code for Germany'){
          org.properties.icon['iconUrl'] = "images/cfgermany.jpeg"
        }
        if (org.properties['name'] == 'Code for Poland'){
          org.properties.icon['iconUrl'] = "images/cfpoland.svg"
        }
        if (org.properties['name'] == 'Code for Pakistan'){
          org.properties.icon['iconUrl'] = "images/cfpakistan.png"
        }
        if (org.properties['name'] == 'Code for Seoul'){
          org.properties.icon['iconUrl'] = "images/cfseoul.png"
        }
        if (org.properties['name'] == 'Code for Japan'){
          org.properties.icon['iconUrl'] = "images/cfjapan.png"
        }
        if (org.properties['name'] == 'Code for Australia'){
          org.properties.icon['iconUrl'] = "images/cfaustralia.jpeg"
        }
        if (org.properties['name'] == 'g0v.tw'){
          org.properties.icon['iconUrl'] = "images/g0v.png"
        }
        if (org.properties['name'] == 'Codeando México'){
          org.properties.icon['iconUrl'] = "images/cfmexico.png"
        }
        if (org.properties['name'] == 'Code for Ghana'){
          org.properties.icon['iconUrl'] = "images/ghana.png"
        }
        if (org.properties['name'] == 'Code for Nigeria'){
          org.properties.icon['iconUrl'] = "images/nigeria.png"
        }
        if (org.properties['name'] == 'Code for Kenya'){
          org.properties.icon['iconUrl'] = "images/kenya.png"
        }
        if (org.properties['name'] == 'Code for Africa'){
          org.properties.icon['iconUrl'] = "images/c4africa.png"
        }
        if (org.properties['name'] == 'Code for Tomorrow'){
          org.properties.icon['iconUrl'] = "images/cftomorrow.png"
        }
        if (org.properties['name'] == 'CodeNamu(Code for Korea)'){
          org.properties.icon['iconUrl'] = "images/codenamu.png"
        }

        cfallOrgs.push(org);
      }
    });

    showMap(cfallOrgs);
  });


  function showMap(cfallOrgs){
    // codeforamerica.j113mi4d - code for all
    // codeforamerica.map-hhckoiuj - brigade
    var map = L.mapbox.map('map', 'codeforamerica.map-hhckoiuj',
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

    featureLayer.on('click', function(e) {
      window.open(e.layer.feature.properties.website);
    });

  };

});
