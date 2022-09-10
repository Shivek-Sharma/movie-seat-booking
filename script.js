const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const seatCount = document.getElementById('count');
const totalPrice = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value; //'+' to change string to number

populateUI();
updateSelected();

//store selected movie index and price
function storeMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update count and total
function updateSelected() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat); //'...' copies the whole element
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    seatCount.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        selectedSeats.forEach((seat) => {
            seats[seat].classList.add('selected');
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = movieSelect[selectedMovieIndex].value;
    }
}

//movie selection event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;

    updateSelected();
    storeMovieData(e.target.selectedIndex, e.target.value);
});

//seats selection event
container.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelected();
    }
});

