import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from "@mui/material";

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
	return (
		<Card>
			<CardActionArea>
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
