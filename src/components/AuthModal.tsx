import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, UserRole } from '../types';
import { IMAGE_ASSETS } from '../utils/imageAssets';
import {
  X,
  GraduationCap,
  BookOpen,
  Eye,
  EyeOff,
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'student'
}) => {
  const { login, t, lang } = useApp();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  // Student specific
  const [classLevel, setClassLevel] = useState('HSC');
  const [preferredSubjects, setPreferredSubjects] = useState('Physics, Math');
  const [district, setDistrict] = useState('Dhaka');

  // Tutor specific
  const [institute, setInstitute] = useState('BUET');
  const [degree, setDegree] = useState('B.Sc. in Engineering');
  const [experienceYears, setExperienceYears] = useState(3);
  const [teachingMode, setTeachingMode] = useState<'online' | 'offline' | 'both'>('both');
  const [subjectsTaught, setSubjectsTaught] = useState('Physics, Higher Math');
  const [area, setArea] = useState('Dhanmondi, Dhaka');
  const [hourlyRate, setHourlyRate] = useState('৳ 6,000 / month');
  const [bio, setBio] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>(IMAGE_ASSETS.tutorPortraitMale);

  if (!isOpen) return null;

  const handleQuickDemoLogin = (selectedRole: UserRole) => {
    if (selectedRole === 'student') {
      const demoStudent: User = {
        id: 'usr-student-1',
        role: 'student',
        name: 'Samiul Bashar',
        emailOrPhone: 'samiul.student@gmail.com',
        classLevel: 'HSC Science',
        preferredSubjects: ['Physics', 'Chemistry', 'Higher Math'],
        district: 'Dhaka',
        streakDays: 4,
        completedTestsCount: 7,
        joinedDate: 'March 2026'
      };
      login(demoStudent);
      onClose();
    } else {
      const demoTutor: User = {
        id: 'tutor-1',
        role: 'tutor',
        name: 'Tanvir Ahmed',
        emailOrPhone: 'tanvir.buet.eee@gmail.com',
        institute: 'BUET (Electrical & Electronic Engineering)',
        degree: 'B.Sc. in EEE',
        experienceYears: 4,
        teachingMode: 'both',
        subjectsTaught: ['Physics', 'Higher Math'],
        district: 'Dhaka',
        area: 'Dhanmondi & Mirpur',
        hourlyRate: '৳ 6,000 - 8,000 / month',
        bio: 'Passionate about simplifying core conceptual physics and calculus.',
        verified: true,
        joinedDate: 'January 2026'
      };
      login(demoTutor);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'forgot') {
      if (!emailOrPhone) {
        setErrorMsg(t('Please enter your registered email or phone.', 'অনুগ্রহ করে ইমেইল বা ফোন নম্বর দিন।'));
        return;
      }
      setSuccessNotice(t('Password reset instructions sent via SMS / Email.', 'পাসওয়ার্ড রিসেট নির্দেশিকা পাঠানো হয়েছে।'));
      return;
    }

    if (!emailOrPhone || !password) {
      setErrorMsg(t('Please fill in all required fields.', 'সবগুলো প্রয়োজনীয় ঘর পূরণ করুন।'));
      return;
    }

    if (mode === 'signup' && !name) {
      setErrorMsg(t('Please enter your full name.', 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।'));
      return;
    }

    if (mode === 'login') {
      const user: User = {
        id: `usr-${Date.now()}`,
        role,
        name: emailOrPhone.split('@')[0] || (role === 'student' ? 'Student' : 'Tutor'),
        emailOrPhone,
        joinedDate: 'October 2026',
        streakDays: 1,
        completedTestsCount: 0
      };
      login(user);
      onClose();
    } else {
      // Sign up
      const newUser: User = {
        id: `usr-${Date.now()}`,
        role,
        name,
        emailOrPhone,
        password,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        ...(role === 'student'
          ? {
              classLevel,
              preferredSubjects: preferredSubjects.split(',').map(s => s.trim()),
              district,
              streakDays: 1,
              completedTestsCount: 0
            }
          : {
              institute,
              degree,
              experienceYears: Number(experienceYears),
              teachingMode,
              subjectsTaught: subjectsTaught.split(',').map(s => s.trim()),
              area,
              hourlyRate,
              bio,
              avatar: photoPreview,
              verified: false
            })
      };
      login(newUser);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FFFFFF] rounded-2xl border border-[#ECE8E0] shadow-2xl p-6 md:p-8 my-8 relative overflow-hidden animate-in fade-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-[#6B6760] hover:text-[#1C1B1F] hover:bg-[#FBF9F5] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#272A6B] text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
            <GraduationCap className="w-6 h-6 text-[#D9A441]" />
          </div>
          <h3 className="text-xl font-bold text-[#1C1B1F]">
            {mode === 'login' && t('Welcome back to Easy Tution', 'ইজি টিউশনে স্বাগতম')}
            {mode === 'signup' && t('Create your free account', 'বিনামূল্যে অ্যাকাউন্ট খুলুন')}
            {mode === 'forgot' && t('Reset your password', 'পাসওয়ার্ড পুনরুদ্ধার')}
          </h3>
          <p className="text-xs text-[#6B6760] mt-1">
            {t(
              '100% Free platform for students & tutors across Bangladesh',
              'শিক্ষার্থী ও শিক্ষকদের জন্য ১০০% ফ্রি ও নিরাপদ প্ল্যাটফর্ম'
            )}
          </p>
        </div>

        {/* Quick Demo Login Pill Bar */}
        <div className="mb-5 p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            {t('Quick Demo Mode:', 'দ্রুত ডেমো লগইন:')}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 hover:border-[#1E3A8A] text-[#1E3A8A] transition-colors shadow-2xs"
            >
              {t('Demo Student', 'শিক্ষার্থী ডেমো')}
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('tutor')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 hover:border-[#1E3A8A] text-[#1E3A8A] transition-colors shadow-2xs"
            >
              {t('Demo Tutor', 'টিউটর ডেমো')}
            </button>
          </div>
        </div>

        {/* Role Selector Card (when in signup or login) */}
        {mode !== 'forgot' && (
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-500 mb-2 text-center">
              {t('Select your role', 'আপনার ভূমিকা নির্বাচন করুন')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  role === 'student'
                    ? 'border-[#1E3A8A] bg-blue-50/50 shadow-xs ring-1 ring-[#1E3A8A]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    role === 'student' ? 'bg-[#1E3A8A] text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{t('I am a Student', 'আমি শিক্ষার্থী')}</span>
                    {role === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A8A]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {t('Find tutors & take mock tests', 'টিউটর খুঁজুন ও পরীক্ষা দিন')}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('tutor')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  role === 'tutor'
                    ? 'border-[#1E3A8A] bg-blue-50/50 shadow-xs ring-1 ring-[#1E3A8A]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    role === 'tutor' ? 'bg-[#1E3A8A] text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{t('I am a Tutor', 'আমি শিক্ষক')}</span>
                    {role === 'tutor' && <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A8A]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {t('Offer tuitions & reach students', 'টিউশনি পান ও স্টুডেন্ট খুঁজুন')}
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
            {errorMsg}
          </div>
        )}
        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
            {successNotice}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                {t('Full Name', 'পুরো নাম')} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={role === 'student' ? 'e.g. Samiul Bashar' : 'e.g. Tanvir Ahmed'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#1E3A8A]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              {t('Email Address or Phone Number', 'ইমেইল বা ফোন নম্বর')} *
            </label>
            <input
              type="text"
              required
              value={emailOrPhone}
              onChange={e => setEmailOrPhone(e.target.value)}
              placeholder="01712xxxxxx or user@domain.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#1E3A8A]"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-900">
                  {t('Password', 'পাসওয়ার্ড')} *
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-bold text-[#1E3A8A] hover:underline"
                  >
                    {t('Forgot password?', 'পাসওয়ার্ড ভুলে গেছেন?')}
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#1E3A8A] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Student Signup Specifics */}
          {mode === 'signup' && role === 'student' && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  {t('Class / Level', 'শ্রেণি / লেভেল')}
                </label>
                <select
                  value={classLevel}
                  onChange={e => setClassLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="Class 6-8">Class 6-8 (৬ষ্ঠ - ৮ম)</option>
                  <option value="SSC">SSC (৯ম - ১০ম)</option>
                  <option value="HSC">HSC (একাদশ - দ্বাদশ)</option>
                  <option value="Admission">University Admission (ভর্তি পরীক্ষা)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  {t('District', 'জেলা')}
                </label>
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="Dhaka">Dhaka (ঢাকা)</option>
                  <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                  <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                  <option value="Sylhet">Sylhet (সিলেট)</option>
                  <option value="Khulna">Khulna (খুলনা)</option>
                  <option value="Barishal">Barishal (বরিশাল)</option>
                  <option value="Rangpur">Rangpur (রংপুর)</option>
                  <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                </select>
              </div>
            </div>
          )}

          {/* Tutor Signup Specifics */}
          {mode === 'signup' && role === 'tutor' && (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">
                    {t('Institute / University', 'বিশ্ববিদ্যালয় / প্রতিষ্ঠান')}
                  </label>
                  <input
                    type="text"
                    value={institute}
                    onChange={e => setInstitute(e.target.value)}
                    placeholder="e.g. BUET, DU, DMC, RU"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">
                    {t('Degree', 'ডিগ্রি')}
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={e => setDegree(e.target.value)}
                    placeholder="e.g. B.Sc. in EEE, MBBS"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">
                    {t('Teaching Mode', 'পড়ানোর মাধ্যম')}
                  </label>
                  <select
                    value={teachingMode}
                    onChange={e => setTeachingMode(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs"
                  >
                    <option value="both">{t('Both (Online & Home)', 'উভয় মাধ্যম')}</option>
                    <option value="online">{t('Online Only', 'শুধুমাত্র অনলাইন')}</option>
                    <option value="offline">{t('Home Tutoring Only', 'সরাসরি হোম টিউশন')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">
                    {t('Tutoring Experience', 'অভিজ্ঞতা')}
                  </label>
                  <select
                    value={experienceYears}
                    onChange={e => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs"
                  >
                    <option value={1}>1 Year (১ বছর)</option>
                    <option value={2}>2 Years (২ বছর)</option>
                    <option value={3}>3 Years (৩ বছর)</option>
                    <option value={5}>5+ Years (৫+ বছর)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  {t('Subjects Taught (comma separated)', 'পড়ানোর বিষয়সমূহ')}
                </label>
                <input
                  type="text"
                  value={subjectsTaught}
                  onChange={e => setSubjectsTaught(e.target.value)}
                  placeholder="e.g. Physics, Higher Math, Chemistry"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  {t('Preferred Area / Location', 'পছন্দের এলাকা')}
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder="e.g. Dhanmondi, Lalmatia, Dhaka"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  {t('Short Bio', 'সংক্ষিপ্ত পরিচিতি')}
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Briefly describe your teaching methodology..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] transition-all shadow-xs cursor-pointer mt-2"
          >
            {mode === 'login' && t('Sign In to Easy Tution', 'লগইন করুন')}
            {mode === 'signup' && t('Complete Registration (Free)', 'বিনামূল্যে নিবন্ধন সম্পন্ন করুন')}
            {mode === 'forgot' && t('Send Reset Link', 'রিসেট লিংক পাঠান')}
          </button>
        </form>

        {/* Modal Footer toggles */}
        <div className="mt-5 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              {t("Don't have an account?", 'কোনো অ্যাকাউন্ট নেই?')}{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-[#1E3A8A] hover:underline"
              >
                {t('Sign Up Free', 'ফ্রি একাউন্ট খুলুন')}
              </button>
            </p>
          ) : (
            <p>
              {t('Already registered?', 'ইতিমধ্যে অ্যাকাউন্ট আছে?')}{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#1E3A8A] hover:underline"
              >
                {t('Sign In', 'লগইন করুন')}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
