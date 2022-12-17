var gImgs = []
var gNumOfImgs = 19
var id = 1

createImg(id)
function createImg(id) {
    for (var i = 0; i < gNumOfImgs; i++) {
        const img = {
            id: id,
            url: `meme-imgs/${id}.jpg`,
            keywords: getKewWords(id),
        }
        id++
        gImgs.push(img)
    }
}

function getKewWords(id) {
    const keyWords = [['politics', 'funny', 'people'], ['animals', 'cute'], ['animals', 'cute', 'kids'],
    ['animals', 'cute'], ['kids', 'cute', 'funny'], ['funny', 'people'], ['funny', 'kids', 'cute'],
    ['funny', 'people'], ['funny', 'kids'], ['funny', 'politics', 'people'], ['funny', 'people'],
    ['funny', 'people'], ['funny', 'people'], ['serious', 'people'], ['funny', 'people'],
    ['funny', 'people'], ['politics', 'people'], ['funny', 'kids'],['funny', 'people']]
    return keyWords[id-1]
}

function getImgs(key) {
    if (key === 'all') return gImgs
    const imgsToShow = gImgs.filter(img =>img.keywords.join('').includes(key))
    return imgsToShow
}

function getImgUrl(id) {
    const url = gImgs.find(img => img.id == (+id))
}
function getImageId() {
    const imgId = gImgs.findIndex(img => img.id === +gMeme.selectedImgId) + 1
    return imgId
}
