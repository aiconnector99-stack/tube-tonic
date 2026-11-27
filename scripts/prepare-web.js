// Copies the game and the Capacitor runtime scripts into www/ for the Android build.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www);
const copies = [
  ['index.html', 'index.html'],
  ['node_modules/@capacitor/core/dist/capacitor.js', 'capacitor.js'],
  ['node_modules/@capacitor/app/dist/plugin.js', 'capacitor-app.js'],
  ['node_modules/@capacitor/haptics/dist/plugin.js', 'capacitor-haptics.js'],
];
for (const [from, to] of copies) fs.copyFileSync(path.join(root, from), path.join(www, to));
console.log('www/ ready');
