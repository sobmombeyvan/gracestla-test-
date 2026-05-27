import React, { useEffect, useState } from 'react';
import { FileText, Upload, Heart, CheckCircle, Bell, Edit, Camera } from 'lucide-react';
import DashAvatar from '../../components/DashAvatar';
import { useAuth } from '../../../context/AuthContext';
import { fetchMyDocuments, uploadKycDocument } from '../../../services/documents';
import {
  deriveNameParts,
  getDashboardPayload,
  updateDashboardPayload,
  updateProfile,
  uploadProfileAvatar,
} from '../../../services/profiles';

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
// 1. FamilyFavorites Component
// ==========================================
export const FamilyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState({ message: '', visible: false });

  const removeFavorite = (id, name) => {
    setFavorites(favorites.filter((ap) => ap.id !== id));
    setToast({ message: `${name} retirée de vos favoris`, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  return (
    <div className="animate-in">
      <SuccessToast {...toast} />
      <div className="section-header">
        <h2 className="section-title">Favoris</h2>
      </div>

      {favorites.length > 0 ? (
        <div className="profile-cards-grid">
          {favorites.map((ap) => (
            <div key={ap.id} className="profile-card">
              <div className="profile-card-header">
                <DashAvatar initials={ap.avatar} size="md" />
                <div className="profile-card-info">
                  <h4>{ap.name}</h4>
                  <p>{ap.country} • {ap.age} ans</p>
                </div>
              </div>
              <div className="profile-card-body">
                <div className="profile-card-tags" style={{ minHeight: '50px' }}>
                  {ap.tags.slice(0, 3).map(t => <span key={t} className="profile-tag">{t}</span>)}
                  <span className="profile-tag">{ap.experience} d'exp.</span>
                </div>
                <p className="match-score">{ap.matchScore} % de correspondance</p>
              </div>
              <div className="profile-card-actions">
                <button className="dash-btn dash-btn-sm dash-btn-primary">Contacter</button>
                <button className="dash-btn dash-btn-sm dash-btn-outline" style={{ color: '#e74c3c', marginLeft: 'auto' }} onClick={() => removeFavorite(ap.id, ap.name)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dash-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Heart size={40} style={{ color: 'var(--dash-gray-300)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--dash-gray-500)' }}>Vous n'avez pas encore d'Au Pairs favorites.</p>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. FamilyDocuments Component
// ==========================================
export const FamilyDocuments = () => {
  const { profile } = useAuth();
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [error, setError] = useState('');
  const [docType, setDocType] = useState('hosting_contract');

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
            Votre compte n’est pas encore vérifié. Téléversez les documents KYC requis puis attendez la validation admin.
          </p>
        )}
      </div>

      <div className="dash-grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="dash-card" style={{ padding: 0 }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Statut</th>
                <th>Mise à jour</th>
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
            Formats autorisés : PDF, PNG ou JPG.
          </p>

          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            style={{ marginBottom: '0.75rem', padding: '0.5rem', borderRadius: 6, border: '1px solid var(--dash-gray-200)' }}
          >
            <option value="hosting_contract">Contrat d’accueil</option>
            <option value="proof_of_address">Justificatif de domicile</option>
            <option value="family_charter">Charte famille signée</option>
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
// 4. FamilyProgress Component
// ==========================================
export const FamilyProgress = () => {
  return (
    <div className="animate-in">
      <div className="section-header">
        <h2 className="section-title">Progression de notre dossier</h2>
      </div>

      <div className="dash-card">
        <p style={{ margin: 0, color: 'var(--dash-gray-600)', fontSize: '0.9rem' }}>
          Le suivi affichera ici les étapes réelles de votre dossier (KYC, questionnaire, mises en relation, validation).
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 5. FamilyNotifications Component
// ==========================================
export const FamilyNotifications = () => {
  return (
    <div className="animate-in">
      <div className="section-header">
        <h2 className="section-title">Mes Notifications</h2>
      </div>

      <div className="dash-card">
        <p style={{ margin: 0, color: 'var(--dash-gray-600)', fontSize: '0.9rem' }}>
          Les notifications réelles de votre compte apparaîtront ici (messages, demandes KYC, validation admin).
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 6. FamilySettings Component
// ==========================================
export const FamilySettings = () => {
  const { profile, user, refreshProfile } = useAuth();
  const payload = getDashboardPayload(profile);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [country, setCountry] = useState(profile?.country || '');
  const [city, setCity] = useState(payload.city || '');
  const [description, setDescription] = useState(payload.familyDescription || '');
  const [error, setError] = useState('');

  const triggerSave = (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setError('');
    updateProfile(user.id, {
      full_name: fullName.trim(),
      country: country.trim(),
    })
      .then(() =>
        updateDashboardPayload(user.id, {
          city: city.trim(),
          familyDescription: description.trim(),
        }),
      )
      .then(() => refreshProfile())
      .then(() => {
        setToast({ message: 'Modifications enregistrées !', visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 3000);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Enregistrement impossible'));
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setUploadingPhoto(true);
    try {
      await uploadProfileAvatar(file);
      await refreshProfile();
      setToast({ message: 'Photo de profil mise à jour !', visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload photo impossible');
    } finally {
      setUploadingPhoto(false);
      event.target.value = '';
    }
  };

  return (
    <div className="animate-in">
      <SuccessToast {...toast} />
      <div className="section-header">
        <h2 className="section-title">Paramètres & Abonnement</h2>
      </div>

      <div className="dash-grid-2">
        <div className="dash-card">
          <h3 style={{ margin: '0 0 1rem' }}>Abonnement</h3>
          <p style={{ margin: 0, color: 'var(--dash-gray-600)', fontSize: '0.9rem' }}>
            La gestion d'abonnement (plan, factures et paiements) sera affichée ici quand le module de facturation
            sera connecté a Supabase/Stripe.
          </p>
        </div>

        <div className="dash-card">
          <h3 style={{ margin: '0 0 1.25rem' }}>Profil de la famille</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <DashAvatar
              initials={deriveNameParts(profile, user).initials}
              imageUrl={profile?.avatar_url}
              size="lg"
            />
            <label className="dash-btn dash-btn-sm dash-btn-outline" style={{ cursor: uploadingPhoto ? 'default' : 'pointer' }}>
              <Camera size={14} /> {uploadingPhoto ? 'Upload…' : 'Changer la photo'}
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleAvatarUpload}
                disabled={uploadingPhoto}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <form onSubmit={triggerSave}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--dash-gray-600)' }}>Nom de la Famille</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--dash-gray-200)', borderRadius: 'var(--dash-radius-sm)', fontSize: '0.8rem' }} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--dash-gray-600)' }}>Ville d'accueil</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--dash-gray-200)', borderRadius: 'var(--dash-radius-sm)', fontSize: '0.8rem' }} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--dash-gray-600)' }}>Pays</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--dash-gray-200)', borderRadius: 'var(--dash-radius-sm)', fontSize: '0.8rem' }} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--dash-gray-600)' }}>Description</label>
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--dash-gray-200)', borderRadius: 'var(--dash-radius-sm)', fontSize: '0.8rem', fontFamily: 'inherit', resize: 'none' }} required />
              </div>

              <button type="submit" className="dash-btn dash-btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                <Edit size={14} /> Enregistrer les modifications
              </button>
            </div>
          </form>
          {error && <p className="login-hint login-hint--warn" style={{ marginTop: '0.75rem' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};
