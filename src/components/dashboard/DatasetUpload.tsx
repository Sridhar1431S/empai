import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
  rows?: number;
  columns?: number;
}

// Extended mock preview data for pagination demo
const mockPreviewData = [
  { id: 1, employee_id: 'EMP001', name: 'John Smith', department: 'Engineering', performance: 85, satisfaction: 4.2, training_hours: 45 },
  { id: 2, employee_id: 'EMP002', name: 'Sarah Johnson', department: 'Sales', performance: 72, satisfaction: 3.8, training_hours: 32 },
  { id: 3, employee_id: 'EMP003', name: 'Michael Brown', department: 'HR', performance: 91, satisfaction: 4.5, training_hours: 28 },
  { id: 4, employee_id: 'EMP004', name: 'Emily Davis', department: 'Marketing', performance: 78, satisfaction: 3.9, training_hours: 55 },
  { id: 5, employee_id: 'EMP005', name: 'David Wilson', department: 'Finance', performance: 88, satisfaction: 4.1, training_hours: 40 },
  { id: 6, employee_id: 'EMP006', name: 'Lisa Anderson', department: 'Engineering', performance: 92, satisfaction: 4.7, training_hours: 52 },
  { id: 7, employee_id: 'EMP007', name: 'James Taylor', department: 'Sales', performance: 65, satisfaction: 3.2, training_hours: 25 },
  { id: 8, employee_id: 'EMP008', name: 'Jennifer Martinez', department: 'HR', performance: 79, satisfaction: 4.0, training_hours: 38 },
  { id: 9, employee_id: 'EMP009', name: 'Robert Garcia', department: 'Marketing', performance: 83, satisfaction: 3.6, training_hours: 42 },
  { id: 10, employee_id: 'EMP010', name: 'Amanda White', department: 'Finance', performance: 95, satisfaction: 4.8, training_hours: 60 },
];

const ITEMS_PER_PAGE = 5;

export function DatasetUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const totalPages = Math.ceil(mockPreviewData.length / ITEMS_PER_PAGE);
  const paginatedData = mockPreviewData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const simulateUpload = (file: File) => {
    const uploadFile: UploadedFile = {
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
    };
    setUploadedFile(uploadFile);
    setCurrentPage(1);

    const uploadInterval = setInterval(() => {
      setUploadedFile(prev => {
        if (!prev) return null;
        const newProgress = Math.min(prev.progress + 15, 100);
        if (newProgress === 100) {
          clearInterval(uploadInterval);
          setTimeout(() => {
            setUploadedFile(p => p ? { ...p, status: 'processing' } : null);
            setTimeout(() => {
              const completeFile: UploadedFile = {
                ...uploadFile,
                status: 'complete',
                progress: 100,
                rows: Math.floor(Math.random() * 5000) + 500,
                columns: Math.floor(Math.random() * 20) + 5,
              };
              setUploadedFile(completeFile);
            }, 1500);
          }, 500);
        }
        return { ...prev, progress: newProgress };
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.json'))) {
      simulateUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setCurrentPage(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const exportToCSV = () => {
    const headers = Object.keys(mockPreviewData[0]).join(',');
    const rows = mockPreviewData.map(row => Object.values(row).join(','));
    const csvContent = [headers, ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'preprocessed_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Preprocessed data exported as CSV",
    });
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(mockPreviewData, null, 2);
    
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'preprocessed_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Preprocessed data exported as JSON",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Upload Area */}
      <div className="bg-card border border-border rounded-xl p-6">
        {!uploadedFile ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Upload className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 transition-colors",
                isDragging ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <p className="text-lg sm:text-xl font-medium mb-2">
              {isDragging ? "Drop your file here" : "Drag & drop or click to upload"}
            </p>
            <p className="text-sm text-muted-foreground">
              Supports CSV, XLSX, and JSON files up to 50MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* File Info */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
              </div>
              {uploadedFile.status === 'complete' && (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              )}
              {uploadedFile.status === 'error' && (
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              )}
            </div>

            {/* Progress */}
            {(uploadedFile.status === 'uploading' || uploadedFile.status === 'processing') && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {uploadedFile.status === 'uploading' ? 'Uploading...' : 'Processing data...'}
                  </span>
                  <span>{uploadedFile.progress}%</span>
                </div>
                <Progress value={uploadedFile.progress} className="h-2" />
              </div>
            )}

            {/* Complete Stats */}
            {uploadedFile.status === 'complete' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                  <p className="text-2xl font-bold text-primary">{uploadedFile.rows?.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Rows</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                  <p className="text-2xl font-bold text-accent">{uploadedFile.columns}</p>
                  <p className="text-sm text-muted-foreground">Columns</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Data Preview Table */}
      {uploadedFile?.status === 'complete' && (
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">Data Preview</h3>
              <span className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, mockPreviewData.length)} of {mockPreviewData.length} rows
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">CSV</span>
              </Button>
              <Button variant="outline" size="sm" onClick={exportToJSON} className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">JSON</span>
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/30">
                    {Object.keys(mockPreviewData[0]).map((key) => (
                      <th 
                        key={key} 
                        className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                      >
                        {key.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {paginatedData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                      {Object.values(row).map((value, cellIdx) => (
                        <td 
                          key={cellIdx} 
                          className="px-3 py-3 text-sm whitespace-nowrap"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preprocessing Options */}
      {uploadedFile?.status === 'complete' && (
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4">
          <h3 className="font-semibold text-lg">Preprocessing Options</h3>
          <div className="grid gap-2">
            <label className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
              <input type="checkbox" defaultChecked className="rounded border-border w-4 h-4" />
              <span className="text-sm sm:text-base">Remove duplicates</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
              <input type="checkbox" defaultChecked className="rounded border-border w-4 h-4" />
              <span className="text-sm sm:text-base">Handle missing values (mean imputation)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
              <input type="checkbox" className="rounded border-border w-4 h-4" />
              <span className="text-sm sm:text-base">Normalize numeric features</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
              <input type="checkbox" className="rounded border-border w-4 h-4" />
              <span className="text-sm sm:text-base">Encode categorical variables</span>
            </label>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" onClick={resetUpload} className="flex-1">
              Upload Another
            </Button>
            <Button className="flex-1">
              Start Preprocessing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}