import prisma from "@/app/lib/prisma";
import { hashPassword, tryCatch } from "@/app/utils";

export const POST = tryCatch(async (request: Request) => {
	// get body params
	const { name, firstName, email, password, receiveEmails } = await request.json();

	if (!name || !firstName || !email || !password) {
		return Response.json({ error: "Missing required fields" }, { status: 400 });
	}

	// verify if email is valid
	if (
		!String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	) {
		return Response.json({ error: "Invalid email" }, { status: 400 });
	}

	// verify if email is already in use
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (user) {
		return Response.json({ error: "Email already in use" }, { status: 400 });
	}

	const hashedPassword = await hashPassword(password);

	// create user
	await prisma.user.create({
		data: {
			name,
			first_name: firstName,
			email,
			password_hash: hashedPassword,
			receive_emails: receiveEmails,
		},
	});

	return Response.json({ message: "User created" });
});
