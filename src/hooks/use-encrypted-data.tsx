
import { useState, useEffect, useCallback } from 'react';
import { encrypt, decrypt } from '@/utils/crypto';

/**
 * A hook for handling encrypted data
 * @param initialData The initial data to encrypt
 * @returns An object with the encrypted data, decrypted data, and methods to update them
 */
const useEncryptedData = <T extends Record<string, any>>(initialData: T) => {
  // State for storing the encrypted and decrypted data
  const [encryptedData, setEncryptedData] = useState<{ ciphertext: string, iv: string } | null>(null);
  const [decryptedData, setDecryptedData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Encrypt data
  const encryptData = useCallback(async (data: T) => {
    setIsLoading(true);
    setError(null);
    try {
      const stringData = JSON.stringify(data);
      const encrypted = await encrypt(stringData);
      setEncryptedData(encrypted);
      setDecryptedData(data);
      return encrypted;
    } catch (err) {
      setError('Failed to encrypt data');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Decrypt data
  const decryptData = useCallback(async (ciphertext: string, iv: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const decrypted = await decrypt(ciphertext, iv);
      const data = JSON.parse(decrypted) as T;
      setDecryptedData(data);
      return data;
    } catch (err) {
      setError('Failed to decrypt data');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update data (encrypt and store)
  const updateData = useCallback(async (data: T) => {
    return await encryptData(data);
  }, [encryptData]);

  // Initialize with encrypted initial data
  useEffect(() => {
    if (initialData) {
      encryptData(initialData).catch(console.error);
    }
  }, [initialData, encryptData]);

  return {
    encryptedData,
    decryptedData,
    encryptData,
    decryptData,
    updateData,
    isLoading,
    error
  };
};

export default useEncryptedData;
