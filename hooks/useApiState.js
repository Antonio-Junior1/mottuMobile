import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import i18n from '../i18n';

/**
 * Hook personalizado para gerenciar estado de loading, erro e dados da API
 */
export const useApiState = (initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const { 
      showErrorAlert = true, 
      successMessage = null,
      onSuccess = null,
      onError = null 
    } = options;

    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      setData(result);
      
      if (successMessage) {
        Alert.alert(i18n.t('success'), successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.message || i18n.t('unexpectedError');
      setError(errorMessage);
      
      if (showErrorAlert) {
        Alert.alert(i18n.t('error'), errorMessage);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData
  };
};

/**
 * Hook específico para operações CRUD de motos
 */
export const useMotoApi = () => {
  const listState = useApiState([]);
  const createState = useApiState(null);
  const updateState = useApiState(null);
  const deleteState = useApiState(null);

  return {
    list: listState,
    create: createState,
    update: updateState,
    delete: deleteState
  };
};

export default useApiState;
