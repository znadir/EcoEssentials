import { tryCatch } from "@/app/utils";
import { NextRequest } from "next/server";
import { protectedUserId, hashPassword } from "@/app/utils";
import prisma from "@/app/lib/prisma";

export const GET = tryCatch(async (request: NextRequest) => {
	const userId = await protectedUserId(request);

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	const userWithoutPass = { ...user, passwordHash: undefined };

	return Response.json({
		message: "ok",
		user: userWithoutPass,
	});
});

export const PATCH = tryCatch(async (request: NextRequest) => {
	const userId = await protectedUserId(request);

	const { name, firstName, email, password, receiveEmails } = await request.json();

	if (!name && !firstName && !email && !password) {
		return Response.json({ message: "Missing fields" }, { status: 400 });
	}

	// verify if email is valid
	if (
		email &&
		!String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	) {
		return Response.json({ message: "Invalid email" }, { status: 400 });
	}

	if (password && password.length < 8) {
		return Response.json({ message: "Password too short" }, { status: 400 });
	}

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			name,
			firstName,
			email,
			passwordHash: password ? await hashPassword(password) : undefined,
			receiveEmails,
		},
	});

	const updatedUserWithoutPass = { ...updatedUser, passwordHash: undefined };

	return Response.json({
		message: "User updated",
		user: updatedUserWithoutPass,
	});
});
