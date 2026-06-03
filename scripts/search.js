let posts = [];
let currentPage = 1;
const PER_PAGE = 9;

function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark class="highlight">$1</mark>');
}

function render(query) {
  const q = query.trim().toLowerCase();
  const results = document.getElementById('results');
  const count = document.getElementById('search-count');

  const filtered = q
    ? posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
      )
    : posts;

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  if (currentPage > totalPages) currentPage = 1;

  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  count.textContent = q
    ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"`
    : `${posts.length} post${posts.length !== 1 ? 's' : ''} total`;

  if (filtered.length === 0) {
    results.innerHTML = '<p class="no-results">No scrolls found for that search. Try another keyword.</p>';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  results.innerHTML = paginated.map(p => {
    let snippet = p.desc;
    if (q && p.body.toLowerCase().includes(q)) {
      const idx = p.body.toLowerCase().indexOf(q);
      const start = Math.max(0, idx - 60);
      const end = Math.min(p.body.length, idx + q.length + 60);
      snippet = (start > 0 ? '…' : '') + p.body.slice(start, end) + (end < p.body.length ? '…' : '');
    }
    const date = p.date ? `<span class="post-date">${p.date}</span>` : '';
    return `
      <div class="post-card">
        <div class="tag">${highlight(p.tag, query)}</div>
        ${date}
        <h3>${highlight(p.title, query)}</h3>
        <p>${highlight(snippet, query)}</p>
        <a class="read-more" href="${p.href}">Read the guide →</a>
      </div>`;
  }).join('');

  if (totalPages <= 1) {
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  let pages = '';
  for (let i = 1; i <= totalPages; i++) {
    pages += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  document.getElementById('pagination').innerHTML = `
    <button class="page-btn" id="prev-btn" ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>
    ${pages}
    <button class="page-btn" id="next-btn" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>
  `;

  document.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = parseInt(btn.dataset.page);
      render(query);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.getElementById('prev-btn')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      render(query);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.getElementById('next-btn')?.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      render(query);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

fetch('/data/search.json')
  .then(r => r.json())
  .then(data => {
    posts = data;
    render('');
    document.getElementById('search-input').addEventListener('input', e => {
      currentPage = 1;
      render(e.target.value);
    });
  });
