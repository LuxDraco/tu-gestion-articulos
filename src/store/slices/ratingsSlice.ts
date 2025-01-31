import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Rating {
    articleId: number;
    rating: number;
    timestamp: number;
}

interface RatingsState {
    ratings: Record<number, Rating>;
}

const initialState: RatingsState = {
    ratings: {},
};

export const ratingsSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {
        setRating: (state, action: PayloadAction<Rating>) => {
            state.ratings[action.payload.articleId] = action.payload;
        },
    },
});

export const { setRating } = ratingsSlice.actions;
export const ratingsReducer = ratingsSlice.reducer;