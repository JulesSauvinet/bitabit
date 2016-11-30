module.exports = {
    interpretSolution
};

const ascii = {'32': ' ', '44' : ',', '46': '.', '65' : 'A', '66' : 'B', '67' : 'C', '68' : 'D', '69' : 'E', '70' : 'F',
    '71' : 'G', '72' : 'H', '73' : 'I', '74' : 'J', '75' : 'K', '76' : 'L', '77' : 'M',
    '78' : 'N', '79' : 'O', '80' : 'P', '81' : 'Q', '82' : 'R','83' : 'S', '84' : 'T', 
    '85' : 'U', '86' : 'V', '87' : 'W', '88' : 'X', '89' : 'Y', '90' : 'Z',
    
    '97' : 'a', '98' : 'b', '99' : 'c', '100' : 'd', '101' : 'e','102' : 'f', '103' : 'g', '104' : 'h', 
    '105' : 'i', '106' : 'j', '107' : 'k', '108' : 'l', '109' : 'm',
    '110' : 'n', '111' : 'o', '112' : 'p', '113' : 'q', '114' : 'r','115' : 's', 
    '116' : 't', '117' : 'u', '118' : 'v', '119' : 'w', '120' : 'x', '121' : 'y', '122' : 'z'};

function interpretSolution(userProposal, binaryWord, fn){

    var solution = binaryToWord(binaryWord);

    var check = [];
    var i = 0;

    for (var i=0; i<solution.length; i++) {
        check.push(solution.charAt(i) == userProposal.charAt(i));
    }
    fn(check);
}

function binaryToWord(binaryWord) {
    var word ='';

    binaryWord.forEach(function(letter) {word += binaryToLetter(letter);});

    return word;
}

function binaryToLetter(binaryGram) {
    var decimalTrad = 0;

    for (var i=0; i<binaryGram.length; i++) {
        decimalTrad += parseInt(binaryGram.charAt(i))*Math.pow(2,binaryGram.length-i-1);
    }
    var decimalString = decimalTrad.toString();

    return ascii[decimalString];
}