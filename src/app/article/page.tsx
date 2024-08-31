import { Box, Breadcrumbs, Card, CardMedia, Container, Link, Typography } from "@mui/material";
import Image from "next/image";

export default function Page() {
	return (
		<main>
			<Container maxWidth='xl'>
				<Breadcrumbs sx={{ mt: 3 }}>
					<Link underline='hover' color='inherit' href='/'>
						Home
					</Link>
					<Link underline='hover' color='inherit' href='#'>
						Category
					</Link>
					<Typography sx={{ color: "text.primary" }}>Ecozone Rinse Aid, Natural...</Typography>
				</Breadcrumbs>

				<Box
					sx={{
						display: "flex",
						gap: 5,
						flexDirection: { xs: "column", md: "row" },
						mt: 2,
					}}
				>
					<Card>
						<CardMedia component='img' image='/articles/1.png' alt='' />
						<Box sx={{ display: "flex" }}>
							<Image src='/articles/1.png' alt='' width={80} height={80} />
						</Box>
					</Card>
					<Box>
						<Typography component='h1' variant='h5'>
							Ecozone Rinse Aid, Natural Rinsing Aid for Dishwashers, Dry & Shine
						</Typography>
					</Box>
				</Box>
			</Container>
		</main>
	);
}
