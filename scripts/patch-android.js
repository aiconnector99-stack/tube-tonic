// Adjusts the generated Android project: portrait only, version numbers, optional release signing.
const fs = require('fs');
const path = require('path');
const android = path.join(__dirname, '..', 'android');

const manifestPath = path.join(android, 'app/src/main/AndroidManifest.xml');
let manifest = fs.readFileSync(manifestPath, 'utf8');
if (!manifest.includes('android:screenOrientation')) {
  manifest = manifest.replace(/<activity\b/, '<activity\n            android:screenOrientation="portrait"');
}
fs.writeFileSync(manifestPath, manifest);

const gradlePath = path.join(android, 'app/build.gradle');
let gradle = fs.readFileSync(gradlePath, 'utf8');
const versionCode = parseInt(process.env.VERSION_CODE || '1', 10);
const versionName = (process.env.VERSION_NAME || '1.0.0').replace(/^v/, '');
gradle = gradle.replace(/versionCode \d+/, `versionCode ${versionCode}`);
gradle = gradle.replace(/versionName "[^"]*"/, `versionName "${versionName}"`);
if (process.env.KEYSTORE_PATH && !gradle.includes('signingConfigs.release')) {
  gradle += `
android {
    signingConfigs {
        release {
            storeFile file(System.getenv("KEYSTORE_PATH"))
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
`;
}
fs.writeFileSync(gradlePath, gradle);
console.log(`Android patched: portrait, versionCode ${versionCode}, versionName ${versionName}${process.env.KEYSTORE_PATH ? ', release signing' : ''}`);
