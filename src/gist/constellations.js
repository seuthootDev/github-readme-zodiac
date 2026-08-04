/** Per-sign ASCII constellations for pinned Gist cards (right column). */
export const ASCII_CONSTELLATIONS = {
  aries: [
    "      ✦",
    "     ╱ ╲",
    "    ✦───✦",
    "       ╲",
    "        ✦",
  ],
  taurus: [
    "        ✦",
    "          ╲",
    "    ✦──────✦",
    "       ╲",
    "        ✦────✦",
  ],
  gemini: [
    "    ✦     �    "    ✦──────✦",
    "       ╲",
    "        ✦────✦",
  ],
  gemini: [
    "    ✦     ✦",
    "    │     │",
    "    ✦─────✦",
    "    │     │",
    "    ✦     ✦",
  ],
  cancer: [
    "     ✦───✦",
    "    ╱     ╲",
    "   ✦       ✦",
    "    ╲     ╱",
    "     ✦───✦",
  ],
  leo: [
    "      ✦",
    "   ✦──┼──✦",
    "      │",
    "   ✦──✦──✦",
    "      ✦",
  ],
  virgo: [
    "   ✦───✦───✦",
    "       │",
    "       ✦───✦",
    "           │",
    "           ✦",
  ],
  libra: [
    "      ✦",
    "     ╱ ╲",
    "  ✦─✦───✦─✦",
    "     ╲ ╱",
    "      ✦",
  ],
  scorpio: [
    "  ✦───✦───✦",
    "          ╲",
    "           ✦",
    "          ╱",
    "      ✦──✦──✦",
  ],
  sagittarius: [
    "          ✦",
    "         ╱",
    "    ✦───✦",
    "   ╱",
    "  ✦────✦",
  ],
  capricorn: [
    "   ✦────✦",
    "        ╲",
    "    ✦────✦",
    "   ╱",
    "  ✦───✦──✦",
  ],
  aquarius: [
    "  ✦──✦  ✦──✦",
    "     ╲╱",
    "  ✦──✦  ✦──✦",
    "     ╲╱",
    "      ✦",
  ],
  pisces: [
    "  ✦───✦   ✦───✦",
    "      ╲   ╱",
    "       ✦─✦",
    "      ╱   ╲",
    "  ✦───✦   ✦───✦",
  ],
};

export function getAsciiConstellation(signId) {
  return ASCII_CONSTELLATIONS[signId] || ASCII_CONSTELLATIONS.taurus;
}
