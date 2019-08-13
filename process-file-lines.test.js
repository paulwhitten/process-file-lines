const processFileLines = require('./process-file-lines')

it('works with a multiline file', () => {
    expect.assertions(2);
    let i = 0;
    let data = '';
    const expected = '1\n23a\n4\n'; 
    function countLines(line) {
        data += line + '\n';
        i++;
    }
    return processFileLines('./test-data/data.txt', countLines).then(() => {
        expect(i).toEqual(3);
        expect(data).toEqual(expected);
    });
});

it('works with an empty file', () => {
    expect.assertions(1);
    let i = 0;
    function countLines(line) {
        i++;
    }
    return processFileLines('./test-data/empty.txt', countLines).then(() => {expect(i).toEqual(0)});
});

it('works with a one line file with break', () => {
    expect.assertions(2);
    let i = 0;
    let data = '';
    function countLines(line) {
        i++;
        data += line;
    }
    return processFileLines('./test-data/one-line.txt', countLines).then(() => {
        expect(i).toEqual(1);
        expect(data).toEqual('1');
    });
});

/**
 * A one line file with text and no break will succeed.
 */
it('works with a one line file with no break', () => {
    expect.assertions(2);
    let i = 0;
    let data = '';
    function countLines(line) {
        i++;
        data += line;
    }
    return processFileLines('./test-data/one-line-no-break.txt', countLines).then(() => {
        expect(i).toEqual(1);
        expect(data).toEqual('123')
    });
});


it('rejects with a bad file', () => {
    expect.assertions(1);
    const expected = {errno: -2, code: 'ENOENT', syscall: 'open', path: './blah' };
    function countLines(line) {
    }

    return processFileLines('./blah', countLines).catch((e) => {
        expect(e.errno).toEqual(expected.errno);
    });
});

