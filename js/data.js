/* =========================================================
   FIFA World Cup 2026 — Dashboard Data
   Compiled from public World Cup reporting (FIFA.com, ESPN,
   CBS Sports, Al Jazeera, Yahoo Sports, CNN, NBC, Goal.com,
   Sofascore and others) as of July 13, 2026 — the eve of the
   semifinals. Some fields (a handful of round-of-32/round-of-16
   kickoff details, and full 72-game group-stage box scores)
   were not reliably available from search and are omitted
   rather than invented. See the footer for a source note.
   ========================================================= */

const FLAGS = {
  "Mexico": "🇲🇽", "South Africa": "🇿🇦", "South Korea": "🇰🇷", "Czech Republic": "🇨🇿",
  "Canada": "🇨🇦", "Bosnia and Herzegovina": "🇧🇦", "Qatar": "🇶🇦", "Switzerland": "🇨🇭",
  "Brazil": "🇧🇷", "Morocco": "🇲🇦", "Haiti": "🇭🇹", "Scotland": "🏴",
  "USA": "🇺🇸", "Paraguay": "🇵🇾", "Australia": "🇦🇺", "Turkey": "🇹🇷",
  "Germany": "🇩🇪", "Curaçao": "🇨🇼", "Ivory Coast": "🇨🇮", "Ecuador": "🇪🇨",
  "Netherlands": "🇳🇱", "Japan": "🇯🇵", "Sweden": "🇸🇪", "Tunisia": "🇹🇳",
  "Belgium": "🇧🇪", "Egypt": "🇪🇬", "Iran": "🇮🇷", "New Zealand": "🇳🇿",
  "Spain": "🇪🇸", "Cape Verde": "🇨🇻", "Saudi Arabia": "🇸🇦", "Uruguay": "🇺🇾",
  "France": "🇫🇷", "Senegal": "🇸🇳", "Iraq": "🇮🇶", "Norway": "🇳🇴",
  "Argentina": "🇦🇷", "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴",
  "Portugal": "🇵🇹", "DR Congo": "🇨🇩", "Uzbekistan": "🇺🇿", "Colombia": "🇨🇴",
  "England": "🏴", "Croatia": "🇭🇷", "Ghana": "🇬🇭", "Panama": "🇵🇦",
  "TBD": "🏳️"
};

