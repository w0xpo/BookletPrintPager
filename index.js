const argv = require('yargs').argv
console.log();

if (!argv.total || !argv.size) {
    console.log('insufficient args\n');
    return;
}
if (typeof argv.total !== 'number' || typeof argv.size !== 'number') {
    console.log('invalid args\n');
    return;
}

const total = argv.total;
const bookletSize = argv.size;
const verbose = !!argv.verbose;

const paperSheets = Math.ceil(total / 4);
const bookletsCount = Math.ceil(total / bookletSize);

console.log('total pages = ' + total);
console.log('booklet size = ' + bookletSize);
console.log('paper sheets = ' + paperSheets);
console.log('booklets count: ' + bookletsCount + '\n');

var all = '';

for (let i = 0; i < bookletsCount; i++) {
    if (verbose) {
        console.log('booklet #' + (i + 1));
    }
    const pagesPrinted = bookletSize * i;
    const pagesLeft = total - pagesPrinted;
    const bookletPages = pagesLeft >= bookletSize ? bookletSize : pagesLeft;
    if (verbose && bookletPages < bookletSize) {
        console.log('(partial)');
    }

    var bookletPageNumbers = [];
    for (let x = 1, y = bookletPages; x < y; x = x + 2, y = y - 2) {
        bookletPageNumbers.push(' ' + (pagesPrinted + y));
        bookletPageNumbers.push(pagesPrinted + x);
        bookletPageNumbers.push(pagesPrinted + x + 1);
        bookletPageNumbers.push(pagesPrinted + y - 1);
    }
    all += bookletPageNumbers.join() + "\n";

    if (verbose) {
        console.log(bookletPageNumbers.join());
        console.log();
    }
}

console.log(all);