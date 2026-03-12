/* =============================================
   BIBLIOTHECA — Library Management System JS
   ============================================= */

// =========================================
// STATE
// =========================================
const State = {
  books: [],
  members: [],
  transactions: [],
  currentPage: 'dashboard',
};

// =========================================
// SEED DATA
// =========================================
const SEED_BOOKS = [
  { id: 'B001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', year: 1925, isbn: '9780743273565', copies: 3, available: 2, emoji: '📖' },
  { id: 'B002', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, isbn: '9780061935466', copies: 2, available: 2, emoji: '⚖️' },
  { id: 'B003', title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', year: 1965, isbn: '9780441013593', copies: 4, available: 3, emoji: '🌌' },
  { id: 'B004', title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, isbn: '9780451524935', copies: 3, available: 1, emoji: '🔭' },
  { id: 'B005', title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction', year: 2011, isbn: '9780062316097', copies: 2, available: 2, emoji: '🧬' },
  { id: 'B006', title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', year: 1988, isbn: '9780062315007', copies: 5, available: 4, emoji: '✨' },
  { id: 'B007', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Psychology', year: 2011, isbn: '9780374533557', copies: 2, available: 2, emoji: '🧠' },
  { id: 'B008', title: 'The Lean Startup', author: 'Eric Ries', genre: 'Business', year: 2011, isbn: '9780307887894', copies: 3, available: 3, emoji: '🚀' },
  { id: 'B009', title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', year: 2018, isbn: '9780735211292', copies: 4, available: 3, emoji: '⚡' },
  { id: 'B010', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937, isbn: '9780618260300', copies: 3, available: 2, emoji: '🧙' },
  { id: 'B011', title: 'Cosmos', author: 'Carl Sagan', genre: 'Sci-Fi', year: 1980, isbn: '9780345539434', copies: 2, available: 2, emoji: '🌠' },
  { id: 'B012', title: 'Educated', author: 'Tara Westover', genre: 'Memoir', year: 2018, isbn: '9780399590504', copies: 2, available: 1, emoji: '📚' },
];

const SEED_MEMBERS = [
  { id: 'M001', name: 'Arjun Sharma', email: 'arjun.sharma@email.com', phone: '+91 98765 43210', joined: '2024-01-15', status: 'active', color: '#7c3aed' },
  { id: 'M002', name: 'Priya Patel', email: 'priya.patel@email.com', phone: '+91 87654 32109', joined: '2024-02-20', status: 'active', color: '#db2777' },
  { id: 'M003', name: 'Rohan Desai', email: 'rohan.desai@email.com', phone: '+91 76543 21098', joined: '2024-03-05', status: 'active', color: '#0369a1' },
  { id: 'M004', name: 'Sneha Iyer', email: 'sneha.iyer@email.com', phone: '+91 65432 10987', joined: '2024-04-10', status: 'active', color: '#047857' },
  { id: 'M005', name: 'Vikram Nair', email: 'vikram.nair@email.com', phone: '+91 54321 09876', joined: '2023-11-18', status: 'active', color: '#b45309' },
];

const SEED_TRANSACTIONS = [
  { id: 'T001', bookId: 'B001', memberId: 'M001', type: 'issue', date: daysAgo(10), dueDate: daysAgo(-4), returned: false },
  { id: 'T002', bookId: 'B003', memberId: 'M002', type: 'issue', date: daysAgo(8), dueDate: daysAgo(-6), returned: false },
  { id: 'T003', bookId: 'B010', memberId: 'M003', type: 'issue', date: daysAgo(20), dueDate: daysAgo(-8), returned: true, returnDate: daysAgo(3) },
  { id: 'T004', bookId: 'B004', memberId: 'M004', type: 'issue', date: daysAgo(5), dueDate: daysAgo(9), returned: false },
  { id: 'T005', bookId: 'B009', memberId: 'M005', type: 'issue', date: daysAgo(18), dueDate: daysAgo(-4), returned: false },
  { id: 'T006', bookId: 'B006', memberId: 'M001', type: 'issue', date: daysAgo(30), dueDate: daysAgo(-16), returned: true, returnDate: daysAgo(15) },
];

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

// =========================================
// INIT
// =========================================
function init() {
  State.books = JSON.parse(localStorage.getItem('lib_books') || 'null') || SEED_BOOKS;
  State.members = JSON.parse(localStorage.getItem('lib_members') || 'null') || SEED_MEMBERS;
  State.transactions = JSON.parse(localStorage.getItem('lib_transactions') || 'null') || SEED_TRANSACTIONS;

  setPageDate();
  bindNavigation();
  bindTopbar();
  bindModal();
  bindFilters();
  navigateTo('dashboard');
}

function save() {
  localStorage.setItem('lib_books', JSON.stringify(State.books));
  localStorage.setItem('lib_members', JSON.stringify(State.members));
  localStorage.setItem('lib_transactions', JSON.stringify(State.transactions));
}

function setPageDate() {
  const now = new Date();
  document.getElementById('pageDate').textContent =
    now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// =========================================
// NAVIGATION
// =========================================
function bindNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
  document.querySelectorAll('.text-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}

function navigateTo(page) {
  State.currentPage = page;
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(`page-${page}`);
  if (el) el.classList.add('active');

  const titles = { dashboard: 'Dashboard', catalog: 'Book Catalog', members: 'Members', transactions: 'Transactions', overdue: 'Overdue Books' };
  document.getElementById('pageTitle').textContent = titles[page] || page;

  renderPage(page);
}

function renderPage(page) {
  if (page === 'dashboard') renderDashboard();
  else if (page === 'catalog') renderCatalog();
  else if (page === 'members') renderMembers();
  else if (page === 'transactions') renderTransactions();
  else if (page === 'overdue') renderOverdue();
  updateOverdueBadge();
}

// =========================================
// TOPBAR
// =========================================
function bindTopbar() {
  document.getElementById('addNewBtn').addEventListener('click', () => {
    const page = State.currentPage;
    if (page === 'catalog' || page === 'dashboard') openAddBookModal();
    else if (page === 'members') openAddMemberModal();
    else if (page === 'transactions') openIssueModal();
    else openAddBookModal();
  });

  document.getElementById('globalSearch').addEventListener('input', function () {
    if (State.currentPage === 'catalog') renderCatalog(this.value);
    else if (State.currentPage === 'members') renderMembers(this.value);
    else if (State.currentPage === 'transactions') renderTransactions(null, this.value);
  });
}

// =========================================
// DASHBOARD
// =========================================
function renderDashboard() {
  const issued = State.transactions.filter(t => !t.returned);
  const overdue = getOverdue();

  animateCounter('statTotalBooks', State.books.length);
  animateCounter('statMembers', State.members.length);
  animateCounter('statIssued', issued.length);
  animateCounter('statOverdue', overdue.length);

  // Recent activity
  const container = document.getElementById('recentActivity');
  const recent = [...State.transactions].reverse().slice(0, 6);
  if (!recent.length) {
    container.innerHTML = '<div class="empty-state-small">No transactions yet</div>';
  } else {
    container.innerHTML = recent.map(t => {
      const book = getBook(t.bookId);
      const member = getMember(t.memberId);
      return `<div class="activity-item">
        <div class="activity-dot ${t.type}"></div>
        <div class="activity-info">
          <div class="activity-book">${book ? book.title : 'Unknown'}</div>
          <div class="activity-member">${member ? member.name : 'Unknown'} · ${t.type === 'issue' ? 'Borrowed' : 'Returned'}</div>
        </div>
        <span class="activity-date">${formatDate(t.date)}</span>
      </div>`;
    }).join('');
  }

  // Popular books
  const bookIssueCount = {};
  State.transactions.forEach(t => {
    bookIssueCount[t.bookId] = (bookIssueCount[t.bookId] || 0) + 1;
  });
  const popular = Object.entries(bookIssueCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const popContainer = document.getElementById('popularBooks');
  if (!popular.length) {
    popContainer.innerHTML = '<div class="empty-state-small">No data yet</div>';
  } else {
    popContainer.innerHTML = popular.map(([bookId, count], i) => {
      const book = getBook(bookId);
      return `<div class="popular-item">
        <div class="popular-rank ${i === 0 ? 'top' : ''}">${i + 1}</div>
        <div class="popular-info">
          <div class="popular-title">${book ? book.title : 'Unknown'}</div>
          <div class="popular-count">${count} issue${count > 1 ? 's' : ''}</div>
        </div>
      </div>`;
    }).join('');
  }

  // Genre breakdown
  const genreCount = {};
  State.books.forEach(b => { genreCount[b.genre] = (genreCount[b.genre] || 0) + b.copies; });
  const maxCount = Math.max(...Object.values(genreCount));
  const genreContainer = document.getElementById('genreBars');
  const sorted = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
  genreContainer.innerHTML = sorted.map(([genre, count]) => `
    <div class="genre-bar-item">
      <span class="genre-bar-label">${genre}</span>
      <div class="genre-bar-track">
        <div class="genre-bar-fill" style="width: ${(count / maxCount * 100).toFixed(1)}%"></div>
      </div>
      <span class="genre-bar-count">${count}</span>
    </div>
  `).join('');
}

function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.ceil(target / 20);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}

// =========================================
// CATALOG
// =========================================
function renderCatalog(search = '', genre = '', status = '') {
  genre = genre || document.getElementById('filterGenre').value;
  status = status || document.getElementById('filterStatus').value;
  search = search !== undefined ? search : (document.getElementById('globalSearch').value || '');

  // Populate genre filter
  const genres = [...new Set(State.books.map(b => b.genre))].sort();
  const genreFilter = document.getElementById('filterGenre');
  const current = genreFilter.value;
  genreFilter.innerHTML = '<option value="">All Genres</option>' + genres.map(g => `<option value="${g}" ${g === current ? 'selected' : ''}>${g}</option>`).join('');

  let books = State.books.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q);
    const matchGenre = !genre || b.genre === genre;
    const matchStatus = !status || (status === 'available' ? b.available > 0 : b.available === 0);
    return matchSearch && matchGenre && matchStatus;
  });

  document.getElementById('bookCount').textContent = `${books.length} book${books.length !== 1 ? 's' : ''}`;

  const grid = document.getElementById('booksGrid');
  if (!books.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      <h3>No books found</h3><p>Try adjusting your search or filters</p>
    </div>`;
    return;
  }

  grid.innerHTML = books.map((b, i) => {
    const isAvail = b.available > 0;
    return `<div class="book-card">
      <div class="book-cover cover-${i % 6}">
        <span style="font-size:2.2rem">${b.emoji || '📖'}</span>
        <span class="book-cover-badge ${isAvail ? 'badge-available' : 'badge-issued'}">${isAvail ? 'Available' : 'All Out'}</span>
      </div>
      <div class="book-info">
        <div class="book-title">${b.title}</div>
        <div class="book-author">${b.author}</div>
        <div class="book-meta">
          <span class="book-genre">${b.genre}</span>
          <span class="book-year">${b.year}</span>
        </div>
        <div style="font-size:0.72rem;color:var(--text3);margin-bottom:10px;">${b.available}/${b.copies} available</div>
        <div class="book-actions">
          ${isAvail ? `<button class="btn-sm btn-issue" onclick="openIssueModal('${b.id}')">Issue</button>` : ''}
          <button class="btn-sm btn-edit" onclick="openEditBookModal('${b.id}')">Edit</button>
          <button class="btn-sm btn-del" onclick="deleteBook('${b.id}')">Del</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// =========================================
// MEMBERS
// =========================================
function renderMembers(search = '') {
  search = search !== undefined ? search : (document.getElementById('memberSearch').value || '');
  const members = State.members.filter(m => {
    const q = search.toLowerCase();
    return !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.id.toLowerCase().includes(q);
  });

  document.getElementById('memberCount').textContent = `${members.length} member${members.length !== 1 ? 's' : ''}`;

  const tbody = document.getElementById('membersBody');
  if (!members.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text3);padding:40px;">No members found</td></tr>`;
    return;
  }

  tbody.innerHTML = members.map(m => {
    const booksOut = State.transactions.filter(t => t.memberId === m.id && !t.returned).length;
    const initials = m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return `<tr>
      <td>
        <div class="member-cell">
          <div class="member-av" style="background:${m.color}">${initials}</div>
          <div>
            <div class="member-name">${m.name}</div>
            <div class="member-email">${m.phone}</div>
          </div>
        </div>
      </td>
      <td><span style="font-family:'DM Mono',monospace;font-size:0.78rem;color:var(--text3)">${m.id}</span></td>
      <td style="color:var(--text2)">${m.email}</td>
      <td style="color:var(--text3);font-size:0.8rem">${formatDate(m.joined)}</td>
      <td><span style="font-weight:600">${booksOut}</span> <span style="color:var(--text3);font-size:0.78rem">book${booksOut !== 1 ? 's' : ''}</span></td>
      <td><span class="status-pill ${m.status === 'active' ? 'status-active' : 'status-inactive'}">${m.status}</span></td>
      <td>
        <div class="action-group">
          <button class="btn-sm btn-edit" onclick="openEditMemberModal('${m.id}')">Edit</button>
          <button class="btn-sm btn-del" onclick="deleteMember('${m.id}')">Del</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// =========================================
// TRANSACTIONS
// =========================================
function renderTransactions(filterType = null, search = '') {
  filterType = filterType !== null ? filterType : document.getElementById('filterTxType').value;

  let txs = [...State.transactions].reverse().filter(t => {
    const book = getBook(t.bookId);
    const member = getMember(t.memberId);
    const q = search.toLowerCase();
    const matchSearch = !q || (book && book.title.toLowerCase().includes(q)) || (member && member.name.toLowerCase().includes(q));
    const matchType = !filterType || t.type === filterType;
    return matchSearch && matchType;
  });

  document.getElementById('txCount').textContent = `${txs.length} transaction${txs.length !== 1 ? 's' : ''}`;

  const tbody = document.getElementById('transactionsBody');
  if (!txs.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text3);padding:40px;">No transactions found</td></tr>`;
    return;
  }

  tbody.innerHTML = txs.map(t => {
    const book = getBook(t.bookId);
    const member = getMember(t.memberId);
    const isOverdue = !t.returned && new Date(t.dueDate) < new Date();
    let statusClass = t.returned ? 'status-return' : (isOverdue ? 'status-overdue' : 'status-issue');
    let statusLabel = t.returned ? 'Returned' : (isOverdue ? 'Overdue' : 'Active');

    return `<tr>
      <td>
        <div style="font-weight:500">${book ? book.title : 'Unknown'}</div>
        <div style="font-size:0.72rem;color:var(--text3)">${book ? book.author : ''}</div>
      </td>
      <td>
        <div>${member ? member.name : 'Unknown'}</div>
        <div class="tx-id">${t.memberId}</div>
      </td>
      <td><span class="status-pill status-${t.type}">${t.type === 'issue' ? 'Issued' : 'Returned'}</span></td>
      <td style="color:var(--text2);font-size:0.82rem">${formatDate(t.date)}</td>
      <td style="color:${isOverdue && !t.returned ? 'var(--red)' : 'var(--text2)'};font-size:0.82rem">${formatDate(t.dueDate)}</td>
      <td><span class="status-pill ${statusClass}">${statusLabel}</span></td>
      <td>
        <div class="action-group">
          ${!t.returned ? `<button class="btn-sm btn-return" onclick="returnBook('${t.id}')">Return</button>` : ''}
          <button class="btn-sm btn-del" onclick="deleteTransaction('${t.id}')">Del</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// =========================================
// OVERDUE
// =========================================
function getOverdue() {
  return State.transactions.filter(t => !t.returned && new Date(t.dueDate) < new Date());
}

function renderOverdue() {
  const overdue = getOverdue();
  document.getElementById('overdueAlertText').textContent =
    overdue.length ? `${overdue.length} book${overdue.length > 1 ? 's are' : ' is'} overdue — fine of ₹5/day applies` : 'No overdue books! Great job.';

  const tbody = document.getElementById('overdueBody');
  if (!overdue.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text3);padding:40px;">✅ No overdue books</td></tr>`;
    return;
  }

  tbody.innerHTML = overdue.map(t => {
    const book = getBook(t.bookId);
    const member = getMember(t.memberId);
    const daysLate = Math.floor((new Date() - new Date(t.dueDate)) / (1000 * 60 * 60 * 24));
    const fine = daysLate * 5;
    return `<tr>
      <td>
        <div style="font-weight:500">${book ? book.title : 'Unknown'}</div>
        <div style="font-size:0.72rem;color:var(--text3)">${book ? book.author : ''}</div>
      </td>
      <td>
        <div>${member ? member.name : 'Unknown'}</div>
        <div style="font-size:0.72rem;color:var(--text3)">${member ? member.email : ''}</div>
      </td>
      <td style="color:var(--red);font-size:0.82rem">${formatDate(t.dueDate)}</td>
      <td><span class="days-late">${daysLate} day${daysLate !== 1 ? 's' : ''}</span></td>
      <td><span class="fine-amount">₹${fine}</span></td>
      <td>
        <button class="btn-sm btn-return" onclick="returnBook('${t.id}')">Mark Returned</button>
      </td>
    </tr>`;
  }).join('');
}

function updateOverdueBadge() {
  const count = getOverdue().length;
  const badge = document.getElementById('overdueBadge');
  badge.textContent = count;
  badge.style.display = count ? 'inline-block' : 'none';
}

// =========================================
// MODAL SYSTEM
// =========================================
function bindModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });
}

function openModal(title, html) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
  setTimeout(() => document.querySelector('.form-input, .form-select, .form-textarea')?.focus(), 100);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// =========================================
// ADD/EDIT BOOK MODAL
// =========================================
function openAddBookModal() {
  openModal('Add New Book', bookFormHTML());
}

function openEditBookModal(id) {
  const book = getBook(id);
  if (!book) return;
  openModal('Edit Book', bookFormHTML(book));
}

function bookFormHTML(book = {}) {
  const genres = ['Classic', 'Fiction', 'Sci-Fi', 'Dystopian', 'Non-Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Psychology', 'Business', 'Self-Help', 'Biography', 'Memoir', 'History', 'Science', 'Poetry'];
  return `
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Title *</label>
        <input class="form-input" id="f_title" placeholder="Book title" value="${book.title || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Author *</label>
        <input class="form-input" id="f_author" placeholder="Author name" value="${book.author || ''}" />
      </div>
      <div class="form-grid form-grid-2">
        <div class="form-group">
          <label class="form-label">Genre *</label>
          <select class="form-select" id="f_genre">
            ${genres.map(g => `<option value="${g}" ${book.genre === g ? 'selected' : ''}>${g}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Year</label>
          <input class="form-input" id="f_year" type="number" placeholder="2024" value="${book.year || ''}" />
        </div>
      </div>
      <div class="form-grid form-grid-2">
        <div class="form-group">
          <label class="form-label">ISBN</label>
          <input class="form-input" id="f_isbn" placeholder="ISBN number" value="${book.isbn || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label">Copies *</label>
          <input class="form-input" id="f_copies" type="number" min="1" placeholder="1" value="${book.copies || ''}" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Emoji / Icon</label>
        <input class="form-input" id="f_emoji" placeholder="📚" value="${book.emoji || ''}" />
      </div>
    </div>
    <div class="form-actions">
      <button class="btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn-primary" onclick="${book.id ? `saveEditBook('${book.id}')` : 'saveAddBook()'}">${book.id ? 'Save Changes' : 'Add Book'}</button>
    </div>`;
}

function saveAddBook() {
  const title = val('f_title'), author = val('f_author'), genre = val('f_genre');
  const year = parseInt(val('f_year')), isbn = val('f_isbn'), copies = parseInt(val('f_copies'));
  const emoji = val('f_emoji') || '📖';

  if (!title || !author || !copies) return toast('Please fill required fields', 'error');

  const id = 'B' + String(Date.now()).slice(-4);
  State.books.push({ id, title, author, genre, year, isbn, copies, available: copies, emoji });
  save();
  closeModal();
  toast(`"${title}" added to catalog`, 'success');
  renderPage(State.currentPage);
}

function saveEditBook(id) {
  const book = getBook(id);
  if (!book) return;
  const copies = parseInt(val('f_copies'));
  const diff = copies - book.copies;
  book.title = val('f_title') || book.title;
  book.author = val('f_author') || book.author;
  book.genre = val('f_genre') || book.genre;
  book.year = parseInt(val('f_year')) || book.year;
  book.isbn = val('f_isbn') || book.isbn;
  book.copies = copies || book.copies;
  book.available = Math.max(0, book.available + diff);
  book.emoji = val('f_emoji') || book.emoji;
  save();
  closeModal();
  toast('Book updated', 'success');
  renderPage(State.currentPage);
}

function deleteBook(id) {
  const book = getBook(id);
  if (!book) return;
  if (!confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
  State.books = State.books.filter(b => b.id !== id);
  save();
  toast(`"${book.title}" removed`, 'info');
  renderPage(State.currentPage);
}

// =========================================
// ADD/EDIT MEMBER MODAL
// =========================================
function openAddMemberModal() {
  openModal('Add New Member', memberFormHTML());
}

function openEditMemberModal(id) {
  const member = getMember(id);
  if (!member) return;
  openModal('Edit Member', memberFormHTML(member));
}

const COLORS = ['#7c3aed', '#db2777', '#0369a1', '#047857', '#b45309', '#be123c', '#0e7490', '#1d4ed8'];

function memberFormHTML(member = {}) {
  return `
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Full Name *</label>
        <input class="form-input" id="f_name" placeholder="Full name" value="${member.name || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Email *</label>
        <input class="form-input" id="f_email" type="email" placeholder="email@example.com" value="${member.email || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Phone</label>
        <input class="form-input" id="f_phone" placeholder="+91 98765 43210" value="${member.phone || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="f_status">
          <option value="active" ${(!member.status || member.status === 'active') ? 'selected' : ''}>Active</option>
          <option value="inactive" ${member.status === 'inactive' ? 'selected' : ''}>Inactive</option>
        </select>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn-primary" onclick="${member.id ? `saveEditMember('${member.id}')` : 'saveAddMember()'}">${member.id ? 'Save Changes' : 'Add Member'}</button>
    </div>`;
}

function saveAddMember() {
  const name = val('f_name'), email = val('f_email');
  if (!name || !email) return toast('Name and email are required', 'error');
  const id = 'M' + String(State.members.length + 1).padStart(3, '0');
  const color = COLORS[State.members.length % COLORS.length];
  State.members.push({ id, name, email, phone: val('f_phone'), joined: new Date().toISOString().split('T')[0], status: val('f_status') || 'active', color });
  save();
  closeModal();
  toast(`${name} added as member`, 'success');
  renderPage(State.currentPage);
}

function saveEditMember(id) {
  const member = getMember(id);
  if (!member) return;
  member.name = val('f_name') || member.name;
  member.email = val('f_email') || member.email;
  member.phone = val('f_phone') || member.phone;
  member.status = val('f_status');
  save();
  closeModal();
  toast('Member updated', 'success');
  renderPage(State.currentPage);
}

function deleteMember(id) {
  const member = getMember(id);
  if (!member) return;
  if (State.transactions.some(t => t.memberId === id && !t.returned)) {
    return toast('Cannot delete — member has books checked out', 'error');
  }
  if (!confirm(`Delete member "${member.name}"?`)) return;
  State.members = State.members.filter(m => m.id !== id);
  save();
  toast(`${member.name} removed`, 'info');
  renderPage(State.currentPage);
}

// =========================================
// ISSUE BOOK MODAL
// =========================================
function openIssueModal(bookId = '') {
  const availableBooks = State.books.filter(b => b.available > 0);
  const bookOptions = availableBooks.map(b => `<option value="${b.id}" ${b.id === bookId ? 'selected' : ''}>${b.title} (${b.available} available)</option>`).join('');
  const memberOptions = State.members.filter(m => m.status === 'active').map(m => `<option value="${m.id}">${m.name}</option>`).join('');

  const dueDefault = new Date();
  dueDefault.setDate(dueDefault.getDate() + 14);
  const dueStr = dueDefault.toISOString().split('T')[0];

  openModal('Issue Book', `
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Select Book *</label>
        <select class="form-select" id="f_bookId">
          <option value="">— Choose book —</option>
          ${bookOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Select Member *</label>
        <select class="form-select" id="f_memberId">
          <option value="">— Choose member —</option>
          ${memberOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Due Date *</label>
        <input class="form-input" id="f_dueDate" type="date" value="${dueStr}" min="${new Date().toISOString().split('T')[0]}" />
      </div>
    </div>
    <div class="form-actions">
      <button class="btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn-primary" onclick="saveIssue()">Issue Book</button>
    </div>`);
}

function saveIssue() {
  const bookId = val('f_bookId'), memberId = val('f_memberId'), dueDate = val('f_dueDate');
  if (!bookId || !memberId || !dueDate) return toast('All fields are required', 'error');

  const book = getBook(bookId);
  if (!book || book.available < 1) return toast('Book not available', 'error');

  book.available -= 1;
  const id = 'T' + String(Date.now()).slice(-6);
  State.transactions.push({ id, bookId, memberId, type: 'issue', date: new Date().toISOString().split('T')[0], dueDate, returned: false });
  save();
  closeModal();
  toast(`"${book.title}" issued successfully`, 'success');
  renderPage(State.currentPage);
}

// =========================================
// RETURN BOOK
// =========================================
function returnBook(txId) {
  const tx = State.transactions.find(t => t.id === txId);
  if (!tx) return;
  const book = getBook(tx.bookId);
  const isOverdue = new Date(tx.dueDate) < new Date();
  const daysLate = isOverdue ? Math.floor((new Date() - new Date(tx.dueDate)) / (1000 * 60 * 60 * 24)) : 0;

  if (!confirm(`Return "${book ? book.title : 'this book'}"?${daysLate > 0 ? `\nFine: ₹${daysLate * 5} (${daysLate} days late)` : ''}`)) return;

  tx.returned = true;
  tx.returnDate = new Date().toISOString().split('T')[0];
  if (book) book.available = Math.min(book.copies, book.available + 1);
  save();
  toast(`Book returned${daysLate > 0 ? ` — Fine collected: ₹${daysLate * 5}` : ''}`, 'success');
  renderPage(State.currentPage);
}

function deleteTransaction(id) {
  if (!confirm('Delete this transaction record?')) return;
  State.transactions = State.transactions.filter(t => t.id !== id);
  save();
  toast('Transaction deleted', 'info');
  renderPage(State.currentPage);
}

// =========================================
// FILTERS
// =========================================
function bindFilters() {
  document.getElementById('filterGenre').addEventListener('change', () => renderCatalog());
  document.getElementById('filterStatus').addEventListener('change', () => renderCatalog());
  document.getElementById('memberSearch').addEventListener('input', function () { renderMembers(this.value); });
  document.getElementById('filterTxType').addEventListener('change', () => renderTransactions());
}

// =========================================
// UTILS
// =========================================
function getBook(id) { return State.books.find(b => b.id === id); }
function getMember(id) { return State.members.find(m => m.id === id); }
function val(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function toast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.classList.remove('show'); }, 3500);
}

// =========================================
// START
// =========================================
document.addEventListener('DOMContentLoaded', init);
