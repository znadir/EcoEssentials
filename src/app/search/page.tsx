"use client";
import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import ArticleCard from "../components/articlecard";
import { Suspense, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useSearchParams } from "next/navigation";
import useGetSWR from "../lib/useGetSWR";
import ErrorCard from "../components/errorcard";
import Loader from "../components/loader";

export default function Search() {
	const [showFilters, setShowFilters] = useState(false);

	const searchParams = useSearchParams();
	const query = searchParams.get("query");

	const { data, isLoading, error } = useGetSWR(`/api/articles?query=${query}`);

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
						width: { xs: "100%", md: "251px" },
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant='h6' component='div' sx={{ mb: 2 }}>
							Filters
						</Typography>

						<Box sx={{ display: { xs: "block", md: "none" } }}>
							<IconButton onClick={() => setShowFilters(!showFilters)}>
								{showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</IconButton>
						</Box>
					</Box>

					<Box sx={{ display: { xs: showFilters ? "block" : "none", md: "block", width: "100%" } }}>
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

						<Box sx={{ display: "flex", gap: 1, mr: 2 }}>
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
				</Box>
				<Box sx={{ flex: 1 }}>
					<Typography variant='h5' component='h2' sx={{ mb: 2 }}>
						Search for : <Suspense>{query}</Suspense>
					</Typography>
					{isLoading ? (
						<Loader />
					) : error ? (
						<ErrorCard />
					) : (
						<>
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
								{data.articles.map((article: any) => (
									<ArticleCard
										key={article.id}
										title={
											article.title.substring(0, 70) + (article.title.length > 70 ? "..." : "")
										}
										imagePath={article.images[0]}
										rating={article.rating}
										priceCad={Number(article.price).toFixed(2)}
										href={`/article/${article.slug}`}
									/>
								))}
							</Box>
						</>
					)}
				</Box>
			</Container>
		</main>
	);
}
