export type Language = 'en' | 'zh' | 'fr';

export type PhotoCategory = 
  | 'all'
  | 'landscape'
  | 'portrait'
  | 'street'
  | 'architecture'
  | 'macro'
  | 'campus'
  | 'experimental';

export interface ExifData {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  location: string;
  date: string;
}

export interface PhotoCritique {
  id: string;
  author: string;
  role: string;
  comment: string;
  commentZh?: string;
  commentFr?: string;
  time: string;
  rating: number; // 1-5
}

export interface PhotoItem {
  id: string;
  title: string;
  titleZh: string;
  titleFr?: string;
  author: string;
  authorGrade: string; // e.g. "Grade 11" / "11年级" / "11e année"
  year: string; // e.g. "2026", "2025", "2024"
  category: PhotoCategory;
  imageUrl: string;
  rawUrl?: string; // For split RAW vs Color-graded comparison
  exif: ExifData;
  description: string;
  descriptionZh: string;
  descriptionFr?: string;
  likes: number;
  featured?: boolean;
  isExhibited?: boolean;
  award?: string;
  awardZh?: string;
  awardFr?: string;
  tags: string[];
  critiques: PhotoCritique[];
  createdAt: string;
}

export interface StudentPhotographerProfile {
  id: string;
  name: string;
  nameZh: string;
  grade: string;
  gradeZh: string;
  gradeFr: string;
  roleEn: string;
  roleZh: string;
  roleFr: string;
  specialtyEn: string;
  specialtyZh: string;
  specialtyFr: string;
  gear: string;
  bioEn: string;
  bioZh: string;
  bioFr: string;
  avatarUrl: string;
}

export type UserRole = 'student' | 'curator_admin' | 'guest';

export interface UserProfile {
  id: string;
  studentId: string;
  name: string;
  email: string;
  grade: string; // e.g. "Grade 11"
  role: UserRole;
  avatar: string;
  bio: string;
  bioZh: string;
  bioFr?: string;
  cameraGear: string;
  joinedDate: string;
  submittedPhotoCount: number;
  approvedPhotoCount: number;
}

export interface PhotoSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentGrade: string;
  studentEmail: string;
  title: string;
  titleZh: string;
  titleFr?: string;
  category: PhotoCategory;
  year: string;
  imageUrl: string;
  rawUrl?: string;
  exif: ExifData;
  description: string;
  descriptionZh: string;
  descriptionFr?: string;
  tags: string[];
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  curatorFeedback?: string;
  curatorFeedbackZh?: string;
  curatorFeedbackFr?: string;
}

export type EventCategory = 'photowalk' | 'workshop' | 'darkroom' | 'masterclass' | 'exhibition' | 'contest';

export interface EventAgendaItem {
  time: string;
  activity: string;
  activityZh: string;
  activityFr?: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  titleZh: string;
  titleFr?: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "15:30 - 17:30"
  location: string;
  locationZh: string;
  locationFr?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  coverImage: string;
  description: string;
  descriptionZh: string;
  descriptionFr?: string;
  instructor: string;
  instructorRole: string;
  instructorRoleZh?: string;
  instructorRoleFr?: string;
  spotsTotal: number;
  spotsRegistered: number;
  isRegistrationOpen: boolean;
  agenda: EventAgendaItem[];
  requirements: string[];
  requirementsZh: string[];
  requirementsFr?: string[];
  registeredUsers?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  titleZh: string;
  titleFr?: string;
  date: string;
  category: 'general' | 'contest' | 'equipment' | 'exhibition';
  content: string;
  contentZh: string;
  contentFr?: string;
  author: string;
  isImportant?: boolean;
}

export interface WeeklyChallenge {
  id: string;
  themeTitle: string;
  themeTitleZh: string;
  themeTitleFr?: string;
  description: string;
  descriptionZh: string;
  descriptionFr?: string;
  deadline: string;
  prize: string;
  prizeZh: string;
  prizeFr?: string;
  keywords: string[];
  submissionsCount: number;
  sampleImages: string[];
}

export interface MemberSpotlight {
  id: string;
  name: string;
  grade: string;
  role: string;
  roleZh: string;
  roleFr?: string;
  avatar: string;
  bio: string;
  bioZh: string;
  bioFr?: string;
  gearBag: { name: string; type: string }[];
  favoriteGenre: string;
  favoriteGenreZh: string;
  favoriteGenreFr?: string;
  featuredPhotoId: string;
}

export type NewsCategory = 'sports' | 'campus' | 'gear' | 'interview' | 'editorial';

