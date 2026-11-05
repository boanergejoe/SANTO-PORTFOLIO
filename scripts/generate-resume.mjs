import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const resume = JSON.parse(
  readFileSync(path.join(root, "src", "data", "resume.json"), "utf8"),
);
const profile = JSON.parse(
  readFileSync(path.join(root, "src", "data", "site.json"), "utf8"),
);

const browserCandidates = [
  process.env.CHROME_PATH,
  process.env.EDGE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const browserPath = browserCandidates.find(existsSync);

if (!browserPath) {
  throw new Error("No Chromium browser found. Set EDGE_PATH or CHROME_PATH.");
}

const required = ["name", "role", "location", "email", "phone", "github", "summary"];
for (const field of required) {
  if (typeof resume[field] !== "string" || !resume[field].trim()) {
    throw new Error(`Missing resume field: ${field}`);
  }
}
for (const field of ["experience", "education", "projects", "skillGroups"]) {
  if (!Array.isArray(resume[field]) || resume[field].length === 0) {
    throw new Error(`The resume ${field} list is empty.`);
  }
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const relativeGithub = resume.github.replace(/^https?:\/\//, "").replace(/\/$/, "");
const contactLines = [resume.location, resume.email, resume.phone, relativeGithub]
  .map((line) => `<div>${escapeHtml(line)}</div>`)
  .join("");

const competencies = resume.competencies
  .map((item) => `<span class="chip chip--accent">${escapeHtml(item)}</span>`)
  .join("");

const experience = resume.experience
  .map(
    (job) => `<article class="item">
      <div class="item-head">
        <h3>${escapeHtml(job.title)} <span class="company">— ${escapeHtml(job.company)}</span></h3>
        <span class="period">${escapeHtml(job.period)}</span>
      </div>
      <ul>${job.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
    </article>`,
  )
  .join("");

const projects = resume.projects
  .map(
    (project) => `<article class="card">
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
    </article>`,
  )
  .join("");

const education = resume.education
  .map(
    (entry) => `<article class="education">
      <div class="item-head">
        <h3>${escapeHtml(entry.degree)}</h3>
        <span class="period">${escapeHtml(entry.period)}</span>
      </div>
      <div class="education-meta">
        <span>${escapeHtml(entry.school)}</span>
        <span class="badge">${escapeHtml(entry.honor)}</span>
      </div>
      <ul>${entry.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}</ul>
    </article>`,
  )
  .join("");

const skillGroups = resume.skillGroups
  .map(
    (group) => `<div class="skill-group">
      <span class="skill-label">${escapeHtml(group.label)}</span>
      <div class="chips">${group.items
        .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
        .join("")}</div>
    </div>`,
  )
  .join("");

const traits = resume.traits
  .map((trait) => `<span class="chip chip--trait">${escapeHtml(trait)}</span>`)
  .join("");

const services = resume.services
  .map(
    (service) => `<article class="service">
      <h3>${escapeHtml(service.title)}</h3>
      <p>${escapeHtml(service.description)}</p>
    </article>`,
  )
  .join("");

const footer = (page) => `<footer class="footer">
  <span>${escapeHtml(resume.name)} — ${escapeHtml(resume.role)}</span>
  <span>${escapeHtml(resume.location)}</span>
  <span>${page} / 2</span>
</footer>`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(resume.name)} — ${escapeHtml(resume.role)} — Resume</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      color: #1f2937;
      background: #fff;
      font: 9.5pt/1.45 "Segoe UI", Arial, Helvetica, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      position: relative;
      width: 210mm;
      height: 297mm;
      padding: 13mm 16mm 14mm;
      page-break-after: always;
      overflow: hidden;
    }
    .page:last-child { page-break-after: auto; }
    .accent {
      height: 2mm;
      margin-bottom: 7mm;
      border-radius: 2mm;
      background: linear-gradient(90deg, #7c3aed, #a855f7 45%, #38bdf8);
    }
    header.top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12mm;
      padding-bottom: 6mm;
      border-bottom: 1px solid #e9e5f5;
    }
    h1 {
      margin: 0;
      color: #111827;
      font-size: 29pt;
      line-height: 1.02;
      letter-spacing: -1pt;
    }
    .role {
      margin-top: 2.5mm;
      color: #6d35d1;
      font-size: 10.5pt;
      font-weight: 700;
      letter-spacing: .8pt;
      text-transform: uppercase;
    }
    .contact {
      padding-top: 1mm;
      color: #4b5563;
      font-size: 9pt;
      line-height: 1.62;
      text-align: right;
      white-space: nowrap;
    }
    section { margin-top: 6.5mm; }
    h2 {
      display: flex;
      align-items: center;
      gap: 2.6mm;
      margin: 0 0 3.2mm;
      color: #1d2738;
      font-size: 10.5pt;
      letter-spacing: 1.2pt;
      text-transform: uppercase;
    }
    h2::before {
      width: 1.2mm;
      height: 4.6mm;
      border-radius: 1mm;
      background: #8b5cf6;
      content: "";
    }
    p { margin: 0; color: #445066; }
    .summary { font-size: 9.6pt; line-height: 1.55; }
    .chips { display: flex; flex-wrap: wrap; gap: 1.6mm; }
    .chip {
      padding: 1.3mm 2.7mm;
      border: 1px solid #e5e7eb;
      border-radius: 20mm;
      background: #f8fafc;
      color: #344054;
      font-size: 8.2pt;
      white-space: nowrap;
    }
    .chip--accent {
      border-color: #ddd6fe;
      background: #f5f3ff;
      color: #5b21b6;
      font-weight: 600;
    }
    .chip--trait {
      border-color: #dbeafe;
      background: #eff6ff;
      color: #1d4ed8;
      font-weight: 600;
    }
    .item { margin-bottom: 4.4mm; }
    .item:last-child { margin-bottom: 0; }
    .item-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 6mm;
    }
    h3 {
      margin: 0;
      color: #111827;
      font-size: 10pt;
      line-height: 1.35;
    }
    .company { color: #6b7280; font-weight: 600; }
    .period {
      flex: none;
      color: #6b7280;
      font-size: 8.6pt;
      font-weight: 600;
      letter-spacing: .2pt;
    }
    ul { margin: 1.6mm 0 0 4.2mm; padding: 0; }
    li {
      margin-bottom: .7mm;
      padding-left: .8mm;
      color: #445066;
      font-size: 9pt;
      line-height: 1.42;
    }
    li::marker { color: #8b5cf6; }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
    }
    .card, .service {
      padding: 3.4mm 4mm;
      border: 1px solid #ece9f6;
      border-radius: 2.5mm;
      background: #fbfaff;
    }
    .card h3, .service h3 { font-size: 9.6pt; }
    .card p, .service p { margin-top: 1.2mm; font-size: 8.7pt; line-height: 1.45; }
    .two-col {
      display: grid;
      grid-template-columns: 1.08fr .92fr;
      gap: 7mm;
    }
    .education { margin-bottom: 4mm; }
    .education:last-child { margin-bottom: 0; }
    .education-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2mm;
      margin-top: 1mm;
      color: #4b5563;
      font-size: 8.8pt;
    }
    .badge {
      padding: .5mm 2mm;
      border: 1px solid #ddd6fe;
      border-radius: 10mm;
      background: #f5f3ff;
      color: #6d28d9;
      font-size: 7.4pt;
      font-weight: 700;
      letter-spacing: .2pt;
      text-transform: uppercase;
    }
    .skill-group { margin-bottom: 3.4mm; }
    .skill-group:last-child { margin-bottom: 0; }
    .skill-label {
      display: block;
      margin-bottom: 1.4mm;
      color: #6b7280;
      font-size: 7.6pt;
      font-weight: 700;
      letter-spacing: .9pt;
      text-transform: uppercase;
    }
    .footer {
      position: absolute;
      right: 16mm;
      bottom: 7mm;
      left: 16mm;
      display: flex;
      justify-content: space-between;
      gap: 6mm;
      padding-top: 2.4mm;
      border-top: 1px solid #eeeaf5;
      color: #7b8493;
      font-size: 7.8pt;
    }
  </style>
</head>
<body>
  <main class="page">
    <div class="accent"></div>
    <header class="top">
      <div>
        <h1>${escapeHtml(resume.name)}</h1>
        <div class="role">${escapeHtml(resume.role)} · ${escapeHtml(resume.specialty)}</div>
      </div>
      <div class="contact">${contactLines}</div>
    </header>

    <section>
      <h2>Professional Profile</h2>
      <p class="summary">${escapeHtml(resume.summary)}</p>
    </section>

    <section>
      <h2>Core Competencies</h2>
      <div class="chips">${competencies}</div>
    </section>

    <section>
      <h2>Professional Experience</h2>
      ${experience}
    </section>
    ${footer(1)}
  </main>

  <main class="page">
    <div class="accent"></div>

    <section>
      <h2>Selected Projects</h2>
      <div class="grid2">${projects}</div>
    </section>

    <section class="two-col">
      <div>
        <h2>Education</h2>
        ${education}
      </div>
      <div>
        <h2>Technical Skills</h2>
        ${skillGroups}
        <h2 style="margin-top:4.5mm">Professional Strengths</h2>
        <div class="chips">${traits}</div>
      </div>
    </section>

    <section>
      <h2>What I Do</h2>
      <div class="grid2">${services}</div>
    </section>
    ${footer(2)}
  </main>
</body>
</html>`;

const tempDir = mkdtempSync(path.join(os.tmpdir(), "portfolio-resume-"));
const htmlPath = path.join(tempDir, "resume.html");
const pdfPath = path.join(tempDir, "resume.pdf");
const outputPath = path.join(root, "public", "resume.pdf");

try {
  writeFileSync(htmlPath, html, "utf8");
  if (process.env.RESUME_PREVIEW) {
    writeFileSync(process.env.RESUME_PREVIEW, html, "utf8");
  }
  const result = spawnSync(
    browserPath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-pdf-header-footer",
      `--user-data-dir=${path.join(tempDir, "browser-profile")}`,
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { encoding: "utf8", timeout: 60_000, windowsHide: true },
  );

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(result.stderr || `Browser exited with status ${result.status}.`);
  }

  // Chromium on Windows hands the print job to a detached browser process and
  // exits immediately, so the PDF appears a few seconds after spawnSync returns.
  const deadline = Date.now() + 30_000;
  while (!existsSync(pdfPath) && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  if (!existsSync(pdfPath)) throw new Error("The browser did not create the resume PDF.");

  const pdf = readFileSync(pdfPath);
  if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-")) || pdf.length < 5_000) {
    throw new Error("The generated resume PDF is missing or invalid.");
  }

  writeFileSync(outputPath, pdf);
  const pageCount = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(
    `Generated ${path.relative(root, outputPath)} (${pdf.length} bytes, ${pageCount} pages).`,
  );
} finally {
  try {
    rmSync(tempDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 250 });
  } catch {
    // Chromium can keep temporary profile files locked for a moment after exit.
  }
}
