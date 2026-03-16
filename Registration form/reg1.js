// 1. Session Timer Logic
let timeLeft = 300;
setInterval(() => {
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;
    document.getElementById('clock').innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    if (timeLeft > 0) timeLeft--;
}, 1000);

// 2. Real-time Payment Calculation
function updatePrice() {
    const price = parseInt(document.getElementById('ticketType').value);
    const seats = parseInt(document.getElementById('numSeats').value);
    const total = price * seats;
    document.getElementById('totalDisplay').innerText = "₹" + total;
}

// 3. Process Registration and Show Modal
function processRegistration(e) {
    e.preventDefault();
    
    // Set Modal Data
    const ticketSelect = document.getElementById('ticketType');
    const ticketName = ticketSelect.options[ticketSelect.selectedIndex].text.split(' (')[0];
    const totalText = document.getElementById('totalDisplay').innerText.replace('₹', '');

    document.getElementById('resName').innerText = document.getElementById('fullName').value;
    document.getElementById('resTicket').innerText = ticketName;
    document.getElementById('resTotal').innerText = totalText;

    document.getElementById('successPopup').style.display = "block";
}

// 4. Redirection Logic (Step 9 of Algorithm)
function redirectToMain() {
    // This will redirect to your library page or index.html
    window.location.href = 'index.html'; 
}