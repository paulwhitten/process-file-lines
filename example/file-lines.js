const processFileLines = require('../process-file-lines');

let count = 0;
processFileLines('./process-file-lines.js', () => {
    count++;
})
    .then(() => {
        console.log('number of lines', count);
    })
    .catch((err) => {
        console.log('Error', err);
    });

