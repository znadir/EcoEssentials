"use client";
import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardMedia,
	Container,
	Link,
	Rating,
	Typography,
} from "@mui/material";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import useGetSWR from "../../lib/useGetSWR";
import Loader from "@/app/components/loader";
import ErrorCard from "@/app/components/errorcard";

const labels: { [index: string]: string } = {
	0: "NotRated",
	0.5: "Useless",
	1: "Useless+",
	1.5: "Poor",
	2: "Poor+",
	2.5: "Ok",
	3: "Ok+",
	3.5: "Good",
	4: "Good+",
	4.5: "Excellent",
	5: "Excellent+",
};

function Review({
	nom,
	rating,
	commentaire,
}: {
	nom: string;
	rating: number;
	commentaire: string;
}) {
	return (
		<Card sx={{ p: 2 }}>
			<Typography variant='h6'>{nom}</Typography>
			<Rating value={rating} readOnly />
			<Typography variant='body1' sx={{ mt: 2 }}>
				{commentaire}
			</Typography>
		</Card>
	);
}

export default function Article({ params }: { params: { slug: string } }) {
	const { data, isLoading, error } = useGetSWR(`/api/articles/${params.slug}`);

	return isLoading ? (
		<Loader />
	) : error ? (
		<ErrorCard />
	) : (
		<main>
			<Container maxWidth='xl'>
				<Breadcrumbs sx={{ mt: 3 }}>
					<Link underline='hover' color='inherit' href='/'>
						Home
					</Link>
					<Typography sx={{ color: "text.primary" }}>
						{data.article.title.substring(0, 20) + (data.article.title.length > 20 ? "..." : "")}
					</Typography>
				</Breadcrumbs>

				<Box
					sx={{
						display: "flex",
						gap: { xs: 2, md: 5 },
						flexDirection: { xs: "column", md: "row" },
						mt: 2,
					}}
				>
					<Card sx={{ flex: 2, height: "100%" }}>
						<CardMedia component='img' image={data.article.images[0]} alt='' />
						<Box sx={{ display: "flex" }}>
							<Image src={data.article.images[0]} alt='' width={80} height={80} />
						</Box>
					</Card>
					<Box sx={{ flex: 5 }}>
						<Typography component='h1' variant='h5' sx={{ mb: 1 }}>
							{data.article.title}
						</Typography>

						<Box sx={{ width: 200, display: "flex", alignItems: "center", mb: 2 }}>
							<Rating value={data.article.rating} precision={0.5} readOnly />
							<Box sx={{ ml: 2 }}>{labels[data.article.rating]}</Box>
						</Box>

						<Typography variant='h5' sx={{ mb: 2 }} color='success'>
							<EnergySavingsLeafIcon /> CA${Number(data.article.price).toFixed(2)}
						</Typography>
						<Button startIcon={<AddShoppingCartIcon />} variant='contained'>
							Add to cart
						</Button>

						<Typography component='p' variant='body1' sx={{ mt: 2 }} color='text.secondary'>
							{data.article.description.split("\n").map((line: string, index: number) => (
								<span key={index}>
									{line}
									{index < data.article.description.split("\n").length - 1 && <br />}
								</span>
							))}
						</Typography>
					</Box>
				</Box>

				<Typography component='h1' variant='h6' sx={{ mt: 3, mb: 1 }}>
					Customer reviews
				</Typography>
				<Rating size='large' value={data.article.rating} precision={0.5} readOnly />
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "repeat(1, 1fr)",
							sm: "repeat(2, 1fr)",
							md: "repeat(3, 1fr)",
							lg: "repeat(4, 1fr)",
						},
						mt: 2,
						gap: 2,
					}}
				>
					<Review
						nom='John Doe'
						rating={4}
						commentaire='This product is great! I love it. I will definitely buy it again.'
					/>
					<Review
						nom='Jane Doe'
						rating={5}
						commentaire='I love this product! It is amazing. I will definitely buy it again.'
					/>
					<Review
						nom='Alice Doe'
						rating={3}
						commentaire='This product is ok. I might buy it again.'
					/>
				</Box>
			</Container>
		</main>
	);
}
