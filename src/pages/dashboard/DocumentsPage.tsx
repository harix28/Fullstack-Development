import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderPlus, FileText, Download, Trash2, Eye, UploadCloud, 
  AlertCircle, Star, Search, ArrowUpDown, CheckCircle2, 
  ShieldCheck, Clock, ExternalLink 
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button, Card, Badge, Modal, EmptyState } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { formatDate } from '@/utils/formatDate';
import { formatFileSize } from '@/utils/formatCurrency';
import { mockDocuments } from '@/data/mockDocuments';
import { DOCUMENT_CATEGORIES } from '@/constants/categories';
import type { UserDocument } from '@/types';

const STORAGE_KEY = 'govconnect_documents';

export default function DocumentsPage() {
  const { showToast } = useToast();

  const [documents, setDocuments] = useState<UserDocument[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : mockDocuments;
    } catch {
      return mockDocuments;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [onlyStarred, setOnlyStarred] = useState(false);

  // Modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<UserDocument | null>(null);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('identity');
  const [uploadExpiry, setUploadExpiry] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  const filteredDocs = documents.filter(doc => {
    const matchesCat = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStar = !onlyStarred || (doc as any).isStarred;
    return matchesCat && matchesSearch && matchesStar;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'size') return ((b.fileSize || 0) - (a.fileSize || 0));
    return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
  });

  const handleUploadSubmit = () => {
    if (!uploadName.trim() && !selectedFile) return;

    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newDoc: UserDocument = {
            id: `doc_${Date.now()}`,
            userId: 'user_001',
            name: uploadName.trim() || selectedFile?.name || 'Uploaded Document',
            category: uploadCategory as any,
            type: selectedFile?.name.endsWith('.png') || selectedFile?.name.endsWith('.jpg') ? 'jpg' : 'pdf',
            fileSize: selectedFile?.size || 1450000,
            fileUrl: '#',
            uploadDate: new Date().toISOString(),
            expiryDate: uploadExpiry || undefined,
            status: 'verified',
            ocrStatus: 'completed',
            isVerified: true,
            extractedData: {
              documentType: uploadCategory.toUpperCase(),
              issuingAuthority: 'Government of India',
              verificationHash: `SHA256-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
            },
            usedIn: []
          };

          setDocuments(prev => [newDoc, ...prev]);
          setIsUploading(false);
          setUploadModalOpen(false);
          setUploadProgress(0);
          setSelectedFile(null);
          setUploadName('');
          setUploadExpiry('');

          showToast({
            title: 'Document Uploaded',
            description: `"${newDoc.name}" has been stored in your digital vault.`,
            variant: 'success'
          });
        }, 400);
      }
    }, 100);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDoc) return;
    setDocuments(prev => prev.filter(d => d.id !== selectedDoc.id));
    setDeleteModalOpen(false);
    showToast({
      title: 'Document Deleted',
      description: `"${selectedDoc.name}" was removed from your vault.`,
      variant: 'info'
    });
    setSelectedDoc(null);
  };

  const toggleStar = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        const nowStarred = !(d as any).isStarred;
        showToast({
          title: nowStarred ? 'Starred' : 'Unstarred',
          description: nowStarred ? `Added to favorites.` : `Removed from favorites.`,
          variant: 'info'
        });
        return { ...d, isStarred: nowStarred };
      }
      return d;
    }));
  };

  const handleMockDownload = (doc: UserDocument) => {
    showToast({
      title: 'Download Started',
      description: `Downloading ${doc.name} (${formatFileSize(doc.fileSize || 1024000)})...`,
      variant: 'success'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300';
      case 'uploaded': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300';
      case 'processing': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0f1740] dark:text-white">
            Digital Document Vault
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Organise, verify, and reuse your citizen credentials across government scheme and job applications.
          </p>
        </div>

        <Button 
          onClick={() => setUploadModalOpen(true)} 
          className="bg-[#1a2f8a] hover:bg-[#0f1740] text-white shrink-0 gap-2 shadow"
        >
          <FolderPlus className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Privacy Guarantee Alert (Prompt Section 17 & 51) */}
      <div className="bg-blue-50 dark:bg-blue-950/40 border-l-4 border-[#1a2f8a] p-4 rounded-r-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#1a2f8a] dark:text-blue-400 mt-0.5 shrink-0" />
        <div className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
          <strong>Privacy-First Local Storage:</strong> Files are stored locally in this demo prototype. No sensitive government documents are uploaded to external servers. Verification checksums simulate automated DigiLocker authentication.
        </div>
      </div>

      {/* Search & Sort Tool Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search documents by name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1a2f8a]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
          <button
            onClick={() => setOnlyStarred(!onlyStarred)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              onlyStarred 
                ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold' 
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Star className="w-3.5 h-3.5" fill={onlyStarred ? "currentColor" : "none"} />
            Starred Only
          </button>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Categories Sidebar + Documents Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Categories Sidebar */}
        <div className="lg:w-64 shrink-0 overflow-x-auto lg:overflow-visible">
          <div className="flex lg:flex-col gap-1.5 min-w-max lg:min-w-0 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors",
                activeCategory === 'all' 
                  ? "bg-[#1a2f8a] text-white shadow-sm" 
                  : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              )}
            >
              <span>All Documents</span>
              <Badge variant={activeCategory === 'all' ? 'default' : 'secondary'} className={activeCategory === 'all' ? "bg-white/20 text-white" : ""}>
                {documents.length}
              </Badge>
            </button>

            {DOCUMENT_CATEGORIES.map(cat => {
              const count = documents.filter(d => d.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors",
                    isActive 
                      ? "bg-[#1a2f8a] text-white shadow-sm" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <span>{cat.label}</span>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Documents Grid (Prompt Section 16 & 17) */}
        <div className="flex-1">
          {filteredDocs.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-12 h-12 text-slate-300" />}
              title="No documents in this category"
              description="Upload your document or adjust filters to view items in your vault."
              action={
                <Button onClick={() => setUploadModalOpen(true)} className="bg-[#1a2f8a]">
                  <UploadCloud className="w-4 h-4 mr-2" /> Upload Document
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDocs.map(doc => {
                const isStarred = (doc as any).isStarred;
                return (
                  <Card key={doc.id} className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-[#1a2f8a] dark:text-blue-300">
                          <FileText className="w-6 h-6" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => toggleStar(doc.id, e)}
                            className={`p-1 transition-colors ${isStarred ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'}`}
                            title={isStarred ? "Starred" : "Star document"}
                          >
                            <Star className="w-4 h-4" fill={isStarred ? "currentColor" : "none"} />
                          </button>
                          <Badge className={cn("text-[10px] font-bold uppercase", getStatusColor(doc.status))}>
                            {doc.status}
                          </Badge>
                        </div>
                      </div>

                      <h3 className="font-bold text-[#0f1740] dark:text-white text-sm mb-1 line-clamp-1" title={doc.name}>
                        {doc.name}
                      </h3>

                      <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 mb-3">
                        <p>{doc.type.toUpperCase()} • {formatFileSize(doc.fileSize || 1200000)}</p>
                        <p className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Uploaded: {formatDate(doc.uploadDate)}
                        </p>
                        {doc.expiryDate && (
                          <p className="text-amber-600 font-medium">
                            Expires: {formatDate(doc.expiryDate)}
                          </p>
                        )}
                      </div>

                      {doc.usedIn && doc.usedIn.length > 0 && (
                        <div className="mb-3">
                          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                            Linked in {doc.usedIn.length} application{doc.usedIn.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> OCR Ready
                      </span>

                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => { setSelectedDoc(doc); setPreviewModalOpen(true); }}
                          className="p-1.5 text-slate-500 hover:text-[#1a2f8a] hover:bg-slate-100 rounded"
                          title="Preview Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleMockDownload(doc)}
                          className="p-1.5 text-slate-500 hover:text-[#1a2f8a] hover:bg-slate-100 rounded"
                          title="Download Copy"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { setSelectedDoc(doc); setDeleteModalOpen(true); }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── UPLOAD MODAL (Prompt Section 17) ── */}
      <Modal isOpen={uploadModalOpen} onClose={() => !isUploading && setUploadModalOpen(false)} title="Upload Document to Vault">
        <div className="space-y-4 font-sans text-sm">
          <div 
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const f = e.dataTransfer.files[0];
                setSelectedFile(f);
                if (!uploadName) setUploadName(f.name.replace(/\.[^/.]+$/, ''));
              }
            }}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const f = e.target.files[0];
                  setSelectedFile(f);
                  if (!uploadName) setUploadName(f.name.replace(/\.[^/.]+$/, ''));
                }
              }} 
            />
            <UploadCloud className="w-10 h-10 text-[#1a2f8a] mx-auto mb-2" />
            <p className="font-semibold text-[#0f1740] dark:text-white">
              Drag & Drop file here, or click to browse
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supported: PDF, JPG, PNG (Max 10 MB). Stored locally in demo.
            </p>

            {selectedFile && (
              <div className="mt-3 p-2 bg-blue-50 dark:bg-slate-700 rounded-lg flex items-center justify-between text-xs">
                <span className="font-medium text-[#1a2f8a] dark:text-blue-300 truncate max-w-[200px]">
                  {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </span>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Document Title *
              </label>
              <input
                type="text"
                value={uploadName}
                onChange={e => setUploadName(e.target.value)}
                placeholder="e.g. Caste Certificate / Degree Marksheet"
                className="w-full px-3 py-2 border rounded-lg text-xs dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1a2f8a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={e => setUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1a2f8a]"
                >
                  {DOCUMENT_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={uploadExpiry}
                  onChange={e => setUploadExpiry(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1a2f8a]"
                />
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Simulating OCR extraction & encryption...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-[#1a2f8a] h-2 rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3 border-t">
            <Button variant="outline" size="sm" onClick={() => setUploadModalOpen(false)} disabled={isUploading}>
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="bg-[#1a2f8a] hover:bg-[#0f1740] text-white" 
              onClick={handleUploadSubmit} 
              disabled={isUploading || (!uploadName.trim() && !selectedFile)}
            >
              {isUploading ? 'Encrypting & Saving...' : 'Save to Vault'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* ── PREVIEW MODAL (Prompt Section 18) ── */}
      <Modal isOpen={previewModalOpen} onClose={() => setPreviewModalOpen(false)} title="Document Preview & OCR Data" size="lg">
        {selectedDoc && (
          <div className="space-y-4 font-sans">
            <div className="flex justify-between items-center pb-2 border-b">
              <div>
                <h3 className="font-bold text-[#0f1740] dark:text-white text-base">{selectedDoc.name}</h3>
                <p className="text-xs text-slate-400">Category: {selectedDoc.category.toUpperCase()} • Uploaded: {formatDate(selectedDoc.uploadDate)}</p>
              </div>
              <Badge className={getStatusColor(selectedDoc.status)}>
                {selectedDoc.status.toUpperCase()}
              </Badge>
            </div>

            {/* Document Graphic Placeholder */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center space-y-2">
              <FileText className="w-12 h-12 text-[#1a2f8a]" />
              <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{selectedDoc.name}</p>
              <p className="text-xs text-slate-500">
                Official Document Checksum: <span className="font-mono text-slate-700 dark:text-slate-300">SHA256-VLT-{selectedDoc.id.toUpperCase()}</span>
              </p>
            </div>

            {/* Extracted OCR Information */}
            {selectedDoc.extractedData && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  OCR Extracted Credential Fields:
                </h4>
                <div className="bg-slate-50 dark:bg-slate-900 border rounded-xl p-3.5 grid grid-cols-2 gap-3 text-xs">
                  {Object.entries(selectedDoc.extractedData).map(([k, val]) => (
                    <div key={k}>
                      <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{String(val)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleMockDownload(selectedDoc)}
                className="gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Copy
              </Button>
              <Button size="sm" onClick={() => setPreviewModalOpen(false)}>
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── DELETE MODAL ── */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Document">
        <div className="space-y-4 text-sm font-sans">
          <p className="text-slate-700 dark:text-slate-300">
            Are you sure you want to remove <strong className="text-red-600">{selectedDoc?.name}</strong> from your document vault?
          </p>
          <p className="text-xs text-slate-500">
            Any linked scheme draft that relies on this document will need a re-upload.
          </p>
          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" size="sm" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteConfirm}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
