# Build website
#
# Run from root level of repo, eg ./bin/quick-build.sh local-site.yml

# generate html

antora $1

#fix html

./bin/fix-div.sh
