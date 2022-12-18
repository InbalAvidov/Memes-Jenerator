'use strict'
function renderMemes() {
    document.body.classList.remove("open-menu")
    const memes = loadFromStorage(STORAGE_KEY)
    if (memes.length === 0) return
    document.querySelector(".search").style.display = 'none'
    var srtHTML = memes.map((meme) => `<img id="${meme.meme.selectedImgId}" class="meme-img" onclick="onEditSaved(this)" src="${meme.url}">`)
    document.querySelector('.imgs-container').innerHTML = srtHTML.join('')
}

function onEditSaved(elImg) {
    const memes = loadFromStorage(STORAGE_KEY)
    const meme = memes.find(meme => elImg.id === meme.meme.selectedImgId)
    const memeIdx = memes.findIndex(meme => elImg.id === meme.meme.selectedImgId)
    memes.splice(memeIdx, 1)
    resaveMemes(memes)
    changeGEditSaveMeme()
    updateLines(meme.meme)
    onOpenMemeEditor(elImg)
}

function DeleteSaveMeme(id){
    const memes = loadFromStorage(STORAGE_KEY)
    const memeIdx = memes.findIndex(meme => id === meme.meme.selectedImgId)
    memes.splice(memeIdx, 1)
    renderMemes()
}

