module.exports = {
    getRandomWord, getRandomBinaryWord
};

const fs = require('fs');

const nbEasyWords = 24638;
const nbMedWords = 68752;
const nbHardWords = 100938;


function getRandomBinaryWord(difficulty, fn){

       getRandomWord(difficulty, function(result) {
            var binaryObject = [];
            for (var i = 0; i < result.length; i++) {
                binaryObject.push(result.charCodeAt(i).toString(2));
            }
            fn(binaryObject);
        });
}

function getRandomWord(difficulty, fn) {
    var file = 'dictionaryEasy.txt';
    var idx = 0;
    if (difficulty == 'easy') {
        file = 'dictionaryEasy.txt';
        idx = parseInt((Math.random() * 10 * nbEasyWords) % nbEasyWords);
    }
    else if (difficulty == 'avg') {
        file = 'dictionaryMed.txt';
        idx = parseInt((Math.random() * 10 * nbMedWords) % nbMedWords);
    }
    else if (difficulty == 'hard') {
        file = 'dictionaryHard.txt';
        idx = parseInt((Math.random() * 10 * nbHardWords) % nbMedWords);
    }
    getLine('data/dictionaries/' + file, idx, fn);
}

function getLine(file, idx, fn){

    var cpt=0;
    //noinspection JSAnnotator
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(file, {
            flags: 'r',
            encoding: 'utf-8',
            fd: null,
            mode: 0x0666,
            bufferSize: 64 * 1024
         }),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);

    rl.on('line', function (line) {
        cpt++;
        if (cpt === idx){
            instream.close();
            var word = '';
            for (var i = 0; i < line.length ; i++) {
                word += line.charAt(i);
            }
            fn(word);
        }
    });
    rl.on('close', function (line) {
        //console.log('pfff');
       if (cpt == idx){
       }
    });


     /*var reader = new FileReader();

    // assigning handler
    reader.onloadend = function(evt) {
        lines = evt.target.result.split(/\r?\n/);

        lines.forEach(function (line) {
            parseLine(...);
        });
    };

    // getting File instance
    var file = evt.target.files[0];
    //noinspection JSAnnotator
    var stream = fs.createReadStream(filename, {
        flags: 'r',
        encoding: 'utf-8',
        fd: null,
        mode: 0666,
        bufferSize: 64 * 1024
    });

    var fileData = '';
    stream.on('data', function(data){
        fileData += data;

        // The next lines should be improved
        var lines = fileData.split("\n");

        if(lines.length >= +line_no){
            stream.destroy();
            callback(null, lines[+line_no]);
        }
    });

    stream.on('error', function(){
        return 'error';
    });

    stream.on('end', function(){
        console.log('File end reached without finding line', null);
    });*/
}


