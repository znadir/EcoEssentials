import { Box, Button, Card, Typography } from "@mui/material";

export default function ErrorCard() {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "300px",
				width: "100%",
			}}
		>
			<Card sx={{ p: 2 }}>
				<Typography variant='h6'>Error fetching data!</Typography>
				<Typography variant='body1'>Please try again later or contact support</Typography>

				<Button sx={{ mt: 2 }} variant='contained' color='primary'>
					Try again
				</Button>
			</Card>
		</Box>
	);
}
