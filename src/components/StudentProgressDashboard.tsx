import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TestResult } from '../types';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  BookOpen,
  ArrowUpRight,
  BarChart3,
  Flame,
  RotateCcw,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface StudentProgressDashboardProps {
  onSelectTest?: (testId: string) => void;
  className?: string;
}

export const StudentProgressDashboard: React.FC<StudentProgressDashboardProps> = ({
  onSelectTest,
  className = ''
}) => {
  const { testResults, mockTests, t, lang, navigateTo } = useApp();

  const [timeRange, setTimeRange] = useState<'all' | '30days' | '7days'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Helper to extract subject name from test title or mock test reference
  const getSubjectForTest = (res: TestResult): string => {
    const matched = mockTests.find(m => m.id === res.testId);
    if (matched) return matched.subject;
    const title = res.testTitle.toLowerCase();
    if (title.includes('physics') || title.includes('পদার্থ')) return 'Physics';
    if (title.includes('math') || title.includes('গণিত')) return 'Math';
    if (title.includes('chemistry') || title.includes('রসায়ন')) return 'Chemistry';
    if (title.includes('english') || title.includes('ইংরেজি')) return 'English';
    if (title.includes('ict') || title.includes('আইসিটি')) return 'ICT';
    if (title.includes('biology') || title.includes('জীববিজ্ঞান')) return 'Biology';
    return 'General';
  };

  // Filter test results by time range and subject
  const filteredResults = useMemo(() => {
    return testResults.filter(res => {
      // Subject filter
      if (selectedSubject !== 'all') {
        const sub = getSubjectForTest(res);
        if (sub !== selectedSubject) return false;
      }

      // Time range filter
      if (timeRange !== 'all') {
        const testDate = new Date(res.completedAt);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24));
        if (timeRange === '7days' && diffDays > 7) return false;
        if (timeRange === '30days' && diffDays > 30) return false;
      }

      return true;
    });
  }, [testResults, timeRange, selectedSubject, mockTests]);

  // Aggregate Metrics
  const totalCompleted = filteredResults.length;
  
  const averageScore = useMemo(() => {
    if (totalCompleted === 0) return 0;
    const sum = filteredResults.reduce((acc, r) => acc + (r.score || 0), 0);
    return Math.round(sum / totalCompleted);
  }, [filteredResults, totalCompleted]);

  const highestScore = useMemo(() => {
    if (totalCompleted === 0) return 0;
    return Math.max(...filteredResults.map(r => r.score || 0));
  }, [filteredResults, totalCompleted]);

  const totalQuestions = useMemo(() => {
    return filteredResults.reduce((acc, r) => acc + (r.totalQuestions || 0), 0);
  }, [filteredResults]);

  const totalCorrect = useMemo(() => {
    return filteredResults.reduce((acc, r) => acc + (r.correctCount || 0), 0);
  }, [filteredResults]);

  const totalWrong = useMemo(() => {
    return filteredResults.reduce((acc, r) => acc + (r.wrongCount || 0), 0);
  }, [filteredResults]);

  const totalSkipped = useMemo(() => {
    return filteredResults.reduce((acc, r) => acc + (r.skippedCount || 0), 0);
  }, [filteredResults]);

  const accuracyRate = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Math.round((totalCorrect / totalQuestions) * 100);
  }, [totalCorrect, totalQuestions]);

  const totalStudyMinutes = useMemo(() => {
    const totalSecs = filteredResults.reduce((acc, r) => acc + (r.timeTakenSeconds || 0), 0);
    return Math.round(totalSecs / 60);
  }, [filteredResults]);

  // Chronological trend data for Recharts AreaChart
  const trendData = useMemo(() => {
    // Sort chronological: oldest to newest
    const sorted = [...filteredResults].sort((a, b) => {
      return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
    });

    return sorted.map((res, idx) => {
      const subject = getSubjectForTest(res);
      // Format readable date
      let displayDate = res.completedAt;
      try {
        const d = new Date(res.completedAt);
        displayDate = d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
          month: 'short',
          day: 'numeric'
        });
      } catch {
        displayDate = res.completedAt;
      }

      return {
        id: res.id,
        testId: res.testId,
        index: idx + 1,
        testTitle: res.testTitle,
        shortTitle: res.testTitle.split(':')[0] || res.testTitle.slice(0, 16),
        displayDate,
        score: res.score,
        correct: res.correctCount,
        wrong: res.wrongCount,
        subject,
        benchmark: 80
      };
    });
  }, [filteredResults, lang]);

  // Subject-wise performance aggregation for BarChart
  const subjectPerformance = useMemo(() => {
    const map: Record<string, { totalScore: number; count: number; nameBn: string }> = {};

    const subjectTranslations: Record<string, string> = {
      Physics: 'পদার্থবিজ্ঞান',
      Math: 'উচ্চতর গণিত',
      Chemistry: 'রসায়ন',
      English: 'ইংরেজি',
      ICT: 'আইসিটি',
      Biology: 'জীববিজ্ঞান',
      General: 'সাধারণ'
    };

    filteredResults.forEach(res => {
      const sub = getSubjectForTest(res);
      if (!map[sub]) {
        map[sub] = {
          totalScore: 0,
          count: 0,
          nameBn: subjectTranslations[sub] || sub
        };
      }
      map[sub].totalScore += res.score;
      map[sub].count += 1;
    });

    return Object.entries(map).map(([name, data]) => {
      const avg = Math.round(data.totalScore / data.count);
      return {
        subject: name,
        displayName: lang === 'bn' ? data.nameBn : name,
        averageScore: avg,
        testsCount: data.count
      };
    }).sort((a, b) => b.averageScore - a.averageScore);
  }, [filteredResults, lang]);

  // Accuracy Pie Data
  const accuracyPieData = useMemo(() => {
    if (totalQuestions === 0) {
      return [
        { name: t('Correct', 'সঠিক'), value: 1, color: '#10B981' }
      ];
    }
    return [
      { name: t('Correct', 'সঠিক'), value: totalCorrect, color: '#10B981' },
      { name: t('Incorrect', 'ভুল'), value: totalWrong, color: '#EF4444' },
      { name: t('Skipped', 'বাদ দেওয়া'), value: totalSkipped, color: '#94A3B8' }
    ];
  }, [totalQuestions, totalCorrect, totalWrong, totalSkipped, t]);

  // Weakest & Strongest Subject Insights
  const strongestSubject = subjectPerformance.length > 0 ? subjectPerformance[0] : null;
  const weakestSubject = subjectPerformance.length > 1 ? subjectPerformance[subjectPerformance.length - 1] : null;

  // Custom Tooltip for Area Trend Chart
  const CustomTrendTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[210px]">
          <p className="font-bold text-white leading-snug line-clamp-1">{data.testTitle}</p>
          <div className="flex items-center justify-between text-slate-300 text-[11px] pt-1 border-t border-slate-800">
            <span>{t('Date', 'তারিখ')}:</span>
            <span className="font-medium text-white">{data.displayDate}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300 text-[11px]">
            <span>{t('Score', 'প্রাপ্ত স্কোর')}:</span>
            <span className="font-bold text-[#F59E0B] text-sm tabular-nums">{data.score}%</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-0.5">
            <span className="text-emerald-400">{data.correct} {t('Correct', 'সঠিক')}</span>
            <span className="text-rose-400">{data.wrong} {t('Wrong', 'ভুল')}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Subject Bar Chart
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 text-xs space-y-1 min-w-[170px]">
          <p className="font-bold text-slate-900 text-sm">{data.displayName}</p>
          <div className="flex items-center justify-between text-slate-600">
            <span>{t('Average Score', 'গড় স্কোর')}:</span>
            <span className="font-extrabold text-[#1E3A8A] text-sm tabular-nums">{data.averageScore}%</span>
          </div>
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>{t('Tests Taken', 'টেস্ট সংখ্যা')}:</span>
            <span className="font-semibold text-slate-800">{data.testsCount}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-8 ${className}`}>
      
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t('Learning Progress & Mock Test Analytics', 'শিক্ষার অগ্রগতি ও মক টেস্ট অ্যানালিটিক্স')}
              </h2>
            </div>
            {/* Clean unboxed metadata with typographic separators (anti-slop rule) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2 font-medium">
              <span>{totalCompleted} {t('Tests Analyzed', 'টি পরীক্ষা বিশ্লেষিত')}</span>
              <span aria-hidden="true">·</span>
              <span>{averageScore}% {t('Average Score', 'গড় স্কোর')}</span>
              <span aria-hidden="true">·</span>
              <span>{totalQuestions} {t('Questions Practiced', 'টি প্রশ্ন অনুশীলন')}</span>
              <span aria-hidden="true">·</span>
              <span>{totalStudyMinutes} {t('Mins Study Time', 'মিনিট সক্রিয় অনুশীলন')}</span>
            </div>
          </div>

          {/* Interactive Filters: Timeframe & Subject Segmented Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Subject Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedSubject === 'all'
                    ? 'bg-white text-[#1E3A8A] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('All Subjects', 'সকল বিষয়')}
              </button>
              {['Physics', 'Math', 'Chemistry'].map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectedSubject === sub
                      ? 'bg-white text-[#1E3A8A] shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sub === 'Physics' ? t('Physics', 'পদার্থ') : sub === 'Math' ? t('Math', 'গণিত') : t('Chemistry', 'রসায়ন')}
                </button>
              ))}
            </div>

            {/* Timeframe Control */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setTimeRange('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  timeRange === 'all'
                    ? 'bg-white text-[#1E3A8A] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('All Time', 'সর্বকালের')}
              </button>
              <button
                onClick={() => setTimeRange('30days')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  timeRange === '30days'
                    ? 'bg-white text-[#1E3A8A] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('30 Days', '৩০ দিন')}
              </button>
              <button
                onClick={() => setTimeRange('7days')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  timeRange === '7days'
                    ? 'bg-white text-[#1E3A8A] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('7 Days', '৭ দিন')}
              </button>
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
          {/* Stat 1: Tests Completed */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {t('Tests Completed', 'মক টেস্ট সম্পন্ন')}
              </span>
              <BookOpen className="w-4 h-4 text-[#1E3A8A]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                {totalCompleted}
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                100% {t('Done', 'সম্পন্ন')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {t('Verified real-time attempts', 'টাইমারসহ যাচাইকৃত প্রচেষ্টা')}
            </p>
          </div>

          {/* Stat 2: Average Score */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {t('Average Score', 'গড় স্কোর')}
              </span>
              <Award className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] tabular-nums">
                {averageScore}%
              </span>
              <span className="text-xs font-semibold text-[#F59E0B]">
                {t('High: ', 'সর্বোচ্চ: ')}{highestScore}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {averageScore >= 80 ? t('Mastery level achieved', 'উচ্চ দক্ষতার স্তর') : t('Targeting 80% mastery', '৮০% দক্ষতা অর্জনের লক্ষ্য')}
            </p>
          </div>

          {/* Stat 3: Accuracy Rate */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {t('Accuracy Rate', 'সঠিক উত্তরের হার')}
              </span>
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tabular-nums">
                {accuracyRate}%
              </span>
              <span className="text-xs text-slate-500">
                {totalCorrect}/{totalQuestions}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {totalWrong} {t('incorrect', 'ভুল')} · {totalSkipped} {t('skipped', 'ছেড়ে দেওয়া')}
            </p>
          </div>

          {/* Stat 4: Study Time Invested */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {t('Practice Time', 'অনুশীলন সময়')}
              </span>
              <Clock className="w-4 h-4 text-[#1E3A8A]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                {totalStudyMinutes}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {t('Minutes', 'মিনিট')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              ~{totalCompleted > 0 ? Math.round(totalStudyMinutes / totalCompleted) : 0} {t('mins avg per test', 'মিনিট প্রতি টেস্টে')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Charts Row: Trend Line/Area Chart (8 cols) + Subject Breakdown / Accuracy (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Score Trend Line / Area Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {t('Score Evolution & Learning Trends', 'স্কোরের গতিপ্রকৃতি ও লার্নিং ট্রেন্ড')}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('Chronological performance across completed mock tests with 80% mastery target', 'সম্পন্ন মক টেস্টগুলোতে ধারাবাহিক স্কোরের পরিবর্তন ও ৮০% লক্ষ্যমাত্রা')}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
                <span>{t('Your Score %', 'আপনার স্কোর')}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-400">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-[#F59E0B]" />
                <span>80% {t('Target', 'লক্ষ্য')}</span>
              </div>
            </div>
          </div>

          {trendData.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-medium text-slate-600">
                {t('No tests completed for this filter criteria.', 'নির্বাচিত ফিল্টারে কোনো পরীক্ষার তথ্য পাওয়া যায়নি।')}
              </p>
              <button
                onClick={() => {
                  setTimeRange('all');
                  setSelectedSubject('all');
                }}
                className="px-4 py-2 text-xs font-semibold text-[#1E3A8A] bg-blue-50 hover:bg-blue-100 rounded-xl"
              >
                {t('Reset Filters', 'ফিল্টার রিসেট করুন')}
              </button>
            </div>
          ) : (
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 15, right: 15, left: -20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="displayDate"
                    tick={{ fontSize: 11, fill: '#64748B' }}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 11, fill: '#64748B' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={v => `${v}%`}
                  />
                  <Tooltip content={<CustomTrendTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#1E3A8A"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#scoreColor)"
                    activeDot={{ r: 6, fill: '#F59E0B', stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Actionable recommendations below the trend chart */}
          {strongestSubject && (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {t('Performance Insight:', 'অগ্রগতির মূল্যায়ন:')}{' '}
                    <span className="text-[#1E3A8A]">{strongestSubject.displayName}</span> {t('is your strongest subject with', 'আপনার শীর্ষ বিষয়, গড় স্কোর')}{' '}
                    <span className="font-extrabold">{strongestSubject.averageScore}%</span>!
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {weakestSubject && weakestSubject.averageScore < 80
                      ? t(
                          `Take another mock test in ${weakestSubject.displayName} (${weakestSubject.averageScore}%) to reach overall 85%+ mastery.`,
                          `${weakestSubject.displayName}-এ (${weakestSubject.averageScore}%) আরও একটি মক টেস্ট দিয়ে সামগ্রিক দক্ষতা বাড়ান।`
                        )
                      : t(
                          'Consistent test practice significantly enhances speed and accuracy in exams.',
                          'নিয়মিত মক টেস্ট দেওয়ার ফলে প্রশ্নের উত্তর দেওয়ার গতি এবং নির্ভুলতা বহুলাংশে বৃদ্ধি পাচ্ছে।'
                        )}
                  </p>
                </div>
              </div>

              {weakestSubject && (
                <button
                  onClick={() => {
                    const test = mockTests.find(m => m.subject.toLowerCase() === weakestSubject.subject.toLowerCase());
                    if (test && onSelectTest) {
                      onSelectTest(test.id);
                    } else {
                      navigateTo('tests');
                    }
                  }}
                  className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>{t('Practice Revision', 'রিভিশন টেস্ট দিন')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Subject Average Scores & Accuracy Donut */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Subject Average Scores BarChart */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {t('Subject Average Scores', 'বিষয়ভিত্তিক গড় স্কোর')}
              </h3>
              <span className="text-[11px] font-medium text-slate-500">
                {subjectPerformance.length} {t('Subjects', 'টি বিষয়')}
              </span>
            </div>

            {subjectPerformance.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                {t('No subject data found for this selection.', 'কোনো বিষয়ের তথ্য পাওয়া যায়নি।')}
              </p>
            ) : (
              <div className="w-full h-[190px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectPerformance}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="displayName"
                      tick={{ fontSize: 10, fill: '#64748B' }}
                      tickLine={false}
                      axisLine={{ stroke: '#E2E8F0' }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 50, 100]}
                      tick={{ fontSize: 10, fill: '#64748B' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={v => `${v}%`}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar
                      dataKey="averageScore"
                      fill="#1E3A8A"
                      radius={[6, 6, 0, 0]}
                    >
                      {subjectPerformance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.averageScore >= 85
                              ? '#10B981'
                              : entry.averageScore >= 75
                              ? '#1E3A8A'
                              : '#F59E0B'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Micro list of subjects */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              {subjectPerformance.slice(0, 4).map(sub => (
                <div key={sub.subject} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        sub.averageScore >= 85
                          ? 'bg-emerald-500'
                          : sub.averageScore >= 75
                          ? 'bg-[#1E3A8A]'
                          : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-semibold text-slate-800">{sub.displayName}</span>
                    <span className="text-[10px] text-slate-400">({sub.testsCount} {t('tests', 'পরীক্ষা')})</span>
                  </div>
                  <span className="font-extrabold text-slate-900 tabular-nums">{sub.averageScore}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accuracy Breakdown (Donut Chart) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {t('Question Accuracy Breakdown', 'প্রশ্ন সমাধানের নির্ভুলতা')}
              </h3>
              <span className="text-[11px] font-semibold text-emerald-600">
                {accuracyRate}% {t('Accuracy', 'নির্ভুল')}
              </span>
            </div>

            <div className="flex items-center justify-center relative h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accuracyPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {accuracyPieData.map((entry, index) => (
                      <Cell key={`slice-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Circle Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-slate-900 tabular-nums leading-tight">
                  {accuracyRate}%
                </span>
                <span className="text-[10px] font-medium text-slate-500">
                  {t('Accurate', 'সঠিক')}
                </span>
              </div>
            </div>

            {/* Legend / Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <span className="text-[10px] text-emerald-700 block font-medium">
                  {t('Correct', 'সঠিক')}
                </span>
                <span className="text-sm font-bold text-emerald-800 tabular-nums">
                  {totalCorrect}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-rose-50/60 border border-rose-100">
                <span className="text-[10px] text-rose-700 block font-medium">
                  {t('Wrong', 'ভুল')}
                </span>
                <span className="text-sm font-bold text-rose-800 tabular-nums">
                  {totalWrong}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-600 block font-medium">
                  {t('Skipped', 'বাদ')}
                </span>
                <span className="text-sm font-bold text-slate-800 tabular-nums">
                  {totalSkipped}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Completed Mock Tests Log with direct Retake & Score Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t('Completed Mock Tests Log', 'সম্পন্ন হওয়া মক টেস্টের তালিকা')}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('Review past attempts, score breakdown, and retake tests for practice', 'অতীত পরীক্ষার ফলাফল পর্যালোচনা করুন এবং পুনরায় পরীক্ষা দিন')}
            </p>
          </div>
          <button
            onClick={() => navigateTo('tests')}
            className="text-xs font-semibold text-[#1E3A8A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('Browse All Mock Tests', 'সকল মক টেস্ট ব্রাউজ করুন')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredResults.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-600">
              {t('No completed tests match the filter criteria.', 'কোনো পরীক্ষা পাওয়া যায়নি।')}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredResults.map(res => {
              const subject = getSubjectForTest(res);
              const durationMins = Math.round((res.timeTakenSeconds || 0) / 60);

              return (
                <div
                  key={res.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 -mx-3 px-3 rounded-2xl transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded-md">
                        {subject}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {res.testTitle}
                      </h4>
                    </div>
                    {/* Unboxed metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{res.completedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-semibold">{res.correctCount} {t('Correct', 'সঠিক')}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-rose-700">{res.wrongCount} {t('Wrong', 'ভুল')}</span>
                      <span aria-hidden="true">·</span>
                      <span>{durationMins || 1} {t('mins taken', 'মিনিট ব্যয়')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span
                        className={`text-lg font-extrabold tabular-nums block leading-none ${
                          res.score >= 85
                            ? 'text-emerald-600'
                            : res.score >= 70
                            ? 'text-[#1E3A8A]'
                            : 'text-amber-600'
                        }`}
                      >
                        {res.score}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {res.score >= 80 ? t('Passed', 'উত্তীর্ণ') : t('Practice more', 'অনুশীলন প্রয়োজন')}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (onSelectTest) {
                          onSelectTest(res.testId);
                        } else {
                          navigateTo('tests');
                        }
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-[#1E3A8A] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t('Retake', 'আবার দিন')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
