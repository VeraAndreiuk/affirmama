import React, { useMemo, useState } from "react";
import { GeneratedAffirmation } from "../services/affirmationApi";

interface Entry {
  timestamp: string;
  userText: string;
  affirmation: GeneratedAffirmation;
}

interface Props {
  sessionEntries: Entry[];
  currentAffirmation: GeneratedAffirmation | null;
}

const InsightsSection: React.FC<Props> = ({
  sessionEntries,
  currentAffirmation
}) => {
  const [open, setOpen] = useState(false);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    sessionEntries.forEach(entry => {
      const topic = entry.affirmation.topic ?? "Другое";
      counts[topic] = (counts[topic] || 0) + 1;
    });
    return counts;
  }, [sessionEntries]);

  const inferredTopic = currentAffirmation?.topic ?? "Другое";

  return (
    <div className="experimental-root">
      <button
        type="button"
        className="secondary-button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {open ? "Скрыть заметки" : "Показать мягкие заметки"}
      </button>

      {open && (
        <div className="experimental-content">
          <p className="experimental-note">
            Этот блок необязателен и остаётся только в вашем браузере. Он
            помогает мягко замечать повторяющиеся темы без оценок и выводов.
          </p>
          <p className="experimental-stat">
            Записей за эту сессию: <strong>{sessionEntries.length}</strong>
          </p>
          {currentAffirmation && (
            <p className="experimental-stat">
              Текущая примерная тема:{" "}
              <span className="topic-pill">{inferredTopic}</span>
            </p>
          )}
          {Object.keys(topicCounts).length > 0 && (
            <div className="experimental-topics">
              <p>Темы, к которым вы обращались в этой сессии:</p>
              <ul>
                {Object.entries(topicCounts).map(([topic, count]) => (
                  <li key={topic}>
                    <span className="topic-pill">{topic}</span> × {count}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InsightsSection;

