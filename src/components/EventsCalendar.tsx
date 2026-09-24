import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ClubEvent, EventCategory } from '../types';
import { 
  Calendar, Clock, MapPin, CheckCircle2, ChevronDown, 
  ChevronUp, AlertCircle, Sparkles, Ticket, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const EventsCalendar: React.FC = () => {
  const { lang, events, rsvpEvent } = useApp();

  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(events[0]?.id || null);
  const [rsvpModalEvent, setRsvpModalEvent] = useState<ClubEvent | null>(null);
  const [studentName, setStudentName] = useState('');
  const [rsvpSuccessTicket, setRsvpSuccessTicket] = useState<{ event: ClubEvent; name: string } | null>(null);

  // Countdown timer for the next upcoming event
  const nextEvent = events.find(e => e.status === 'upcoming') || events[0];
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!nextEvent) return;

    const calculateTime = () => {
      const eventDate = new Date(`${nextEvent.date}T${nextEvent.time.split(' - ')[0] || '16:00'}:00`).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [nextEvent]);

  const categories: { id: EventCategory | 'all'; labelEn: string; labelZh: string; labelFr: string }[] = [
    { id: 'all', labelEn: 'All Schedules', labelZh: '全部活动', labelFr: 'Tous les événements' },
    { id: 'darkroom', labelEn: 'Analog Darkroom', labelZh: '传统暗房', labelFr: 'Labo Argentique' },
    { id: 'workshop', labelEn: 'Tech Workshops', labelZh: '技能工作坊', labelFr: 'Ateliers Techniques' },
  ];

  const filteredEvents = events.filter(e => {
    if (activeCategory !== 'all' && e.category !== activeCategory) return false;
    return true;
  });

  const handleConfirmRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpModalEvent || !studentName.trim()) return;
    const ok = rsvpEvent(rsvpModalEvent.id, studentName.trim());
    if (ok) {
      setRsvpSuccessTicket({ event: rsvpModalEvent, name: studentName.trim() });
      setRsvpModalEvent(null);
      setStudentName('');
    }
  };

  const getEventTitle = (evt: ClubEvent) => {
    if (lang === 'zh') return evt.titleZh || evt.title;
    if (lang === 'fr') return evt.titleFr || evt.title;
    return evt.title;
  };

  const getEventDesc = (evt: ClubEvent) => {
    if (lang === 'zh') return evt.descriptionZh || evt.description;
    if (lang === 'fr') return evt.descriptionFr || evt.description;
    return evt.description;
  };

  const getEventLocation = (evt: ClubEvent) => {
    if (lang === 'zh') return evt.locationZh || evt.location;
    if (lang === 'fr') return evt.locationFr || evt.location;
    return evt.location;
  };

  const getEventRequirements = (evt: ClubEvent) => {
    if (lang === 'zh') return evt.requirementsZh || evt.requirements;
    if (lang === 'fr') return evt.requirementsFr || evt.requirements;
    return evt.requirements;
  };

  const getEventAgendaActivity = (item: { time: string; activity: string; activityZh?: string; activityFr?: string }) => {
    if (lang === 'zh') return item.activityZh || item.activity;
    if (lang === 'fr') return item.activityFr || item.activity;
    return item.activity;
  };

  return (
    <section id="events" className="py-16 sm:py-24 relative bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Planning Status Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          
          <div className="lg:col-span-7">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-700 mb-2 font-semibold">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'fr' ? 'CALENDRIER SCOLAIRE // EN PLANIFICATION' : lang === 'zh' ? '社团日程 // 筹备报备中' : 'TERM CALENDAR // IN PLANNING'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {lang === 'zh' ? '定期社团活动与工作坊' : lang === 'fr' ? 'Activités du Club & Ateliers' : 'Club Activities & Workshops'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-bold">
                {lang === 'zh' ? '敬请期待' : lang === 'fr' ? 'Bientôt' : 'Coming Soon'}
              </span>
            </div>
            <p className="text-slate-600 text-sm mt-2 max-w-xl font-light">
              {lang === 'zh'
                ? '新学期常规活动、Ms Yelland\'s room 暗房教室传统胶片实验、校际体育联赛现场拍摄及后期调色工作坊正在统筹排期与场地报备中。预约通道暂未开放，详细排期表敬请期待！'
                : lang === 'fr'
                ? 'Les ateliers de chimie argentique en salle Ms Yelland et les masterclasses sont en cours de planification. Les réservations ouvriront très prochainement.'
                : 'Darkroom chemistry sessions in Ms Yelland\'s room, sports matchday photowalks, and post-production workshops are being planned. Registrations will open soon!'}
            </p>
          </div>

          {/* Status & Regular Meetings Notice */}
          <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-xs">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-800 font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
              <span>{lang === 'zh' ? '排期报备状态 · 敬请期待' : 'SCHEDULE IN PLANNING · COMING SOON'}</span>
            </div>
            <div className="text-xs text-slate-700 leading-relaxed space-y-1 font-sans">
              <p>
                <strong className="text-slate-900 font-semibold">{lang === 'zh' ? '常规集会：' : 'Weekly Meetings: '}</strong>
                {lang === 'zh' ? '每周三午餐时间 11:35-12:15pm' : 'Every Wednesday at Lunch 11:35-12:15pm'}
              </p>
              <p>
                <strong className="text-slate-900 font-semibold">{lang === 'zh' ? '活动地点：' : 'Location: '}</strong>
                {lang === 'zh' ? "Ms Yelland's room" : "Ms Yelland's room"}
              </p>
              <p className="text-[11px] text-amber-800/90 pt-1 border-t border-amber-200/60 font-mono">
                {lang === 'zh' ? '※ 正式席位预约通道近期上线，欢迎午餐时间现场了解！' : '※ RSVP portal will open soon. Welcome to drop in during lunch!'}
              </p>
            </div>
          </div>

        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const label = lang === 'zh' ? cat.labelZh : lang === 'fr' ? cat.labelFr : cat.labelEn;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0047AB] text-white font-bold shadow-md shadow-blue-900/10 border border-blue-600'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-blue-50/80 border border-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((evt) => {
            const isExpanded = expandedEventId === evt.id;
            const percentFilled = Math.min(100, Math.round((evt.spotsRegistered / evt.spotsTotal) * 100));
            const isFull = evt.spotsRegistered >= evt.spotsTotal;
            const eventLocale = lang === 'zh' ? 'zh-CN' : lang === 'fr' ? 'fr-FR' : 'en-US';

            return (
              <motion.div
                key={evt.id}
                layout
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-blue-300 shadow-md shadow-blue-900/5'
                    : 'bg-white border-blue-100/80 hover:border-blue-200 shadow-sm'
                }`}
              >
                {/* Event Summary Banner */}
                <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Date Badge & Category */}
                  <div className="lg:col-span-3 flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-blue-50/80 border border-blue-100 flex flex-col items-center justify-center font-mono shadow-xs">
                      <span className="text-[10px] text-[#0047AB] uppercase font-bold">
                        {new Date(evt.date + 'T00:00:00').toLocaleDateString(eventLocale, { month: 'short' })}
                      </span>
                      <span className="text-xl font-bold text-slate-900 leading-none mt-0.5">
                        {evt.date.split('-')[2]}
                      </span>
                      <span className="text-[9px] text-slate-500">
                        {new Date(evt.date + 'T00:00:00').toLocaleDateString(eventLocale, { weekday: 'short' })}
                      </span>
                    </div>

                    <div>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0047AB] font-mono text-[10px] border border-blue-200 uppercase font-semibold">
                        {evt.category}
                      </span>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#0047AB] shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Title & Location */}
                  <div className="lg:col-span-5 space-y-1">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      {getEventTitle(evt)}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-light">
                      <MapPin className="w-3.5 h-3.5 text-[#0047AB] shrink-0" />
                      <span>{getEventLocation(evt)}</span>
                    </div>
                  </div>

                  {/* Right: Capacity & Actions */}
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3">
                    
                    {/* Capacity Indicator */}
                    <div className="w-full sm:w-auto text-right">
                      <span className="inline-flex items-center space-x-1.5 text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80">
                        <Lock className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{lang === 'zh' ? '暂未开放预约 · 敬请期待' : lang === 'fr' ? 'Fermé · Bientôt' : 'RSVP Closed · Coming Soon'}</span>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => setExpandedEventId(isExpanded ? null : evt.id)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <span>
                          {isExpanded 
                            ? (lang === 'zh' ? '收起' : lang === 'fr' ? 'Masquer' : 'Hide Details') 
                            : (lang === 'zh' ? '活动内容' : lang === 'fr' ? 'Détails' : 'View Outline')}
                        </span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <div className="px-3.5 py-2 rounded-xl text-xs font-semibold font-mono flex items-center space-x-1.5 bg-slate-100 border border-slate-200 text-slate-400 select-none cursor-not-allowed">
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{lang === 'zh' ? '敬请期待' : lang === 'fr' ? 'Bientôt' : 'Coming Soon'}</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Expanded Detailed Agenda & Gear Checklist */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-100 bg-slate-50/70 p-5 sm:p-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* Event Description & Instructor */}
                        <div className="md:col-span-6 space-y-4">
                          <div>
                            <h4 className="text-xs font-mono text-[#0047AB] mb-1 font-semibold">
                              {lang === 'zh' ? '活动简要说明' : lang === 'fr' ? 'APERÇU DE L’ACTIVITÉ' : 'ACTIVITY OVERVIEW'}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                              {getEventDesc(evt)}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center space-x-3 shadow-xs">
                            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0047AB] font-bold text-xs">
                              PG
                            </div>
                            <div className="text-xs">
                              <div className="text-slate-400 text-[10px]">
                                {lang === 'zh' ? '带队讲师/负责人' : lang === 'fr' ? 'RESPONSABLE / INSTRUCTEUR' : 'LEAD INSTRUCTOR'}
                              </div>
                              <strong className="text-slate-900">{evt.instructor}</strong>
                              <span className="text-slate-500 ml-1">({evt.instructorRole})</span>
                            </div>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h4 className="text-xs font-mono text-[#0047AB] mb-1.5 flex items-center space-x-1 font-semibold">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>
                                {lang === 'zh' ? '携带器材与注意事项' : lang === 'fr' ? 'MATÉRIEL & SÉCURITÉ' : 'GEAR & SAFETY REQUIREMENTS'}
                              </span>
                            </h4>
                            <ul className="space-y-1.5 text-xs text-slate-600 font-light">
                              {getEventRequirements(evt).map((req, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0047AB] shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Detailed Timeline Agenda */}
                        <div className="md:col-span-6 space-y-3">
                          <h4 className="text-xs font-mono text-[#0047AB] mb-2 font-semibold">
                            {lang === 'zh' ? '详细行程时间表' : lang === 'fr' ? 'DÉROULEMENT / PLANNING' : 'EXPEDITION TIMELINE AGENDA'}
                          </h4>
                          
                          <div className="relative pl-4 border-l-2 border-blue-200 space-y-4 font-mono text-xs">
                            {evt.agenda.map((item, idx) => (
                              <div key={idx} className="relative">
                                <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#0047AB] border-2 border-white" />
                                <div className="text-[#0047AB] font-semibold">{item.time}</div>
                                <div className="text-slate-700 text-xs font-sans mt-0.5">
                                  {getEventAgendaActivity(item)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* RSVP Modal */}
      {rsvpModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white border border-blue-100 rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-[#0047AB] font-mono text-xs font-semibold">
                <Ticket className="w-4 h-4" />
                <span>EXPEDITION RSVP // PASS</span>
              </div>
              <button
                onClick={() => setRsvpModalEvent(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {getEventTitle(rsvpModalEvent)}
              </h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#0047AB]" />
                <span>{rsvpModalEvent.date} @ {rsvpModalEvent.time}</span>
              </p>
            </div>

            <form onSubmit={handleConfirmRsvp} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1 font-medium">
                  {lang === 'zh' ? '学生姓名 / 学号' : lang === 'fr' ? 'Nom complet / N° d’élève' : 'Student Full Name / Student ID'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'zh' ? '例如：王同学 (11年级)' : lang === 'fr' ? 'ex. Alex Wong (11e)' : 'e.g. Alex Wong (Gr 11)'}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:border-[#0047AB] focus:ring-1 focus:ring-[#0047AB] outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-slate-700 space-y-1">
                <div className="text-[#0047AB] font-mono font-semibold">
                  {lang === 'zh' ? 'Point Grey 中学摄影社须知' : lang === 'fr' ? 'AVIS CLUB PHOTO POINT GREY' : 'POINT GREY PHOTO CLUB NOTICE'}
                </div>
                <div>
                  {lang === 'zh'
                    ? '预约确认票将即时生成。外拍活动请提前10分钟佩戴学生卡准时到达集合地点。'
                    : lang === 'fr'
                    ? 'Le billet de confirmation sera généré instantanément. Veuillez vous présenter 10 minutes à l’avance avec votre matériel.'
                    : 'Confirmation ticket will be generated instantly. Please arrive 10 minutes early with your camera kit.'}
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRsvpModalEvent(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  {lang === 'zh' ? '取消' : lang === 'fr' ? 'Annuler' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white text-xs font-mono font-semibold transition-colors shadow-md shadow-blue-900/15 cursor-pointer"
                >
                  {lang === 'zh' ? '确认报名登记' : lang === 'fr' ? 'Confirmer l’inscription' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Success Boarding Pass Ticket Modal */}
      {rsvpSuccessTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white border border-blue-200 rounded-2xl p-6 shadow-2xl space-y-5 text-center relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-[#0047AB] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#0047AB] font-mono text-[10px] border border-blue-200 font-semibold">
                POINT GREY PHOTO CLUB // ACCESS PASS
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-2">
                {lang === 'zh' ? '报名成功！' : lang === 'fr' ? 'Inscription confirmée !' : 'RSVP Confirmed!'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'zh' ? '您已成功锁定本次社团活动席位。' : lang === 'fr' ? 'Votre place est bien réservée pour cette activité.' : 'You are successfully registered for this activity.'}
              </p>
            </div>

            {/* Virtual Ticket Stub */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">{lang === 'fr' ? 'PARTICIPANT :' : 'ATTENDEE:'}</span>
                <strong className="text-slate-900">{rsvpSuccessTicket.name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">{lang === 'fr' ? 'ÉVÉNEMENT :' : 'EVENT:'}</span>
                <span className="text-[#0047AB] font-semibold truncate max-w-[200px]">
                  {getEventTitle(rsvpSuccessTicket.event)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'fr' ? 'DATE & HEURE :' : 'DATE & TIME:'}</span>
                <span className="text-slate-800">{rsvpSuccessTicket.event.date} ({rsvpSuccessTicket.event.time})</span>
              </div>
            </div>

            <button
              onClick={() => setRsvpSuccessTicket(null)}
              className="w-full py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white font-mono text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              {lang === 'zh' ? '完成并关闭凭证' : lang === 'fr' ? 'Terminer et fermer' : 'Done & Close Ticket'}
            </button>
          </motion.div>
        </div>
      )}

    </section>
  );
};
