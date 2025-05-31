import type React from 'react';
import { FaUpload, FaCamera } from 'react-icons/fa';
import { MdImage } from 'react-icons/md';

interface ImageUploaderProps {
  uploadedImage: string | null;
  isUploading: boolean;
  uploadedFileName: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>; // Diubah di sini
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onTakePhoto: () => void;
  onEditImage: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadedImage,
  isUploading,
  uploadedFileName,
  fileInputRef,
  onFileUpload,
  onUploadClick,
  onTakePhoto,
  onEditImage,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Unggah Foto Tanaman
      </h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center bg-gray-50 hover:border-green-500 transition-colors">
        {isUploading && !uploadedImage ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600">Memproses {uploadedFileName}...</p>
          </div>
        ) : uploadedImage ? (
          <div className="space-y-3">
            <img
              src={uploadedImage}
              alt="Uploaded plant"
              className="max-w-full max-h-60 sm:max-h-64 mx-auto rounded-lg shadow-md object-contain"
            />
            <div className="space-y-1">
              <p className="text-sm text-green-600 font-medium">
                ✓ Gambar berhasil diunggah:
              </p>
              <p className="text-xs text-gray-500 truncate max-w-xs mx-auto">
                {uploadedFileName}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-4">
            <MdImage className="text-5xl sm:text-6xl text-gray-400 mx-auto" />
            <div>
              <p className="text-gray-600 text-sm sm:text-base mb-1">
                Seret & lepas gambar, atau klik untuk memilih file
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, atau JPEG (MAX. 5MB)
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 max-w-md sm:max-w-lg mx-auto">
        {uploadedImage && !isUploading ? (
          <button
            onClick={onEditImage}
            className="flex-1 cursor-pointer bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FaUpload /> Ganti Gambar
          </button>
        ) : (
          <>
            <button
              onClick={onUploadClick}
              disabled={isUploading}
              className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-md transition-colors flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer ${
                isUploading
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-green-700 text-white hover:bg-green-800'
              }`}
            >
              <FaUpload />
              {isUploading ? 'Mengunggah...' : 'Unggah Gambar'}
            </button>
            <button
              onClick={onTakePhoto}
              disabled={isUploading}
              className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-md transition-colors flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer ${
                isUploading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaCamera />
              {isUploading ? 'Memproses...' : 'Ambil Gambar'}
            </button>
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={onFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
