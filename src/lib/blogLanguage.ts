export type BlogLanguage = "en" | "ur" | "ro";

const ARABIC_SCRIPT = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/u;
const ROMAN_URDU_WORDS = new Set([
  "hai", "hain", "ke", "ki", "ka", "ko", "se", "mein", "aur", "yeh", "ye", "woh",
  "nahi", "kya", "kyun", "kaise", "tha", "thi", "hota", "hoti", "kar", "bhi", "par",
  "ho", "hum", "aap", "liye", "lekin",
]);

export function detectLang(text: string): BlogLanguage {
  const letters = [...text].filter((character) => /\p{L}/u.test(character));
  const arabicLetters = letters.filter((character) => ARABIC_SCRIPT.test(character));
  if (letters.length > 0 && arabicLetters.length / letters.length > 0.3) return "ur";

  const sample = text.slice(0, 600).toLowerCase();
  const words = sample.match(/[a-z]+/g) || [];
  const hits = words.filter((word) => ROMAN_URDU_WORDS.has(word)).length;
  if (words.length > 0 && hits / words.length >= 0.04) return "ro";
  return "en";
}

export const languageNames: Record<BlogLanguage, string> = {
  en: "English",
  ur: "Urdu",
  ro: "Roman Urdu",
};
