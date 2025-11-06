(async function () {
  const GENRE = (window.__GENRE__ || '').toLowerCase();
  const mount = document.getElementById('genreMount');
  if (!GENRE || !mount) return;

  const games = await loadGames();
  const list = games.filter(g => g.genres.includes(GENRE));

  mount.innerHTML = `
    <section class="panel">
      <h2>${list.length} ${GENRE[0].toUpperCase()+GENRE.slice(1)} games</h2>
      <div class="grid cols-3" style="margin-top:10px">
        ${list.map(card).join('')}
      </div>
    </section>
  `;
})();
