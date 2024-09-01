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

export default function CreateAccountPage() {
	return (
		<Container
			maxWidth='xl'
			sx={{
				mt: 3,
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Card variant='outlined' sx={{ p: 2, width: "100%", maxWidth: "850px" }}>
					<Typography variant='h6' sx={{ mb: 2 }}>
						Create Account
					</Typography>
					<Typography variant='body1' sx={{ mb: 2 }}>
						Please fill out the following information to create an account.
					</Typography>

					<FormControl sx={{ display: "flex", gap: 1 }} fullWidth>
						<Box sx={{ display: "flex", gap: 1, width: "100%" }}>
							<TextField label='First Name' fullWidth />
							<TextField label='Last Name' fullWidth />
						</Box>

						<TextField label='Email' fullWidth />
						<TextField label='Password' fullWidth />
						<TextField label='Confirm Password' fullWidth />
						<FormControlLabel control={<Checkbox />} label='Agree to the Terms and Conditions' />

						<Button
							sx={{ mt: 2, width: "fit-content" }}
							size='large'
							type='submit'
							variant='contained'
						>
							Create Account
						</Button>
					</FormControl>
				</Card>
			</Box>
		</Container>
	);
}
