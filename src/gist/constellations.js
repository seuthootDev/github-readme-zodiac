/✦✦
 ✦ Per-sign ASCII constellations for pinned Gist cards.
 ✦ Pure ASCII (✦ / \\ - |) so GitHub gist monospace stays aligned.
 ✦/
export const ASCII_CONSTELLATIONS = {
  aries: [
    "      ✦",
    "     / \\",
    "    ✦---✦",
    "       \\",
    "        ✦",
  ],
  taurus: [
    "        ✦",
    "          \\",
    "    ✦------✦",
    "       \\",
    "        ✦----✦",
  ],
  gemini: [
    "    ✦     ✦",
    "    |     |",
    "    ✦-----✦",
    "    |     |",
    "    ✦     ✦",
  ],
  cancer: [
    "     ✦---✦",
    "    /     \\",
    "   ✦       ✦",
    "    \\     /",
    "     ✦---✦",
  ],
  leo: [
    "      ✦",
    "   ✦--+--+✦",
    "      |",
    "   ✦--✦--✦",
    "      ✦",
  ],
  virgo: [
    "   ✦---✦---✦",
    "       |",
    "       ✦---✦",
    "           |",
    "           ✦",
  ],
  libra: [
    "      ✦",
    "     / \\",
    "  ✦-✦-✦ ✦-✦",
    "     \\ /",
    "      ✦",
  ],
  scorpio: [
    "  ✦---✦---✦",
    "          \\",
    "           ✦",
    "          /",
    "      ✦--✦--✦",
  ],
  sagittarius: [
    "          ✦",
    "         /",
    "    ✦---✦",
    "   /",
    "  ✦----✦",
  ],
  capricorn: [
    "   ✦----✦",
    "        \\",
    "    ✦----✦",
    "   /",
    "  ✦---✦--✦",
  ],
  aquarius: [
    "  ✦--✦  ✦--✦",
    "     \\/",
    "  ✦--✦  ✦--✦",
    "     \\/",
    "      ✦",
  ],
  pisces: [
    "  ✦---✦   ✦---✦",
    "      \\   /",
    "       ✦-✦",
    "      /   \\",
    "  ✦---✦   ✦---✦",
  ],
};

export function getAsciiConstellation(signId) {
  return ASCII_CONSTELLATIONS[signId] || ASCII_CONSTELLATIONS.taurus;
}
