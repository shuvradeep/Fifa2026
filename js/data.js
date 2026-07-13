/* =========================================================
   FIFA World Cup 2026 — Sample Dashboard Data
   NOTE: This is a demo/template dataset (fictional sample
   results & commentary) built to power the UI. Swap in a
   live data feed / API for production use.
   ========================================================= */

const HOSTS = ["USA", "Canada", "Mexico"];

const FLAGS = {
  "USA": "🇺🇸", "Canada": "🇨🇦", "Mexico": "🇲🇽",
  "Argentina": "🇦🇷", "Brazil": "🇧🇷", "Uruguay": "🇺🇾", "Colombia": "🇨🇴", "Ecuador": "🇪🇨", "Paraguay": "🇵🇾",
  "Panama": "🇵🇦", "Costa Rica": "🇨🇷", "Honduras": "🇭🇳",
  "France": "🇫🇷", "England": "🏴", "Spain": "🇪🇸", "Germany": "🇩🇪", "Portugal": "🇵🇹", "Netherlands": "🇳🇱",
  "Italy": "🇮🇹", "Belgium": "🇧🇪", "Croatia": "🇭🇷", "Switzerland": "🇨🇭", "Denmark": "🇩🇰", "Austria": "🇦🇹",
  "Scotland": "🏴", "Norway": "🇳🇴", "Poland": "🇵🇱", "Ukraine": "🇺🇦",
  "Japan": "🇯🇵", "South Korea": "🇰🇷", "Iran": "🇮🇷", "Saudi Arabia": "🇸🇦", "Australia": "🇦🇺", "Qatar": "🇶🇦",
  "Uzbekistan": "🇺🇿", "Jordan": "🇯🇴",
  "Morocco": "🇲🇦", "Senegal": "🇸🇳", "Nigeria": "🇳🇬", "Egypt": "🇪🇬", "Tunisia": "🇹🇳", "Algeria": "🇩🇿",
  "Ghana": "🇬🇭", "Cameroon": "🇨🇲", "Ivory Coast": "🇨🇮",
  "New Zealand": "🇳🇿",
  "Bolivia": "🇧🇴", "Jamaica": "🇯🇲"
};

const GROUPS = {
  A: ["Mexico", "Poland", "Iran", "Ghana"],
  B: ["USA", "Uruguay", "Uzbekistan", "Jordan"],
  C: ["Canada", "Croatia", "Tunisia", "Jamaica"],
  D: ["France", "Nigeria", "Costa Rica", "South Korea"],
  E: ["Spain", "Colombia", "Egypt", "New Zealand"],
  F: ["Germany", "Ecuador", "Cameroon", "Saudi Arabia"],
  G: ["Portugal", "Senegal", "Panama", "Australia"],
  H: ["Netherlands", "Paraguay", "Algeria", "Bolivia"],
  I: ["Argentina", "Switzerland", "Honduras", "Qatar"],
  J: ["England", "Denmark", "Ivory Coast", "Japan"],
  K: ["Italy", "Norway", "Morocco", "Scotland"],
  L: ["Brazil", "Belgium", "Austria", "Ukraine"]
};

// Build TEAMS lookup with group-stage aggregate stats (post group stage, since
// the sample "today" date sits after the round of 16 / quarterfinals).
const TEAMS = {};
Object.entries(GROUPS).forEach(([g, teams]) => {
  teams.forEach((name, i) => {
    TEAMS[name] = {
      name, group: g, flag: FLAGS[name] || "🏳️",
      played: 3,
      won: [3,2,1,0][i] ?? 1,
      drawn: [0,0,1,0][i] ?? 0,
      lost: [0,1,1,3][i] ?? 1,
      gf: [7,5,3,1][i] ?? 3,
      ga: [2,4,4,8][i] ?? 4,
    };
  });
});
Object.values(TEAMS).forEach(t => {
  t.pts = t.won * 3 + t.drawn;
  t.gd = t.gf - t.ga;
});

function standingsForGroup(g) {
  return GROUPS[g]
    .map(name => TEAMS[name])
    .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}

