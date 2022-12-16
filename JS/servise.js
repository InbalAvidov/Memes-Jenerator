'use strict'
var gImgs = []
var numOfImg = 19
var id = 1
const STORAGE_KEY = 'memes'
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}
var gIdSave = 101


createImg(id)
function createImg(id) {
    for (var i = 0; i < numOfImg; i++) {
        const img = {
            id: id,
            url: `meme-imgs/${id}.jpg`,
            keywords: '',
        }
        id++
        gImgs.push(img)
    }
}

function getImgs() {
    return gImgs
}

function getImgUrl(id){
    const url = gImgs.find(img => img.id == (+id))
    // return url
}

function updateLines(meme){
gMeme = meme
}

function updateSelectedImgId(id){
gMeme.selectedImgId = id
}

function getImageId() {
    const imgId = gImgs.findIndex(img => img.id === +gMeme.selectedImgId) + 1
    return imgId
}

function changeMemeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getMeme() {
    return gMeme
}

function changeFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
function changeTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function bigFont() {
    console.log(gMeme.selectedLineIdx);
    gMeme.lines[gMeme.selectedLineIdx].size += 5
}
function smallFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5
}
function newLine() {
    gMeme.lines.push(
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'white',
        },
    )
    gMeme.selectedLineIdx++
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    return gMeme.lines[gMeme.selectedLineIdx]
}

function deleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function resetLines(x, y) {
    gMeme.lines = [
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'white',
        },
    ]
    gMeme.selectedLineIdx = 0
}

function save(canvas){
    const savedMeme ={
        url:canvas.toDataURL('image/jpeg'),
        meme: gMeme,
    } 
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    if (!gSavedMemes){
        var gSavedMemes = []
        gSavedMemes.unshift(savedMeme)
    }     
    else{
        gSavedMemes.unshift(savedMeme)
    } 
    saveToStorage(STORAGE_KEY , gSavedMemes)
}

function spliceMeme(memes){
    saveToStorage(STORAGE_KEY, memes)
}