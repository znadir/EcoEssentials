import { Box, Button, Card, Container, FormControl, TextField, Typography } from "@mui/material";

export default function Account() {
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
						Account
					</Typography>

					<FormControl sx={{ display: "flex", gap: 1 }} fullWidth>
						<Box sx={{ display: "flex", gap: 1, width: "100%" }}>
							<TextField label='First Name' fullWidth />
							<TextField label='Last Name' fullWidth />
						</Box>

						<TextField label='Email' fullWidth />
						<TextField label='Password' fullWidth />

						<Button
							sx={{ mt: 1, width: "fit-content" }}
							size='large'
							type='submit'
							variant='contained'
						>
							Edit Account
						</Button>
					</FormControl>
				</Card>
			</Box>
		</Container>
	);
}
