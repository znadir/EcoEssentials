import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import ArticleCard from "./components/articlecard";

export default function Home() {
	return (
		<main>
			<Container maxWidth='xl' sx={{ mt: 0 }}>
				<Box sx={{ display: { xs: "none", md: "block" } }}>
					<Image
						style={{ width: "100%", height: "100%" }}
						src='/deskbanner.png'
						alt='Buy Eco-friendly products'
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
					New Eco-friendly Products
				</Typography>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "repeat(2, 1fr)",
							sm: "repeat(3, 1fr)",
							md: "repeat(4, 1fr)",
							lg: "repeat(6, 1fr)",
						},
						gap: 2,
					}}
				>
					<ArticleCard
						title='Ecozone Rinse Aid, Natural Rinsing Aid for Dishwashers, Dry & Shine'
						imagePath='/articles/1.png'
						rating={4.5}
						priceCad={7.99}
					/>
					<ArticleCard
						title='EcoSlurps Bamboo Cotton Swabs - Tree Planted with Sale '
						imagePath='/articles/2.png'
						rating={4.5}
						priceCad={12.99}
					/>
					<ArticleCard
						title='10 Pcs Bamboo Toothbrush, BPA Free Soft Bristle Toothbrush'
						imagePath='/articles/3.png'
						rating={4.5}
						priceCad={11.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>

					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
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

				<Typography variant='h5' component='h2' sx={{ mb: 2, mt: 3 }}>
					More Products
				</Typography>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "repeat(2, 1fr)",
							sm: "repeat(3, 1fr)",
							md: "repeat(4, 1fr)",
							lg: "repeat(6, 1fr)",
						},
						gap: 2,
					}}
				>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
					<ArticleCard
						title='Eco-Friendly Placeholder'
						imagePath='/articles/placeholder.png'
						rating={4.5}
						priceCad={10.99}
					/>
				</Box>
			</Container>
		</main>
	);
}
