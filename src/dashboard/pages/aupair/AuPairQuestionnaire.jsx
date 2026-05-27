import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import {
  AUPAIR_QUESTION_FIELD_OVERRIDES,
  AUPAIR_QUESTIONNAIRE_SECTIONS,
  AUPAIR_QUESTIONNAIRE_META,
} from '../../../data/aupairQuestionnaireSchema';
import {
  fetchMyAuPairQuestionnaire,
  saveAuPairQuestionnaireDraft,
  submitAuPairQuestionnaire,
} from '../../../services/aupairQuestionnaire';
import { isSupabaseConfigured } from '../../../lib/supabase';
import '../family/FamilyQuestionnaire.css';

const emptyAnswers = () =>
  Object.fromEntries(
    AUPAIR_QUESTIONNAIRE_SECTIONS.flatMap((s) => s.questions.map((q) => [q.id, ''])),
  );

const AuPairQuestionnaire = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(emptyAnswers);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState('');

  const section = AUPAIR_QUESTIONNAIRE_SECTIONS[step];
  const totalSteps = AUPAIR_QUESTIONNAIRE_SECTIONS.length;
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step, totalSteps]);

  const getQuestionConfig = (question) => ({
    type: 'textarea',
    rows: 4,
    placeholder: 'Votre réponse…',
    ...question,
    ...(AUPAIR_QUESTION_FIELD_OVERRIDES[question.id] || {}),
  });

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    fetchMyAuPairQuestionnaire()
      .then((row) => {
        if (row?.answers) {
          setAnswers({ ...emptyAnswers(), ...row.answers });
          if (row.status === 'submitted') setSubmitted(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const setAnswer = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const sectionComplete = section.questions.every((q) => (answers[q.id] || '').trim().length > 0);

  const allComplete = AUPAIR_QUESTIONNAIRE_SECTIONS.every((s) =>
    s.questions.every((q) => (answers[q.id] || '').trim().length > 0),
  );

  const handleSaveDraft = async () => {
    setSaving(true);
    setError(null);
    try {
      await saveAuPairQuestionnaireDraft(answers);
      setToast('Brouillon enregistré');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Enregistrement impossible');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!allComplete) {
      setError('Merci de répondre à toutes les questions avant l’envoi final.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await submitAuPairQuestionnaire(answers);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Envoi impossible');
    } finally {
      setSaving(false);
    }
  };

  const goNext = async () => {
    if (!sectionComplete) {
      setError('Merci de répondre à toutes les questions avant de continuer.');
      return;
    }
    setError(null);
    if (step < totalSteps - 1) {
      await handleSaveDraft();
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return <p style={{ padding: '2rem', color: 'var(--dash-gray-500)' }}>Chargement…</p>;

  if (!isSupabaseConfigured) {
    return (
      <p className="login-hint login-hint--warn" style={{ padding: '2rem' }}>
        Supabase doit être configuré pour enregistrer le questionnaire.
      </p>
    );
  }

  if (submitted) {
    return (
      <div className="fq-success">
        <CheckCircle size={48} />
        <h2>Questionnaire envoyé</h2>
        <p>{AUPAIR_QUESTIONNAIRE_META.outro}</p>
        <button type="button" className="dash-btn dash-btn-outline" onClick={() => setSubmitted(false)}>
          Modifier mes réponses
        </button>
      </div>
    );
  }

  return (
    <div className="fq-page">
      {toast && <div className="dash-toast">{toast}</div>}
      <PageHeader title={AUPAIR_QUESTIONNAIRE_META.title} subtitle={AUPAIR_QUESTIONNAIRE_META.tagline} />

      <div className="fq-intro dash-card">
        {AUPAIR_QUESTIONNAIRE_META.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="fq-progress-wrap">
        <div className="fq-progress-bar">
          <div className="fq-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="fq-progress-label">
          Section {step + 1} / {totalSteps} — {section.title}
        </span>
      </div>

      <form
        className="dash-card fq-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (step === totalSteps - 1) handleSubmit();
          else goNext();
        }}
      >
        <h2 className="fq-section-title">{section.title}</h2>

        {section.questions.map((q) => {
          const field = getQuestionConfig(q);
          return (
            <label key={q.id} className="fq-field">
              <span>{field.label}</span>
              {field.type === 'select' ? (
                <select
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                >
                  <option value="">{field.placeholder || 'Choisissez une option'}</option>
                  {(field.options || []).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'date' ? (
                <input
                  type="date"
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                />
              ) : field.type === 'number' ? (
                <input
                  type="number"
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder={field.placeholder || 'Votre réponse…'}
                />
              ) : field.type === 'text' ? (
                <input
                  type="text"
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder={field.placeholder || 'Votre réponse…'}
                />
              ) : (
                <textarea
                  rows={field.rows || 4}
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder={field.placeholder || 'Votre réponse…'}
                />
              )}
            </label>
          );
        })}

        {error && <p className="login-hint login-hint--warn">{error}</p>}

        <div className="fq-actions">
          <button
            type="button"
            className="dash-btn dash-btn-outline"
            disabled={step === 0 || saving}
            onClick={() => {
              setStep((s) => s - 1);
              setError(null);
            }}
          >
            <ChevronLeft size={16} />
            Précédent
          </button>
          <button type="button" className="dash-btn dash-btn-outline" disabled={saving} onClick={handleSaveDraft}>
            <Save size={16} />
            Brouillon
          </button>
          {step < totalSteps - 1 ? (
            <button type="submit" className="dash-btn dash-btn-primary" disabled={saving}>
              Suivant
              <ChevronRight size={16} />
            </button>
          ) : (
            <button type="submit" className="dash-btn dash-btn-primary" disabled={saving}>
              {saving ? 'Envoi…' : 'Envoyer à Grâce est là'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuPairQuestionnaire;
