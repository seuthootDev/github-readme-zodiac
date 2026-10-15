/**
 * Chibi zodiac characters as inline SVG. Each one is drawn in a local
 * 120×120 box; the card positions and scales it.
 */

export const INK = "#4b3a52";
const BLUSH = "#ff8fa3";
const LINE = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;

function f(n) {
  return Number(n.toFixed(1));
}

/** Eyes with a highlight that blink every few seconds. */
function eyes(cx, cy, gap = 10, s = 1, blinkAt = 0) {
  const rx = f(3.2 * s);
  const ry = f(4 * s);
  const begin = `${blinkAt.toFixed(1)}s`;
  return [-1, 1]
    .map((side) => {
      const x = f(cx + side * gap);
      return `<ellipse cx="${x}" cy="${f(cy)}" rx="${rx}" ry="${ry}" fill="${INK}">
        <animate attributeName="ry" values="${ry};${ry};${f(ry * 0.12)};${ry}" keyTimes="0;0.93;0.96;1" dur="4.2s" begin="${begin}" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="${f(x + 1.1 * s)}" cy="${f(cy - 1.4 * s)}" r="${f(1.2 * s)}" fill="#ffffff">
        <animate attributeName="opacity" values="1;1;0;1" keyTimes="0;0.93;0.96;1" dur="4.2s" begin="${begin}" repeatCount="indefinite"/>
      </circle>`;
    })
    .join("");
}

function blush(cx, cy, gap = 17, s = 1) {
  return [-1, 1]
    .map(
      (side) =>
        `<ellipse cx="${f(cx + side * gap)}" cy="${f(cy)}" rx="${f(4.8 * s)}" ry="${f(2.8 * s)}" fill="${BLUSH}" opacity="0.55"/>`,
    )
    .join("");
}

function smile(cx, cy, w = 4, s = 1) {
  const hw = w * s;
  return `<path d="M${f(cx - hw)},${f(cy)} Q${f(cx)},${f(cy + 4.5 * s)} ${f(cx + hw)},${f(cy)}" fill="none" stroke="${INK}" stroke-width="${f(2.2 * s)}" stroke-linecap="round"/>`;
}

/** Full face centered on (cx, cy). */
function face(cx, cy, s = 1, blinkAt = 0) {
  return (
    blush(cx, cy + 7 * s, 17 * s, s) +
    eyes(cx, cy, 10 * s, s, blinkAt) +
    smile(cx, cy + 6 * s, 4, s)
  );
}

/** Thick outlined stroke: ink underneath, color on top (horns, tails, bows). */
function tube(d, color, width = 6) {
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${width + 5}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** Union of circles with one outer outline (wool, manes, tails). */
function puff(circles, color) {
  const outline = circles
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}" stroke="${INK}" stroke-width="5"/>`)
    .join("");
  const fill = circles
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`)
    .join("");
  return outline + fill;
}

function feet(xs, y, color) {
  return xs
    .map((x) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="4.5" fill="${color}" ${LINE}/>`)
    .join("");
}

/** Crab claw: circle with a wedge cut out at the top. */
function claw(cx, cy, r, color, tilt = 0) {
  const a0 = ((-70 + tilt) * Math.PI) / 180;
  const a1 = ((-110 + tilt) * Math.PI) / 180;
  const p0 = [f(cx + r * Math.cos(a0)), f(cy + r * Math.sin(a0))];
  const p1 = [f(cx + r * Math.cos(a1)), f(cy + r * Math.sin(a1))];
  return `<path d="M${cx},${cy} L${p0[0]},${p0[1]} A${r},${r} 0 1 1 ${p1[0]},${p1[1]} Z" fill="${color}" ${LINE}/>`;
}

function sparkle(x, y, r, color) {
  return `<path d="M${x},${y - r} Q${x},${y} ${x + r},${y} Q${x},${y} ${x},${y + r} Q${x},${y} ${x - r},${y} Q${x},${y} ${x},${y - r} Z" fill="${color}" ${LINE.replace('stroke-width="2.5"', 'stroke-width="1.6"')}/>`;
}

function heart(x, y, s, color) {
  return `<path d="M${x},${f(y + 4 * s)} C${f(x - 8 * s)},${f(y - 2 * s)} ${f(x - 5 * s)},${f(y - 8 * s)} ${x},${f(y - 4 * s)} C${f(x + 5 * s)},${f(y - 8 * s)} ${f(x + 8 * s)},${f(y - 2 * s)} ${x},${f(y + 4 * s)} Z" fill="${color}" ${LINE.replace('stroke-width="2.5"', 'stroke-width="1.8"')}/>`;
}

