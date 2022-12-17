'use strict'
let gElCanvas
let gCtx
let gDone = false
var gEditSaveMeme = false
var gRandomMeme = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var gStartPos
var gRowIdx
var gLongRow = false


function onOpenMemeEditor(elImg) {
    updateSelectedImgId(elImg.id)
    document.body.classList.add('editor-open')
    gElCanvas = document.querySelector(".my-canvas")
    gCtx = gElCanvas.getContext('2d')
    addEventListeners()
    if (elImg.classList.contains("meme-img")) elImg.src = `meme-imgs/${elImg.id}.jpg`
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    document.querySelector(".font-color").value = "#ffffff"
    document.querySelector(".meme-text").value = ''
    if (gRandomMeme) _renderCanvas()
    else if (!elImg.classList.contains("meme-img")) resetLines()
    else {
        gDone = true
        _renderCanvas()
        gDone = false
    }
}

function onCloseEditor(ev) {
    ev.stopPropagation()
    if (gEditSaveMeme) onSave()
    if (gRandomMeme) gRandomMeme = false
    document.body.classList.remove('editor-open')
}


function addEventListeners() {
    gElCanvas.addEventListener('mousedown', onCanvas)
    gElCanvas.addEventListener('touchstart', onCanvas)

    gElCanvas.addEventListener('mousemove', onDrag)
    gElCanvas.addEventListener('touchmove', onDrag)

    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('touchend', onUp)
}

function onCanvas(ev) {
    const pos = getEvPos(ev)
    gRowIdx = isLineClicked(pos)
    if (gRowIdx === -1) return
    if (gRowIdx >= 0) {
        const line = setLine(gRowIdx)
        setLineIsDrag(true)
        document.querySelector(".meme-text").value = line.txt
        gStartPos = pos
        _renderCanvas()
    }

}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDrag(ev) {
    const { isDrag } = getLine()
    if (!isDrag) return
    const pos = getEvPos(ev)
    gStartPos = pos
    _renderCanvas()
}


function onUp() {
    const { isDrag } = getLine()
    if (!isDrag) return
    setPosition(gStartPos)
    setLineIsDrag(false)
    setLineIsDrag(false)
    _renderCanvas()
}

function onFlexMeme() {
    gRandomMeme = true
    const imgId =  getRandomImgId()
    const elImg = document.getElementById(`${imgId}`)
    onOpenMemeEditor(elImg)
}

function onCreateLine(txt) {
    if (gLongRow) {
        document.querySelector(".line-alert").classList.add("open-alert")
        return
    }
    else {
        changeMemeText(txt)
        _renderCanvas()
    }
}

function _renderCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    _drawImage()
    const memes = getMeme()
    memes.lines.forEach((line, idx) => drawText(line, idx, memes.selectedLineIdx))
}

function getLinePos(line, idx) {
    const txtLength = line.txt.split('').length * line.size / 2
    if (idx === gRowIdx) var { x, y } = gStartPos
    else if (line.isDrag !== undefined) {
        var x = line.pos.x + (txtLength / 2) + 10
        var y = line.pos.y + (line.size / 2)
    }
    else {
        var x = gElCanvas.width / 2
        var y
        var yDis = gElCanvas.height
        if (idx === 0) y = yDis - (0.9 * yDis)
        else if (idx === 1) y = yDis - (0.1 * yDis)
        else y = yDis - ((yDis * 0.9) - (yDis * 0.1 * (idx - 1)))
    }
    const pos = {
        x,
        y
    }
    return pos
}

function drawText(line, currIdx, selectedIdx) {
    const pos = getLinePos(line, currIdx)
    const txt = line.txt
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px '${line.font}'`
    gCtx.textAlign = `${line.align}`
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)

    if (currIdx === selectedIdx && !gDone && line.txt || gRandomMeme) {
        var txtLength = line.txt.split('').length * line.size / 2
        if (txtLength > 250) {
            gLongRow = true
        }
        const posX = pos.x - (txtLength / 2) - 10
        const posY = pos.y - (line.size / 2)
        if (currIdx === selectedIdx && !gDone && line.txt){
            gCtx.strokeStyle = 'black'
            gCtx.strokeRect(posX, posY, txtLength + 20, line.size)
        }
        line.pos.x = posX
        line.pos.y = posY
        line.pos.xLength = txtLength + posX
        line.pos.yLength = (line.size * 2) + posY
    }
    console.log(line);
}

function onChangeFont(font) {
    changeFont(font)
    _renderCanvas()
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
    document.querySelector(".line-alert").classList.remove("open-alert")
    document.querySelector(".meme-text").value = ''
    _renderCanvas()
    newLine()
    gLongRow = false
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
}

function onSave() {
    save(gElCanvas)
    if (gEditSaveMeme) {
        renderMemes()
        gEditSaveMeme = false
    }
    document.body.classList.toggle('editor-open')
    document.querySelector(".meme-saved").style.display = "block"
    setTimeout(() => {
        document.querySelector(".meme-saved").style.display = "none"
    }
        , 3000)
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

function changeGEditSaveMeme() {
    gEditSaveMeme = true
}

function onAddSticker(val) {
    var sticker
    if (+val === 1) sticker = '😂'
    else if (+val === 2) sticker = '🤔'
    else if (+val === 3) sticker = '😫'
    else sticker = '🤯'
    gCtx.font = '50px impact'
    const loc = gElCanvas.width / 2
    newLine(sticker)
    _renderCanvas()
}

function onUpload(){
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            console.log('url:', url)
            onSuccess(url)
        })
}