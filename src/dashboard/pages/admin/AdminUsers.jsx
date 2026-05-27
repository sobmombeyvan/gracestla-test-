import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, Shield, FileText, ClipboardList, Inbox } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import {
  fetchAllProfilesAdmin,
  fetchAllowlistEmails,
  fetchUserAdminBundle,
  grantAdminAccess,
  revokeAdminAccess,
  setKycStatus,
  setProfileRole,
} from '../../../services/adminUsers';
import { updateDocumentStatus } from '../../../services/documents';
import { getSubmissionTypeLabel } from '../../../services/submissions';
import { FAMILY_QUESTIONNAIRE_SECTIONS } from '../../../data/familyQuestionnaireSchema';
import { AUPAIR_QUESTIONNAIRE_SECTIONS } from '../../../data/aupairQuestionnaireSchema';
import { isSupabaseConfigured } from '../../../lib/supabase';

const roleLabels = { aupair: 'Au pair', family: 'Famille', admin: 'Admin' };
const kycLabels = { none: 'Non démarré', pending: 'En attente', verified: 'Validé', rejected: 'Refusé' };

function QuestionnairePreview({ sections, answers }) {
  if (!answers || Object.keys(answers).length === 0) {
    return <p className="admin-muted">Aucun questionnaire envoyé.</p>;
  }
  return (
    <div className="fq-admin-scroll" style={{ maxHeight: 280 }}>
      {sections.map((sec) => (
        <div key={sec.id} className="fq-admin-section">
          <h4>{sec.title}</h4>
          {sec.questions.slice(0, 3).map((q) => (
            <div key={q.id} className="fq-admin-qa">
              <p className="fq-admin-q">{q.label}</p>
              <p className="fq-admin-a">{answers[q.id] || '—'}</p>
            </div>
          ))}
          {sec.questions.length > 3 && (
            <p className="admin-muted">+ {sec.questions.length - 3} autres réponses…</p>
          )}
        </div>
      ))}
    </div>
  );
}

