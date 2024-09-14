"use client";

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
import { useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { toast } from "react-toastify";

export default function LoginSignup() {
	const [isLoginDetected, setIsLoginDetected] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [email, setEmail] = useState("");

	const checkEmailExists = async (e: any) => {
		e.preventDefault();
		const res = await fetch("/api/is-existing?email=" + email);

		if (!res.ok) {
			return toast.error("An error occurred. Please try again later.");
		}

		const data = await res.json();

		if (data.isExisting) {
			setIsLogin(true);
			setIsLoginDetected(true);
		} else {
			setIsLogin(false);
			setIsLoginDetected(true);
		}
	};

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
						{!isLoginDetected ? "Login/Sign Up" : isLogin ? "Login" : "Sign Up"}
					</Typography>

					{!isLoginDetected ? (
						<Box
							component='form'
							onSubmit={checkEmailExists}
							sx={{ display: "flex", "flex-direction": "column", gap: 1 }}
						>
							<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
								<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
									<Box
										sx={{
											borderRadius: "100%",
											backgroundColor: "success.light",
											p: 1,
											lineHeight: 1,
										}}
									>
										<LocalShippingIcon fontSize='small' />
									</Box>
									<Typography variant='subtitle1'>Free Shipping</Typography>
								</Box>

								<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
									<Box
										sx={{
											borderRadius: "100%",
											backgroundColor: "success.light",
											p: 1,
											lineHeight: 1,
										}}
									>
										<AssignmentReturnIcon fontSize='small' />
									</Box>
									<Typography variant='subtitle1'>Free Returns</Typography>
								</Box>
							</Box>

							<TextField
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								label='Email'
							/>

							<Button
								sx={{ mt: 1, width: "fit-content" }}
								size='large'
								type='submit'
								variant='contained'
							>
								Continue
							</Button>
						</Box>
					) : isLogin ? (
						<FormControl sx={{ display: "flex", gap: 1 }} fullWidth>
							<TextField label='Email' fullWidth />
							<TextField label='Password' fullWidth />

							<Box sx={{ display: "flex", gap: 1, mt: 1 }}>
								<Button
									sx={{ width: "fit-content" }}
									size='large'
									type='submit'
									variant='contained'
								>
									Login
								</Button>
								<Button
									onClick={() => setIsLoginDetected(false)}
									sx={{ width: "fit-content" }}
									size='large'
									variant='outlined'
								>
									Back
								</Button>
							</Box>
						</FormControl>
					) : (
						<FormControl sx={{ display: "flex", gap: 1 }} fullWidth>
							<TextField value={email} label='Email' fullWidth disabled />
							<Box sx={{ display: "flex", gap: 1, width: "100%" }}>
								<TextField label='First Name' fullWidth />
								<TextField label='Last Name' fullWidth />
							</Box>
							<TextField label='Password' fullWidth />
							<TextField label='Confirm Password' fullWidth />
							<FormControlLabel control={<Checkbox />} label='Agree to the Terms and Conditions' />

							<Box sx={{ display: "flex", gap: 1, mt: 1 }}>
								<Button
									sx={{ width: "fit-content" }}
									size='large'
									type='submit'
									variant='contained'
								>
									Create Account
								</Button>
								<Button
									onClick={() => setIsLoginDetected(false)}
									sx={{ width: "fit-content" }}
									size='large'
									variant='outlined'
								>
									Back
								</Button>
							</Box>
						</FormControl>
					)}
				</Card>
			</Box>
		</Container>
	);
}
