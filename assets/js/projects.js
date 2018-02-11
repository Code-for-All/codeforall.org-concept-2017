$(document).ready(function () {
  initDataTable();
  // function getProjects() {
  //   $.getJSON('http://api.codeforamerica.org/api/organizations?type=Code+for+All&per_page=100', function(response) {
  //     callback(response);
  //   });
  // }
  function convert_accented_characters(str){
    var conversions = new Object();
    conversions['ae'] = 'ä|æ|ǽ';
    conversions['oe'] = 'ö|œ';
    conversions['ue'] = 'ü';
    conversions['Ae'] = 'Ä';
    conversions['Ue'] = 'Ü';
    conversions['Oe'] = 'Ö';
    conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
    conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
    conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
    conversions['c'] = 'ç|ć|ĉ|ċ|č';
    conversions['D'] = 'Ð|Ď|Đ';
    conversions['d'] = 'ð|ď|đ';
    conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
    conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
    conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
    conversions['g'] = 'ĝ|ğ|ġ|ģ';
    conversions['H'] = 'Ĥ|Ħ';
    conversions['h'] = 'ĥ|ħ';
    conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
    conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
    conversions['J'] = 'Ĵ';
    conversions['j'] = 'ĵ';
    conversions['K'] = 'Ķ';
    conversions['k'] = 'ķ';
    conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
    conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
    conversions['N'] = 'Ñ|Ń|Ņ|Ň';
    conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
    conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
    conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
    conversions['R'] = 'Ŕ|Ŗ|Ř';
    conversions['r'] = 'ŕ|ŗ|ř';
    conversions['S'] = 'Ś|Ŝ|Ş|Š';
    conversions['s'] = 'ś|ŝ|ş|š|ſ';
    conversions['T'] = 'Ţ|Ť|Ŧ';
    conversions['t'] = 'ţ|ť|ŧ';
    conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
    conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
    conversions['Y'] = 'Ý|Ÿ|Ŷ';
    conversions['y'] = 'ý|ÿ|ŷ';
    conversions['W'] = 'Ŵ';
    conversions['w'] = 'ŵ';
    conversions['Z'] = 'Ź|Ż|Ž';
    conversions['z'] = 'ź|ż|ž';
    conversions['AE'] = 'Æ|Ǽ';
    conversions['ss'] = 'ß';
    conversions['IJ'] = 'Ĳ';
    conversions['ij'] = 'ĳ';
    conversions['OE'] = 'Œ';
    conversions['f'] = 'ƒ';
    for(var i in conversions){
        var re = new RegExp(conversions[i],"g");
        str = str.replace(re,i);
    }
    return str;
  }
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
                project.organization_id = convert_accented_characters(object.id.toLowerCase().replace(/\./g, "").replace(/ /g, "-"));
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
            return '<a href="/partners/' + full.organization_id + '">' + data + '</a>';
          }
        }
      ]
    });
  }
});