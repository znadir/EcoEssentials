import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
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
			<CircularProgress />
		</Box>
	);
}
