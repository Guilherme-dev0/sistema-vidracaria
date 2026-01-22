import { Mail, Lock, User } from 'lucide-react';
import { useState } from 'react';

interface RegisterCardProps {
  onRegisterSubmit: () => void;
  onGoToLogin?: () => void;
}

export function RegisterCard({ onRegisterSubmit, onGoToLogin }: RegisterCardProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = name.trim().length > 0 && emailRegex.test(email) && password.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onRegisterSubmit();
    }
  };
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex w-[960px] h-[600px] overflow-hidden rounded-[20px] shadow-lg">
        <div className="flex flex-col items-center justify-center bg-[#4DD0E1] p-12 w-[320px]">
          <div className="text-white text-center mb-8">
            <h2 className="text-2xl font-bold tracking-wide uppercase text-white/85">
              JÁ TEM CONTA?
            </h2>
            <span className="block w-12 h-1 bg-white/50 rounded-full mx-auto mt-4 mb-4" />
            <p className="text-white/80 text-base">
              Acesse sua conta
            </p>
          </div>
          <button
            onClick={onGoToLogin}
            className="px-12 py-3 border-2 border-white bg-transparent text-white font-bold rounded-full hover:bg-white/10 transition-colors"
          >
            ENTRAR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-12 flex-1 min-w-0">
          <h1
            className="text-5xl font-semibold text-[#4DD0E1] mb-12 text-center tracking-[0.02em] w-full"
            style={{
              fontFamily: "Arial, 'Segoe UI', sans-serif",
              fontKerning: "none",
              fontVariantLigatures: "none",
              fontFeatureSettings: "'kern' 0, 'liga' 0, 'clig' 0, 'calt' 0",
              textTransform: "none",
            }}
          >
            
            <span className="tracking-[0.001em]">C</span>
            <span className="tracking-[0.001em]">R</span>
            <span className="tracking-[0.001em]">I</span>
            <span className="tracking-[0.001em]">E</span>
            <span>SUA CONTA</span>
          </h1>
          <form className="w-[400px] mx-auto space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center bg-[#F5F5F5] rounded-lg px-6 h-[50px]">
              <User className="w-6 h-6 text-gray-400 mr-4" />
              <input
                type="text"
                placeholder="NOME"
                className="flex-1 h-full bg-transparent outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-wide"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-[#F5F5F5] rounded-lg px-6 h-[50px]">
              <Mail className="w-6 h-6 text-gray-400 mr-4" />
              <input
                type="email"
                placeholder="E-MAIL (exemplo: usuario@dominio.com)"
                className="flex-1 h-full bg-transparent outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-wide"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-[#F5F5F5] rounded-lg px-6 h-[50px]">
              <Lock className="w-6 h-6 text-gray-400 mr-4" />
              <input
                type="password"
                placeholder="SENHA"
                className="flex-1 h-full bg-transparent outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-wide"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="w-full bg-[#4DD0E1] text-white font-bold py-4 rounded-full hover:bg-[#3FBFD1] transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CADASTRAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
