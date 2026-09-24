import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PhotoItem, ClubEvent, Announcement, WeeklyChallenge, Language, 
  UserProfile, PhotoSubmission, NewsArticle, TutorialLesson,
  MaterialVaultItem, MaterialOrder, AcademyCourse
} from '../types';
import { 
  INITIAL_PHOTOS, INITIAL_EVENTS, INITIAL_ANNOUNCEMENTS, INITIAL_CHALLENGE, 
  INITIAL_USERS, INITIAL_SUBMISSIONS, INITIAL_NEWS_ARTICLES, INITIAL_TUTORIAL_LESSONS,
  INITIAL_MATERIALS, INITIAL_COURSES
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  photos: PhotoItem[];
  events: ClubEvent[];
  announcements: Announcement[];
  newsArticles: NewsArticle[];
  tutorials: TutorialLesson[];
  materials: MaterialVaultItem[];
  courses: AcademyCourse[];
  materialCart: MaterialVaultItem[];
  materialOrders: MaterialOrder[];
  activeCourseForPlayer: { course: AcademyCourse; initialLessonIndex: number } | null;
  setActiveCourseForPlayer: (data: { course: AcademyCourse; initialLessonIndex: number } | null) => void;
  activeMaterialForCheckout: MaterialVaultItem | null;
  setActiveMaterialForCheckout: (item: MaterialVaultItem | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToMaterialCart: (item: MaterialVaultItem) => void;
  removeFromMaterialCart: (itemId: string) => void;
  clearMaterialCart: () => void;
  placeMaterialOrder: (orderData: {
    userName: string;
    email: string;
    organizationOrTeam?: string;
    usageType: 'personal' | 'commercial';
    projectDescription: string;
    items: MaterialVaultItem[];
  }) => MaterialOrder;
  likeNewsArticle: (id: string) => void;
  addNewsArticle: (article: Omit<NewsArticle, 'id' | 'likes'>) => void;
  updateNewsArticle: (id: string, updatedData: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;
  challenge: WeeklyChallenge;
  selectedPhoto: PhotoItem | null;
  setSelectedPhoto: (photo: PhotoItem | null) => void;
  likedPhotoIds: string[];
  toggleLikePhoto: (id: string) => void;
  addCritique: (photoId: string, author: string, role: string, comment: string, rating: number) => void;
  addPhoto: (photo: Omit<PhotoItem, 'id' | 'likes' | 'critiques' | 'createdAt'>) => void;
  deletePhoto: (photoId: string) => void;
  addEvent: (event: Omit<ClubEvent, 'id' | 'spotsRegistered'>) => void;
  deleteEvent: (eventId: string) => void;
  rsvpEvent: (eventId: string, userName: string) => boolean;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (announcementId: string) => void;
  exportDatabaseJSON: () => void;
  importDatabaseJSON: (jsonString: string) => boolean;
  resetToCuratedData: () => void;
  // User Account & Submission Management
  currentUser: UserProfile;
  users: UserProfile[];
  submissions: PhotoSubmission[];
  loginUser: (userId: string) => void;
  loginWithEmailOrId: (identifier: string) => boolean;
  logoutUser: () => void;
  registerUser: (userData: Omit<UserProfile, 'id' | 'joinedDate' | 'submittedPhotoCount' | 'approvedPhotoCount'>) => UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  submitPhotoForReview: (submissionData: Omit<PhotoSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  approveSubmission: (submissionId: string, feedback?: string) => void;
  rejectSubmission: (submissionId: string, feedback?: string) => void;
  externalGalleryUrl: string;
  setExternalGalleryUrl: (url: string) => void;
  externalVaultUrl: string;
  setExternalVaultUrl: (url: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'pgss_photo_lang_v1',
  PHOTOS: 'pgss_photo_items_v1',
  EVENTS: 'pgss_photo_events_v1',
  ANNOUNCEMENTS: 'pgss_photo_announcements_v1',
  NEWS: 'pgss_photo_news_v1',
  TUTORIALS: 'pgss_photo_tutorials_v1',
  MATERIALS: 'pgss_photo_materials_v1',
  COURSES: 'pgss_photo_courses_v1',
  MATERIAL_CART: 'pgss_photo_mat_cart_v1',
  MATERIAL_ORDERS: 'pgss_photo_mat_orders_v1',
  LIKED: 'pgss_photo_liked_ids_v1',
  USERS: 'pgss_photo_users_v1',
  CURRENT_USER: 'pgss_photo_current_user_v1',
  SUBMISSIONS: 'pgss_photo_submissions_v1',
  EXTERNAL_GALLERY_URL: 'pgss_external_gallery_url_v1',
  EXTERNAL_VAULT_URL: 'pgss_external_vault_url_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      return (saved === 'zh' || saved === 'en') ? saved : 'zh';
    } catch {
      return 'en';
    }
  });

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PHOTOS);
      if (saved) {
        const parsed: PhotoItem[] = JSON.parse(saved);
        const initialMap = new Map(INITIAL_PHOTOS.map(p => [p.id, p]));
        const userAdded = parsed.filter(p => !initialMap.has(p.id) && !p.id.startsWith('pgss-'));
        const merged = [...INITIAL_PHOTOS, ...userAdded];
        localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(merged));
        return merged;
      }
    } catch (e) {
      console.warn('Failed to parse saved photos', e);
    }
    return INITIAL_PHOTOS;
  });

  const [events, setEvents] = useState<ClubEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved events', e);
    }
    return INITIAL_EVENTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) {
        const parsed: Announcement[] = JSON.parse(saved);
        const merged: Announcement[] = [...INITIAL_ANNOUNCEMENTS];
        parsed.forEach(p => {
          if (!merged.some(m => m.id === p.id)) {
            merged.push(p);
          }
        });
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(merged));
        return merged;
      }
    } catch (e) {
      console.warn('Failed to parse saved announcements', e);
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved users', e);
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved current user', e);
    }
    return INITIAL_USERS[1]; // Default to Chloe Zhang (Student view)
  });

  const [submissions, setSubmissions] = useState<PhotoSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved submissions', e);
    }
    return INITIAL_SUBMISSIONS;
  });

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (saved) {
        const parsed: NewsArticle[] = JSON.parse(saved);
        const existingMap = new Map(parsed.map(a => [a.id, a]));
        // Make sure all INITIAL_NEWS_ARTICLES exist, preserving user custom photos or edits while ensuring bilingual content
        const merged: NewsArticle[] = INITIAL_NEWS_ARTICLES.map(initialArt => {
          const userSaved = existingMap.get(initialArt.id);
          if (!userSaved) return initialArt;
          return {
            ...initialArt,
            ...userSaved,
            featured: initialArt.featured,
            // Keep English and Chinese content aligned
            title: userSaved.title || initialArt.title,
            titleZh: userSaved.titleZh || initialArt.titleZh,
            summary: userSaved.summary || initialArt.summary,
            summaryZh: userSaved.summaryZh || initialArt.summaryZh,
            content: userSaved.content || initialArt.content,
            contentZh: userSaved.contentZh || initialArt.contentZh,
            matchStats: initialArt.matchStats 
              ? { ...initialArt.matchStats, ...(userSaved.matchStats || {}) }
              : userSaved.matchStats,
          };
        });
        parsed.forEach(p => {
          if (!merged.some(m => m.id === p.id)) {
            merged.push(p);
          }
        });
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(merged));
        return merged;
      }
    } catch (e) {
      console.warn('Failed to parse saved news', e);
    }
    return INITIAL_NEWS_ARTICLES;
  });

  const [tutorials] = useState<TutorialLesson[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TUTORIALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved tutorials', e);
    }
    return INITIAL_TUTORIAL_LESSONS;
  });

  const [challenge] = useState<WeeklyChallenge>(INITIAL_CHALLENGE);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const [likedPhotoIds, setLikedPhotoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIKED);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [externalGalleryUrl, setExternalGalleryUrlState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXTERNAL_GALLERY_URL);
      if (saved && !saved.includes('pointgreyphoto.com')) return saved;
    } catch {
      // fallback
    }
    return 'https://unsplash.com/t/film';
  });

  const setExternalGalleryUrl = (url: string) => {
    setExternalGalleryUrlState(url);
    try {
      localStorage.setItem(STORAGE_KEYS.EXTERNAL_GALLERY_URL, url);
    } catch (e) {
      console.warn('Failed to save external gallery url', e);
    }
  };

  const [externalVaultUrl, setExternalVaultUrlState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXTERNAL_VAULT_URL);
      if (saved && !saved.includes('pointgreyphoto.com')) return saved;
    } catch {
      // fallback
    }
    return 'https://drive.google.com';
  });

  const setExternalVaultUrl = (url: string) => {
    setExternalVaultUrlState(url);
    try {
      localStorage.setItem(STORAGE_KEYS.EXTERNAL_VAULT_URL, url);
    } catch (e) {
      console.warn('Failed to save external vault url', e);
    }
  };

  const [materials, setMaterials] = useState<MaterialVaultItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MATERIALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved materials', e);
    }
    return INITIAL_MATERIALS;
  });

  const [courses, setCourses] = useState<AcademyCourse[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved courses', e);
    }
    return INITIAL_COURSES;
  });

  const [materialCart, setMaterialCart] = useState<MaterialVaultItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MATERIAL_CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse material cart', e);
    }
    return [];
  });

  const [materialOrders, setMaterialOrders] = useState<MaterialOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MATERIAL_ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse material orders', e);
    }
    return [];
  });

  const [activeCourseForPlayer, setActiveCourseForPlayer] = useState<{
    course: AcademyCourse;
    initialLessonIndex: number;
  } | null>(null);

  const [activeMaterialForCheckout, setActiveMaterialForCheckout] = useState<MaterialVaultItem | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    } catch {}
  }, [photos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch {}
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsArticles));
    } catch {}
  }, [newsArticles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
    } catch {}
  }, [materials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch {}
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MATERIAL_CART, JSON.stringify(materialCart));
    } catch {}
  }, [materialCart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MATERIAL_ORDERS, JSON.stringify(materialOrders));
    } catch {}
  }, [materialOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  const addToMaterialCart = (item: MaterialVaultItem) => {
    setMaterialCart((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromMaterialCart = (itemId: string) => {
    setMaterialCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearMaterialCart = () => {
    setMaterialCart([]);
  };

  const placeMaterialOrder = (orderData: {
    userName: string;
    email: string;
    organizationOrTeam?: string;
    usageType: 'personal' | 'commercial';
    projectDescription: string;
    items: MaterialVaultItem[];
  }): MaterialOrder => {
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const orderId = `PG-ORD-${new Date().getFullYear()}-${randomHex}`;
    const licenseCode = `LIC-${orderData.usageType.toUpperCase()}-${Date.now().toString(36).toUpperCase()}-${randomHex}`;

    const newOrder: MaterialOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      userName: orderData.userName,
      email: orderData.email,
      organizationOrTeam: orderData.organizationOrTeam,
      usageType: orderData.usageType,
      projectDescription: orderData.projectDescription,
      items: orderData.items,
      totalAmount: 0,
      status: 'completed',
      licenseCode: licenseCode,
      downloadUrls: orderData.items.map((it) => ({
        itemId: it.id,
        itemTitle: it.titleZh || it.title,
        url: it.videoPreviewUrl || it.thumbnailUrl,
        format: it.format || 'Master Package'
      }))
    };

    setMaterialOrders((prev) => [newOrder, ...prev]);

    // Increment downloads count for each item
    setMaterials((prev) =>
      prev.map((m) => {
        if (orderData.items.some((it) => it.id === m.id)) {
          return { ...m, downloads: m.downloads + 1 };
        }
        return m;
      })
    );

    // If all cart items were ordered, clear cart
    setMaterialCart((prev) => prev.filter((c) => !orderData.items.some((it) => it.id === c.id)));

    // Celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0047AB', '#00C853', '#00E5FF', '#FFD700']
    });

    return newOrder;
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LIKED, JSON.stringify(likedPhotoIds));
    } catch {}
  }, [likedPhotoIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLikePhoto = (id: string) => {
    const isLiked = likedPhotoIds.includes(id);
    let newLikedIds: string[];
    let delta = 1;
    if (isLiked) {
      newLikedIds = likedPhotoIds.filter((item) => item !== id);
      delta = -1;
    } else {
      newLikedIds = [...likedPhotoIds, id];
      delta = 1;
      // Trigger subtle celebratory confetti for like!
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.85 },
        colors: ['#0066FF', '#38BDF8', '#FFFFFF', '#60A5FA']
      });
    }
    setLikedPhotoIds(newLikedIds);

    setPhotos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, likes: Math.max(0, item.likes + delta) };
          if (selectedPhoto && selectedPhoto.id === id) {
            setSelectedPhoto(updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const addCritique = (photoId: string, author: string, role: string, comment: string, rating: number) => {
    const newCritique = {
      id: 'critique-' + Date.now(),
      author: author.trim() || currentUser.name || 'Club Member',
      role: role.trim() || (currentUser.role === 'curator_admin' ? 'Curator & Faculty' : currentUser.grade),
      comment: comment.trim(),
      time: 'Just now',
      rating,
    };

    setPhotos((prev) =>
      prev.map((item) => {
        if (item.id === photoId) {
          const updated = {
            ...item,
            critiques: [newCritique, ...item.critiques],
          };
          if (selectedPhoto && selectedPhoto.id === photoId) {
            setSelectedPhoto(updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const addPhoto = (newPhotoData: Omit<PhotoItem, 'id' | 'likes' | 'critiques' | 'createdAt'>) => {
    const newPhoto: PhotoItem = {
      ...newPhotoData,
      id: 'pgss-' + Date.now().toString(36),
      isExhibited: true,
      likes: 1,
      critiques: [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setPhotos((prev) => [newPhoto, ...prev]);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#2563EB', '#FFFFFF', '#93C5FD']
    });
  };

  const deletePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null);
    }
  };

  const addEvent = (newEventData: Omit<ClubEvent, 'id' | 'spotsRegistered'>) => {
    const newEvent: ClubEvent = {
      ...newEventData,
      id: 'evt-' + Date.now().toString(36),
      spotsRegistered: 0,
      registeredUsers: [],
    };

    setEvents((prev) => [newEvent, ...prev]);
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const rsvpEvent = (eventId: string, userName: string): boolean => {
    let success = false;
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          if (evt.spotsRegistered >= evt.spotsTotal) {
            return evt;
          }
          const users = evt.registeredUsers || [];
          if (users.includes(userName)) {
            return evt;
          }
          success = true;
          return {
            ...evt,
            spotsRegistered: evt.spotsRegistered + 1,
            registeredUsers: [...users, userName],
          };
        }
        return evt;
      })
    );

    if (success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38BDF8', '#60A5FA', '#FFFFFF']
      });
    }

    return success;
  };

  const addAnnouncement = (newAnnData: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...newAnnData,
      id: 'ann-' + Date.now().toString(36),
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (announcementId: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== announcementId));
  };

  // User Account Management
  const loginUser = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const loginWithEmailOrId = (identifier: string): boolean => {
    const clean = identifier.trim().toLowerCase();
    const found = users.find(
      (u) => 
        u.email.toLowerCase() === clean || 
        u.studentId.toLowerCase() === clean ||
        u.name.toLowerCase() === clean ||
        u.id.toLowerCase() === clean
    );
    if (found) {
      setCurrentUser(found);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#0047AB', '#38BDF8', '#FFFFFF']
      });
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    // Switch to a guest profile or fallback to initial template
    const defaultUser = users[0] || INITIAL_USERS[0];
    setCurrentUser(defaultUser);
  };

  const registerUser = (userData: Omit<UserProfile, 'id' | 'joinedDate' | 'submittedPhotoCount' | 'approvedPhotoCount'>): UserProfile => {
    const newUser: UserProfile = {
      ...userData,
      id: 'user-' + Date.now().toString(36),
      joinedDate: new Date().toISOString().split('T')[0],
      submittedPhotoCount: 0,
      approvedPhotoCount: 0,
    };
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0047AB', '#38BDF8', '#FFFFFF']
    });

    return newUser;
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...data };
      setUsers((uList) => uList.map((u) => (u.id === prev.id ? updated : u)));
      return updated;
    });
  };

  // Submission Workflow
  const submitPhotoForReview = (submissionData: Omit<PhotoSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSub: PhotoSubmission = {
      ...submissionData,
      id: 'sub-' + Date.now().toString(36),
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    setSubmissions((prev) => [newSub, ...prev]);

    // increment user's submitted count
    updateUserProfile({
      submittedPhotoCount: currentUser.submittedPhotoCount + 1,
    });

    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#0047AB', '#38BDF8', '#60A5FA', '#FFFFFF']
    });
  };

  const approveSubmission = (submissionId: string, feedback?: string) => {
    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub) return;

    // Update submission status
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === submissionId
          ? {
              ...item,
              status: 'approved',
              curatorFeedback: feedback || 'Approved by PGSS Curators for the permanent archive.',
              curatorFeedbackZh: feedback || '已通过 Point Grey 中学策展委员会审核并入选官方精选展厅。',
            }
          : item
      )
    );

    // Push into published gallery photos
    const newPhoto: PhotoItem = {
      id: 'pgss-' + Date.now().toString(36),
      title: sub.title,
      titleZh: sub.titleZh || sub.title,
      author: sub.studentName,
      authorGrade: sub.studentGrade,
      year: sub.year || '2026',
      category: sub.category,
      imageUrl: sub.imageUrl,
      rawUrl: sub.rawUrl,
      exif: sub.exif,
      description: sub.description,
      descriptionZh: sub.descriptionZh || sub.description,
      likes: 1,
      featured: true,
      isExhibited: true,
      tags: sub.tags,
      critiques: feedback
        ? [
            {
              id: 'critique-' + Date.now(),
              author: currentUser.name || 'PGSS Curator',
              role: 'Editorial Board',
              comment: feedback,
              time: 'Just now',
              rating: 5,
            },
          ]
        : [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setPhotos((prev) => [newPhoto, ...prev]);

    // Update student approved count
    setUsers((uList) =>
      uList.map((u) =>
        u.id === sub.studentId
          ? { ...u, approvedPhotoCount: u.approvedPhotoCount + 1 }
          : u
      )
    );

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#38BDF8', '#0047AB', '#FBBF24', '#FFFFFF']
    });
  };

  const rejectSubmission = (submissionId: string, feedback?: string) => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === submissionId
          ? {
              ...item,
              status: 'rejected',
              curatorFeedback: feedback || 'Please refine EXIF parameters or resolution and resubmit.',
              curatorFeedbackZh: feedback || '请调整分辨率或光圈快门参数后再次提交。',
            }
          : item
      )
    );
  };

  const exportDatabaseJSON = () => {
    const backup = {
      clubName: 'Point Grey Secondary Photography Club',
      exportedAt: new Date().toISOString(),
      photos,
      events,
      announcements,
      challenge,
      users,
      submissions,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `PGSS_Photo_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDatabaseJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.photos && Array.isArray(parsed.photos)) {
        setPhotos(parsed.photos);
      }
      if (parsed.events && Array.isArray(parsed.events)) {
        setEvents(parsed.events);
      }
      if (parsed.announcements && Array.isArray(parsed.announcements)) {
        setAnnouncements(parsed.announcements);
      }
      if (parsed.users && Array.isArray(parsed.users)) {
        setUsers(parsed.users);
      }
      if (parsed.submissions && Array.isArray(parsed.submissions)) {
        setSubmissions(parsed.submissions);
      }
      return true;
    } catch (e) {
      console.error('Import error', e);
      return false;
    }
  };

  const likeNewsArticle = (id: string) => {
    setNewsArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          return { ...art, likes: art.likes + 1 };
        }
        return art;
      })
    );
  };

  const addNewsArticle = (articleData: Omit<NewsArticle, 'id' | 'likes'>) => {
    const newArticle: NewsArticle = {
      ...articleData,
      id: 'news-' + Date.now().toString(36),
      likes: 1,
    };
    setNewsArticles((prev) => [newArticle, ...prev]);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  const updateNewsArticle = (id: string, updatedData: Partial<NewsArticle>) => {
    setNewsArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updatedData } : art))
    );
  };

  const deleteNewsArticle = (id: string) => {
    setNewsArticles((prev) => prev.filter((art) => art.id !== id));
  };

  const resetToCuratedData = () => {
    setPhotos(INITIAL_PHOTOS);
    setEvents(INITIAL_EVENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNewsArticles(INITIAL_NEWS_ARTICLES);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[1]);
    setSubmissions(INITIAL_SUBMISSIONS);
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.TUTORIALS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        photos,
        events,
        announcements,
        newsArticles,
        tutorials,
        materials,
        courses,
        materialCart,
        materialOrders,
        activeCourseForPlayer,
        setActiveCourseForPlayer,
        activeMaterialForCheckout,
        setActiveMaterialForCheckout,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToMaterialCart,
        removeFromMaterialCart,
        clearMaterialCart,
        placeMaterialOrder,
        likeNewsArticle,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        challenge,
        selectedPhoto,
        setSelectedPhoto,
        likedPhotoIds,
        toggleLikePhoto,
        addCritique,
        addPhoto,
        deletePhoto,
        addEvent,
        deleteEvent,
        rsvpEvent,
        addAnnouncement,
        deleteAnnouncement,
        exportDatabaseJSON,
        importDatabaseJSON,
        resetToCuratedData,
        currentUser,
        users,
        submissions,
        loginUser,
        loginWithEmailOrId,
        logoutUser,
        registerUser,
        updateUserProfile,
        submitPhotoForReview,
        approveSubmission,
        rejectSubmission,
        externalGalleryUrl,
        setExternalGalleryUrl,
        externalVaultUrl,
        setExternalVaultUrl,
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
