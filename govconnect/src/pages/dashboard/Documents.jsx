import React from 'react';
import { UploadCloud, FileText, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../store/useStore';

export default function Documents() {
  const documents = useStore(state => state.documents);
  const uploadDocument = useStore(state => state.uploadDocument);

  const handleUpload = () => {
    const fileNames = ['PAN Card', 'Income Certificate', 'Address Proof'];
    const randomName = fileNames[Math.floor(Math.random() * fileNames.length)];
    uploadDocument(randomName);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Document Vault</h2>
          <p className="mt-1 text-sm text-gray-500">Securely organize your important documents for fast applications.</p>
        </div>
        <Button className="gap-2" onClick={handleUpload}>
          <UploadCloud className="h-5 w-5" /> Upload Document
        </Button>
      </div>

      {/* Upload Area */}
      <div 
        onClick={handleUpload}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Drag and drop or click to upload</h3>
        <p className="mt-1 text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-brand-navy mb-4">Your Documents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {documents.map(doc => (
            <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative group">
              <div className={`absolute top-4 right-4 ${doc.status === 'Verified' ? 'text-green-500' : 'text-brand-warning'}`} title={doc.status}>
                {doc.status === 'Verified' ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
              </div>
              <div className={`h-12 w-12 rounded-lg bg-${doc.iconType}-50 flex items-center justify-center mb-4`}>
                <FileText className={`h-6 w-6 text-${doc.iconType}-600`} />
              </div>
              <h4 className="font-medium text-brand-navy">{doc.name}</h4>
              <p className="text-xs text-gray-500 mb-4">{doc.type} • {doc.date}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full text-xs h-8">View</Button>
              </div>
            </div>
          ))}

        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
        <Clock className="h-5 w-5 flex-shrink-0" />
        <p>GovConnect is a citizen-assistance platform. Future backend updates will secure these documents using standard encryption practices. For now, this is a local preview.</p>
      </div>
    </div>
  );
}
