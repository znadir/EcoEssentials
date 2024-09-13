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
import { Suspense, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useSearchParams } from "next/navigation";
import ErrorCard from "../components/errorcard";
import Loader from "../components/loader";
import useGetSWR from "../lib/useGetSWR";
import ArticleCard from "../components/articlecard";

interface FilterState {
	fashion: boolean;
	zeroWaste: boolean;
	ecoHome: boolean;
	personalCare: boolean;
	wellness: boolean;
	refurbished: boolean;
	new: boolean;
}

function SearchResults({
	maxPrice,
	minPrice,
	filterState,
}: {
	maxPrice: number;
	minPrice: number;
	filterState: FilterState;
}) {
	const searchParams = useSearchParams();
	const query = searchParams.get("query");

	const { data, isLoading, error } = useGetSWR(
		`/api/articles?query=${query}&minPrice=${minPrice}&maxPrice=${
			maxPrice || 999999999
		}&category=${Object.entries(filterState)
			.filter(([, value]) => value)
			.map(([key]) => key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase())
			.join(",")}`
	);

	return (
		<>
			<Typography variant='h5' component='h2' sx={{ mb: 2 }}>
				Search for : {query}
			</Typography>
			{isLoading ? (
				<Loader />
			) : error ? (
				<ErrorCard />
			) : (
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
							title={article.title.substring(0, 70) + (article.title.length > 70 ? "..." : "")}
							imagePath={article.images[0]}
							rating={article.rating}
							priceCad={Number(article.price).toFixed(2)}
							href={`/article/${article.slug}`}
						/>
					))}
				</Box>
			)}
		</>
	);
}

export default function Search() {
	const [showFilters, setShowFilters] = useState(false);

	const [filterState, setFilterState] = useState({
		fashion: false,
		zeroWaste: false,
		ecoHome: false,
		personalCare: false,
		wellness: false,
		refurbished: false,
		new: false,
	});

	const {
		fashion,
		zeroWaste,
		ecoHome,
		personalCare,
		wellness,
		refurbished,
		new: isnew,
	} = filterState;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterState({
			...filterState,
			[event.target.name]: event.target.checked,
		});
	};

	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);

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
							<FormControlLabel
								control={<Checkbox checked={fashion} onChange={handleChange} />}
								label='Fashion'
								name='fashion'
							/>
							<FormControlLabel
								control={<Checkbox checked={zeroWaste} onChange={handleChange} />}
								label='Zero Waste'
								name='zeroWaste'
							/>
							<FormControlLabel
								control={<Checkbox checked={ecoHome} onChange={handleChange} />}
								label='Eco Home'
								name='ecoHome'
							/>
							<FormControlLabel
								control={<Checkbox checked={personalCare} onChange={handleChange} />}
								label='Personal Care'
								name='personalCare'
							/>
							<FormControlLabel
								control={<Checkbox checked={wellness} onChange={handleChange} />}
								label='Wellness'
								name='wellness'
							/>
						</FormGroup>

						<Typography
							variant='subtitle1'
							component='div'
							sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
						>
							Price ($)
						</Typography>

						<Box sx={{ display: "flex", gap: 1, mr: 2 }}>
							<TextField
								label='Min'
								value={minPrice}
								onChange={(e) =>
									setMinPrice(Number(e.target.value) > 0 ? Number(e.target.value) : 0)
								}
								type='number'
								variant='standard'
							/>
							<TextField
								label='Max'
								value={maxPrice}
								onChange={(e) =>
									setMaxPrice(Number(e.target.value) > 0 ? Number(e.target.value) : 0)
								}
								type='number'
								variant='standard'
							/>
						</Box>

						<Typography
							variant='subtitle1'
							component='div'
							sx={{ mt: 2, mb: 1, fontWeight: "medium" }}
						>
							Condition
						</Typography>

						<FormGroup>
							<FormControlLabel
								control={<Checkbox checked={refurbished} onChange={handleChange} />}
								name='refurbished'
								label='Refurbished'
							/>
							<FormControlLabel
								control={<Checkbox checked={isnew} onChange={handleChange} />}
								name='new'
								label='New'
							/>
						</FormGroup>
					</Box>
				</Box>
				<Box sx={{ flex: 1 }}>
					<Suspense>
						<SearchResults maxPrice={maxPrice} minPrice={minPrice} filterState={filterState} />
					</Suspense>
				</Box>
			</Container>
		</main>
	);
}
