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

const labels: { [index: string]: string } = {
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

export default function Article() {
	const rating = 4.5;
	const priceCad = 10.99;

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
						gap: { xs: 2, md: 5 },
						flexDirection: { xs: "column", md: "row" },
						mt: 2,
					}}
				>
					<Card sx={{ flex: 2 }}>
						<CardMedia component='img' image='/articles/1.png' alt='' />
						<Box sx={{ display: "flex" }}>
							<Image src='/articles/1.png' alt='' width={80} height={80} />
						</Box>
					</Card>
					<Box sx={{ flex: 5 }}>
						<Typography component='h1' variant='h5' sx={{ mb: 1 }}>
							Ecozone Rinse Aid, Natural Rinsing Aid for Dishwashers, Dry & Shine
						</Typography>

						<Box sx={{ width: 200, display: "flex", alignItems: "center", mb: 2 }}>
							<Rating value={rating} precision={0.5} readOnly />
							<Box sx={{ ml: 2 }}>{labels[rating]}</Box>
						</Box>

						<Typography variant='h5' sx={{ mb: 2 }} color='success'>
							<EnergySavingsLeafIcon /> CA${priceCad}
						</Typography>
						<Button startIcon={<AddShoppingCartIcon />} variant='contained'>
							Add to cart
						</Button>

						<Typography component='p' variant='body1' sx={{ mt: 2 }} color='text.secondary'>
							Ecozone want to reduce the amount of toxic chemicals you live with. Homes should be
							safe, clean places for people to flourish, not germs. But they don’t see why giving
							dirt the heave-ho means letting loose all manner of planet-zapping toxins.
							<br />
							<br />
							For them, being green’s not about attaining some elitist or hippy ideal. Respecting
							the environment can be a way of living every day. By giving you planet-friendly
							solutions to your household problems, they hope you’ll be able to make choices that
							are better for you and everyone else, the world over.
							<br />
							<br />
							For sparkling glasses, shiny dishes and an active quick dry. Use for sparkling glasses
							and shiny dishes. The natural ingredients in the formula help to clear any unwanted
							particles, reducing smearing and streaking without the use of harsh chemicals.For best
							results use with Ecozone Dishwasher Tabs for a fresh, brilliant finish every time you
							wash. Suitable for use with septic tanks, this product has ben produce
						</Typography>
					</Box>
				</Box>
			</Container>
		</main>
	);
}
