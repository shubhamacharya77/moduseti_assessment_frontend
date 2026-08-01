import React, { useState } from 'react';
import { Upload, FileText, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface UploadDropzoneProps {
  onUploadSuccess: () => void;
  backendUrl?: string;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onUploadSuccess,
  backendUrl = 'http://localhost:8000',
}) => {
  const [uploadState, setUploadState] = useState<{ [key: string]: { status: 'idle' | 'uploading' | 'success' | 'error'; message?: string } }>({
    company_profile: { status: 'idle' },
    hr_policy: { status: 'idle' },
    sales: { status: 'idle' },
    customer: { status: 'idle' },
  });

  const handleFileUpload = async (file: File, fileType: 'company_profile' | 'hr_policy' | 'sales' | 'customer') => {
    setUploadState((prev) => ({ ...prev, [fileType]: { status: 'uploading' } }));

    const formData = new FormData();
    formData.append('file', file);

    let endpoint = `${backendUrl}/api/upload/pdf`;
    if (fileType === 'company_profile' || fileType === 'hr_policy') {
      formData.append('doc_type', fileType);
    } else if (fileType === 'sales') {
      endpoint = `${backendUrl}/api/upload/sales`;
    } else if (fileType === 'customer') {
      endpoint = `${backendUrl}/api/upload/customer`;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await res.json();
      setUploadState((prev) => ({
        ...prev,
        [fileType]: { status: 'success', message: data.message || 'Ingested successfully!' },
      }));
      onUploadSuccess();
    } catch (err: any) {
      setUploadState((prev) => ({
        ...prev,
        [fileType]: { status: 'error', message: err.message || 'Error uploading file' },
      }));
    }
  };

  const fileConfigs = [
    {
      key: 'company_profile' as const,
      title: 'Company Profile PDF',
      accept: '.pdf',
      icon: FileText,
      description: 'Vision, products/services, operational model',
    },
    {
      key: 'hr_policy' as const,
      title: 'HR Policy PDF',
      accept: '.pdf',
      icon: FileText,
      description: 'Org structure, headcount costs, talent retention',
    },
    {
      key: 'sales' as const,
      title: 'Sales Dataset CSV',
      accept: '.csv',
      icon: FileSpreadsheet,
      description: 'Revenue, regional sales velocity, profit margin',
    },
    {
      key: 'customer' as const,
      title: 'Customer Dataset CSV',
      accept: '.csv',
      icon: FileSpreadsheet,
      description: 'Churn risk, CAC, LTV, CSAT scores',
    },
  ];

  return (
    <div className="glass-card p-6 my-6 border border-slate-800 bg-slate-900/60 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" /> Executive Multi-Modal Dataset Portal
          </h2>
          <p className="text-xs text-slate-400">Upload your company documents and CSV datasets for automated ingestion & evidence processing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fileConfigs.map((cfg) => {
          const state = uploadState[cfg.key];
          const Icon = cfg.icon;

          return (
            <div
              key={cfg.key}
              className="relative p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  {state.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {state.status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                  {state.status === 'uploading' && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                </div>

                <h3 className="text-xs font-bold text-white mb-1">{cfg.title}</h3>
                <p className="text-[11px] text-slate-400 leading-tight mb-3">{cfg.description}</p>
              </div>

              <div>
                <label className="block w-full">
                  <span className="sr-only">Choose {cfg.title}</span>
                  <input
                    type="file"
                    accept={cfg.accept}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], cfg.key);
                      }
                    }}
                    className="block w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                  />
                </label>
                {state.message && (
                  <span className={`block text-[10px] mt-1.5 font-medium ${state.status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {state.message}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
