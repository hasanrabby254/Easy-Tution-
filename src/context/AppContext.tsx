import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  User,
  Tutor,
  MockTest,
  StudyResource,
  TestResult,
  StudentInquiry,
  AdConfig
} from '../types';
import {
  INITIAL_TUTORS,
  INITIAL_MOCK_TESTS,
  INITIAL_RESOURCES,
  INITIAL_AD_CONFIGS,
  INITIAL_STUDENT_TEST_RESULTS
} from '../data/mockData';
import { resolveImageUrl } from '../utils/imageAssets';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (en: string, bn: string) => string;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  tutors: Tutor[];
  toggleTutorVerified: (id: string) => void;
  updateTutor: (tutor: Tutor) => void;
  addTutor: (tutor: Tutor) => void;
  mockTests: MockTest[];
  addMockTest: (test: MockTest) => void;
  deleteMockTest: (id: string) => void;
  resources: StudyResource[];
  addResource: (res: StudyResource) => void;
  adConfigs: Record<string, AdConfig>;
  updateAdConfig: (key: string, data: Partial<AdConfig>, silent?: boolean) => void;
  saveAllAdConfigs: (allConfigs: Record<string, AdConfig>) => void;
  testResults: TestResult[];
  saveTestResult: (result: TestResult) => void;
  savedTutorIds: string[];
  savedTestIds: string[];
  savedResourceIds: string[];
  toggleSaveTutor: (id: string) => void;
  toggleSaveTest: (id: string) => void;
  toggleSaveResource: (id: string) => void;
  inquiries: StudentInquiry[];
  sendInquiry: (inquiry: Omit<StudentInquiry, 'id' | 'date' | 'status'>) => void;
  toast: { text: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  currentPage: string;
  pageParam: string | null;
  navigateTo: (page: string, param?: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('tm_lang') as Language) || 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('tm_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'bn' : 'en');
  };

  const t = (en: string, bn: string) => (lang === 'bn' ? bn : en);

  // Simple SPA Routing
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | null>(null);

  const navigateTo = (page: string, param: string | null = null) => {
    setCurrentPage(page);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('tm_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('tm_user', JSON.stringify(user));
    showToast(lang === 'bn' ? `স্বাগতম, ${user.name}!` : `Welcome back, ${user.name}!`);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tm_user');
    showToast(lang === 'bn' ? 'সফলভাবে লগআউট হয়েছে' : 'Signed out successfully', 'info');
    navigateTo('home');
  };

  const updateUser = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    localStorage.setItem('tm_user', JSON.stringify(updated));
    showToast(lang === 'bn' ? 'প্রোফাইল আপডেট সম্পন্ন হয়েছে' : 'Profile updated successfully');
  };

  // Tutors
  const [tutors, setTutors] = useState<Tutor[]>(() => {
    try {
      const saved = localStorage.getItem('tm_tutors');
      if (saved) {
        const parsed = JSON.parse(saved) as Tutor[];
        const initialIds = new Set(INITIAL_TUTORS.map(t => t.id));
        const customAdded = parsed
          .filter(p => !initialIds.has(p.id))
          .map(c => ({
            ...c,
            photoUrl: resolveImageUrl(c.photoUrl, c.name),
            hourlyRate: (!c.hourlyRate || c.hourlyRate.includes('ফ্রি') || c.hourlyRate.includes('Free') || c.hourlyRate.includes('০'))
              ? '৳ ৪,০০০ / মাস'
              : c.hourlyRate
          }));
        // Sync with INITIAL_TUTORS to guarantee distinct photos, verified monthly rates (৳3,500 - ৳5,500), and latest university details
        const merged = INITIAL_TUTORS.map(initT => {
          const existing = parsed.find(p => p.id === initT.id);
          if (existing) {
            return {
              ...existing,
              name: initT.name,
              nameBn: initT.nameBn,
              photoUrl: initT.photoUrl,
              hourlyRate: initT.hourlyRate,
              bio: initT.bio,
              bioBn: initT.bioBn,
              institute: initT.institute,
              degree: initT.degree,
              subjects: initT.subjects,
              subjectsBn: initT.subjectsBn,
              district: initT.district,
              area: initT.area
            };
          }
          return initT;
        });
        return [...merged, ...customAdded];
      }
      return INITIAL_TUTORS;
    } catch {
      return INITIAL_TUTORS;
    }
  });

  useEffect(() => {
    localStorage.setItem('tm_tutors', JSON.stringify(tutors));
  }, [tutors]);

  const toggleTutorVerified = (id: string) => {
    setTutors(prev =>
      prev.map(t => (t.id === id ? { ...t, verified: !t.verified } : t))
    );
    showToast(lang === 'bn' ? 'টিউটরের ভেরিফিকেশন স্ট্যাটাস পরিবর্তিত হয়েছে' : 'Tutor verification status toggled');
  };

  const updateTutor = (updated: Tutor) => {
    setTutors(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    showToast(lang === 'bn' ? 'টিউটর তথ্য আপডেট হয়েছে' : 'Tutor profile updated');
  };

  const addTutor = (newTutor: Tutor) => {
    setTutors(prev => [newTutor, ...prev]);
    showToast(lang === 'bn' ? 'নতুন টিউটর প্রোফাইল তৈরি হয়েছে' : 'Tutor profile created successfully');
  };

  // Mock Tests
  const [mockTests, setMockTests] = useState<MockTest[]>(() => {
    try {
      const saved = localStorage.getItem('tm_mock_tests');
      if (saved) {
        const parsed = JSON.parse(saved) as MockTest[];
        const initialIds = new Set(INITIAL_MOCK_TESTS.map(t => t.id));
        const customAdded = parsed.filter(p => !initialIds.has(p.id));
        return [...INITIAL_MOCK_TESTS, ...customAdded];
      }
      return INITIAL_MOCK_TESTS;
    } catch {
      return INITIAL_MOCK_TESTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('tm_mock_tests', JSON.stringify(mockTests));
  }, [mockTests]);

  const addMockTest = (test: MockTest) => {
    setMockTests(prev => [test, ...prev]);
    showToast(lang === 'bn' ? 'নতুন মক টেস্ট যুক্ত হয়েছে' : 'New mock test published successfully');
  };

  const deleteMockTest = (id: string) => {
    setMockTests(prev => prev.filter(t => t.id !== id));
    showToast(lang === 'bn' ? 'মক টেস্ট মুছে ফেলা হয়েছে' : 'Mock test deleted', 'info');
  };

  // Resources
  const [resources, setResources] = useState<StudyResource[]>(() => {
    try {
      const saved = localStorage.getItem('tm_resources');
      return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
    } catch {
      return INITIAL_RESOURCES;
    }
  });

  useEffect(() => {
    localStorage.setItem('tm_resources', JSON.stringify(resources));
  }, [resources]);

  const addResource = (res: StudyResource) => {
    setResources(prev => [res, ...prev]);
    showToast(lang === 'bn' ? 'স্টাডি রিসোর্স সফলভাবে আপলোড হয়েছে' : 'Resource uploaded successfully');
  };

  // Ad Configs
  const [adConfigs, setAdConfigs] = useState<Record<string, AdConfig>>(() => {
    try {
      const saved = localStorage.getItem('tm_ads');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_AD_CONFIGS,
          ...parsed
        };
      }
      return INITIAL_AD_CONFIGS;
    } catch {
      return INITIAL_AD_CONFIGS;
    }
  });

  const updateAdConfig = (key: string, data: Partial<AdConfig>, silent = false) => {
    setAdConfigs(prev => {
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          ...data
        }
      };
      localStorage.setItem('tm_ads', JSON.stringify(updated));
      return updated;
    });
    if (!silent) {
      showToast(lang === 'bn' ? 'বিজ্ঞাপনটি সফলভাবে সেভ ও ওয়েবসাইটে পাবলিশ হয়েছে!' : 'Ad slot saved & published live to website!');
    }
  };

  const saveAllAdConfigs = (allConfigs: Record<string, AdConfig>) => {
    setAdConfigs(allConfigs);
    localStorage.setItem('tm_ads', JSON.stringify(allConfigs));
    showToast(lang === 'bn' ? 'সকল বিজ্ঞাপন সফলভাবে সেভ ও লাইভ পাবলিশ হয়েছে!' : 'All ad placements saved and published live to website!');
  };

  // Test Results
  const [testResults, setTestResults] = useState<TestResult[]>(() => {
    try {
      const saved = localStorage.getItem('tm_results');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_STUDENT_TEST_RESULTS;
    } catch {
      return INITIAL_STUDENT_TEST_RESULTS;
    }
  });

  const saveTestResult = (result: TestResult) => {
    setTestResults(prev => {
      const updated = [result, ...prev];
      localStorage.setItem('tm_results', JSON.stringify(updated));
      return updated;
    });
    // Update student completed tests and streak
    if (currentUser && currentUser.role === 'student') {
      const newStreak = (currentUser.streakDays || 1) + 1;
      const newCompleted = (currentUser.completedTestsCount || 0) + 1;
      updateUser({ streakDays: newStreak, completedTestsCount: newCompleted });
    }
  };

  // Saved Bookmarks
  const [savedTutorIds, setSavedTutorIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tm_saved_tutors');
      return saved ? JSON.parse(saved) : ['tutor-1'];
    } catch {
      return ['tutor-1'];
    }
  });

  const toggleSaveTutor = (id: string) => {
    setSavedTutorIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('tm_saved_tutors', JSON.stringify(next));
      showToast(
        exists
          ? (lang === 'bn' ? 'বুকমার্ক সরানো হয়েছে' : 'Removed from bookmarks')
          : (lang === 'bn' ? 'টিউটর বুকমার্কে যুক্ত হয়েছে' : 'Tutor saved to bookmarks')
      );
      return next;
    });
  };

  const [savedTestIds, setSavedTestIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tm_saved_tests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSaveTest = (id: string) => {
    setSavedTestIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('tm_saved_tests', JSON.stringify(next));
      showToast(exists ? 'Test removed from saved' : 'Test saved for practice');
      return next;
    });
  };

  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tm_saved_resources');
      return saved ? JSON.parse(saved) : ['res-1'];
    } catch {
      return ['res-1'];
    }
  });

  const toggleSaveResource = (id: string) => {
    setSavedResourceIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('tm_saved_resources', JSON.stringify(next));
      showToast(
        exists
          ? (lang === 'bn' ? 'রিসোর্স তালিকা থেকে সরানো হয়েছে' : 'Removed from saved resources')
          : (lang === 'bn' ? 'রিসোর্স সেভ করা হয়েছে' : 'Resource saved to your library')
      );
      return next;
    });
  };

  // Inquiries
  const [inquiries, setInquiries] = useState<StudentInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('tm_inquiries');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'inq-1',
              tutorId: 'tutor-1',
              studentName: 'Sadman Sakib',
              studentPhone: '+880 1711 002233',
              studentEmail: 'sadman.sakib@gmail.com',
              subject: 'HSC Physics & Higher Math',
              message: 'Assalamu Alaikum brother. I am an HSC 2026 science student in Dhanmondi. I need help 3 days a week in Calculus and Electricity.',
              date: 'Yesterday at 4:30 PM',
              status: 'new'
            }
          ];
    } catch {
      return [];
    }
  });

  const sendInquiry = (inquiryData: Omit<StudentInquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: StudentInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'new'
    };
    setInquiries(prev => {
      const updated = [newInquiry, ...prev];
      localStorage.setItem('tm_inquiries', JSON.stringify(updated));
      return updated;
    });
    showToast(
      lang === 'bn'
        ? 'আপনার বার্তাটি সফলভাবে টিউটরের কাছে পাঠানো হয়েছে!'
        : 'Inquiry sent directly to tutor!'
    );
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        currentUser,
        login,
        logout,
        updateUser,
        tutors,
        toggleTutorVerified,
        updateTutor,
        addTutor,
        mockTests,
        addMockTest,
        deleteMockTest,
        resources,
        addResource,
        adConfigs,
        updateAdConfig,
        saveAllAdConfigs,
        testResults,
        saveTestResult,
        savedTutorIds,
        savedTestIds,
        savedResourceIds,
        toggleSaveTutor,
        toggleSaveTest,
        toggleSaveResource,
        inquiries,
        sendInquiry,
        toast,
        showToast,
        currentPage,
        pageParam,
        navigateTo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
