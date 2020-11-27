var result = new Set();
var repeat = new Set();
var winner = new Set();

function listCheck() {
    var content = document.getElementById('textArea').value;
    // console.log(content);

    var lotteryList = content.split('\n');
    lotteryList.forEach(item => {
        item = item.replace(/\s*/g, ''); // Remove all spaces in the string.
        item = item.toUpperCase();
        result.has(item) ? repeat.add(item) : result.add(item);
    });

    var output = '';
    repeat.forEach(item => {
        output += item + '<br>';
    });

    var inputRepeat = document.getElementById('inputRepeat');
    if (repeat.size)
        inputRepeat.innerHTML = output;
    else
        inputRepeat.innerHTML = '太好了，沒有重複的情況。'

    console.log(repeat)
    console.log(result)
}

function organizeList() {
    var textArea = document.getElementById('textArea');
    var output = ''
    result.forEach(item => {
        output += item + '\n';
    });

    textArea.value = output;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function lottery() {
    var content = document.getElementById('textArea').value;
    var lotteryList = content.split('\n');
    if (lotteryList[0] == '')
        lotteryList.pop();

    var value = document.getElementById('value').value; // 抽幾個人
    var repeat = document.getElementById('repeat'); // 是否重複抽

    var lucky = document.getElementById('lucky');
    var repeatList = document.getElementById('repeatList');

    // 處理已抽過名單
    if (!repeat.checked)
        repeatList.innerText = '如果不想要抽到同一個人，請勾選「名額不重複」。';
    else {
        pWinner = ''
        winner.forEach(item => {
            pWinner += item + '<br>';
        });
        repeatList.innerHTML = pWinner;
    }

    // 人數統計
    if (value > lotteryList.length)
        value = lotteryList.length;
    if (value > lotteryList.length - winner.size && repeat.checked)
        value = lotteryList.length - winner.size;
    if (value < 0)
        value = 0;
    document.getElementById('number').innerText = '從 ' + lotteryList.length + ' 人中抽出 ' + value + ' 名得獎者'

    // 抽獎
    output = '';
    for (var i = 0; i < value; i++) {
        if (repeat.checked) { // 名額不要重複
            var tempWinner = lotteryList[getRandomInt(lotteryList.length)];
            console.log(tempWinner);
            while (winner.has(tempWinner))
                tempWinner = lotteryList[getRandomInt(lotteryList.length)];
            winner.add(tempWinner);
            output += tempWinner + '<br>';
        }
        else {
            output += lotteryList[getRandomInt(lotteryList.length)] + '<br>';
            console.log(output);
        }
    }
    console.log(output);
    lucky.innerHTML = output;
};

// 離開頁面警告
window.onbeforeunload = function (event) { return confirm("確定離開此頁面嗎？"); }