const AdminUsers = () => {
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [allowlist, setAllowlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [bundle, setBundle] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profil');
  const [promoteEmailInput, setPromoteEmailInput] = useState('');
  const [promoteBusy, setPromoteBusy] = useState(false);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const [profiles, emails] = await Promise.all([fetchAllProfilesAdmin(), fetchAllowlistEmails()]);
      setUsers(profiles);
      setAllowlist(emails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!selectedId) {
      setBundle(null);
      return;
    }
    const user = users.find((u) => u.id === selectedId);
    if (!user) return;
    setDetailLoading(true);
    fetchUserAdminBundle(user.id, user.email)
      .then(setBundle)
      .catch((err) => {
        setBundle(null);
        setError(err instanceof Error ? err.message : 'Impossible de charger le dossier utilisateur.');
      })
      .finally(() => setDetailLoading(false));
  }, [selectedId, users]);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (filter !== 'all' && u.role !== filter) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        (u.full_name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
      );
    });
  }, [users, filter, query]);

  const isAllowlisted = (email) => allowlist.includes((email || '').toLowerCase());

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleRole = async (role) => {
    if (!selectedId) return;
    try {
      const updated = await setProfileRole(selectedId, role);
      setUsers((prev) => prev.map((u) => (u.id === selectedId ? { ...u, ...updated } : u)));
      if (role === 'admin' && bundle?.profile?.email) {
        setAllowlist((prev) => [...new Set([...prev, bundle.profile.email.toLowerCase()])]);
      }
      notify('Rôle mis à jour');
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const handleKyc = async (status) => {
    if (!selectedId) return;
    try {
      const updated = await setKycStatus(selectedId, status);
      setUsers((prev) => prev.map((u) => (u.id === selectedId ? { ...u, kyc_status: updated.kyc_status } : u)));
      notify(`KYC : ${kycLabels[status]}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const handleAdminToggle = async () => {
    if (!bundle?.profile?.email) return;
    try {
      if (isAllowlisted(bundle.profile.email)) {
        if (!window.confirm('Retirer les droits administrateur pour cet utilisateur ?')) return;
        await revokeAdminAccess(bundle.profile.email);
        notify('Accès admin retiré');
      } else {
        await grantAdminAccess(bundle.profile.email);
        notify('Accès admin accordé — la prochaine connexion ouvrira le tableau admin.');
      }
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const handleGrantAdminByEmail = async (e) => {
    e.preventDefault();
    const email = promoteEmailInput.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Indiquez une adresse email valide.');
      return;
    }
    setPromoteBusy(true);
    setError(null);
    try {
      const already = allowlist.includes(email);
      await grantAdminAccess(email);
      setPromoteEmailInput('');
      notify(
        already
          ? 'Cet email avait déjà les droits admin (profil mis à jour si besoin).'
          : 'Administrateur nommé : accès au tableau admin accordé (reconnexion si besoin).',
      );
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setPromoteBusy(false);
    }
  };

  const handleQuickGrantAdmin = async (e, u) => {
    e.stopPropagation();
    if (!u.email) {
      setError('Cet utilisateur n’a pas d’email enregistré.');
      return;
    }
    if (isAllowlisted(u.email)) {
      notify('Cet utilisateur est déjà administrateur.');
      return;
    }
    try {
      setError(null);
      await grantAdminAccess(u.email);
      notify(`${u.full_name || u.email} est maintenant administrateur.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const handleDocAction = async (docId, status) => {
    try {
      await updateDocumentStatus(docId, status);
      notify(status === 'verified' ? 'Document approuvé' : 'Document refusé');
      if (selectedId && bundle?.profile?.email) {
        const data = await fetchUserAdminBundle(selectedId, bundle.profile.email);
        setBundle(data);
      }
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const selected = users.find((u) => u.id === selectedId);

  return (
    <div>
      {toast && <div className="dash-toast">{toast}</div>}
      <PageHeader
        title="Utilisateurs"
        subtitle="Rôles, KYC, questionnaires — et nommez d’autres administrateurs (liste d’accès ou fiche utilisateur)."
      />

      {error && <p className="login-hint login-hint--warn">{error}</p>}

      <form className="admin-grant-card" onSubmit={handleGrantAdminByEmail}>
        <div>
          <label htmlFor="admin-grant-email">Nommer un administrateur</label>
          <input
            id="admin-grant-email"
            type="email"
            autoComplete="email"
            placeholder="email@exemple.com"
            value={promoteEmailInput}
            onChange={(e) => setPromoteEmailInput(e.target.value)}
            disabled={promoteBusy}
          />
        </div>
        <button type="submit" className="dash-btn dash-btn-sm dash-btn-primary" disabled={promoteBusy}>
          {promoteBusy ? 'Envoi…' : 'Accorder l’accès admin'}
        </button>
        <p className="admin-grant-hint">
          L’email est ajouté à la liste autorisée et le profil existant passe en rôle admin. Si la personne n’a pas encore
          de compte, elle sera admin dès la première inscription avec cet email.
        </p>
      </form>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Nom ou e-mail…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="admin-segmented">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'aupair', label: 'Au pairs' },
            { id: 'family', label: 'Familles' },
            { id: 'admin', label: 'Admins' },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={filter === id ? 'is-active' : ''}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-submissions-layout">
        <div className="admin-table-card">
          {loading ? (
            <p style={{ padding: '1.5rem' }}>Chargement…</p>
          ) : filtered.length === 0 ? (
            <EmptyState title="Aucun utilisateur" description="Les comptes Mon espace apparaîtront ici." />
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>KYC</th>
                  <th>Visibilité</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={u.id}
                    className={selectedId === u.id ? 'is-selected' : ''}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedId(u.id);
                      setActiveTab('profil');
                      setError(null);
                    }}
                  >
                    <td style={{ fontWeight: 500 }}>
                      {u.full_name || '—'}
                      {isAllowlisted(u.email) && (
                        <Shield size={12} style={{ marginLeft: 6, verticalAlign: 'middle', color: '#1db2aa' }} />
                      )}
                    </td>
                    <td>{u.email || '—'}</td>
                    <td>{roleLabels[u.role] || u.role}</td>
                    <td>
                      <span className={`admin-status admin-status-${u.kyc_status === 'verified' ? 'new' : u.kyc_status === 'pending' ? 'read' : 'archived'}`}>
                        {kycLabels[u.kyc_status] || u.kyc_status}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-status ${u.kyc_status === 'verified' ? 'admin-status-new' : 'admin-status-archived'}`}>
                        {u.kyc_status === 'verified' ? 'Publié' : 'Privé'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        {!isAllowlisted(u.email) && u.email ? (
                          <button
                            type="button"
                            className="dash-btn dash-btn-sm dash-btn-outline"
                            title="Nommer administrateur"
                            onClick={(e) => handleQuickGrantAdmin(e, u)}
                          >
                            <Shield size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                            Admin
                          </button>
                        ) : null}
                        <button type="button" className="dash-btn dash-btn-sm dash-btn-outline">
                          Gérer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <aside className="admin-submission-detail fq-admin-detail admin-user-detail">
            <div className="admin-submission-detail-head">
              <h3>{selected.full_name || selected.email}</h3>
              <button type="button" className="dash-btn-ghost" onClick={() => setSelectedId(null)}>
                Fermer
              </button>
            </div>

            {detailLoading ? (
              <p>Chargement du dossier…</p>
            ) : (
              <>
                <div className="admin-detail-tabs">
                  {[
                    { id: 'profil', label: 'Profil', icon: Shield },
                    { id: 'kyc', label: 'Documents', icon: FileText },
                    { id: 'quest', label: 'Questionnaire', icon: ClipboardList },
                    { id: 'forms', label: 'Formulaires', icon: Inbox },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      className={activeTab === id ? 'is-active' : ''}
                      onClick={() => setActiveTab(id)}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>

                {activeTab === 'profil' && (
                  <div className="admin-user-panel">
                    {(() => {
                      const payload = bundle?.profile?.dashboard_payload || {};
                      return (
                    <dl className="admin-dl">
                      <dt>Email</dt>
                      <dd>{selected.email || '—'}</dd>
                      <dt>Téléphone</dt>
                      <dd>{bundle?.profile?.phone || selected.phone || '—'}</dd>
                      <dt>Pays</dt>
                      <dd>{bundle?.profile?.country || selected.country || '—'}</dd>
                      {selected.role === 'aupair' && (
                        <>
                          <dt>Naissance</dt>
                          <dd>{payload.birthdate || '—'}</dd>
                          <dt>Nationalité</dt>
                          <dd>{payload.nationality || '—'}</dd>
                          <dt>Expérience</dt>
                          <dd>{payload.experienceYears || '—'}</dd>
                          <dt>Compétences</dt>
                          <dd>{Array.isArray(payload.lifestyleTags) ? payload.lifestyleTags.join(', ') : '—'}</dd>
                          <dt>Disponibilité</dt>
                          <dd>{payload.startDate || '—'} ({payload.duration || '—'} mois)</dd>
                        </>
                      )}
                      {selected.role === 'family' && (
                        <>
                          <dt>Ville</dt>
                          <dd>{payload.city || '—'}</dd>
                          <dt>Description</dt>
                          <dd>{payload.familyDescription || '—'}</dd>
                        </>
                      )}
                      <dt>Inscription</dt>
                      <dd>{selected.created_at ? new Date(selected.created_at).toLocaleString('fr-FR') : '—'}</dd>
                      <dt>Onboarding</dt>
                      <dd>{selected.onboarding_completed ? 'Terminé' : 'En cours'}</dd>
                    </dl>
                      );
                    })()}

                    <label className="admin-field-label">Rôle</label>
                    <div className="admin-btn-row">
                      {['aupair', 'family', 'admin'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          className={`dash-btn dash-btn-sm ${selected.role === r ? 'dash-btn-primary' : 'dash-btn-outline'}`}
                          onClick={() => handleRole(r)}
                        >
                          {roleLabels[r]}
                        </button>
                      ))}
                    </div>

                    <label className="admin-field-label">Accès administration (liste Supabase)</label>
                    <p className="admin-muted" style={{ marginBottom: '0.5rem' }}>
                      Équivalent à nommer administrateur : accès au menu admin et aux données protégées.
                    </p>
                    <button type="button" className="dash-btn dash-btn-sm dash-btn-outline" onClick={handleAdminToggle}>
                      {isAllowlisted(selected.email) ? 'Retirer les droits admin' : 'Nommer administrateur'}
                    </button>

                    {(selected.role === 'family' || selected.role === 'aupair') && (
                      <p className="admin-muted">
                        Publication pilotée par le statut KYC : seuls les profils <strong>Validé</strong> sont visibles.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'kyc' && (
                  <div className="admin-user-panel">
                    <label className="admin-field-label">Statut KYC global</label>
                    <div className="admin-btn-row">
                      {['none', 'pending', 'verified', 'rejected'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`dash-btn dash-btn-sm ${selected.kyc_status === s ? 'dash-btn-primary' : 'dash-btn-outline'}`}
                          onClick={() => handleKyc(s)}
                        >
                          {kycLabels[s]}
                        </button>
                      ))}
                    </div>

                    <h4 className="admin-sub-title">Documents téléversés</h4>
                    {!bundle?.documents?.length ? (
                      <p className="admin-muted">Aucun document.</p>
                    ) : (
                      bundle.documents.map((doc) => (
                        <div key={doc.id} className="admin-doc-row">
                          <div>
                            <strong>{doc.doc_type}</strong>
                            <span className="admin-muted"> — {doc.file_name}</span>
                            <br />
                            <span className={`status-badge ${doc.status}`}>{doc.status}</span>
                          </div>
                          {doc.status === 'pending' && (
                            <div className="admin-btn-row">
                              <button
                                type="button"
                                className="dash-btn dash-btn-sm dash-btn-primary"
                                onClick={() => handleDocAction(doc.id, 'verified')}
                              >
                                OK
                              </button>
                              <button
                                type="button"
                                className="dash-btn dash-btn-sm dash-btn-outline"
                                onClick={() => handleDocAction(doc.id, 'rejected')}
                              >
                                Refuser
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'quest' && (
                  <div className="admin-user-panel">
                    {bundle?.familyQuestionnaire ? (
                      <>
                        <p className="admin-muted">
                          Questionnaire famille — {bundle.familyQuestionnaire.status === 'submitted' ? 'Envoyé' : 'Brouillon'}
                        </p>
                        <QuestionnairePreview
                          sections={FAMILY_QUESTIONNAIRE_SECTIONS}
                          answers={bundle.familyQuestionnaire.answers}
                        />
                      </>
                    ) : null}
                    {bundle?.aupairQuestionnaire ? (
                      <>
                        <p className="admin-muted">
                          Questionnaire au pair — {bundle.aupairQuestionnaire.status === 'submitted' ? 'Envoyé' : 'Brouillon'}
                        </p>
                        <QuestionnairePreview
                          sections={AUPAIR_QUESTIONNAIRE_SECTIONS}
                          answers={bundle.aupairQuestionnaire.answers}
                        />
                      </>
                    ) : null}
                    {!bundle?.familyQuestionnaire && !bundle?.aupairQuestionnaire && (
                      <p className="admin-muted">Aucun questionnaire enregistré pour ce compte.</p>
                    )}
                  </div>
                )}

                {activeTab === 'forms' && (
                  <div className="admin-user-panel">
                    {!bundle?.formSubmissions?.length ? (
                      <p className="admin-muted">Aucun formulaire site public lié à cet email.</p>
                    ) : (
                      bundle.formSubmissions.map((f) => (
                        <div key={f.id} className="admin-doc-row">
                          <div>
                            <strong>{getSubmissionTypeLabel(f.type)}</strong>
                            <span className="admin-muted"> — {new Date(f.created_at).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <pre className="admin-payload-preview admin-payload-preview--sm">
                            {JSON.stringify(f.payload, null, 2)}
                          </pre>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
