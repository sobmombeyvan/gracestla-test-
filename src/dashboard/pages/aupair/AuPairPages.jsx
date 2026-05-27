import React, { useEffect, useState } from 'react';
import { FileText, Upload, CheckCircle, Bell, Settings, Lock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { fetchMyDocuments, uploadKycDocument } from '../../../services/documents';

// Success Toast Helper
const SuccessToast = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <div className="dash-toast" role="status">
      <CheckCircle size={16} />
      {message}
    </div>
  );
};

// ==========================================
// 1. AuPairDocuments Component
// ==========================================
export const AuPairDocuments = () => {
  const { profile } = useAuth();
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [error, setError] = useState('');
  const [docType, setDocType] = useState('identity');

  useEffect(() => {
    fetchMyDocuments().then(setDocs).catch((err) => setError(err.message));
  }, []);

  const triggerUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const newDoc = await uploadKycDocument({ docType, file });
      setDocs((prev) => [newDoc, ...prev]);
      setToast({ message: 'Document KYC envoyé. En attente de validation admin.', visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload impossible');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="animate-in">
      <SuccessToast {...toast} />
      <div className="section-header">
        <h2 className="section-title">Mes Documents</h2>
      </div>
      <div className="dash-card" style={{ marginBottom: '1rem' }}>
        <strong>Statut du compte:</strong>{' '}
        <span className={`status-badge ${profile?.kyc_status === 'verified' ? 'verified' : 'pending'}`}>
          {profile?.kyc_status === 'verified' ? 'Vérifié' : 'Non vérifié'}
        </span>
        {profile?.kyc_status !== 'verified' && (
          <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--dash-gray-600)' }}>
            Votre compte reste limité tant que le KYC n’est pas validé par un administrateur.
            Téléversez vos documents ci-dessous.
          </p>
        )}
      </div>

      <div className="dash-grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="dash-card" style={{ padding: 0 }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Nom du document</th>
                <th>Statut</th>
                <th>Dernière mise à jour</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 600, fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={16} style={{ color: 'var(--dash-gray-400)' }} />
                      {doc.doc_type || doc.file_name}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${doc.status}`}>
                      {doc.status === 'verified'
                        ? 'Vérifié'
                        : doc.status === 'pending'
                          ? 'En attente'
                          : doc.status === 'rejected'
                            ? 'Refusé'
                            : 'Non fourni'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.78rem' }}>
                    {doc.updated_at ? new Date(doc.updated_at).toLocaleDateString('fr-FR') : '--'}
                  </td>
                </tr>
              ))}
              {docs.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: '1rem', color: 'var(--dash-gray-500)' }}>
                    Aucun document KYC envoyé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dash-card" style={{ background: 'var(--dash-gray-50)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem', textAlign: 'center' }}>
          <h4>Téléverser un document</h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--dash-gray-500)', margin: '0.5rem 0 1rem' }}>
            Formats acceptés : PDF, PNG ou JPG (max 5 Mo).
          </p>

          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            style={{ marginBottom: '0.75rem', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--dash-gray-200)' }}
          >
            <option value="identity">Pièce d’identité</option>
            <option value="criminal_record">Casier judiciaire</option>
            <option value="medical_certificate">Certificat médical</option>
          </select>
          <label style={{ border: '2px dashed var(--dash-gray-300)', borderRadius: 'var(--dash-radius)', padding: '1.5rem', cursor: 'pointer', background: 'white' }}>
            <Upload size={24} style={{ color: 'var(--dash-gray-400)', margin: '0 auto 0.5rem' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--dash-navy)' }}>
              {uploading ? 'Envoi en cours…' : 'Choisir un fichier'}
            </span>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={triggerUpload} disabled={uploading} style={{ display: 'none' }} />
          </label>
          {error && <p className="login-hint login-hint--warn" style={{ marginTop: '0.75rem' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. AuPairNotifications Component
// ==========================================
export const AuPairNotifications = () => (
  <div className="animate-in">
    <div className="section-header">
      <h2 className="section-title">Mes Notifications</h2>
    </div>
    <div className="dash-card" style={{ padding: '1.5rem' }}>
      <p style={{ color: 'var(--dash-gray-500)', fontSize: '0.9rem' }}>
        Les notifications liées à votre compte apparaîtront ici (messages, validations, matchs).
      </p>
    </div>
  </div>
);

// ==========================================
// 6. AuPairSettings Component
// ==========================================
export const AuPairSettings = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });

  const saveSettings = (e) => {
    e.preventDefault();
    setToast({ message: 'Paramètres mis à jour avec succès !', visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  return (
    <div className="animate-in">
      <SuccessToast {...toast} />
      <div className="section-header">
        <h2 className="section-title">Paramètres généraux</h2>
      </div>

      <div className="dash-grid-2">
        <div className="dash-card">
          <h3 style={{ margin: '0 0 1.25rem' }}>Options de notification</h3>
          <form onSubmit={saveSettings}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                Recevoir les alertes par Email
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                <input type="checkbox" checked={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} />
                Recevoir les alertes par SMS / Téléphone
              </label>

              <button type="submit" className="dash-btn dash-btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                <Settings size={14} /> Enregistrer
              </button>
            </div>
          </form>
        </div>

        <div className="dash-card">
          <h3 style={{ margin: '0 0 1.25rem' }}>Changer le mot de passe</h3>
          <form onSubmit={saveSettings}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--dash-gray-600)' }}>Mot de passe actuel</label>
                <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--dash-gray-200)', borderRadius: 'var(--dash-radius-sm)' }} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--dash-gray-600)' }}>Nouveau mot de passe</label>
                <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--dash-gray-200)', borderRadius: 'var(--dash-radius-sm)' }} required />
              </div>

              <button type="submit" className="dash-btn dash-btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                <Lock size={14} /> Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
