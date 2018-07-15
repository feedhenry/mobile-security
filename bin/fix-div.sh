# fix html to reverse divs output from asciidco block

find ./build -type f -exec \
    perl -0pi -e 's/<div class="content">\n(<div class="title">.*)/\1<div class="content">/g' {} +
