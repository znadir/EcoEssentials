import {
	Box,
	Button,
	Card,
	Checkbox,
	Container,
	FormControl,
	FormControlLabel,
	TextField,
	Typography,
} from "@mui/material";
import Link from "next/link";

export default function LoginSignup() {
	return (
		<Container
			maxWidth='xl'
			sx={{
				mt: 3,
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Card variant='outlined' sx={{ p: 3, width: "100%", maxWidth: "850px" }}>
					<Typography variant='h6' sx={{ mb: 2 }}>
						Login/Sign Up
					</Typography>

					<FormControl sx={{ display: "flex", gap: 1, mb: 2 }} fullWidth>
						<Box sx={{ display: "flex", gap: 1, width: "100%" }}>
							<TextField label='First Name' fullWidth />
							<TextField label='Last Name' fullWidth />
						</Box>

						<TextField label='Email' fullWidth />
						<TextField label='Password' fullWidth />
						<TextField label='Confirm Password' fullWidth />
						<FormControlLabel control={<Checkbox />} label='Agree to the Terms and Conditions' />

						<Button
							sx={{ mt: 1, width: "fit-content" }}
							size='large'
							type='submit'
							variant='contained'
						>
							Create Account
						</Button>
					</FormControl>

					<Link href='/login'>Already have an account? Login here.</Link>
				</Card>
			</Box>
		</Container>
	);
}
