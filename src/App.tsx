import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { InquiryModal } from './components/InquiryModal';
import { ShareModal } from './components/ShareModal';
import { AdSlot } from './components/AdSlot';
import { TopTickerAd } from './components/TopTickerAd';
import { Tutor, TestResult, UserRole } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { FindTutorsPage } from './pages/FindTutorsPage';
import { TutorProfilePage } from './pages/TutorProfilePage';
import { MockTestsPage } from './pages/MockTestsPage';
import { TestTakingPage } from './pages/TestTakingPage';
import { TestResultPage } from './pages/TestResultPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { TutorDashboardPage } from './pages/TutorDashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage, TermsPage } from './pages/PrivacyPage';

function MainAppContent() {
  const { currentPage, pageParam, navigateTo } = useApp();

  // Modals state
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authRole, setAuthRole] = useState<UserRole>('student');

  const [contactTutor, setContactTutor] = useState<Tutor | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const [shareData, setShareData] = useState<{ title: string; url: string } | null>(null);

  // Active Test and Test Result
  const [activeTestId, setActiveTestId] = useState<string>('test-ssc-physics');
  const [activeResult, setActiveResult] = useState<TestResult | null>(null);
  const [selectedTutorId, setSelectedTutorId] = useState<string>('tutor-1');

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login', role: UserRole = 'student') => {
    setAuthMode(mode);
    setAuthRole(role);
    setAuthOpen(true);
  };

  const handleSelectTutor = (tutorId: string) => {
    setSelectedTutorId(tutorId);
    navigateTo('tutor-profile');
  };

  const handleContactTutor = (tutor: Tutor) => {
    setContactTutor(tutor);
    setInquiryOpen(true);
  };

  const handleSelectTest = (testId: string) => {
    setActiveTestId(testId);
    navigateTo('test-taking');
  };

  const handleFinishTest = (result: TestResult) => {
    setActiveResult(result);
    navigateTo('test-result');
  };

  const handleShare = (title: string, url: string) => {
    setShareData({ title, url });
  };

  // If in distraction-free test taking page, render top ticker and test
  if (currentPage === 'test-taking') {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
        <TopTickerAd />
        <TestTakingPage
          testId={activeTestId}
          onFinishTest={handleFinishTest}
          onCancel={() => navigateTo('tests')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-[#0F172A] relative overflow-x-hidden">
      {/* Subtle Ambient Background Lighting Layer (Non-intrusive, elegant, GPU-composited) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft academic sapphire glow top-left */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#1E3A8A]/6 to-[#3B82F6]/4 blur-3xl animate-ambient-float-1" />
        
        {/* Soft warm amber glow top-right */}
        <div className="absolute top-10 -right-28 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#F59E0B]/5 to-transparent blur-3xl animate-ambient-float-2" />
        
        {/* Soft central subtle breathing glow */}
        <div className="absolute top-[45%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#1E3A8A]/3 blur-3xl animate-ambient-pulse" />
      </div>

      {/* 🔴 Top Breaking News Ticker Ad (Visible on every single page of the website) */}
      <TopTickerAd />

      {/* Sticky Top Bar Contract */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main Page Views with Silky Smooth AnimatePresence Transition */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {currentPage === 'home' && (
              <HomePage
                onOpenAuth={handleOpenAuth}
                onSelectTutor={handleSelectTutor}
                onSelectTest={handleSelectTest}
              />
            )}

            {currentPage === 'tutors' && (
              <FindTutorsPage
                initialSearch={pageParam}
                onSelectTutor={handleSelectTutor}
                onContactTutor={handleContactTutor}
              />
            )}

            {currentPage === 'tutor-profile' && (
              <TutorProfilePage
                tutorId={selectedTutorId}
                onBack={() => navigateTo('tutors')}
                onSelectTutor={handleSelectTutor}
                onContactTutor={handleContactTutor}
                onShare={handleShare}
              />
            )}

            {currentPage === 'tests' && (
              <MockTestsPage onSelectTest={handleSelectTest} />
            )}

            {currentPage === 'test-result' && activeResult && (
              <TestResultPage
                result={activeResult}
                onRetake={testId => {
                  setActiveTestId(testId);
                  navigateTo('test-taking');
                }}
                onBackToTests={() => navigateTo('tests')}
                onShare={handleShare}
              />
            )}

            {currentPage === 'resources' && <ResourcesPage />}

            {(currentPage === 'student-dashboard' || currentPage === 'progress') && (
              <StudentDashboardPage
                onSelectTest={handleSelectTest}
                onSelectTutor={handleSelectTutor}
              />
            )}

            {currentPage === 'tutor-dashboard' && <TutorDashboardPage />}

            {currentPage === 'admin' && <AdminPanelPage />}

            {currentPage === 'about' && <AboutPage />}

            {currentPage === 'contact' && <ContactPage />}

            {currentPage === 'privacy' && <PrivacyPage />}

            {currentPage === 'terms' && <TermsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating System Components */}
      <Toast />
      <AdSlot type="bottom_bar" />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
        initialRole={authRole}
      />

      {/* Direct Contact Modal */}
      <InquiryModal
        tutor={contactTutor}
        isOpen={inquiryOpen}
        onClose={() => {
          setInquiryOpen(false);
          setContactTutor(null);
        }}
      />

      {/* Share Modal */}
      {shareData && (
        <ShareModal
          isOpen={!!shareData}
          onClose={() => setShareData(null)}
          title={shareData.title}
          url={shareData.url}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
