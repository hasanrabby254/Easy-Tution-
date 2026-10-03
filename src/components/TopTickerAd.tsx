import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ExternalLink,
  Flame,
  X,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface TopTickerAdProps {
  className?: string;
}

export const TopTickerAd: React.FC<TopTickerAdProps> = ({ className = '' }) => {
  const { adConfigs, lang, t, showToast } = useApp();
  const [dismissed, setDismissed] = useState(false);

  const config = adConfigs.breaking_ticker || {
    id: 'ad-breaking-ticker',
    slotName: 'breaking_ticker',
    sponsorName: '10 Minute School',
    tagline: '🔥 স্পেশাল অফার: সকল অনলাইন ব্যাচ ও মডেল টেস্টে ৫০% ছাড়! প্রোমোকোড: EASY50 | বুয়েট ও মেডিকেল শিক্ষকদের সাথে লাইভ ইন্টারেক্টিভ ক্লাস',
    description: 'দেশসেরা শিক্ষকদের সাথে লাইভ ক্লাস ও সলভ শীট সহ নতুন ব্যাচে ভর্তি চলছে। সীমিত আসন!',
    ctaText: 'অফারটি নিন',
    targetUrl: 'https://10minuteschool.com',
    badgeText: 'ব্রেকিং স্পন্সর ⚡',
    enabled: true
  };

  if (!config.enabled || dismissed) {
    return null;
  }

  const handleSponsorClick = () => {
    showToast(
      lang === 'bn'
        ? `স্পন্সর ওয়েবসাইট ওপেন হচ্ছে: ${config.sponsorName}`
        : `Opening sponsor website: ${config.sponsorName}`,
      'info'
    );
  };

  // Headline segments for continuous breaking news marquee
  const tickerItemsEn = [
    {
      sponsor: config.sponsorName,
      highlight: config.tagline,
      badge: 'EXCLUSIVE DEAL'
    },
    {
      sponsor: 'Easy Tution Partner',
      highlight: '🎯 Free Model Tests & Solved PDF Sheets for SSC & HSC 2026 Examinees!',
      badge: 'ACADEMIC UPDATE'
    },
    {
      sponsor: config.sponsorName,
      highlight: '⚡ Instant Admission Counseling & 1-on-1 Mentorship Available Now.',
      badge: 'LIMITED SEATS'
    }
  ];

  const tickerItemsBn = [
    {
      sponsor: config.sponsorName,
      highlight: config.tagline,
      badge: 'স্পেশাল অফার'
    },
    {
      sponsor: 'ইজি টিউশন পার্টনার',
      highlight: '🎯 ২০২৬ সালের এসএসসি ও এইচএসসি পরীক্ষার্থীদের জন্য ফ্রি পূর্ণাঙ্গ মডেল টেস্ট ও সমাধান শিট!',
      badge: 'একাডেমিক আপডেট'
    },
    {
      sponsor: config.sponsorName,
      highlight: '⚡ বুয়েট, ঢাবি ও মেডিকেল শিক্ষকদের সরাসরি তত্ত্বাবধানে ভর্তি চলছে। সীমিত আসন!',
      badge: 'সীমিত আসন'
    }
  ];

  const items = lang === 'bn' ? tickerItemsBn : tickerItemsEn;

  return (
    <aside
      aria-label="Breaking Announcement and Sponsor Ticker"
      className={`w-full bg-[#080E1E] text-slate-100 border-b border-amber-500/40 relative z-50 select-none overflow-hidden shadow-md ${className}`}
    >
      {/* Top subtle highlight line */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-red-500 via-amber-400 to-[#1E3A8A]" />

      <div className="max-w-[1500px] mx-auto flex items-center justify-between h-9 sm:h-10 px-2 sm:px-4">
        
        {/* Pinned Left: Breaking News Badge */}
        <div className="flex items-center gap-2 pr-2.5 sm:pr-4 py-1 bg-gradient-to-r from-[#080E1E] via-[#080E1E] to-transparent z-20 shrink-0">
          <div className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-red-500" />
          </div>

          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-black text-[10px] sm:text-xs uppercase px-2 sm:px-2.5 py-0.5 rounded-full tracking-wider shadow-xs flex items-center gap-1 shrink-0 border border-red-400/40">
            <Flame className="w-3 h-3 text-amber-200 fill-amber-200 shrink-0" />
            <span className="whitespace-nowrap">
              {config.badgeText || t('BREAKING SPONSOR ⚡', 'ব্রেকিং স্পন্সর ⚡')}
            </span>
          </div>
        </div>

        {/* Center: Infinite Continuous Auto-Scroll Ticker Track */}
        <div
          className="flex-1 overflow-hidden relative mx-1 sm:mx-3 h-full flex items-center group cursor-pointer"
          title={lang === 'bn' ? 'মাউস রাখলে থামবে · ক্লিক করে অফারটি দেখুন' : 'Hover to pause · Click to view deal'}
          onClick={() => {
            handleSponsorClick();
            window.open(config.targetUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          {/* Subtle edge gradient fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-[#080E1E] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-[#080E1E] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track running infinite smooth loop */}
          <div className="animate-ticker-continuous flex items-center gap-8 text-[11px] sm:text-xs whitespace-nowrap will-change-transform">
            {/* Set 1 */}
            {items.map((item, idx) => (
              <div key={`track-1-${idx}`} className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px]">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  {item.sponsor}
                </span>

                <span className="font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
                  {item.highlight}
                </span>

                <span className="text-amber-400 font-black text-sm">✦</span>
              </div>
            ))}

            {/* Set 2 (Identical for seamless infinite loop) */}
            {items.map((item, idx) => (
              <div key={`track-2-${idx}`} className="flex items-center gap-3 shrink-0" aria-hidden="true">
                <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px]">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  {item.sponsor}
                </span>

                <span className="font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
                  {item.highlight}
                </span>

                <span className="text-amber-400 font-black text-sm">✦</span>
              </div>
            ))}

            {/* Set 3 (Buffer for ultra-wide monitors) */}
            {items.map((item, idx) => (
              <div key={`track-3-${idx}`} className="flex items-center gap-3 shrink-0" aria-hidden="true">
                <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px]">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  {item.sponsor}
                </span>

                <span className="font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
                  {item.highlight}
                </span>

                <span className="text-amber-400 font-black text-sm">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Right: Direct CTA & Dismiss Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 py-1 bg-gradient-to-l from-[#080E1E] via-[#080E1E] to-transparent z-20 shrink-0">
          <a
            href={config.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              handleSponsorClick();
            }}
            className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-md transition-all shadow-xs flex items-center gap-1 cursor-pointer whitespace-nowrap border border-amber-300"
          >
            <span>{config.ctaText || t('View Deal', 'অফারটি নিন')}</span>
            <ExternalLink className="w-3 h-3 text-slate-950" />
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title={lang === 'bn' ? 'টিকারটি বন্ধ করুন' : 'Dismiss ticker'}
            aria-label="Dismiss news ticker advertisement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