export interface GalleryImageItem {
  url: string;
  captionZh: string;
  caption: string;
  exif?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  titleZh: string;
  titleFr?: string;
  summary: string;
  summaryZh: string;
  summaryFr?: string;
  category: NewsCategory;
  date: string;
  readTime: string;
  author: string;
  authorGrade?: string;
  authorRole: string;
  coverImage: string;
  tags: string[];
  content: string;
  contentZh: string;
  contentFr?: string;
  galleryImages?: GalleryImageItem[];
  matchStats?: {
    fixture: string;
    stadium: string;
    score?: string;
    competition: string;
    keyMoment: string;
    keyMomentZh: string;
    broadcast?: string;
    kickoffTime?: string;
    homeTeam?: string;
    awayTeam?: string;
    homeFormation?: string;
    awayFormation?: string;
    projectedHomeXI?: string[];
    projectedAwayXI?: string[];
    doubts?: { home: string[]; away: string[] };
    prediction?: string;
    articleType?: 'preview' | 'report' | 'analysis';
  };
  featured?: boolean;
  likes: number;
}

export type TutorialCategory = 'shutter' | 'iso' | 'aperture' | 'exposure' | 'sports_action' | 'darkroom';

export interface TutorialLesson {
  id: string;
  category: TutorialCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  levelZh: '新手入门' | '进阶实操' | '专业大师';
  title: string;
  titleZh: string;
  titleFr?: string;
  subtitle: string;
  subtitleZh: string;
  subtitleFr?: string;
  readTime: string;
  recommendedGear?: string;
  keyFormulas?: { labelZh: string; label: string; formula: string; explanationZh: string }[];
  quickTipsZh: string[];
  quickTips: string[];
  detailedGuideZh: string;
  detailedGuide: string;
  practicalScenariosZh: { scenario: string; recommendedSettings: string; why: string }[];
  interactiveSimulatorType?: 'shutter' | 'iso' | 'aperture' | 'exposure' | 'sports_action' | 'darkroom';
}

export type MaterialCategory = 'all' | 'footage' | 'photo' | 'lut' | 'sfx' | 'pack' | 'template';

export interface MaterialVaultItem {
  id: string;
  title: string;
  titleZh: string;
  category: 'footage' | 'photo' | 'lut' | 'sfx' | 'pack' | 'template';
  categoryLabelZh: string;
  resolution?: string; // e.g. '4K UHD', '4K DCI', 'RAW'
  fps?: string; // e.g. '59.94', '120 fps', '24 fps'
  colorProfile?: string; // e.g. 'S-Log3', 'C-Log3', 'Linear DNG'
  lens?: string;
  camera?: string;
  thumbnailUrl: string;
  videoPreviewUrl?: string;
  duration?: string;
  fileSize: string;
  format: string; // e.g. 'ProRes 422 HQ', '10-bit MP4', '33-Cube LUT', '24-bit WAV'
  tags: string[];
  downloads: number;
  author: string;
  descriptionZh: string;
  description: string;
  createdAt: string;
  isCommercialAllowed: boolean;
}

export interface MaterialOrder {
  id: string; // e.g. 'PG-ORD-2026-9281'
  createdAt: string;
  userName: string;
  email: string;
  organizationOrTeam?: string;
  usageType: 'personal' | 'commercial';
  projectDescription: string;
  items: MaterialVaultItem[];
  totalAmount: number; // Always 0 (Free)
  status: 'completed';
  licenseCode: string;
  downloadUrls: { itemId: string; itemTitle: string; url: string; format: string }[];
}

export type CourseTrack = 'photography' | 'videography';

export interface CourseLessonItem {
  id: string;
  lessonNumber: number;
  titleZh: string;
  title: string;
  duration: string;
  videoUrl?: string;
  articleContentZh: string;
  articleContent?: string;
  keyPointsZh: string[];
  keyPoints?: string[];
  attachedMaterialIds?: string[];
}

export interface AcademyCourse {
  id: string;
  track: CourseTrack;
  titleZh: string;
  title: string;
  subtitleZh: string;
  subtitle: string;
  coverImage: string;
  instructorZh: string;
  instructor: string;
  instructorTitleZh: string;
  instructorTitle: string;
  instructorAvatar: string;
  totalLessons: number;
  duration: string;
  levelZh: string;
  level: string;
  rating: number;
  studentsCount: number;
  price: number; // 0 Free
  overviewZh: string;
  overview: string;
  tags: string[];
  lessons: CourseLessonItem[];
}
