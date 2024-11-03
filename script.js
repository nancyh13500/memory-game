const cards = [
'https://picsum.photos/id/237/100/100',
'https://picsum.photos/id/225/100/100',
'https://picsum.photos/id/238/100/100',
'https://picsum.photos/id/240/100/100',
'https://picsum.photos/id/152/100/100',
'https://picsum.photos/id/242/100/100',
'https://picsum.photos/id/30/100/100',
'https://picsum.photos/id/244/100/100'
];
const gameBoard = document.getElementById('game-board');

//variable pour selectionner les cartes et valider les paires
let selectedCards = [];


function createCard(cardUrl) {
    const card = document.createElement('div'); //creation de la div
    card.classList.add('card'); //creation de la card image
    card.dataset.value = cardUrl; //creation de l'url de l'image

    const cardContent = document.createElement('img'); //contenu de la card
    cardContent.classList.add('card-content'); //creation de la classe card content
    cardContent.src = `${cardUrl}`; //creation de la source
    
    card.appendChild(cardContent); //ajout de l'enfant donc le contenu card content
    
    card.addEventListener('click', onCardClick);
    return card;
}

function duplicateArray(arraySimple) { //duplicate array pour creer le tableau d'images
    let arrayDouble = [];
    arrayDouble.push(...arraySimple); //... sert à ajouter une à une les cases du tableau
    arrayDouble.push(...arraySimple);

    return arrayDouble;
}

function onCardClick(e){
    const card = e.target.parentElement;
    card.classList.add('flip');
    
    
    selectedCards.push(card);
    if(selectedCards.length == 2){
// le code a exectuer apres le timout
        setTimeout(() => {
            if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
                // on a trouvé une paire
                selectedCards[0].classList.add("matched");
                selectedCards[1].classList.add("matched");
                selectedCards[0].removeEventListener('click', onCardClick);
                selectedCards[1].removeEventListener('click', onCardClick);

                const allCardsNotMatched = document.querySelectorAll('.card:not(.matched');
                console.log(allCardsNotMatched.length);
                
                if(allCardsNotMatched.length == 0){
                    alert("Bravo, vous avez gagné");
                }
            }
            else {
                // on s'est trompé
                selectedCards[0].classList.remove("flip");
                selectedCards[1].classList.remove("flip");
            }
            selectedCards = [];
        }, 1000); //1 seconde
    }
}

function shuffleArray(arrayToShuffle){
    const arrayShuffled = arrayToShuffle.sort(() => 0.5 - Math.random()); //nb aleatoire de -0.5 à 0.5
    return arrayShuffled;
}
let allCards = duplicateArray(cards); //constante let et non const pour lui dire de melanger toutes les cartes

//Mélanger les cartes

allCards = shuffleArray(allCards);
allCards.forEach(card => { //pour chaque carte
    const cardHtml = createCard(card);
    gameBoard.appendChild(cardHtml);
})