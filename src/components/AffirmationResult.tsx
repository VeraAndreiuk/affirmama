import React from "react";
import { GeneratedAffirmation } from "../services/affirmationApi";
import { copyAffirmationsToClipboard } from "../utils/copyToClipboard";

interface Props {
  result: GeneratedAffirmation | null;
  isLoading: boolean;
  errorMessage: string | null;
  onRetry: () => void;
}

const AffirmationResult: React.FC<Props> = ({
  result,
  isLoading,
  errorMessage,
  onRetry
}) => {
  // All helper functions go before the JSX return.
  const handleCopyClick = () => {
    if (!result) return;
    void copyAffirmationsToClipboard(result);
  };

  if (isLoading) {
    return (
      <div className="result-container" aria-live="polite">
        <div className="result-footer-row">
          <div className="spinner" aria-hidden="true" />
          <p className="result-helper">
            Я подбираю для вас мягкий, поддерживающий ответ…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="result-container" aria-live="polite">
      {errorMessage && (
        <>
          <p className="result-error">{errorMessage}</p>
          <div className="result-footer-row">
            <button
              type="button"
              className="secondary-button"
              onClick={onRetry}
            >
              Попробовать ещё раз
            </button>
          </div>
        </>
      )}

      {!errorMessage && result && (
        <>
          <p className="result-intro">{result.intro}</p>
          <ul className="affirmations-list">
            {result.affirmations.map((line, index) => (
              <li key={index} className="affirmation-line">
                {line}
              </li>
            ))}
          </ul>
          <p className="result-helper">
            Если какая-то фраза особенно откликнулась, вы можете сохранить её
            или отправить себе в сообщение.
          </p>
          <div className="result-footer-row">
            <button
              type="button"
              className="secondary-button"
              onClick={handleCopyClick}
            >
              Скопировать аффирмации
            </button>
          </div>
        </>
      )}

      {!errorMessage && !result && (
        <p className="result-helper">
          Когда будете готовы, опишите, что происходит внутри, — и «Аффирмама»
          подберёт несколько тёплых, поддерживающих фраз именно для этого
          момента.
        </p>
      )}
    </div>
  );
};

export default AffirmationResult;