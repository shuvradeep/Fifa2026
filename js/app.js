/* =========================================================
   FIFA World Cup 2026 Dashboard — App Logic
   ========================================================= */

(function () {
  "use strict";

  /* ---------------- Navigation ---------------- */
  const navLinks = document.querySelectorAll(".nav-link");
  const views = document.querySelectorAll(".view");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  function showView(target) {
    views.forEach(v => v.classList.toggle("active", v.id === `view-${target}`));
    navLinks.forEach(l => l.classList.toggle("active", l.dataset.target === target));
    mainNav.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-target]").forEach(el => {
    el.addEventListener("click", () => showView(el.dataset.target));
  });

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });

  /* ---------------- Helpers ---------------- */
  function flag(name) { return FLAGS[name] || "🏳️"; }

  function formatDate(d) {
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function scoreLabel(m) {
    if (m.status === "UPCOMING") return "vs";
    return null;
  }

  function matchRow(m) {
    const isUpcoming = m.status === "UPCOMING";
    const homeWin = !isUpcoming && (m.hs > m.as || (m.hs === m.as && m.hp > m.ap));
    const awayWin = !isUpcoming && (m.as > m.hs || (m.hs === m.as && m.ap > m.hp));
    const pen = (m.hp != null) ? ` <span style="opacity:.6">(pens ${m.hp}-${m.ap})</span>` : "";
    return `
      <div class="match-row">
        <div class="match-meta">${m.stage}<br>${formatDate(m.date)} · ${m.time}</div>
        <div class="match-teams">
          <div class="match-team">
            <span class="name" style="${homeWin ? 'font-weight:700;color:var(--accent)' : ''}">${flag(m.home)} ${m.home}</span>
            <span class="score">${isUpcoming ? "" : m.hs}</span>
          </div>
          <div class="match-team">
            <span class="name" style="${awayWin ? 'font-weight:700;color:var(--accent)' : ''}">${flag(m.away)} ${m.away}</span>
            <span class="score">${isUpcoming ? "" : m.as}</span>
          </div>
          ${pen ? `<div style="font-size:.7rem;color:var(--text-faint)">${pen}</div>` : ""}
        </div>
        <div class="match-status status-${m.status}">${m.status === "UPCOMING" ? "Upcoming" : m.status}</div>
      </div>
      <div style="border-top:1px solid var(--border)"></div>
    `;
  }

  /* ---------------- Home ---------------- */
  function renderHome() {
    const upcoming = MATCHES.filter(m => m.status === "UPCOMING" || m.status === "LIVE")
      .sort((a, b) => (a.status === "LIVE" ? -1 : b.status === "LIVE" ? 1 : 0))
      .slice(0, 4);
    const results = MATCHES.filter(m => m.status === "FT").slice(-4).reverse();

    document.getElementById("homeUpcomingList").innerHTML = upcoming.map(matchRow).join("") || "<p>No upcoming matches.</p>";
    document.getElementById("homeResultsList").innerHTML = results.map(matchRow).join("");

    document.getElementById("homeScorersList").innerHTML = `
      <table class="data-table">
        <thead><tr><th>Player</th><th>Team</th><th>Goals</th></tr></thead>
        <tbody>
          ${TOP_SCORERS.slice(0, 5).map(p => `
            <tr><td>${p.name}</td><td>${flag(p.team)} ${p.team}</td><td>${p.goals}</td></tr>
          `).join("")}
        </tbody>
      </table>
    `;

    document.getElementById("homeNewsList").innerHTML = NEWS.slice(0, 4).map(n => `
      <div class="match-row" style="align-items:flex-start">
        <div style="flex:1">
          <div class="news-tag">${n.tag}</div>
          <div style="font-weight:600;font-size:.88rem;margin:.15rem 0">${n.title}</div>
          <div class="news-date">${formatDate(n.date)}</div>
        </div>
      </div>
      <div style="border-top:1px solid var(--border)"></div>
    `).join("");
  }

  /* ---------------- Fixtures & Results ---------------- */
  function renderFilterableMatches(containerId, filterBarId, matches, storageKey) {
    const filterBar = document.getElementById(filterBarId);
    const list = document.getElementById(containerId);
    let active = "All";
    const stages = [...new Set(matches.map(m => m.stage))];

    filterBar.innerHTML = ["All", ...stages].map(s =>
      `<button class="filter-chip ${s === active ? "active" : ""}" data-stage="${s}">${s}</button>`
    ).join("");

    function render() {
      const filtered = active === "All" ? matches : matches.filter(m => m.stage === active);
      list.innerHTML = filtered.length ? filtered.map(matchRow).join("") : "<p style='padding:1rem;color:var(--text-dim)'>No matches found.</p>";
    }

    filterBar.querySelectorAll(".filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        active = chip.dataset.stage;
        filterBar.querySelectorAll(".filter-chip").forEach(c => c.classList.toggle("active", c === chip));
        render();
      });
    });

    render();
  }

  function renderFixtures() {
    const upcoming = MATCHES.filter(m => m.status === "UPCOMING" || m.status === "LIVE");
    renderFilterableMatches("fixturesList", "fixturesFilter", upcoming);
  }

  function renderResults() {
    const finished = MATCHES.filter(m => m.status === "FT").slice().reverse();
    renderFilterableMatches("resultsList", "resultsFilter", finished);
  }

  /* ---------------- Standings ---------------- */
  const STATUS_ORDER = { winner: 0, "runner-up": 1, advanced: 2, third: 2, out: 3 };
  const STATUS_CLASS = { winner: "status-win", "runner-up": "status-win", advanced: "status-adv", third: "status-adv", out: "status-out" };

  function renderStandings() {
    const grid = document.getElementById("standingsGrid");
    grid.innerHTML = Object.entries(GROUPS).map(([g, teams]) => {
      const rows = teams.slice().sort((a, b) => STATUS_ORDER[TEAM_STATUS[a].status] - STATUS_ORDER[TEAM_STATUS[b].status]);
      return `
        <div class="standings-card">
          <h3>Group ${g}</h3>
          <table class="data-table">
            <thead><tr><th>Team</th><th>Record</th><th>Pts</th><th>Result</th></tr></thead>
            <tbody>
              ${rows.map(name => {
                const s = TEAM_STATUS[name];
                return `
                <tr>
                  <td>${flag(name)} ${name}</td>
                  <td>${s.record || "—"}</td>
                  <td>${s.pts != null ? `<b>${s.pts}</b>` : "—"}</td>
                  <td><span class="match-status ${STATUS_CLASS[s.status]}">${STATUS_LABEL[s.status]}</span></td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
      `;
    }).join("");
  }

  /* ---------------- Bracket ---------------- */
  function bracketMatchHtml(id) {
    const m = MATCHES.find(x => x.id === id);
    if (!m) return "";
    const hasScore = m.hs != null;
    const decided = m.status === "FT";
    const homeWin = decided && (m.hs > m.as || (m.hs === m.as && m.hp > m.ap));
    const awayWin = decided && (m.as > m.hs || (m.hs === m.as && m.ap > m.hp));
    return `
      <div class="bracket-match">
        ${m.status === "LIVE" ? '<div class="b-live">● LIVE</div>' : ""}
        <div class="b-team ${homeWin ? "winner" : ""}"><span>${flag(m.home)} ${m.home}</span><span>${hasScore ? m.hs : "-"}</span></div>
        <div class="b-team ${awayWin ? "winner" : ""}"><span>${flag(m.away)} ${m.away}</span><span>${hasScore ? m.as : "-"}</span></div>
        ${m.note ? `<div class="b-note">${m.note}</div>` : ""}
      </div>`;
  }

  function renderBracket() {
    const container = document.getElementById("bracketContainer");
    const rounds = [
      { key: "r16", title: "Round of 16" },
      { key: "qf", title: "Quarterfinals" },
      { key: "sf", title: "Semifinals" },
      { key: "final", title: "Final" },
    ];
    container.innerHTML = rounds.map(r => `
      <div class="bracket-round">
        <div class="bracket-round-title">${r.title}</div>
        ${BRACKET[r.key].map(bracketMatchHtml).join("")}
      </div>
    `).join("");
  }

  /* ---------------- Leaderboard ---------------- */
  const dash = (v) => (v == null ? "—" : v);

  function renderLeaderboard() {
    document.getElementById("scorersTable").innerHTML = `
      <thead><tr><th>#</th><th>Player</th><th>Team</th><th>Apps</th><th>Goals</th></tr></thead>
      <tbody>
        ${TOP_SCORERS.map((p, i) => `
          <tr><td>${i + 1}</td><td>${p.name}</td><td>${flag(p.team)} ${p.team}</td><td>${dash(p.apps)}</td><td><b>${dash(p.goals)}</b></td></tr>
        `).join("")}
      </tbody>
    `;
    document.getElementById("assistsTable").innerHTML = `
      <thead><tr><th>#</th><th>Player</th><th>Team</th><th>Apps</th><th>Assists</th></tr></thead>
      <tbody>
        ${TOP_ASSISTS.map((p, i) => `
          <tr><td>${i + 1}</td><td>${p.name}</td><td>${flag(p.team)} ${p.team}</td><td>${dash(p.apps)}</td><td><b>${dash(p.assists)}</b></td></tr>
        `).join("")}
      </tbody>
    `;
  }

  /* ---------------- Players ---------------- */
  function initials(name) {
    return name.split(" ").map(s => s[0]).slice(0, 2).join("");
  }

  function playerCardHtml(p) {
    return `
      <div class="player-card" data-id="${p.id}">
        <div class="p-top">
          <div class="player-avatar">${initials(p.name)}</div>
        </div>
        <h3>${p.name}</h3>
        <div class="p-meta">${flag(p.team)} ${p.team} · ${p.pos}</div>
        <div class="player-stats-row">
          <span><b>${dash(p.goals)}</b> G</span>
          <span><b>${dash(p.assists)}</b> A</span>
          <span><b>${dash(p.apps)}</b> Apps</span>
        </div>
      </div>
    `;
  }

  function renderPlayers(filterText) {
    const grid = document.getElementById("playersGrid");
    const q = (filterText || "").toLowerCase();
    const filtered = PLAYERS.filter(p =>
      p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)
    );
    grid.innerHTML = filtered.map(playerCardHtml).join("") || "<p style='color:var(--text-dim)'>No players found.</p>";

    grid.querySelectorAll(".player-card").forEach(card => {
      card.addEventListener("click", () => openPlayerModal(Number(card.dataset.id)));
    });
  }

  function openPlayerModal(id) {
    const p = PLAYERS.find(x => x.id === id);
    if (!p) return;
    const modal = document.getElementById("playerModal");
    modal.innerHTML = `
      <button class="modal-close" id="modalClose">✕</button>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
        <div class="player-avatar" style="width:64px;height:64px;font-size:1.3rem">${initials(p.name)}</div>
        <div>
          <h2 style="margin-bottom:.2rem">${p.name}</h2>
          <div class="p-meta">${flag(p.team)} ${p.team} · ${p.pos}</div>
        </div>
      </div>
      <p style="color:var(--text-dim);font-size:.9rem;line-height:1.5">${p.bio}</p>
      <div class="player-stats-row" style="margin-top:1rem;font-size:.85rem;gap:1.5rem">
        <span><b>${p.club}</b><br><span style="color:var(--text-faint)">Club</span></span>
        <span><b>${dash(p.goals)}</b><br><span style="color:var(--text-faint)">Goals</span></span>
        <span><b>${dash(p.assists)}</b><br><span style="color:var(--text-faint)">Assists</span></span>
        <span><b>${dash(p.apps)}</b><br><span style="color:var(--text-faint)">Apps</span></span>
      </div>
    `;
    document.getElementById("playerModalOverlay").classList.add("open");
    document.getElementById("modalClose").addEventListener("click", closePlayerModal);
  }

  function closePlayerModal() {
    document.getElementById("playerModalOverlay").classList.remove("open");
  }

  document.getElementById("playerModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "playerModalOverlay") closePlayerModal();
  });

  document.getElementById("playerSearch").addEventListener("input", (e) => renderPlayers(e.target.value));

  /* ---------------- Commentary ---------------- */
  function feedHtml(items) {
    return items.map(c => `
      <div class="commentary-item">
        <div class="commentary-minute">${c.minute}</div>
        <div class="commentary-text">${c.text}</div>
      </div>
    `).join("");
  }

  function renderCommentary() {
    document.getElementById("commentaryMatchLabel").textContent =
      "Build-up notes compiled from published match previews ahead of the semifinals.";
    document.getElementById("commentaryFeed").innerHTML = `
      <h3 style="margin:0 0 .5rem;font-size:1rem;color:var(--text)">${COMMENTARY.matchLabel}</h3>
      ${feedHtml(COMMENTARY.feed)}
      <h3 style="margin:1.5rem 0 .5rem;font-size:1rem;color:var(--text)">${COMMENTARY.secondLabel}</h3>
      ${feedHtml(COMMENTARY.secondFeed)}
    `;
  }

  /* ---------------- News ---------------- */
  function newsCardHtml(n) {
    return `
      <div class="news-card">
        <div class="news-thumb" style="background:${n.image}"></div>
        <div class="news-body">
          <span class="news-tag">${n.tag}</span>
          <h3><a href="${n.url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${n.title}</a></h3>
          <p>${n.summary}</p>
          <span class="news-date">${formatDate(n.date)} · ${n.source}</span>
        </div>
      </div>
    `;
  }

  function renderNews() {
    document.getElementById("newsGrid").innerHTML = NEWS
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(newsCardHtml).join("");
  }

  /* ---------------- Live Updates ---------------- */
  // Polls data/live.json, which gets edited/pushed whenever a real score
  // changes. Auto-polls every 60s only while a scheduled match is likely
  // in progress; the refresh button always fetches on demand.
  const LIVE_JSON_URL = "data/live.json";
  const LIVE_WINDOW_MS = 150 * 60 * 1000; // covers full match + extra time + penalties

  function matchStartUTC(m) {
    const t = /(\d{2}):(\d{2})/.exec(m.time || "");
    if (!m.date || !t) return null;
    // Remaining fixtures are all US Eastern Daylight Time (UTC-4) kickoffs.
    return new Date(`${m.date}T${t[1]}:${t[2]}:00-04:00`);
  }

  function isAnyMatchLive() {
    const now = Date.now();
    return MATCHES.some(m => {
      if (m.status === "LIVE") return true;
      const start = matchStartUTC(m);
      return start && now >= start.getTime() && now <= start.getTime() + LIVE_WINDOW_MS;
    });
  }

  function rerenderMatchViews() {
    renderHome();
    renderFixtures();
    renderResults();
    renderBracket();
  }

  function setRefreshStatus(text) {
    const el = document.getElementById("refreshStatus");
    if (el) el.textContent = text;
  }

  async function fetchLiveUpdates(manual) {
    const btn = document.getElementById("refreshBtn");
    if (btn) btn.classList.add("spinning");
    if (manual) setRefreshStatus("Checking…");
    try {
      const res = await fetch(`${LIVE_JSON_URL}?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("no live data");
      const data = await res.json();
      let changed = false;
      (data.matches || []).forEach(update => {
        const m = MATCHES.find(x => x.id === update.id);
        if (!m) return;
        ["status", "hs", "as", "hp", "ap", "note", "home", "away"].forEach(key => {
          if (update[key] !== undefined && JSON.stringify(update[key]) !== JSON.stringify(m[key])) {
            m[key] = update[key];
            changed = true;
          }
        });
      });
      if (changed) rerenderMatchViews();
      const stamp = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      setRefreshStatus(`Updated ${stamp}`);
    } catch (e) {
      setRefreshStatus("Refresh failed — showing last known scores");
    } finally {
      if (btn) btn.classList.remove("spinning");
    }
  }

  document.getElementById("refreshBtn").addEventListener("click", () => fetchLiveUpdates(true));

  setInterval(() => {
    if (isAnyMatchLive()) fetchLiveUpdates(false);
  }, 60 * 1000);

  /* ---------------- Init ---------------- */
  renderHome();
  renderFixtures();
  renderResults();
  renderStandings();
  renderBracket();
  renderLeaderboard();
  renderPlayers("");
  renderCommentary();
  renderNews();
  fetchLiveUpdates(false);
})();