function fish(cx, cy, dir, color, blinkAt) {
  const tailX = cx - dir * 18;
  const tipX = cx - dir * 33;
  const eyeX = cx + dir * 9;
  return `<path d="M${tailX},${cy} L${tipX},${cy - 11} Q${cx - dir * 28},${cy} ${tipX},${cy + 11} Z" fill="${color}" ${LINE}/>
    <ellipse cx="${cx}" cy="${cy}" rx="22" ry="14" fill="${color}" ${LINE}/>
    <path d="M${cx - dir * 4},${cy - 13} Q${cx - dir * 10},${cy - 21} ${cx - dir * 16},${cy - 10}" fill="${color}" ${LINE}/>
    ${eyes(eyeX, cy - 2, 5, 0.75, blinkAt)}
    ${blush(eyeX, cy + 4, 8, 0.7)}
    ${smile(eyeX, cy + 3, 2.6, 0.8)}`;
}

const DRAW = {
  aries() {
    const wool = "#fffaf3";
    return `${puff(
      [
        [60, 34, 14], [41, 40, 13], [79, 40, 13], [33, 58, 13], [87, 58, 13],
        [38, 78, 13], [82, 78, 13], [60, 86, 14], [60, 60, 27],
      ],
      wool,
    )}
    ${tube("M44,46 C24,34 8,54 18,68 C26,78 40,70 33,61", "#f6ad79", 6.5)}
    ${tube("M76,46 C96,34 112,54 102,68 C94,78 80,70 87,61", "#f6ad79", 6.5)}
    <ellipse cx="60" cy="66" rx="21" ry="19" fill="#ffe2d1" ${LINE}/>
    ${face(60, 64, 0.95, 0.3)}`;
  },

  taurus() {
    const head = "#f3d5b5";
    return `${tube("M42,42 C30,36 25,26 30,15", "#fff1d2", 6)}
    ${tube("M78,42 C90,36 95,26 90,15", "#fff1d2", 6)}
    <ellipse cx="27" cy="56" rx="11" ry="6.5" fill="${head}" transform="rotate(-20 27 56)" ${LINE}/>
    <ellipse cx="93" cy="56" rx="11" ry="6.5" fill="${head}" transform="rotate(20 93 56)" ${LINE}/>
    <ellipse cx="60" cy="64" rx="32" ry="30" fill="${head}" ${LINE}/>
    <path d="M60,35 L60,25" ${LINE} fill="none"/>
    <ellipse cx="53" cy="24" rx="7" ry="4" fill="#8fd17f" transform="rotate(-25 53 24)" ${LINE}/>
    <ellipse cx="67" cy="22" rx="7" ry="4" fill="#8fd17f" transform="rotate(25 67 22)" ${LINE}/>
    <ellipse cx="60" cy="81" rx="18" ry="11" fill="#f7b8b0" ${LINE}/>
    <ellipse cx="54" cy="81" rx="2.2" ry="2.8" fill="${INK}"/>
    <ellipse cx="66" cy="81" rx="2.2" ry="2.8" fill="${INK}"/>
    ${blush(60, 70, 23)}
    ${eyes(60, 60, 12, 1, 0.8)}`;
  },

  gemini() {
    return `${heart(60, 30, 1.1, "#ff9fb8")}
    <path d="M37,47 C33,39 38,34 44,37" fill="none" ${LINE}/>
    <path d="M83,47 C87,39 82,34 76,37" fill="none" ${LINE}/>
    ${feet([28, 46], 94, "#ffe08a")}
    ${feet([74, 92], 94, "#d6c6ff")}
    <ellipse cx="37" cy="70" rx="24" ry="23" fill="#ffe08a" ${LINE}/>
    <ellipse cx="83" cy="70" rx="24" ry="23" fill="#d6c6ff" ${LINE}/>
    <path d="M55,80 Q60,74 65,80" fill="none" ${LINE}/>
    ${face(37, 69, 0.8, 0.2)}
    ${face(83, 69, 0.8, 1.6)}`;
  },

  cancer() {
    const shell = "#ff9e94";
    return `<path d="M34,80 L22,90 M38,86 L28,98 M86,80 L98,90 M82,86 L92,98" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    ${tube("M33,66 Q20,60 21,46", shell, 4)}
    ${tube("M87,66 Q100,60 99,46", shell, 4)}
    ${claw(20, 38, 11, shell, -15)}
    ${claw(100, 38, 11, shell, 15)}
    <path d="M51,50 L48,34 M69,50 L72,34" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="60" cy="68" rx="32" ry="23" fill="${shell}" ${LINE}/>
    <circle cx="47" cy="31" r="7" fill="#ffffff" ${LINE}/>
    <circle cx="73" cy="31" r="7" fill="#ffffff" ${LINE}/>
    <circle cx="48" cy="31" r="3" fill="${INK}"/>
    <circle cx="74" cy="31" r="3" fill="${INK}"/>
    <circle cx="48" cy="57" r="3" fill="#ffffff" opacity="0.6"/>
    <circle cx="74" cy="58" r="2.2" fill="#ffffff" opacity="0.6"/>
    ${blush(60, 72, 18)}
    ${smile(60, 70, 5)}`;
  },

  leo() {
    const mane = [];
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2;
      mane.push([f(60 + Math.cos(a) * 30), f(64 + Math.sin(a) * 30), 13]);
    }
    return `${puff(mane, "#ffb35c")}
    <circle cx="42" cy="44" r="7" fill="#ffe2a6" ${LINE}/>
    <circle cx="78" cy="44" r="7" fill="#ffe2a6" ${LINE}/>
    <circle cx="42" cy="44" r="3" fill="#ffb3a3"/>
    <circle cx="78" cy="44" r="3" fill="#ffb3a3"/>
    <circle cx="60" cy="64" r="25" fill="#ffe2a6" ${LINE}/>
    ${blush(60, 70, 16)}
    ${eyes(60, 61, 10, 1, 0.5)}
    <path d="M57,67 L63,67 L60,70 Z" fill="#e8857a" stroke="#e8857a" stroke-width="2" stroke-linejoin="round"/>
    <path d="M54,72 Q57,76 60,72 Q63,76 66,72" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    <path d="M49,30 L49,19 L54.5,24 L60,15 L65.5,24 L71,19 L71,30 Z" fill="#ffd84d" ${LINE}/>`;
  },

  virgo() {
    const hair = "#c99a6e";
    const flower = (x, y) =>
      [0, 1, 2, 3, 4]
        .map((i) => {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          return `<circle cx="${f(x + Math.cos(a) * 4)}" cy="${f(y + Math.sin(a) * 4)}" r="3.2" fill="#ffffff" stroke="${INK}" stroke-width="1.4"/>`;
        })
        .join("") + `<circle cx="${x}" cy="${y}" r="2.4" fill="#ffd84d" stroke="${INK}" stroke-width="1.4"/>`;
    return `<rect x="26" y="30" width="68" height="70" rx="32" fill="${hair}" ${LINE}/>
    <ellipse cx="60" cy="66" rx="25" ry="24" fill="#ffe6d6" ${LINE}/>
    <path d="M35,66 C32,42 46,33 60,33 C76,33 89,44 85,66 C82,57 77,51 70,48 C62,56 49,61 35,66 Z" fill="${hair}" ${LINE}/>
    ${flower(40, 38)}
    ${flower(60, 30)}
    ${flower(80, 38)}
    ${face(60, 68, 0.9, 1.1)}`;
  },

  libra() {
    const gold = "#ffd36b";
    const pan = (cx) => `<path d="M${cx},18 L${cx - 9},34 M${cx},18 L${cx + 9},34" fill="none" stroke="${INK}" stroke-width="1.6"/>
      <path d="M${cx - 12},34 Q${cx},46 ${cx + 12},34 Z" fill="${gold}" ${LINE}/>`;
    return `<path d="M60,40 L60,14 M32,18 L88,18" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="60" cy="12" r="4" fill="${gold}" ${LINE}/>
    ${pan(32)}
    ${pan(88)}
    ${feet([47, 73], 100, "#ffc2d9")}
    <ellipse cx="60" cy="71" rx="32" ry="29" fill="#ffc2d9" ${LINE}/>
    ${heart(60, 92, 0.6, "#ff8fb1")}
    ${face(60, 70, 1, 2.1)}`;
  },

  scorpio() {
    const body = "#c9a7f2";
    return `${puff(
      [[78, 52, 9], [89, 39, 8], [88, 25, 7], [77, 16, 6]],
      body,
    )}
    ${heart(65, 17, 0.9, "#ff8fb1")}
    ${tube("M36,74 Q24,72 22,62", body, 4)}
    ${tube("M84,78 Q96,80 100,70", body, 4)}
    ${claw(22, 56, 9, body, -20)}
    ${claw(100, 64, 9, body, 20)}
    ${feet([46, 72], 98, body)}
    <circle cx="59" cy="72" r="28" fill="${body}" ${LINE}/>
    <path d="M47,52 Q59,46 71,52" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
    ${face(59, 73, 1, 0.9)}`;
  },

  sagittarius() {
    return `${tube("M93,38 Q112,70 93,102", "#d49a62", 4)}
    <path d="M93,38 L93,102" stroke="${INK}" stroke-width="1.5"/>
    <path d="M70,70 L106,70" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M70,70 L65,64 M70,70 L65,76" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    ${feet([46, 70], 99, "#b8c1ff")}
    <ellipse cx="57" cy="70" rx="30" ry="29" fill="#b8c1ff" ${LINE}/>
    <ellipse cx="72" cy="30" rx="5.5" ry="13" fill="#ffd36b" transform="rotate(25 72 30)" ${LINE}/>
    <path d="M34,53 Q57,43 80,53" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M34,53 Q57,43 80,53" fill="none" stroke="#ff9fb8" stroke-width="3.5" stroke-linecap="round"/>
    ${sparkle(110, 70, 8, "#ffd84d")}
    ${face(55, 72, 1, 1.4)}`;
  },

  capricorn() {
    const fur = "#dbe1ec";
    const tail = "#8fd6c8";
    return `${tube("M64,90 C88,104 106,92 102,74", tail, 7)}
    <path d="M102,74 C94,66 94,58 98,54 C101,60 104,62 108,58 C110,64 108,70 102,74 Z" fill="${tail}" ${LINE}/>
    ${tube("M48,42 C44,26 34,20 25,23", "#efe2c6", 6)}
    ${tube("M72,42 C76,26 86,20 95,23", "#efe2c6", 6)}
    <ellipse cx="30" cy="56" rx="11" ry="6" fill="${fur}" transform="rotate(-28 30 56)" ${LINE}/>
    <ellipse cx="90" cy="56" rx="11" ry="6" fill="${fur}" transform="rotate(28 90 56)" ${LINE}/>
    <ellipse cx="60" cy="66" rx="30" ry="28" fill="${fur}" ${LINE}/>
    <path d="M55,93 Q60,106 65,93 Z" fill="#ffffff" ${LINE}/>
    ${face(60, 66, 1, 0.6)}`;
  },

  aquarius() {
    const drop = (x, y, s) =>
      `<path d="M${x},${y - 6 * s} C${x + 4 * s},${y - 1 * s} ${x + 5 * s},${y + 2 * s} ${x},${y + 5 * s} C${x - 5 * s},${y + 2 * s} ${x - 4 * s},${y - 1 * s} ${x},${y - 6 * s} Z" fill="#7fd8ec" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`;
    return `<g transform="rotate(35 98 46)">
      <rect x="92" y="26" width="12" height="8" rx="2" fill="#ffd59e" ${LINE}/>
      <ellipse cx="98" cy="46" rx="13" ry="14" fill="#ffd59e" ${LINE}/>
      <path d="M86,44 Q98,50 110,44" fill="none" stroke="#f0a95c" stroke-width="2.5"/>
    </g>
    ${drop(112, 66, 1)}
    ${drop(106, 82, 0.8)}
    ${drop(112, 96, 0.7)}
    <path d="M60,22 C74,42 90,56 90,76 C90,94 77,104 60,104 C43,104 30,94 30,76 C30,56 46,42 60,22 Z" fill="#a9e2f7" ${LINE}/>
    <ellipse cx="45" cy="64" rx="3.5" ry="7" fill="#ffffff" opacity="0.8" transform="rotate(25 45 64)"/>
    ${face(60, 78, 1, 1.8)}`;
  },

  pisces() {
    return `<circle cx="60" cy="64" r="44" fill="none" stroke="${INK}" stroke-width="1.6" stroke-dasharray="3 5" stroke-linecap="round" opacity="0.35"/>
    ${fish(58, 42, -1, "#ffb3c7", 0.4)}
    ${fish(62, 86, 1, "#9fe3d0", 2.2)}
    <circle cx="98" cy="40" r="4" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
    <circle cx="105" cy="28" r="2.6" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
    <circle cx="20" cy="88" r="3.4" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>`;
  },
};

/** Character markup in a 120×120 local box, or "" for an unknown sign. */
export function drawCharacter(signId) {
  const draw = DRAW[signId];
  return draw ? draw() : "";
}

export const CHARACTER_IDS = Object.keys(DRAW);
