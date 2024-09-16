"use client";
import { Box, Button, Card, Container, FormControl, TextField, Typography } from "@mui/material";
import useGetSWR from "../lib/useGetSWR";
import ErrorCard from "../components/errorcard";
import Loader from "../components/loader";
import { useState } from "react";
import { deleteCookie } from "../utilsClient";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";

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

	const router = useRouter();
	const { mutate } = useSWRConfig();

	const editAccount = async (e: any) => {
		e.preventDefault();

		const res = await fetch("/api/account", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName,
				name: lastName,
				email,
				password,
			}),
		});

		const data = await res.json();

		if (!res.ok) {
			const errorMsg = data?.message || "An error occurred. Please try again later.";
			return toast.error(errorMsg);
		}

		toast.success("Account edited successfully");
	};

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
				<Card
					onSubmit={editAccount}
					component='form'
					variant='outlined'
					sx={{ p: 3, width: "100%", maxWidth: "850px" }}
				>
					<Typography variant='h6' sx={{ mb: 2 }}>
						Edit Account
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

						<Box sx={{ display: "flex", gap: 1 }}>
							<Button
								sx={{ mt: 1, width: "fit-content" }}
								size='large'
								type='submit'
								variant='contained'
							>
								Edit Account
							</Button>
							<Button
								sx={{ mt: 1, width: "fit-content" }}
								size='large'
								variant='contained'
								color='error'
								onClick={() => {
									deleteCookie("token");
									mutate("/api/is-signed-in");
									router.push("/");
									toast.success("Logged out successfully");
								}}
							>
								Logout
							</Button>
						</Box>
					</FormControl>
				</Card>
			</Box>
		</Container>
	);
}
