#!/bin/bash

APP_NAME=$1

if [ -z "$APP_NAME" ]; then
  echo "Adj meg egy új app nevet!"
  exit 1
fi

cp -r hswlp-shell-template "hswlp-shell-$APP_NAME"
cd "hswlp-shell-$APP_NAME"

# Cserék
sed -i "s/hswlp-shell-template/hswlp-shell-$APP_NAME/g" package.json
sed -i "s/hswlp-shell-template/hswlp-shell-$APP_NAME/g" wrangler.jsonc
sed -i "s/SITE_NAME = .*/SITE_NAME = \"$APP_NAME\"/" src/constants.ts

echo "✅ Létrehozva: hswlp-shell-$APP_NAME"
echo "Most már csak a hswlp-shell-$APP_NAME mappába kell menned, és futtatni a 'npm install' parancsot."
echo "Ezután már használhatod is az új appodat!"
echo "Ne felejtsd el a 'wrangler publish' parancsot használni a frissítésekhez!"
echo "Sok sikert az új appodhoz!"
echo "Ha bármilyen kérdésed van, ne habozz kérdezni!"
echo "A következő lépés: cd hswlp-shell-$APP_NAME && npm install"
echo "És már indulhat is a fejlesztés!"