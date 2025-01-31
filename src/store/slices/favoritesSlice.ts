import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    articleIds: number[];
}

const initialState: FavoritesState = {
    articleIds: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const index = state.articleIds.indexOf(action.payload);
            if (index === -1) {
                state.articleIds.push(action.payload);
            } else {
                state.articleIds.splice(index, 1);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;