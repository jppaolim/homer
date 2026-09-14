const DEFAULT_MODAL_ENDPOINT =
  "https://jppaolim--homer-gpt2-int4-trial-homer-generate.modal.run";
const MAX_TITLE_CHARS = 200;
const UPSTREAM_TIMEOUT_MS = 55_000;

export default async function generate(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const title = typeof req.body?.title === "string" ? req.body.title.trim() : "";
  if (!title) {
    return res.status(422).json({ error: "Please enter a story title." });
  }
  if (title.length > MAX_TITLE_CHARS) {
    return res.status(422).json({
      error: `The title must be at most ${MAX_TITLE_CHARS} characters.`,
    });
  }

  const endpoint = process.env.MODAL_ENDPOINT_URL || DEFAULT_MODAL_ENDPOINT;
  const key = process.env.MODAL_PROXY_KEY;
  const secret = process.env.MODAL_PROXY_SECRET;
  if (!key || !secret) {
    console.error("Modal proxy credentials are not configured");
    return res.status(503).json({ error: "Story generation is not configured." });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Modal-Key": key,
        "Modal-Secret": secret,
      },
      body: JSON.stringify({ title }),
      signal: controller.signal,
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Modal generation failed", response.status, result.detail);
      const status = response.status >= 400 && response.status < 500 ? 422 : 502;
      return res.status(status).json({
        error:
          status === 422
            ? result.detail || "The story title is invalid."
            : "Story generation is temporarily unavailable.",
      });
    }

    if (typeof result.generated_text !== "string" || !result.generated_text) {
      console.error("Modal returned an invalid generation response");
      return res
        .status(502)
        .json({ error: "Story generation returned an invalid response." });
    }

    return res.status(200).json({
      generated_text: result.generated_text,
      generated_tokens: result.generated_tokens,
    });
  } catch (error) {
    const timedOut = error?.name === "AbortError";
    console.error(timedOut ? "Modal generation timed out" : "Modal request failed");
    return res.status(timedOut ? 504 : 502).json({
      error: timedOut
        ? "Story generation took too long. Please try again."
        : "Story generation is temporarily unavailable.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
