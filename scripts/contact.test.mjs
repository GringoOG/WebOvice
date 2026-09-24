/**
 * Contact API validation tests — no Resend network calls.
 * Run: node api/contact.test.mjs
 */
import { validatePayload } from "../api/contact.js";

let passed = 0;
let failed = 0;

function assert(cond, label) {
  if (cond) {
    passed += 1;
    console.log(`  OK  ${label}`);
  } else {
    failed += 1;
    console.error(` FAIL ${label}`);
  }
}

const valid = {
  name: "Jan Novák",
  email: "jan@example.com",
  phone: "+420 777 123 456",
  services: ["web"],
  pack: "",
  note: "Ahoj",
  website: "",
};

console.log("Contact validation tests\n");

{
  const r = validatePayload(valid);
  assert(r.ok && !r.spam && r.data.email === "jan@example.com", "1. valid request");
}

{
  const r = validatePayload({ ...valid, name: "" });
  assert(!r.ok, "2. missing name");
}

{
  const r = validatePayload({ ...valid, email: "not-an-email" });
  assert(!r.ok, "3. invalid email");
}

{
  const r = validatePayload({ ...valid, name: "A".repeat(200) });
  assert(r.ok && r.data.name.length === 120, "4. overlong name truncated by sanitize");
}

{
  const r = validatePayload(null);
  assert(!r.ok, "5a. null payload");
  const r2 = validatePayload("x");
  assert(!r2.ok, "5b. non-object payload");
}

{
  const r = validatePayload({ ...valid, website: "http://spam" });
  assert(r.ok && r.spam === true, "6. honeypot filled → spam");
}

{
  const r = validatePayload({
    ...valid,
    note: '<script>alert(1)</script>\nOK',
    name: "Eve\r\nBcc: evil@x.com",
  });
  assert(r.ok && !r.data.name.includes("\n") && !r.data.name.includes("\r"), "8/9. XSS+CRLF stripped from name");
  assert(r.data.note.includes("<script>") === true, "8b. note keeps text (escaped later in HTML)");
  assert(!/[\u0000-\u0008]/.test(r.data.note), "9b. note has no dangerous controls");
}

{
  const r = validatePayload({ ...valid, services: ["web", "hacking"] });
  assert(!r.ok, "10. unexpected service rejected");
}

{
  const r = validatePayload({ ...valid, pack: "start", services: ["web"] });
  assert(!r.ok, "pack without marketing rejected");
}

{
  const r = validatePayload({ ...valid, phone: "abc" });
  assert(!r.ok, "invalid phone rejected");
}

{
  const r = validatePayload({ ...valid, phone: "" });
  assert(r.ok && r.data.phone === "", "empty phone allowed");
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
