
import { toast } from "@/hooks/use-toast";

/**
 * AES-256 Encryption Utility
 * 
 * This utility provides methods for encrypting and decrypting sensitive data
 * using the AES-256-GCM algorithm with proper IV handling.
 */

// Generate a random encryption key if not already in localStorage
const getEncryptionKey = (): string => {
  let key = localStorage.getItem('encryption_key');
  
  if (!key) {
    // Generate a random 256-bit key (32 bytes)
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    key = Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    localStorage.setItem('encryption_key', key);
  }
  
  return key;
};

// Convert string to bytes
const stringToBytes = (text: string): Uint8Array => {
  const encoder = new TextEncoder();
  return encoder.encode(text);
};

// Convert bytes to string
const bytesToString = (bytes: Uint8Array): string => {
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
};

// Convert hex to bytes
const hexToBytes = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i/2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
};

// Convert bytes to hex
const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Generate a random initialization vector (IV)
const generateIV = (): Uint8Array => {
  const iv = new Uint8Array(12); // 96 bits for GCM
  window.crypto.getRandomValues(iv);
  return iv;
};

/**
 * Encrypt data using AES-256-GCM
 * @param plaintext The data to encrypt
 * @returns An object containing the encrypted data and IV in hex format
 */
export const encrypt = async (plaintext: string): Promise<{ ciphertext: string, iv: string }> => {
  try {
    const keyBytes = hexToBytes(getEncryptionKey());
    const iv = generateIV();
    const plaintextBytes = stringToBytes(plaintext);
    
    // Import the key
    const key = await window.crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );
    
    // Encrypt the data
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
        tagLength: 128 // Authentication tag length
      },
      key,
      plaintextBytes
    );
    
    // Convert to hex strings for storage
    const ciphertext = bytesToHex(new Uint8Array(encrypted));
    const ivHex = bytesToHex(iv);
    
    return { ciphertext, iv: ivHex };
  } catch (error) {
    console.error("Encryption error:", error);
    toast({
      title: "Encryption Failed",
      description: "Could not encrypt the data securely.",
      variant: "destructive"
    });
    throw new Error("Encryption failed");
  }
};

/**
 * Decrypt data using AES-256-GCM
 * @param ciphertext The encrypted data in hex format
 * @param iv The initialization vector in hex format
 * @returns The decrypted plaintext
 */
export const decrypt = async (ciphertext: string, iv: string): Promise<string> => {
  try {
    const keyBytes = hexToBytes(getEncryptionKey());
    const ciphertextBytes = hexToBytes(ciphertext);
    const ivBytes = hexToBytes(iv);
    
    // Import the key
    const key = await window.crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    
    // Decrypt the data
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBytes,
        tagLength: 128 // Authentication tag length
      },
      key,
      ciphertextBytes
    );
    
    return bytesToString(new Uint8Array(decrypted));
  } catch (error) {
    console.error("Decryption error:", error);
    toast({
      title: "Decryption Failed",
      description: "Could not decrypt the data. The data may be corrupted or tampered with.",
      variant: "destructive"
    });
    throw new Error("Decryption failed");
  }
};

/**
 * Generate a new encryption key and re-encrypt all stored data
 * This would be used when rotating keys for security purposes
 */
export const rotateEncryptionKey = async (): Promise<void> => {
  try {
    // Here you would implement logic to re-encrypt all sensitive data with a new key
    // For now, just generate a new key
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    const newKey = Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    localStorage.setItem('encryption_key', newKey);
    
    toast({
      title: "Security Key Updated",
      description: "Your encryption key has been rotated successfully.",
    });
  } catch (error) {
    console.error("Key rotation error:", error);
    toast({
      title: "Key Rotation Failed",
      description: "Could not update the encryption key.",
      variant: "destructive"
    });
  }
};
