#tsc -w --allowimportmodule -outDir ../www/js `find ts -type f` --module "commonjs" &
tsc -w -out ../www/js/firemote.js `find ts -type f` --module "commonjs" &
