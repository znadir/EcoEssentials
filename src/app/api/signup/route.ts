import prisma from "@/app/lib/prisma";
import { hashPassword, signJwt, tryCatch } from "@/app/utils";
import { NextRequest } from "next/server";
import { verifyHcaptchaToken } from "../utils";

export const POST = tryCatch(async (request: NextRequest) => {
	// get body params
	const { name, firstName, email, password, receiveEmails, captchaToken } = await request.json();

	if (!name || !firstName || !email || !password) {
		return Response.json({ message: "Missing required fields" }, { status: 400 });
	}

	// verify hcaptcha token
	if (process.env.NODE_ENV !== "test") {
		const hcaptchaSuccess = await verifyHcaptchaToken(captchaToken);

		if (!hcaptchaSuccess) {
			return Response.json({ message: "Invalid captcha. Please try again" }, { status: 400 });
		}
	}

	// verify name and firstName arent empty
	if (name.trim() === "" || firstName.trim() === "") {
		return Response.json({ message: "Name and first name cannot be empty" }, { status: 400 });
	}

	// verify values arent too long
	if (name.length > 50 || firstName.length > 50 || email.length > 50) {
		return Response.json(
			{ message: "Name, First Name and Emails can't be longer than 50 characters" },
			{ status: 400 }
		);
	}

	// verify if email is valid
	if (
		!String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	) {
		return Response.json({ message: "Invalid email" }, { status: 400 });
	}

	// verify if password is strong enough
	if (password.length < 8) {
		return Response.json(
			{ message: "Password too short. Must be at least 8 characters." },
			{ status: 400 }
		);
	}

	// verify if email is already in use
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (user) {
		return Response.json({ message: "Email already in use" }, { status: 400 });
	}

	const passwordHash = await hashPassword(password);

	// create user
	const dbUser = await prisma.user.create({
		data: {
			name,
			firstName,
			email,
			passwordHash,
			receiveEmails,
		},
	});

	// create session
	const token = await signJwt({ id: dbUser.id });

	return Response.json({ message: "User created", token }, { status: 201 });
});
