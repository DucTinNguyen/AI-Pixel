'use client';

import React, { useState, useRef } from 'react';

interface TextScannerProps {
  className?: string;
}

interface ScanResult {
  text: string;
  confidence: number;
  timestamp: number;
}

interface OCRResponse {
  text: string;
  confidence: number;
}

const TextScannerApp: React.FC<TextScannerProps> = ({ className = '' }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>('');
  const [manaVolume, setManaVolume] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
      setScanResult(null);
      // Simulate mana volume for the effect
      setManaVolume(Math.floor(Math.random() * 100000));
    }
  };

  const performOCR = async (file: File): Promise<OCRResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          "application": "application/json",
          "apikey": process.env.NEXT_PUBLIC_OCR_KEY as string, 
        },
        body: formData,
      });

      const ocrText = await response.json();

      if (!response.ok) {
        throw new Error('OCR processing failed');
      }

      return {
        text:ocrText.ParsedResults[0].ParsedText,
        confidence: 99
      }
    } catch (error) {
      throw new Error('Failed to process image');
    }
  };

  const startScanning = async () => {
    if (!imageFile) return;

    setIsScanning(true);
    setError('');

    try {
      const result = await performOCR(imageFile);
      setScanResult({
        text: result.text,
        confidence: 99,
        timestamp: Date.now()
      });
    } catch (err) {
      setError('Error processing image');
    } finally {
      setIsScanning(false);
    }
  };

  const copyToClipboard = () => {
    if (scanResult?.text) {
      navigator.clipboard.writeText(scanResult.text)
        .then(() => {
          const originalText = scanResult.text;
          setScanResult({
            ...scanResult,
            text: 'Enchantment copied to clipboard!'
          });
          setTimeout(() => {
            setScanResult({
              ...scanResult,
              text: originalText
            });
          }, 1000);
        })
        .catch(() => setError('Failed to copy enchantment'));
    }
  };

  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className={`min-w-[320px] min-h-[400px] bg-[#1a1a2e] border-2 border-[#6b21a8]/30 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className="p-4 bg-[#1a1a2e] border-b border-[#6b21a8]/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[#ffd700] font-mono text-lg">Alchemist's Scanner</h2>
          <span className="text-[#a855f7] text-xs">
            Last Enchanted: {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-pulse shadow-[0_0_10px_#a855f7]" />
      </div>
      
      <div className="p-4 space-y-4">
        <div className="relative h-48 bg-[#1a1a2e] rounded border border-[#6b21a8]/20 overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#a855f7] font-mono flex flex-col items-center gap-2">
                <span className="text-2xl">📜</span>
                <span>Place Scroll Here</span>
              </div>
            </div>
          )}
          {isScanning && (
            <div className="absolute inset-0 bg-[#6b21a8]/10">
              <div className="absolute inset-0 border-2 border-[#a855f7]/50 animate-pulse" />
              <div className="absolute top-0 left-0 h-0.5 bg-[#a855f7] animate-[scan_2s_linear_infinite]" style={{ width: '100%' }} />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b21a8]/0 via-[#a855f7]/50 to-[#6b21a8]/0" />
        </div>

        {/* Mana Volume Display */}
        <div className="text-[#ffd700] font-mono text-sm flex items-center gap-2">
          <span>Mana Volume:</span>
          <span>{manaVolume.toLocaleString()}</span>
          <span className="text-[#a855f7]">⚡</span>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center font-mono">
            {error}
          </div>
        )}

        {scanResult && (
          <div className="bg-[#1a1a2e] rounded border border-[#6b21a8]/20 p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#a855f7] text-sm font-mono">
                Enchantment Power: {scanResult.confidence}%
              </span>
              <button
                onClick={copyToClipboard}
                className="text-[#ffd700] hover:text-[#a855f7] transition-colors font-mono"
                type="button"
              >
                Copy Enchantment
              </button>
            </div>
            <div className="text-[#e2e8f0] font-mono text-sm whitespace-pre-line">
              {scanResult.text}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 px-4 bg-[#6b21a8]/20 border border-[#a855f7]/30 rounded 
                       text-[#ffd700] font-mono hover:bg-[#6b21a8]/30 transition-all"
              type="button"
            >
              Select Scroll
            </button>
            {imageFile && !isScanning && (
              <button
                onClick={startScanning}
                className="flex-1 py-2 px-4 bg-[#6b21a8]/20 border border-[#a855f7]/30 rounded 
                         text-[#ffd700] font-mono hover:bg-[#6b21a8]/30 transition-all"
                type="button"
              >
                Cast Translation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextScannerApp;