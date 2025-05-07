const carousel = document.getElementById("carousel");

window.onload = () => {
  window.scrollTo(0, 0);
  carousel.scrollBy({ left: 2700, behavior: 'instant' });

  // Evento de clique no personagem
  const personagemImg = document.getElementById("personagemImg");
  if (personagemImg) {
    personagemImg.addEventListener("click", () => {
      const chatBox = document.getElementById("chatBox");
      if (chatBox) chatBox.style.display = "block";
    });
  }
};


function scrollCarouselLeft() {
  carousel.scrollBy({ left: -700, behavior: 'smooth' });
}

function scrollCarouselRight() {
  carousel.scrollBy({ left: 700, behavior: 'smooth' });
}


function redirectTo(url) {
  window.open(url, '_blank');
}









