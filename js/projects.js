$(document).ready(function() {

  $('#cfa-listings').dataTable({
    "ajax": function (data, callback, settings) {
      settings.sAjaxDataProp = "objects"
      $.getJSON('http://api.codeforamerica.org/api/organizations?type=Code+for+All&per_page=100', function(response) {
        callback(response);
      });
    },
    "responsive": true,
    "searching": false,
    "info": false,
    "processing": true,
    "serverSide": false,
    "paging": false,
    "columns": [
      { "data": "name", "render": function (data, type, full, meta)
        {
          return '<a href="http://code-for-all.github.io/codeforall.org'+full.website+'">'+data+'</a>'
        }
      },
      {
        "width": "50%",
        "data": "current_projects.0.name",
        "defaultContent": "...",
        "render": function (data, type, full, meta) {
          if (full.current_projects.length) {
            return '<a href="http://code-for-all.github.io/codeforall.org'+full.current_projects[0].code_url+'">'+data+'</a><br /><small>'+full.current_projects[0].description+'</small>'
          }
        }
      }

    ]
  });

  // Resize iframe to fit content
  function resize() {
    var newheight = document.getElementById("widget").contentWindow.document.body.scrollHeight;
    document.getElementById("widget").height = newheight + "px";
  }

});