/* ---------------- Fixtures & Results ---------------- */
// status: "FT" (final), "LIVE", "UPCOMING"
const MATCHES = [
  // Group stage highlights (all FT)
  { id: 1,  stage: "Group A", date: "2026-06-11", time: "16:00", venue: "Estadio Azteca, Mexico City", home: "Mexico", away: "Poland", hs: 2, as: 0, status: "FT" },
  { id: 2,  stage: "Group B", date: "2026-06-12", time: "20:00", venue: "MetLife Stadium, New Jersey", home: "USA", away: "Uruguay", hs: 1, as: 1, status: "FT" },
  { id: 3,  stage: "Group C", date: "2026-06-12", time: "15:00", venue: "BC Place, Vancouver", home: "Canada", away: "Croatia", hs: 0, as: 2, status: "FT" },
  { id: 4,  stage: "Group D", date: "2026-06-13", time: "18:00", venue: "AT&T Stadium, Dallas", home: "France", away: "Nigeria", hs: 3, as: 1, status: "FT" },
  { id: 5,  stage: "Group I", date: "2026-06-14", time: "21:00", venue: "SoFi Stadium, Los Angeles", home: "Argentina", away: "Switzerland", hs: 2, as: 0, status: "FT" },
  { id: 6,  stage: "Group L", date: "2026-06-15", time: "18:00", venue: "Mercedes-Benz Stadium, Atlanta", home: "Brazil", away: "Belgium", hs: 3, as: 2, status: "FT" },
  { id: 7,  stage: "Group J", date: "2026-06-16", time: "15:00", venue: "Lincoln Financial Field, Philadelphia", home: "England", away: "Denmark", hs: 2, as: 1, status: "FT" },
  { id: 8,  stage: "Group K", date: "2026-06-17", time: "20:00", venue: "Lumen Field, Seattle", home: "Italy", away: "Morocco", hs: 1, as: 1, status: "FT" },
  { id: 9,  stage: "Group E", date: "2026-06-18", time: "17:00", venue: "NRG Stadium, Houston", home: "Spain", away: "Colombia", hs: 2, as: 2, status: "FT" },
  { id: 10, stage: "Group G", date: "2026-06-19", time: "19:00", venue: "Estadio BBVA, Monterrey", home: "Portugal", away: "Senegal", hs: 3, as: 0, status: "FT" },

  // Round of 32
  { id: 21, stage: "Round of 32", date: "2026-06-29", time: "16:00", venue: "Hard Rock Stadium, Miami", home: "Argentina", away: "Poland", hs: 2, as: 1, status: "FT" },
  { id: 22, stage: "Round of 32", date: "2026-06-29", time: "20:00", venue: "Arrowhead Stadium, Kansas City", home: "France", away: "Ghana", hs: 4, as: 0, status: "FT" },
  { id: 23, stage: "Round of 32", date: "2026-06-30", time: "15:00", venue: "Gillette Stadium, Boston", home: "Brazil", away: "Ukraine", hs: 3, as: 1, status: "FT" },
  { id: 24, stage: "Round of 32", date: "2026-06-30", time: "19:00", venue: "Levi's Stadium, San Francisco", home: "England", away: "Ivory Coast", hs: 1, as: 0, status: "FT" },
  { id: 25, stage: "Round of 32", date: "2026-07-01", time: "16:00", venue: "Estadio Akron, Guadalajara", home: "Portugal", away: "Australia", hs: 2, as: 0, status: "FT" },
  { id: 26, stage: "Round of 32", date: "2026-07-01", time: "20:00", venue: "Mercedes-Benz Stadium, Atlanta", home: "Netherlands", away: "Algeria", hs: 3, as: 2, status: "FT" },
  { id: 27, stage: "Round of 32", date: "2026-07-02", time: "15:00", venue: "SoFi Stadium, Los Angeles", home: "Spain", away: "New Zealand", hs: 5, as: 0, status: "FT" },
  { id: 28, stage: "Round of 32", date: "2026-07-02", time: "19:00", venue: "BMO Field, Toronto", home: "Germany", away: "Ecuador", hs: 2, as: 1, status: "FT" },

  // Round of 16
  { id: 31, stage: "Round of 16", date: "2026-07-04", time: "16:00", venue: "MetLife Stadium, New Jersey", home: "Argentina", away: "France", hs: 1, as: 2, status: "FT" },
  { id: 32, stage: "Round of 16", date: "2026-07-04", time: "20:00", venue: "AT&T Stadium, Dallas", home: "Brazil", away: "England", hs: 2, as: 2, hp: 4, ap: 3, status: "FT" },
  { id: 33, stage: "Round of 16", date: "2026-07-05", time: "16:00", venue: "Estadio Azteca, Mexico City", home: "Portugal", away: "Netherlands", hs: 1, as: 0, status: "FT" },
  { id: 34, stage: "Round of 16", date: "2026-07-05", time: "20:00", venue: "NRG Stadium, Houston", home: "Spain", away: "Germany", hs: 3, as: 1, status: "FT" },

  // Quarterfinals
  { id: 41, stage: "Quarterfinal", date: "2026-07-09", time: "17:00", venue: "SoFi Stadium, Los Angeles", home: "France", away: "Brazil", hs: 2, as: 1, status: "FT" },
  { id: 42, stage: "Quarterfinal", date: "2026-07-10", time: "17:00", venue: "Mercedes-Benz Stadium, Atlanta", home: "Portugal", away: "Spain", hs: 1, as: 1, hp: 5, ap: 4, status: "FT" },

  // Semifinals — upcoming relative to "today" (2026-07-13)
  { id: 51, stage: "Semifinal", date: "2026-07-14", time: "18:00", venue: "MetLife Stadium, New Jersey", home: "France", away: "Portugal", hs: null, as: null, status: "UPCOMING" },
  { id: 52, stage: "Semifinal", date: "2026-07-15", time: "18:00", venue: "AT&T Stadium, Dallas", home: "TBD", away: "TBD", hs: null, as: null, status: "UPCOMING" },

  // Third place & Final
  { id: 61, stage: "Third Place", date: "2026-07-18", time: "15:00", venue: "Hard Rock Stadium, Miami", home: "TBD", away: "TBD", hs: null, as: null, status: "UPCOMING" },
  { id: 62, stage: "Final", date: "2026-07-19", time: "15:00", venue: "MetLife Stadium, New Jersey", home: "TBD", away: "TBD", hs: null, as: null, status: "UPCOMING" },
];

