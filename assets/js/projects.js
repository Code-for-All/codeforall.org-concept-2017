$(document).ready(function () {
  initDataTable();
  // function getProjects() {
  //   $.getJSON('http://api.codeforamerica.org/api/organizations?type=Code+for+All&per_page=100', function(response) {
  //     callback(response);
  //   });
  // }

  function initDataTable() {
    $('#cfa-listings').dataTable({
      "ajax": function (data, callback, settings) {
        settings.sAjaxDataProp = "";
        $.getJSON('http://api.codeforamerica.org/api/organizations?type=Code+for+All&per_page=100', function (response) {
          // Process them first to get valid projects only
          var projects = [];
          response.objects.forEach(function (object) {
            var valid_projects = [];
            object.current_projects.forEach(function (project) {
              if (project.description && project.description !== "") {
                valid_projects.push(project);
              }
            })

            if (valid_projects.length > 1) {
              projects = projects.concat(valid_projects);
            }
          });
          callback(projects);
        });
      },
      "responsive": false,
      "searching": false,
      "info": true,
      "processing": false,
      "serverSide": false,
      "paging": true,
      "columns": [{
          "data": "commit_status",
          "render": function (data, type, full, meta) {
            if(data){
              switch (data.toLowerCase()) {
                case "success":
                  return '<i class="fas fa-rotate-270 fa-battery-full success" title="Launched"></i>';
                case "pending":
                  return '<i class="fas fa-rotate-270 fa-battery-half progress" title="In progress"></i>';
                case "failure":
                  return '<i class="fas fa-ban failure" title="Stopped"></i>';
                default:
                  return '<i class="fas fa-rotate-270 fa-battery-empty" title="' + data + '"></i>';
              }
            } else {
              return '<i class="fas fa-rotate-270 fa-battery-empty unknown" title="' + data + '"></i>';
            }
          }
        },
        {
          "data": "name",
          "render": function (data, type, full, meta) {
            return '<a href="' + full.code_url + '">' + data + '</a>';
          }
        },
        {
          "data": "description"
        },
        {
          "data": "organization_name",
          "render": function (data, type, full, meta) {
            return '<a href="/partners/' + data.toLowerCase().replace(/ /g, "-") + '">' + data + '</a>';
          }
        }
      ]
    });
  }
});