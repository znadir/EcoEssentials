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
import { setCookie } from "../utilsClient";
import { useRouter } from "next/navigation";

export default function LoginSignup() {
	const [isLoginDetected, setIsLoginDetected] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [acceptTerms, setAcceptTerms] = useState(false);

	const router = useRouter();

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

	const createAccount = async (e: any) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return toast.error("Passwords do not match");
		}

		if (!acceptTerms) {
			return toast.error("Please accept the terms and conditions");
		}

		const res = await fetch("/api/signup", {
			method: "POST",
			body: JSON.stringify({
				email,
				firstName,
				name: lastName,
				password,
				receiveEmails: true,
			}),
		});

		const data = await res.json();

		if (res.status === 201) {
			toast.success("Account created successfully. Redirecting...");

			const token = data.token;
			setCookie("token", token, 365);

			router.push("/");
		} else {
			const errorMsg = data.message || "An error occurred. Please try again later.";
			toast.error(errorMsg);
		}
	};

	const comeBack = () => {
		setIsLoginDetected(false);
		setFirstName("");
		setLastName("");
		setPassword("");
		setConfirmPassword("");
		setAcceptTerms(false);
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
									onClick={comeBack}
									sx={{ width: "fit-content" }}
									size='large'
									variant='outlined'
								>
									Back
								</Button>
							</Box>
						</FormControl>
					) : (
						<FormControl
							component='form'
							onSubmit={createAccount}
							sx={{ display: "flex", gap: 1 }}
							fullWidth
						>
							<TextField value={email} label='Email' fullWidth disabled />
							<Box sx={{ display: "flex", gap: 1, width: "100%" }}>
								<TextField
									onChange={(e) => setFirstName(e.target.value)}
									value={firstName}
									label='First Name'
									fullWidth
								/>
								<TextField
									onChange={(e) => setLastName(e.target.value)}
									value={lastName}
									label='Last Name'
									fullWidth
								/>
							</Box>
							<TextField
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								label='Password'
								type='password'
								fullWidth
							/>
							<TextField
								onChange={(e) => setConfirmPassword(e.target.value)}
								value={confirmPassword}
								label='Confirm Password'
								type='password'
								fullWidth
							/>
							<FormControlLabel
								control={
									<Checkbox
										value={acceptTerms}
										onChange={(e) => setAcceptTerms(e.target.checked)}
									/>
								}
								label='Agree to the Terms and Conditions'
							/>

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
									onClick={comeBack}
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
