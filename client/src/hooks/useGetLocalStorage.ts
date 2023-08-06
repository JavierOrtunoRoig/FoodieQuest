
export const useGetLocalStorage = <T>(key: string): T | null => {
  const localStorageData = localStorage.getItem(key);
  if (localStorageData) {
    return JSON.parse(localStorageData);
  }
  return null;
};
