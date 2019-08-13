# process-file-lines

Processes a file by lines.  Calls the callback for each line in the file,
passing the line without the line break.

Corresponding with the behavior of readline, if the final line is merely
a line break sequence, the callback will not be invoked.

## API
This module exports a single function `(fileName, cb)` taking
 * `fileName` is a string representing the file name
 * `cb` is a callback taking one parameter, a string representing a line

 The function returns a promise that resolves upon completion of reading the file
 and rejects in the event of an error, passing the error.

## Use

An example of use that counts the number of lines in a file.
```
const processFileLines = require('process-file-lines');

let count = 0;
processFileLines('../process-file-lines.js', () => {
    count++;
})
    .then(() => {
        console.log('number of lines', count);
    })
    .catch((err) => {
        console.log('Error', err);
    });
```

An example that outputs lines to the console.
```
const processFileLines = require('process-file-lines');

processFileLines('./process-file-lines.js', (line) => {
    console.log(line);
})
    .then(() => {
        console.log('-completed reading file-');
    })
    .catch((err) => {
        console.log('Error', err);
    });
```