/**
 * Per-sign constellations for pinned Gist cards.
 * Stars use ✦; connectors stay ASCII so maps keep a stable shape.
 */
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
    "  ✦-✦---✦-✦",
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