// Final Draw held Dec 5, 2025 at the Kennedy Center, Washington D.C.
// Hosts: Mexico (Group A), Canada (Group B), USA (Group D).
const GROUPS = {
  A: ["Mexico", "South Africa", "South Korea", "Czech Republic"],
  B: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["USA", "Paraguay", "Australia", "Turkey"],
  E: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

// Final group-stage status. "record" is only populated where the
// underlying results were confirmed by reporting; otherwise left null
// rather than invented. status: winner | runner-up | third | out
const TEAM_STATUS = {
  // Group A — fully confirmed via reporting
  "Mexico": { status: "winner", record: "3-0-0", pts: 9 },
  "South Africa": { status: "runner-up", record: "1-1-1", pts: 4 },
  "South Korea": { status: "out", record: "1-0-2", pts: 3 },
  "Czech Republic": { status: "out", record: "0-1-2", pts: 1 },
  // Group B
  "Switzerland": { status: "winner", record: null, pts: null },
  "Canada": { status: "runner-up", record: "0-1-1", pts: null },
  "Bosnia and Herzegovina": { status: "third", record: null, pts: null },
  "Qatar": { status: "out", record: null, pts: null },
  // Group C
  "Brazil": { status: "advanced", record: null, pts: null },
  "Morocco": { status: "advanced", record: null, pts: null },
  "Haiti": { status: "out", record: null, pts: null },
  "Scotland": { status: "out", record: null, pts: null },
  // Group D
  "USA": { status: "winner", record: null, pts: null },
  "Paraguay": { status: "advanced", record: null, pts: null },
  "Australia": { status: "advanced", record: null, pts: null },
  "Turkey": { status: "out", record: null, pts: null },
  // Group E
  "Germany": { status: "advanced", record: null, pts: null },
  "Ivory Coast": { status: "advanced", record: null, pts: null },
  "Ecuador": { status: "advanced", record: null, pts: null },
  "Curaçao": { status: "out", record: null, pts: null },
  // Group F
  "Netherlands": { status: "advanced", record: null, pts: null },
  "Sweden": { status: "advanced", record: null, pts: null },
  "Japan": { status: "advanced", record: null, pts: null },
  "Tunisia": { status: "out", record: null, pts: null },
  // Group G — confirmed
  "Belgium": { status: "winner", record: null, pts: null },
  "Egypt": { status: "runner-up", record: null, pts: null },
  "Iran": { status: "out", record: null, pts: null },
  "New Zealand": { status: "out", record: null, pts: null },
  // Group H — confirmed
  "Spain": { status: "winner", record: null, pts: null },
  "Cape Verde": { status: "runner-up", record: null, pts: null },
  "Saudi Arabia": { status: "out", record: null, pts: null },
  "Uruguay": { status: "out", record: null, pts: null },
  // Group I
  "France": { status: "advanced", record: null, pts: null },
  "Norway": { status: "advanced", record: null, pts: null },
  "Senegal": { status: "advanced", record: null, pts: null },
  "Iraq": { status: "out", record: null, pts: null },
  // Group J
  "Argentina": { status: "advanced", record: null, pts: null },
  "Austria": { status: "advanced", record: null, pts: null },
  "Algeria": { status: "advanced", record: null, pts: null },
  "Jordan": { status: "out", record: null, pts: null },
  // Group K — confirmed
  "Colombia": { status: "winner", record: null, pts: 7 },
  "Portugal": { status: "runner-up", record: null, pts: 5 },
  "DR Congo": { status: "third", record: null, pts: 4 },
  "Uzbekistan": { status: "out", record: null, pts: null },
  // Group L — confirmed
  "England": { status: "winner", record: null, pts: 7 },
  "Croatia": { status: "runner-up", record: null, pts: 6 },
  "Ghana": { status: "third", record: null, pts: 4 },
  "Panama": { status: "out", record: null, pts: null },
};

const STATUS_LABEL = {
  winner: "Winner",
  "runner-up": "Runner-up",
  advanced: "Advanced",
  third: "3rd Place Adv.",
  out: "Eliminated",
};

/* ---------------- Matches ---------------- */
// status: "FT" (final) or "UPCOMING". Group-stage entries are a curated
// selection (host-nation openers etc.), not the full 72-match slate.
const MATCHES = [
  // Group stage highlights
  { id: 1, stage: "Group Stage", date: "2026-06-11", time: "20:00 ET", venue: "Estadio Azteca, Mexico City", home: "Mexico", away: "South Africa", hs: 2, as: 0, status: "FT", note: "Tournament opener; three red cards. Quiñones and Jiménez scored." },
  { id: 2, stage: "Group Stage", date: "2026-06-12", time: "15:00 ET", venue: "SoFi Stadium, Los Angeles", home: "USA", away: "Paraguay", hs: 4, as: 1, status: "FT", note: "Balogun (2) and Reyna scored for the USA." },
  { id: 3, stage: "Group Stage", date: "2026-06-12", time: "18:00 ET", venue: "BMO Field, Toronto", home: "Canada", away: "Bosnia and Herzegovina", hs: 1, as: 1, status: "FT" },
  { id: 4, stage: "Group Stage", date: "2026-06-18", time: "18:00 ET", venue: "Estadio Azteca, Mexico City", home: "Mexico", away: "South Korea", hs: 1, as: 0, status: "FT" },
  { id: 5, stage: "Group Stage", date: "2026-06-24", time: "18:00 ET", venue: "Estadio Azteca, Mexico City", home: "Mexico", away: "Czech Republic", hs: 3, as: 0, status: "FT", note: "Mexico finish group with a perfect 9 points." },

  // Round of 32 (Jun 28 – Jul 4)
  { id: 11, stage: "Round of 32", date: "2026-06-28", time: "", venue: "SoFi Stadium, Los Angeles", home: "Canada", away: "South Africa", hs: 1, as: 0, status: "FT" },
  { id: 12, stage: "Round of 32", date: "2026-06-29", time: "", venue: "NRG Stadium, Houston", home: "Brazil", away: "Japan", hs: 2, as: 1, status: "FT" },
  { id: 13, stage: "Round of 32", date: "2026-06-29", time: "", venue: "Gillette Stadium, Boston", home: "Germany", away: "Paraguay", hs: 1, as: 1, hp: 3, ap: 4, status: "FT", note: "Paraguay win on penalties." },
  { id: 14, stage: "Round of 32", date: "2026-06-30", time: "", venue: "Estadio BBVA, Monterrey", home: "Netherlands", away: "Morocco", hs: 1, as: 1, hp: 2, ap: 3, status: "FT", note: "Morocco win on penalties." },
  { id: 15, stage: "Round of 32", date: "2026-06-30", time: "", venue: "AT&T Stadium, Dallas", home: "Ivory Coast", away: "Norway", hs: 1, as: 2, status: "FT" },
  { id: 16, stage: "Round of 32", date: "2026-06-30", time: "", venue: "MetLife Stadium, New York/New Jersey", home: "France", away: "Sweden", hs: 3, as: 0, status: "FT" },
  { id: 17, stage: "Round of 32", date: "2026-06-30", time: "", venue: "Estadio Azteca, Mexico City", home: "Mexico", away: "Ecuador", hs: 2, as: 0, status: "FT", note: "Quiñones and Jiménez scored; 4th straight clean-sheet win." },
  { id: 18, stage: "Round of 32", date: "2026-07-01", time: "", venue: "Lumen Field, Seattle", home: "USA", away: "Bosnia and Herzegovina", hs: 2, as: 0, status: "FT" },
  { id: 19, stage: "Round of 32", date: "2026-07-01", time: "", venue: "Mercedes-Benz Stadium, Atlanta", home: "England", away: "DR Congo", hs: 2, as: 1, status: "FT", note: "Harry Kane brace." },
  { id: 20, stage: "Round of 32", date: "2026-07-01", time: "", venue: "Lumen Field, Seattle", home: "Belgium", away: "Senegal", hs: 3, as: 2, status: "FT", note: "Belgium come back from 2-0 down; Lukaku (86'), Tielemans (89', pen. in ET)." },
  { id: 21, stage: "Round of 32", date: "2026-07-02", time: "", venue: "SoFi Stadium, Los Angeles", home: "Spain", away: "Austria", hs: 3, as: 0, status: "FT" },
  { id: 22, stage: "Round of 32", date: "2026-07-02", time: "", venue: "BMO Field, Toronto", home: "Portugal", away: "Croatia", hs: 2, as: 1, status: "FT" },
  { id: 23, stage: "Round of 32", date: "2026-07-03", time: "", venue: "BC Place, Vancouver", home: "Switzerland", away: "Algeria", hs: 2, as: 0, status: "FT" },
  { id: 24, stage: "Round of 32", date: "2026-07-03", time: "", venue: "AT&T Stadium, Dallas", home: "Australia", away: "Egypt", hs: 1, as: 1, hp: 2, ap: 4, status: "FT", note: "Egypt win on penalties." },
  { id: 25, stage: "Round of 32", date: "2026-07-03", time: "", venue: "Hard Rock Stadium, Miami", home: "Argentina", away: "Cape Verde", hs: 3, as: 2, status: "FT" },
  { id: 26, stage: "Round of 32", date: "2026-07-04", time: "", venue: "Arrowhead Stadium, Kansas City", home: "Colombia", away: "Ghana", hs: 1, as: 0, status: "FT" },

  // Round of 16 (Jul 4 – Jul 7)
  { id: 31, stage: "Round of 16", date: "2026-07-04", time: "21:00 ET", venue: "Lincoln Financial Field, Philadelphia", home: "France", away: "Paraguay", hs: 1, as: 0, status: "FT", note: "Mbappé with the only goal." },
  { id: 32, stage: "Round of 16", date: "2026-07-04", time: "12:00 ET", venue: "NRG Stadium, Houston", home: "Morocco", away: "Canada", hs: 3, as: 0, status: "FT", note: "Ounahi (2), Rahimi." },
  { id: 33, stage: "Round of 16", date: "2026-07-05", time: "", venue: "Estadio Azteca, Mexico City", home: "Mexico", away: "England", hs: 2, as: 3, status: "FT" },
  { id: 34, stage: "Round of 16", date: "2026-07-05", time: "", venue: "MetLife Stadium, New York/New Jersey", home: "Brazil", away: "Norway", hs: 1, as: 2, status: "FT", note: "Haaland brace (79', 90'); Neymar penalty in 10th min of stoppage time." },
  { id: 35, stage: "Round of 16", date: "2026-07-06", time: "19:00 ET", venue: "AT&T Stadium, Dallas", home: "Portugal", away: "Spain", hs: 0, as: 1, status: "FT", note: "Substitute Mikel Merino scores the only goal in added time." },
  { id: 36, stage: "Round of 16", date: "2026-07-06", time: "", venue: "Lumen Field, Seattle", home: "USA", away: "Belgium", hs: 1, as: 4, status: "FT", note: "De Ketelaere brace + assist; Lukaku (stoppage time). USA eliminated." },
  { id: 37, stage: "Round of 16", date: "2026-07-07", time: "20:00 ET", venue: "BC Place, Vancouver", home: "Switzerland", away: "Colombia", hs: 0, as: 0, hp: 4, ap: 3, status: "FT", note: "0-0 after 120 minutes; Switzerland win on penalties." },
  { id: 38, stage: "Round of 16", date: "2026-07-07", time: "16:00 ET", venue: "Mercedes-Benz Stadium, Atlanta", home: "Argentina", away: "Egypt", hs: 3, as: 2, status: "FT" },

  // Quarterfinals (Jul 9 – Jul 11)
  { id: 41, stage: "Quarterfinal", date: "2026-07-09", time: "16:00 ET", venue: "Gillette Stadium, Boston", home: "France", away: "Morocco", hs: 2, as: 0, status: "FT", note: "Second-half goals from Mbappé and Dembélé." },
  { id: 42, stage: "Quarterfinal", date: "2026-07-10", time: "15:00 ET", venue: "SoFi Stadium, Los Angeles", home: "Spain", away: "Belgium", hs: 2, as: 1, status: "FT", note: "Fabián Ruiz and a late Merino winner." },
  { id: 43, stage: "Quarterfinal", date: "2026-07-11", time: "17:00 ET", venue: "Hard Rock Stadium, Miami", home: "England", away: "Norway", hs: 2, as: 1, status: "FT", note: "Bellingham brace, after extra time." },
  { id: 44, stage: "Quarterfinal", date: "2026-07-11", time: "", venue: "Arrowhead Stadium, Kansas City", home: "Argentina", away: "Switzerland", hs: 3, as: 1, status: "FT", note: "Julián Álvarez and Lautaro Martínez score in extra time." },

  // Semifinals — upcoming
  { id: 51, stage: "Semifinal", date: "2026-07-14", time: "15:00 ET", venue: "AT&T Stadium, Dallas", home: "France", away: "Spain", hs: null, as: null, status: "UPCOMING", note: "First time the top 4 FIFA-ranked teams have all reached the World Cup semifinals." },
  { id: 52, stage: "Semifinal", date: "2026-07-15", time: "15:00 ET", venue: "Mercedes-Benz Stadium, Atlanta", home: "Argentina", away: "England", hs: null, as: null, status: "UPCOMING", note: "Argentina chase back-to-back titles; England chase a first since 1966." },

  // Third Place & Final
  { id: 61, stage: "Third Place", date: "2026-07-18", time: "17:00 ET", venue: "Hard Rock Stadium, Miami", home: "TBD", away: "TBD", hs: null, as: null, status: "UPCOMING" },
  { id: 62, stage: "Final", date: "2026-07-19", time: "15:00 ET", venue: "MetLife Stadium, New York/New Jersey", home: "TBD", away: "TBD", hs: null, as: null, status: "UPCOMING", note: "Halftime show curated by Chris Martin, featuring Madonna, Shakira and BTS." },
];

/* ---------------- Knockout Bracket ---------------- */
const BRACKET = {
  r16: [
    { home: "France", away: "Paraguay", hs: 1, as: 0 },
    { home: "Morocco", away: "Canada", hs: 3, as: 0 },
    { home: "Mexico", away: "England", hs: 2, as: 3 },
    { home: "Brazil", away: "Norway", hs: 1, as: 2, note: "Haaland brace" },
    { home: "Portugal", away: "Spain", hs: 0, as: 1, note: "Merino, added time" },
    { home: "USA", away: "Belgium", hs: 1, as: 4 },
    { home: "Switzerland", away: "Colombia", hs: 0, as: 0, note: "Switzerland win 4-3 on penalties" },
    { home: "Argentina", away: "Egypt", hs: 3, as: 2 },
  ],
  qf: [
    { home: "France", away: "Morocco", hs: 2, as: 0 },
    { home: "Spain", away: "Belgium", hs: 2, as: 1 },
    { home: "England", away: "Norway", hs: 2, as: 1, note: "After extra time — Bellingham brace" },
    { home: "Argentina", away: "Switzerland", hs: 3, as: 1, note: "After extra time" },
  ],
  sf: [
    { home: "France", away: "Spain", hs: null, as: null },
    { home: "Argentina", away: "England", hs: null, as: null },
  ],
  final: [
    { home: "TBD", away: "TBD", hs: null, as: null }
  ]
};

/* ---------------- Leaderboards ---------------- */
// adidas Golden Boot race, through the quarterfinals (assists is the
// first tiebreaker, which is why Mbappé leads Messi level on goals).
const TOP_SCORERS = [
  { name: "Kylian Mbappé", team: "France", goals: 8, assists: 3, apps: 6 },
  { name: "Lionel Messi", team: "Argentina", goals: 8, assists: 1, apps: 6 },
  { name: "Erling Haaland", team: "Norway", goals: 7, assists: null, apps: 6 },
  { name: "Harry Kane", team: "England", goals: 6, assists: null, apps: 6 },
  { name: "Jude Bellingham", team: "England", goals: 6, assists: null, apps: 6 },
  { name: "Ousmane Dembélé", team: "France", goals: 4, assists: 2, apps: 6 },
  { name: "Mikel Oyarzabal", team: "Spain", goals: 4, assists: null, apps: 6 },
  { name: "Vinícius Júnior", team: "Brazil", goals: 4, assists: null, apps: 5 },
  { name: "Ismaïla Sarr", team: "Senegal", goals: 4, assists: null, apps: 5 },
];

// Assists leaders as of the round-of-16 / quarterfinal stage.
const TOP_ASSISTS = [
  { name: "Michael Olise", team: "France", assists: 5, goals: null, apps: 6 },
  { name: "Brahim Díaz", team: "Morocco", assists: 4, goals: null, apps: 6 },
  { name: "Bruno Guimarães", team: "Brazil", assists: 4, goals: null, apps: 5 },
  { name: "Martin Ødegaard", team: "Norway", assists: 4, goals: null, apps: 6 },
  { name: "Andreas Schjelderup", team: "Norway", assists: 3, goals: null, apps: 6 },
  { name: "Kylian Mbappé", team: "France", assists: 3, goals: 8, apps: 6 },
  { name: "Ousmane Dembélé", team: "France", assists: 2, goals: 4, apps: 6 },
];

/* ---------------- Players ---------------- */
// Real players with only confirmed tournament stats/facts; unconfirmed
// numbers are omitted rather than estimated.
const PLAYERS = [
  { id: 1, name: "Kylian Mbappé", team: "France", pos: "Forward", club: "Real Madrid", goals: 8, assists: 3, apps: 6, bio: "Leads the Golden Boot race on 8 goals, scoring in France's quarterfinal win over Morocco to move ahead of Messi on the tiebreaker (assists)." },
  { id: 2, name: "Lionel Messi", team: "Argentina", pos: "Forward", club: "Inter Miami", goals: 8, assists: 1, apps: 6, bio: "Captaining the defending champions in his farewell World Cup, level with Mbappé on 8 goals as Argentina bid to be the first back-to-back winners since Brazil in 1958 and 1962." },
  { id: 3, name: "Lamine Yamal", team: "Spain", pos: "Forward", club: "FC Barcelona", goals: 1, assists: 0, apps: 6, bio: "A quiet tournament by his own sky-high standards (1 goal, 0 assists through 6 games), but Spain are into their first semifinal since winning it all in 2010." },
  { id: 4, name: "Erling Haaland", team: "Norway", pos: "Forward", club: "Manchester City", goals: 7, assists: null, apps: 6, bio: "Scored twice in the 79th and 90th minutes to knock out Brazil in the round of 16, sending Norway to the quarterfinals for the first time." },
  { id: 5, name: "Jude Bellingham", team: "England", pos: "Midfielder", club: "Real Madrid", goals: 6, assists: null, apps: 6, bio: "Scored braces against both Mexico and Norway — the first player with consecutive multi-goal knockout-stage games at a World Cup since Maradona in 1986." },
  { id: 6, name: "Harry Kane", team: "England", pos: "Forward", club: "Bayern Munich", goals: 6, assists: null, apps: 6, bio: "Opened the scoring account with a brace against DR Congo in the round of 32 and added a goal against Mexico in the round of 16." },
  { id: 7, name: "Vinícius Júnior", team: "Brazil", pos: "Forward", club: "Real Madrid", goals: 4, assists: null, apps: 5, bio: "Brazil's outlet on the left before their round-of-16 exit to Norway." },
  { id: 8, name: "Ousmane Dembélé", team: "France", pos: "Forward", club: "Paris Saint-Germain", goals: 4, assists: 2, apps: 6, bio: "Scored the second goal in France's 2-0 quarterfinal win over Morocco, combining relentlessly with Mbappé." },
  { id: 9, name: "Mikel Oyarzabal", team: "Spain", pos: "Forward", club: "Real Sociedad", goals: 4, assists: null, apps: 6, bio: "One of four players tied on 4 goals as Spain reached the semifinals for the first time since 2010." },
  { id: 10, name: "Ismaïla Sarr", team: "Senegal", pos: "Forward", club: "Crystal Palace", goals: 4, assists: null, apps: 5, bio: "Scored in Senegal's round-of-32 collapse against Belgium, in which Senegal led 2-0 before losing 3-2 in extra time." },
  { id: 11, name: "Michael Olise", team: "France", pos: "Winger", club: "Bayern Munich", goals: null, assists: 5, apps: 6, bio: "Leads the tournament in assists (5), supplying France's forward line throughout the knockout run." },
  { id: 12, name: "Brahim Díaz", team: "Morocco", pos: "Midfielder", club: "Real Madrid", goals: null, assists: 4, apps: 6, bio: "Creative hub for a Morocco side that beat Canada 3-0 in the round of 16 before falling to France in the quarterfinals." },
  { id: 13, name: "Bruno Guimarães", team: "Brazil", pos: "Midfielder", club: "Newcastle United", goals: null, assists: 4, apps: 5, bio: "Set up Neymar's stoppage-time penalty in Brazil's 2-1 round-of-16 loss to Norway." },
  { id: 14, name: "Martin Ødegaard", team: "Norway", pos: "Midfielder", club: "Arsenal", goals: null, assists: 4, apps: 6, bio: "Captains a Norway side into the World Cup quarterfinals for the first time, alongside strike partner Erling Haaland." },
  { id: 15, name: "Julián Álvarez", team: "Argentina", pos: "Forward", club: "Atlético Madrid", goals: null, assists: null, apps: 6, bio: "Scored in extra time as Argentina beat Switzerland 3-1 in the quarterfinals to reach the semifinals." },
  { id: 16, name: "Lautaro Martínez", team: "Argentina", pos: "Forward", club: "Inter Milan", goals: null, assists: null, apps: 6, bio: "Struck in extra time alongside Álvarez to see off Switzerland in the quarterfinals." },
  { id: 17, name: "Fabián Ruiz", team: "Spain", pos: "Midfielder", club: "Paris Saint-Germain", goals: null, assists: null, apps: 6, bio: "Opened the scoring in Spain's 2-1 quarterfinal win over Belgium." },
  { id: 18, name: "Mikel Merino", team: "Spain", pos: "Midfielder", club: "Arsenal", goals: null, assists: null, apps: 5, bio: "Super-sub who scored the added-time winner against Portugal in the round of 16, then the late winner against Belgium in the quarterfinals." },
  { id: 19, name: "Azzedine Ounahi", team: "Morocco", pos: "Midfielder", club: "Panathinaikos", goals: null, assists: null, apps: 6, bio: "Scored twice in Morocco's 3-0 rout of co-hosts Canada in the round of 16." },
  { id: 20, name: "Romelu Lukaku", team: "Belgium", pos: "Forward", club: "Napoli", goals: null, assists: null, apps: 6, bio: "Scored in stoppage time of extra time as Belgium completed a comeback from 2-0 down against Senegal in the round of 32, and again in the round-of-16 rout of the USA." },
  { id: 21, name: "Charles De Ketelaere", team: "Belgium", pos: "Forward", club: "Atalanta", goals: null, assists: null, apps: 6, bio: "Scored twice and added an assist as Belgium eliminated co-host USA 4-1 in the round of 16." },
  { id: 22, name: "Neymar", team: "Brazil", pos: "Forward", club: "Santos", goals: null, assists: null, apps: 5, bio: "Converted a stoppage-time penalty in Brazil's 2-1 round-of-16 defeat to Norway, in what was likely his final World Cup appearance." },
  { id: 23, name: "Örjan Nyland", team: "Norway", pos: "Goalkeeper", club: "Union Berlin", goals: null, assists: null, apps: 6, bio: "Produced a string of key saves in Norway's round-of-16 upset of Brazil." },
  { id: 24, name: "Julián Quiñones", team: "Mexico", pos: "Forward", club: "Club América", goals: null, assists: null, apps: 6, bio: "Scored in Mexico's tournament-opening win over South Africa and again in the round-of-32 win over Ecuador." },
];

/* ---------------- News ---------------- */
// Real headlines with links to the original reporting.
const NEWS = [
  {
    id: 1, date: "2026-07-13", tag: "Preview",
    title: "Are Messi, Mbappé, Yamal and Kane part of the best World Cup semifinal yet?",
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/sports/2026/7/13/are-messi-mbappe-yamal-and-kane-part-of-the-best-world-cup-semifinal-yet",
    summary: "For the first time, the top four FIFA-ranked teams — Argentina, France, Spain and England — have all reached the World Cup semifinals.",
    image: "linear-gradient(135deg,#581c87,#9333ea)"
  },
  {
    id: 2, date: "2026-07-13", tag: "News",
    title: "FIFA World Cup 2026: Semifinals set as France, Spain, England and Argentina chase a place in the final",
    source: "American Bazaar",
    url: "https://americanbazaaronline.com/2026/07/13/fifa-world-cup-2026-484488/",
    summary: "France meet Spain in Dallas on July 14, and defending champions Argentina face England in Atlanta on July 15.",
    image: "linear-gradient(135deg,#0c4a6e,#0284c7)"
  },
  {
    id: 3, date: "2026-07-12", tag: "Feature",
    title: "'We beat them twice!' — Yamal dismisses criticism over World Cup goal record ahead of semi-final",
    source: "Goal.com",
    url: "https://www.goal.com/en/lists/spain-lamine-yamal-not-afraid-france-world-cup-semi-final/blta20db491c974e9ce",
    summary: "Spain's teenage star has just 1 goal at the tournament, but says the result is all that matters ahead of facing France.",
    image: "linear-gradient(135deg,#7c2d12,#ea580c)"
  },
  {
    id: 4, date: "2026-07-11", tag: "Match Report",
    title: "Argentina beat Switzerland 3-1 after extra time to reach the semifinals",
    source: "Yahoo Sports",
    url: "https://sports.yahoo.com/soccer/live/world-cup-bracket-schedule-scores-results-live-updates-quarterfinals-203257966.html",
    summary: "Julián Álvarez and Lautaro Martínez struck in extra time as the defending champions completed a stacked semifinal field.",
    image: "linear-gradient(135deg,#134e4a,#0d9488)"
  },
  {
    id: 5, date: "2026-07-09", tag: "Match Report",
    title: "France beat Morocco 2-0 to reach the semifinals",
    source: "FIFA.com",
    url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026",
    summary: "Second-half goals from Kylian Mbappé and Ousmane Dembélé sent France through to face Spain in Dallas.",
    image: "linear-gradient(135deg,#1e3a8a,#1d4ed8)"
  },
  {
    id: 6, date: "2026-07-06", tag: "Match Report",
    title: "Belgium ends the USA's World Cup dream with a dominant 4-1 win in the Round of 16",
    source: "CNN",
    url: "https://www.cnn.com/2026/07/06/sport/live-news/usa-belgium-world-cup-score",
    summary: "Charles De Ketelaere scored twice and Romelu Lukaku added a late goal as co-host USA's run ended in Seattle.",
    image: "linear-gradient(135deg,#7f1d1d,#dc2626)"
  },
  {
    id: 7, date: "2026-07-05", tag: "Match Report",
    title: "Haaland scores twice as Norway stun Brazil 2-1 in World Cup 2026 last 16",
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/sports/2026/7/5/haaland-scores-twice-as-norway-stun-brazil-2-1-in-world-cup-2026-last-16",
    summary: "Erling Haaland's late brace eliminated five-time champions Brazil, with Neymar's stoppage-time penalty proving a consolation.",
    image: "linear-gradient(135deg,#166534,#16a34a)"
  },
  {
    id: 8, date: "2026-06-11", tag: "Match Report",
    title: "World Cup highlights: Mexico defeats South Africa 2-0 in the World Cup's opening match",
    source: "CNN",
    url: "https://www.cnn.com/2026/06/11/sport/live-news/world-cup-mexico-south-africa",
    summary: "Julián Quiñones and Raúl Jiménez scored as co-hosts Mexico won a tournament opener for the first time, in a match with three red cards.",
    image: "linear-gradient(135deg,#312e81,#4338ca)"
  },
];

/* ---------------- Semifinal build-up notes ---------------- */
// Real, sourced facts compiled from published match previews —
// not simulated minute-by-minute commentary.
const COMMENTARY = {
  matchLabel: "Semifinal preview · France vs Spain · Jul 14, 2026, 3:00pm ET · AT&T Stadium, Dallas",
  feed: [
    { minute: "Note", text: "This is the first World Cup in history where the top four FIFA-ranked teams (Argentina, France, Spain, England) have all reached the semifinals." },
    { minute: "Note", text: "Kylian Mbappé and Lionel Messi are tied atop the Golden Boot race on 8 goals each; Mbappé leads on the assists tiebreaker, 3 to 1." },
    { minute: "Note", text: "Spain reached the semifinals for the first time since 2010, the year they won their only World Cup title, beating Portugal 1-0 on a Mikel Merino added-time winner in the round of 16." },
    { minute: "Note", text: "Lamine Yamal has just 1 goal and 0 assists through 6 appearances — well below his billing — but says results matter more than his personal tally: \"We beat them twice!\"" },
    { minute: "Note", text: "France reached the last four by beating Morocco 2-0 in the quarterfinals, with Mbappé and Ousmane Dembélé scoring in the second half." },
    { minute: "Note", text: "The winner advances to the July 19 final at MetLife Stadium, whose halftime show will be curated by Chris Martin and feature Madonna, Shakira and BTS." },
  ],
  secondLabel: "Semifinal preview · Argentina vs England · Jul 15, 2026, 3:00pm ET · Mercedes-Benz Stadium, Atlanta",
  secondFeed: [
    { minute: "Note", text: "Defending champions Argentina are bidding to become the first team to win back-to-back World Cups since Brazil in 1958 and 1962." },
    { minute: "Note", text: "England are chasing a first World Cup title since 1966, and a first final appearance since then." },
    { minute: "Note", text: "Argentina beat Switzerland 3-1 after extra time in the quarterfinals, with Julián Álvarez and Lautaro Martínez scoring in the additional 30 minutes." },
    { minute: "Note", text: "England needed extra time themselves to beat Norway 2-1 in the quarterfinals, with Jude Bellingham's brace continuing a stretch of consecutive multi-goal knockout games — the first since Maradona in 1986." },
  ]
};
