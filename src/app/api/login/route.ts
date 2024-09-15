import prisma from "@/app/lib/prisma";
import { signJwt, tryCatch, comparePassword } from "@/app/utils";
import { NextRequest } from "next/server";
import { verifyHcaptchaToken } from "../utils";

export const POST = tryCatch(async (request: NextRequest) => {
	// get body params
	const { email, password, captchaToken } = await request.json();

	if (!email || !password) {
		return Response.json({ message: "Missing required fields" }, { status: 400 });
	}

	// verify hcaptcha token
	if (process.env.NODE_ENV !== "test") {
		const hcaptchaSuccess = await verifyHcaptchaToken(captchaToken);

		if (!hcaptchaSuccess) {
			return Response.json({ message: "Invalid captcha. Please try again" }, { status: 400 });
		}
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

	// verify if email exists
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	const invalidCredentialsResponse = Response.json(
		{ message: "Invalid credentials" },
		{ status: 401 }
	);

	if (!user) {
		return invalidCredentialsResponse;
	}

	const passMatch = await comparePassword(password, user.passwordHash);

	if (!passMatch) {
		return invalidCredentialsResponse;
	}

	// create session
	const token = await signJwt({ id: user.id });

	return Response.json({ message: "Logged in.", token }, { status: 200 });
});
