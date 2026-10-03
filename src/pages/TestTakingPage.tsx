import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { MockTest, TestResult } from '../types';
import { AdSlot } from '../components/AdSlot';
import {
  Clock,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle2,
  AlertTriangle,
  Send,
  HelpCircle
} from 'lucide-react';

interface TestTakingPageProps {
  testId: string;
  onFinishTest: (result: TestResult) => void;
  onCancel: () => void;
}

export const TestTakingPage: React.FC<TestTakingPageProps> = ({
  testId,
  onFinishTest,
  onCancel
}) => {
  const { mockTests, saveTestResult, t, lang } = useApp();

  const test: MockTest = mockTests.find(t => t.id === testId) || mockTests[0];

  const totalQuestions = test.questions.length;
  const totalDurationSeconds = test.durationMinutes * 60;

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(totalDurationSeconds);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const currentQ = test.questions[currentIndex];

  // Submit test calculation
  const handleSubmitTest = useCallback(() => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    test.questions.forEach((q, idx) => {
      const selected = answers[idx];
      if (selected === undefined) {
        skipped++;
      } else if (selected === q.correctIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = Math.round((correct / totalQuestions) * 100);
    const timeTaken = totalDurationSeconds - timeLeft;

    const result: TestResult = {
      id: `result-${Date.now()}`,
      testId: test.id,
      testTitle: lang === 'bn' && test.titleBn ? test.titleBn : test.title,
      score,
      totalQuestions,
      correctCount: correct,
      wrongCount: wrong,
      skippedCount: skipped,
      timeTakenSeconds: timeTaken > 0 ? timeTaken : 1,
      completedAt: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      userAnswers: answers
    };

    saveTestResult(result);
    onFinishTest(result);
  }, [answers, test, totalQuestions, totalDurationSeconds, timeLeft, lang, onFinishTest, saveTestResult]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmitTest]);

  // Keyboard navigation support: 1-4 for options, ArrowLeft for Prev, ArrowRight for Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSubmitModal || showExitModal) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const optIndex = parseInt(e.key, 10) - 1;
        setAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
      } else if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, showSubmitModal, showExitModal]);

  // Format time (mm:ss)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const selectOption = (optIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: optIndex
    }));
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-between">
      
      {/* 1. Distraction-Free Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#ECE8E0] px-4 sm:px-6 py-3.5 shadow-2xs">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExitModal(true)}
              className="text-xs font-semibold text-[#6B6760] hover:text-[#C8553D] px-2.5 py-1.5 rounded-lg border border-[#ECE8E0] hover:border-rose-300 transition-colors"
            >
              {t('Exit Test', 'বাতিল করুন')}
            </button>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#1C1B1F] truncate max-w-[200px] sm:max-w-md">
                {lang === 'bn' && test.titleBn ? test.titleBn : test.title}
              </h2>
              <span className="text-[11px] text-[#6B6760]">
                {t('Question', 'প্রশ্ন')} <strong className="text-[#272A6B]">{currentIndex + 1}</strong> / {totalQuestions}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Timer with Warning Color */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-xs sm:text-sm tabular-nums ${
                timeLeft < 120
                  ? 'bg-rose-50 border-rose-300 text-[#C8553D] animate-pulse'
                  : 'bg-[#FBF9F5] border-[#ECE8E0] text-[#1C1B1F]'
              }`}
            >
              <Clock className="w-4 h-4 text-[#D9A441]" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#272A6B] hover:bg-[#202256] rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('Submit Test', 'জমা দিন')}</span>
              <span className="sm:hidden">{t('Submit', 'জমা')}</span>
            </button>
          </div>

        </div>

        {/* Gold progress bar */}
        <div className="w-full bg-[#ECE8E0] h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-[#D9A441] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* 2. Main Question Stage + Navigator Grid */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Question Card (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#ECE8E0] p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Top row: Q-number & Mark for review */}
            <div className="flex items-center justify-between pb-4 border-b border-[#ECE8E0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#272A6B]">
                {t('Question', 'প্রশ্ন')} {currentIndex + 1} {t('of', 'এর')} {totalQuestions}
              </span>
              <button
                onClick={toggleMarkForReview}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                  markedForReview[currentIndex]
                    ? 'border-[#D9A441] bg-[#D9A441]/10 text-[#916515]'
                    : 'border-[#ECE8E0] text-[#6B6760] hover:text-[#1C1B1F]'
                }`}
              >
                <Flag className="w-3.5 h-3.5" fill={markedForReview[currentIndex] ? 'currentColor' : 'none'} />
                <span>
                  {markedForReview[currentIndex]
                    ? t('Marked for Review', 'রিভিউয়ের জন্য চিহ্নিত')
                    : t('Mark for Review', 'রিভিউ মার্ক করুন')}
                </span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-bold text-[#1C1B1F] leading-snug">
              {lang === 'bn' && currentQ.textBn ? currentQ.textBn : currentQ.text}
            </div>

            {/* 4 Option Tiles (A, B, C, D) with Blue Selected State */}
            <div className="space-y-3 pt-2">
              {(lang === 'bn' && currentQ.optionsBn ? currentQ.optionsBn : currentQ.options).map((option, optIdx) => {
                const isSelected = answers[currentIndex] === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    onClick={() => selectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1E3A8A] bg-blue-50/60 text-[#1E3A8A] ring-2 ring-[#1E3A8A]/20 font-bold'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-[#1E3A8A] text-white'
                            : 'bg-slate-100 border border-slate-200 text-slate-600'
                        }`}
                      >
                        {letter}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls: Prev, Next */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t('Previous', 'পূর্ববর্তী')}</span>
              </button>

              {/* Keyboard tip */}
              <span className="hidden sm:inline text-[11px] text-slate-400">
                {t('Tip: Use keys 1-4 to select options, arrow keys to navigate', 'কীবোর্ডের ১-৪ চেপে অপশন সিলেক্ট করুন')}
              </span>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>{t('Next', 'পরবর্তী')}</span>
                  <ChevronRight className="w-4 h-4 text-[#F59E0B]" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>{t('Finish & Submit', 'সম্পন্ন করুন')}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                </button>
              )}
            </div>

            {/* High-Converting Ad Slot Right Under Mock Test Question */}
            <div className="pt-2">
              <AdSlot
                type="mock_tests_banner"
                customLabel="LIVE EXAM PREP SPONSOR · মক টেস্ট স্পন্সর"
              />
            </div>

          </div>

          {/* Question Navigator Panel (4 cols) */}
          <aside className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-900 mb-1">
                {t('Question Navigator', 'প্রশ্ন নেভিগেটর')}
              </h3>
              <p className="text-xs text-slate-500">
                {answeredCount} {t('of', 'এর')} {totalQuestions} {t('answered', 'উত্তর দিয়েছেন')}
              </p>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-500 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#1E3A8A]" />
                <span>{t('Answered', 'উত্তর দিয়েছেন')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#F59E0B]" />
                <span>{t('Review', 'রিভিউ')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white border border-slate-200" />
                <span>{t('Skipped', 'বাকি')}</span>
              </div>
            </div>

            {/* Number grid (1..total) */}
            <div className="grid grid-cols-5 gap-2.5">
              {test.questions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isMarked = markedForReview[idx];
                const isCurrent = idx === currentIndex;

                let btnClass = "bg-white border-slate-200 text-slate-800 hover:bg-slate-50";
                if (isCurrent) {
                  btnClass = "ring-2 ring-[#1E3A8A] font-extrabold";
                }
                if (isMarked) {
                  btnClass += " bg-[#F59E0B] text-slate-950 font-bold border-[#F59E0B]";
                } else if (isAnswered) {
                  btnClass += " bg-[#1E3A8A] text-white border-[#1E3A8A]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-3 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF] transition-all shadow-xs cursor-pointer"
              >
                {t('Submit Answers', 'পরীক্ষা জমা দিন')}
              </button>
            </div>

            {/* Sidebar Ad Inside Question Navigator */}
            <div className="pt-2 border-t border-amber-200">
              <AdSlot type="sidebar" />
            </div>
          </aside>

        </div>
      </main>

      {/* 3. Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center mx-auto border border-blue-100">
              <CheckCircle2 className="w-6 h-6 text-[#1E3A8A]" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                {t('Ready to submit your test?', 'পরীক্ষা জমা দিতে প্রস্তুত?')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('You have answered', 'আপনি')} <strong className="text-[#1E3A8A]">{answeredCount}</strong> {t('out of', 'এর মধ্যে')} {totalQuestions} {t('questions.', 'টি প্রশ্নের উত্তর দিয়েছেন।')}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 grid grid-cols-2 text-center text-xs">
              <div>
                <span className="text-slate-500 block">{t('Answered', 'উত্তরকৃত')}</span>
                <span className="font-bold text-[#1E3A8A]">{answeredCount}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('Remaining', 'অবশিষ্ট')}</span>
                <span className="font-bold text-rose-600">{totalQuestions - answeredCount}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                {t('Keep Practicing', 'ফিরে যান')}
              </button>
              <button
                onClick={handleSubmitTest}
                className="py-2.5 px-3 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF]"
              >
                {t('Confirm & Submit', 'নিশ্চিত করুন')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                {t('Exit Mock Test?', 'পরীক্ষা বাতিল করবেন?')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('Your progress will not be saved if you leave now.', 'এখন বের হলে কোনো ফলাফল সংরক্ষিত হবে না।')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
              >
                {t('Stay', 'থাকুন')}
              </button>
              <button
                onClick={onCancel}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                {t('Exit Test', 'বাতিল')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
