
import { useState, ChangeEvent } from "react";
import { Upload, File, FileSpreadsheet, FileJson, X, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadState {
  id: number;
  name: string;
  type: string;
  size: string;
  progress: number;
  status: "uploading" | "success" | "error";
  errorMessage?: string;
}

const FileUpload = () => {
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (fileList: File[]) => {
    const newFiles = fileList.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type,
      size: formatFileSize(file.size),
      progress: 0,
      status: "uploading" as const
    }));

    setFiles([...files, ...newFiles]);

    // Simulate upload process for each file
    newFiles.forEach(newFile => {
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        // Randomly fail some uploads for demonstration purposes
        const success = Math.random() > 0.2;
        
        setFiles(prev => prev.map(file => {
          if (file.id === fileId) {
            return {
              ...file,
              progress,
              status: success ? "success" : "error",
              errorMessage: success ? undefined : getRandomErrorMessage()
            };
          }
          return file;
        }));

        if (success) {
          toast({
            title: "File uploaded successfully",
            description: "Your file has been processed and is ready for matching.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Upload failed",
            description: "There was an error processing your file. Please try again.",
          });
        }
      } else {
        setFiles(prev => prev.map(file => {
          if (file.id === fileId) {
            return { ...file, progress };
          }
          return file;
        }));
      }
    }, 300);
  };

  const removeFile = (fileId: number) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getRandomErrorMessage = () => {
    const errors = [
      "Format validation failed",
      "Missing required columns",
      "File contains corrupted data",
      "Network error during upload",
      "Unexpected file format"
    ];
    return errors[Math.floor(Math.random() * errors.length)];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('spreadsheet') || fileType.includes('excel') || fileType.includes('csv')) {
      return <FileSpreadsheet className="h-6 w-6 text-green-600" />;
    } else if (fileType.includes('json') || fileType.includes('xml')) {
      return <FileJson className="h-6 w-6 text-blue-600" />;
    } else {
      return <File className="h-6 w-6 text-gray-600" />;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="w-full">
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center
          ${dragActive ? "border-guardian-500 bg-guardian-50" : "border-gray-300 hover:border-guardian-400"}
          transition-colors duration-200
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">Drop files to upload</h3>
          <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>Accepted formats: CSV, Excel (XLS/XLSX), JSON, XML</p>
            <p className="mt-1">Maximum file size: 10MB</p>
          </div>
          
          <Button className="mt-4" onClick={() => document.getElementById("file-upload")?.click()}>
            Select Files
          </Button>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".csv,.xls,.xlsx,.json,.xml"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-base font-medium text-gray-700">Uploaded Files</h4>
          <div className="space-y-4">
            {files.map(file => (
              <div key={file.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start">
                  <div className="mr-3">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">{file.name}</h5>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="mt-2">
                      <Progress 
                        value={file.progress} 
                        className={`
                          h-1.5
                          ${file.status === "error" ? "bg-red-100" : ""}
                        `}
                      />
                    </div>
                    
                    <div className="mt-2 flex items-center">
                      {file.status === "uploading" ? (
                        <p className="text-xs text-gray-500">Uploading... {file.progress}%</p>
                      ) : file.status === "success" ? (
                        <div className="flex items-center text-xs text-green-600">
                          <Check className="h-3 w-3 mr-1" />
                          <span>Upload complete</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-xs text-red-600">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          <span>
                            {file.errorMessage || "Upload failed"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
