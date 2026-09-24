import { Resend } from "resend";

const MAX_BODY_BYTES = 16_384;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_NOTE = 4000;
const MAX_PHONE = 40;
const MAX_SERVICES = 8;
const PHONE_RE = /^[+0-9()\s./-]{6,40}$/;

const ALLOWED_SERVICES = new Set([
  "ai",
  "elearning",
  "energy",
  "apps",
  "marketing",
  "ops",
  "web",
  "other",
]);

const SERVICE_LABELS = {
  ai: "Automatizace procesů (AI)",
  elearning: "E-learning na míru",
  energy: "Energetika & technické systémy",
  apps: "Interní nástroje & aplikace",
  marketing: "Online marketing",
  ops: "Provoz & údržba",
  web: "Weby na míru",
  other: "Jiné",
};

const PACK_LABELS = {
  start: "START",
  growth: "RŮST",
  full: "KOMPLET",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Payload too large"), { code: "PAYLOAD_TOO_LARGE" }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function parseBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    const error = new Error("Payload too large");
    error.code = "PAYLOAD_TOO_LARGE";
    throw error;
  }

  const raw =
    typeof req.body === "string"
      ? req.body
      : Buffer.isBuffer(req.body)
        ? req.body.toString("utf8")
        : await readRawBody(req);

  if (!raw) return {};

  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    const error = new Error("Payload too large");
    error.code = "PAYLOAD_TOO_LARGE";
    throw error;
  }

  return JSON.parse(raw);
}

function validatePayload(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Neplatný požadavek." };
  }

  const honeypot = typeof input.website === "string" ? input.website.trim() : "";
  if (honeypot) {
    return { ok: true, spam: true };
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const note = typeof input.note === "string" ? input.note.trim() : "";
  const packRaw = typeof input.pack === "string" ? input.pack.trim().toLowerCase() : "";

  let services = Array.isArray(input.services) ? input.services : [];
  services = services
    .filter((value) => typeof value === "string")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!name) return { ok: false, error: "Jméno je povinné." };
  if (name.length > MAX_NAME) return { ok: false, error: "Jméno je příliš dlouhé." };

  if (!email) return { ok: false, error: "E-mail je povinný." };
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { ok: false, error: "E-mail nemá platný formát." };
  }

  if (phone) {
    if (phone.length > MAX_PHONE || !PHONE_RE.test(phone)) {
      return { ok: false, error: "Telefon nemá platný formát." };
    }
  }

  if (note.length > MAX_NOTE) return { ok: false, error: "Poznámka je příliš dlouhá." };

  if (!services.length) return { ok: false, error: "Vyberte alespoň jednu službu." };
  if (services.length > MAX_SERVICES) return { ok: false, error: "Příliš mnoho služeb." };
  if (services.some((value) => !ALLOWED_SERVICES.has(value))) {
    return { ok: false, error: "Neplatná služba." };
  }

  const pack = packRaw && PACK_LABELS[packRaw] ? packRaw : "";
  if (packRaw && !pack) return { ok: false, error: "Neplatný balíček." };
  if (pack && !services.includes("marketing")) {
    return { ok: false, error: "Balíček lze zvolit jen u marketingu." };
  }

  return {
    ok: true,
    spam: false,
    data: { name, email, phone, note, services, pack },
  };
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("cs-CZ", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Prague",
  }).format(date);
}

function buildEmails(data, sentAt) {
  const serviceLabels = data.services.map((value) => SERVICE_LABELS[value] || value);
  const packLabel = data.pack ? PACK_LABELS[data.pack] : "";
  const phoneText = data.phone || "—";
  const noteText = data.note || "—";
  const when = formatDateTime(sentAt);

  const text = [
    "Nová poptávka z WebOvice",
    "",
    `Jméno: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${phoneText}`,
    `Služby: ${serviceLabels.join(", ")}`,
    packLabel ? `Marketingový balíček: ${packLabel}` : null,
    `Poznámka: ${noteText}`,
    `Odesláno: ${when}`,
  ]
    .filter(Boolean)
    .join("\n");

  const rows = [
    ["Jméno", data.name],
    ["E-mail", data.email],
    ["Telefon", phoneText],
    ["Služby", serviceLabels.join(", ")],
  ];

  if (packLabel) {
    rows.push(["Marketingový balíček", packLabel]);
  }

  rows.push(["Poznámka", noteText], ["Odesláno", when]);

  const rowHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #1e1e2a;color:#a8a8b8;font-size:13px;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #1e1e2a;color:#f5f5f7;font-size:14px;white-space:pre-wrap;word-break:break-word;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="cs">
  <body style="margin:0;padding:0;background:#06060c;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#06060c;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#101018;border:1px solid #1e1e2a;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:22px 24px;background:linear-gradient(90deg,#c4b5fd 0%,#9b6ff0 38%,#d97fce 72%,#f4cf9e 100%);">
                <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#06060c;font-weight:700;">WebOvice</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#06060c;">Nová poptávka</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 10px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rowHtml}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 22px;color:#6e6e7e;font-size:12px;">
                Odpovězte na tento e-mail — Reply-To je nastavené na adresu návštěvníka.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, error: "Method not allowed" });
  }

  let body;
  try {
    body = await parseBody(req);
  } catch (error) {
    if (error?.code === "PAYLOAD_TOO_LARGE") {
      return json(res, 413, { ok: false, error: "Požadavek je příliš velký." });
    }
    return json(res, 400, { ok: false, error: "Neplatný požadavek." });
  }

  const validated = validatePayload(body);
  if (!validated.ok) {
    return json(res, 400, { ok: false, error: "Neplatný požadavek." });
  }

  // Honeypot: pretend success so bots get no signal.
  if (validated.spam) {
    return json(res, 200, { ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    console.error("Contact form misconfigured: missing env");
    return json(res, 500, { ok: false, error: "Server configuration error" });
  }

  const sentAt = new Date();
  const { text, html } = buildEmails(validated.data, sentAt);
  const subject = `Nová poptávka z WebOvice – ${validated.data.name}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "WebOvice <poptavky@webovice.eu>",
      to: [contactEmail],
      replyTo: validated.data.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Contact form send failed");
      return json(res, 502, { ok: false, error: "Send failed" });
    }

    return json(res, 200, { ok: true });
  } catch {
    console.error("Contact form unexpected failure");
    return json(res, 502, { ok: false, error: "Send failed" });
  }
}