/* ---------------- Knockout Bracket ---------------- */
const BRACKET = {
  r16: [
    { home: "Argentina", away: "France", hs: 1, as: 2 },
    { home: "Brazil", away: "England", hs: 2, as: 2, note: "England win 4-3 on penalties" },
    { home: "Portugal", away: "Netherlands", hs: 1, as: 0 },
    { home: "Spain", away: "Germany", hs: 3, as: 1 },
    { home: "USA", away: "Croatia", hs: 1, as: 0 },
    { home: "Italy", away: "Senegal", hs: 2, as: 1 },
    { home: "Colombia", away: "Japan", hs: 1, as: 1, note: "Colombia win 5-4 on penalties" },
    { home: "Morocco", away: "Uruguay", hs: 2, as: 0 },
  ],
  qf: [
    { home: "France", away: "England", hs: 2, as: 1 },
    { home: "Portugal", away: "Spain", hs: 1, as: 1, note: "Portugal win 5-4 on penalties" },
    { home: "USA", away: "Italy", hs: 0, as: 1 },
    { home: "Colombia", away: "Morocco", hs: 2, as: 0 },
  ],
  sf: [
    { home: "France", away: "Portugal", hs: null, as: null },
    { home: "Italy", away: "Colombia", hs: null, as: null },
  ],
  final: [
    { home: "TBD", away: "TBD", hs: null, as: null }
  ]
};

/* ---------------- Leaderboards ---------------- */
const TOP_SCORERS = [
  { name: "Kylian Mbappé", team: "France", goals: 7, assists: 2, apps: 6 },
  { name: "Lamine Yamal", team: "Spain", goals: 6, assists: 4, apps: 5 },
  { name: "Erling Haaland", team: "Norway", goals: 6, assists: 1, apps: 3 },
  { name: "Vinícius Júnior", team: "Brazil", goals: 5, assists: 3, apps: 6 },
  { name: "Harry Kane", team: "England", goals: 5, assists: 1, apps: 6 },
  { name: "Rafael Leão", team: "Portugal", goals: 4, assists: 2, apps: 6 },
  { name: "Jamal Musiala", team: "Germany", goals: 4, assists: 3, apps: 5 },
  { name: "Julián Álvarez", team: "Argentina", goals: 4, assists: 1, apps: 4 },
  { name: "Ousmane Dembélé", team: "France", goals: 3, assists: 5, apps: 6 },
  { name: "Cole Palmer", team: "England", goals: 3, assists: 2, apps: 6 },
];

