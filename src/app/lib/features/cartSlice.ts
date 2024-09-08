import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Article {
	slug: string;
	qty: number;
}

interface CartState {
	qty: number;
	articles: Article[];
}

const initialState: CartState = { qty: 0, articles: [] };

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

			state.qty = calculateQty(state.articles);
		},
		removeFromCart(state, action: PayloadAction<string>) {
			state.articles = state.articles.filter((article) => article.slug !== action.payload);

			state.qty = calculateQty(state.articles);
		},
	},
	selectors: {
		selectCart: (cart: CartState) => cart,
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const { selectCart } = cartSlice.selectors;
export default cartSlice.reducer;

// ===== Utils =====
function calculateQty(articles: Article[]) {
	let qty = 0;
	articles.forEach((article) => {
		qty += article.qty;
	});
	return qty;
}
