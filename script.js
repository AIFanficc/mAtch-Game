/* -------------------------------------------------------
   GameMatch Interactive Script
   Handles: Sticky Nav, Quiz, Results Loader
-------------------------------------------------------- */

// --- Sticky Navigation Effect ---
window.addEventListener("scroll", () => {
  const bar = document.querySelector(".topbar");
  if (bar) bar.classList.toggle("scrolled", window.scrollY > 50);
});

// --- QUIZ HANDLING ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capture answers
    const genre = document.getElementById("genre").value;
    const mode = document.getElementById("mode").value;
    const platform = document.getElementById("platform").value;
    const difficulty = document.getElementById("difficulty").value;

    // Fetch games list
    try {
      const res = await fetch("games.json");
      const games = await res.json();

      // Find matches (accurate matching)
      const matches = games.filter(
        (g) =>
          g.genre === genre &&
          g.mode === mode &&
          g.platform === platform &&
          g.difficulty === difficulty
      );

      // Save results
      localStorage.setItem("quizResults", JSON.stringify(matches.slice(0, 12)));
      window.location.href = "results.html";
    } catch (err) {
      console.error("Error loading quiz:", err);
      alert("Could not load game data. Please try again.");
    }
  });
});

// --- RESULTS PAGE RENDERING ---
document.addEventListener("DOMContentLoaded", async () => {
  const mount = document.getElementById("resultsContainer");
  if (!mount) return;

  try {
    const stored = localStorage.getItem("quizResults");
    const results = stored ? JSON.parse(stored) : [];

    if (results.length === 0) {
      mount.innerHTML = `<p style="text-align:center;margin-top:2rem;">No matches found. Please take the quiz again.</p>`;
      return;
    }

    const cards = results
      .map(
        (g) => `
        <article class="card">
          <img src="${g.img}" alt="${g.name}">
          <div class="body">
            <h3>${g.name}</h3>
            <p class="muted">${g.genre} • ${g.platform}</p>
            <div>
              <span class="badge">${g.mode}</span>
              <span class="badge">${g.difficulty}</span>
            </div>
          </div>
        </article>`
      )
      .join("");

    mount.innerHTML = `
      <section class="panel">
        <h2>🎯 Your Perfect Game Matches</h2>
        <div class="grid cols-3" style="margin-top:1rem;">
          ${cards}
        </div>
      </section>`;
  } catch (err) {
    console.error("Error displaying results:", err);
  }
});
