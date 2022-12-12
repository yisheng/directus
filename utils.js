const fs = require('fs');

// Usage: node ./utils.js updateVersions 9.21.1

const command = process.argv[2];
const params = process.argv[3];
switch (command) {
    case 'updateVersions': {
        updateVersions(params);
        break;
    }
    default: {
        console.error('Invalid command.');
    }
}

function updateVersions(newVersion) {
    const folders = [
        './',
        './api/',
        './app/',
        './packages/create-directus-extension/',
        './packages/drive/',
        './packages/drive-azure/',
        './packages/drive-gcs/',
        './packages/drive-s3/',
        './packages/extensions-sdk/',
        './packages/schema/',
        './packages/shared/',
        './packages/specs/'
    ];
    folders.forEach((folder) => {
        var filePath = folder + 'package.json';
        var content = require(filePath);
        content.version = newVersion;

        fs.writeFile(filePath, JSON.stringify(content, null, '	') + '\n', function writeJSON(err) {
            if (err) {
                console.log(filePath + ' - error: ' + err);
            }else {
                console.log(filePath + ' - done');
            }
        });
    });
}
