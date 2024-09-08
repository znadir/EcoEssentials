import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Article {
	slug: string;
	qty: number;
}

interface CartState {
	articles: Article[];
}

const initialState: CartState = { articles: [] };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<Article>) {
			const existingArticle = state.articles.find(
				(article) => article.slug === action.payload.slug
			);
			if (existingArticle) {
				existingArticle.qty += action.payload.qty;
			} else {
				state.articles.push(action.payload);
			}
		},
		removeFromCart(state, action: PayloadAction<string>) {
			state.articles = state.articles.filter((article) => article.slug !== action.payload);
		},
	},
	selectors: {
		selectCart: (cart: CartState) => cart.articles,
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const { selectCart } = cartSlice.selectors;
export default cartSlice.reducer;
