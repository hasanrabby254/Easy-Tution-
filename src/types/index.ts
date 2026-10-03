export type Language = 'en' | 'bn';

export type UserRole = 'student' | 'tutor' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  emailOrPhone: string;
  password?: string;
  avatar?: string;
  joinedDate: string;
  // Student specifics
  classLevel?: string;
  preferredSubjects?: string[];
  district?: string;
  streakDays?: number;
  completedTestsCount?: number;
  // Tutor specifics
  verified?: boolean;
  institute?: string;
  degree?: string;
  experienceYears?: number;
  teachingMode?: 'online' | 'offline' | 'both';
  bio?: string;
  subjectsTaught?: string[];
  hourlyRate?: string;
  area?: string;
  profileViews?: number;
  contactClicks?: number;
}

export interface Tutor {
  id: string;
  name: string;
  nameBn?: string;
  photoUrl: string;
  verified: boolean;
  subjects: string[];
  subjectsBn?: string[];
  classLevels: string[];
  district: string;
  area: string;
  institute: string;
  degree: string;
  experienceYears: number;
  teachingMode: 'online' | 'offline' | 'both';
  bio: string;
  bioBn?: string;
  hourlyRate: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  availability: string;
}

export interface Question {
  id: string;
  text: string;
  textBn?: string;
  options: string[];
  optionsBn?: string[];
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
  explanationBn?: string;
}

export interface MockTest {
  id: string;
  title: string;
  titleBn: string;
  subject: string;
  subjectBn?: string;
  category: 'SSC' | 'HSC' | 'Admission' | 'Class 6-8' | 'General Knowledge' | 'English';
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionCount: number;
  questions: Question[];
  totalAttempts?: number;
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  timeTakenSeconds: number;
  completedAt: string;
  userAnswers: Record<number, number>; // question index -> option index
}

export interface StudyResource {
  id: string;
  title: string;
  titleBn?: string;
  subject: string;
  classLevel: string;
  fileType: 'PDF' | 'Notes' | 'Formula Sheet' | 'Suggestion' | 'Guide';
  size: string;
  downloadCount: number;
  uploaderName: string;
  description: string;
  descriptionBn?: string;
  coverImage?: string;
}

export interface StudentInquiry {
  id: string;
  tutorId: string;
  studentName: string;
  studentPhone: string;
  studentEmail?: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'replied';
}

export interface AdConfig {
  id: string;
  slotName: string; // 'top_banner' | 'sidebar' | 'native_tutor' | 'profile_banner' | 'test_sidebar'
  sponsorName: string;
  tagline: string;
  description: string;
  ctaText: string;
  targetUrl: string;
  badgeText: string;
  enabled: boolean;
}
