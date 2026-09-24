import React, { useState } from 'react';
import { MaterialVaultItem, MaterialOrder } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, CheckCircle, ShieldCheck, Download, Sparkles, Building2, 
  User, Mail, FileText, Lock, Copy, Check, ArrowRight, Package
} from 'lucide-react';

interface MaterialOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemsToCheckout: MaterialVaultItem[];
  onOrderCompleted?: (order: MaterialOrder) => void;
}

export const MaterialOrderModal: React.FC<MaterialOrderModalProps> = ({
  isOpen,
  onClose,
  itemsToCheckout,
  onOrderCompleted
}) => {
  const { currentUser, placeMaterialOrder } = useApp();
  const [usageType, setUsageType] = useState<'personal' | 'commercial'>('personal');
  const [applicantName, setApplicantName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [organization, setOrganization] = useState(currentUser.grade || '');
  const [projectDescription, setProjectDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<MaterialOrder | null>(null);
  const [copiedLicense, setCopiedLicense] = useState(false);
  const [downloadingItemId, setDownloadingItemId] = useState<string | null>(null);

  if (!isOpen || itemsToCheckout.length === 0) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeMaterialOrder({
        userName: applicantName.trim(),
        email: email.trim(),
        organizationOrTeam: organization.trim() || undefined,
        usageType: usageType,
        projectDescription: projectDescription.trim() || (usageType === 'commercial' ? 'Commercial Video Project' : 'Personal Study & Color Grading Practice'),
        items: itemsToCheckout
      });
      setIsSubmitting(false);
      setCompletedOrder(order);
      if (onOrderCompleted) onOrderCompleted(order);
    }, 600);
  };

  const handleCopyLicense = () => {
    if (!completedOrder) return;
    const certText = `[PGPC DIGITAL ASSET LICENSE CERTIFICATE]\nOrder ID: ${completedOrder.id}\nLicense Code: ${completedOrder.licenseCode}\nUsage Type: ${completedOrder.usageType === 'commercial' ? 'Commercial Use' : 'Personal Use'}\nGrantee: ${completedOrder.userName}\nIssuer: Point Grey Secondary Photography Club`;
    navigator.clipboard.writeText(certText);
    setCopiedLicense(true);
    setTimeout(() => setCopiedLicense(false), 2500);
  };

  const handleDownload = (item: MaterialVaultItem) => {
    setDownloadingItemId(item.id);
    setTimeout(() => {
      const element = document.createElement('a');
      const itemTitle = item.title;
      const fileContent = `=== POINT GREY SECONDARY PHOTOGRAPHY CLUB ===\nMATERIAL ASSET MASTER DOWNLOAD\nAsset: ${itemTitle}\nFormat: ${item.format}\nResolution: ${item.resolution || 'Original'}\nLicense: ${completedOrder?.licenseCode || 'FREE-GRANT'}\nDownloaded at: ${new Date().toISOString()}\n\n[Asset Binary Stream: Verified High Bitrate Master]`;
      const file = new Blob([fileContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_master.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingItemId(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {completedOrder 
                  ? '🎉 License Order Complete'
                  : 'Claim Free License · $0 Checkout'}
              </h3>
              <p className="text-xs text-zinc-400">
                {completedOrder 
                  ? 'Digital certificate granted. Download master files below.' 
                  : 'Free master downloads. Please select your usage type for compliance.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!completedOrder ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Items summary banner */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>
                    {`Selected Assets (${itemsToCheckout.length} items)`}
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    Total: $0.00 (Free Community Grant)
                  </span>
                </div>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {itemsToCheckout.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/60">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.thumbnailUrl ? (
                          <img src={item.thumbnailUrl} alt="" className="w-10 h-7 object-cover rounded flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-7 bg-zinc-800 rounded flex-shrink-0" />
                        )}
                        <div className="truncate">
                          <p className="font-semibold text-zinc-200 truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-zinc-400">{item.format} · {item.fileSize}</p>
                        </div>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
                        {item.resolution || item.format}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crucial Requirement: Select Commercial vs Personal Use */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-200 flex items-center justify-between">
                  <span>Usage Purpose (Required) *</span>
                  <span className="text-xs text-blue-400">100% Free for both Commercial & Personal</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Personal */}
                  <label 
                    onClick={() => setUsageType('personal')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      usageType === 'personal'
                        ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10'
                        : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${usageType === 'personal' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">Personal Use</p>
                          <p className="text-xs text-emerald-400 font-medium">Free Grant · $0</p>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="usageType" 
                        checked={usageType === 'personal'} 
                        onChange={() => setUsageType('personal')}
                        className="accent-blue-500 mt-1"
                      />
                    </div>
                    <ul className="mt-3 text-[11px] text-zinc-400 space-y-1">
                      <li>✓ Personal editing, color grading & practice</li>
                      <li>✓ School projects, non-profit events & portfolios</li>
                      <li>✓ Personal social media creative showcases</li>
                    </ul>
                  </label>

                  {/* Commercial */}
                  <label 
                    onClick={() => setUsageType('commercial')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      usageType === 'commercial'
                        ? 'bg-amber-950/30 border-amber-500 shadow-lg shadow-amber-500/10'
                        : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${usageType === 'commercial' ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">Commercial Use</p>
                          <p className="text-xs text-amber-400 font-medium">Authorized Free Grant · $0</p>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="usageType" 
                        checked={usageType === 'commercial'} 
                        onChange={() => setUsageType('commercial')}
                        className="accent-amber-500 mt-1"
                      />
                    </div>
                    <ul className="mt-3 text-[11px] text-zinc-400 space-y-1">
                      <li>✓ Commercial promos, brand sponsor reels & ads</li>
                      <li>✓ Full platform commercial distribution</li>
                      <li>✓ Verifiable digital commercial certificate</li>
                    </ul>
                  </label>
                </div>
              </div>

              {/* Applicant Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Applicant Name / Creator Alias *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Alex Chen / PG Media"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@vsb.bc.ca"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Project & Platform Details (Optional)
                </label>
                <input
                  type="text"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="e.g. YouTube sports montage, short film reel"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Price & Guarantee footer */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <div className="text-left">
                  <span className="text-xs text-zinc-400">Total: </span>
                  <span className="text-lg font-bold text-emerald-400 ml-1">$0.00</span>
                  <span className="text-xs text-zinc-500 ml-2">Free Community License</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Generating Certificate...</span>
                  ) : (
                    <>
                      <span>Confirm & Download Masters</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Order Success View */
            <div className="space-y-6 animate-fadeIn">
              {/* License Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-emerald-500/30 shadow-xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        Point Grey Secondary Photography Club
                      </h4>
                      <p className="text-xs text-emerald-400 font-semibold tracking-wide">
                        OFFICIAL DIGITAL ASSET LICENSE CERTIFICATE
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                    VALID · PERPETUAL
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Order ID</span>
                    <span className="font-mono text-zinc-200 font-semibold">{completedOrder.id}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Usage Type</span>
                    <span className={`font-semibold ${completedOrder.usageType === 'commercial' ? 'text-amber-400' : 'text-blue-400'}`}>
                      {completedOrder.usageType === 'commercial' 
                        ? 'Commercial' 
                        : 'Personal'}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Grantee</span>
                    <span className="text-zinc-200 font-semibold truncate block">{completedOrder.userName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Total Amount</span>
                    <span className="text-emerald-400 font-bold">$0.00 (Free)</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs bg-zinc-950/70 p-3 rounded-xl">
                  <div className="truncate pr-2">
                    <span className="text-zinc-500">License Code: </span>
                    <span className="font-mono text-blue-400 font-semibold">{completedOrder.licenseCode}</span>
                  </div>
                  <button
                    onClick={handleCopyLicense}
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    {copiedLicense ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLicense ? 'Copied' : 'Copy Certificate'}</span>
                  </button>
                </div>
              </div>

              {/* Direct Master Downloads */}
              <div className="space-y-3">
                <h5 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Master Files Download</span>
                </h5>
                <div className="space-y-2">
                  {completedOrder.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.thumbnailUrl ? (
                          <img src={item.thumbnailUrl} alt="" className="w-12 h-9 object-cover rounded-lg flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-9 bg-zinc-800 rounded-lg flex-shrink-0" />
                        )}
                        <div className="truncate">
                          <p className="text-sm font-semibold text-zinc-100 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {item.format} · {item.resolution || 'Pro Master'} · {item.fileSize}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(item)}
                        disabled={downloadingItemId === item.id}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all flex-shrink-0 cursor-pointer"
                      >
                        {downloadingItemId === item.id ? (
                          <span>Preparing...</span>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Master</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close / Return */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors cursor-pointer"
                >
                  Complete & Return
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
