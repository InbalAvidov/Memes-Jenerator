'use strict'
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomText() {
    const sent = []
    const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consec', 'adipis', 'elit', 'Ad', 'earum', 'ut', 'itaque', 'dolor', 'paria', 'harum']
    for (var i = 0; i < 4; i++) {
        const idx = getRandomInt(0, words.length)
        const currWord = words[idx]
        sent.push(currWord)
    }
    return sent.join(' ')
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}