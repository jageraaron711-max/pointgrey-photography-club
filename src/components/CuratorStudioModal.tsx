import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PhotoCategory, EventCategory } from '../types';
import { 
  X, PlusCircle, Camera, Calendar, Megaphone, Database, 
  Sparkles, Upload, Check, Download, RefreshCw, Sliders,
  Shield, ShieldCheck, ShieldAlert, Lock, CheckCircle2, XCircle, Clock,
  AlertTriangle, UserCheck, MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

interface CuratorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudentPortal?: () => void;
}

export const CuratorStudioModal: React.FC<CuratorStudioModalProps> = ({ isOpen, onClose, onOpenStudentPortal }) => {
  const { 
    lang, 
    currentUser,
    loginUser,
    exitAdminMode,
    submissions,
    approveSubmission,
    rejectSubmission,
    addPhoto, 
    addEvent, 
    addAnnouncement, 
    exportDatabaseJSON, 
    importDatabaseJSON, 
    resetToCuratedData 
  } = useApp();

  const isCurator = currentUser?.role === 'curator_admin';

  const [activeTab, setActiveTab] = useState<'review' | 'photo' | 'event' | 'notice' | 'backup'>('review');
  const [successMsg, setSuccessMsg] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [feedbackInputs, setFeedbackInputs] = useState<Record<string, string>>({});

  // 1. Photo Form State
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoTitleZh, setPhotoTitleZh] = useState('');
  const [photoAuthor, setPhotoAuthor] = useState('');
  const [photoGrade, setPhotoGrade] = useState('Grade 11');
  const [photoCategory, setPhotoCategory] = useState<PhotoCategory>('landscape');
  const [photoImageUrl, setPhotoImageUrl] = useState('');
  const [photoRawUrl, setPhotoRawUrl] = useState('');
  const [photoDesc, setPhotoDesc] = useState('');
  const [photoDescZh, setPhotoDescZh] = useState('');
  const [photoCamera, setPhotoCamera] = useState('Sony Alpha 7 IV');
  const [photoLens, setPhotoLens] = useState('FE 24-70mm f/2.8 GM II');
  const [photoFocal, setPhotoFocal] = useState('35mm');
  const [photoAperture, setPhotoAperture] = useState('f/2.8');
  const [photoShutter, setPhotoShutter] = useState('1/250s');
  const [photoIso, setPhotoIso] = useState('100');
  const [photoLocation, setPhotoLocation] = useState('Pacific Spirit Park, Vancouver');
  const [photoAward, setPhotoAward] = useState('');
  const [photoTags, setPhotoTags] = useState('Vancouver, Coast, GoldenHour');

  // 2. Event Form State
  const [evtTitle, setEvtTitle] = useState('');
  const [evtTitleZh, setEvtTitleZh] = useState('');
  const [evtCategory, setEvtCategory] = useState<EventCategory>('photowalk');
  const [evtDate, setEvtDate] = useState('2026-10-10');
  const [evtTime, setEvtTime] = useState('16:00 - 18:30');
  const [evtLocation, setEvtLocation] = useState('Spanish Banks Beach Pier, Vancouver');
  const [evtLocationZh, setEvtLocationZh] = useState('温哥华西班牙银行海滩码头');
  const [evtCoverImage, setEvtCoverImage] = useState('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80');
  const [evtDesc, setEvtDesc] = useState('');
  const [evtDescZh, setEvtDescZh] = useState('');
  const [evtInstructor, setEvtInstructor] = useState('PGSS Photography Execs');
  const [evtSpots, setEvtSpots] = useState(25);

  // 3. Announcement State
  const [annTitle, setAnnTitle] = useState('');
  const [annTitleZh, setAnnTitleZh] = useState('');
  const [annCategory, setAnnCategory] = useState<'general' | 'contest' | 'equipment' | 'exhibition'>('general');
  const [annContent, setAnnContent] = useState('');
  const [annContentZh, setAnnContentZh] = useState('');
  const [annImportant, setAnnImportant] = useState(true);

  // 4. Import JSON State
  const [jsonInput, setJsonInput] = useState('');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLoadSamplePhoto = (type: 'vancouver' | 'film' | 'night') => {
    if (type === 'vancouver') {
      setPhotoTitle('Jericho Sunset Drift');
      setPhotoTitleZh('杰里科暮色海风');
      setPhotoAuthor('Julian Lee');
      setPhotoGrade('Grade 11');
      setPhotoCategory('landscape');
      setPhotoImageUrl('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85');
      setPhotoCamera('Sony Alpha 7R V');
      setPhotoLens('FE 16-35mm f/2.8 GM II');
      setPhotoFocal('24mm');
      setPhotoAperture('f/8.0');
      setPhotoShutter('1/8s');
      setPhotoIso('100');
      setPhotoLocation('Jericho Beach, Vancouver');
      setPhotoDesc('Captured during the evening coastal low tide. Warm golden reflections mirrored over tidal sands.');
      setPhotoDescZh('温哥华杰里科海滩退潮时分的暮色落日，金色余晖倒映在湿润的沙滩上。');
      setPhotoTags('Vancouver, Coast, GoldenHour, Sunset');
    } else if (type === 'film') {
      setPhotoTitle('Analog Darkroom Chemistry Archive');
      setPhotoTitleZh('暗房手工显影的黑白纪实');
      setPhotoAuthor('Chloe Zhang');
      setPhotoGrade('Grade 12');
      setPhotoCategory('experimental');
      setPhotoImageUrl('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=85');
      setPhotoCamera('Leica M6 Classic');
      setPhotoLens('Summicron 35mm f/2');
      setPhotoFocal('35mm');
      setPhotoAperture('f/2.0');
      setPhotoShutter('1/30s');
      setPhotoIso('400 (HP5+)');
      setPhotoLocation('PGSS Darkroom Lab');
      setPhotoDesc('Traditional silver halide print emerging under red safelight.');
      setPhotoDescZh('红色暗房安全灯下，定格银盐显影过程中的专注神情。');
      setPhotoTags('Analog, 35mm, Darkroom, Monochrome');
    } else {
      setPhotoTitle('Pacific Rain Reflections');
      setPhotoTitleZh('雨夜温哥华的光影流淌');
      setPhotoAuthor('Lucas Vance');
      setPhotoGrade('Grade 10');
      setPhotoCategory('street');
      setPhotoImageUrl('https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85');
      setPhotoCamera('Fujifilm X-T5');
      setPhotoLens('XF 23mm f/1.4 R');
      setPhotoFocal('23mm');
      setPhotoAperture('f/1.4');
      setPhotoShutter('1/125s');
      setPhotoIso('1250');
      setPhotoLocation('Granville St, Vancouver');
      setPhotoDesc('Cinematic neon reflection street photography.');
      setPhotoDescZh('市中心雨夜街道的电影感霓虹反射。');
      setPhotoTags('Neon, Rain, Street, Cyberpunk');
    }
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle || !photoAuthor || !photoImageUrl) {
      alert(
        lang === 'zh' 
          ? '请填写作品标题、作者和图片链接。' 
          : lang === 'fr' 
          ? 'Veuillez renseigner le titre, l’auteur et l’URL.' 
          : 'Please fill in Title, Author and Image URL.'
      );
      return;
    }

    addPhoto({
      title: photoTitle,
      titleZh: photoTitleZh || photoTitle,
      author: photoAuthor,
      authorGrade: photoGrade,
      year: new Date().getFullYear().toString(),
      category: photoCategory,
      imageUrl: photoImageUrl,
      rawUrl: photoRawUrl || undefined,
      exif: {
        camera: photoCamera,
        lens: photoLens,
        focalLength: photoFocal,
        aperture: photoAperture,
        shutterSpeed: photoShutter,
        iso: photoIso,
        location: photoLocation,
        date: new Date().toISOString().split('T')[0],
      },
      description: photoDesc || 'Point Grey student photograph submission.',
      descriptionZh: photoDescZh || 'Point Grey 中学学生摄影作品。',
      featured: false,
      award: photoAward || undefined,
      awardZh: photoAward ? (photoAward + '荣誉') : undefined,
      tags: photoTags.split(',').map(t => t.trim()).filter(Boolean),
    });

    showNotification(
      lang === 'zh' 
        ? '作品已成功发布至作品库！' 
        : lang === 'fr' 
        ? 'Photo ajoutée à la galerie avec succès !' 
        : 'Photo successfully added to showcase!'
    );
    setPhotoTitle('');
    setPhotoTitleZh('');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle || !evtDate) {
      alert(
        lang === 'zh' 
          ? '请填写活动标题与日期。' 
          : lang === 'fr' 
          ? 'Veuillez saisir le titre et la date.' 
          : 'Please fill in Title and Date.'
      );
      return;
    }

    addEvent({
      title: evtTitle,
      titleZh: evtTitleZh || evtTitle,
      category: evtCategory,
      date: evtDate,
      time: evtTime,
      location: evtLocation,
      locationZh: evtLocationZh || evtLocation,
      status: 'upcoming',
      coverImage: evtCoverImage,
      description: evtDesc || 'Point Grey Photo Club organized event.',
      descriptionZh: evtDescZh || 'Point Grey 摄影社主办活动。',
      instructor: evtInstructor,
      instructorRole: 'Club Executive Lead',
      spotsTotal: Number(evtSpots) || 25,
      isRegistrationOpen: true,
      agenda: [
        { time: '16:00 - 16:20', activity: 'Gathering & Briefing', activityZh: '集合与外拍注意事项' },
        { time: '16:20 - 17:45', activity: 'Field Photography Shoot', activityZh: '实战拍摄与光影指导' },
        { time: '17:45 - 18:30', activity: 'Review & Feedback', activityZh: '即时作品评析与总结' }
      ],
      requirements: ['Camera or Smartphone', 'Fully charged battery', 'Student ID Card'],
      requirementsZh: ['相机或具备专业模式的手机', '充足电量备用电池', '佩戴学生证件'],
    });

    showNotification(
      lang === 'zh' 
        ? '新社团活动已成功发布并同步！' 
        : lang === 'fr' 
        ? 'Activité du club programmée et publiée !' 
        : 'New Club Activity scheduled!'
    );
    setEvtTitle('');
    setEvtTitleZh('');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    addAnnouncement({
      title: annTitle,
      titleZh: annTitleZh || annTitle,
      date: new Date().toISOString().split('T')[0],
      category: annCategory,
      content: annContent,
      contentZh: annContentZh || annContent,
      author: 'Curator Studio Admin',
      isImportant: annImportant,
    });

    showNotification(
      lang === 'zh' 
        ? '通知公告已成功发布！' 
        : lang === 'fr' 
        ? 'Annonce publiée avec succès !' 
        : 'Announcement published!'
    );
    setAnnTitle('');
    setAnnContent('');
  };

  const handleImportJSON = () => {
    if (!jsonInput.trim()) return;
    const ok = importDatabaseJSON(jsonInput);
    if (ok) {
      showNotification(
        lang === 'zh' 
          ? '已成功从JSON还原数据！' 
          : lang === 'fr' 
          ? 'Base de données restaurée avec succès !' 
          : 'Database restored from JSON successfully!'
      );
      setJsonInput('');
    } else {
      alert(lang === 'zh' ? 'JSON格式不正确' : lang === 'fr' ? 'Format JSON invalide' : 'Invalid JSON format');
    }
  };

  const ADMIN_PASSCODE = '825098';

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = adminPasscode.trim();
    if (clean === ADMIN_PASSCODE) {
      loginUser('user-01'); // Aaron Peng (curator_admin)
      setAdminError('');
      setAdminPasscode('');
      showNotification(lang === 'zh' ? '管理权限密码验证通过！已登入社长管理员：Aaron Peng' : 'Verified! Logged in as Curator Admin: Aaron Peng');
    } else {
      setAdminError(
        lang === 'zh'
          ? '管理员密码错误，无权进入。权限密码为 825098。'
          : 'Incorrect admin passcode. Required passcode is 825098.'
      );
    }
  };

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const filteredSubmissions = submissions.filter((s) => {
    if (reviewFilter === 'all') return true;
    return s.status === reviewFilter;
  });

  // RESTRICTED GATE FOR NON-ADMINISTRATORS
  if (!isCurator) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-white border border-amber-200/80 rounded-2xl shadow-2xl overflow-hidden font-mono"
        >
          {/* Top restricted header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2.5 text-amber-400 text-xs font-bold">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
              <span>POINT GREY // ADMIN ACCESS REQUIRED</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                {lang === 'zh' ? '社团管理后台 · 管理员密码验证' : 'Curator Studio · Admin Authentication'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {lang === 'zh'
                  ? '所有编辑、策展审核与内容发布权限仅开放给社团管理员（Admin）。学生不可见也不具备编辑权限。'
                  : 'All editorial, curation, and publishing privileges are restricted exclusively to Club Administrators.'}
              </p>
            </div>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                  {lang === 'zh' ? '管理员专属权限密码' : 'Admin Passcode'}
                </label>
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => {
                    setAdminPasscode(e.target.value);
                    setAdminError('');
                  }}
                  placeholder={lang === 'zh' ? '请输入管理密码 (825098)' : 'Enter admin passcode (825098)'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-mono text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  autoFocus
                />
                {adminError && (
                  <p className="text-[11px] text-rose-600 mt-1 font-mono font-medium">
                    {adminError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-blue-200" />
                <span>{lang === 'zh' ? '验证并解锁管理员权限' : 'Verify & Unlock Admin Controls'}</span>
              </button>
            </form>

            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenStudentPortal) onOpenStudentPortal();
                }}
                className="w-full py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-mono transition-colors cursor-pointer text-center"
              >
                {lang === 'zh' ? '← 我是普通社员，前往社员中心提交作品' : '← Return to Student Desk to Apply'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // UNLOCKED CURATOR STUDIO (ADMIN MODE)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-white border border-blue-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between font-mono text-xs border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-xs shadow-xs">
              👑
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">PGSS PHOTO // CURATOR STUDIO</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] border border-amber-400/30">
                  {lang === 'zh' ? '社团管理员 (Admin)' : 'CURATOR ADMIN'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                exitAdminMode();
                showNotification(lang === 'zh' ? '已退出管理模式，切换至社员视角' : 'Switched to Student mode');
              }}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono transition-colors cursor-pointer"
              title={lang === 'zh' ? '切换为社员视角' : 'Switch to Student View'}
            >
              {lang === 'zh' ? '切换为社员视角' : 'Student Mode'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('review')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'review'
                ? 'border-amber-500 text-amber-700 font-bold bg-amber-50/80'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'zh' ? '社员作品审核申请' : 'Review Applications'}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              pendingSubmissions.length > 0
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-slate-200 text-slate-700'
            }`}>
              {pendingSubmissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('photo')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'photo'
                ? 'border-[#0047AB] text-[#0047AB] font-bold bg-blue-50/60'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? '特展母带馆藏发布' : 'Direct Exhibition Curation'}</span>
          </button>

          <button
            onClick={() => setActiveTab('event')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'event'
                ? 'border-[#0047AB] text-[#0047AB] font-bold bg-blue-50/60'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? '创建社团活动/外拍' : 'Schedule Activity'}</span>
          </button>

          <button
            onClick={() => setActiveTab('notice')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'notice'
                ? 'border-[#0047AB] text-[#0047AB] font-bold bg-blue-50/60'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? '发布通知公告' : 'Announcements'}</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'backup'
                ? 'border-[#0047AB] text-[#0047AB] font-bold bg-blue-50/60'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? '数据备份与重置' : 'Data Backup & Reset'}</span>
          </button>
        </div>

        {/* Success Toast */}
        {successMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-6 py-2 text-xs font-mono flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* 0. REVIEW STUDENT SUBMISSIONS (PRIMARY CURATOR TAB) */}
          {activeTab === 'review' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200 font-mono">
                <div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <h4 className="text-sm font-bold text-amber-950">
                      {lang === 'zh' ? '社员作品参展申请审核台' : 'Student Photo Application Review Desk'}
                    </h4>
                  </div>
                  <p className="text-xs text-amber-900/80 font-sans mt-0.5">
                    {lang === 'zh'
                      ? '所有学生上传的照片均须在此由社长管理员审核。批准后将正式收录入展厅，实时统计数据亦会即时递增。'
                      : 'All student submissions must be approved here by the administrator before appearing in the public gallery.'}
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center space-x-1.5 text-xs">
                  {(['all', 'pending', 'approved', 'rejected'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      type="button"
                      onClick={() => setReviewFilter(filterKey)}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer capitalize ${
                        reviewFilter === filterKey
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                      }`}
                    >
                      {filterKey === 'all' && (lang === 'zh' ? `全部 (${submissions.length})` : `All (${submissions.length})`)}
                      {filterKey === 'pending' && (lang === 'zh' ? `待审核 (${pendingSubmissions.length})` : `Pending (${pendingSubmissions.length})`)}
                      {filterKey === 'approved' && (lang === 'zh' ? `已入选 (${submissions.filter(s => s.status === 'approved').length})` : `Approved (${submissions.filter(s => s.status === 'approved').length})`)}
                      {filterKey === 'rejected' && (lang === 'zh' ? `需修改 (${submissions.filter(s => s.status === 'rejected').length})` : `Revisions (${submissions.filter(s => s.status === 'rejected').length})`)}
                    </button>
                  ))}
                </div>
              </div>

              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 font-mono">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-800 font-bold">
                    {lang === 'zh' ? '暂无匹配的社员作品申请' : 'No matching student submissions.'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-sans">
                    {lang === 'zh' ? '当有学生在社员中心提交作品申请时，将即刻出现在此处等待您的审核。' : 'When students apply via the Student Desk, submissions appear here for review.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map((sub) => {
                    const currentFeedback = feedbackInputs[sub.id] || '';
                    return (
                      <div
                        key={sub.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 transition-all shadow-xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                          <div className="flex items-center space-x-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 ${
                              sub.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : sub.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {sub.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                              {sub.status === 'rejected' && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                              {sub.status === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                              <span>
                                {sub.status === 'approved' ? (lang === 'zh' ? '已入选特展' : 'Approved & Exhibited')
                                  : sub.status === 'rejected' ? (lang === 'zh' ? '需修改' : 'Revision Required')
                                  : (lang === 'zh' ? '待管理员审核' : 'Pending Curator Review')}
                              </span>
                            </span>

                            <span className="text-xs font-mono text-slate-500">
                              {sub.submittedAt}
                            </span>
                          </div>

                          <div className="text-xs font-mono text-slate-600">
                            <span>{lang === 'zh' ? '投稿社员: ' : 'Author: '}</span>
                            <strong className="text-slate-900">{sub.studentName}</strong>
                            <span className="text-slate-400 ml-1">({sub.studentGrade} • {sub.studentEmail})</span>
                          </div>
                        </div>

                        {/* Photo Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                          {/* Image preview */}
                          <div className="sm:col-span-5 relative group overflow-hidden rounded-xl bg-slate-900 border border-slate-200">
                            <img
                              src={sub.imageUrl}
                              alt={sub.title}
                              className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                              {sub.category}
                            </div>
                          </div>

                          {/* Info Column */}
                          <div className="sm:col-span-7 space-y-3 font-sans">
                            <div>
                              <h5 className="font-serif font-bold text-base text-slate-900">
                                {lang === 'zh' ? sub.titleZh : sub.title}
                              </h5>
                              <p className="text-xs text-slate-500 font-mono">
                                {sub.title}
                              </p>
                            </div>

                            {/* EXIF Parameters Box */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1 text-slate-700">
                              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                                {lang === 'zh' ? '器材与拍摄参数 (EXIF)' : 'EXIF TELEMETRY'}
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-[11px]">
                                <div>📷 {sub.exif.camera}</div>
                                <div>🔍 {sub.exif.lens}</div>
                                <div>⚙️ {sub.exif.aperture} • {sub.exif.shutterSpeed}</div>
                                <div>🎞️ ISO {sub.exif.iso} • {sub.exif.focalLength}</div>
                              </div>
                              {sub.exif.location && (
                                <div className="text-[11px] text-slate-500 pt-0.5">
                                  📍 {sub.exif.location}
                                </div>
                              )}
                            </div>

                            {/* Description / Statement */}
                            <p className="text-xs text-slate-600 italic bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                              "{lang === 'zh' ? (sub.descriptionZh || sub.description) : sub.description}"
                            </p>

                            {/* Tags */}
                            {sub.tags && sub.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {sub.tags.map((t, idx) => (
                                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Curator Review Actions & Feedback */}
                        <div className="pt-3 border-t border-slate-100 space-y-3 font-mono">
                          <div>
                            <label className="block text-xs text-slate-700 font-semibold mb-1">
                              {lang === 'zh' ? '策展人评语与反馈 (可写评语或修改建议):' : 'Curator Critique / Feedback:'}
                            </label>
                            <input
                              type="text"
                              value={currentFeedback}
                              onChange={(e) => setFeedbackInputs({ ...feedbackInputs, [sub.id]: e.target.value })}
                              placeholder={lang === 'zh' ? '例如：光影质感出色，构图极佳，准予入选年度特展！' : 'e.g. Exceptional tonal depth and framing. Approved for showcase!'}
                              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 outline-none focus:border-[#0047AB] focus:bg-white"
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-end gap-2.5">
                            {sub.status !== 'approved' && (
                              <button
                                type="button"
                                onClick={() => {
                                  approveSubmission(sub.id, currentFeedback);
                                  showNotification(
                                    lang === 'zh'
                                      ? `✓ 已批准 ${sub.studentName} 的作品《${sub.titleZh || sub.title}》！展品已正式公开入选画廊，统计数据已实时 +1！`
                                      : `✓ Approved ${sub.title} by ${sub.studentName}! Synchronized to gallery.`
                                  );
                                }}
                                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-700/20 flex items-center space-x-2 cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                                <span>{lang === 'zh' ? '✓ 批准并正式入选特展' : '✓ Approve & Exhibit in Gallery'}</span>
                              </button>
                            )}

                            {sub.status !== 'rejected' && (
                              <button
                                type="button"
                                onClick={() => {
                                  rejectSubmission(sub.id, currentFeedback);
                                  showNotification(
                                    lang === 'zh'
                                      ? `已向 ${sub.studentName} 反馈修改建议。`
                                      : `Requested revisions from ${sub.studentName}.`
                                  );
                                }}
                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 hover:border-rose-300 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                                <span>{lang === 'zh' ? '提出修改建议 / 驳回' : 'Request Revision / Reject'}</span>
                              </button>
                            )}

                            {sub.status === 'approved' && (
                              <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                                <Check className="w-4 h-4 text-emerald-600" />
                                <span>{lang === 'zh' ? '已正式收录并展示于画廊' : 'Featured in Live Exhibition'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          
          {/* 1. PHOTO SUBMISSION FORM */}
          {activeTab === 'photo' && (
            <form onSubmit={handleCreatePhoto} className="space-y-4">
              {/* Notice for direct curator release */}
              <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs font-mono text-[#0047AB] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'zh'
                    ? '※ 特展馆藏直投通道：仅供社长与特展策展人直接收录高规格母带作品。普通社员投稿请在「社员作品审核申请」标签中审批。'
                    : '※ Direct Curatorial Channel: For club leadership to catalog archival masterworks directly.'}
                </span>
              </div>
              
              {/* Quick Preset Pickers */}
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#0047AB] font-semibold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'zh' ? '一键填充演示作品数据:' : lang === 'fr' ? 'Données d’exemple :' : 'Quick Pre-fill Test Data:'}
                  </span>
                </span>
                <div className="flex space-x-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleLoadSamplePhoto('vancouver')}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-[#0047AB] border border-blue-200 cursor-pointer shadow-2xs font-medium"
                  >
                    Coastal Sunset (Sony)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSamplePhoto('film')}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-amber-700 border border-amber-200 cursor-pointer shadow-2xs font-medium"
                  >
                    Darkroom 35mm (Leica)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSamplePhoto('night')}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 cursor-pointer shadow-2xs font-medium"
                  >
                    Rain Neon (Fuji)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '作品标题 (英文)' : lang === 'fr' ? 'Titre de la photo (EN)' : 'Photo Title (EN)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder="e.g. Kitsilano Mist & Pines"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '作品标题 (中文)' : lang === 'fr' ? 'Titre de la photo (ZH/Trad.)' : 'Photo Title (中文)'}
                  </label>
                  <input
                    type="text"
                    value={photoTitleZh}
                    onChange={(e) => setPhotoTitleZh(e.target.value)}
                    placeholder="例如：基斯兰奴晨雾与青松"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '学生摄影师姓名' : lang === 'fr' ? 'Auteur / Élève' : 'Student Author'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={photoAuthor}
                    onChange={(e) => setPhotoAuthor(e.target.value)}
                    placeholder="e.g. Jason Zhao"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                      {lang === 'zh' ? '年级' : lang === 'fr' ? 'Niveau scolaire' : 'Grade'}
                    </label>
                    <select
                      value={photoGrade}
                      onChange={(e) => setPhotoGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                    >
                      <option value="Grade 12">Grade 12 (12e)</option>
                      <option value="Grade 11">Grade 11 (11e)</option>
                      <option value="Grade 10">Grade 10 (10e)</option>
                      <option value="Grade 9">Grade 9 (9e)</option>
                      <option value="Grade 8">Grade 8 (8e)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                      {lang === 'zh' ? '作品类别' : lang === 'fr' ? 'Catégorie' : 'Category'}
                    </label>
                    <select
                      value={photoCategory}
                      onChange={(e) => setPhotoCategory(e.target.value as PhotoCategory)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                    >
                      <option value="landscape">{lang === 'zh' ? '风光与海岸' : lang === 'fr' ? 'Paysages & Côtes' : 'Coast & Landscape'}</option>
                      <option value="street">{lang === 'zh' ? '街头与霓虹' : lang === 'fr' ? 'Rue & Néon' : 'Street & Neon'}</option>
                      <option value="portrait">{lang === 'zh' ? '人像与肖像' : lang === 'fr' ? 'Portraits' : 'Portraiture'}</option>
                      <option value="architecture">{lang === 'zh' ? '城市几何' : lang === 'fr' ? 'Architecture' : 'Architecture'}</option>
                      <option value="macro">{lang === 'zh' ? '微距生态' : lang === 'fr' ? 'Macro' : 'Macro'}</option>
                      <option value="campus">{lang === 'zh' ? '校园与赛事' : lang === 'fr' ? 'Campus & Événements' : 'Campus & Hounds'}</option>
                      <option value="experimental">{lang === 'zh' ? '胶片暗房' : lang === 'fr' ? 'Argentique' : 'Analog & Darkroom'}</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '高清图片网络链接' : lang === 'fr' ? 'URL de l’image HD' : 'Image URL (High Res)'} *
                  </label>
                  <input
                    type="url"
                    required
                    value={photoImageUrl}
                    onChange={(e) => setPhotoImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? 'RAW未调色对比图链接 (可选)' : lang === 'fr' ? 'Lien RAW original (Optionnel)' : 'RAW Unedited Image URL (Optional)'}
                  </label>
                  <input
                    type="url"
                    value={photoRawUrl}
                    onChange={(e) => setPhotoRawUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '获奖与荣誉称号 (可选)' : lang === 'fr' ? 'Prix & Distinction (Optionnel)' : 'Award Honor (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={photoAward}
                    onChange={(e) => setPhotoAward(e.target.value)}
                    placeholder="e.g. PGSS Autumn Gold Medal"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>
              </div>

              {/* Optical EXIF Specs */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-mono text-[#0047AB] font-semibold flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'zh' ? '镜头与拍摄参数' : lang === 'fr' ? 'PARAMÈTRES OPTIQUES EXIF' : 'OPTICAL EXIF PARAMETERS'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-0.5">Camera Body</label>
                    <input
                      type="text"
                      value={photoCamera}
                      onChange={(e) => setPhotoCamera(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-0.5">Lens</label>
                    <input
                      type="text"
                      value={photoLens}
                      onChange={(e) => setPhotoLens(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-0.5">Aperture</label>
                    <input
                      type="text"
                      value={photoAperture}
                      onChange={(e) => setPhotoAperture(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-0.5">Shutter Speed</label>
                    <input
                      type="text"
                      value={photoShutter}
                      onChange={(e) => setPhotoShutter(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-0.5">ISO</label>
                    <input
                      type="text"
                      value={photoIso}
                      onChange={(e) => setPhotoIso(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-0.5">Location</label>
                    <input
                      type="text"
                      value={photoLocation}
                      onChange={(e) => setPhotoLocation(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '创作背景描述 (英文)' : lang === 'fr' ? 'Démarche artistique (EN)' : 'Creative Story (EN)'}
                  </label>
                  <textarea
                    rows={2}
                    value={photoDesc}
                    onChange={(e) => setPhotoDesc(e.target.value)}
                    placeholder="Story behind the shot..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '创作背景描述 (中文)' : lang === 'fr' ? 'Démarche artistique (ZH)' : 'Creative Story (中文)'}
                  </label>
                  <textarea
                    rows={2}
                    value={photoDescZh}
                    onChange={(e) => setPhotoDescZh(e.target.value)}
                    placeholder="拍摄灵感与故事..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white font-mono font-semibold text-xs shadow-md shadow-blue-900/15 flex items-center space-x-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>
                    {lang === 'zh' ? '确认发布到作品展厅' : lang === 'fr' ? 'Publier dans la galerie' : 'Publish to Club Showcase'}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* 2. CREATE EVENT SCHEDULE */}
          {activeTab === 'event' && (
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '活动标题 (英文)' : lang === 'fr' ? 'Titre de l’activité (EN)' : 'Event Title (EN)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={evtTitle}
                    onChange={(e) => setEvtTitle(e.target.value)}
                    placeholder="e.g. Pacific Spirit Night Photowalk"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '活动标题 (中文)' : lang === 'fr' ? 'Titre de l’activité (ZH)' : 'Event Title (中文)'}
                  </label>
                  <input
                    type="text"
                    value={evtTitleZh}
                    onChange={(e) => setEvtTitleZh(e.target.value)}
                    placeholder="例如：太平洋森林星野夜拍"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '活动类型' : lang === 'fr' ? 'Type d’activité' : 'Category'}
                  </label>
                  <select
                    value={evtCategory}
                    onChange={(e) => setEvtCategory(e.target.value as EventCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  >
                    <option value="photowalk">{lang === 'zh' ? '实地外拍' : lang === 'fr' ? 'Sortie photo sur le terrain' : 'Field Photowalk'}</option>
                    <option value="darkroom">{lang === 'zh' ? '暗房实验' : lang === 'fr' ? 'Atelier laboratoire argentique' : 'Darkroom Masterclass'}</option>
                    <option value="workshop">{lang === 'zh' ? '后期讲座' : lang === 'fr' ? 'Atelier retouche & lumière' : 'Color & Lighting Workshop'}</option>
                    <option value="exhibition">{lang === 'zh' ? '影展' : lang === 'fr' ? 'Exposition' : 'Exhibition'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '日期与时间' : lang === 'fr' ? 'Date & Heure' : 'Date & Time'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={evtDate}
                      onChange={(e) => setEvtDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none"
                    />
                    <input
                      type="text"
                      value={evtTime}
                      onChange={(e) => setEvtTime(e.target.value)}
                      placeholder="16:00 - 18:30"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '集合地点' : lang === 'fr' ? 'Lieu de rendez-vous' : 'Location (Meeting Point)'}
                  </label>
                  <input
                    type="text"
                    value={evtLocation}
                    onChange={(e) => setEvtLocation(e.target.value)}
                    placeholder="e.g. Ms Yelland's room / Kitsilano Beach"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '最大报名名额' : lang === 'fr' ? 'Places disponibles' : 'Max Registration Spots'}
                  </label>
                  <input
                    type="number"
                    value={evtSpots}
                    onChange={(e) => setEvtSpots(Number(e.target.value))}
                    min="5"
                    max="100"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                  {lang === 'zh' ? '活动详细介绍' : lang === 'fr' ? 'Description de l’activité' : 'Activity Description'}
                </label>
                <textarea
                  rows={2}
                  value={evtDesc}
                  onChange={(e) => setEvtDesc(e.target.value)}
                  placeholder="Outline the activities, shooting themes and techniques..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white font-mono font-semibold text-xs shadow-md shadow-blue-900/15 flex items-center space-x-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>
                    {lang === 'zh' ? '确认排期并发布活动' : lang === 'fr' ? 'Programmer et publier l’activité' : 'Schedule & Publish Activity'}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* 3. ANNOUNCEMENTS FORM */}
          {activeTab === 'notice' && (
            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '通知标题 (英文)' : lang === 'fr' ? 'Titre de l’annonce (EN)' : 'Notice Title (EN)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    placeholder="e.g. Sony A7IV Lending Policy Update"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                    {lang === 'zh' ? '通知标题 (中文)' : lang === 'fr' ? 'Titre de l’annonce (ZH)' : 'Notice Title (中文)'}
                  </label>
                  <input
                    type="text"
                    value={annTitleZh}
                    onChange={(e) => setAnnTitleZh(e.target.value)}
                    placeholder="例如：索尼无反相机借用更新"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                  {lang === 'zh' ? '通知正文内容' : lang === 'fr' ? 'Contenu de l’annonce' : 'Notice Details'} *
                </label>
                <textarea
                  rows={3}
                  required
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Details for club members..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-[#0047AB] focus:bg-white outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white font-mono font-semibold text-xs shadow-md shadow-blue-900/15 flex items-center space-x-1.5 cursor-pointer"
                >
                  <Megaphone className="w-4 h-4" />
                  <span>
                    {lang === 'zh' ? '发布公告通知' : lang === 'fr' ? 'Publier l’annonce' : 'Publish Announcement'}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* 4. BACKUP, IMPORT, RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {lang === 'zh' ? '导出社团数据库备份 (JSON)' : lang === 'fr' ? 'Exporter la base de données (JSON)' : 'Export Club Database (JSON)'}
                    </h4>
                    <p className="text-xs text-slate-500 font-light">
                      {lang === 'zh'
                        ? '将所有摄影作品、社团外拍活动、报名记录及互评数据下载至本地JSON备份。'
                        : lang === 'fr'
                        ? 'Téléchargez toutes les photos, activités et avis sous format JSON.'
                        : 'Download all photos, activities, RSVPs, and critiques into a local JSON archive file.'}
                    </p>
                  </div>

                  <button
                    onClick={exportDatabaseJSON}
                    className="px-4 py-2 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white font-mono text-xs flex items-center space-x-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>{lang === 'zh' ? '立即导出' : lang === 'fr' ? 'Exporter' : 'Export Backup'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  {lang === 'zh' ? '从JSON文件恢复数据' : lang === 'fr' ? 'Importer depuis un fichier JSON' : 'Import Database from JSON'}
                </h4>
                <textarea
                  rows={3}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste JSON archive string here..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-mono outline-none"
                />
                <button
                  onClick={handleImportJSON}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-mono text-xs flex items-center space-x-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>{lang === 'zh' ? '确认恢复' : lang === 'fr' ? 'Restaurer' : 'Restore Database'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-rose-900">
                      {lang === 'zh' ? '恢复初始精选社团档案' : lang === 'fr' ? 'Réinitialiser les données initiales' : 'Reset to Curated PGSS Seed Archive'}
                    </h4>
                    <p className="text-xs text-slate-500 font-light">
                      {lang === 'zh' 
                        ? '重置所有作品与活动数据至 Point Grey 摄影社初始精选范例。' 
                        : lang === 'fr' 
                        ? 'Rétablir les œuvres et activités d’exemple initiales.' 
                        : 'Revert all items back to standard initial demo showcases.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(lang === 'zh' ? '确定重置所有数据至初始状态？' : lang === 'fr' ? 'Réinitialiser toutes les données par défaut ?' : 'Reset all data to defaults?')) {
                        resetToCuratedData();
                        showNotification(lang === 'zh' ? '已重置为默认数据' : lang === 'fr' ? 'Données réinitialisées' : 'Reset to default data');
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs flex items-center space-x-1 cursor-pointer transition-colors shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{lang === 'zh' ? '重置默认' : lang === 'fr' ? 'Réinitialiser' : 'Reset Defaults'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
