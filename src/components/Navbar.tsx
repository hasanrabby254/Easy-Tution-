import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Globe,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Flame,
  LayoutDashboard,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (initialMode?: 'login' | 'signup', initialRole?: 'student' | 'tutor') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { lang, toggleLang, t, currentUser, logout, currentPage, navigateTo } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth scroll progress bar at the very top of the window
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { id: 'tutors', labelEn: 'Find Tutors', labelBn: 'টিউটর খুঁজুন' },
    { id: 'tests', labelEn: 'Mock Tests', labelBn: 'মক টেস্ট' },
    { id: 'resources', labelEn: 'Resources', labelBn: 'স্টাডি রিসোর্স' },
    { id: 'about', labelEn: 'About', labelBn: 'আমাদের সম্পর্কে' },
  ];

  const handleNavClick = (pageId: string) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Subtle, ultra-sleek scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#F59E0B] origin-left z-50 pointer-events-none shadow-[0_1px_6px_rgba(30,58,138,0.25)]"
        style={{ scaleX }}
      />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-xs'
            : 'bg-white border-b border-transparent shadow-none'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Title (single text element wordmark with icon) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none cursor-pointer"
            aria-label="Easy Tution Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 border border-blue-900/40">
              <GraduationCap className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#1E3A8A] block leading-none">
                Easy<span className="text-[#F59E0B]"> Tution</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 hidden sm:block tracking-wide">
                Learn , Teach , Grow
              </span>
            </div>
          </button>

          {/* Zone 2: Clean 4–6 text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-[#1E3A8A] whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-[#1E3A8A] font-bold' : ''
                  }`}
                >
                  {t(link.labelEn, link.labelBn)}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#1E3A8A] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions & Language toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors cursor-pointer shadow-2xs"
              title={lang === 'en' ? 'বাংলা ভাষায় দেখুন' : 'Switch to English'}
              aria-label="Language selector"
            >
              <Globe className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Auth or User profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <p className="font-semibold text-slate-900 leading-tight truncate max-w-[100px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-500 capitalize">{currentUser.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.emailOrPhone}</p>
                      {currentUser.role === 'student' && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md w-fit font-semibold">
                          <Flame className="w-3 h-3 text-[#F59E0B]" />
                          <span>{currentUser.streakDays || 1} {t('Day Streak', 'দিনের স্ট্রিক')}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        navigateTo(currentUser.role === 'tutor' ? 'tutor-dashboard' : 'student-dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#1E3A8A]" />
                      <span>{t('My Dashboard', 'আমার ড্যাশবোর্ড')}</span>
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                      <span>{t('Admin Panel', 'অ্যাডমিন প্যানেল')}</span>
                    </button>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('Sign Out', 'লগআউট')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-xs font-bold text-[#1E3A8A] hover:text-[#1E40AF] transition-colors cursor-pointer"
                >
                  {t('Log In', 'লগইন')}
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  {t('Sign Up Free', 'ফ্রি একাউন্ট')}
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-18 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="w-full max-w-sm bg-white h-full shadow-2xl p-6 border-r border-slate-200 flex flex-col justify-between"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
                {t('Navigation', 'মেন্যু')}
              </p>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      currentPage === link.id
                        ? 'bg-blue-50 text-[#1E3A8A]'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {t(link.labelEn, link.labelBn)}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>{t('Admin Panel (Demo)', 'অ্যাডমিন প্যানেল (ডেমো)')}</span>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">admin123</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => {
                      handleNavClick(currentUser.role === 'tutor' ? 'tutor-dashboard' : 'student-dashboard');
                    }}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl text-center shadow-xs"
                  >
                    {t('Open Dashboard', 'ড্যাশবোর্ড খুলুন')}
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl text-center"
                  >
                    {t('Sign Out', 'লগআউট')}
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="py-2.5 px-4 text-xs font-semibold text-[#1E3A8A] border border-blue-200 hover:bg-blue-50 rounded-xl text-center"
                  >
                    {t('Log In', 'লগইন')}
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signup');
                    }}
                    className="py-2.5 px-4 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl text-center shadow-xs"
                  >
                    {t('Sign Up', 'নিবন্ধন')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
