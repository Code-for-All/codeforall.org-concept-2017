wget "http://api.codeforamerica.org/api/organizations?type=Code+for+All&per_page=1000" -O ./_data/organizations.json
wget "http://api.codeforamerica.org/api/projects?organization_type=Code+for+All" -O ./_data/projects.json
