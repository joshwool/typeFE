import * as wordfreq from '../../../static/json/wordfreq.json';
import * as input from '../input/input';
import * as display from './display';
//hello from Anton
export let wordList: Array<string> = [];

function genWord() {
    wordList.push(wordfreq.wordfreq[Math.floor(Math.random()*1000)]);
    let word = $("<div class='word'></div>");
    for (let x = 0; x < wordList[wordList.length-1].length; x++) {
        let char = $("<span class='char'>"+wordList[wordList.length-1].charAt(x)+"</span>");
        word.append(char);
    }
    return word;
}

export function genWords(num: number): void {
    for (let i = 0; i < num; i++) {
        $("#wordDis").append(genWord());
    }
    if (input.wordInd === 0) {
        $(".word").first().addClass("wordCur")
    }
}

export function genLines(num: number): void {
    for (let i = 0; i < num; i++) {
        let lineWidth = 0;
        $("#wordDis").append("<div class='line'></div>");
        while (lineWidth < $("#wordDis").outerWidth()) {
            $(".line").last().append(genWord());
            lineWidth += $(".word").last().outerWidth(true);
        }
        $(".word").last().remove();
        wordList.pop();
    }
    if (input.wordInd === 0) {
        $(".word").first().addClass("wordCur");
    }
    display.updateLines();
}