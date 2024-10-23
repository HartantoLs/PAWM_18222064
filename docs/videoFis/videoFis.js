document.addEventListener("DOMContentLoaded", function() {
    const images = [
        '../image/night.jpg',
        '../image/dark.jpg',
        '../image/wow.jpg',
        '../image/luxuBlack.jpg'
    ];

    let currentIndex = 0;

    function changeBackgroundImage() {
        alert("yes")
        document.body.style.backgroundImage = `url('${images[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % images.length;
    }


    changeBackgroundImage();

    setInterval(changeBackgroundImage, 5000);
});