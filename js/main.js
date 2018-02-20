var blockInput = true;
var rolling = true;

var leadingZeroes = 5;
var pins = "135797531";
var trailingZeroes = 56;
var frame = 1;
var totalScore = 0;

readOnly(true);
refillBox();

function startBowling() {
    readOnly(false);
    blockInput = false;
    refillBox();
}

function keyDown(event) {
    if (blockInput || event.keyCode !== 8) {
        refillBox();
        return;
    }
    console.log("keydown");
    rolling = true;
}

function keyUp(event) {
    if (blockInput || !rolling || event.keyCode !== 8) {
        refillBox();
        return;
    }
    var result = document.getElementById('bowling').value;
    score(result);
    advanceFrame();
    refillBox();
    rolling = false;
}

function readOnly(tf) {
    document.getElementById('bowling').readOnly = tf;
}

function refillBox() {
    document.getElementById('bowling').value = getLaneString();
}

function getLaneString() {
    var lane = '';

    lane = addZeroesToString(lane, leadingZeroes);
    lane = lane + pins;
    lane = addZeroesToString(lane, trailingZeroes);

    return lane;

    function addZeroesToString(str, numOfZeroes) {
        for (i = 0; i < numOfZeroes; i++) {
            str = str + '0';
        }
        return str;
    }
}

function score(lane) {
    var score = getScore(lane);
    addToTotal(score);
    writeTotal(totalScore);
    document.getElementById('scoretable').rows[frame].cells[1].firstChild.data = score;
    alert('You\'ve scored ' + score);
    if (frame >= 10) {
        endGame();
    }

}

function addToTotal(n){
    totalScore += n;
}

function writeTotal(total){
    document.getElementById('scoretable').rows[11].cells[1].firstChild.data = total;
}

function advanceFrame() {
    frame++;
}

function getScore(lane) {
    return parseInt(lane.slice(-1));
}

function endGame() {
    alert('Total score: ' + totalScore);
    reset();
}

function reset() {

}