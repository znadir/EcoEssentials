"use client";

import Image from "next/image";
import { AppBar, Box, Button, Container, IconButton, InputBase, Paper, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/app/lib/hooks";
import { selectCart } from "../lib/features/cartSlice";

export default function NavBar() {
	const router = useRouter();
	const [searchText, setSearchText] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push(`/search?query=${encodeURIComponent(searchText)}`);
		setSearchText("");
	};

	const cart = useAppSelector(selectCart);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		if (!cart) return;

		let qty = 0;

		cart.forEach((item) => {
			qty += item.qty;
		});

		setCartCount(qty);
	}, [cart]);

	return (
		<>
			<AppBar position='sticky' color='default'>
				<Container maxWidth='xl' sx={{ my: { xs: 1, md: 2 } }}>
					{/* Mobile NavBar */}
					<Box sx={{ display: { xs: "block", md: "none" } }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<Link href='/' style={{ display: "block" }}>
								<Image src='/logo.svg' alt='Eco Essentials' width={179} height={44.15} />
							</Link>

							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<IconButton>
									<AccountCircleIcon />
								</IconButton>
								<IconButton>
									<ShoppingCartIcon />
								</IconButton>
							</Box>
						</Box>

						<Paper
							component='form'
							sx={{
								p: "0px 4px",
								display: "flex",
								alignItems: "center",
								width: "100%",
								borderRadius: 2,
							}}
						>
							<InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search Eco Essentials' />
							<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
								<SearchIcon />
							</IconButton>
						</Paper>
					</Box>

					{/* Desktop NavBar */}
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<Box sx={{ display: "flex", flex: 1 }}>
							<Link href='/' style={{ display: "block" }}>
								<Image src='/logo.svg' alt='Eco Essentials' width={179} height={44.15} />
							</Link>
							<Paper
								component='form'
								onSubmit={handleSubmit}
								sx={{
									p: "0px 4px",
									display: "flex",
									alignItems: "center",
									width: "100%",
									mx: 3,
									borderRadius: 2,
								}}
							>
								<InputBase
									sx={{ ml: 1, flex: 1 }}
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									placeholder='Search Eco Essentials'
								/>
								<IconButton type='submit' sx={{ p: "10px" }} aria-label='search'>
									<SearchIcon />
								</IconButton>
							</Paper>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<Link href='/login'>
								<Button variant='contained' size='medium' startIcon={<AccountCircleIcon />}>
									Login/Sign Up
								</Button>
							</Link>

							<Badge badgeContent={cartCount} color='primary'>
								<Link href='/cart'>
									<Button
										variant='contained'
										size='medium'
										color='secondary'
										startIcon={<ShoppingCartIcon />}
									>
										Cart
									</Button>
								</Link>
							</Badge>
						</Box>
					</Box>
				</Container>
			</AppBar>
		</>
	);
}
