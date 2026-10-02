export interface VegInfo {
  name: string;
  emoji: string;
  gradient: string;
  desc: string;
  shelf: string;
  criteria: string[];
  issues: string[];
}

export const VEGETABLES: VegInfo[] = [
  { name: "Onion", emoji: "🧅", gradient: "from-amber-400 to-orange-600", desc: "Checks skin dryness, firmness and sprouting.", shelf: "2-3 months", criteria: ["Skin dryness", "Firmness", "Sprouting", "Color uniformity"], issues: ["sprouted onion", "soft spot", "black mold"] },
  { name: "Tomato", emoji: "🍅", gradient: "from-red-400 to-rose-600", desc: "Checks ripeness, skin cracks and color.", shelf: "5-7 days", criteria: ["Ripeness", "Skin integrity", "Color", "Firmness"], issues: ["damaged tomato", "overripe tomato", "cracked skin"] },
  { name: "Potato", emoji: "🥔", gradient: "from-yellow-600 to-amber-800", desc: "Checks greening, sprouts and bruises.", shelf: "2-4 months", criteria: ["Greening", "Skin smoothness", "Firmness", "Sprouting"], issues: ["green patches", "sprouting", "bruising"] },
  { name: "Carrot", emoji: "🥕", gradient: "from-orange-400 to-red-500", desc: "Checks color, crispness and cracks.", shelf: "3-4 weeks", criteria: ["Color", "Crispness", "Shape", "Surface cracks"], issues: ["cracked carrot", "limp carrot", "forked root"] },
  { name: "Brinjal", emoji: "🍆", gradient: "from-purple-500 to-fuchsia-700", desc: "Checks gloss, firmness and insect holes.", shelf: "5-7 days", criteria: ["Skin gloss", "Firmness", "Color", "Calyx freshness"], issues: ["wrinkled skin", "soft rot", "insect hole"] },
  { name: "Cabbage", emoji: "🥬", gradient: "from-lime-400 to-green-600", desc: "Checks head compactness and leaf damage.", shelf: "1-2 weeks", criteria: ["Head compactness", "Leaf color", "Outer leaf damage", "Freshness"], issues: ["loose head", "yellow leaves", "worm damage"] },
  { name: "Cauliflower", emoji: "🥦", gradient: "from-emerald-400 to-teal-600", desc: "Checks curd whiteness and black spots.", shelf: "1 week", criteria: ["Curd whiteness", "Compactness", "Leaf freshness", "Spots"], issues: ["browning curd", "black spots", "loose curd"] },
  { name: "Chilli", emoji: "🌶️", gradient: "from-red-500 to-red-800", desc: "Checks color, stem and shriveling.", shelf: "1-2 weeks", criteria: ["Color", "Stem freshness", "Firmness", "Shrivel level"], issues: ["shriveled chilli", "stem rot", "discoloration"] },
  { name: "Capsicum", emoji: "🫑", gradient: "from-green-400 to-emerald-700", desc: "Checks gloss, wall thickness and soft spots.", shelf: "1-2 weeks", criteria: ["Skin gloss", "Firmness", "Color", "Wall thickness"], issues: ["soft spot", "wrinkling", "sunscald"] },
  { name: "Cucumber", emoji: "🥒", gradient: "from-teal-400 to-green-700", desc: "Checks firmness, color and yellowing.", shelf: "1 week", criteria: ["Firmness", "Color", "Shape", "Skin damage"], issues: ["yellowing", "soft end", "skin damage"] },
  { name: "Garlic", emoji: "🧄", gradient: "from-slate-300 to-stone-500", desc: "Checks bulb firmness, cloves and mold.", shelf: "3-5 months", criteria: ["Bulb firmness", "Skin intact", "Clove fill", "Mold"], issues: ["blue mold", "dried cloves", "sprouting"] },
];