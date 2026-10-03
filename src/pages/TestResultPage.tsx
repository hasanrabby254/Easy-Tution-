import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TestResult, MockTest } from '../types';
import { AdSlot } from '../components/AdSlot';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  ArrowLeft,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Flame
} from 'lucide-react';

interface TestResultPageProps {
  result: TestResult;
  onRetake: (testId: string) => void;
  onBackToTests: () => void;
  onShare: (title: string, url: string) => void;
}

export const TestResultPage: React.FC<TestResultPageProps> = ({
  result,
  onRetake,
  onBackToTests,
  onShare
}) => {
  const { mockTests, t, lang } = useApp();
  const [showReview, setShowReview] = useState(true);

  const test: MockTest | undefined = mockTests.find(m => m.id === result.testId);

  // Encouraging message based on percentage
  const getFeedbackMessage = (score: number) => {
    if (score >= 80) {
      return {
        titleEn: 'Outstanding Achievement!',
        titleBn: 'চমৎকার ও অসাধারণ ফলাফল!',
        subEn: 'You showed remarkable mastery over the core concepts. Keep up this brilliant momentum!',
        subBn: 'মূল বিষয়গুলোতে আপনার চমৎকার দক্ষতা প্রমাণিত হয়েছে। নিয়মিত অনুশীলন অব্যাহত রাখুন!'
      };
    } else if (score >= 60) {
      return {
        titleEn: 'Commendable Effort!',
        titleBn: 'খুব ভালো চেষ্টা!',
        subEn: 'Good solid foundation! Review the missed questions below to cement your weak spots.',
        subBn: 'আপনার প্রস্তুতি বেশ ভালো। নিচের ভুল হওয়া প্রশ্নগুলোর নির্ভুল ব্যাখ্যাগুলো দেখে নিন।'
      };
    } else {
      return {
        titleEn: 'Valuable Learning Step!',
        titleBn: 'অনুশীলনের মাধ্যমে আরও এগিয়ে যান!',
        subEn: 'Do not be discouraged. Review the answers below and connect with a mentor to clear tricky topics.',
        subBn: 'হতাশ হওয়ার কিছু নেই। ব্যাখ্যাগুলো ভালোভাবে পড়ুন এবং প্রয়োজনে অভিজ্ঞ গৃহশিক্ষকের সহায়তা নিন।'
      };
    }
  };

  const feedback = getFeedbackMessage(result.score);

  const formatMinutesSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Top action breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToTests}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1E3A8A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
          <span>{t('Back to Mock Tests', 'সকল মক টেস্টে ফিরুন')}</span>
        </button>

        <button
          onClick={() => onShare(`I scored ${result.score}% in ${result.testTitle} on Easy Tution!`, window.location.href)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t('Share Result', 'ফলাফল শেয়ার করুন')}</span>
        </button>
      </div>

      {/* 1. Score Summary Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs text-center space-y-6">
        
        {/* Score Ring */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E2E8F0"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Foreground progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={result.score >= 70 ? '#1E3A8A' : result.score >= 50 ? '#F59E0B' : '#E11D48'}
              strokeWidth="8"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * result.score) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {result.score}%
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {t('Score', 'স্কোর')}
            </span>
          </div>
        </div>

        {/* Feedback Message */}
        <div className="max-w-md mx-auto space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F59E0B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t(feedback.titleEn, feedback.titleBn)}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {result.testTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t(feedback.subEn, feedback.subBn)}
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto pt-2">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-center gap-1 text-[#2E8B6A] mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold">{t('Correct', 'সঠিক')}</span>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">
              {result.correctCount}
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-center gap-1 text-rose-600 mb-1">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">{t('Wrong', 'ভুল')}</span>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">
              {result.wrongCount}
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">{t('Skipped', 'বাকি')}</span>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">
              {result.skippedCount}
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-center gap-1 text-[#F59E0B] mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold">{t('Time Taken', 'সময়')}</span>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">
              {formatMinutesSeconds(result.timeTakenSeconds)}
            </span>
          </div>
        </div>

        {/* Actions row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={() => onRetake(result.testId)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#1E3A8A]" />
            <span>{t('Retake Test', 'পুনরায় পরীক্ষা দিন')}</span>
          </button>

          <button
            onClick={() => setShowReview(!showReview)}
            className="px-6 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF] flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <span>{showReview ? t('Hide Solutions', 'সমাধান লুকান') : t('Review Solutions', 'উত্তর ও ব্যাখ্যা দেখুন')}</span>
            {showReview ? <ChevronUp className="w-3.5 h-3.5 text-[#F59E0B]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#F59E0B]" />}
          </button>
        </div>

      </div>

      {/* AD SPACE: Student Reward Voucher & Sponsorship Banner */}
      <AdSlot type="exam_reward_ad" />
      <AdSlot type="top_banner" />

      {/* 2. Answer Review View */}
      {showReview && test && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              {t('Detailed Solutions & Explanations', 'বিস্তারিত সমাধান ও ব্যাখ্যা')}
            </h3>
            <span className="text-xs text-slate-500">
              {test.questions.length} {t('Questions Explained', 'টি প্রশ্নের ব্যাখ্যা')}
            </span>
          </div>

          <div className="space-y-6">
            {test.questions.map((q, idx) => {
              const selectedOpt = result.userAnswers[idx];
              const isCorrect = selectedOpt === q.correctIndex;
              const isSkipped = selectedOpt === undefined;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                      {t('Question', 'প্রশ্ন')} {idx + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-emerald-50 text-[#2E8B6A]'
                          : isSkipped
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {isCorrect && <CheckCircle2 className="w-3 h-3" />}
                      {!isCorrect && !isSkipped && <XCircle className="w-3 h-3" />}
                      {isCorrect
                        ? t('Correct', 'সঠিক')
                        : isSkipped
                        ? t('Skipped', 'উপেক্ষিত')
                        : t('Incorrect', 'ভুল উত্তর')}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {lang === 'bn' && q.textBn ? q.textBn : q.text}
                  </p>

                  {/* Option tiles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {(lang === 'bn' && q.optionsBn ? q.optionsBn : q.options).map((opt, optIdx) => {
                      const isCorrectChoice = optIdx === q.correctIndex;
                      const isUserChoice = optIdx === selectedOpt;

                      let optClass = "border-slate-200 bg-white text-slate-800";
                      if (isCorrectChoice) {
                        optClass = "border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold";
                      } else if (isUserChoice && !isCorrectChoice) {
                        optClass = "border-rose-400 bg-rose-50 text-rose-900 font-medium";
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-[11px] shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isCorrectChoice && (
                            <span className="text-[10px] font-bold text-[#2E8B6A] uppercase tracking-wider shrink-0">
                              {t('Correct', 'সঠিক')}
                            </span>
                          )}
                          {isUserChoice && !isCorrectChoice && (
                            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider shrink-0">
                              {t('Your Choice', 'আপনার উত্তর')}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                    <span className="font-bold text-[#1E3A8A] block">
                      {t('Concept & Solution Explanation:', 'ব্যাখ্যা ও সূত্র:')}
                    </span>
                    <p className="leading-relaxed">
                      {lang === 'bn' && q.explanationBn ? q.explanationBn : q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* High-Converting Bottom Ad after review */}
          <div className="pt-4">
            <AdSlot
              type="mid_banner"
              customLabel="NEXT STEP ADMISSION SPONSOR · পরবর্তী প্রস্তুতি স্পন্সর"
            />
          </div>
        </div>
      )}

    </div>
  );
};
