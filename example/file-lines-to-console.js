const processFileLines = require('../process-file-lines');


processFileLines('./process-file-lines.js', (line) => {
    console.log(line);
})
    .then(() => {
        console.log('-completed reading file-');
    })
    .catch((err) => {
        console.log('Error', err);
    });