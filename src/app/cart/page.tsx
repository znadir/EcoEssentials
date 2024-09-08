"use client";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import Image from "next/image";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
	selectCart,
	removeFromCart,
	removeAllFromCart,
	addToCart,
} from "../lib/features/cartSlice";
import useGetSWR from "../lib/useGetSWR";
import Loader from "../components/loader";
import ErrorCard from "../components/errorcard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Article({
	title,
	price,
	quantity,
	imageUrl,
	removeOnClick,
	increaseOnClick,
	decreaseOnClick,
}: {
	title: string;
	price: number;
	quantity: number;
	imageUrl: string;
	removeOnClick: () => void;
	increaseOnClick: () => void;
	decreaseOnClick: () => void;
}) {
	return (
		<Card sx={{ p: 2, mb: 2 }}>
			<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Image src={imageUrl} alt='article' width={100} height={100} />

					<Box sx={{ width: "max-content" }}>
						<Typography variant='h6'>{title}</Typography>

						<Box sx={{ display: "flex", gap: 2 }}>
							<Typography variant='subtitle1'>Quantity: {quantity}</Typography>
							<Button onClick={decreaseOnClick} variant='outlined' size='small'>
								-
							</Button>
							<Button onClick={increaseOnClick} variant='outlined' size='small'>
								+
							</Button>
						</Box>

						<Button onClick={removeOnClick} variant='outlined' size='small' color='error'>
							Remove
						</Button>
					</Box>
				</Box>

				<Typography variant='h6'>${price}</Typography>
			</Box>
		</Card>
	);
}

export default function Cart() {
	const dispatch = useAppDispatch();
	const cart = useAppSelector(selectCart);
	const router = useRouter();

	const { data, isLoading, error } = useGetSWR(
		"/api/articles?slugs=" + cart.articles.map((article) => article.slug).join(",")
	);

	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		setTotalPrice(
			cart.articles.reduce(
				(acc, article) =>
					acc +
					(data?.articles.find((a: any) => a.slug === article.slug)?.price ?? 0) * article.qty,
				0
			)
		);
	}, [cart]);

	return isLoading ? (
		<Loader />
	) : error ? (
		<ErrorCard />
	) : (
		<main>
			<Container
				maxWidth='xl'
				sx={{
					mt: 3,
				}}
			>
				<Box
					sx={{
						display: "flex",
						gap: 2,
						flexDirection: { xs: "column", md: "row" },
					}}
				>
					<Box sx={{ flex: 5 }}>
						<Typography variant='h5' component='div' sx={{ mb: 2 }}>
							My Cart
						</Typography>
						{cart.articles.length === 0 && (
							<Card sx={{ p: 2 }}>
								<Typography variant='h6'>Your cart is empty 😢</Typography>

								<Button
									onClick={() => router.push("/")}
									variant='contained'
									color='primary'
									fullWidth
									sx={{ mt: 2 }}
								>
									Shop Now
								</Button>
							</Card>
						)}
						{cart.articles.map((article) => {
							const dataArticle = data?.articles.find((a: any) => a.slug === article.slug);

							const fixedTitle =
								dataArticle?.title.substring(0, 70) +
									(dataArticle?.title.length > 70 ? "..." : "") || "Unknown";

							return (
								<Article
									key={article.slug}
									title={fixedTitle}
									price={dataArticle?.price ?? 0}
									quantity={article.qty}
									imageUrl={dataArticle?.images[0] ?? ""}
									removeOnClick={() => {
										dispatch(removeAllFromCart(article.slug));
									}}
									increaseOnClick={() => {
										dispatch(addToCart(article.slug));
									}}
									decreaseOnClick={() => {
										dispatch(removeFromCart(article.slug));
									}}
								/>
							);
						})}
					</Box>
					<Card sx={{ p: 3, flex: 2, height: "fit-content" }}>
						<Typography variant='h6' sx={{ mb: 2 }}>
							Subtotal ({cart.qty} item{cart.qty > 1 ? "s" : ""}): ${totalPrice.toFixed(2)}
						</Typography>
						<Button
							onClick={() => toast.error("Sorry! This is just a demo 😔")}
							variant='contained'
							color='success'
							fullWidth
							disabled={cart.articles.length === 0}
						>
							Proceed to Checkout
						</Button>
					</Card>
				</Box>
			</Container>
		</main>
	);
}
