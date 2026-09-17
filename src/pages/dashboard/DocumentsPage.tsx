import React, { useState, useRef } from 'react';
import { FolderPlus, FileText, Download, Trash2, Eye, UploadCloud, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button, Card, Badge, Modal, EmptyState } from '@/components/ui';
import { formatDate } from '@/utils/formatDate';
import { formatFileSize } from '@/utils/formatCurrency';
import { mockDocuments } from '@/data/mockDocuments';
import { DOCUMENT_CATEGORIES } from '@/constants/categories';

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filteredDocs = activeCategory === 'all' 
    ? mockDocuments 
    : mockDocuments.filter(doc => doc.category === activeCategory);

  const handleUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadModalOpen(false);
          setUploadProgress(0);
          setSelectedFile(null);
        }, 500);
      }
    }, 150);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'uploaded': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-amber-100 text-amber-800';
      case 'needs_review': return 'bg-amber-100 text-amber-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f1740]">Document Vault</h1>
          <p className="text-[#64748b]">Organise your important documents for easy access and reuse.</p>
        </div>
        <Button onClick={() => setUploadModalOpen(true)} className="bg-[#1a2f8a] hover:bg-[#0f1740] shrink-0">
          <FolderPlus className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 shrink-0" />
          <p className="text-amber-800 text-sm">
            GovConnect stores your document references to help with applications. Ensure documents are accurate and up to date.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="lg:w-64 shrink-0 overflow-x-auto lg:overflow-visible">
          <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                "flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeCategory === 'all' ? "bg-[#1a2f8a] text-white" : "hover:bg-gray-100 text-gray-700"
              )}
            >
              <span>All Documents</span>
              <Badge variant={activeCategory === 'all' ? 'default' : 'secondary'} className={activeCategory === 'all' ? "bg-white/20 text-white hover:bg-white/30" : ""}>
                {mockDocuments.length}
              </Badge>
            </button>
            {DOCUMENT_CATEGORIES.map(cat => {
              const count = mockDocuments.filter(d => d.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeCategory === cat.id ? "bg-[#1a2f8a] text-white" : "hover:bg-gray-100 text-gray-700"
                  )}
                >
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <Badge variant={activeCategory === cat.id ? 'default' : 'secondary'} className={activeCategory === cat.id ? "bg-white/20 text-white hover:bg-white/30" : ""}>
                      {count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Document Grid */}
        <div className="flex-1">
          {filteredDocs.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-12 h-12 text-gray-300" />}
              title="No documents found"
              description="Upload your first document to get started."
              action={
                <Button onClick={() => setUploadModalOpen(true)} className="bg-[#1a2f8a]">
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDocs.map(doc => (
                <Card key={doc.id} className="p-4 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="w-6 h-6 text-[#1a2f8a]" />
                    </div>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-[#0f1740] mb-1 line-clamp-1" title={doc.name}>{doc.name}</h3>
                  <div className="text-sm text-[#64748b] mb-4 space-y-1">
                    <p>{doc.type.toUpperCase()} • {formatFileSize(doc.size)}</p>
                    <p>Uploaded on: {formatDate(doc.uploadDate)}</p>
                    {doc.expiryDate && (
                      <p className={cn("text-xs", new Date(doc.expiryDate) < new Date() ? "text-red-500 font-medium" : "")}>
                        Expiry: {formatDate(doc.expiryDate)}
                      </p>
                    )}
                  </div>
                  
                  {doc.usedIn && doc.usedIn.length > 0 && (
                    <div className="mt-auto mb-4">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                        Used in {doc.usedIn.length} application{doc.usedIn.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e2e8f0]">
                    <span className="text-xs text-gray-500">{doc.ocrStatus ? `OCR: ${doc.ocrStatus}` : 'OCR: Pending'}</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedDoc(doc); setPreviewModalOpen(true); }} className="p-1.5 text-gray-500 hover:text-[#1a2f8a] transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-[#1a2f8a] transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setSelectedDoc(doc); setDeleteModalOpen(true); }} className="p-1.5 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <Modal isOpen={uploadModalOpen} onClose={() => !isUploading && setUploadModalOpen(false)} title="Upload Document">
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setSelectedFile(e.dataTransfer.files[0]);
              }
            }}
          >
            <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} />
            <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-[#0f1740]">Drag and drop files here, or click to browse</p>
            <p className="text-xs text-gray-500 mt-1">Supported: PDF, JPG, PNG (max 10 MB)</p>
            {selectedFile && (
              <div className="mt-4 p-2 bg-blue-50 rounded flex justify-between items-center text-sm">
                <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                <button onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
              <input type="text" className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2f8a]" placeholder="e.g. Aadhaar Card" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2f8a]">
                  {DOCUMENT_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                <input type="date" className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2f8a]" />
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-[#1a2f8a] h-2.5 rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setUploadModalOpen(false)} disabled={isUploading}>Cancel</Button>
            <Button className="bg-[#1a2f8a]" onClick={handleUpload} disabled={isUploading || !selectedFile}>
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal isOpen={previewModalOpen} onClose={() => setPreviewModalOpen(false)} title="Document Preview" size="lg">
        {selectedDoc && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <div>
                <h3 className="font-semibold text-[#0f1740]">{selectedDoc.name}</h3>
                <p className="text-xs text-gray-500">Uploaded {formatDate(selectedDoc.uploadDate)}</p>
              </div>
              <Badge className={getStatusColor(selectedDoc.status)}>
                {selectedDoc.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="bg-gray-100 rounded-lg h-64 flex flex-col items-center justify-center border border-gray-200">
              <FileText className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Document preview available after processing</p>
            </div>
            
            {selectedDoc.status === 'verified' && selectedDoc.extractedData && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Extracted Information</h4>
                <div className="bg-white border rounded-md p-3 grid grid-cols-2 gap-y-2 gap-x-4">
                  {Object.entries(selectedDoc.extractedData).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <p className="text-sm font-medium">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setPreviewModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="space-y-4">
          <p className="text-gray-700">Are you sure you want to delete <span className="font-semibold">{selectedDoc?.name}</span>?</p>
          <p className="text-sm text-red-600 font-medium">This action cannot be undone.</p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => {
              setDeleteModalOpen(false);
              // In real app, call API
            }}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
