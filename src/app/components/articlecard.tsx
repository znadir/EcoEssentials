"use client";

import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ArticleCard({
	title,
	imagePath,
	rating,
	priceCad,
}: {
	title: string;
	imagePath: string;
	rating: number;
	priceCad: number;
}) {
	const router = useRouter();

	return (
		<Card>
			<CardActionArea onClick={() => router.push("/article")}>
				<CardMedia component='img' image={imagePath} alt='' />

				<CardContent>
					<Typography gutterBottom variant='subtitle1' component='div'>
						{title}
					</Typography>

					<Rating value={rating} precision={0.5} readOnly />

					<Typography variant='h6' color='text.secondary'>
						CA${priceCad}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
