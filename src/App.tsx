import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AnnouncementsTicker } from './components/AnnouncementsTicker';
import { HeroSection } from './components/HeroSection';
import { ConferencePortal } from './components/ConferencePortal';
import { NewsSection } from './components/NewsSection';
import { GalleryShowcase } from './components/GalleryShowcase';
import { MaterialVault } from './components/MaterialVault';
import { Footer } from './components/Footer';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { CuratorStudioModal } from './components/CuratorStudioModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { BrandKitModal } from './components/BrandKitModal';
import { MaterialOrderModal } from './components/MaterialOrderModal';

function MainLayout() {
  const { activeMaterialForCheckout, setActiveMaterialForCheckout } = useApp();
  const [isCuratorOpen, setIsCuratorOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);
  const [studentPortalTab, setStudentPortalTab] = useState<'profile' | 'submit' | 'my-submissions' | 'admin-review'>('profile');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStudentPortal = (tab: 'profile' | 'submit' | 'my-submissions' | 'admin-review' = 'profile') => {
    setStudentPortalTab(tab);
    setIsStudentPortalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFDFE] text-[#1A202C] flex flex-col selection:bg-[#0047AB] selection:text-white relative">
      {/* Editorial Decorative Background Grid */}
      <div className="fixed inset-0 bg-editorial-dots opacity-40 pointer-events-none z-0" />

      {/* Fixed High-Tech Viewfinder Top Navbar */}
      <Navbar 
        onOpenCurator={() => setIsCuratorOpen(true)} 
        onOpenStudentPortal={handleOpenStudentPortal}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        {/* Hero Section with Live Optical Viewfinder Telemetry */}
        <HeroSection
          onExploreGallery={() => scrollToSection('gallery')}
          onOpenCurator={() => setIsCuratorOpen(true)}
          onOpenBrandKit={() => setIsBrandKitOpen(true)}
        />

        {/* Real-time Announcements Bulletin Ticker */}
        <AnnouncementsTicker />

        {/* Student Showcase Gallery with EXIF inspector & filters */}
        <GalleryShowcase onOpenStudentPortal={handleOpenStudentPortal} />

        {/* Material Vault (Production Assets & Media Masters) */}
        <MaterialVault />

        {/* Auxiliary Campus Events & Matchday Press Column */}
        <NewsSection />

        {/* PGPC Photography Conference & Annual Summit Portal */}
        <ConferencePortal
          onOpenStudentPortal={handleOpenStudentPortal}
        />
      </main>

      {/* Footer with school info, meeting location & times notice, & copyright */}
      <Footer onOpenBrandKit={() => setIsBrandKitOpen(true)} />

      {/* Fullscreen High-Tech Photo Lightbox Modal */}
      <PhotoLightboxModal />

      {/* Official Brand Identity & Logo Kit Modal (Point Grey Hounds & Camera Optics) */}
      <BrandKitModal
        isOpen={isBrandKitOpen}
        onClose={() => setIsBrandKitOpen(false)}
      />

      {/* Student Portal & Submission Modal */}
      <StudentPortalModal
        isOpen={isStudentPortalOpen}
        initialTab={studentPortalTab}
        onClose={() => setIsStudentPortalOpen(false)}
      />

      {/* Curator Studio: Allows updating photos, events, notices anytime (随时更新) */}
      <CuratorStudioModal
        isOpen={isCuratorOpen}
        onClose={() => setIsCuratorOpen(false)}
        onOpenStudentPortal={() => handleOpenStudentPortal('submit')}
      />

      {/* Global Material Single Checkout Modal */}
      {activeMaterialForCheckout && (
        <MaterialOrderModal
          isOpen={true}
          onClose={() => setActiveMaterialForCheckout(null)}
          itemsToCheckout={[activeMaterialForCheckout]}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
