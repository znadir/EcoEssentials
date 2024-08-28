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
						<Container maxWidth='xl' sx={{ my: 1 }}>
							<Toolbar>
								<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
									<Box sx={{ display: "flex", flex: 1 }}>
										<Image src='/logo.svg' alt='Eco Essentials' width={221} height={54.51} />

										<Paper
											component='form'
											sx={{
												p: "2px 4px",
												display: "flex",
												alignItems: "center",
												width: "100%",
												mx: 3,
											}}
										>
											<InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search Eco Essentials' />
											<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
												<SearchIcon />
											</IconButton>
										</Paper>
									</Box>

									<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
										<Button
											variant='contained'
											size='medium'
											color='success'
											startIcon={<AccountCircleIcon />}
										>
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
							</Toolbar>
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
