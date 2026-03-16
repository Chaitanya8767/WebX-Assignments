// Array of Book Objects (The "Database")
const books = [
    { title: "Let Us C", author: "Yashavant Kanetkar", status: "Available", img: "https://covers.openlibrary.org/b/id/12869403-L.jpg", cat: "Engineering", rate: "⭐⭐⭐⭐" },
    { title: "Wings of Fire", author: "A.P.J. Abdul Kalam", status: "Available", img: "https://covers.openlibrary.org/b/id/8231846-L.jpg", cat: "Fiction", rate: "⭐⭐⭐⭐⭐" },
    { title: "Cracking the Coding Interview", author: "Gayle McDowell", status: "Available", img: "https://covers.openlibrary.org/b/id/11485601-L.jpg", cat: "Engineering", rate: "⭐⭐⭐⭐⭐" },
    { title: "The Silent Patient", author: "Alex Michaelides", status: "Issued", img: "https://covers.openlibrary.org/b/id/12845648-L.jpg", cat: "Fiction", rate: "⭐⭐⭐⭐" },
    { title: "Java: The Complete Reference", author: "Herbert Schildt", status: "Available", img: "https://covers.openlibrary.org/b/id/12613583-L.jpg", cat: "Engineering", rate: "⭐⭐⭐⭐" },
    { title: "Atomic Habits", author: "James Clear", status: "Available", img: "https://covers.openlibrary.org/b/id/12885406-L.jpg", cat: "Self-Help", rate: "⭐⭐⭐⭐⭐" },
    { title: "Operating Systems", author: "Silberschatz", status: "Available", img: "https://covers.openlibrary.org/b/id/10595441-L.jpg", cat: "Engineering", rate: "⭐⭐⭐⭐" },
    { title: "The Psychology of Money", author: "Morgan Housel", status: "Available", img: "https://covers.openlibrary.org/b/id/12771569-L.jpg", cat: "Self-Help", rate: "⭐⭐⭐⭐" },
    { title: "Clean Code", author: "Robert C. Martin", status: "Available", img: "https://covers.openlibrary.org/b/id/10534221-L.jpg", cat: "Engineering", rate: "⭐⭐⭐⭐⭐" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "Issued", img: "https://covers.openlibrary.org/b/id/12711090-L.jpg", cat: "Fiction", rate: "⭐⭐⭐⭐" }
];

// 1. Function to Update the UI (Grid and Table)
function updateUI(bookList) {
    const grid = document.getElementById('bookGrid');
    const tableBody = document.getElementById('tableBody');
    
    grid.innerHTML = "";
    tableBody.innerHTML = "";

    bookList.forEach(book => {
        const isAvail = book.status === "Available";
        const dotClass = isAvail ? "dot-available" : "dot-issued";

        // Generate Card
        grid.innerHTML += `
            <div class="book-card">
                <img src="${book.img}" onclick="openBorrow('${book.title}', '${book.author}')" alt="${book.title}">
                <div style="color:#fbbf24; font-size:12px">${book.rate}</div>
                <h4>${book.title}</h4>
                <p style="font-size:12px; color:#94a3b8">${book.author}</p>
                <p style="font-size:11px"><span class="status-dot ${dotClass}"></span>${book.status}</p>
            </div>
        `;

        // Generate Table Row
        tableBody.innerHTML += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.cat}</td>
                <td><span class="status-dot ${dotClass}"></span>${book.status}</td>
            </tr>
        `;
    });
}

// 2. Search Logic
function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = books.filter(b => 
        b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
    );
    updateUI(filtered);
}

// 3. Category Filter Logic
function filterCategory(category) {
    const btns = document.querySelectorAll('.cat-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filtered = (category === 'All') ? books : books.filter(b => b.cat === category);
    updateUI(filtered);
}

// 4. Modal (Popup) Logic
function openBorrow(title, author) {
    document.getElementById('modalTitle').innerText = "Request: " + title;
    document.getElementById('modalAuthor').innerText = "Author: " + author;
    document.getElementById('borrowModal').style.display = "block";
}

function closeModal() {
    document.getElementById('borrowModal').style.display = "none";
}

function handleBorrow(e) {
    e.preventDefault();
    alert("Request successfully registered in the system.");
    closeModal();
}

// Initializing the system
updateUI(books);