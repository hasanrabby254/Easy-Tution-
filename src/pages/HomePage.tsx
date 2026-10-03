import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { AdSlot } from '../components/AdSlot';
import { QUESTION_OF_THE_DAY, TESTIMONIALS } from '../data/mockData';
import { IMAGE_ASSETS, resolveImageUrl, handleImageFallback } from '../utils/imageAssets';
import {
  Search,
  CheckCircle2,
  Users,
  GraduationCap,
  ArrowRight,
  BookOpen,
  FileText,
  Clock,
  ChevronRight,
  HelpCircle,
  Bookmark,
  Star,
  MapPin,
  Check,
  Upload,
  RotateCcw
} from 'lucide-react';

interface HomePageProps {
  onOpenAuth: (mode?: 'login' | 'signup', role?: 'student' | 'tutor') => void;
  onSelectTutor: (tutorId: string) => void;
  onSelectTest: (testId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenAuth,
  onSelectTutor,
  onSelectTest
}) => {
  const {
    t,
    lang,
    tutors,
    mockTests,
    resources,
    savedTutorIds,
    toggleSaveTutor,
    navigateTo,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  // Hero Background Banner Image State (Persists in localStorage so user's uploaded banner stays)
  const defaultHeroImage = IMAGE_ASSETS.heroTuitionLearning;
  const [heroBgImage, setHeroBgImage] = useState<string>(() => {
    return localStorage.getItem('tm_hero_bg_image') || defaultHeroImage;
  });

  const [quickLeadInput, setQuickLeadInput] = useState('');

  // Question of the Day interactive state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedQotd, setHasSubmittedQotd] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('tutors', searchQuery.trim());
    } else {
      navigateTo('tutors');
    }
  };

  const featuredTutors = tutors.slice(0, 4);
  const featuredTests = mockTests.slice(0, 3);
  const featuredResources = resources.slice(0, 3);

  const trustStats = [
    {
      value: '2,450+',
      label: t('Registered Tutors', 'নিবন্ধিত শিক্ষক'),
      valueColor: 'text-[#1E3A8A]',
    },
    {
      value: '18,000+',
      label: t('Active Students', 'সক্রিয় শিক্ষার্থী'),
      valueColor: 'text-[#1E3A8A]',
    },
    {
      value: '65,000+',
      label: t('Mock Tests Taken', 'মক টেস্ট সম্পন্ন'),
      valueColor: 'text-[#1E3A8A]',
    },
    {
      value: '100% FREE',
      badge: 'FREE',
      label: t('Free Forever Guarantee', 'আজীবন ফ্রি গ্যারান্টি'),
      valueColor: 'text-[#F59E0B]',
    },
    {
      value: '0% Commission',
      badge: '0% FEE',
      label: t('Zero Agency Charges', 'কোনো এজেন্সি ফি নেই'),
      valueColor: 'text-[#2E8B6A]',
    },
    {
      value: 'BUET · DU · RU',
      label: t('Top Campus Mentors', 'শীর্ষ বিশ্ববিদ্যালয়ের মেন্টর'),
      valueColor: 'text-[#1E3A8A]',
    },
    {
      value: 'Direct Contact',
      label: t('Direct Call & WhatsApp', 'অভিভাবকদের সরাসরি যোগাযোগ'),
      valueColor: 'text-[#1E3A8A]',
    },
    {
      value: '500+ Notes',
      label: t('Free Curated Resources', 'বিনামূল্যে স্টাডি হ্যান্ডনোট'),
      valueColor: 'text-[#F59E0B]',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      
      {/* 1. Hero Section - Pure White Canvas with Seamless 9:16 Video */}
      <section className="relative px-4 sm:px-6 pt-2 sm:pt-4 pb-8 bg-white border-none overflow-hidden">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Typography, Actions & Search (7 cols) with Cascading Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <h1
                className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                {t(
                  'Learn smarter. Teach better. All free.',
                  'শিখুন সহজে, পড়ান আত্মবিশ্বাসে। সম্পূর্ণ বিনামূল্যে।'
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl">
                {t(
                  'Connect with verified tutors from BUET, DU, RU, Medical & Public Universities. Practice real-time MCQ mock tests for SSC, HSC & Admissions. Zero commissions, zero fees.',
                  'বুয়েট, ঢাবি, রাবি ও মেডিকেলসহ স্বনামধন্য বিশ্ববিদ্যালয়ের অভিজ্ঞ শিক্ষকদের সরাসরি খুঁজে নিন। এসএসসি, এইচএসসি ও ভর্তি পরীক্ষার ফ্রি মক টেস্ট দিয়ে নিজের প্রস্তুতি ঝালিয়ে নিন।'
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onOpenAuth('signup', 'student')}
                  className="px-6 py-3.5 rounded-xl bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold hover:bg-[#1E40AF] active:scale-[0.98] transition-all shadow-md cursor-pointer flex items-center gap-2 group"
                >
                  <span>{t('I am a Student', 'আমি একজন শিক্ষার্থী')}</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onOpenAuth('signup', 'tutor')}
                  className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-[#1E3A8A] text-xs sm:text-sm font-bold hover:bg-slate-50 active:scale-[0.98] transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <span>{t('I am a Tutor', 'আমি একজন শিক্ষক')}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#2E8B6A]" />
                </button>
              </div>

              {/* Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="pt-2 max-w-xl"
              >
                <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-[#1E3A8A] transition-all">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t(
                      'Search by subject, class, or tutor name (e.g. Physics, BUET, HSC)...',
                      'বিষয়, শ্রেণি বা শিক্ষকের নাম দিয়ে খুঁজুন (যেমন: Physics, BUET, এসএসসি)...'
                    )}
                    className="w-full px-3 py-2 text-xs sm:text-sm text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1E3A8A] rounded-xl hover:bg-[#1E40AF] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
                  >
                    {t('Search', 'অনুসন্ধান')}
                  </button>
                </div>
              </form>

              {/* Verified Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E8B6A]" />
                  {t('Verified University Mentors', 'ভেরিফায়েড শিক্ষক')}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E8B6A]" />
                  {t('100% Free Forever', '১০০% ফ্রি চিরকাল')}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2E8B6A]" />
                  {t('0% Agency Commission', '০% কমিশন')}
                </span>
              </div>
            </motion.div>

            {/* Right Column: Seamless Hero Image (4:5 Aspect Ratio, perfectly balanced with zero borders) */}
            <div className="lg:col-span-5 flex justify-center items-center w-full">
              <div className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[550px] aspect-[4/5] flex items-center justify-center bg-transparent border-0 outline-none ring-0 shadow-none p-0 overflow-hidden rounded-2xl sm:rounded-3xl">
                <img
                  src="https://i.postimg.cc/BZPV4rKn/Gemini-Generated-Image-z8xg5nz8xg5nz8xg.jpg"
                  alt={t('Easy Tution Learning Platform', 'ইজি টিউশন লার্নিং প্ল্যাটফর্ম')}
                  className="w-full h-full object-cover border-0 outline-none ring-0 shadow-none bg-transparent select-none pointer-events-none transition-transform duration-500 hover:scale-[1.02]"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== IMAGE_ASSETS.studentReadingRedEggChair) {
                      target.src = IMAGE_ASSETS.studentReadingRedEggChair;
                    }
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Trust Strip - Infinite Marquee / Continuous Auto-Scroll */}
      <section className="border-y border-slate-200/80 bg-white py-5 relative overflow-hidden">
        {/* Soft edge blur gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Continuous Infinite Scrolling Row */}
        <div className="animate-marquee-infinite flex items-center gap-6 sm:gap-8 px-4 select-none cursor-grab active:cursor-grabbing">
          {[...trustStats, ...trustStats].map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 shrink-0 px-5 py-3 bg-slate-50/90 hover:bg-blue-50/50 rounded-2xl border border-slate-200/80 transition-colors"
            >
              <div className={`text-2xl sm:text-3xl font-extrabold ${stat.valueColor} tabular-nums whitespace-nowrap`}>
                {stat.value}
              </div>
              <div className="text-left flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                  {stat.label}
                </span>
                {stat.badge && (
                  <span className="inline-block mt-0.5 w-fit text-[10px] font-bold text-[#2E8B6A] bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded leading-none">
                    {stat.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Top Banner Ad Space */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <AdSlot type="top_banner" />
      </section>

      {/* 4. "How it Works" in 3 Simple Steps */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6"
      >
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#F59E0B]">
            {t('Simple & Transparent', 'সহজ ও স্বচ্ছ প্রক্রিয়া')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('How Easy Tution Works', 'Easy Tution যেভাবে কাজ করে')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t(
              'No agency hassle. Direct contact between guardians, students and teachers.',
              'মিডিয়াম্যান বা এজেন্সির ঝামেলা ছাড়া সরাসরি অভিভাবক ও শিক্ষকদের যোগাযোগ।'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              titleEn: 'Search & Filter Tutors',
              titleBn: 'পছন্দের শিক্ষক নির্বাচন',
              descEn: 'Filter by exact location, class, subjects, and teaching mode (online, home tuition, or both). Check verified university credentials.',
              descBn: 'আপনার এলাকা, ক্লাস ও বিষয় অনুযায়ী শিক্ষক খুঁজুন। শিক্ষকদের প্রাতিষ্ঠানিক ডিগ্রি ও অভিজ্ঞতা যাচাই করুন।'
            },
            {
              step: '02',
              titleEn: 'Direct Contact & Booking',
              titleBn: 'সরাসরি যোগাযোগ ও বুকিং',
              descEn: 'Call directly or send a free message on WhatsApp or platform chat. Agree on schedule and terms with 0% commission deduction.',
              descBn: 'সরাসরি ফোনকল বা হোয়াটসঅ্যাপে কথা বলুন। কোনো কমিশন বা মধ্যস্বত্বভোগী ছাড়াই টিউশনি নিশ্চিত করুন।'
            },
            {
              step: '03',
              titleEn: 'Practice Mock Tests & Notes',
              titleBn: 'মক টেস্ট ও প্রস্তুতি',
              descEn: 'Participate in timed MCQ tests, track personal progress streaks, and download free lecture notes contributed by top tutors.',
              descBn: 'সময়ানুগ এমসিকিউ মক টেস্ট দিন, সমাধান বিশ্লেষণ করুন এবং টপ শিক্ষকদের তৈরি করা হ্যান্ডনোট ফ্রিতে সংগ্রহ করুন।'
            }
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative transition-shadow hover:border-[#1E3A8A]/40 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-extrabold text-lg mb-4 border border-blue-100 shadow-2xs">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {t(item.titleEn, item.titleBn)}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t(item.descEn, item.descBn)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. Featured Tutors Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6"
      >
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#F59E0B] inline-block">
            {t('Verified Mentors', 'ভেরিফায়েড শিক্ষক')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('Featured Tutors in Bangladesh', 'জনপ্রিয় গৃহশিক্ষকবৃন্দ')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t(
              'Connect directly with top university mentors from BUET, DU, RU, Medical & Public Universities. Affordable monthly honorarium (৳3,500 - ৳5,500/month) with zero agency commission.',
              'বুয়েট, ঢাবি, রাবি ও মেডিকেলসহ শীর্ষ বিশ্ববিদ্যালয়ের অভিজ্ঞ শিক্ষকদের সরাসরি খুঁজে নিন। সর্বনিম্ন ৩,৫০০ থেকে সর্বোচ্চ ৫,৫০০ টাকার সাশ্রয়ী মাসিক সম্মানীতে মানসম্মত পাঠদান।'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTutors.map((tutor, idx) => {
            const isSaved = savedTutorIds.includes(tutor.id);
            return (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-lg hover:border-[#1E3A8A]/40 group"
              >
                <div>
                  {/* Photo & verified badge */}
                  <div className="relative mb-3 overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src={resolveImageUrl(tutor.photoUrl, tutor.name)}
                      alt={tutor.name}
                      referrerPolicy="no-referrer"
                      onError={e => handleImageFallback(e, tutor.name, tutor.photoUrl)}
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {tutor.verified && (
                      <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#1E3A8A] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs border border-slate-200/60">
                        <Check className="w-3 h-3 text-[#2E8B6A]" />
                        {t('Verified', 'ভেরিফায়েড')}
                      </span>
                    )}
                    <button
                      onClick={() => toggleSaveTutor(tutor.id)}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer ${
                        isSaved ? 'bg-[#1E3A8A] text-white' : 'bg-white/85 text-slate-600 hover:text-slate-900 border border-slate-200/60'
                      }`}
                      aria-label="Bookmark tutor"
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Info */}
                  <h3 className="text-base font-bold text-slate-900 truncate">
                    {lang === 'bn' && tutor.nameBn ? tutor.nameBn : tutor.name}
                  </h3>
                  <p className="text-xs text-[#1E3A8A] font-bold truncate mt-0.5">
                    {tutor.institute}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                      <strong className="text-slate-900">{tutor.rating}</strong>
                    </span>
                    <span>·</span>
                    <span>{tutor.experienceYears} {t('yrs exp', 'বছরের অভিজ্ঞতা')}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{tutor.area}, {tutor.district}</span>
                  </div>

                  {/* Clean unboxed subjects metadata */}
                  <div className="text-xs text-slate-500 mt-3 line-clamp-1">
                    {tutor.subjects.join(' · ')}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#2E8B6A] bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#2E8B6A]" />
                    {tutor.hourlyRate}
                  </span>
                  <button
                    onClick={() => onSelectTutor(tutor.id)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] active:scale-[0.97] rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    {t('View Profile', 'প্রোফাইল')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('tutors')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-[#1E3A8A] text-xs sm:text-sm font-bold hover:bg-slate-50 hover:border-[#1E3A8A]/40 active:scale-[0.98] transition-all shadow-xs cursor-pointer group"
          >
            <span>{t('View all tutors', 'সকল শিক্ষক দেখুন')}</span>
            <ChevronRight className="w-4 h-4 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.section>

      {/* Featured Educational Partner Showcase */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <AdSlot type="home_feed_sponsor" />
      </section>

      {/* 6. Popular Mock Tests Section (Infinite Continuous Auto-Scroll Marquee) */}
      <section className="relative overflow-hidden py-4">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#F59E0B]">
              {t('Timed Practice', 'টাইমড প্র্যাকটিস')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('Popular MCQ Mock Tests', 'জনপ্রিয় এমসিকিউ মক টেস্ট')}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {t(
                'Hover over any test to pause scrolling',
                'স্ক্রল থামাতে কার্ডের ওপর মাউস রাখুন'
              )}
            </p>
          </div>
          <button
            onClick={() => navigateTo('tests')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1E3A8A] hover:text-[#1E40AF] cursor-pointer"
          >
            <span>{t('All Mock Tests', 'সকল মক টেস্ট')}</span>
            <ChevronRight className="w-4 h-4 text-[#F59E0B]" />
          </button>
        </div>

        {/* Marquee Track Container with Smooth Fade Gradient Edges */}
        <div className="relative w-full overflow-hidden">
          {/* Left & Right Soft Blur Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          {/* Continuous Infinite Scrolling Row */}
          <div className="animate-marquee-infinite flex gap-6 px-4 py-2 cursor-grab active:cursor-grabbing">
            {[...mockTests, ...mockTests].map((test, idx) => (
              <div
                key={`${test.id}-${idx}`}
                className="w-[300px] sm:w-[360px] shrink-0 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-lg hover:border-[#1E3A8A]/50 select-none"
              >
                <div>
                  {/* Clean unboxed category & difficulty metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-bold text-[#1E3A8A]">{test.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{test.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className={test.difficulty === 'Hard' ? 'text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60' : 'text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60'}>
                      {test.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug line-clamp-2">
                    {lang === 'bn' && test.titleBn ? test.titleBn : test.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-[#1E3A8A]" />
                      {test.questionCount} {t('Questions', 'টি প্রশ্ন')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {test.durationMinutes} {t('Mins', 'মিনিট')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {test.totalAttempts || 1000}+ {t('Attempts', 'বার দেওয়া')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTest(test.id)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <span>{t('Start Test Free', 'মক টেস্ট শুরু করুন')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Page Sponsorship Billboard Space */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <AdSlot type="mid_banner" />
      </section>

      {/* 7. Modern Borderless Startup-Style Showcase (matching uploaded reference) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 sm:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Borderless 3D Illustration Graphic with gentle breathing float */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              <motion.img
                src={IMAGE_ASSETS.studentReadingRedEggChair}
                alt="Student Reading in a Red Egg Chair"
                referrerPolicy="no-referrer"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                onError={(e) => {
                  e.currentTarget.src = 'https://i.postimg.cc/63xgYdz9/Student-Reading-in-a-Red-Egg-Chair.png';
                }}
                className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Right Column: Modern Clean Copy & Single-Row Search/Action */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]" style={{ textWrap: 'balance' }}>
              {t(
                'Get connected with the ideal tutor in 60 seconds',
                'সেরা গৃহশিক্ষকের সাথে যুক্ত হোন মাত্র ৬০ সেকেন্ডে'
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
              {t(
                'A reliable, open platform to prepare for SSC, HSC, and university admission exams with verified mentors. Tutors provide high-quality teaching at transparent, affordable monthly rates (৳3,500 - ৳5,500).',
                'এসএসসি, এইচএসসি ও ভর্তি পরীক্ষার সেরা প্রস্তুতির জন্য উন্মুক্ত, নিরাপদ ও সরাসরি গৃহশিক্ষক খুঁজে নেওয়ার সেরা মাধ্যম। শিক্ষকরা অভিজ্ঞতা অনুযায়ী সর্বনিম্ন ৩,৫০০ থেকে সর্বোচ্চ ৫,৫০০ টাকা সাশ্রয়ী মাসিক সম্মানীতে পড়াবেন।'
              )}
            </p>

            {/* Single-row Input + Button Action matching reference image */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (quickLeadInput.trim()) {
                  navigateTo('tutors', quickLeadInput.trim());
                } else {
                  navigateTo('tutors');
                }
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 max-w-lg"
            >
              <input
                type="text"
                value={quickLeadInput}
                onChange={e => setQuickLeadInput(e.target.value)}
                placeholder={t(
                  'Your subject or class (e.g. HSC Physics)...',
                  'আপনার শ্রেণি বা বিষয় (যেমন: HSC Physics)...'
                )}
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-600/10 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="shrink-0 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] active:scale-[0.98] rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
              >
                {t('Find Tutor', 'টিউটর খুঁজুন')}
              </button>
            </form>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3A8A]" />
                {t('Monthly Fee: ৳3,500 - ৳5,500', 'মাসিক সম্মানী: ৳৩,৫০০ - ৳৫,৫০০')}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3A8A]" />
                {t('Verified Mentors from BUET & Medical', 'বুয়েট ও মেডিকেল মেন্টর')}
              </span>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 8. Testimonials Section (Infinite Continuous Auto-Scroll Marquee) */}
      <section className="relative overflow-hidden py-4">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-8 text-center space-y-2">
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#F59E0B]">
            {t('Real Stories', 'বাস্তব অভিজ্ঞতা')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('Loved by Students, Guardians and Tutors', 'শিক্ষক, অভিভাবক ও শিক্ষার্থীদের আস্থা')}
          </h2>
          <p className="text-xs text-slate-500">
            {t(
              'Hover over any card to pause scrolling',
              'স্ক্রল থামাতে কার্ডের ওপর মাউস রাখুন'
            )}
          </p>
        </div>

        {/* Marquee Track Container with Smooth Fade Gradient Edges */}
        <div className="relative w-full overflow-hidden">
          {/* Left & Right Soft Blur Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          {/* Continuous Infinite Scrolling Row */}
          <div className="animate-marquee-infinite flex gap-6 px-4 py-2 cursor-grab active:cursor-grabbing">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[380px] shrink-0 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-lg hover:border-[#1E3A8A]/40 transition-all select-none"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mb-6 font-normal">
                    “{lang === 'bn' ? item.quoteBn : item.quote}”
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold text-sm shrink-0 border border-blue-100">
                    {item.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.author}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.role} {item.location ? `· ${item.location}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer Academic Partner Sponsorship Banner */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <AdSlot type="profile_banner" />
      </section>

      {/* 9. Final Call to Action Band in Deep Royal Blue */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6"
      >
        <div className="bg-[#1E3A8A] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-900/60">
          {/* Subtle background light orbs inside CTA */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#F59E0B]/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-blue-400/10 blur-2xl pointer-events-none" />

          <div className="space-y-3 max-w-xl relative z-10">
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#F59E0B]">
              {t('Get Started Today', 'আজই যুক্ত হোন')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
              {t(
                'Ready to find your ideal tutor or start teaching?',
                'আপনার পছন্দের গৃহশিক্ষক পেতে বা পড়ানো শুরু করতে প্রস্তুত?'
              )}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              {t(
                'Join thousands of motivated students and verified educators in Bangladesh. Free forever with zero hidden fees.',
                'বাংলাদেশের হাজারো শিক্ষার্থী ও শিক্ষকদের উন্মুক্ত প্ল্যাটফর্মে আজই ফ্রি অ্যাকাউন্ট খুলুন।'
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={() => onOpenAuth('signup', 'student')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F59E0B] text-slate-950 text-xs sm:text-sm font-extrabold hover:bg-[#D97706] active:scale-[0.98] transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              {t('Student Registration', 'শিক্ষার্থী নিবন্ধন')}
            </button>
            <button
              onClick={() => onOpenAuth('signup', 'tutor')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white text-xs sm:text-sm font-bold border border-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              {t('Tutor Registration', 'শিক্ষক নিবন্ধন')}
            </button>
          </div>
        </div>
      </motion.section>

    </div>
  );
};
