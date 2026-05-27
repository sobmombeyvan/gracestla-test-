import React, { useMemo, useRef, useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import DashAvatar from '../../components/DashAvatar';
import { useAuth } from '../../../context/AuthContext';
import {
  deriveNameParts,
  getDashboardPayload,
  updateDashboardPayload,
  updateProfile,
  uploadProfileAvatar,
} from '../../../services/profiles';

const AuPairProfile = () => {
  const { profile, user, refreshProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const nameParts = useMemo(() => deriveNameParts(profile, user), [profile, user]);
  const [firstName, setFirstName] = useState(nameParts.firstName);
  const [lastName, setLastName] = useState(nameParts.lastName);
  const [phone, setPhone] = useState(profile?.phone || '');
  const [country, setCountry] = useState(profile?.country || '');
  const payload = useMemo(() => getDashboardPayload(profile), [profile]);
  const [birthdate, setBirthdate] = useState(payload.birthdate || '');
  const [nationality, setNationality] = useState(payload.nationality || '');
  const [experienceYears, setExperienceYears] = useState(payload.experienceYears || '');
  const [experienceDescription, setExperienceDescription] = useState(payload.experienceDescription || '');
  const [startDate, setStartDate] = useState(payload.startDate || '');
  const [duration, setDuration] = useState(payload.duration || '12');
  const [skillInput, setSkillInput] = useState('');
  const [lifestyleTags, setLifestyleTags] = useState(payload.lifestyleTags || ['Non-fumeur', 'Permis B']);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setError('');
    setSaving(true);
    try {
      await updateProfile(user.id, {
        full_name: `${firstName} ${lastName}`.trim(),
        phone: phone.trim(),
        country: country.trim(),
      });
      await updateDashboardPayload(user.id, {
        birthdate,
        nationality: nationality.trim(),
        experienceYears: experienceYears.trim(),
        experienceDescription: experienceDescription.trim(),
        lifestyleTags,
        startDate,
        duration,
      });
      await refreshProfile();
      showToast('Profil enregistré.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Enregistrement impossible');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setUploadingPhoto(true);
    try {
      await uploadProfileAvatar(file);
      await refreshProfile();
      showToast('Photo de profil mise à jour.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload photo impossible');
    } finally {
      setUploadingPhoto(false);
      event.target.value = '';
    }
  };

  const addTag = () => {
    const next = skillInput.trim();
    if (!next) return;
    if (lifestyleTags.some((tag) => tag.toLowerCase() === next.toLowerCase())) {
      setSkillInput('');
      return;
    }
    setLifestyleTags((prev) => [...prev, next]);
    setSkillInput('');
  };

  const removeTag = (tagToRemove) => {
    setLifestyleTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {toast && <div className="dash-toast">{toast}</div>}
      <form onSubmit={handleSubmit}>
        <PageHeader
          title="Mon profil"
          subtitle="Ces informations sont partagées avec les familles une fois votre dossier validé."
          action={{ label: saving ? 'Enregistrement…' : 'Enregistrer', submit: true }}
        />

        <div className="dash-grid-3">
          <div>
            <div className="dash-card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Informations personnelles</h3>
              <div className="dash-form-grid">
                <div className="login-field">
                  <label htmlFor="ap-firstName">Prénom</label>
                  <input id="ap-firstName" type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="login-field">
                  <label htmlFor="ap-lastName">Nom</label>
                  <input id="ap-lastName" type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="login-field">
                  <label htmlFor="ap-birthdate">Date de naissance</label>
                  <input id="ap-birthdate" type="date" name="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                </div>
                <div className="login-field">
                  <label htmlFor="ap-nationality">Nationalité</label>
                  <input id="ap-nationality" type="text" name="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
                </div>
                <div className="login-field">
                  <label htmlFor="ap-phone">Téléphone</label>
                  <input id="ap-phone" type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="login-field">
                  <label htmlFor="ap-email">Email</label>
                  <input id="ap-email" type="email" name="email" value={user?.email || ''} disabled />
                </div>
                <div className="login-field">
                  <label htmlFor="ap-country">Pays</label>
                  <input id="ap-country" type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="dash-card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Expérience avec les enfants</h3>
              <div className="login-field">
                <label htmlFor="ap-experience">Années d'expérience</label>
                <input id="ap-experience" type="text" name="experience" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} required />
              </div>
              <div className="login-field">
                <label htmlFor="ap-description">Description</label>
                <textarea
                  id="ap-description"
                  name="description"
                  value={experienceDescription}
                  onChange={(e) => setExperienceDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--dash-gray-200)', borderRadius: '8px', fontSize: '0.85rem', minHeight: 80, resize: 'vertical' }}
                  required
                />
              </div>
            </div>

            <div className="dash-card">
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Compétences & Style de vie</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {lifestyleTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="profile-tag"
                    style={{ padding: '6px 12px', border: 'none', cursor: 'pointer' }}
                    onClick={() => removeTag(tag)}
                    title="Cliquer pour retirer"
                  >
                    {tag} ×
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Ajouter une compétence ou un style de vie"
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    border: '1px solid var(--dash-gray-200)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                  }}
                />
                <button type="button" className="dash-btn dash-btn-sm dash-btn-outline" onClick={addTag}>
                  Ajouter
                </button>
              </div>
              <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--dash-gray-500)' }}>
                Astuce: cliquez sur un tag pour le retirer.
              </p>
            </div>
          </div>

          <div>
            <div className="dash-card" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <DashAvatar initials={nameParts.initials} imageUrl={profile?.avatar_url} size="lg" className="profile-photo-preview" />
              <button type="button" className="dash-btn dash-btn-sm dash-btn-outline" onClick={() => fileInputRef.current?.click()} disabled={uploadingPhoto}>
                <Camera size={14} /> {uploadingPhoto ? 'Upload…' : 'Changer la photo'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
            </div>

            <div className="dash-card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Vidéo de présentation</h3>
              <div style={{ background: 'var(--dash-gray-100)', borderRadius: 8, padding: '2rem', textAlign: 'center', border: '2px dashed var(--dash-gray-300)' }}>
                <Upload size={24} style={{ color: 'var(--dash-gray-400)', marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--dash-gray-500)', margin: 0 }}>Glissez votre vidéo ici ou cliquez pour téléverser</p>
              </div>
            </div>

            <div className="dash-card">
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Disponibilité</h3>
              <div className="login-field">
                <label htmlFor="ap-startDate">Date de début souhaitée</label>
                <input id="ap-startDate" type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div className="login-field">
                <label htmlFor="ap-duration">Durée souhaitée</label>
                <select id="ap-duration" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required>
                  <option value="6">6 mois</option>
                  <option value="12">12 mois</option>
                  <option value="24">24 mois</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="login-hint login-hint--warn">{error}</p>}
      </form>
    </div>
  );
};

export default AuPairProfile;
