import { GeneratedAffirmation } from "../services/affirmationApi";

export async function copyAffirmationsToClipboard(
  affirmation: GeneratedAffirmation
): Promise<void> {
  const lines = [
    affirmation.intro,
    "",
    ...affirmation.affirmations.map(line => `• ${line}`)
  ];
  const text = lines.join("\n");

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Ignore clipboard errors silently – copying is a nice-to-have.
  }
}

