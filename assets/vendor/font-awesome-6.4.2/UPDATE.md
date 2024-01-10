# Update Font Awesome Library

1. Download the latest free package from the font awesome website
2. Extract/unzip the package
3. Copy the files from the new `fontawesome-free-x.x.x/scss` and paste them into `assets/vendor/font-awesome-x.x.x/scss` in dotcom
4. Copy the files from the new `fontawesome-free-x.x.x/webfonts` and paste them into `assets/static/fonts` in dotcom
5. Update the imports in `assets/vendor/font-awesome-x.x.x/scss/fontawesome.scss`

- As of writting this the imports to add are `regular`, `brands`, `solid`, `v4-shims`

6. Update the font awesome folder name in dotcom to the new version number `assets/vendor/font-awesome-x.x.x`
7. Update the import in `assets/vendor/fontawesome.scss` to use the new font awesome version number
