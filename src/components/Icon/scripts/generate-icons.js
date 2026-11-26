import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SVG_DIR = path.join(__dirname, "../svg");
const OUTPUT_DIR = path.join(__dirname, "..");

const TYPES_FILE = path.join(OUTPUT_DIR, "types.ts");
const MAP_FILE = path.join(OUTPUT_DIR, "icon-map.tsx");
const INDEX_FILE = path.join(OUTPUT_DIR, "index.ts");

const CHECK_MODE = process.argv.includes("--check");
const KEBAB_CASE_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function getSvgFiles() {
  if (!fs.existsSync(SVG_DIR)) {
    throw new Error(`SVG dizini bulunamadı: ${SVG_DIR}`);
  }

  return fs
    .readdirSync(SVG_DIR)
    .filter((file) => file.endsWith(".svg"))
    .map((file) => file.replace(/\.svg$/, ""))
    .sort();
}

function validateIcons(icons) {
  const errors = [];
  const seenLowercase = new Map();

  for (const icon of icons) {
    if (!KEBAB_CASE_REGEX.test(icon)) {
      errors.push(
        `"${icon}.svg" -> Geçersiz dosya adı. Icon isimleri kebab-case olmalıdır (örn. “arrow-right”).`,
      );
    }

    const lower = icon.toLowerCase();
    if (seenLowercase.has(lower) && seenLowercase.get(lower) !== icon) {
      errors.push(`"${icon}.svg" -> "${seenLowercase.get(lower)}.svg" ile çakışıyor.`);
    }
    seenLowercase.set(lower, icon);

    const svgPath = path.join(SVG_DIR, `${icon}.svg`);
    const raw = fs.readFileSync(svgPath, "utf-8");

    if (!raw.trim()) {
      errors.push(`"${icon}.svg" -> Dosya boş.`);
      continue;
    }

    const svgMatches = raw.match(/<svg[^>]*>/g) || [];
    if (svgMatches.length !== 1) {
      errors.push(`"${icon}.svg" -> <svg> element içermelidir (Bulunanlar: ${svgMatches.length}).`);
      continue;
    }

    if (!/viewBox="0 0 24 24"/.test(raw)) {
      errors.push(
        `"${icon}.svg" -> Tasarım sistemine uyması için viewBox değeri “0 0 24 24” olmalıdır.`,
      );
    }

    const innerMatch = raw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    if (!innerMatch || !innerMatch[1].trim()) {
      errors.push(`"${icon}.svg" -> <svg> element içeriği yok.`);
    }

    if (/<script/i.test(raw)) {
      errors.push(`"${icon}.svg" -> içinde izin verilmeyen bir <script> etiketi bulunmaktadır.`);
    }
  }

  if (errors.length) {
    const message = [
      `❌ Icon doğrulaması başarısız (${errors.length} Sorun${errors.length > 1 ? "lar" : ""}):`,
      ...errors.map((e) => `  - ${e}`),
    ].join("\n");
    throw new Error(message);
  }
}

function namespaceIds(svg, iconName) {
  const idMap = new Map();

  let out = svg.replace(/\bid="([^"]+)"/g, (_, id) => {
    const namespaced = `icon-${iconName}-${id}`;
    idMap.set(id, namespaced);
    return `id="${namespaced}"`;
  });

  out = out.replace(/url\(#([^)]+)\)/g, (match, id) =>
    idMap.has(id) ? `url(#${idMap.get(id)})` : match,
  );

  out = out.replace(/(xlink:href|href)="#([^"]+)"/g, (match, attr, id) =>
    idMap.has(id) ? `${attr}="#${idMap.get(id)}"` : match,
  );

  return out;
}

function normalizeColors(svg) {
  return svg.replace(
    /(fill|stroke)="(?!none"|currentColor")(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)"/g,
    '$1="currentColor"',
  );
}

