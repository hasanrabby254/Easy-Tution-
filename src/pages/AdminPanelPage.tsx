import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MockTest, Question } from '../types';
import { AdSlot } from '../components/AdSlot';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  ShieldAlert,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Layers,
  Users,
  Settings,
  AlertCircle,
  ExternalLink,
  Save,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  BarChart3,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Activity,
  Award,
  ArrowUpRight,
  Copy,
  Check,
  Filter,
  Search,
  BookOpen,
  PieChart as PieIcon,
  Zap,
  Globe,
  Megaphone,
  Building,
  Radio
} from 'lucide-react';

export const AdminPanelPage: React.FC = () => {
  const {
    mockTests,
    addMockTest,
    deleteMockTest,
    tutors,
    toggleTutorVerified,
    adConfigs,
    updateAdConfig,
    saveAllAdConfigs,
    navigateTo,
    t,
    lang,
    showToast
  } = useApp();

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Tabs: overview (charts & metrics), ads (monetization command center), tests (mock tests), tutors (mentor verification)
  const [activeTab, setActiveTab] = useState<'overview' | 'ads' | 'tests' | 'tutors'>('overview');
  const [previewSlot, setPreviewSlot] = useState<string | null>(null);
  const [adFilter, setAdFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [copiedSlotKey, setCopiedSlotKey] = useState<string | null>(null);

  // Local drafts state for Ad Slot editing with explicit Save & Publish
  const [localAdDrafts, setLocalAdDrafts] = useState<Record<string, any>>(() => adConfigs);
  const [justSavedSlotKeys, setJustSavedSlotKeys] = useState<Record<string, boolean>>({});

  // Dedicated Breaking Sponsor & Company Customizer state
  const [tickerDraft, setTickerDraft] = useState({
    sponsorName: adConfigs.breaking_ticker?.sponsorName || '10 Minute School',
    tagline: adConfigs.breaking_ticker?.tagline || '🔥 বিশেষ অফার: সকল অনলাইন ব্যাচ ও মডেল টেস্টে ৫০% ছাড়! প্রোমোকোড: EASY50',
    description: adConfigs.breaking_ticker?.description || 'দেশসেরা শিক্ষকদের লাইভ ক্লাস ও সলভ শীটসহ নতুন ব্যাচে ভর্তি চলছে। সীমিত আসন!',
    ctaText: adConfigs.breaking_ticker?.ctaText || 'অফারটি নিন',
    targetUrl: adConfigs.breaking_ticker?.targetUrl || 'https://10minuteschool.com',
    badgeText: adConfigs.breaking_ticker?.badgeText || 'ব্রেকিং স্পন্সর ⚡',
    enabled: adConfigs.breaking_ticker?.enabled ?? true
  });
  const [isTickerSaved, setIsTickerSaved] = useState(false);

  const [customCompanyPresets, setCustomCompanyPresets] = useState<Array<{
    name: string;
    sponsorName: string;
    tagline: string;
    description: string;
    ctaText: string;
    targetUrl: string;
    badgeText: string;
  }>>(() => {
    try {
      const saved = localStorage.getItem('tm_custom_company_presets');
      return saved ? JSON.parse(saved) : [
        {
          name: 'Walton DigiTech',
          sponsorName: 'Walton DigiTech Laptops & Tablets',
          tagline: '💻 ওয়ালটন স্টুডেন্ট ল্যাপটপ সিরিজে ১০,০০০ টাকা পর্যন্ত ক্যাশব্যাক ও সহজ কিস্তি!',
          description: 'শিক্ষার্থীদের পড়াশোনা ও প্রোগ্রামিং শেখার জন্য বেস্ট বাজেট ল্যাপটপ। ফ্রি ব্যাকপ্যাক!',
          ctaText: 'ল্যাপটপ দেখুন',
          targetUrl: 'https://waltondigitech.com',
          badgeText: 'টেক পার্টনার 💻'
        },
        {
          name: 'Robi Axiata',
          sponsorName: 'Robi 4G Student Pack',
          tagline: '📶 শিক্ষার্থীদের জন্য আনলিমিটেড হাই-স্পিড ইন্টারনেট ও ফ্রি এডুকেশন ডাটা প্যাক!',
          description: 'অনলাইন ক্লাস ও মক টেস্টের জন্য সাশ্রয়ী স্টুডেন্ট ডাটা বান্ডেল। রবি অ্যাপে ইনস্ট্যান্ট একটিভেশন।',
          ctaText: 'প্যাক কিনুন',
          targetUrl: 'https://robi.com.bd',
          badgeText: 'টেলিকম পার্টনার 📶'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setLocalAdDrafts(adConfigs);
    if (adConfigs.breaking_ticker) {
      setTickerDraft({
        sponsorName: adConfigs.breaking_ticker.sponsorName || '',
        tagline: adConfigs.breaking_ticker.tagline || '',
        description: adConfigs.breaking_ticker.description || '',
        ctaText: adConfigs.breaking_ticker.ctaText || 'অফারটি নিন',
        targetUrl: adConfigs.breaking_ticker.targetUrl || 'https://10minuteschool.com',
        badgeText: adConfigs.breaking_ticker.badgeText || 'ব্রেকিং স্পন্সর ⚡',
        enabled: adConfigs.breaking_ticker.enabled ?? true
      });
    }
  }, [adConfigs]);

  // Tutor tab search & filter
  const [tutorSearch, setTutorSearch] = useState('');
  const [tutorStatusFilter, setTutorStatusFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  // New Test Form
  const [testTitle, setTestTitle] = useState('');
  const [testTitleBn, setTestTitleBn] = useState('');
  const [testSubject, setTestSubject] = useState('Physics');
  const [testCategory, setTestCategory] = useState<'SSC' | 'HSC' | 'Admission' | 'General Knowledge' | 'English'>('HSC');
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  // Questions for new test
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q1',
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      showToast(t('Logged in to Admin Panel', 'অ্যাডমিন প্যানেলে স্বাগতম'));
    } else {
      setAuthError(t('Invalid demo password. Hint: admin123', 'ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড: admin123'));
    }
  };

  const handleAddQuestionSlot = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: `q${prev.length + 1}`,
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: ''
      }
    ]);
  };

  const handleUpdateQuestion = (qIdx: number, field: string, value: any) => {
    setQuestions(prev => {
      const copy = [...prev];
      if (field === 'text') copy[qIdx].text = value;
      else if (field === 'correctIndex') copy[qIdx].correctIndex = Number(value);
      else if (field === 'explanation') copy[qIdx].explanation = value;
      return copy;
    });
  };

  const handleUpdateOption = (qIdx: number, optIdx: number, val: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIdx].options[optIdx] = val;
      return copy;
    });
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) {
      showToast('Please provide a test title', 'error');
      return;
    }

    const validQuestions = questions.filter(q => q.text.trim() && q.options[0].trim());
    if (validQuestions.length === 0) {
      showToast('Please fill out at least 1 valid question', 'error');
      return;
    }

    const newTest: MockTest = {
      id: `test-${Date.now()}`,
      title: testTitle,
      titleBn: testTitleBn || testTitle,
      subject: testSubject,
      category: testCategory,
      durationMinutes: Number(durationMinutes),
      difficulty,
      questionCount: validQuestions.length,
      questions: validQuestions,
      totalAttempts: 0
    };

    addMockTest(newTest);
    showToast(t('Mock test created successfully!', 'নতুন মক টেস্ট তৈরি হয়েছে!'));
    setTestTitle('');
    setTestTitleBn('');
    setQuestions([
      {
        id: 'q1',
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: ''
      }
    ]);
  };

  const handleCopyCode = (key: string) => {
    navigator.clipboard.writeText(`<AdSlot type="${key}" />`);
    setCopiedSlotKey(key);
    showToast(t('Placement code copied to clipboard!', 'কোড কপি করা হয়েছে!'));
    setTimeout(() => setCopiedSlotKey(null), 2000);
  };

  // Preset Sponsors for 1-Click Fill
  const SPONSOR_PRESETS = [
    {
      name: '10 Minute School',
      sponsorName: '10 Minute School',
      badgeText: 'Official EdTech Partner',
      tagline: 'Complete Live Masterclass & Routine for HSC 2026',
      description: 'Join Bangladesh’s largest online live interactive classroom with chapter-wise animation notes and 24/7 doubt solving.',
      ctaText: 'Free 7-Day Trial',
      targetUrl: 'https://10minuteschool.com'
    },
    {
      name: 'Udvash Engineering',
      sponsorName: 'Udvash Academic & Admission Care',
      badgeText: 'Engineering Partner',
      tagline: 'BUET & Engineering Admission Exam Routine 2026',
      description: 'Comprehensive question bank practice, concept books, and daily standard written model examinations.',
      ctaText: 'Download Routine',
      targetUrl: 'https://udvash.com'
    },
    {
      name: 'Retina Medical',
      sponsorName: 'Retina Medical & Dental Admission',
      badgeText: 'Medical Entrance Sponsor',
      tagline: 'Target DMC: Medical Admission Mock Test Series',
      description: 'Master biology mnemonics, chemistry equation shortcuts, and GK with verified faculty solutions.',
      ctaText: 'Start Free Mock',
      targetUrl: 'https://retinabd.org'
    },
    {
      name: 'bKash Education',
      sponsorName: 'bKash Education Wallet',
      badgeText: 'Zero-Fee Payment',
      tagline: 'Send Tuition Fees with 0% Cashout & Instant Receipts',
      description: 'No extra charge for students or parents. Safe, secure, and accepted by educators across Bangladesh.',
      ctaText: 'Open Student Wallet',
      targetUrl: 'https://bkash.com'
    }
  ];

  const handleUpdateAdDraft = (key: string, data: Partial<any>) => {
    setLocalAdDrafts(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || adConfigs[key]),
        ...data
      }
    }));
  };

  const handleSaveSingleSlot = (key: string) => {
    const draft = localAdDrafts[key] || adConfigs[key];
    if (!draft) return;
    if (!draft.sponsorName.trim() || !draft.tagline.trim()) {
      showToast(
        lang === 'bn'
          ? 'স্পন্সর প্রতিষ্ঠানের নাম ও ট্যাগলাইন প্রদান করুন'
          : 'Sponsor name and tagline are required',
        'error'
      );
      return;
    }

    updateAdConfig(key, draft, true);
    setJustSavedSlotKeys(prev => ({ ...prev, [key]: true }));
    showToast(
      lang === 'bn'
        ? `"${draft.sponsorName}" বিজ্ঞাপনটি সফলভাবে সেভ হয়েছে এবং ওয়েবসাইটে লাইভ পাবলিশ করা হয়েছে!`
        : `Ad "${draft.sponsorName}" saved and published live to website!`
    );
    setTimeout(() => {
      setJustSavedSlotKeys(prev => ({ ...prev, [key]: false }));
    }, 3000);
  };

  const handleSaveAllSlots = () => {
    saveAllAdConfigs(localAdDrafts);
    showToast(
      lang === 'bn'
        ? 'সকল বিজ্ঞাপন সফলভাবে সেভ হয়েছে এবং ওয়েবসাইটে লাইভ পাবলিশ করা হয়েছে!'
        : 'All ad placements saved and published live to website!'
    );
  };

  const handleApplyPreset = (slotKey: string, preset: typeof SPONSOR_PRESETS[0]) => {
    const updated = {
      ...(localAdDrafts[slotKey] || adConfigs[slotKey]),
      sponsorName: preset.sponsorName,
      badgeText: preset.badgeText,
      tagline: preset.tagline,
      description: preset.description,
      ctaText: preset.ctaText,
      targetUrl: preset.targetUrl,
      enabled: true
    };
    handleUpdateAdDraft(slotKey, updated);
    updateAdConfig(slotKey, updated, true);
    setJustSavedSlotKeys(prev => ({ ...prev, [slotKey]: true }));
    showToast(
      lang === 'bn'
        ? `"${preset.name}" স্পন্সর হিসেবে সেভ ও পাবলিশ করা হয়েছে!`
        : `${preset.name} applied and published to ${slotKey}!`
    );
    setTimeout(() => {
      setJustSavedSlotKeys(prev => ({ ...prev, [slotKey]: false }));
    }, 3000);
  };

  const handleSaveBreakingTicker = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tickerDraft.sponsorName.trim()) {
      showToast(
        lang === 'bn' ? 'অনুগ্রহ করে কোম্পানির নাম লিখুন' : 'Please enter company/sponsor name',
        'error'
      );
      return;
    }
    if (!tickerDraft.tagline.trim()) {
      showToast(
        lang === 'bn' ? 'বিজ্ঞাপনের অফার বা শিরোনাম লিখুন' : 'Please enter offer headline or tagline',
        'error'
      );
      return;
    }

    const updatedConfig = {
      id: 'ad-breaking-ticker',
      slotName: 'breaking_ticker',
      sponsorName: tickerDraft.sponsorName.trim(),
      tagline: tickerDraft.tagline.trim(),
      description: tickerDraft.description.trim(),
      ctaText: tickerDraft.ctaText.trim() || (lang === 'bn' ? 'অফারটি নিন' : 'Claim Offer'),
      targetUrl: tickerDraft.targetUrl.trim() || 'https://google.com',
      badgeText: tickerDraft.badgeText.trim() || (lang === 'bn' ? 'ব্রেকিং স্পন্সর ⚡' : 'BREAKING SPONSOR ⚡'),
      enabled: tickerDraft.enabled
    };

    updateAdConfig('breaking_ticker', updatedConfig, true);
    handleUpdateAdDraft('breaking_ticker', updatedConfig);
    setIsTickerSaved(true);
    showToast(
      lang === 'bn'
        ? `"${tickerDraft.sponsorName}" সফলভাবে ব্রেকিং স্পন্সরে সেভ হয়েছে এবং পুরো ওয়েবসাইটে লাইভ হয়েছে!`
        : `"${tickerDraft.sponsorName}" saved and published live to Breaking Sponsor ticker!`
    );
    setTimeout(() => setIsTickerSaved(false), 3000);
  };

  const handleSaveAsCompanyPreset = () => {
    if (!tickerDraft.sponsorName.trim()) {
      showToast(lang === 'bn' ? 'কোম্পানির নাম লিখুন' : 'Enter company name', 'error');
      return;
    }
    const newPreset = {
      name: tickerDraft.sponsorName.trim(),
      sponsorName: tickerDraft.sponsorName.trim(),
      tagline: tickerDraft.tagline.trim(),
      description: tickerDraft.description.trim(),
      ctaText: tickerDraft.ctaText.trim(),
      targetUrl: tickerDraft.targetUrl.trim(),
      badgeText: tickerDraft.badgeText.trim() || (lang === 'bn' ? 'স্পন্সর পার্টনার' : 'Sponsor Partner')
    };

    const updated = [newPreset, ...customCompanyPresets.filter(p => p.name !== newPreset.name)];
    setCustomCompanyPresets(updated);
    try {
      localStorage.setItem('tm_custom_company_presets', JSON.stringify(updated));
    } catch (_) {}
    showToast(
      lang === 'bn'
        ? `"${newPreset.name}" কোম্পানি প্রিসেটে সফলভাবে সংরক্ষিত হয়েছে!`
        : `"${newPreset.name}" saved as reusable company preset!`
    );
  };

  const handleDeleteCompanyPreset = (nameToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customCompanyPresets.filter(p => p.name !== nameToDelete);
    setCustomCompanyPresets(updated);
    try {
      localStorage.setItem('tm_custom_company_presets', JSON.stringify(updated));
    } catch (_) {}
    showToast(
      lang === 'bn'
        ? `"${nameToDelete}" প্রিসেট থেকে মুছে ফেলা হয়েছে`
        : `"${nameToDelete}" removed from presets`
    );
  };

  const handleLoadPresetToCustomizer = (preset: any) => {
    setTickerDraft(prev => ({
      ...prev,
      sponsorName: preset.sponsorName,
      tagline: preset.tagline,
      description: preset.description,
      ctaText: preset.ctaText,
      targetUrl: preset.targetUrl,
      badgeText: preset.badgeText || (lang === 'bn' ? 'ব্রেকিং স্পন্সর ⚡' : 'BREAKING SPONSOR ⚡')
    }));
    showToast(
      lang === 'bn'
        ? `"${preset.name}" এর সকল তথ্য কাস্টমাইজারে লোড করা হয়েছে`
        : `Loaded "${preset.name}" details into customizer`
    );
  };

  const handleApplyCustomizerToSlot = (slotKey: string) => {
    const updated = {
      ...(localAdDrafts[slotKey] || adConfigs[slotKey]),
      sponsorName: tickerDraft.sponsorName,
      badgeText: tickerDraft.badgeText,
      tagline: tickerDraft.tagline,
      description: tickerDraft.description,
      ctaText: tickerDraft.ctaText,
      targetUrl: tickerDraft.targetUrl,
      enabled: true
    };
    handleUpdateAdDraft(slotKey, updated);
    updateAdConfig(slotKey, updated, true);
    setJustSavedSlotKeys(prev => ({ ...prev, [slotKey]: true }));
    showToast(
      lang === 'bn'
        ? `"${tickerDraft.sponsorName}" এর বিজ্ঞাপনটি ${locationMeta[slotKey]?.label || slotKey} স্লটে সেভ ও লাইভ করা হয়েছে!`
        : `Applied "${tickerDraft.sponsorName}" to ${locationMeta[slotKey]?.label || slotKey}!`
    );
    setTimeout(() => {
      setJustSavedSlotKeys(prev => ({ ...prev, [slotKey]: false }));
    }, 3000);
  };

  // Batch Toggles
  const handleToggleAllSlots = (enable: boolean) => {
    const updatedAll: Record<string, any> = {};
    Object.keys(localAdDrafts).forEach(key => {
      updatedAll[key] = {
        ...localAdDrafts[key],
        enabled: enable
      };
    });
    setLocalAdDrafts(updatedAll);
    saveAllAdConfigs(updatedAll);
    showToast(
      enable
        ? t('All ad slots enabled & published live', 'সকল অ্যাড স্লট সক্রিয় ও লাইভ করা হয়েছে')
        : t('All ad slots paused & updated', 'সকল অ্যাড স্লট স্থগিত ও আপডেট করা হয়েছে')
    );
  };

  // Slot Metadata, Live Earnings Estimates & Navigation Route
  const locationMeta: Record<string, { label: string; page: string; route: string; estRev: number; impressions: string; ctr: string }> = {
    breaking_ticker: { label: 'Top Breaking News Ticker Strip', page: 'All Pages (Topmost Header)', route: 'home', estRev: 32000, impressions: '98.5k', ctr: '5.6%' },
    top_banner: { label: 'Top Leaderboard Banner', page: 'Homepage & Result Page', route: 'home', estRev: 28500, impressions: '64.2k', ctr: '3.9%' },
    mid_banner: { label: 'Full Billboard Space', page: 'Homepage Mid-Section', route: 'home', estRev: 23500, impressions: '52.8k', ctr: '3.6%' },
    home_feed_sponsor: { label: 'In-Feed Partner Showcase', page: 'Homepage (After Tutors)', route: 'home', estRev: 18200, impressions: '46.1k', ctr: '4.4%' },
    sidebar: { label: 'Right Sticky Billboard', page: 'Tutors, Tests & Resources', route: 'find-tutors', estRev: 16500, impressions: '38.4k', ctr: '3.2%' },
    native_tutor: { label: 'Native In-Feed Sponsored Card', page: 'Tutor & Test Grids', route: 'find-tutors', estRev: 18900, impressions: '49.6k', ctr: '4.8%' },
    profile_banner: { label: 'Profile Horizontal Ribbon', page: 'Tutor Profiles', route: 'find-tutors', estRev: 10200, impressions: '24.1k', ctr: '3.5%' },
    tutor_top_sponsor: { label: 'Top Featured Mentor Bar', page: 'Find Tutors Page', route: 'find-tutors', estRev: 12400, impressions: '31.2k', ctr: '4.1%' },
    mock_tests_banner: { label: 'Header Billboard', page: 'Mock Tests Page', route: 'mock-tests', estRev: 14800, impressions: '37.9k', ctr: '3.8%' },
    resources_banner: { label: 'Study Resources Header Banner', page: 'Resources Page', route: 'resources', estRev: 9800, impressions: '22.4k', ctr: '3.1%' },
    student_dashboard_sponsor: { label: 'Academic Booster Sponsorship', page: 'Student Dashboard', route: 'student-dashboard', estRev: 8600, impressions: '19.8k', ctr: '4.5%' },
    exam_reward_ad: { label: 'Student Reward & Voucher Box', page: 'Exam Result Page', route: 'mock-tests', estRev: 22600, impressions: '58.7k', ctr: '5.2%' },
    bottom_bar: { label: 'Floating Bottom Sponsor Ribbon', page: 'Site-wide Sticky Bar', route: 'home', estRev: 14500, impressions: '72.0k', ctr: '2.8%' }
  };

  // Filtered Ad Entries based on current local drafts
  const filteredAdSlots = useMemo(() => {
    return Object.entries(localAdDrafts).filter(([key, cfg]) => {
      if (adFilter === 'active') return cfg.enabled;
      if (adFilter === 'paused') return !cfg.enabled;
      return true;
    });
  }, [localAdDrafts, adFilter]);

  // Analytics Metrics
  const activeAdCount = Object.values(localAdDrafts).filter((c: any) => c.enabled).length;
  const totalMonthlyRev = useMemo(() => {
    return Object.entries(localAdDrafts).reduce((acc, [k, cfg]: any) => {
      if (!cfg.enabled) return acc;
      return acc + (locationMeta[k]?.estRev || 12000);
    }, 0);
  }, [localAdDrafts]);

  // Chart Datasets
  const REVENUE_BY_PLACEMENT = [
    { name: 'Leaderboard & Billboards', value: 52000, percentage: '35%', color: '#1E3A8A' },
    { name: 'Native Grids & In-Feed', value: 37125, percentage: '25%', color: '#3B82F6' },
    { name: 'Exam Reward Vouchers', value: 32670, percentage: '22%', color: '#F59E0B' },
    { name: 'Sticky Bars & Sidebars', value: 26705, percentage: '18%', color: '#2E8B6A' },
  ];

  const WEEKLY_ENGAGEMENT = [
    { day: 'Sat', impressions: 16200, clicks: 610 },
    { day: 'Sun', impressions: 18400, clicks: 720 },
    { day: 'Mon', impressions: 19800, clicks: 790 },
    { day: 'Tue', impressions: 21500, clicks: 860 },
    { day: 'Wed', impressions: 22800, clicks: 920 },
    { day: 'Thu', impressions: 24900, clicks: 1040 },
    { day: 'Fri', impressions: 24600, clicks: 1020 },
  ];

  const CATEGORY_DISTRIBUTION = [
    { name: 'HSC Science & Commerce', count: 38, value: 38, color: '#1E3A8A' },
    { name: 'SSC Prep & Board Exams', count: 29, value: 29, color: '#F59E0B' },
    { name: 'University & Engineering', count: 23, value: 23, color: '#2E8B6A' },
    { name: 'Medical & BCS / English', count: 10, value: 10, color: '#8B5CF6' },
  ];

  const UNIVERSITY_ORIGIN = [
    { name: 'BUET', tutors: 784, fill: '#1E3A8A' },
    { name: 'Dhaka Univ (DU)', tutors: 686, fill: '#3B82F6' },
    { name: 'Medical Colleges', tutors: 441, fill: '#2E8B6A' },
    { name: 'RUET / KUET / CUET', tutors: 343, fill: '#F59E0B' },
    { name: 'RU / CU / Others', tutors: 196, fill: '#8B5CF6' },
  ];

  // Filtered Tutors List
  const filteredTutorsList = useMemo(() => {
    return tutors.filter(tutor => {
      if (tutorStatusFilter === 'verified' && !tutor.verified) return false;
      if (tutorStatusFilter === 'unverified' && tutor.verified) return false;
      if (tutorSearch.trim()) {
        const q = tutorSearch.toLowerCase();
        const mName = tutor.name.toLowerCase().includes(q) || (tutor.nameBn && tutor.nameBn.includes(q));
        const mInst = tutor.institute.toLowerCase().includes(q);
        const mArea = tutor.area.toLowerCase().includes(q) || tutor.district.toLowerCase().includes(q);
        if (!mName && !mInst && !mArea) return false;
      }
      return true;
    });
  }, [tutors, tutorStatusFilter, tutorSearch]);

  // Login view if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-7 h-7 text-[#F59E0B]" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t('Easy Tution Admin Console', 'অ্যাডমিন কনসোল লগইন')}
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {t('Secure access to monetization analytics, verified tutors & mock tests management.', 'বিজ্ঞাপন মনিটাইজেশন, শিক্ষক ভেরিফিকেশন ও পরীক্ষা ম্যানেজমেন্ট প্যানেল।')}
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter demo password: admin123"
                className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 text-center text-slate-900 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-600/10 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
            >
              {t('Enter Admin Console', 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন')}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <span>{t('Default demo password: ', 'ডেমো পাসওয়ার্ড: ')}</span>
            <code className="bg-slate-100 text-[#1E3A8A] font-bold px-2 py-0.5 rounded font-mono">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* 1. Executive Top Bar Contract */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center shadow-xs shrink-0 border border-blue-900/40">
            <ShieldAlert className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t('Easy Tution Executive Console', 'ইজি টিউশন অ্যাডমিন কনসোল')}
              </h1>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Production
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t(
                'Real-time overview of ad impressions, sponsor monetization, verified educators, and academic tests.',
                'বিজ্ঞাপন আয়, স্পন্সর পারফরম্যান্স, শিক্ষক ভেরিফিকেশন ও পরীক্ষার লাইভ ড্যাশবোর্ড।'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Estimated Revenue</span>
            <span className="text-base font-extrabold text-[#2E8B6A] tabular-nums font-mono">
              ৳ {totalMonthlyRev.toLocaleString('en-US')} / mo
            </span>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('Lock Session', 'লক করুন')}</span>
          </button>
        </div>
      </div>

      {/* 2. Primary Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#F59E0B]" />
          <span>{t('Overview & Visual Analytics', 'অ্যানালিটিক্স ও পরিসংখ্যান')}</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'ads'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>{t('Ad Slots & Monetization', 'বিজ্ঞাপন স্লট ও মনিটাইজেশন')}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${activeTab === 'ads' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {activeAdCount}/12
          </span>
        </button>

        <button
          onClick={() => setActiveTab('tests')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'tests'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{t('Manage Mock Tests', 'মক টেস্টসমূহ')} ({mockTests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tutors')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'tutors'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('Tutors & Verification', 'শিক্ষক ভেরিফিকেশন')} ({tutors.length})</span>
        </button>
      </div>

      {/* 3. TAB 1: OVERVIEW & ADVANCED VISUAL ANALYTICS (PIE CHARTS, REVENUE, GROWTH) */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Estimated Monthly Revenue */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('Monthly Ad Revenue', 'মাসিক বিজ্ঞাপন আয়')}</span>
                <span className="p-2 rounded-xl bg-emerald-50 text-[#2E8B6A] border border-emerald-200/60">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
                  ৳ {totalMonthlyRev.toLocaleString('en-US')}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#2E8B6A] font-bold mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last month</span>
                  <span className="text-slate-400 font-normal">· {activeAdCount} active slots</span>
                </div>
              </div>
            </div>

            {/* Card 2: Ad Impressions & CTR */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('30-Day Impressions', 'মাসিক ইমপ্রেশন')}</span>
                <span className="p-2 rounded-xl bg-blue-50 text-[#1E3A8A] border border-blue-200/60">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
                  148,200
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold mt-2">
                  <MousePointerClick className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>3.82% Average CTR</span>
                  <span className="text-slate-400 font-normal">· 5,660 clicks</span>
                </div>
              </div>
            </div>

            {/* Card 3: Mock Tests Taken */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('Tests Completed', 'মক টেস্ট সম্পন্ন')}</span>
                <span className="p-2 rounded-xl bg-amber-50 text-[#F59E0B] border border-amber-200/60">
                  <Award className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
                  65,820
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mt-2">
                  <span className="text-[#F59E0B] font-bold">78.4%</span>
                  <span>{t('Avg accuracy rate', 'গড় সঠিক উত্তরের হার')}</span>
                </div>
              </div>
            </div>

            {/* Card 4: Registered Mentors */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('Total Tutors', 'নিবন্ধিত শিক্ষক')}</span>
                <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/60">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
                  2,450
                </div>
                <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold mt-2">
                  <span className="font-bold text-slate-900">{tutors.filter(t => t.verified).length}</span>
                  <span>{t('Verified Badges', 'ভেরিফায়েড শিক্ষক')}</span>
                  <span className="text-slate-400">· 100% Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row 1: Pie Chart (Monetization Placement Breakdown) + Area Chart (Daily Impressions & Clicks) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Pie Chart: Revenue by Ad Slot Placement (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-[#1E3A8A]" />
                    <span>{t('Revenue by Ad Placement', 'বিজ্ঞাপন স্লট ভিত্তিক আয়ের হার')}</span>
                  </h3>
                  <span className="text-xs font-bold text-[#2E8B6A] bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    100% Sponsor Fill
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {t('Distribution of sponsor earnings across key viewport positions.', 'সাইটের মূল বিজ্ঞাপন পজিশনগুলোর শতকরা আয় বিভাজন।')}
                </p>

                {/* Donut Chart */}
                <div className="h-64 w-full mt-4 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={REVENUE_BY_PLACEMENT}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={88}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {REVENUE_BY_PLACEMENT.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => [`৳ ${Number(val).toLocaleString('en-US')}`, 'Monthly Revenue']}
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          color: '#FFFFFF',
                          borderRadius: '12px',
                          fontSize: '12px',
                          border: 'none'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Legends with tabular figures */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                {REVENUE_BY_PLACEMENT.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="min-w-0">
                      <p className="text-slate-700 font-semibold truncate leading-tight">{item.name}</p>
                      <p className="text-slate-400 font-mono text-[11px] tabular-nums">৳ {item.value.toLocaleString()} ({item.percentage})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Area Chart: 7-Day Traffic & Ad Impressions (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#1E3A8A]" />
                    <span>{t('Weekly Traffic & Ad Clicks', 'সাপ্তাহিক ট্রাফিক ও বিজ্ঞাপন ক্লিক')}</span>
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
                      Impressions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                      Clicks
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  {t('Daily volume of impressions rendered and high-intent clicks generated.', 'প্রতিদিনের বিজ্ঞাপন ভিউ ও ব্যবহারকারীদের ক্লিক সংখ্যা।')}
                </p>

                <div className="h-64 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={WEEKLY_ENGAGEMENT} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorImpr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          color: '#FFFFFF',
                          borderRadius: '12px',
                          fontSize: '12px',
                          border: 'none'
                        }}
                      />
                      <Area type="monotone" dataKey="impressions" stroke="#1E3A8A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorImpr)" />
                      <Area type="monotone" dataKey="clicks" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Peak Traffic: <strong className="text-slate-800 font-mono">Thursday (24.9k Impr)</strong></span>
                <span>Average CPM: <strong className="text-emerald-700 font-mono">৳ 38.50 BDT</strong></span>
                <span>Top Performing Slot: <strong className="text-[#1E3A8A]">Exam Reward Box (5.2% CTR)</strong></span>
              </div>
            </div>

          </div>

          {/* Charts Row 2: Mock Tests Categories (Bar Chart) + Mentor University Origins */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Academic Category Breakdown */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#1E3A8A]" />
                    <span>{t('Mock Test Categories Volume', 'মক টেস্ট ক্যাটাগরি ও প্রশ্ন ব্যাংক')}</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {mockTests.length} Published Tests
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {t('Distribution of student exam attempts by academic category.', 'পরীক্ষার্থীদের অংশগ্রহণ অনুযায়ী ক্যাটাগরিভিত্তিক বিভাজন।')}
                </p>

                <div className="h-60 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CATEGORY_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} interval={0} />
                      <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <Tooltip
                        formatter={(val: any) => [`${val}% of Students`, 'Exam Share']}
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          color: '#FFFFFF',
                          borderRadius: '12px',
                          fontSize: '12px',
                          border: 'none'
                        }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {CATEGORY_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Top demand: <strong className="text-slate-800">HSC Physics & Math</strong></span>
                <button
                  onClick={() => setActiveTab('tests')}
                  className="text-xs font-bold text-[#1E3A8A] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{t('Create New Test', 'নতুন টেস্ট যোগ করুন')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* University Origin Distribution */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#F59E0B]" />
                    <span>{t('Top University Mentor Distribution', 'বিশ্ববিদ্যালয়ভিত্তিক শিক্ষক বণ্টন')}</span>
                  </h3>
                  <span className="text-xs font-bold text-[#1E3A8A]">
                    2,450 Verified Educators
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {t('Verified educator mentors registered from premier public universities.', 'শীর্ষ বিশ্ববিদ্যালয় ও মেডিকেল থেকে নিবন্ধিত শিক্ষকদের বণ্টন।')}
                </p>

                <div className="h-60 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={UNIVERSITY_ORIGIN} margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                      <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <YAxis type="category" dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} width={100} />
                      <Tooltip
                        formatter={(val: any) => [`${val} Mentors`, 'Registered']}
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          color: '#FFFFFF',
                          borderRadius: '12px',
                          fontSize: '12px',
                          border: 'none'
                        }}
                      />
                      <Bar dataKey="tutors" radius={[0, 6, 6, 0]}>
                        {UNIVERSITY_ORIGIN.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Top Campus: <strong className="text-slate-800">BUET (32% Mentors)</strong></span>
                <button
                  onClick={() => setActiveTab('tutors')}
                  className="text-xs font-bold text-[#1E3A8A] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{t('Manage Verification Queue', 'ভেরিফিকেশন লিস্ট')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. TAB 2: SUPERCHARGED AD SLOTS & MONETIZATION COMMAND CENTER */}
      {activeTab === 'ads' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-7 animate-in fade-in duration-300">
          
          {/* Header & Monetization Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-300/80 shadow-2xs">
                  <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {t('Ad Placements & Monetization Control Center', 'বিজ্ঞাপন স্লট ও মনিটাইজেশন কন্ট্রোল সেন্টার')}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                {t(
                  'Manage sponsor brands, taglines, URLs, badges and visibility across all 12 prime positions in real-time. Full CPM and estimated earnings controls.',
                  'ওয়েবসাইটের সকল ১২টি বিজ্ঞাপন স্লটের ব্র্যান্ড, বিবরণ, লিংক, রেভিনিউ ও ভিজিবিলিটি তাৎক্ষণিক কাস্টমাইজ করুন।'
                )}
              </p>
            </div>

            {/* Quick Batch Actions & Save All Button */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleSaveAllSlots}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-[#2E8B6A] hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-black transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2 border border-emerald-500"
              >
                <Save className="w-4 h-4 text-white" />
                <span>{t('Save All & Publish Live', 'সকল বিজ্ঞাপন সেভ ও লাইভ করুন')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleAllSlots(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 text-[#2E8B6A] border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t('Enable All (12)', 'সব চালু')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleAllSlots(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <span>{t('Pause All', 'সব স্থগিত')}</span>
              </button>
            </div>
          </div>

          {/* Breaking Sponsor Customizer & Company Ad Manager (Admin can write ANY company name & save) */}
          <div className="bg-gradient-to-br from-slate-900 via-[#0B1528] to-[#0A1124] text-white rounded-3xl border border-blue-900/60 p-5 sm:p-7 shadow-lg space-y-5 relative overflow-hidden">
            {/* Top decorative accent glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header with Title and Live Status */}
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  <Megaphone className="w-3.5 h-3.5" />
                  <span>{t('Breaking Sponsor & Company Customizer', 'ব্রেকিং স্পন্সর ও কোম্পানি বিজ্ঞাপন কাস্টমাইজার')}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{t('Manage Any Company Announcement & Ticker', 'যেকোনো কোম্পানির বিজ্ঞাপন ও লাইভ ব্রেকিং স্পন্সর')}</span>
                </h3>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  {t(
                    'Admin can write any company name, offer headline, website link, and button. Saves directly to the topmost Breaking Sponsor strip across the entire website.',
                    'অ্যাডমিন যেকোনো কোম্পানির নাম লিখে অফার, বাটন ও লিংক সেট করতে পারবেন। সেভ করলে পুরো ওয়েবসাইটের সবার উপরের ব্রেকিং স্পন্সরে তাৎক্ষণিক লাইভ হবে।'
                  )}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 shrink-0">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                  <input
                    type="checkbox"
                    checked={tickerDraft.enabled}
                    onChange={e => setTickerDraft(prev => ({ ...prev, enabled: e.target.checked }))}
                    className="rounded text-[#1E3A8A] focus:ring-0 cursor-pointer"
                  />
                  <span className={tickerDraft.enabled ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-slate-400'}>
                    {tickerDraft.enabled ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {t('Ticker Active', 'ব্রেকিং সক্রিয়')}
                      </>
                    ) : (
                      t('Ticker Paused', 'স্থগিত')
                    )}
                  </span>
                </label>
              </div>
            </div>

            {/* Quick 1-Click Company Presets & Custom Saved Companies */}
            <div className="relative space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{t('Quick Company Presets (Click to load or write new):', 'কোম্পানি নির্বাচন করুন অথবা নিচে নতুন নাম লিখুন:')}</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {t('Pre-made & custom saved brands', 'সংরক্ষিত পার্টনার তালিকা')}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Default Verified Presets */}
                {SPONSOR_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleLoadPresetToCustomizer(preset)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer hover:border-amber-400/50"
                  >
                    <Building className="w-3 h-3 text-amber-400" />
                    <span>{preset.name}</span>
                  </button>
                ))}

                {/* Custom Admin Added Companies */}
                {customCompanyPresets.map((preset) => (
                  <div
                    key={preset.name}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900/80 border border-blue-700/60 text-xs font-bold text-blue-200 transition-all cursor-pointer group"
                    onClick={() => handleLoadPresetToCustomizer(preset)}
                  >
                    <span>{preset.name}</span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteCompanyPreset(preset.name, e)}
                      className="ml-1 p-0.5 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete preset"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Clear / New Company Button */}
                <button
                  type="button"
                  onClick={() => setTickerDraft({
                    sponsorName: '',
                    tagline: '',
                    description: '',
                    ctaText: lang === 'bn' ? 'অফারটি নিন' : 'Learn More',
                    targetUrl: 'https://',
                    badgeText: lang === 'bn' ? 'ব্রেকিং স্পন্সর ⚡' : 'BREAKING SPONSOR ⚡',
                    enabled: true
                  })}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold text-amber-300 transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>{t('+ Write New Company', '+ নতুন কোম্পানি লিখুন')}</span>
                </button>
              </div>
            </div>

            {/* Customizer Form Grid: Company Name, Tagline, Target URL, CTA, Badge */}
            <form onSubmit={handleSaveBreakingTicker} className="relative space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* 1. Company / Sponsor Name (5 cols) */}
                <div className="md:col-span-5 space-y-1">
                  <label className="block text-xs font-bold text-slate-200">
                    {t('Company / Sponsor Name', 'কোম্পানির নাম (যেকোনো প্রতিষ্ঠানের নাম লিখুন)')} *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={tickerDraft.sponsorName}
                      onChange={e => setTickerDraft(prev => ({ ...prev, sponsorName: e.target.value }))}
                      placeholder="e.g. Robi, Walton, Daraz, Shikho, 10 Minute School"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-bold"
                    />
                    <Building className="w-4 h-4 text-amber-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Badge Text (3 cols) */}
                <div className="md:col-span-3 space-y-1">
                  <label className="block text-xs font-bold text-slate-200">
                    {t('Badge Text', 'ব্যাজ টেক্সট')}
                  </label>
                  <input
                    type="text"
                    value={tickerDraft.badgeText}
                    onChange={e => setTickerDraft(prev => ({ ...prev, badgeText: e.target.value }))}
                    placeholder="e.g. ব্রেকিং স্পন্সর ⚡"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* 3. CTA Button Text (4 cols) */}
                <div className="md:col-span-4 space-y-1">
                  <label className="block text-xs font-bold text-slate-200">
                    {t('CTA Button Text', 'বাটনের লেখা')}
                  </label>
                  <input
                    type="text"
                    value={tickerDraft.ctaText}
                    onChange={e => setTickerDraft(prev => ({ ...prev, ctaText: e.target.value }))}
                    placeholder="e.g. অফারটি নিন / সাইন আপ"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* 4. Breaking Tagline / Headline (8 cols) */}
                <div className="md:col-span-8 space-y-1">
                  <label className="block text-xs font-bold text-slate-200">
                    {t('Breaking Headline / Special Offer Tagline', 'ব্রেকিং হেডলাইন বা স্পেশাল অফার')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={tickerDraft.tagline}
                    onChange={e => setTickerDraft(prev => ({ ...prev, tagline: e.target.value }))}
                    placeholder="e.g. 🔥 স্পেশাল অফার: সকল কোর্সে ৫০% ছাড়! প্রোমোকোড: EASY50"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* 5. Target Website URL (4 cols) */}
                <div className="md:col-span-4 space-y-1">
                  <label className="block text-xs font-bold text-slate-200">
                    {t('Company Website URL', 'কোম্পানির ওয়েবসাইট লিংক')} *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={tickerDraft.targetUrl}
                      onChange={e => setTickerDraft(prev => ({ ...prev, targetUrl: e.target.value }))}
                      placeholder="https://company.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 6. Description / Details (12 cols) */}
                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-200">
                    {t('Detailed Description / Body Offer', 'অফারের বিস্তারিত বিবরণ')}
                  </label>
                  <input
                    type="text"
                    value={tickerDraft.description}
                    onChange={e => setTickerDraft(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="e.g. দেশসেরা শিক্ষকদের সাথে লাইভ ক্লাস ও সলভ শীটসহ নতুন ব্যাচে ভর্তি চলছে। সীমিত আসন!"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

              </div>

              {/* Real-Time Live Ticker Preview */}
              <div className="p-3 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold flex items-center gap-1 text-amber-400">
                    <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                    {t('Real-Time Live Top Ticker Preview', 'লাইভ টপ টিকার প্রিভিউ')}
                  </span>
                  <span>{t('How it looks to all visitors at site header', 'ওয়েবসাইটে যেভাবে দেখা যাবে')}</span>
                </div>

                {/* The simulated top ticker bar */}
                <div className="w-full bg-[#080E1E] text-slate-100 border border-amber-500/40 rounded-xl overflow-hidden py-1.5 px-3 flex items-center justify-between gap-3 text-xs shadow-inner">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="bg-gradient-to-r from-red-600 to-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 shadow-2xs">
                      {tickerDraft.badgeText || 'ব্রেকিং স্পন্সর ⚡'}
                    </span>
                    <span className="font-bold text-amber-400 shrink-0">
                      {tickerDraft.sponsorName || 'Company Name'} :
                    </span>
                    <span className="text-slate-300 truncate">
                      {tickerDraft.tagline || 'Special promotional headline here...'}
                    </span>
                  </div>

                  <span className="shrink-0 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <span>{tickerDraft.ctaText || 'অফারটি নিন'}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-950" />
                  </span>
                </div>
              </div>

              {/* Action Buttons: Save & Publish, Save as Preset, Apply to Other Slots */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-[#2E8B6A] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-black transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2 border border-emerald-400"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>
                      {isTickerSaved
                        ? t('Saved & Live! ✓', 'সেভড ও লাইভ হয়েছে! ✓')
                        : t('Save & Publish to Breaking Sponsor', 'ব্রেকিং স্পন্সরে সেভ ও লাইভ পাবলিশ করুন')}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAsCompanyPreset}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('Save as Reusable Preset', 'প্রিসেটে কোম্পানি সংরক্ষণ')}</span>
                  </button>
                </div>

                {/* Apply This Company to Other Ad Slots */}
                <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-1.5 text-xs">
                  <span className="text-slate-400 font-medium">Apply to other slot:</span>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleApplyCustomizerToSlot(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                    className="text-xs font-bold text-amber-400 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-900 text-white">Select slot...</option>
                    {Object.keys(localAdDrafts)
                      .filter(k => k !== 'breaking_ticker')
                      .map(k => (
                        <option key={k} value={k} className="bg-slate-900 text-white">
                          {locationMeta[k]?.label || k}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAdFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  adFilter === 'all'
                    ? 'bg-[#1E3A8A] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t('All Slots', 'সকল স্লট')} ({Object.keys(localAdDrafts).length})
              </button>
              <button
                onClick={() => setAdFilter('active')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  adFilter === 'active'
                    ? 'bg-[#1E3A8A] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t('Active Only', 'শুধুমাত্র সক্রিয়')} ({activeAdCount})
              </button>
              <button
                onClick={() => setAdFilter('paused')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  adFilter === 'paused'
                    ? 'bg-[#1E3A8A] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t('Paused', 'স্থগিত')} ({Object.keys(localAdDrafts).length - activeAdCount})
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              Total Fill Rate: <strong className="text-slate-900 font-mono">{((activeAdCount / 12) * 100).toFixed(0)}%</strong>
            </div>
          </div>

          {/* Ad Slots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAdSlots.map(([key, config]) => {
              const draft = localAdDrafts[key] || config;
              const meta = locationMeta[key] || { label: 'Sponsorship Slot', page: 'Site Placement', route: 'home', estRev: 12000, impressions: '30k', ctr: '3.5%' };
              const isPreviewing = previewSlot === key;
              const isCopied = copiedSlotKey === key;
              const isJustSaved = !!justSavedSlotKeys[key];

              const originalConfig = adConfigs[key] || draft;
              const isDirty = (
                draft.sponsorName !== originalConfig.sponsorName ||
                draft.tagline !== originalConfig.tagline ||
                draft.description !== originalConfig.description ||
                draft.ctaText !== originalConfig.ctaText ||
                draft.targetUrl !== originalConfig.targetUrl ||
                draft.badgeText !== originalConfig.badgeText ||
                draft.enabled !== originalConfig.enabled
              );

              return (
                <div
                  key={key}
                  className={`p-5 rounded-2xl border transition-all ${
                    draft.enabled
                      ? 'bg-slate-50/70 border-slate-200/90 shadow-2xs hover:border-slate-300'
                      : 'bg-slate-100/50 border-dashed border-slate-200 opacity-75'
                  } space-y-4 flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    {/* Top Bar with Slot Info & Controls */}
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1E3A8A] block">
                            {meta.label}
                          </span>
                          <span className="text-[10px] font-mono text-[#2E8B6A] bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded font-bold">
                            ৳ {meta.estRev.toLocaleString()} / mo
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {t('Location', 'অবস্থান')}: {meta.page} · {meta.impressions} Views · {meta.ctr} CTR
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleCopyCode(key)}
                          className="text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                          title="Copy JSX component tag"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreviewSlot(isPreviewing ? null : key)}
                          className="text-xs text-[#1E3A8A] font-semibold hover:underline flex items-center gap-1 cursor-pointer bg-blue-50/80 px-2 py-1 rounded-lg border border-blue-100"
                          title="Toggle live visual preview"
                        >
                          {isPreviewing ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-[#1E3A8A]" />}
                          <span className="text-[11px]">{isPreviewing ? t('Hide', 'লুকান') : t('Preview', 'প্রিভিউ')}</span>
                        </button>

                        <label className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={draft.enabled}
                            onChange={e => handleUpdateAdDraft(key, { enabled: e.target.checked })}
                            className="rounded text-[#1E3A8A] focus:ring-0 cursor-pointer"
                          />
                          <span className={draft.enabled ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                            {draft.enabled ? t('Active', 'সক্রিয়') : t('Paused', 'স্থগিত')}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                            {t('Sponsor Brand Name', 'স্পন্সর প্রতিষ্ঠানের নাম')} *
                          </label>
                          <input
                            type="text"
                            required
                            value={draft.sponsorName}
                            onChange={e => handleUpdateAdDraft(key, { sponsorName: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                            {t('Badge Text', 'ব্যাজ টেক্সট')}
                          </label>
                          <input
                            type="text"
                            value={draft.badgeText || ''}
                            placeholder="e.g. Official Partner"
                            onChange={e => handleUpdateAdDraft(key, { badgeText: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                          {t('Tagline / Headline', 'ট্যাগলাইন / প্রধান শিরোনাম')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={draft.tagline}
                          onChange={e => handleUpdateAdDraft(key, { tagline: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                          {t('Description / Pitch Body', 'বিজ্ঞাপনের বিবরণ')}
                        </label>
                        <textarea
                          rows={2}
                          value={draft.description}
                          onChange={e => handleUpdateAdDraft(key, { description: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                            {t('Button Label (CTA)', 'বাটনের লেখা')}
                          </label>
                          <input
                            type="text"
                            value={draft.ctaText}
                            onChange={e => handleUpdateAdDraft(key, { ctaText: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                            {t('Target URL', 'টার্গেট ওয়েব লিংক')}
                          </label>
                          <input
                            type="text"
                            value={draft.targetUrl}
                            onChange={e => handleUpdateAdDraft(key, { targetUrl: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Live In-Place Component Preview */}
                    {isPreviewing && (
                      <div className="pt-3 border-t border-slate-200 space-y-1.5 animate-in fade-in">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">
                          {t('Live Rendering Preview', 'লাইভ রেন্ডারিং প্রিভিউ')}
                        </span>
                        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                          <AdSlot type={key as any} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Explicit Save & Publish Button & Live Status */}
                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/70 -mx-5 -mb-5 p-4 rounded-b-2xl border-t border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border ${
                        isDirty
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {isDirty ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span>{t('Unsaved Draft · সেভ করুন', 'অসংরক্ষিত ড্রাফট · সেভ করুন')}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{t('Live on Website', 'সেভড ও ওয়েবসাইটে লাইভ রয়েছে')}</span>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateTo(meta.route || 'home')}
                        className="text-[11px] text-[#1E3A8A] font-bold hover:underline flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-1 rounded-lg border border-blue-200/60"
                        title="View this ad location on the site"
                      >
                        <span>{t('View on Site', 'ওয়েবসাইটে দেখুন')}</span>
                        <ExternalLink className="w-3 h-3 text-[#1E3A8A]" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSaveSingleSlot(key)}
                      className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                        isJustSaved
                          ? 'bg-emerald-600 text-white'
                          : isDirty
                          ? 'bg-gradient-to-r from-amber-600 to-[#B45309] hover:from-amber-700 hover:to-[#92400E] text-white shadow-md'
                          : 'bg-[#1E3A8A] hover:bg-[#1E40AF] text-white'
                      }`}
                    >
                      {isJustSaved ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>{t('Saved & Published!', 'সেভ ও লাইভ সম্পন্ন!')}</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 text-white" />
                          <span>{t('Save & Publish to Website', 'সেভ ও ওয়েবসাইটে পাবলিশ করুন')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB 3: MOCK TESTS MANAGEMENT */}
      {activeTab === 'tests' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
          {/* Add Test Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200 flex items-center justify-between">
              <span>{t('Create New MCQ Mock Test', 'নতুন মক টেস্ট তৈরি করুন')}</span>
              <span className="text-xs font-normal text-slate-500">{mockTests.length} Total Tests</span>
            </h2>

            <form onSubmit={handleCreateTest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-900 mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={testTitle}
                    onChange={e => setTestTitle(e.target.value)}
                    placeholder="e.g. HSC Physics Optics Chapter Test"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-900 mb-1">Title (বাংলা)</label>
                  <input
                    type="text"
                    value={testTitleBn}
                    onChange={e => setTestTitleBn(e.target.value)}
                    placeholder="যেমন: এইচএসসি আলো চ্যাপ্টার টেস্ট"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-900 mb-1">Subject</label>
                  <input
                    type="text"
                    value={testSubject}
                    onChange={e => setTestSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-900 mb-1">Category</label>
                  <select
                    value={testCategory}
                    onChange={e => setTestCategory(e.target.value as any)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                  >
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Admission">Admission</option>
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-900 mb-1">Duration (Min)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-900 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as any)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Questions Builder */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {t('Questions Builder', 'প্রশ্নসমূহ তৈরি')} ({questions.length})
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddQuestionSlot}
                    className="px-3 py-1 rounded-xl bg-blue-50 text-[#1E3A8A] text-xs font-semibold hover:bg-blue-100 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('Add Question', 'প্রশ্ন যোগ করুন')}</span>
                  </button>
                </div>

                {questions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E3A8A]">Question {qIdx + 1}</span>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setQuestions(prev => prev.filter((_, i) => i !== qIdx))}
                          className="text-slate-400 hover:text-rose-600 text-xs cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        value={q.text}
                        onChange={e => handleUpdateQuestion(qIdx, 'text', e.target.value)}
                        placeholder={`e.g. What is the unit of electric capacitance?`}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={q.correctIndex === optIdx}
                            onChange={() => handleUpdateQuestion(qIdx, 'correctIndex', optIdx)}
                            className="text-[#1E3A8A] focus:ring-0 cursor-pointer"
                            title="Mark as correct answer"
                          />
                          <input
                            type="text"
                            required
                            value={opt}
                            onChange={e => handleUpdateOption(qIdx, optIdx, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                            className="w-full px-2.5 py-1 text-xs rounded-xl border border-slate-200 bg-white"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <input
                        type="text"
                        value={q.explanation || ''}
                        onChange={e => handleUpdateQuestion(qIdx, 'explanation', e.target.value)}
                        placeholder="Explanation / কেন এই উত্তরটি সঠিক? (Optional)"
                        className="w-full px-3 py-1 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF] active:scale-[0.98] transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#F59E0B]" />
                  <span>{t('Publish Mock Test Immediately', 'মক টেস্টটি লাইভ করুন')}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Tests Table (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200 flex items-center justify-between">
              <span>{t('Active Live Tests', 'বর্তমান মক টেস্টসমূহ')}</span>
              <span className="text-xs text-slate-500 font-mono">Total {mockTests.length}</span>
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {mockTests.map(test => (
                <div
                  key={test.id}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                      <span className="font-bold text-[#1E3A8A]">{test.category}</span>
                      <span>·</span>
                      <span>{test.subject}</span>
                      <span>·</span>
                      <span className={test.difficulty === 'Hard' ? 'text-rose-600 font-semibold' : 'text-emerald-700 font-semibold'}>
                        {test.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                      {lang === 'bn' && test.titleBn ? test.titleBn : test.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 font-mono">
                      {test.questionCount} Questions · {test.durationMinutes} Mins · {test.totalAttempts || 0} attempts
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(t('Are you sure you want to delete this test?', 'আপনি কি নিশ্চিত টেস্টটি ডিলিট করতে চান?'))) {
                        deleteMockTest(test.id);
                        showToast(t('Test deleted', 'টেস্টটি ডিলিট করা হয়েছে'));
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                    title="Delete Test"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: TUTORS & VERIFICATION QUEUE */}
      {activeTab === 'tutors' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {t('Educator Verification & Credentials Directory', 'শিক্ষক ভেরিফিকেশন ও অনুমোদন')}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t(
                  'Review university identity cards, educational degrees and grant the verified trust badge to protect students.',
                  'শিক্ষকদের প্রাতিষ্ঠানিক সনদ যাচাই করে ভেরিফায়েড ব্যাজ অনুমোদন করুন।'
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1E3A8A] bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                {tutors.filter(t => t.verified).length} / {tutors.length} Verified
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={tutorSearch}
                onChange={e => setTutorSearch(e.target.value)}
                placeholder={t('Search by tutor name, university (BUET, DU...) or area...', 'শিক্ষকের নাম, বিশ্ববিদ্যালয় বা এলাকা দিয়ে খুঁজুন...')}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setTutorStatusFilter('all')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-colors ${
                  tutorStatusFilter === 'all' ? 'bg-[#1E3A8A] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                All ({tutors.length})
              </button>
              <button
                onClick={() => setTutorStatusFilter('verified')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-colors ${
                  tutorStatusFilter === 'verified' ? 'bg-[#1E3A8A] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Verified ({tutors.filter(t => t.verified).length})
              </button>
              <button
                onClick={() => setTutorStatusFilter('unverified')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-colors ${
                  tutorStatusFilter === 'unverified' ? 'bg-[#1E3A8A] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Pending ({tutors.filter(t => !t.verified).length})
              </button>
            </div>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTutorsList.map(tutor => (
              <div
                key={tutor.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {lang === 'bn' && tutor.nameBn ? tutor.nameBn : tutor.name}
                    </h3>
                    {tutor.verified ? (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#2E8B6A]" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded-md">
                        Pending
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#1E3A8A] font-semibold truncate mt-0.5">
                    {tutor.institute} · {tutor.degree}
                  </p>

                  <p className="text-xs text-slate-500 truncate mt-1">
                    {tutor.area}, {tutor.district} · {tutor.experienceYears} yrs experience
                  </p>

                  <div className="text-[11px] text-slate-500 mt-2 truncate">
                    Subjects: {tutor.subjects.join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      toggleTutorVerified(tutor.id);
                      showToast(tutor.verified ? 'Verified badge revoked' : 'Verified badge approved!');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                      tutor.verified
                        ? 'border border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100'
                        : 'bg-[#1E3A8A] text-white hover:bg-[#1E40AF]'
                    }`}
                  >
                    {tutor.verified ? t('Revoke Badge', 'ব্যাজ বাতিল') : t('Approve Badge', 'ভেরিফাই অনুমোদন')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
