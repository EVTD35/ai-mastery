"use client";

import { useState } from 'react';
import Link from 'next/link';
// Adapte ce chemin si ton fichier client supabase est ailleurs (ex: '@/lib/supabase')
import { supabase } from '@/lib/libsupabaseClient';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Pour éviter les double-clics

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (forgotPassword) {
        // Réinitialisation du mot de passe
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`,
        });
        if (error) throw error;
        setMessage("Un email de réinitialisation vient de vous être envoyé.");
        setLoading(false);
        return;
      }

      if (isLogin) {
        // Logique de connexion Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        setMessage("Connexion réussie ! Redirection...");
        window.location.href = "/"; // Redirige vers l'accueil ou le tableau de bord
      } else {
        // Logique d'inscription Supabase
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name, // Enregistre le prénom/pseudo dans les métadonnées
            },
          },
        });
        if (error) throw error;

        setMessage("Compte créé avec succès ! Connexion en cours...");
window.location.href = "/";
      }
    } catch (err: any) {
      setMessage(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (garde tout le reste de ton return à l'identique, pense juste à désactiver le bouton si "loading" est true si tu veux)
    <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/[0.02] border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
        
        {/* Lien retour */}
        <div className="mb-6">
          <Link href="/" className="text-xs text-blue-400 hover:underline">← Retour à l'accueil</Link>
        </div>

        <h1 className="text-2xl font-bold mb-2 tracking-tight">
          {forgotPassword ? "Mot de passe oublié" : (isLogin ? "Bon retour parmi nous" : "Rejoindre AI Mastery")}
        </h1>
        <p className="text-xs text-gray-400 mb-6">
          {forgotPassword 
            ? "Entrez votre email pour recevoir les instructions de réinitialisation." 
            : isLogin 
              ? "Accédez à votre espace de formation." 
              : "Créez votre compte pour commencer."}
        </p>

        {message && (
          <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-xs">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {!forgotPassword && !isLogin && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Prénom ou Pseudo</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Titouan"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Adresse email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@domaine.com"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {!forgotPassword && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Mot de passe</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          )}

          {!forgotPassword && isLogin && (
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => setForgotPassword(true)}
                className="text-xs text-gray-400 hover:text-white transition"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/20"
          >
            {forgotPassword ? "Envoyer le lien" : (isLogin ? "Se connecter" : "Créer mon compte")}
          </button>
        </form>

        {/* Bascule Connexion / Inscription / Retour */}
        <div className="mt-6 text-center text-xs text-gray-400">
          {forgotPassword ? (
            <button 
              onClick={() => { setForgotPassword(false); setMessage(''); }} 
              className="text-blue-400 hover:underline font-medium"
            >
              Retour à la connexion
            </button>
          ) : (
            isLogin ? (
              <p>
                Pas encore de compte ?{' '}
                <button onClick={() => { setIsLogin(false); setMessage(''); }} className="text-blue-400 hover:underline font-medium">
                  S'inscrire
                </button>
              </p>
            ) : (
              <p>
                Déjà un compte ?{' '}
                <button onClick={() => { setIsLogin(true); setMessage(''); }} className="text-blue-400 hover:underline font-medium">
                  Se connecter
                </button>
              </p>
            )
          )}
        </div>

      </div>
    </div>
  );
}