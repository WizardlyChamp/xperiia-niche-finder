import { createClient } from "@supabase/supabase-js";

// Password that protects the leads dashboard.
// This is read from a Supabase Edge Function secret named ADMIN_KEY.
// Do NOT hardcode the password here. This file is committed to a public repo.
// Set it once with:  supabase secrets set ADMIN_KEY=your-password
const ADMIN_KEY = Deno.env.get("ADMIN_KEY") ?? "";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-key",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  let key = req.headers.get("x-admin-key") ?? "";
  let body: any = {};
  if (req.method === "POST") {
    try { body = await req.json(); } catch (_) { /* ignore */ }
    if (!key && body && typeof body.key === "string") key = body.key;
  } else {
    key = key || new URL(req.url).searchParams.get("key") || "";
  }

  // If the secret is missing, fail closed (locked) rather than open.
  if (!ADMIN_KEY || key !== ADMIN_KEY) return json({ error: "unauthorized" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const action = (body && body.action) || "list";

  if (action === "delete") {
    if (!body.id) return json({ error: "missing id" }, 400);
    const { error } = await supabase
      .from("xperiia_niche_leads")
      .delete()
      .eq("id", body.id);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true, deleted: body.id });
  }

  const { data, error } = await supabase
    .from("xperiia_niche_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return json({ error: error.message }, 500);
  return json({ leads: data ?? [] });
});
