import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import prisma from "@/app/lib/prisma";
import ArticleCard from "./components/articlecard";
import { getReviewsAvg } from "@/app/api/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
	const articlesWithoutReviews = await prisma.article.findMany({ take: 12 });
	const articles = await Promise.all(
		articlesWithoutReviews.map(async (article) => {
			const rating = await getReviewsAvg(article.id);
			return { ...article, rating };
		})
	);

	return (
		<main>
			<Container maxWidth='xl' sx={{ mt: 0 }}>
				<Box sx={{ display: { xs: "none", md: "block" } }}>
					<Image
						style={{ width: "100%", height: "100%" }}
						src='/deskbanner.png'
						alt='Buy Eco-Friendly products'
						width={1427}
						height={235}
					/>
				</Box>

				<Box sx={{ display: { xs: "block", md: "none" } }}>
					<Image
						style={{ width: "100%", height: "100%" }}
						src='/mobbanner.png'
						alt='Buy Eco-friendly products'
						width={812}
						height={287}
					/>
				</Box>

				<Typography variant='h5' component='h2' sx={{ mb: 2, mt: 3 }}>
					Our Eco Products
				</Typography>

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "repeat(1, 1fr)",
							sm: "repeat(3, 1fr)",
							md: "repeat(4, 1fr)",
							lg: "repeat(6, 1fr)",
						},
						gap: 2,
					}}
				>
					{articles.map((article: any) => (
						<ArticleCard
							key={article.id}
							title={article.title.substring(0, 70) + (article.title.length > 70 ? "..." : "")}
							imagePath={article.images[0]}
							rating={article.rating}
							priceCad={Number(article.price).toFixed(2)}
							href={`/article/${article.slug}`}
						/>
					))}
				</Box>
				<Box
					sx={{
						display: "flex",
						mt: 3,
						gap: 2,
						"& img": { width: "100%", height: "fit-content" },
						flexDirection: {
							xs: "column",
							md: "row",
						},
					}}
				>
					<Image src='/ad-eco.png' alt='Eco-friendly' width={451.28} height={235.66} />
					<Image src='/ad-cheap.png' alt='Cheap' width={451.28} height={235.66} />
					<Image src='/ad-best.png' alt='Best' width={451.28} height={235.66} />
				</Box>
			</Container>
		</main>
	);
}
