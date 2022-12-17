'use strict'
function init() {
    renderGallery()
    document.querySelector(".search").style.display = 'inline block'

}

function toggleMenu() {
    document.body.classList.toggle("open-menu")
}

function renderGallery(key) {
    if (!key || key.length === 0) key = 'all'
    const Imgs = getImgs(key)
    var srtHTML = Imgs.map(img => `<img onclick="onOpenMemeEditor(this,event)" id="${img.id}" src="${img.url}">`)
    document.querySelector('.imgs-container').innerHTML = srtHTML.join('')
}


function onSearch(search){
    renderGallery(search)
}
