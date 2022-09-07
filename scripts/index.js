var gameContainers = document.querySelectorAll(".game-container")

gameContainers.forEach((container) => {
    container.addEventListener('click', loadGame)
})

function loadGame(e) {
    e.stopPropagation()
    console.log(this.classList.value)
    if(this.classList.contains("mole-game")) {
        window.location = '../whack-a-mole/index.html'
    }
    else if(this.classList.contains("simons-game")) {
        window.location = '../simons-game/index.html'
    }
}