const TOP_ASSISTS = [...TOP_SCORERS].sort((a, b) => b.assists - a.assists).slice(0, 8);

/* ---------------- Players / Profiles ---------------- */
const PLAYERS = [
  { id: 1, name: "Kylian Mbappé", team: "France", pos: "Forward", number: 10, age: 27, club: "Real Madrid", goals: 7, assists: 2, apps: 6, bio: "Explosive pace and clinical finishing have made him the tournament's top scorer heading into the semifinals." },
  { id: 2, name: "Lionel Messi", team: "Argentina", pos: "Forward", number: 10, age: 39, club: "Inter Miami", goals: 2, assists: 3, apps: 4, bio: "Playing in a record fifth World Cup, orchestrating Argentina's attack from a deeper playmaking role." },
  { id: 3, name: "Lamine Yamal", team: "Spain", pos: "Forward", number: 19, age: 18, club: "FC Barcelona", goals: 6, assists: 4, apps: 5, bio: "The breakout star of the tournament, terrorizing defenders down the right flank." },
  { id: 4, name: "Erling Haaland", team: "Norway", pos: "Forward", number: 9, age: 25, club: "Manchester City", goals: 6, assists: 1, apps: 3, bio: "A physical, ruthless number nine who scored a hat-trick in Norway's group-stage finale." },
  { id: 5, name: "Vinícius Júnior", team: "Brazil", pos: "Forward", number: 7, age: 25, club: "Real Madrid", goals: 5, assists: 3, apps: 6, bio: "Brazil's primary creative outlet, known for blistering dribbles and cut-ins from the left." },
  { id: 6, name: "Jude Bellingham", team: "England", pos: "Midfielder", number: 8, age: 22, club: "Real Madrid", goals: 3, assists: 2, apps: 6, bio: "England's captain and engine room, box-to-box with an eye for a late goal." },
  { id: 7, name: "Jamal Musiala", team: "Germany", pos: "Midfielder", number: 14, age: 23, club: "Bayern Munich", goals: 4, assists: 3, apps: 5, bio: "Technical dribbler capable of unlocking deep defensive blocks in tight spaces." },
  { id: 8, name: "Rodri", team: "Spain", pos: "Midfielder", number: 16, age: 30, club: "Manchester City", goals: 1, assists: 4, apps: 5, bio: "The metronome of Spain's midfield, dictating tempo in every knockout match." },
  { id: 9, name: "Virgil van Dijk", team: "Netherlands", pos: "Defender", number: 4, age: 34, club: "Liverpool", goals: 1, assists: 0, apps: 4, bio: "Commanding center-back and captain marshalling a young Dutch backline." },
  { id: 10, name: "Achraf Hakimi", team: "Morocco", pos: "Defender", number: 2, age: 27, club: "Paris Saint-Germain", goals: 2, assists: 3, apps: 5, bio: "Attacking full-back who has been Morocco's outlet on the counter all tournament." },
  { id: 11, name: "Emiliano Martínez", team: "Argentina", pos: "Goalkeeper", number: 23, age: 33, club: "Aston Villa", goals: 0, assists: 0, apps: 4, cleanSheets: 2, bio: "Shot-stopper and penalty specialist, a key figure in Argentina's knockout run." },
  { id: 12, name: "Alisson Becker", team: "Brazil", pos: "Goalkeeper", number: 1, age: 33, club: "Liverpool", goals: 0, assists: 0, apps: 6, cleanSheets: 3, bio: "Brazil's last line of defense, known for elite reflexes and composure with the ball at his feet." },
  { id: 13, name: "Harry Kane", team: "England", pos: "Forward", number: 9, age: 32, club: "Bayern Munich", goals: 5, assists: 1, apps: 6, bio: "England's all-time leading scorer, still leading the line with clinical composure." },
  { id: 14, name: "Rafael Leão", team: "Portugal", pos: "Forward", number: 17, age: 27, club: "AC Milan", goals: 4, assists: 2, apps: 6, bio: "Explosive winger who has stepped up as Portugal's talisman." },
  { id: 15, name: "Ousmane Dembélé", team: "France", pos: "Forward", number: 11, age: 29, club: "Paris Saint-Germain", goals: 3, assists: 5, apps: 6, bio: "Leads the tournament in assists, combining relentlessly with Mbappé up front." },
  { id: 16, name: "Julián Álvarez", team: "Argentina", pos: "Forward", number: 9, age: 26, club: "Atlético Madrid", goals: 4, assists: 1, apps: 4, bio: "Tireless pressing forward who has chipped in with crucial knockout-stage goals." },
];

