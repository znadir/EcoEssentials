import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { Box } from "@mui/material";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

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
		<StoreProvider>
			<html lang='en'>
				<body className={inter.className}>
					<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
						<nav>
							<NavBar />
						</nav>

						<AppRouterCacheProvider options={{ key: "css" }}>
							<ThemeProvider theme={theme}>{children}</ThemeProvider>
						</AppRouterCacheProvider>

						<Box sx={{ flex: 1 }} />

						<Footer />
					</Box>
					<ToastContainer />
				</body>
			</html>
		</StoreProvider>
	);
}
