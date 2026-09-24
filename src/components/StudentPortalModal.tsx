import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PhotoCategory, UserRole } from '../types';
import { 
  User, Shield, Camera, Upload, CheckCircle2, Clock, XCircle, 
  Sparkles, FileText, Image as ImageIcon, Send, Sliders, 
  Check, Edit3, UserPlus, X, LogOut, LogIn, Key, RefreshCw
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { motion, AnimatePresence } from 'motion/react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'profile' | 'submit' | 'my-submissions' | 'admin-review';
}

const AVATAR_PRESETS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', labelZh: '自然肖像', labelEn: 'Portrait Style' },
  { id: '2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', labelZh: '街头摄影师', labelEn: 'Street Lens' },
  { id: '3', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', labelZh: '策展总监', labelEn: 'Curator Studio' },
  { id: '4', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80', labelZh: '影视创作人', labelEn: 'Filmmaker' },
  { id: '5', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', labelZh: '胶片爱好者', labelEn: 'Analog Film' },
  { id: '6', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', labelZh: '赛事抓拍', labelEn: 'Action Sports' },
];

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'profile'
}) => {
  const { 
    lang, 
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
    rejectSubmission
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'submit' | 'my-submissions' | 'admin-review'>(initialTab);
  const [authMode, setAuthMode] = useState<'profile' | 'register' | 'login'>('profile');
  const [successToast, setSuccessToast] = useState('');
  const [adminFeedbackText, setAdminFeedbackText] = useState<{ [subId: string]: string }>({});

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPasscode, setLoginPasscode] = useState('');
  const [needsAdminPasscode, setNeedsAdminPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regGrade, setRegGrade] = useState('Grade 11');
  const [regRole, setRegRole] = useState<UserRole>('student');
  const [regCamera, setRegCamera] = useState('Fujifilm X-T5 + 33mm f/1.4');
  const [regBio, setRegBio] = useState('');
  const [regAvatar, setRegAvatar] = useState(AVATAR_PRESETS[0].url);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editStudentId, setEditStudentId] = useState(currentUser?.studentId || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editGrade, setEditGrade] = useState(currentUser?.grade || 'Grade 11');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editBioZh, setEditBioZh] = useState(currentUser?.bioZh || '');
  const [editGear, setEditGear] = useState(currentUser?.cameraGear || '');
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || AVATAR_PRESETS[0].url);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const regFileInputRef = useRef<HTMLInputElement>(null);

  // Photo Submission Form State
  const [subTitle, setSubTitle] = useState('');
  const [subTitleZh, setSubTitleZh] = useState('');
  const [subCategory, setSubCategory] = useState<PhotoCategory>('landscape');
  const [subYear, setSubYear] = useState('2026');
  const [subImageUrl, setSubImageUrl] = useState('');
  const [subRawUrl, setSubRawUrl] = useState('');
  const [subCamera, setSubCamera] = useState(currentUser?.cameraGear?.split('+')[0]?.trim() || 'Sony Alpha 7 IV');
  const [subLens, setSubLens] = useState('FE 24-70mm f/2.8 GM II');
  const [subFocal, setSubFocal] = useState('35mm');
  const [subAperture, setSubAperture] = useState('f/2.8');
  const [subShutter, setSubShutter] = useState('1/250s');
  const [subIso, setSubIso] = useState('100');
  const [subLocation, setSubLocation] = useState('Point Grey Campus / Vancouver');
  const [subDesc, setSubDesc] = useState('');
  const [subDescZh, setSubDescZh] = useState('');
  const [subTags, setSubTags] = useState('PointGrey, StudentWork, Vancouver');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleStartEditProfile = () => {
    setEditName(currentUser.name);
    setEditStudentId(currentUser.studentId);
    setEditEmail(currentUser.email);
    setEditGrade(currentUser.grade);
    setEditBio(currentUser.bio || '');
    setEditBioZh(currentUser.bioZh || '');
    setEditGear(currentUser.cameraGear || '');
    setEditAvatar(currentUser.avatar || AVATAR_PRESETS[0].url);
    setIsEditingProfile(true);
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isReg: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert(lang === 'zh' ? '头像图片大小不能超过 4MB' : lang === 'fr' ? 'La taille maximale est de 4 Mo' : 'Avatar file must be under 4MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        if (isReg) {
          setRegAvatar(result);
        } else {
          setEditAvatar(result);
          updateUserProfile({ avatar: result });
          showToast(lang === 'zh' ? '头像已更新！' : lang === 'fr' ? 'Photo de profil mise à jour !' : 'Profile avatar updated!');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      alert(lang === 'zh' ? '请填写姓名与邮箱。' : lang === 'fr' ? 'Veuillez saisir votre nom et courriel.' : 'Please enter your full name and email.');
      return;
    }

    const newStudentId = regStudentId.trim() || `PG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser = registerUser({
      name: regName.trim(),
      studentId: newStudentId,
      email: regEmail.trim(),
      grade: regGrade,
      role: regRole,
      avatar: regAvatar,
      bio: regBio.trim() || (lang === 'zh' ? '热爱摄影与光影创作的 Point Grey 中学生。' : 'Passionate Point Grey photographer and creative visual storyteller.'),
      bioZh: regBio.trim() || '热爱摄影与光影创作的 Point Grey 中学生。',
      cameraGear: regCamera.trim() || 'Digital Mirrorless / 35mm Film',
    });

    setAuthMode('profile');
    setIsEditingProfile(false);
    showToast(
      lang === 'zh' 
        ? `欢迎加入 Point Grey 摄影俱乐部，${newUser.name}！` 
        : lang === 'fr' 
        ? `Bienvenue au club, ${newUser.name} !` 
        : `Welcome to Point Grey Photo Club, ${newUser.name}!`
    );
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginIdentifier.trim()) {
      setLoginError(lang === 'zh' ? '请输入学号或注册邮箱' : lang === 'fr' ? 'Veuillez saisir votre identifiant ou courriel' : 'Please enter Student ID or Email');
      return;
    }

    const result = loginWithEmailOrId(loginIdentifier, loginPasscode);
    if (result.success) {
      setAuthMode('profile');
      setLoginIdentifier('');
      setLoginPasscode('');
      setNeedsAdminPasscode(false);
      showToast(lang === 'zh' ? '登录成功！' : lang === 'fr' ? 'Connexion réussie !' : 'Signed in successfully!');
    } else if (result.requireAdminPasscode) {
      setNeedsAdminPasscode(true);
      setLoginError(result.message || (lang === 'zh' ? '该账号为管理员账号，请输入管理密码 (825098)。' : 'Admin password required (825098).'));
    } else {
      setLoginError(
        result.message || (lang === 'zh' 
          ? '未找到匹配的社员账号，请核对学号/邮箱或立即注册新账号。' 
          : lang === 'fr' 
          ? 'Compte introuvable. Vérifiez l’identifiant ou créez un compte.' 
          : 'Account not found. Please verify credentials or create a new account.')
      );
    }
  };

  const handleSaveProfile = () => {
    updateUserProfile({
      name: editName.trim() || currentUser.name,
      studentId: editStudentId.trim() || currentUser.studentId,
      email: editEmail.trim() || currentUser.email,
      grade: editGrade,
      bio: editBio,
      bioZh: editBioZh || editBio,
      cameraGear: editGear,
      avatar: editAvatar,
    });
    setIsEditingProfile(false);
    setIsAvatarPickerOpen(false);
    showToast(
      lang === 'zh' 
        ? '个人资料已更新！' 
        : lang === 'fr' 
        ? 'Profil mis à jour !' 
        : 'Profile details updated!'
    );
  };

  const handleLoadSampleSubmission = (type: 'vancouver' | 'macro' | 'street') => {
    if (type === 'vancouver') {
      setSubTitle('Jericho Sunset Drift');
      setSubTitleZh('杰里科暮色海风');
      setSubCategory('landscape');
      setSubYear('2026');
      setSubImageUrl('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85');
      setSubCamera('Sony Alpha 7 IV');
      setSubLens('FE 16-35mm f/2.8 GM');
      setSubFocal('24mm');
      setSubAperture('f/8.0');
      setSubShutter('1/8s');
      setSubIso('100');
      setSubLocation('Jericho Beach Pier, Vancouver');
      setSubDesc('Golden hour reflections over the wet sands during low tide.');
      setSubDescZh('温哥华杰里科海滩退潮时分的暮色余晖，水面如镜。');
      setSubTags('Vancouver, Coast, GoldenHour, Sunset');
    } else if (type === 'macro') {
      setSubTitle('Frost Geometry on Courtyard Fern');
      setSubTitleZh('校园中庭蕨叶霜晶');
      setSubCategory('macro');
      setSubYear('2026');
      setSubImageUrl('https://images.unsplash.com/photo-1533450718592-29d45635f0a9?auto=format&fit=crop&w=1600&q=85');
      setSubCamera('Nikon Z8');
      setSubLens('NIKKOR Z MC 105mm f/2.8 VR S');
      setSubFocal('105mm');
      setSubAperture('f/5.6');
      setSubShutter('1/200s');
      setSubIso('200');
      setSubLocation('Point Grey Courtyard Biology Garden');
      setSubDesc('Extreme macro capture of morning frost crystals.');
      setSubDescZh('清晨校园植物园蕨类植物上的冰晶微距微观。');
      setSubTags('Macro, Frost, Campus, Optics');
    } else {
      setSubTitle('Granville Night Reflections');
      setSubTitleZh('格兰维尔街雨夜流光');
      setSubCategory('street');
      setSubYear('2026');
      setSubImageUrl('https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85');
      setSubCamera('Fujifilm X-T5');
      setSubLens('XF 33mm f/1.4 R');
      setSubFocal('33mm');
      setSubAperture('f/1.4');
      setSubShutter('1/125s');
      setSubIso('800');
      setSubLocation('Granville & Robson, Vancouver');
      setSubDesc('Neon lights reflecting across wet asphalt after rain.');
      setSubDescZh('雨后沥青路面反射的赛博朋克霓虹光影。');
      setSubTags('Street, Neon, Rain, Night');
    }
  };

  const handleSubmitPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim() || !subImageUrl.trim()) {
      alert(
        lang === 'zh' 
          ? '请填写作品标题与图片展示链接。' 
          : lang === 'fr' 
          ? 'Veuillez saisir le titre et le lien de l’image.' 
          : 'Please provide Title and Image URL.'
      );
      return;
    }

    submitPhotoForReview({
      studentId: currentUser.studentId,
      studentName: currentUser.name,
      studentGrade: currentUser.grade,
      studentEmail: currentUser.email,
      title: subTitle.trim(),
      titleZh: subTitleZh.trim() || subTitle.trim(),
      category: subCategory,
      year: subYear,
      imageUrl: subImageUrl.trim(),
      rawUrl: subRawUrl.trim() || undefined,
      exif: {
        camera: subCamera,
        lens: subLens,
        focalLength: subFocal,
        aperture: subAperture,
        shutterSpeed: subShutter,
        iso: subIso,
        location: subLocation,
        date: new Date().toISOString().split('T')[0],
      },
      description: subDesc.trim() || (lang === 'zh' ? 'Point Grey 中学学生原创摄影作品。' : 'Point Grey student photography submission.'),
      descriptionZh: subDescZh.trim() || 'Point Grey 中学学生原创摄影作品。',
      tags: subTags.split(',').map((t) => t.trim()).filter(Boolean),
    });

    showToast(
      lang === 'zh' 
        ? '作品申请已成功投递！审核通过后将正式同步至展厅。' 
        : lang === 'fr' 
        ? 'Photo soumise au comité des curateurs !' 
        : 'Application submitted! Awaiting administrator review.'
    );
    setActiveTab('my-submissions');
    setSubTitle('');
    setSubTitleZh('');
  };

  // Only show submissions of the logged in user
  const mySubmissionsList = submissions.filter(
    (s) => s.studentId === currentUser.studentId || s.studentEmail === currentUser.email || s.studentName === currentUser.name
  );

  const isCurator = currentUser.role === 'curator_admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-white border border-blue-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 font-mono">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#0047AB] flex items-center justify-center text-white shadow-md shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white">
                  {lang === 'zh' 
                    ? 'Point Grey 中学社员中心' 
                    : lang === 'fr' 
                    ? 'Portail Étudiant PGSS' 
                    : 'Point Grey Member Hub'}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 text-[10px] border border-blue-400/30">
                  {currentUser.role === 'curator_admin' 
                    ? (lang === 'zh' ? '策展管理 / 教师' : lang === 'fr' ? 'BUREAU CURATEURS' : 'CURATOR DESK') 
                    : (lang === 'zh' ? '社员账号' : lang === 'fr' ? 'MEMBRE ÉTUDIANT' : 'STUDENT MEMBER')}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                {currentUser.name} • {currentUser.grade} • {currentUser.studentId}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-600 text-white px-6 py-2 text-xs font-mono flex items-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>{successToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs Bar */}
        <div className="px-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2">
            <button
              onClick={() => { setActiveTab('profile'); setAuthMode('profile'); }}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-[#0047AB] font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? '社员个人资料' : lang === 'fr' ? 'Mon Profil' : 'My Profile'}</span>
            </button>

            <button
              onClick={() => { setActiveTab('submit'); setAuthMode('profile'); }}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'submit'
                  ? 'bg-[#0047AB] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? '申请参展投递' : lang === 'fr' ? 'Candidature Photo' : 'Apply for Exhibition'}</span>
            </button>

            <button
              onClick={() => { setActiveTab('my-submissions'); setAuthMode('profile'); }}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer relative ${
                activeTab === 'my-submissions'
                  ? 'bg-white text-[#0047AB] font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? '我的投递记录' : lang === 'fr' ? 'Mes Soumissions' : 'My Submissions'}</span>
              {mySubmissionsList.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-[#0047AB] font-bold">
                  {mySubmissionsList.length}
                </span>
              )}
            </button>

            {isCurator && (
              <button
                onClick={() => { setActiveTab('admin-review'); setAuthMode('profile'); }}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeTab === 'admin-review'
                    ? 'bg-amber-500 text-white font-bold shadow-xs'
                    : 'text-amber-700 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{lang === 'zh' ? '策展审核台' : lang === 'fr' ? 'Bureau des Curateurs' : 'Curator Review Desk'}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white text-amber-800 font-bold">
                  {submissions.filter((s) => s.status === 'pending').length}
                </span>
              </button>
            )}
          </div>

          {/* Account Actions: Register & Sign In options */}
          <div className="flex items-center space-x-2 py-2">
            <button
              onClick={() => {
                setActiveTab('profile');
                setAuthMode('register');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047AB] text-xs font-mono font-semibold border border-blue-200 transition-colors cursor-pointer flex items-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? '注册新社员账号' : lang === 'fr' ? 'Créer un compte' : 'Register New Account'}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('profile');
                setAuthMode(authMode === 'login' ? 'profile' : 'login');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold border border-slate-300 transition-colors cursor-pointer flex items-center space-x-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? '社员登录' : lang === 'fr' ? 'Connexion' : 'Member Login'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-white space-y-6">

          {/* TAB 1: PROFILE & ACCOUNT MANAGEMENT */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* VIEW A: LOG IN TO MEMBER ACCOUNT */}
              {authMode === 'login' && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center space-x-2 text-[#0047AB] font-bold text-sm font-mono">
                      <LogIn className="w-4 h-4" />
                      <span>{lang === 'zh' ? '登录社员账号' : lang === 'fr' ? 'Connexion au compte' : 'Sign In to Member Account'}</span>
                    </div>
                    <button
                      onClick={() => setAuthMode('profile')}
                      className="text-xs text-slate-500 hover:text-slate-800 font-mono cursor-pointer"
                    >
                      {lang === 'zh' ? '← 返回当前社员主页' : lang === 'fr' ? '← Retour au profil' : '← Back to Profile'}
                    </button>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        {lang === 'zh' ? '学号或注册邮箱' : lang === 'fr' ? 'Identifiant ou Courriel' : 'Student ID or Email'}
                      </label>
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => {
                          setLoginIdentifier(e.target.value);
                          setNeedsAdminPasscode(false);
                          setLoginError('');
                        }}
                        placeholder="e.g. PG-2027-8812 or yourname@vsb.bc.ca"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                      />
                    </div>

                    {needsAdminPasscode && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5 animate-fadeIn">
                        <label className="block text-xs font-mono text-amber-900 font-bold">
                          {lang === 'zh' ? '🔑 管理员通行密码 (825098)' : '🔑 Admin Passcode (825098)'}
                        </label>
                        <input
                          type="password"
                          required
                          value={loginPasscode}
                          onChange={(e) => {
                            setLoginPasscode(e.target.value);
                            setLoginError('');
                          }}
                          placeholder={lang === 'zh' ? '输入管理员密码 (825098)' : 'Enter admin passcode'}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 text-xs font-mono text-slate-900 outline-none focus:border-[#0047AB]"
                          autoFocus
                        />
                        <p className="text-[11px] text-amber-800 font-mono">
                          {lang === 'zh' ? '※ 此账号具备管理员权限，必须输入密码 825098 方可登录' : '※ Admin role detected. Password 825098 required.'}
                        </p>
                      </div>
                    )}

                    {loginError && (
                      <p className="text-xs text-rose-600 font-mono">{loginError}</p>
                    )}

                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-[#0047AB] text-white text-xs font-mono font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        {lang === 'zh' ? '确认登录' : lang === 'fr' ? 'Se connecter' : 'Sign In'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMode('register')}
                        className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        {lang === 'zh' ? '没有账号？立即注册' : lang === 'fr' ? 'Créer un compte' : 'Create Account'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* VIEW B: REGISTER NEW ACCOUNT */}
              {authMode === 'register' && (
                <form onSubmit={handleRegister} className="p-6 rounded-2xl bg-slate-50 border border-blue-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center space-x-2 text-[#0047AB] font-bold text-sm font-mono">
                      <UserPlus className="w-4 h-4" />
                      <span>
                        {lang === 'zh' 
                          ? '注册新社员账号' 
                          : lang === 'fr' 
                          ? 'Créer un compte élève Point Grey' 
                          : 'Register New Point Grey Student Account'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAuthMode('profile')}
                      className="text-xs text-slate-500 hover:text-slate-800 font-mono cursor-pointer"
                    >
                      {lang === 'zh' ? '← 返回已有账号' : lang === 'fr' ? '← Retour au profil' : '← Back to Profile'}
                    </button>
                  </div>

                  {/* Avatar Selection in Registration */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                    <label className="block text-xs font-mono text-slate-700 font-semibold">
                      {lang === 'zh' ? '选择或上传个人头像' : lang === 'fr' ? 'Photo de profil' : 'Choose or Upload Avatar'}
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <img
                        src={regAvatar}
                        alt="Avatar preview"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0047AB] shadow-sm"
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        {AVATAR_PRESETS.map((preset) => (
                          <button
                            type="button"
                            key={preset.id}
                            onClick={() => setRegAvatar(preset.url)}
                            className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-transform cursor-pointer ${
                              regAvatar === preset.url ? 'border-[#0047AB] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={preset.url} alt={preset.labelEn} className="w-full h-full object-cover" />
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => regFileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono border border-slate-300 flex items-center space-x-1 cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>{lang === 'zh' ? '上传照片' : lang === 'fr' ? 'Importer photo' : 'Upload File'}</span>
                        </button>
                        <input
                          ref={regFileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleAvatarFileUpload(e, true)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        {lang === 'zh' ? '学生姓名 *' : lang === 'fr' ? 'Nom complet de l’élève *' : 'Student Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Maya Chen"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        {lang === 'zh' ? '学号 / 用户标识 *' : lang === 'fr' ? 'Numéro d’élève *' : 'Student ID / Handle *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={regStudentId}
                        onChange={(e) => setRegStudentId(e.target.value)}
                        placeholder="PG-2027-xxxx"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        {lang === 'zh' ? '学校邮箱 (@vsb.bc.ca) *' : lang === 'fr' ? 'Courriel scolaire (@vsb.bc.ca) *' : 'School Email (@vsb.bc.ca) *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="m.chen@pointgrey.vsb.bc.ca"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        {lang === 'zh' ? '所属年级' : lang === 'fr' ? 'Niveau scolaire' : 'Grade / Year Level'}
                      </label>
                      <select
                        value={regGrade}
                        onChange={(e) => setRegGrade(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                      >
                        <option value="Grade 8">Grade 8 (8e année)</option>
                        <option value="Grade 9">Grade 9 (9e对接)</option>
                        <option value="Grade 10">Grade 10 (10e année)</option>
                        <option value="Grade 11">Grade 11 (11e année)</option>
                        <option value="Grade 12">Grade 12 (12e année / Grad)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        {lang === 'zh' ? '主要使用相机与器材' : lang === 'fr' ? 'Appareil photo principal' : 'Primary Camera Gear'}
                      </label>
                      <input
                        type="text"
                        value={regCamera}
                        onChange={(e) => setRegCamera(e.target.value)}
                        placeholder="e.g. Sony A7 IV + 24-70mm GM"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        {lang === 'zh' ? '账号身份' : lang === 'fr' ? 'Rôle du compte' : 'Account Role'}
                      </label>
                      <div className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono text-slate-700 flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span className="font-semibold">{lang === 'zh' ? '普通学生社员 (Student Member)' : lang === 'fr' ? 'Membre élève' : 'Student Member'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                      {lang === 'zh' ? '个人摄影简介与喜好风格' : lang === 'fr' ? 'Biographie & intérêts photo' : 'Photography Bio & Interests'}
                    </label>
                    <textarea
                      rows={2}
                      value={regBio}
                      onChange={(e) => setRegBio(e.target.value)}
                      placeholder="e.g. Capturing light and emotion in Vancouver's streets."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setAuthMode('profile')}
                      className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      {lang === 'zh' ? '取消' : lang === 'fr' ? 'Annuler' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#0047AB] text-white text-xs font-mono font-bold hover:bg-blue-700 shadow-md transition-colors cursor-pointer"
                    >
                      {lang === 'zh' ? '完成注册并登录' : lang === 'fr' ? 'Finaliser l’inscription' : 'Complete Registration'}
                    </button>
                  </div>
                </form>
              )}

              {/* VIEW C: CURRENT LOGGED IN USER PROFILE */}
              {authMode === 'profile' && (
                <div>
                  {/* Clean Student ID Card Badge */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 via-[#0047AB] to-blue-800 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                    
                    {/* Club Hound Emblem Watermark */}
                    <div className="absolute right-6 bottom-4 opacity-15 pointer-events-none">
                      <ClubLogo size={140} colorScheme="dark" />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center space-x-4">
                        <div className="relative group cursor-pointer" onClick={() => setIsAvatarPickerOpen(true)}>
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-18 h-18 rounded-2xl object-cover border-2 border-white/80 shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono">
                            <Edit3 className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-serif font-bold text-2xl text-white">
                              {currentUser.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded bg-white/20 text-cyan-200 text-xs font-mono border border-white/30 backdrop-blur-md">
                              {currentUser.role === 'curator_admin' 
                                ? (lang === 'zh' ? '策展管理 / 干部' : lang === 'fr' ? 'CURATEUR EXÉCUTIF' : 'EXECUTIVE CURATOR') 
                                : currentUser.grade}
                            </span>
                          </div>
                          <p className="text-xs text-blue-100 font-mono mt-0.5">
                            ID: {currentUser.studentId} • {currentUser.email}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-blue-200 mt-1 font-mono">
                            <span className="text-amber-300 font-bold">
                              {lang === 'zh' ? '无限进步' : 'INFINITE PROGRESS'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right action buttons: Edit Profile & Change Avatar */}
                      <div className="flex flex-wrap items-center sm:flex-col sm:items-end gap-2">
                        <button
                          onClick={handleStartEditProfile}
                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-mono border border-white/30 transition-all cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{lang === 'zh' ? '编辑资料与头像' : lang === 'fr' ? 'Modifier profil' : 'Edit Profile & Avatar'}</span>
                        </button>

                        <button
                          onClick={() => {
                            logoutUser();
                            setAuthMode('login');
                          }}
                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-mono border border-red-300/30 transition-all cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{lang === 'zh' ? '退出账号' : lang === 'fr' ? 'Déconnexion' : 'Log Out'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Bio & Gear Details */}
                    <div className="mt-6 pt-4 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <span className="font-mono text-[11px] text-cyan-200 uppercase font-semibold">
                          {lang === 'zh' ? '常用相机与光学器材:' : lang === 'fr' ? 'Matériel photo & optiques :' : 'Camera Gear & Optics:'}
                        </span>
                        <p className="text-white mt-1 font-mono">{currentUser.cameraGear}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] text-cyan-200 uppercase font-semibold">
                          {lang === 'zh' ? '社员个人简介:' : lang === 'fr' ? 'Biographie artistique :' : 'Artistic Bio:'}
                        </span>
                        <p className="text-blue-100 mt-1">
                          {lang === 'zh' ? (currentUser.bioZh || currentUser.bio) : currentUser.bio}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Avatar Picker Modal / Box if triggered */}
                  {isAvatarPickerOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#0047AB]">
                          {lang === 'zh' ? '更换社员头像' : lang === 'fr' ? 'Changer d’avatar' : 'Change Profile Avatar'}
                        </span>
                        <button
                          onClick={() => setIsAvatarPickerOpen(false)}
                          className="text-xs text-slate-500 hover:text-slate-800 font-mono cursor-pointer"
                        >
                          {lang === 'zh' ? '关闭' : 'Close'}
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        {AVATAR_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => {
                              updateUserProfile({ avatar: preset.url });
                              setEditAvatar(preset.url);
                              showToast(lang === 'zh' ? '头像已更新！' : 'Avatar updated!');
                            }}
                            className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-transform cursor-pointer ${
                              currentUser.avatar === preset.url ? 'border-[#0047AB] scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={preset.url} alt={preset.labelEn} className="w-full h-full object-cover" />
                          </button>
                        ))}

                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#0047AB] text-xs font-mono font-bold border border-blue-300 flex items-center space-x-1.5 cursor-pointer shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{lang === 'zh' ? '从本地上传头像' : lang === 'fr' ? 'Téléverser photo' : 'Upload Local Image'}</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleAvatarFileUpload(e, false)}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Profile Edit Drawer */}
                  {isEditingProfile && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-5 rounded-2xl bg-slate-50 border border-blue-200 space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <h4 className="text-sm font-bold text-[#0047AB] font-mono">
                          {lang === 'zh' ? '编辑社员个人档案与头像' : lang === 'fr' ? 'Modifier mon profil' : 'Edit Member Profile & Avatar'}
                        </h4>
                        <button
                          onClick={() => setIsEditingProfile(false)}
                          className="text-xs text-slate-500 hover:text-slate-800 font-mono cursor-pointer"
                        >
                          {lang === 'zh' ? '取消' : 'Cancel'}
                        </button>
                      </div>

                      {/* Avatar Editor inside edit form */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                        <label className="block text-xs font-mono text-slate-700 font-semibold">
                          {lang === 'zh' ? '头像设置' : lang === 'fr' ? 'Photo de profil' : 'Avatar Photo'}
                        </label>
                        <div className="flex flex-wrap items-center gap-3">
                          <img
                            src={editAvatar}
                            alt="Current"
                            className="w-12 h-12 rounded-xl object-cover border-2 border-[#0047AB]"
                          />
                          <div className="flex flex-wrap items-center gap-2">
                            {AVATAR_PRESETS.map((preset) => (
                              <button
                                type="button"
                                key={preset.id}
                                onClick={() => setEditAvatar(preset.url)}
                                className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-transform cursor-pointer ${
                                  editAvatar === preset.url ? 'border-[#0047AB] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                              >
                                <img src={preset.url} alt={preset.labelEn} className="w-full h-full object-cover" />
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono border border-slate-300 flex items-center space-x-1 cursor-pointer"
                            >
                              <Upload className="w-3 h-3" />
                              <span>{lang === 'zh' ? '上传照片' : 'Upload'}</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <input
                            type="url"
                            value={editAvatar}
                            onChange={(e) => setEditAvatar(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                            {lang === 'zh' ? '姓名' : 'Full Name'}
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                            {lang === 'zh' ? '学号 / ID' : 'Student ID'}
                          </label>
                          <input
                            type="text"
                            value={editStudentId}
                            onChange={(e) => setEditStudentId(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                            {lang === 'zh' ? '邮箱' : 'Email'}
                          </label>
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                            {lang === 'zh' ? '年级' : 'Grade'}
                          </label>
                          <select
                            value={editGrade}
                            onChange={(e) => setEditGrade(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                          >
                            <option value="Grade 8">Grade 8</option>
                            <option value="Grade 9">Grade 9</option>
                            <option value="Grade 10">Grade 10</option>
                            <option value="Grade 11">Grade 11</option>
                            <option value="Grade 12">Grade 12</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                          {lang === 'zh' ? '常用相机与器材' : lang === 'fr' ? 'Appareils & Objectifs' : 'Camera Gear & Lenses'}
                        </label>
                        <input
                          type="text"
                          value={editGear}
                          onChange={(e) => setEditGear(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                          placeholder="e.g. Sony A7 IV + FE 24-70mm f/2.8 GM II"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                          {lang === 'zh' ? '个人摄影陈述 / 简介' : lang === 'fr' ? 'Démarche / Biographie' : 'Artist Statement / Bio'}
                        </label>
                        <textarea
                          rows={2}
                          value={editBio}
                          onChange={(e) => {
                            setEditBio(e.target.value);
                            setEditBioZh(e.target.value);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                        />
                      </div>

                      <div className="flex items-center justify-end space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          {lang === 'zh' ? '取消' : 'Cancel'}
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveProfile}
                          className="px-5 py-2 rounded-lg bg-[#0047AB] text-white text-xs font-mono font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          {lang === 'zh' ? '保存更改' : lang === 'fr' ? 'Enregistrer' : 'Save Changes'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: SUBMIT PHOTO FOR REVIEW */}
          {activeTab === 'submit' && (
            <form onSubmit={handleSubmitPhoto} className="space-y-6">
              {/* Submission Workflow Policy Banner */}
              <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs font-mono space-y-1.5 shadow-2xs">
                <div className="flex items-center space-x-2 text-amber-900 font-bold">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {lang === 'zh' ? '【重要须知】社员作品参展审核流程与规范' : 'Curatorial Review Workflow'}
                  </span>
                </div>
                <p className="text-[11.5px] text-amber-950/90 font-sans leading-relaxed">
                  {lang === 'zh'
                    ? '根据社团展出规范，社员上传的照片属于参展申请。提交后将进入审核队列，审核通过后正式录入展厅展出。'
                    : 'According to club policy, student uploads are submitted for review rather than published directly. Submissions will be vetted before going live on the gallery.'}
                </p>
                <div className="flex items-center space-x-2 text-[10.5px] text-amber-800 pt-0.5 font-mono">
                  <span className="bg-amber-200/80 px-1.5 py-0.5 rounded">1. 社员在线提交</span>
                  <span>→</span>
                  <span className="bg-amber-200/80 px-1.5 py-0.5 rounded">2. 管理员审核</span>
                  <span>→</span>
                  <span className="bg-emerald-200/80 text-emerald-950 px-1.5 py-0.5 rounded font-bold">3. 正式陈列于画廊</span>
                </div>
              </div>

              {/* Quick sample fill bar */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#0047AB]">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">
                    {lang === 'zh' ? '快速填入测试样张:' : lang === 'fr' ? 'Exemples pré-remplis :' : 'Quick Pre-fill Test Sample:'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleLoadSampleSubmission('vancouver')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-100 text-[#0047AB] text-xs font-mono border border-blue-300 transition-colors cursor-pointer"
                  >
                    {lang === 'zh' ? '温哥华海滩' : 'Jericho Beach'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSampleSubmission('macro')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-100 text-[#0047AB] text-xs font-mono border border-blue-300 transition-colors cursor-pointer"
                  >
                    {lang === 'zh' ? '中庭微距' : 'Dewdrop Macro'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSampleSubmission('street')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-100 text-[#0047AB] text-xs font-mono border border-blue-300 transition-colors cursor-pointer"
                  >
                    {lang === 'zh' ? '霓虹街头' : 'Cyberpunk Neon'}
                  </button>
                </div>
              </div>

              {/* Submitter Info Banner */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>
                  {lang === 'zh' ? '当前投稿人:' : lang === 'fr' ? 'Soumission en tant que :' : 'Submitting as:'}{' '}
                  <strong className="text-[#0047AB]">{currentUser.name}</strong> ({currentUser.grade})
                </span>
                <span className="text-slate-400">ID: {currentUser.studentId}</span>
              </div>

              {/* Title & Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '作品标题 (中文)' : lang === 'fr' ? 'Titre de l’œuvre *' : 'Artwork Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={subTitleZh}
                    onChange={(e) => {
                      setSubTitleZh(e.target.value);
                      if (!subTitle) setSubTitle(e.target.value);
                    }}
                    placeholder={lang === 'zh' ? '例如：太平洋森林的晨曦光辉' : 'e.g. Golden Canopy of Pacific Spirit'}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '作品英文名称 (可选)' : 'English Title (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    placeholder="e.g. Golden Canopy of Pacific Spirit"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '摄影主题类别 *' : lang === 'fr' ? 'Catégorie thématique *' : 'Theme Category *'}
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value as PhotoCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                  >
                    <option value="landscape">{lang === 'zh' ? '风光与海岸' : lang === 'fr' ? 'Paysages & Côtes' : 'Coast & Landscape'}</option>
                    <option value="street">{lang === 'zh' ? '街头与纪实' : lang === 'fr' ? 'Rue & Néon' : 'Street & Documentary'}</option>
                    <option value="portrait">{lang === 'zh' ? '人像与肖像' : lang === 'fr' ? 'Portraits' : 'Portraiture'}</option>
                    <option value="architecture">{lang === 'zh' ? '建筑与空间' : lang === 'fr' ? 'Architecture & Géométrie' : 'Architecture'}</option>
                    <option value="macro">{lang === 'zh' ? '微距与生态' : lang === 'fr' ? 'Macro & Nature' : 'Macro & Nature'}</option>
                    <option value="campus">{lang === 'zh' ? '校园与体育' : lang === 'fr' ? 'Campus & Événements' : 'Campus & Sports'}</option>
                    <option value="experimental">{lang === 'zh' ? '暗房与实验' : lang === 'fr' ? 'Argentique & Labo' : 'Analog & Darkroom'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '创作年份' : lang === 'fr' ? 'Année' : 'Year'}
                  </label>
                  <select
                    value={subYear}
                    onChange={(e) => setSubYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '拍摄地点' : lang === 'fr' ? 'Lieu de prise de vue' : 'Location'}
                  </label>
                  <input
                    type="text"
                    value={subLocation}
                    onChange={(e) => setSubLocation(e.target.value)}
                    placeholder="e.g. Spanish Banks, Vancouver"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                  />
                </div>
              </div>

              {/* Image URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '高清图片展示URL *' : lang === 'fr' ? 'URL de l’image HD *' : 'Photo Image URL (High-Res) *'}
                  </label>
                  <input
                    type="url"
                    required
                    value={subImageUrl}
                    onChange={(e) => setSubImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '原始RAW文件下载链接 (可选)' : lang === 'fr' ? 'Lien RAW original (Optionnel)' : 'Original RAW URL (Optional)'}
                  </label>
                  <input
                    type="url"
                    value={subRawUrl}
                    onChange={(e) => setSubRawUrl(e.target.value)}
                    placeholder="https://... (.ARW / .CR3 / .RAF)"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                  />
                </div>
              </div>

              {/* EXIF Parameters */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#0047AB] font-bold">
                  <Sliders className="w-4 h-4" />
                  <span>
                    {lang === 'zh' ? '拍摄参数与器材信息' : lang === 'fr' ? 'Données EXIF' : 'EXIF Parameters'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-mono text-slate-600 mb-0.5">
                      {lang === 'zh' ? '相机' : 'Camera'}
                    </label>
                    <input
                      type="text"
                      value={subCamera}
                      onChange={(e) => setSubCamera(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs font-mono outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-mono text-slate-600 mb-0.5">
                      {lang === 'zh' ? '镜头' : 'Lens'}
                    </label>
                    <input
                      type="text"
                      value={subLens}
                      onChange={(e) => setSubLens(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-0.5">
                      {lang === 'zh' ? '光圈' : 'Aperture'}
                    </label>
                    <input
                      type="text"
                      value={subAperture}
                      onChange={(e) => setSubAperture(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-0.5">
                      {lang === 'zh' ? '快门' : 'Shutter'}
                    </label>
                    <input
                      type="text"
                      value={subShutter}
                      onChange={(e) => setSubShutter(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Description & Tags */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '作品创作理念与说明' : lang === 'fr' ? 'Démarche artistique' : 'Artistic Statement'}
                  </label>
                  <textarea
                    rows={2}
                    value={subDescZh}
                    onChange={(e) => {
                      setSubDescZh(e.target.value);
                      if (!subDesc) setSubDesc(e.target.value);
                    }}
                    placeholder={lang === 'zh' ? '描述构图理念、用光构思或背后的故事...' : 'Describe light, story, or technical approach...'}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '标签关键词 (逗号分隔)' : lang === 'fr' ? 'Mots-clés / Tags' : 'Keywords / Tags'}
                  </label>
                  <input
                    type="text"
                    value={subTags}
                    onChange={(e) => setSubTags(e.target.value)}
                    placeholder="Vancouver, Coast, GoldenHour"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 outline-none focus:border-[#0047AB]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-lg shadow-blue-900/15 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {lang === 'zh' ? '提交作品申请至管理员审核' : lang === 'fr' ? 'Soumettre pour validation' : 'Submit Application for Review'}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: MY SUBMISSIONS STATUS */}
          {activeTab === 'my-submissions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-mono">
                    {lang === 'zh' ? '我的投递记录与审核状态' : lang === 'fr' ? 'Historique de mes soumissions' : 'My Submissions Archive'}
                  </h4>
                  <p className="text-xs text-slate-500 font-light">
                    {lang === 'zh' ? '实时查看策展教师与主席团的审核意见与展出状态。' : lang === 'fr' ? 'Suivez les retours des curateurs.' : 'Track real-time feedback and exhibition status.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('submit')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0047AB] text-white text-xs font-mono hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{lang === 'zh' ? '+ 提交新作品' : lang === 'fr' ? '+ Nouvelle soumission' : '+ New Submission'}</span>
                </button>
              </div>

              {mySubmissionsList.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                  <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-700 font-medium">
                    {lang === 'zh' ? '您暂未提交任何作品。' : lang === 'fr' ? 'Aucune photo soumise.' : 'No photo submissions yet.'}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'zh' ? '点击上方按钮投递您的摄影佳作！' : 'Submit your photographs to be featured!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mySubmissionsList.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-colors shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={sub.imageUrl}
                          alt={sub.title}
                          className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h5 className="font-serif font-bold text-sm text-slate-900">
                              {lang === 'zh' ? sub.titleZh : sub.title}
                            </h5>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-[#0047AB] border border-blue-200">
                              {sub.category}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600">
                              {sub.year || '2026'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            {sub.exif.camera} • {sub.exif.lens} • {sub.exif.aperture} • {sub.exif.shutterSpeed}
                          </p>
                          {sub.curatorFeedback && (
                            <div className="mt-1.5 p-2 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-900">
                              <strong>
                                {lang === 'zh' ? '策展评语: ' : 'Curator Feedback: '}
                              </strong>
                              {lang === 'zh' ? (sub.curatorFeedbackZh || sub.curatorFeedback) : sub.curatorFeedback}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="shrink-0 flex items-center space-x-2">
                        {sub.status === 'approved' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-mono font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{lang === 'zh' ? '已入选并公开展出' : lang === 'fr' ? 'Approuvé & Exposé' : 'Approved & Exhibited'}</span>
                          </span>
                        )}
                        {sub.status === 'pending' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-300 text-xs font-mono font-semibold">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>{lang === 'zh' ? '审核中' : lang === 'fr' ? 'En cours d’examen' : 'In Review'}</span>
                          </span>
                        )}
                        {sub.status === 'rejected' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-300 text-xs font-mono font-semibold">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>{lang === 'zh' ? '需修改' : lang === 'fr' ? 'Révision requise' : 'Revision Needed'}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CURATOR & ADMIN REVIEW DESK */}
          {activeTab === 'admin-review' && isCurator && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center space-x-2 text-amber-700 font-bold font-mono text-sm">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <span>
                      {lang === 'zh' ? '社团策展委员会评审台' : lang === 'fr' ? 'Bureau de revue des curateurs' : 'Executive Curator Review Desk'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-light">
                    {lang === 'zh'
                      ? '审核学员投稿，撰写指导点评，一键发布至官方精选展厅。'
                      : 'Review submitted student work, provide critiques, and approve for gallery.'}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-bold">
                    {submissions.filter((s) => s.status === 'pending').length} {lang === 'zh' ? '待审核' : 'Pending'}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">
                    {submissions.filter((s) => s.status === 'approved').length} {lang === 'zh' ? '已入选' : 'Approved'}
                  </span>
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-700 font-medium">
                    {lang === 'zh' ? '所有作品均已审核完毕！' : 'All student submissions reviewed!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {submissions.map((sub) => {
                    const feedback = adminFeedbackText[sub.id] || '';
                    return (
                      <div
                        key={sub.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={sub.imageUrl}
                              alt={sub.title}
                              className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0"
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-serif font-bold text-base text-slate-900">
                                  {lang === 'zh' ? sub.titleZh : sub.title}
                                </h4>
                                <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0047AB] text-xs font-mono font-semibold">
                                  {sub.category}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono">
                                  {sub.year || '2026'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">
                                {lang === 'zh' ? '作者:' : 'Author:'} <strong>{sub.studentName}</strong> ({sub.studentGrade}) • ID: {sub.studentId}
                              </p>
                            </div>
                          </div>

                          {/* Status */}
                          <div>
                            {sub.status === 'approved' && (
                              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-mono font-semibold">
                                ✓ {lang === 'zh' ? '已发布至展厅' : 'Approved & Published'}
                              </span>
                            )}
                            {sub.status === 'pending' && (
                              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-semibold">
                                ⏳ {lang === 'zh' ? '待策展裁决' : 'Awaiting Decision'}
                              </span>
                            )}
                            {sub.status === 'rejected' && (
                              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-300 text-xs font-mono font-semibold">
                                ✗ {lang === 'zh' ? '已退回修改' : 'Needs Revision'}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* EXIF & Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                          <div>
                            <span className="font-mono text-slate-500 font-semibold block mb-0.5">
                              {lang === 'zh' ? '拍摄参数' : 'EXIF Parameters'}:
                            </span>
                            <p className="font-mono text-slate-800">
                              {sub.exif.camera} • {sub.exif.lens}
                            </p>
                            <p className="font-mono text-slate-600 text-[11px]">
                              {sub.exif.focalLength} • {sub.exif.aperture} • {sub.exif.shutterSpeed} • ISO {sub.exif.iso}
                            </p>
                          </div>
                          <div>
                            <span className="font-mono text-slate-500 font-semibold block mb-0.5">
                              {lang === 'zh' ? '拍摄地点与理念' : 'Location & Story'}:
                            </span>
                            <p className="text-slate-700">{sub.exif.location}</p>
                            <p className="text-slate-500 text-[11px] mt-0.5 italic">
                              "{lang === 'zh' ? (sub.descriptionZh || sub.description) : sub.description}"
                            </p>
                          </div>
                        </div>

                        {/* Curator Feedback & Actions */}
                        {sub.status === 'pending' && (
                          <div className="pt-2 space-y-3">
                            <input
                              type="text"
                              value={feedback}
                              onChange={(e) =>
                                setAdminFeedbackText({ ...adminFeedbackText, [sub.id]: e.target.value })
                              }
                              placeholder={lang === 'zh' ? '添加策展点评或指导评语...' : 'Add curator feedback or critique comments...'}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#0047AB]"
                            />
                            <div className="flex items-center justify-end space-x-3">
                              <button
                                onClick={() => rejectSubmission(sub.id, feedback)}
                                className="px-4 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-mono font-semibold transition-colors cursor-pointer"
                              >
                                {lang === 'zh' ? '要求修改' : 'Request Revision'}
                              </button>
                              <button
                                onClick={() => {
                                  approveSubmission(sub.id, feedback);
                                  showToast(
                                    lang === 'zh' 
                                      ? `已批准 "${sub.titleZh || sub.title}" 并发布至精选展厅！` 
                                      : `Approved "${sub.title}" and published to gallery!`
                                  );
                                }}
                                className="flex items-center space-x-1.5 px-5 py-1.5 rounded-lg bg-[#0047AB] hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-md transition-colors cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>{lang === 'zh' ? '批准并发布至展厅' : 'Approve & Publish to Gallery'}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
