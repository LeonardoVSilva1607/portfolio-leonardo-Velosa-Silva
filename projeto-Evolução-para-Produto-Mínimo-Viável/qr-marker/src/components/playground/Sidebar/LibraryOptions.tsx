import React, { useState } from 'react';
import { useQR } from '../../../context/QRContext';
import { useAuth } from '../../../context/AuthContext';
import { Save, Trash2, FolderOpen, Share2, Globe, Lock, Copy, Check, Zap, Edit2, ExternalLink } from 'lucide-react';

export const LibraryOptions: React.FC = () => {
  const { state, updateState } = useQR();
  const { user, designs, saveDesign, deleteDesign, toggleShare, toggleDynamic, updateTargetUrl } = useAuth();
  const [designName, setDesignName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingUrlId, setEditingUrlId] = useState<string | null>(null);
  const [newTargetUrl, setNewTargetUrl] = useState('');

  const handleSave = async () => {
    if (!designName.trim()) return;
    setIsSaving(true);
    try {
      await saveDesign(designName, state);
      setDesignName('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async (id: string, currentShared: boolean) => {
    try {
      await toggleShare(id, !currentShared);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleDynamic = async (id: string, currentDynamic: boolean, currentData: string) => {
    try {
      // When enabling dynamic, the current data becomes the target URL
      // and the QR data becomes the redirect URL
      const isEnabling = !currentDynamic;
      const targetUrl = currentData;
      await toggleDynamic(id, isEnabling, targetUrl);
      
      if (isEnabling) {
        // We also need to update the config.data in the document to point to the redirect URL
        // but toggleDynamic only updates the top-level fields.
        // Actually, it's better if the redirect logic handles it.
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUrl = async (id: string) => {
    if (!newTargetUrl.trim()) return;
    try {
      await updateTargetUrl(id, newTargetUrl);
      setEditingUrlId(null);
      setNewTargetUrl('');
    } catch (err) {
      console.error(err);
    }
  };

  const copyShareLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}?share=${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const loadDesign = (design: any) => {
    let config = { ...design.config };
    if (design.isDynamic) {
      // If dynamic, the QR should encode the redirect URL
      config.data = `${window.location.origin}/r/${design.id}`;
    }
    updateState(config);
  };

  if (!user) {
    return (
      <div className="p-4 bg-red-900/10 border border-red-500/20 text-center">
        <p className="text-[10px] text-red-500 uppercase font-black tracking-widest mb-2">Access Denied</p>
        <p className="text-[9px] text-gray-500 leading-relaxed">
          Please login to access your personal library and save your unique QR designs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Save Section */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">New Design Name</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. My Portfolio QR"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            className="flex-1 bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-red-500 transition-colors"
          />
          <button
            onClick={handleSave}
            disabled={isSaving || !designName.trim()}
            className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
          >
            <Save size={14} />
            Save
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Your Collection</label>
          <span className="text-[10px] font-mono text-gray-600">{designs.length} items</span>
        </div>
        
        {designs.length === 0 ? (
          <p className="text-[9px] text-gray-600 italic text-center py-4">Your library is currently empty.</p>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
            {designs.map((design) => (
              <div key={design.id} className="flex flex-col p-3 bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-[11px] font-bold text-white truncate">{design.name}</span>
                    {design.isDynamic && (
                      <span className="flex items-center gap-0.5 px-1 bg-red-600/20 text-red-500 text-[8px] font-black uppercase tracking-tighter border border-red-500/20">
                        <Zap size={8} />
                        Dynamic
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => loadDesign(design)}
                      className="p-1.5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all"
                      title="Load Design"
                    >
                      <FolderOpen size={14} />
                    </button>
                    <button
                      onClick={() => deleteDesign(design.id)}
                      className="p-1.5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all"
                      title="Delete Design"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Dynamic URL Editing */}
                {design.isDynamic && (
                  <div className="mb-3 p-2 bg-black/40 border border-white/5 rounded-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-bold uppercase text-gray-500">Destination URL</span>
                      {editingUrlId !== design.id ? (
                        <button 
                          onClick={() => {
                            setEditingUrlId(design.id);
                            setNewTargetUrl(design.targetUrl || '');
                          }}
                          className="text-[8px] text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <Edit2 size={8} /> Edit
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleUpdateUrl(design.id)}
                            className="text-[8px] text-green-500 hover:underline"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => setEditingUrlId(null)}
                            className="text-[8px] text-gray-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                    {editingUrlId === design.id ? (
                      <input 
                        type="text"
                        value={newTargetUrl}
                        onChange={(e) => setNewTargetUrl(e.target.value)}
                        className="w-full bg-black border border-white/10 p-1 text-[10px] text-white outline-none focus:border-blue-500"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-gray-300 truncate italic">{design.targetUrl}</span>
                        <a href={design.targetUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white">
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShare(design.id, !!design.isShared)}
                      className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                        design.isShared ? 'text-blue-400 hover:text-blue-300' : 'text-gray-600 hover:text-gray-400'
                      }`}
                    >
                      {design.isShared ? <Globe size={10} /> : <Lock size={10} />}
                      {design.isShared ? 'Public' : 'Private'}
                    </button>
                    
                    <button
                      onClick={() => handleToggleDynamic(design.id, !!design.isDynamic, design.config.data)}
                      className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                        design.isDynamic ? 'text-red-500 hover:text-red-400' : 'text-gray-600 hover:text-gray-400'
                      }`}
                      title={design.isDynamic ? "Disable Dynamic Redirect" : "Enable Dynamic Redirect (Edit URL after printing)"}
                    >
                      <Zap size={10} />
                      {design.isDynamic ? 'Dynamic ON' : 'EDIT'}
                    </button>
                  </div>
                  
                  {design.isShared && (
                    <button
                      onClick={() => copyShareLink(design.id)}
                      className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedId === design.id ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
                      {copiedId === design.id ? 'Copied!' : 'Link'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
