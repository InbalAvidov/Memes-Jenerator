'use strict'
function init() {
    renderGallery()
}

function toggleMenu() {
    document.body.classList.toggle("open-menu")
}

function renderGallery() {
    const Imgs = getImgs()
    var srtHTML = Imgs.map(img => `<img onclick="onOpenMemeEditor(this,event)" id="${img.id}" src="${img.url}">`)
    document.querySelector('.imgs-container').innerHTML = srtHTML.join('')
}
