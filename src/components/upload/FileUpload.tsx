
import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Upload, File } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onUpload?: (files: File[]) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
}

export const FileUpload = ({ 
  onUpload, 
  isUploading = false, 
  uploadProgress = 0,
  maxFiles = 5, 
  maxSize = 10, // 10MB
  accept = ".csv,.xlsx,.json,.xml"
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    // Check number of files
    if (files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed.`,
        variant: "destructive"
      });
      return;
    }
    
    // Check file sizes
    const oversizedFiles = files.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "File(s) too large",
        description: `Maximum file size is ${maxSize}MB.`,
        variant: "destructive"
      });
      return;
    }
    
    // Check file types if accept prop is provided
    if (accept) {
      const acceptedTypes = accept.split(",");
      const invalidFiles = files.filter(file => {
        const extension = "." + file.name.split('.').pop()?.toLowerCase();
        return !acceptedTypes.includes(extension);
      });
      
      if (invalidFiles.length > 0) {
        toast({
          title: "Invalid file type(s)",
          description: `Accepted file types: ${accept}`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setSelectedFiles(files);
    
    if (onUpload) {
      onUpload(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const renderFileList = () => {
    if (selectedFiles.length === 0) return null;
    
    return (
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Selected Files:</p>
        <ul className="space-y-2">
          {selectedFiles.map((file, index) => (
            <li key={index} className="text-sm flex items-center">
              <File className="h-4 w-4 mr-2 text-gray-500" />
              <span className="truncate">{file.name}</span>
              <span className="text-xs text-gray-500 ml-2">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center ${
          isDragging ? 'border-guardian-500 bg-guardian-50' : 'border-gray-300 hover:border-guardian-400'
        } transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        style={{ cursor: "pointer" }}
      >
        <Upload className="h-10 w-10 text-gray-400 mb-4" />
        <p className="text-lg font-medium mb-1">Drag and drop files here</p>
        <p className="text-sm text-gray-500 mb-4">or click to browse</p>
        <Button type="button" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Browse Files"}
        </Button>
        <p className="text-xs text-gray-400 mt-4">
          Max {maxFiles} files, up to {maxSize}MB each
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple={maxFiles > 1}
          accept={accept}
          disabled={isUploading}
        />
      </div>
      
      {isUploading && uploadProgress > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
      
      {renderFileList()}
    </div>
  );
};

export default FileUpload;
