# Аффирмама – MVP affirmations web app

Аффирмама is a single-page web app that gives people with anxiety instant, gentle affirmations tailored to what they describe, with no signup or account.

## Project structure

- `index.html` – Vite entry HTML.
- `package.json` – dependencies and scripts.
- `vite.config.ts` – Vite + React configuration.
- `tsconfig.json` – TypeScript configuration.
- `src/main.tsx` – bootstraps React app.
- `src/App.tsx` – main page layout and flow.
- `src/components/`
  - `AffirmationForm.tsx` – textarea, button, and form flow.
  - `AffirmationResult.tsx` – loading, error, and affirmation display.
  - `InsightsSection.tsx` – optional, gentle session insights.
  - `ThemeToggle.tsx` – light/dark mode switch.
- `src/services/affirmationApi.ts` – LLM integration stub and fallback.
- `src/hooks/useTheme.ts` – theme state and persistence.
- `src/utils/analytics.ts` – minimal analytics hook.
- `src/utils/copyToClipboard.ts` – copies response to clipboard.
- `src/styles/global.css` – calm, responsive styling.

## LLM integration

`src/services/affirmationApi.ts` exposes:

```ts
export interface GeneratedAffirmation {
  intro: string;
  affirmations: string[];
  topic?: "Работа" | "Отношения" | "Здоровье" | "Социальная тревога" | "Другое";
}

export async function generateAffirmation(
  userText: string
): Promise<GeneratedAffirmation>;
```

By default, `generateAffirmation` returns a gentle, local fallback response so the app works without any backend. To plug in your own LLM endpoint:

1. Create a `.env` file in the project root:

```bash
VITE_AFFIRMAMA_API_URL="https://your-llm-endpoint.example.com/affirm"
VITE_AFFIRMAMA_API_KEY="your_api_key_here"
```

2. In `affirmationApi.ts`, uncomment and adapt the `fetch` block to match your backend’s request/response shape, keeping the `GeneratedAffirmation` structure (intro + affirmations[] + optional topic).

## Running the project

1. Install Node.js (18+ recommended) and npm if you haven’t already.
2. In a terminal, from the project folder:

```bash
cd affirmama
npm install
npm run dev
```

3. Open the printed local URL (usually `http://localhost:5173`) in your browser.

## UX microcopy (examples in code)

- Main heading: **Аффирмама**
- Tagline: “Нежные, мгновенные аффирмации для тревожных моментов. Без регистрации, без давления — только несколько тёплых фраз, когда они особенно нужны.”
- Short description (footer disclaimer): “«Аффирмама» — это поддерживающие аффирмации и не медицинская помощь. Если вы в кризисе, пожалуйста, обратитесь за срочной помощью к врачам, службам поддержки или близким людям.”
- Textarea label: **Что вас сейчас тревожит?**
- Textarea helper: “Напишите несколько слов или предложений о том, что вас беспокоит. Можно любым языком, как вам удобнее.”
- Textarea placeholder: “Пример: Мне тревожно из-за завтрашнего разговора с начальником, я боюсь, что всё пойдёт не так.”
- Primary button: **Получить аффирмации**
- Loading: “Я подбираю для вас мягкий, поддерживающий ответ…”
- Error (form-level): “Что-то пошло не так при создании аффирмаций. Вы ничего не сделали неправильно — попробуйте ещё раз чуть позже.”

The fallback response in `affirmationApi.ts` demonstrates the intended structure: a short, validating intro plus 3–7 specific, self-compassionate affirmations that avoid toxic positivity and medical claims.

