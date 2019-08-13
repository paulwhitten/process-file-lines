const readLine = require('readline');
const fs = require('fs');

/**
 * Process a file by running the callback on each line
 * @param {*} fileName The file to read
 * @param {*} cb The callback for each line of the file
 * @returns A promise resolving when the file is read
 *          and rejecting if there is an error.
 */
function processFileLines(fileName, cb) {
    return new Promise((res, rej) => {
        // deal with any read stream errors
        let rs = fs.createReadStream(fileName);
        rs.on('error', (err) => {
            rej(err);
        });

        // create the readline interface
        let readInterface = readLine.createInterface({
            input: rs,
            output: null,
            console: false
        });

        // run the callback for any lines
        readInterface.on('line', (data)=> {
            cb(data);
        });

        // resolve when the file closes
        readInterface.on('close', () => {
            res();
        });
    });
}

module.exports = processFileLines;
