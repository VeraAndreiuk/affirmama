import React, { FormEvent, useState } from "react";
import {
  generateAffirmation,
  GeneratedAffirmation
} from "../services/affirmationApi";
import { trackEvent } from "../utils/analytics";

interface Props {
  setCurrentAffirmation: (value: GeneratedAffirmation | null) => void;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (value: string | null) => void;
  setSessionEntries: React.Dispatch<
    React.SetStateAction<
      { timestamp: string; userText: string; affirmation: GeneratedAffirmation }[]
    >
  >;
  onReset: () => void;
}

const AffirmationForm: React.FC<Props> = ({
  setCurrentAffirmation,
  setIsLoading,
  setErrorMessage,
  setSessionEntries,
  onReset
}) => {
  const [userText, setUserText] = useState("");
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!userText.trim()) return;

    // Clear previous state before starting a new request so UI does not
    // briefly show outdated affirmations.
    onReset();

    setIsLoading(true);
    setErrorMessage(null);
    try {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log("Новый запрос:", userText.trim());
      }
      const result = await generateAffirmation(userText.trim());
      setCurrentAffirmation(result);
      setSessionEntries(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString(),
          userText: userText.trim(),
          affirmation: result
        }
      ]);
      trackEvent("affirmation_generated", { textLength: userText.length });
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Что-то пошло не так при создании аффирмаций. Вы ничего не сделали неправильно — попробуйте ещё раз чуть позже."
      );
      trackEvent("affirmation_failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="affirmation-form" onSubmit={handleSubmit}>
      <label htmlFor="anxiety-input" className="field-label">
        Что вас сейчас тревожит?
      </label>
      <p className="field-helper">
        Напишите несколько слов или предложений о том, что вас беспокоит. Можно
        любым языком, как вам удобнее.
      </p>
      <textarea
        id="anxiety-input"
        className="text-input"
        rows={5}
        placeholder="Пример: Мне тревожно из-за завтрашнего разговора с начальником, я боюсь, что всё пойдёт не так."
        value={userText}
        onChange={e => {
          const next = e.target.value;
          setUserText(next);
          // Clear previous affirmations as soon as user starts typing
          // a different concern so the next result is always fresh.
          if (next.trim().length === 0) {
            setCurrentAffirmation(null);
          }
        }}
        onBlur={() => setTouched(true)}
      />
      {touched && !userText.trim() && (
        <p className="field-error">
          Пожалуйста, опишите хотя бы несколькими словами, что вас тревожит.
        </p>
      )}
      <div className="actions-row">
        <button
          type="submit"
          className="primary-button"
          disabled={!userText.trim()}
        >
          Получить аффирмации
        </button>
        <button
          type="button"
          className="ghost-button reset-button"
          onClick={() => {
            onReset();
            setUserText("");
            setTouched(false);
          }}
        >
          Очистить
        </button>
      </div>
    </form>
  );
};

export default AffirmationForm;

