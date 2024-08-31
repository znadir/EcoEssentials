import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	TextField,
	Typography,
} from "@mui/material";
import ArticleCard from "../components/articlecard";

export default function Search() {
	return (
		<main>
			<Container
				maxWidth='xl'
				sx={{
					display: "flex",
					gap: 2,
					flexDirection: { xs: "column", md: "row" },
					mt: 3,
				}}
			>
				<Box
					sx={{
						width: { xs: "100%", md: "450px" },
						borderRight: { md: 1 },
						borderColor: { md: "grey.300" },
					}}
				>
					<Typography variant='h5' component='div' sx={{ mb: 2 }}>
						Filters
					</Typography>

					<Typography variant='subtitle1' component='div' sx={{ mb: 1, fontWeight: "medium" }}>
						Categories
					</Typography>

					<FormGroup>
						<FormControlLabel control={<Checkbox />} label='Fashion' />
						<FormControlLabel control={<Checkbox />} label='Zero Waste' />
						<FormControlLabel control={<Checkbox />} label='Eco Home' />
						<FormControlLabel control={<Checkbox />} label='Personal Care' />
						<FormControlLabel control={<Checkbox />} label='Wellness' />
					</FormGroup>

					<Typography
						variant='subtitle1'
						component='div'
						sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
					>
						Price ($)
					</Typography>

					<Box sx={{ display: "flex", gap: 1, mr: 1 }}>
						<TextField label='Min' type='number' variant='standard' />
						<TextField label='Max' type='number' variant='standard' />
					</Box>

					<Typography
						variant='subtitle1'
						component='div'
						sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
					>
						Condition
					</Typography>

					<FormGroup>
						<FormControlLabel control={<Checkbox />} label='Refurbished' />
						<FormControlLabel control={<Checkbox />} label='New' />
					</FormGroup>
				</Box>
				<Box>
					<Typography variant='h5' component='h2' sx={{ mb: 2 }}>
						Search for : Test
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
							gap: 3,
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
				</Box>
			</Container>
		</main>
	);
}