/* ---------------- News ---------------- */
const NEWS = [
  {
    id: 1, title: "Mbappé fires France into semifinal after stunning brace vs Brazil",
    date: "2026-07-09", tag: "Match Report",
    summary: "France edge a five-star quarterfinal 2-1 as Kylian Mbappé extends his tournament-leading tally to seven goals.",
    image: "linear-gradient(135deg,#1e3a8a,#1d4ed8)"
  },
  {
    id: 2, title: "Portugal survive penalty thriller against Spain",
    date: "2026-07-10", tag: "Match Report",
    summary: "Rafael Leão's extra-time equalizer forced penalties, where Portugal held their nerve to book a semifinal date with France.",
    image: "linear-gradient(135deg,#166534,#16a34a)"
  },
  {
    id: 3, title: "Yamal, 18, becomes youngest player to reach 6 goals at a World Cup",
    date: "2026-07-08", tag: "Feature",
    summary: "Spain's teenage sensation continues to rewrite the record books despite the quarterfinal exit.",
    image: "linear-gradient(135deg,#7c2d12,#ea580c)"
  },
  {
    id: 4, title: "Host nations reflect on group-stage exits as attention turns to the final four",
    date: "2026-07-03", tag: "Analysis",
    summary: "USA, Canada and Mexico all bowed out in the round of 32, but organizers hail record attendances across 16 host cities.",
    image: "linear-gradient(135deg,#312e81,#4338ca)"
  },
  {
    id: 5, title: "VAR semi-automated offside technology gets high marks at the midpoint",
    date: "2026-06-30", tag: "Analysis",
    summary: "FIFA says the new tech has cut offside decision times to under 20 seconds on average through the group stage.",
    image: "linear-gradient(135deg,#134e4a,#0d9488)"
  },
  {
    id: 6, title: "Italy's run ends in the quarterfinals as USA's dream finishes early",
    date: "2026-07-10", tag: "Match Report",
    summary: "Colombia edge Italy 2-0 to reach the semifinals for the first time since 2014, continuing a breakout tournament for South America's dark horse.",
    image: "linear-gradient(135deg,#7f1d1d,#dc2626)"
  },
  {
    id: 7, title: "Preview: France vs Portugal — a battle of tournament-best attacks",
    date: "2026-07-13", tag: "Preview",
    summary: "Two of the tournament's most explosive forward lines collide Tuesday at MetLife Stadium with a final berth on the line.",
    image: "linear-gradient(135deg,#581c87,#9333ea)"
  },
  {
    id: 8, title: "Ticket demand for the final tops 3 million requests for 82,500 seats",
    date: "2026-07-12", tag: "News",
    summary: "FIFA confirms the July 19 final at MetLife Stadium will be the most-attended in tournament history.",
    image: "linear-gradient(135deg,#0c4a6e,#0284c7)"
  },
];

/* ---------------- Live Commentary (France vs Portugal build-up / sample feed) ---------------- */
const COMMENTARY = {
  matchLabel: "Semifinal · France vs Portugal · Jul 14, 2026 · MetLife Stadium",
  status: "Pre-Match",
  feed: [
    { minute: "Pre", text: "Team news is in: Portugal go with an unchanged front three of Leão, Ramos and João Félix. France recall Kanté to shore up midfield." },
    { minute: "Pre", text: "Kickoff at MetLife Stadium is set for 18:00 ET, with 82,500 fans expected — a semifinal record." },
    { minute: "Pre", text: "Mbappé needs just one goal to match the tournament's single-edition scoring record." },
    { minute: "Pre", text: "Referee for tonight's match: a UEFA official making his first appearance of the knockout stage." },
    { minute: "Pre", text: "Weather update: clear skies, 27°C at kickoff — no concerns over conditions tonight." },
  ]
};
