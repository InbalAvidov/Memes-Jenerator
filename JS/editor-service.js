'use strict'
const STORAGE_KEY = 'memes'
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}


function updateLines(meme) {
    gMeme = meme
}

function updateSelectedImgId(id) {
    gMeme.selectedImgId = id
}


function changeMemeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getMeme() {
    return gMeme
}

function getLine(){
    return gMeme.lines[gMeme.selectedLineIdx]
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function changeFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
function changeTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function bigFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5
}
function smallFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    return gMeme.lines[gMeme.selectedLineIdx]
}

function deleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function newLine(txt) {
    if (!txt) var txt = ''
    gMeme.selectedLineIdx++
    gMeme.lines.push(
        {
            txt,
            size: 30,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: {}
        },
    )
}

function resetLines() {
    gMeme.selectedLineIdx = 0
    gMeme.lines = [
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: {}
        },
    ]
}

function save(canvas) {
    const savedMeme = {
        url: canvas.toDataURL('image/jpeg'),
        meme: gMeme,
    }
    savedMemes = loadFromStorage(STORAGE_KEY)
    if (!savedMemes || savedMeme.length === 0) {
        var savedMemes = []
        savedMemes.unshift(savedMeme)
    }
    else {
        savedMemes.unshift(savedMeme)
    }
    saveToStorage(STORAGE_KEY, savedMemes)
}

function resaveMemes(memes) {
    saveToStorage(STORAGE_KEY, memes)
}

function createRandomMeme() {
    const imgId = getRandomInt(1, gNumOfImgs + 1)
    const numOfLines = getRandomInt(0, 2)
    gMeme.selectedImgId = imgId
    for (var i = 0; i <= numOfLines; i++) {
        const line = {
            txt: getRandomText(),
            size: 20,
            align: 'center',
            color: getRandomColor(),
            font: 'impact'

        }
        gMeme.lines[i] = line
    }
    return imgId
}

function isLineClicked(pos) {
    const lines = gMeme.lines
    const idx = lines.findIndex((line) => 
        pos.x > line.pos.x && pos.x < line.pos.xLength &&
         pos.y > line.pos.y && pos.y < line.pos.yLength
    )
    return idx 
}

function setLine(idx){
    gMeme.selectedLineIdx = idx
    return gMeme.lines[gMeme.selectedLineIdx]
}
function setLineIsDrag(bool){
    gMeme.lines[gMeme.selectedLineIdx].isDrag = bool
}
 function setPosition(pos){
    const idx = gMeme.selectedLineIdx
    const txtLength = gMeme.lines[idx].txt.split('').length * gMeme.lines[idx].size / 2
    gMeme.lines[idx].pos.x = pos.x
    gMeme.lines[idx].pos.y = pos.y
    gMeme.lines[idx].xLength = txtLength + pos.x
    gMeme.lines[idx].yLength = (gMeme.lines[idx].size * 2) + pos.y
 }