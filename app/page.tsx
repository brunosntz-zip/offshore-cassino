"use client";

import { supabase } from '../lib/supabase'; // Ajuste o caminho se a sua pasta lib estiver em outro lugar
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Gamepad2, 
  Spade, 
  Dices, 
  Coins, 
  ShieldCheck, 
  Wallet,
  Plus,
  Info,
  ArrowUpRight
} from 'lucide-react';

// Tipagens do TypeScript pra não dar erro
interface TagProps {
  children: React.ReactNode;
  type?: 'vip' | 'new' | 'soon';
}

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  tag?: string;
  tagType?: 'vip' | 'new' | 'soon';
}

const Tag = ({ children, type = 'soon' }: TagProps) => {
  const styles = {
    vip: "border-violet-500/30 text-violet-400 bg-violet-500/10",
    new: "border-sky-400/30 text-sky-400 bg-sky-400/10",
    soon: "border-slate-700 text-slate-500 bg-slate-800/50"
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.15em] border ${styles[type]}`}>
      {children}
    </span>
  );
};

const GameCard = ({ title, description, icon: Icon, tag, tagType }: GameCardProps) => {
  return (
    <div className="group relative bg-gradient-to-b from-slate-900/80 to-[#0A0A0B] border border-white/5 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:border-sky-400/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] cursor-pointer overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-sky-500/5 blur-3xl group-hover:bg-sky-500/10 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="p-3 rounded-xl bg-slate-800/30 border border-white/5 text-sky-400 transition-transform duration-500 group-hover:rotate-6">
            <Icon size={28} strokeWidth={1.5} />
          </div>
          {tag && <Tag type={tagType}>{tag}</Tag>}
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="flex items-center text-[10px] font-black text-slate-500 group-hover:text-sky-400 transition-colors uppercase tracking-[0.2em]">
          Launch Interface <ArrowUpRight size={14} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [balance, setBalance] = useState<number>(0);

  // Motor de busca do saldo no banco
  useEffect(() => {
    async function fetchWallet() {
      const { data, error } = await supabase
        .from('wallet')
        .select('balance')
        .eq('player_name', 'pepeco')
        .single();

      if (error) {
        console.error("Erro na conexão com o cofre:", error.message);
        return;
      }

      if (data) {
        setBalance(data.balance);
      }
    }

    fetchWallet();
  }, []);

  const games: GameCardProps[] = [
    {
      title: "Ultimate Texas Hold'em",
      description: "A mesa principal. Jogue contra a casa com as melhores odds do mercado.",
      icon: Spade,
      tag: "VIP",
      tagType: "vip"
    },
    {
      title: "Neon Slots",
      description: "Algoritmos provably fair com jackpots progressivos em tempo real.",
      icon: Coins,
      tag: "New",
      tagType: "new"
    },
    {
      title: "Video Poker",
      description: "Interface otimizada para decisões rápidas e estratégia avançada.",
      icon: Gamepad2,
      tag: "Coming Soon",
      tagType: "soon"
    },
    {
      title: "Blackjack",
      description: "A clássica batalha dos 21 em um ambiente de alta fidelidade.",
      icon: Dices,
      tag: "Coming Soon",
      tagType: "soon"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 font-sans selection:bg-violet-500 selection:text-white">
      
      {/* Header Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0B]/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-[0.3em] text-white">
              OFFSHORE
            </h1>
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shadow-[0_0_10px_#8B5CF6]" />
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Display */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl py-2 px-4">
              <div className="bg-violet-500/20 p-1.5 rounded-lg">
                <Wallet size={16} className="text-violet-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Saldo</span>
                <span className="text-sm font-mono font-bold text-white">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Deposit Button */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-xl text-xs font-bold text-white transition-all">
              <Plus size={14} /> Deposit
            </button>

            {/* Profile */}
            <div className="h-10 w-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center cursor-pointer hover:border-violet-500/50 transition-colors">
              <User size={20} className="text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section className="relative mb-20">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-violet-600/10 blur-[120px] rounded-full" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-sky-600/10 blur-[120px] rounded-full" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              System Online: Priority Access
            </div>
            
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Bem-vindo ao Offshore. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600">
                Estratégia encontra a sorte.
              </span>
            </h2>
            
            <p className="text-slate-500 text-lg max-w-xl mb-10 leading-relaxed">
              O ambiente definitivo para operadores de alto escalão. 
              Sua jornada para o domínio das mesas começa aqui.
            </p>

            {/* Aqui tá o Link de roteamento! */}
            <Link 
              href="/ultimate-poker" 
              className="group relative px-10 py-4 bg-violet-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] active:scale-95 inline-block"
            >
              Jogar Ultimate Poker
            </Link>
          </div>
        </section>

        {/* Game Grid */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-8 h-[1px] bg-sky-500" />
              Available Protocols
            </h3>
            <div className="text-slate-500 hover:text-sky-400 transition-colors cursor-pointer">
              <Info size={18} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </div>
        </section>

        {/* Bottom Bar / Status */}
        <div className="mt-24 p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Server Status</span>
              <span className="text-xs text-sky-400 font-mono">STABLE - 14ms latency</span>
            </div>
            <div className="h-8 w-[1px] bg-white/5" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Active Users</span>
              <span className="text-xs text-white font-mono">1,402</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-violet-500" />
            Fully Encrypted Operations
          </div>
        </div>

      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
          Offshore Casino © 2026. Jogue com responsabilidade.
        </p>
        <div className="flex justify-center gap-8 text-[9px] font-bold text-slate-700 uppercase tracking-widest">
          <a href="#" className="hover:text-violet-500 transition-colors">Termos</a>
          <a href="#" className="hover:text-violet-500 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-violet-500 transition-colors">Suporte Técnico</a>
        </div>
      </footer>
    </div>
  );
} 