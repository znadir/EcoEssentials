import { Box, Container } from "@mui/material";
import Image from "next/image";
import ArticleCard from "./components/articlecard";

export default function Home() {
	return (
		<main>
			<Container maxWidth='xl' sx={{ my: 1 }}>
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

				<h2>New Eco-friendly Products</h2>
				<Box>
					<ArticleCard
						title='Ecozone Rinse Aid, Natural Rinsing Aid for Dishwashers, Dry & Shine'
						imagePath='/articles/1.png'
						rating={4.5}
						priceCad={7.99}
					/>
				</Box>
			</Container>
		</main>
	);
}
