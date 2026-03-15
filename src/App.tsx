import React, { useState } from "react";
import AffirmationForm from "./components/AffirmationForm";
import AffirmationResult from "./components/AffirmationResult";
import InsightsSection from "./components/InsightsSection";
import ThemeToggle from "./components/ThemeToggle";
import { GeneratedAffirmation } from "./services/affirmationApi";
import { useTheme } from "./hooks/useTheme";

const App: React.FC = () => {
  const [currentAffirmation, setCurrentAffirmation] =
    useState<GeneratedAffirmation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sessionEntries, setSessionEntries] = useState<
    {
      timestamp: string;
      userText: string;
      affirmation: GeneratedAffirmation;
    }[]
  >([]);
  const { theme, toggleTheme } = useTheme();

  // Simple helper to reset main UI state between sessions/requests.
  const resetState = () => {
    setCurrentAffirmation(null);
    setIsLoading(false);
    setErrorMessage(null);
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <header className="app-header">
        <div className="header-top-row">
          <div className="branding">
            <span className="logo-mark" aria-hidden="true">
              ♡
            </span>
            <h1 className="app-title">Аффирмама</h1>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <p className="app-tagline">
          Нежные, мгновенные аффирмации для тревожных моментов. Без регистрации,
          без давления — только несколько тёплых фраз, когда они особенно
          нужны.
        </p>
      </header>

      <main className="app-main">
        <section className="card" aria-label="Опишите, что вас тревожит">
          <AffirmationForm
            setCurrentAffirmation={setCurrentAffirmation}
            setIsLoading={setIsLoading}
            setErrorMessage={setErrorMessage}
            setSessionEntries={setSessionEntries}
            onReset={resetState}
          />
        </section>

        <section className="card" aria-live="polite">
          <AffirmationResult
            isLoading={isLoading}
            errorMessage={errorMessage}
            result={currentAffirmation}
            onRetry={resetState}
          />
        </section>

        <section className="card experimental">
          <InsightsSection
            sessionEntries={sessionEntries}
            currentAffirmation={currentAffirmation}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          «Аффирмама» — это поддерживающие аффирмации и не медицинская помощь.
          Если вы в кризисе, пожалуйста, обратитесь за срочной помощью к
          врачам, службам поддержки или близким людям.
        </p>
      </footer>
    </div>
  );
};

export default App;

