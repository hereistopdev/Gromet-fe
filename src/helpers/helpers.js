export function preventImgRightClick() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach((img) => img.addEventListener('contextmenu', (e) => {e.preventDefault()}))
}