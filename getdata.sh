wget http://api.codeforamerica.org/api/organizations?type=Code+for+All -O ./_data/organizations.json
wget http://api.codeforamerica.org/api/projects?organization_type=Code+for+All -O ./_data/projects.json
wget http://api.codeforamerica.org/api/organizations.geojson -O ./assets/organizations.geojson
