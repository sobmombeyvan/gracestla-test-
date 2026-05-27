# Configuration Supabase — Grâce est là

Ce guide connecte le site (formulaires, réservations, admin) à Supabase et aux notifications email.

## 1. Créer le projet Supabase

1. Créez un projet sur [supabase.com](https://supabase.com).
2. Dans **Settings → API**, copiez l’URL et la clé **anon** (publique).

## 2. Variables d’environnement (frontend)

À la racine du projet :

```bash
cp .env.example .env
```

Remplissez :

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Redémarrez `npm run dev` après toute modification du `.env`.

Installez les dépendances si besoin :

```bash
npm install
```

## 3. Base de données

Dans le **SQL Editor** de Supabase, exécutez le fichier :

- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_profiles_auth.sql`

Puis ajoutez votre email admin (le même que le compte Auth ci-dessous) :

```sql
insert into public.admin_allowlist (email)
values ('votre@email.com');
```

## 4. Mon espace — connexion (email + Google)

### Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com/) → créez un projet → **APIs & Services → Credentials** → **OAuth client ID** (type **Web**).
2. **Authorized JavaScript origins** :
   - `http://localhost:5173`
   - `https://votre-domaine.vercel.app`
3. **Authorized redirect URIs** (Supabase) :
   - `https://VOTRE_PROJECT_REF.supabase.co/auth/v1/callback`
4. Supabase → **Authentication → Providers → Google** : activez et collez Client ID + Client Secret.
5. Supabase → **Authentication → URL Configuration** :
   - **Site URL** : `https://votre-domaine.vercel.app` (ou `http://localhost:5173` en local)
   - **Redirect URLs** : ajoutez  
     `http://localhost:5173/dashboard/auth/callback`  
     `https://votre-domaine.vercel.app/dashboard/auth/callback`

### Utilisation

1. Allez sur `/dashboard` (**Mon Espace**).
2. Choisissez **Au Pair**, **Famille** ou **Admin**.
3. **Continuer avec Google** ou email / mot de passe.
4. Au Pair et Famille : création de compte possible ; le profil est enregistré dans `profiles`.

## 5. Compte administrateur

1. Ajoutez l’email dans `admin_allowlist` (SQL ci-dessus).
2. Connectez-vous en **Admin** (Google ou email si l’email est sur la liste).
3. Les comptes non listés ne peuvent pas accéder à `/dashboard/admin`.

## 6. Notifications email (Edge Function)

### Déployer la fonction

Avec la [CLI Supabase](https://supabase.com/docs/guides/cli) :

```bash
supabase login
supabase link --project-ref VOTRE_PROJECT_REF
supabase functions deploy send-notification
```

### Secrets (Dashboard → Edge Functions → send-notification → Secrets)

| Secret | Description |
|--------|-------------|
| `ADMIN_EMAIL` | Adresse qui reçoit les alertes |
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com) |
| `FROM_EMAIL` | Ex. `Grâce est là <contact@votredomaine.com>` (domaine vérifié sur Resend) |

Sans `RESEND_API_KEY`, les formulaires sont bien enregistrés ; seuls les emails sont ignorés (log côté fonction).

## 7. Parcours utilisateur

| Étape | Comportement |
|-------|----------------|
| Contact | Enregistrement + email admin |
| Au pair / Famille / Réservation | Enregistrement → calendrier → confirmation → email « rendez-vous » |
| Admin → Demandes | Liste, détail JSON, statuts nouveau / lu / archivé |

## 8. Déploiement Vercel

Le fichier `vercel.json` à la racine envoie toutes les routes vers `index.html` (React Router). Sans cela, un rafraîchissement ou un retour sur `/au-pair`, `/dashboard/admin`, etc. affiche **404**.

Dans Vercel : **Framework Preset = Vite**, **Output Directory = dist** (déjà dans `vercel.json`).

Variables d’environnement à ajouter dans **Project → Settings → Environment Variables** :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Puis redéployez.

## 9. Dépannage

- **« Supabase n’est pas configuré »** : vérifiez `.env` et redémarrez Vite.
- **Google : `missing OAuth secret` / `Unsupported provider`** :
  1. [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services → Credentials** → **Create credentials → OAuth client ID** (type **Web application**).
  2. **Authorized redirect URIs** : une seule URL obligatoire  
     `https://VOTRE_PROJECT_REF.supabase.co/auth/v1/callback`  
     (remplacez `VOTRE_PROJECT_REF` par l’identifiant de votre projet Supabase, visible dans l’URL du dashboard).
  3. **Authorized JavaScript origins** (local) : `http://localhost:5173` (+ votre domaine en prod).
  4. Supabase → **Authentication → Providers → Google** :
     - Activez le provider.
     - Collez **Client ID** et **Client Secret** (les deux champs sont obligatoires — sans secret, l’erreur 400 apparaît).
     - Enregistrez.
  5. Supabase → **Authentication → URL Configuration** :
     - **Site URL** : `http://localhost:5173` (dev) ou votre URL Vercel.
     - **Redirect URLs** :  
       `http://localhost:5173/dashboard/auth/callback`  
       `https://votre-domaine.vercel.app/dashboard/auth/callback`
  6. Attendez ~1 minute, puis réessayez en navigation privée.
- **Accès refusé admin** : email dans `admin_allowlist` + utilisateur Auth créé.
- **Insert échoue** : vérifiez que la migration SQL a bien été exécutée.
- **Pas d’email** : secrets Edge Function + domaine Resend vérifié.

## Fichiers utiles

- Schéma : `supabase/migrations/001_initial_schema.sql`
- Fonction email : `supabase/functions/send-notification/index.ts`
- Client : `src/lib/supabase.js`
- Services : `src/services/submissions.js`, `bookings.js`, `notifications.js`
