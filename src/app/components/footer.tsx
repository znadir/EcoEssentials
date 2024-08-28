import { Box, Container, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
	return (
		<Box sx={{ bgcolor: "#e8e8e8" }}>
			<Container
				maxWidth='xl'
				sx={{
					display: "flex",
					p: 2,
					justifyContent: "space-between",
					"& a": { display: "block", mb: 1 },
				}}
			>
				<Box
					sx={{
						display: "flex",
						gap: { xs: 3, md: 10 },
						flexDirection: { xs: "column", md: "row" },
					}}
				>
					<Box>
						<Link href='/' style={{ display: "block" }}>
							<Image src='/logo.svg' alt='Eco Essentials' width={179} height={44.15} />
						</Link>
					</Box>
					<Box>
						<Typography variant='h6' sx={{ mb: 1 }}>
							Eco Essentials
						</Typography>
						<Link href='#'>About</Link>
						<Link href='#'>Contact</Link>
					</Box>
					<Box>
						<Typography variant='h6' sx={{ mb: 1 }}>
							Legal
						</Typography>
						<Link href='#'>Terms of service</Link>
						<Link href='#'>Privacy policy</Link>
					</Box>
				</Box>

				<Box sx={{ alignContent: "end" }}>
					<Box sx={{ display: "flex" }}>
						<IconButton>
							<XIcon />
						</IconButton>

						<IconButton>
							<InstagramIcon />
						</IconButton>

						<IconButton>
							<FacebookIcon />
						</IconButton>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
