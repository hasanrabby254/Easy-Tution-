import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { AdSlot } from '../components/AdSlot';
import {
  HelpCircle,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Bookmark,
  BarChart3,
  ExternalLink,
  Megaphone
} from 'lucide-react';

interface MockTestsPageProps {
  onSelectTest: (testId: string) => void;
}

export const MockTestsPage: React.FC<MockTestsPageProps> = ({ onSelectTest }) => {
  const { mockTests, savedTestIds, toggleSaveTest, t, lang, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const categories = [
    'All',
    'SSC',
    'HSC',
    'Admission',
    'General Knowledge',
    'English'
  ];

  const filteredTests = useMemo(() => {
    return mockTests.filter(test => {
      if (selectedCategory !== 'All' && test.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = test.title.toLowerCase().includes(q) || (test.titleBn && test.titleBn.includes(q));
        const matchSubject = test.subject.toLowerCase().includes(q);
        if (!matchTitle && !matchSubject) return false;
      }
      return true;
    });
  }, [mockTests, selectedCategory, search]);

  const leaderboard = [
    { rank: 1, name: 'Samiul Bashar', score: '98%', institute: 'Notre Dame College', avatar: 'S' },
    { rank: 2, name: 'Farhan Labib', score: '96%', institute: 'Dhaka City College', avatar: 'F' },
    { rank: 3, name: 'Ananya Chowdhury', score: '94%', institute: 'Viqarunnisa Noon', avatar: 'A' },
    { rank: 4, name: 'Tanvir Hossain', score: '92%', institute: 'Rajshahi College', avatar: 'T' },
    { rank: 5, name: 'Sadia Sultana', score: '90%', institute: 'Chittagong College', avatar: 'S' }
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9A441]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('Instant Evaluation & Detailed Solutions', 'তাত্ক্ষণিক মূল্যায়ন ও সমাধান')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1F] tracking-tight">
            {t('Free MCQ Mock Tests with Live Timer', 'ফ্রি এমসিকিউ মক টেস্ট')}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6760] max-w-2xl">
            {t(
              'Practice chapter-wise and full-syllabus mock tests for SSC, HSC, and University Admissions. Track your progress with detailed analytics.',
              'অধ্যায়ভিত্তিক ও পূর্ণাঙ্গ সিলেবাসের ওপর টাইমড মক টেস্ট দিন। পরীক্ষা শেষে বিস্তারিত ব্যাখ্যাসহ নির্ভুল সমাধান দেখুন।'
            )}
          </p>
        </div>

        <button
          onClick={() => navigateTo('student-dashboard')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-[#1E3A8A] hover:bg-blue-100 text-xs font-bold transition-colors cursor-pointer border border-blue-200/60 shadow-2xs shrink-0 self-start sm:self-auto"
        >
          <BarChart3 className="w-4 h-4 text-[#1E3A8A]" />
          <span>{t('View Progress & Analytics', 'প্রগ্রেস ও অ্যানালিটিক্স দেখুন')}</span>
        </button>
      </div>

      {/* Featured Exam Sponsor Banner */}
      <AdSlot type="mock_tests_banner" />

      {/* Category Filter Chips (Single line tabs with click handlers) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Test Cards (8 cols) + Leaderboard & Sidebar Ad (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Test Cards List (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredTests.map((test, index) => {
              const isSaved = savedTestIds.includes(test.id);
              // Shows ad after 2 tests in every 4-test block (2 above, 2 below)
              const showAdAfter = (index + 1) % 4 === 2 && index !== filteredTests.length - 1;

              return (
                <React.Fragment key={test.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-lg hover:border-[#1E3A8A]/40"
                  >
                    <div>
                      {/* Clean unboxed metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1E3A8A]">{test.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{test.subject}</span>
                          <span aria-hidden="true">·</span>
                          <span className={test.difficulty === 'Hard' ? 'text-rose-600 font-semibold' : 'text-[#2E8B6A] font-semibold'}>
                            {test.difficulty}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleSaveTest(test.id)}
                          className={`p-1 transition-colors cursor-pointer ${isSaved ? 'text-[#F59E0B]' : 'text-slate-300 hover:text-slate-600'}`}
                          title="Save test"
                        >
                          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug line-clamp-2">
                        {lang === 'bn' && test.titleBn ? test.titleBn : test.title}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
                        <span className="flex items-center gap-1 font-medium">
                          <HelpCircle className="w-3.5 h-3.5 text-[#1E3A8A]" />
                          {test.questionCount} {t('MCQs', 'টি এমসিকিউ')}
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                          {test.durationMinutes} {t('Mins', 'মিনিট')}
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          {test.totalAttempts || 1000}+
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <button
                        onClick={() => onSelectTest(test.id)}
                        className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] active:scale-[0.98] rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer group"
                      >
                        <span>{t('Start Test Free', 'মক টেস্ট শুরু করুন')}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
                      </button>

                      {/* Mini Highlighted Ad Option Under Each Mock Test */}
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-100/60 to-amber-500/10 border-2 border-amber-300/80 flex items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider shadow-2xs shrink-0 flex items-center gap-1">
                            <Megaphone className="w-2.5 h-2.5 fill-slate-950" />
                            AD
                          </span>
                          <span className="text-[11px] font-bold text-slate-900 truncate">
                            {index % 2 === 0
                              ? t('10MS: HSC Model Test Solution Sheet', '১০ মিনিট স্কুল: ফ্রি মডেল টেস্ট শিট')
                              : t('Udvash: Engineering Exam Routine 2026', 'উদ্ভাস: ইঞ্জিনিয়ারিং মডেল টেস্ট রুটিন')}
                          </span>
                        </div>
                        <a
                          href={index % 2 === 0 ? 'https://10minuteschool.com' : 'https://udvash.com'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-black text-[#B45309] hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded border border-amber-300"
                        >
                          <span>{t('Free PDF', 'ফ্রি শিট')}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-amber-700" />
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* High-Converting Ad Slot between tests: exactly 2 tests above, 2 tests below */}
                  {showAdAfter && (
                    <div className="col-span-1 sm:col-span-2 py-1">
                      <AdSlot
                        type="mid_banner"
                        customLabel={t('FEATURED ADMISSION SPONSOR', 'অফিসিয়াল স্পন্সর পার্টনার')}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Prominent High-Visibility Ad Banner Below All Mock Tests */}
            <div className="col-span-1 sm:col-span-2 pt-2">
              <AdSlot
                type="mock_tests_banner"
                customLabel="OFFICIAL ADMISSION MOCK PARTNER"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar: Weekly Leaderboard + Sidebar Ad (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Weekly Leaderboard Preview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-sm font-bold text-slate-900">
                  {t('Weekly Top Scorers', 'সাপ্তাহিক শীর্ষ স্কোরার')}
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#F59E0B] uppercase bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">
                Live Rank
              </span>
            </div>

            <div className="space-y-3">
              {leaderboard.map(item => (
                <div key={item.rank} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                      item.rank === 1 ? 'bg-[#F59E0B] text-white shadow-2xs' : item.rank === 2 ? 'bg-slate-300 text-slate-800' : item.rank === 3 ? 'bg-amber-700/20 text-amber-900' : 'text-slate-500'
                    }`}>
                      {item.rank}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-500">{item.institute}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#1E3A8A] tabular-nums">{item.score}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500">
                {t('Complete tests to earn leaderboard points and streak badges.', 'টেস্ট সম্পন্ন করে লিডারবোর্ডে নিজের নাম তুলুন।')}
              </p>
            </div>
          </div>

          {/* AD SPACE: Sidebar Rectangle on desktop */}
          <AdSlot type="sidebar" />

        </aside>

      </div>

    </div>
  );
};
