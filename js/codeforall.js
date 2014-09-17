$(document).ready(function() {

  $.getJSON("http://codeforamerica.org/api/organizations.geojson", function (response){

    var orgs = response;
    var cfallOrgs = [];
    orgs.features.forEach(function(org) {
      if (org.properties.type.indexOf("Code for All") != -1){

        if (org.properties['name'] == 'Code for America'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfamerica.png"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [-10, 75]
          org.properties.icon['popupAnchor'] = [60, -50]
        }
        if (org.properties['name'] == 'Codigo para la Ciudad de Mexico'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/labplc.jpeg"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [75, 35]
          org.properties.icon['popupAnchor'] = [-30, -20]
        }
        if (org.properties['name'] == 'Code for the Caribbean'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfcaribbean.png"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [35, 60]
          org.properties.icon['popupAnchor'] = [15, -30]
        }
        if (org.properties['name'] == 'Code for South Africa'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfsa.png"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [25, 75]
          org.properties.icon['popupAnchor'] = [25, -50]
        }
        if (org.properties['name'] == 'Code for Ireland'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfireland.png"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [85, 75]
          org.properties.icon['popupAnchor'] = [-35, -25]
        }
        if (org.properties['name'] == 'Code for Germany'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfgermany.jpeg"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [75, 25]
          org.properties.icon['popupAnchor'] = [-35, 0]
        }
        if (org.properties['name'] == 'Code for Poland'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfpoland.svg"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [25, 70]
          org.properties.icon['popupAnchor'] = [25, -25]
        }
        if (org.properties['name'] == 'Code for Pakistan'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfpakistan.png"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconSize'] = [100, 100]
          org.properties.icon['popupAnchor'] = [0, -25]
        }
        if (org.properties['name'] == 'Code for Seoul'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfseoul.png"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [75, 75]
          org.properties.icon['popupAnchor'] = [-25, -50]
        }
        if (org.properties['name'] == 'Code for Japan'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfjapan.png"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [25,25]
          org.properties.icon['popupAnchor'] = [25, 0]
        }
        if (org.properties['name'] == 'Code for Australia'){
          org.properties.icon = {}
          org.properties.icon['iconUrl'] = "images/cfaustralia.jpeg"
          org.properties.icon['className'] = 'marker'
          org.properties.icon['iconAnchor'] = [75,75]
          org.properties.icon['popupAnchor'] = [-25,-50]
        }
        
        org.properties['title'] = "<a href="+org.properties.website+">"+org.properties.name + "</a>";
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
      if (feature.properties.icon){
        marker.setIcon(L.icon(feature.properties.icon));
      }
      
    });

    featureLayer.addTo(map);

    featureLayer.on('mouseover', function(e) {
      e.layer.openPopup();
    });

  };

  $('#cfa-listings').dataTable({
    "ajax": function (data, callback, settings) {
      settings.sAjaxDataProp = "objects"
      $.getJSON('http://codeforamerica.org/api/organizations?type=Code+for+All', function(response) {
        callback(response);
      });
    },
    "searching": false,
    "info": false,
    "processing": true,
    "serverSide": false,
    "paging": false,
    "columns": [
      { "data": "name", "render": function (data, type, full, meta) 
        {
          return '<a href="'+full.website+'">'+data+'</a>'
        } 
      },
      {
        "width": "20%",
        "data": "current_projects.0.name",
        "defaultContent": "...",
        "render": function (data, type, full, meta) {
          if (full.current_projects.length) {
            return '<a href="'+full.current_projects[0].code_url+'">'+data+'</a><br /><small>'+full.current_projects[0].description+'</small>'
          }
        }
      },
      {
        "data": "current_stories.0.title",
        "defaultContent": "...",
        "render": function (data, type, full, meta) {
          if (full.current_stories.length) {
            return '<a href="'+full.current_stories[0].link+'">'+data+'</a>'
          }
        }
      },
      // {
      //   "data": "current_events.0.name",
      //   "defaultContent": "...",
      //   "render": function (data, type, full, meta) {
      //     if (full.current_events.length) {
      //       return '<a href="'+full.current_events[0].event_url+'">'+data+'</a>'
      //     }
      //   }
      // }
    ]
  });

  // Resize iframe to fit content
  function resize() {
    var newheight = document.getElementById("widget").contentWindow.document.body.scrollHeight;
    document.getElementById("widget").height = newheight + "px";
  }

});
