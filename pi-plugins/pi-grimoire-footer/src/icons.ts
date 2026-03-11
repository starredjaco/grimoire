export interface IconSet {
  grimoire: string;
  model: string;
  folder: string;
  branch: string;
  context: string;
  cache: string;
  input: string;
  auto: string;
}

export const SEP_DOT = " · ";

// Nerd Font icons
const NERD_ICONS: IconSet = {
  grimoire: "\uF06D",       // nf-fa-fire (🔥)
  model: "\uEC19",          // nf-md-chip
  folder: "\uF115",         // nf-fa-folder_open
  branch: "\uF126",         // nf-fa-code_fork
  context: "\uE70F",        // nf-dev-database
  cache: "\uF1C0",          // nf-fa-database
  input: "\uF090",          // nf-fa-sign_in
  auto: "\u{F0068}",        // nf-md-lightning_bolt
};

// ASCII/Unicode fallback icons
const ASCII_ICONS: IconSet = {
  grimoire: "⚗",
  model: "◈",
  folder: "📁",
  branch: "⎇",
  context: "◫",
  cache: "cache",
  input: "in:",
  auto: "⚡",
};

// Separator characters
export interface SeparatorChars {
  thinLeft: string;
  thinRight: string;
}

const NERD_SEPS: SeparatorChars = {
  thinLeft: "\uE0B1",   //
  thinRight: "\uE0B3",  //
};

const ASCII_SEPS: SeparatorChars = {
  thinLeft: "|",
  thinRight: "|",
};

/** Detect Nerd Font support */
export function hasNerdFonts(): boolean {
  if (process.env.POWERLINE_NERD_FONTS === "1") return true;
  if (process.env.POWERLINE_NERD_FONTS === "0") return false;
  if (process.env.GHOSTTY_RESOURCES_DIR) return true;
  const term = (process.env.TERM_PROGRAM || "").toLowerCase();
  return ["iterm", "wezterm", "kitty", "ghostty", "alacritty"].some(t => term.includes(t));
}

export function getIcons(): IconSet {
  return hasNerdFonts() ? NERD_ICONS : ASCII_ICONS;
}

export function getSeparatorChars(): SeparatorChars {
  return hasNerdFonts() ? NERD_SEPS : ASCII_SEPS;
}
