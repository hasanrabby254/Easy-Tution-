import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ExternalLink,
  Sparkles,
  Megaphone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Gift,
  Tag,
  X,
  Award,
  Zap,
  BookOpen,
  Copy,
  Star
} from 'lucide-react';

import { TopTickerAd } from './TopTickerAd';

interface AdSlotProps {
  type:
    | 'top_banner'
    | 'mid_banner'
    | 'sidebar'
    | 'native_tutor'
    | 'profile_banner'
    | 'mock_tests_banner'
    | 'resources_banner'
    | 'home_feed_sponsor'
    | 'tutor_top_sponsor'
    | 'student_dashboard_sponsor'
    | 'exam_reward_ad'
    | 'bottom_bar'
    | 'breaking_ticker';
  className?: string;
  customLabel?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type, className = '', customLabel }) => {
  if (type === 'breaking_ticker') {
    return <TopTickerAd className={className} />;
  }
  const { adConfigs, t, lang, showToast } = useApp();
  const [dismissed, setDismissed] = useState(false);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  // Fallback config if specific slot is missing
  const config = adConfigs[type] || adConfigs.top_banner || {
    id: `ad-${type}`,
    slotName: type,
    sponsorName: '10 Minute School',
    tagline: 'Complete Online Batch & Model Tests for SSC/HSC 2026',
    description: 'Join live interactive masterclasses with top faculty, animation lecture notes, and chapter-wise solve sheets.',
    ctaText: 'Enroll Now (Free Trial)',
    targetUrl: 'https://10minuteschool.com',
    badgeText: 'Official EdTech Partner',
    enabled: true
  };

  if (!config || !config.enabled || dismissed) return null;

  const handleSponsorClick = () => {
    showToast(
      lang === 'bn'
        ? `স্পন্সর ওয়েবসাইট ওপেন হচ্ছে: ${config.sponsorName}`
        : `Opening sponsor website: ${config.sponsorName}`,
      'info'
    );
  };

  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(true);
    showToast(
      lang === 'bn' ? 'ভাউচার কোড কপি হয়েছে!' : 'Voucher code copied to clipboard!',
      'success'
    );
    setTimeout(() => setCopiedVoucher(false), 2500);
  };

  // Common distinct "SPONSORED AD / বিজ্ঞাপন" badge
  const renderAdBadge = (extraText?: string) => (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-xs border border-amber-300 shrink-0">
      <Megaphone className="w-3 h-3 text-slate-950 fill-slate-950" />
      <span>{t('SPONSORED AD · বিজ্ঞাপন', 'স্পন্সর বিজ্ঞাপন · AD')}</span>
      {extraText && (
        <>
          <span className="text-amber-800 font-bold">|</span>
          <span className="text-slate-900 font-bold">{extraText}</span>
        </>
      )}
    </div>
  );

  // 1. STICKY BOTTOM FLOATING BAR
  if (type === 'bottom_bar') {
    return (
      <aside
        aria-label="Floating Sponsorship Banner"
        className={`fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-[1240px] mx-auto z-40 bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FFF7ED] border-2 border-amber-400 shadow-[0_12px_36px_rgba(217,119,6,0.24)] rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 sm:gap-4 transition-all animate-in fade-in slide-in-from-bottom-3 ${className}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0 border-2 border-amber-400 shadow-xs">
            {config.sponsorName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2">
              {renderAdBadge()}
              <span className="text-xs font-bold text-slate-900 truncate">
                {config.sponsorName}
              </span>
            </div>
            <p className="text-xs font-bold text-[#1E3A8A] truncate">
              {config.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={config.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className="px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer whitespace-nowrap border border-amber-500"
          >
            <span>{config.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-amber-900 hover:text-slate-900 hover:bg-amber-200/60 rounded-lg transition-colors cursor-pointer"
            title="Dismiss ad"
            aria-label="Dismiss advertisement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  // 2. EXAM REWARD / SCHOLARSHIP VOUCHER AD (For Test Result & Test Finish)
  if (type === 'exam_reward_ad') {
    const voucherCode = 'EASYTUTION25';
    return (
      <aside
        aria-label="Student Exam Reward Partner"
        className={`w-full bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/90 to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(217,119,6,0.16)] relative overflow-hidden transition-all hover:border-amber-500 ${className}`}
      >
        {/* Decorative corner banner */}
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] tracking-wider uppercase px-4 py-1 rounded-bl-xl shadow-xs border-b border-l border-amber-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3 fill-slate-950" />
          <span>{t('SPONSORED REWARD', 'স্পন্সরশিপ গিফট')}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10 pt-1">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-400 to-[#D97706] text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-md shrink-0 border-2 border-amber-300">
              <Gift className="w-7 h-7 text-slate-950" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {renderAdBadge(config.badgeText || t('STUDENT REWARD', 'উপহার ভাউচার'))}
                <span className="text-xs font-extrabold text-[#1E3A8A]">{config.sponsorName}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {config.tagline}
              </h3>
              <p className="text-xs text-slate-700 max-w-xl font-medium leading-relaxed">
                {config.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Voucher Code Box */}
            <div className="flex items-center justify-between gap-2 px-3 py-2 bg-white/95 border-2 border-amber-400 rounded-xl shadow-2xs">
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-wider text-amber-900 block font-black">
                  {t('Voucher Code', 'ভাউচার কোড')}
                </span>
                <span className="font-mono text-xs font-black text-[#1E3A8A]">
                  {voucherCode}
                </span>
              </div>
              <button
                onClick={() => handleCopyVoucher(voucherCode)}
                className="p-1.5 hover:bg-amber-100 rounded-lg text-slate-800 transition-colors cursor-pointer"
                title="Copy voucher code"
              >
                {copiedVoucher ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a
              href={config.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSponsorClick}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer border border-amber-500"
            >
              <span>{config.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 3. HOME IN-FEED SPONSOR CARD
  if (type === 'home_feed_sponsor') {
    return (
      <aside
        aria-label="Academic Partner Showcase"
        className={`w-full max-w-[1240px] mx-auto bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/80 to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(217,119,6,0.14)] relative overflow-hidden transition-all hover:border-amber-500 hover:shadow-[0_12px_40px_rgba(217,119,6,0.2)] ${className}`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {renderAdBadge()}
              <span className="text-xs font-black text-[#1E3A8A] bg-white/80 border border-amber-300 px-2 py-0.5 rounded-md">
                {config.sponsorName}
              </span>
              <span className="text-xs font-bold text-amber-900">
                ★ {config.badgeText || t('Official Partner', 'অফিসিয়াল পার্টনার')}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                {config.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {config.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-800 pt-1">
              <span className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-lg border border-amber-300/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B6A]" />
                {t('100% Free Assessment', '১০০% ফ্রি প্রোফাইল মূল্যায়ন')}
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-lg border border-amber-300/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B6A]" />
                {t('Scholarship Counseling', 'স্কলারশিপ ও ভর্তি সহায়তা')}
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-lg border border-amber-300/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B6A]" />
                {t('Official Partner of EasyTuition', 'অফিসিয়াল শিক্ষা পার্টনার')}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-stretch lg:items-end gap-2.5">
            <a
              href={config.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSponsorClick}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap border border-amber-500"
            >
              <span>{config.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
            <span className="text-[11px] text-amber-900 text-center lg:text-right font-black flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              {t('Verified Promotional Sponsor', 'ভেরিফায়েড প্রমোশনাল বিজ্ঞাপন')}
            </span>
          </div>
        </div>
      </aside>
    );
  }

  // 4. TUTOR TOP SPONSOR BAR (For Find Tutors Page)
  if (type === 'tutor_top_sponsor') {
    return (
      <aside
        aria-label="Mentor Network Sponsor"
        className={`w-full max-w-[1240px] mx-auto bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#1E3A8A] text-white rounded-3xl p-5 sm:p-6 shadow-lg border-2 border-amber-400 relative overflow-hidden ${className}`}
      >
        <div className="absolute right-0 top-0 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              {renderAdBadge()}
              <span className="text-xs font-black text-amber-300">{config.sponsorName}</span>
              <span className="text-[10px] uppercase font-bold text-amber-200 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded">
                {config.badgeText || t('FEATURED MENTOR NETWORK', 'ফিচার্ড মেন্টর নেটওয়ার্ক')}
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-white">
              {config.tagline}
            </h3>
            <p className="text-xs text-slate-200 max-w-2xl line-clamp-2 font-medium">
              {config.description}
            </p>
          </div>

          <a
            href={config.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-[#F59E0B] hover:from-amber-500 hover:to-[#D97706] text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer whitespace-nowrap border border-amber-300"
          >
            <span>{config.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-950 font-bold" />
          </a>
        </div>
      </aside>
    );
  }

  // 5. STUDENT DASHBOARD SPONSOR (For Student Dashboard Page)
  if (type === 'student_dashboard_sponsor') {
    return (
      <aside
        aria-label="Student Prep Sponsor"
        className={`w-full bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/90 to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-5 shadow-[0_6px_25px_rgba(217,119,6,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-amber-500 ${className}`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-slate-900 text-white flex items-center justify-center font-black text-base shrink-0 border-2 border-amber-400 shadow-xs">
            {config.sponsorName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              {renderAdBadge()}
              <span className="text-xs font-black text-slate-900 truncate">{config.sponsorName}</span>
            </div>
            <h4 className="text-xs sm:text-sm font-black text-[#1E3A8A] truncate">
              {config.tagline}
            </h4>
            <p className="text-[11px] text-slate-700 line-clamp-1 font-medium">
              {config.description}
            </p>
          </div>
        </div>

        <a
          href={config.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSponsorClick}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer whitespace-nowrap border border-amber-500"
        >
          <span>{config.ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5 text-white" />
        </a>
      </aside>
    );
  }

  // 6. TOP BANNER (Spacious Leaderboard with distinct warm amber highlight & glowing border)
  if (type === 'top_banner') {
    return (
      <aside
        aria-label="Advertisement & Sponsorship Space"
        className={`w-full max-w-[1240px] mx-auto min-h-[115px] md:min-h-[130px] bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/90 to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(217,119,6,0.15)] flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden transition-all hover:border-amber-500 hover:shadow-[0_12px_40px_rgba(217,119,6,0.22)] ${className}`}
      >
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-400/25 rounded-full pointer-events-none blur-2xl" />

        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 w-full md:w-auto min-w-0">
          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-slate-900 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-md shrink-0 border-2 border-amber-400">
            {config.sponsorName.slice(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {renderAdBadge(customLabel)}
              <span className="text-xs font-black text-[#1E3A8A] bg-white/80 border border-amber-300 px-2 py-0.5 rounded-md">
                {config.sponsorName}
              </span>
              <span className="hidden sm:inline text-xs font-bold text-amber-900">
                ★ {config.badgeText || t('Verified Partner', 'যাচাইকৃত পার্টনার')}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug line-clamp-1">
              {config.tagline}
            </h4>

            <p className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-2 max-w-2xl">
              {config.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-amber-200">
          <a
            href={config.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap border border-amber-500"
          >
            <span>{config.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>

          <span className="text-[10px] text-amber-900 font-bold flex items-center gap-1 cursor-default shrink-0">
            <Megaphone className="w-3 h-3 text-amber-700" />
            <span>{t('Promoted Content · বিজ্ঞাপন', 'বিজ্ঞাপনী কন্টেন্ট')}</span>
          </span>
        </div>
      </aside>
    );
  }

  // 7. MID BANNER (Prominent Full Billboard Between Core Sections)
  if (type === 'mid_banner') {
    return (
      <aside
        aria-label="Featured Partner Sponsorship"
        className={`w-full max-w-[1240px] mx-auto bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-[0_8px_36px_rgba(217,119,6,0.18)] relative overflow-hidden transition-all hover:border-amber-500 hover:shadow-[0_14px_48px_rgba(217,119,6,0.25)] ${className}`}
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-amber-400/25 to-transparent rounded-full pointer-events-none blur-3xl" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {renderAdBadge()}
              <span className="text-xs font-black text-[#1E3A8A] bg-white px-2.5 py-0.5 rounded-md border border-amber-300">
                {config.sponsorName}
              </span>
              <span className="text-xs font-bold text-amber-900">
                ★ {config.badgeText || t('Featured Academic Partner', 'নির্বাচিত শিক্ষা পার্টনার')}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {config.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-2xl">
                {config.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-800 pt-1">
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-300/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B6A]" />
                {t('Nationwide Model Tests', 'দেশব্যাপী স্পেশাল মডেল টেস্ট')}
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-300/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B6A]" />
                {t('Exclusive Preparation Kits', 'পূর্ণাঙ্গ প্রস্তুতি গাইড')}
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-300/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B6A]" />
                {t('Top University Mentors', 'শীর্ষ মেন্টরদের পরামর্শ')}
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex flex-col items-stretch lg:items-end gap-2.5">
            <a
              href={config.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSponsorClick}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap border border-amber-500"
            >
              <span>{config.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
            <span className="text-[11px] text-amber-900 text-center lg:text-right font-black">
              {t('Official Sponsored Placement · স্পন্সর বিজ্ঞাপন', 'স্পন্সর বিজ্ঞাপন')}
            </span>
          </div>
        </div>
      </aside>
    );
  }

  // 8. SIDEBAR (Spacious Tall Card with distinct amber warmth)
  if (type === 'sidebar') {
    return (
      <aside
        aria-label="Sidebar Sponsorship"
        className={`w-full min-h-[320px] bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7]/90 to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(217,119,6,0.16)] flex flex-col justify-between relative overflow-hidden transition-all hover:border-amber-500 hover:shadow-[0_12px_40px_rgba(217,119,6,0.22)] ${className}`}
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-amber-200 mb-4">
            {renderAdBadge()}
            <span className="text-[11px] font-black text-amber-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E8B6A]" />
              <span>{config.badgeText || t('Featured', 'ফিচার্ড')}</span>
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-slate-900 text-white flex items-center justify-center font-black text-base shadow-xs border-2 border-amber-400 shrink-0">
                {config.sponsorName.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug truncate">
                  {config.sponsorName}
                </h4>
                <p className="text-[11px] font-extrabold text-[#D97706] truncate">
                  {t('Verified Academic Partner', 'যাচাইকৃত শিক্ষা পার্টনার')}
                </p>
              </div>
            </div>

            <h5 className="text-xs sm:text-sm font-black text-[#1E3A8A] leading-snug">
              {config.tagline}
            </h5>

            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {config.description}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-amber-200 mt-4 space-y-2">
          <a
            href={config.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-black text-white bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer border border-amber-500"
          >
            <span>{config.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>

          <div className="flex items-center justify-between text-[10px] text-amber-900 font-black px-1">
            <span className="flex items-center gap-1">
              <Megaphone className="w-3 h-3 text-amber-700" />
              {t('Sponsorship Zone', 'বিজ্ঞাপন জোন')}
            </span>
            <span>Easy Tution Partner</span>
          </div>
        </div>
      </aside>
    );
  }

  // 9. NATIVE IN-FEED SPONSORED CARD (For Tutor List & Test Grids)
  if (type === 'native_tutor') {
    return (
      <aside
        aria-label="Sponsored In-Feed Partner"
        className={`bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/90 to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-6 shadow-[0_8px_32px_rgba(217,119,6,0.16)] flex flex-col justify-between relative transition-all hover:border-amber-500 hover:shadow-[0_12px_40px_rgba(217,119,6,0.22)] ${className}`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {renderAdBadge()}
              <span className="text-xs font-black text-slate-900 truncate">{config.sponsorName}</span>
            </div>
            <span className="text-[11px] text-amber-900 font-extrabold bg-amber-200/80 px-2 py-0.5 rounded border border-amber-300">
              {config.badgeText || t('Partner', 'পার্টনার')}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <h4 className="text-base font-black text-[#1E3A8A] leading-snug">
              {config.tagline}
            </h4>
            <p className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-3">
              {config.description}
            </p>
          </div>

          <div className="bg-white/90 border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-bold flex items-center justify-between">
            <span className="text-amber-900 font-black">{t('Verified Sponsor', 'যাচাইকৃত স্পন্সর')}</span>
            <span className="text-[#2E8B6A] font-extrabold">{t('Free Access / Discount', 'ফ্রি ট্রায়াল ও ছাড়')}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-amber-200 mt-4 flex items-center justify-between gap-3">
          <span className="text-[11px] text-amber-900 font-black flex items-center gap-1">
            <Megaphone className="w-3.5 h-3.5 text-amber-700" />
            {t('Promoted Ad · বিজ্ঞাপন', 'স্পন্সরশিপ কার্ড')}
          </span>
          <a
            href={config.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-black text-white bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] rounded-xl transition-all shadow-sm border border-amber-500 cursor-pointer"
          >
            <span>{config.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>
        </div>
      </aside>
    );
  }

  // 10. MOCK TESTS BANNER & RESOURCES BANNER (High-Visibility Golden Amber Billboard)
  if (type === 'mock_tests_banner' || type === 'resources_banner') {
    return (
      <aside
        aria-label="Exam Preparation Partner"
        className={`w-full bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(217,119,6,0.16)] flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden transition-all hover:border-amber-500 hover:shadow-[0_12px_40px_rgba(217,119,6,0.22)] ${className}`}
      >
        <div className="flex items-start sm:items-center gap-4 w-full md:w-auto min-w-0">
          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-slate-900 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-md shrink-0 border-2 border-amber-400">
            {config.sponsorName.slice(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {renderAdBadge(customLabel || (type === 'mock_tests_banner' ? 'EXAM PARTNER' : 'STUDY SPONSOR'))}
              <span className="text-xs font-black text-[#1E3A8A] bg-white px-2 py-0.5 rounded-md border border-amber-300">
                {config.sponsorName}
              </span>
              <span className="text-xs font-bold text-amber-900">
                ★ {config.badgeText || t('Official Mock Test Partner', 'অফিসিয়াল মক টেস্ট পার্টনার')}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug line-clamp-1">
              {config.tagline}
            </h4>

            <p className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-2 max-w-2xl">
              {config.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-amber-200">
          <a
            href={config.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap border border-amber-500"
          >
            <span>{config.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>

          <span className="text-[10px] text-amber-900 font-bold flex items-center gap-1 cursor-default shrink-0">
            <Megaphone className="w-3 h-3 text-amber-700" />
            <span>{t('Sponsored Mock Test Prep · বিজ্ঞাপন', 'স্পন্সর বিজ্ঞাপন')}</span>
          </span>
        </div>
      </aside>
    );
  }

  // 11. DEFAULT HORIZONTAL PROFILE & BANNER SLOTS (High-Contrast Amber Champagne)
  return (
    <aside
      aria-label="Advertisement Banner"
      className={`w-full bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/90 to-[#FFF7ED] border-2 border-amber-400 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_30px_rgba(217,119,6,0.14)] relative overflow-hidden transition-all hover:border-amber-500 hover:shadow-[0_12px_36px_rgba(217,119,6,0.2)] ${className}`}
    >
      <div className="flex items-start sm:items-center gap-3.5 w-full sm:w-auto min-w-0">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 border-2 border-amber-400 shadow-xs">
          {config.sponsorName.slice(0, 2).toUpperCase()}
        </div>

        <div className="min-w-0 space-y-0.5">
          <div className="flex flex-wrap items-center gap-2">
            {renderAdBadge(customLabel)}
            <span className="text-xs font-black text-slate-900 truncate">{config.sponsorName}</span>
          </div>
          <h4 className="text-xs sm:text-sm font-black text-[#1E3A8A] truncate">
            {config.tagline}
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-700 font-medium line-clamp-1 max-w-xl">
            {config.description}
          </p>
        </div>
      </div>

      <a
        href={config.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleSponsorClick}
        className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-black text-white bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] rounded-xl transition-all shadow-xs hover:shadow whitespace-nowrap cursor-pointer border border-amber-500"
      >
        <span>{config.ctaText}</span>
        <ExternalLink className="w-3.5 h-3.5 text-white" />
      </a>
    </aside>
  );
};
