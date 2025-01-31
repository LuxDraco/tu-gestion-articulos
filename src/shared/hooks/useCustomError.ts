import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setError } from '@/store/slices/uiSlice';

export const useCustomError = (error: unknown) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!error) return;

        dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));

        return () => {
            dispatch(setError(null));
        };
    }, [error, dispatch]);
};