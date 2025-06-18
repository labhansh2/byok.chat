// Utility functions for managing OpenRouter API key in localStorage

export const API_KEY_STORAGE_KEY = "openrouter_api_key";

export function hasApiKey(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function getApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function setApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('localStorageUpdate'));
}

export function removeApiKey(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(API_KEY_STORAGE_KEY);
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('localStorageUpdate'));
}

export function validateApiKey(apiKey: string): boolean {
  return apiKey.trim().startsWith('sk-or-v1-') && apiKey.trim().length > 20;
} 