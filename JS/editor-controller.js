'use strict'
let gElCanvas
let gCtx
let gDone = false
var gEditSaveMeme = false



function onOpenMemeEditor(elImg) {
    updateSelectedImgId(elImg.id)
    document.body.classList.toggle('editor-open')

    if (elImg.classList.contains("close-modal")) return

    gElCanvas = document.querySelector(".my-canvas")
    gCtx = gElCanvas.getContext('2d')
    if (elImg.classList.contains("meme-img")) elImg.src = `meme-imgs/${elImg.id}.jpg`
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    document.querySelector(".font-color").value = "#ffffff"
    document.querySelector(".meme-text").value = ''
    if (!elImg.classList.contains("meme-img")) resetLines()
    else{
        gDone = true
        _renderCanvas()
        gDone= false
    }
}

function onCreateLine(txt) {
    changeMemeText(txt)
    _renderCanvas()
}

function _renderCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    _drawImage()
    const memes = getMeme()
    memes.lines.forEach((line, idx) => drawText(line, idx, memes.selectedLineIdx))
}

function drawText(line, currIdx, selectedIdx) {
    const x = gElCanvas.width / 2
    var y
    if (currIdx === 0) y = gElCanvas.height - (gElCanvas.height * 0.9)
    else if (currIdx === 1) y = gElCanvas.height - (gElCanvas.height * 0.1)
    else y = (gElCanvas.height - (gElCanvas.height * 0.9 - gElCanvas.height * 0.1 * (idx - 1)))

    const txt = line.txt
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px impact`
    gCtx.textAlign = `${line.align}`
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    if (currIdx === selectedIdx && !gDone) {
        const txtLength = line.txt.split('').length * line.size
        gCtx.strokeStyle = 'black'
        gCtx.strokeRect(x - (txtLength / 2), y - (line.size / 2), txtLength, line.size)
    }
}

function onChangeFontColor(color) {
    changeFontColor(color)
    _renderCanvas()
}

function onSwitchLine() {
    const line = switchLine()
    document.querySelector(".meme-text").value = line.txt
    _renderCanvas()
}

function clearCanvas() {
    document.querySelector(".font-color").value = "#ffffff"
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    _drawImage()
    document.querySelector(".meme-text").value = ''
    resetLines()
}

function onNewLine() {
    document.querySelector(".meme-text").value = ''
    _renderCanvas()
    newLine()
}

function onBigFont() {
    bigFont()
    _renderCanvas()
}
function onSmallFont() {
    smallFont()
    _renderCanvas()
}
function onChangeAlign(el) {
    changeTextAlign(el.id)
    _renderCanvas()
}

function onDone() {
    gDone = true
    _renderCanvas()
    save(gElCanvas)
    if (gEditSaveMeme){
        renderMemes()
        gEditSaveMeme = false
    }
    document.body.classList.toggle('editor-open')
    document.querySelector(".meme-saved").style.display = "block"
    setTimeout(()=>{
        document.querySelector(".meme-saved").style.display = "none"}
        ,3000)   
}

function onDeleteLine() {
    deleteLine()
    _renderCanvas()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function _drawImage() {
    var imgId = getImageId()
    const img = document.getElementById(`${imgId}`)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function changeGEditSaveMeme(){
    gEditSaveMeme = true
}
