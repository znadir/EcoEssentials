import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Image from "next/image";
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	InputBase,
	Paper,
	Toolbar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Eco Essentials",
	description: "Sustainable products for a better future",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<header>
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
										sx={{
											p: "0px 4px",
											display: "flex",
											alignItems: "center",
											width: "100%",
											mx: 3,
											borderRadius: 2,
										}}
									>
										<InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search Eco Essentials' />
										<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
											<SearchIcon />
										</IconButton>
									</Paper>
								</Box>

								<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
									<Button variant='contained' size='medium' startIcon={<AccountCircleIcon />}>
										Account
									</Button>
									<Button
										variant='contained'
										size='medium'
										color='secondary'
										startIcon={<ShoppingCartIcon />}
									>
										Cart
									</Button>
								</Box>
							</Box>
						</Container>
					</AppBar>
				</header>

				<AppRouterCacheProvider options={{ key: "css" }}>
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