function cleanSvg(rawSvg, iconName) {
  const match = rawSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);

  if (!match) {
    throw new Error(`"${iconName}.svg" -> Inner SVG içeriği çıkarılamadı.`);
  }

  let content = match[1].trim();

  content = namespaceIds(content, iconName);
  content = normalizeColors(content);

  content = content
    .replace(/stroke-width/g, "strokeWidth")
    .replace(/stroke-linecap/g, "strokeLinecap")
    .replace(/stroke-linejoin/g, "strokeLinejoin")
    .replace(/fill-rule/g, "fillRule")
    .replace(/clip-rule/g, "clipRule")
    .replace(/clip-path/g, "clipPath")
    .replace(/xlink:href/g, "xlinkHref")
    .replace(/class=/g, "className=");

  return content;
}

function generateTypesFile(icons) {
  const union = icons.map((icon) => `  | "${icon}"`).join("\n");

  return `// OTOMATİK OLUŞTURULAN DOSYA. Manuel olarak düzenlemeyin.
// /svg dizinine dosya ekledikten veya sildikten sonra \`pnpm icons:generate\` komutunu çalıştırın.

export type IconName =
${union};

export const ICON_NAMES: IconName[] = [
${icons.map((icon) => `  "${icon}",`).join("\n")}
];
`;
}

function generateMapFile(icons) {
  const iconEntries = icons
    .map((icon) => {
      const svgPath = path.join(SVG_DIR, `${icon}.svg`);
      const svgContent = fs.readFileSync(svgPath, "utf-8");
      const cleaned = cleanSvg(svgContent, icon);
      return `  "${icon}": (\n    <>${cleaned}</>\n  )`;
    })
    .join(",\n\n");

  return `// OTOMATİK OLUŞTURULAN DOSYA. Manuel olarak düzenlemeyin.
// /svg dizinine dosya ekledikten veya sildikten sonra \`pnpm icons:generate\` komutunu çalıştırın.

export const ICON_MAP = {
${iconEntries},
} as const;
`;
}

function generateIndexFile() {
  return `// OTOMATİK OLUŞTURULAN DOSYA. Manuel olarak düzenlemeyin.
// /svg dizinine dosya ekledikten veya sildikten sonra \`pnpm icons:generate\` komutunu çalıştırın.

export { Icon } from "./Icon";
export type { IconProps } from "./Icon";

export type { IconName } from "./types";
export { ICON_NAMES } from "./types";

export { ICON_SIZE_TOKENS, ICON_VARIANT_TOKENS } from "./tokens";
export type { IconSize, IconVariant } from "./tokens";
`;
}

function writeIfChanged(filePath, content) {
  const exists = fs.existsSync(filePath);
  const previous = exists ? fs.readFileSync(filePath, "utf-8") : null;
  const changed = previous !== content;

  if (CHECK_MODE) {
    return changed;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }

  return changed;
}

function generate() {
  console.log(
    CHECK_MODE ? "🔎 Icon dosyaları kontrol ediliyor...\n" : "🚀 Iconlar oluşturuluyor...\n",
  );

  const icons = getSvgFiles();

  if (!icons.length) {
    console.error("❌ /svg dizininde .svg dosyası bulunamadı.");
    process.exit(1);
  }

  validateIcons(icons);

  const results = {
    "types.ts": writeIfChanged(TYPES_FILE, generateTypesFile(icons)),
    "icon-map.tsx": writeIfChanged(MAP_FILE, generateMapFile(icons)),
    "index.ts": writeIfChanged(INDEX_FILE, generateIndexFile()),
  };

  const anyChanged = Object.values(results).some(Boolean);

  if (CHECK_MODE) {
    if (anyChanged) {
      const stale = Object.entries(results)
        .filter(([, changed]) => changed)
        .map(([file]) => file)
        .join(", ");
      console.error(
        `❌ Güncel değil: ${stale}. \`npm run icons:generate\` komutunu çalıştırın ve commit edin.`,
      );
      process.exit(1);
    }
    console.log(`✅ ${icons.length} iconlar senkronize durumda.`);
    return;
  }

  const summary = Object.entries(results)
    .map(([file, changed]) => `${file} ${changed ? "güncellendi" : "değişmemiş"}`)
    .join(", ");

  console.log(`✅ ${icons.length} icon oluşturuldu (${summary})`);
}

try {
  generate();
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
