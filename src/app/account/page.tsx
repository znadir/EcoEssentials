"use client";
import { Box, Button, Card, Container, FormControl, TextField, Typography } from "@mui/material";
import useGetSWR from "../lib/useGetSWR";
import ErrorCard from "../components/errorcard";
import Loader from "../components/loader";
import { useState } from "react";

export default function Account() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { data, error, isLoading } = useGetSWR("/api/account", (data) => {
		setFirstName(data.user.firstName);
		setLastName(data.user.name);
		setEmail(data.user.email);
	});

	return isLoading ? (
		<Loader />
	) : error ? (
		<ErrorCard />
	) : (
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
							<TextField
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								label='First Name'
								fullWidth
							/>
							<TextField
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								label='Last Name'
								fullWidth
							/>
						</Box>

						<TextField
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							label='Email'
							fullWidth
						/>
						<TextField
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							label='Password'
							fullWidth
						/>

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
