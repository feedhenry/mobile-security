# Build website
#
# Run from root level of repo, eg ./bin/build.sh local-site.yml

# get files from other repos using ruby version of asciidoctor

# Removed as not pulling from remotes anymore
# ./bin/ant-include.sh

# generate html with pull for latest https://github.com/aerogear/antora-ui

antora --clean --pull site.yml

# fix html

./bin/fix-div.sh

# replace the generated sitemap.xml by a static one (with updated timestamps)

cp bin/sitemap.xml ./build/site/sitemap.xml

# replace the timestamp from the template by one representing current time and date

sed -i "s/\(<lastmod.*>\)[^<>]*\(<\/lastmod.*\)/\1$(date +"%Y-%m-%dT%H:%M:%S.000Z")\2/" ./build/site/sitemap.xml
