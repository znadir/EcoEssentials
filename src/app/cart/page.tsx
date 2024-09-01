"use client";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import Image from "next/image";

function Article({
	title,
	price,
	quantity,
	imageUrl,
}: {
	title: string;
	price: number;
	quantity: number;
	imageUrl: string;
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
							<Button variant='outlined' size='small'>
								-
							</Button>
							<Button variant='outlined' size='small'>
								+
							</Button>
						</Box>

						<Button variant='outlined' size='small' color='error'>
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
	return (
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
						<Article
							title='Eco-Friendly Placeholder'
							price={10.02}
							quantity={1}
							imageUrl='/articles/placeholder.png'
						/>

						<Article
							title='Eco-Friendly Placeholder'
							price={10.02}
							quantity={1}
							imageUrl='/articles/placeholder.png'
						/>
					</Box>
					<Card sx={{ p: 3, flex: 2, height: "fit-content" }}>
						<Typography variant='h6' sx={{ mb: 2 }}>
							Subtotal (1 item): $10.02
						</Typography>
						<Button
							onClick={() => alert("Sorry! This is not a real store.")}
							variant='contained'
							color='success'
							fullWidth
						>
							Proceed to Checkout
						</Button>
					</Card>
				</Box>
			</Container>
		</main>
	);
}
