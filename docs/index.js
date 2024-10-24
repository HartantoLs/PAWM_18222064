var buttons = document.querySelectorAll(".Button");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
            this.classList.toggle("clicked"); 
            setTimeout(() => {
                this.classList.remove("clicked");
            }, 100);
        
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
});

document.getElementById("playButton").onclick = function() {
    window.location.href = "./materiRev/materiRev.html";
    ; 
};

