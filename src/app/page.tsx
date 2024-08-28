import { Box, Button, Container } from "@mui/material";
import Image from "next/image";

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

				<h1>Home</h1>
				<Button variant='text'>Text</Button>
			</Container>
		</main>
	);
}
