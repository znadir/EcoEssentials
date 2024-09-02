import { NextResponse, NextRequest } from "next/server";
import prisma from "./lib/prisma";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}

export const tryCatch = (fn: Function) => async (req: NextRequest) => {
	try {
		return await fn(req);
	} catch (error) {
		if (error instanceof NextResponse) {
			return error;
		}

		console.error(error);
		return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
	}
};

export async function signJwt(payload: any) {
	return await jwt.sign(payload, process.env.JWT_SECRET);
}

export async function verifyJwt(token: string) {
	return await jwt.verify(token, process.env.JWT_SECRET);
}

export async function getUserId(req: NextRequest) {
	const authToken =
		req.cookies.get("token")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");

	if (!authToken) {
		return null;
	}

	if (process.env.NODE_ENV == "test") {
		return "test";
	}

	const jwt = await verifyJwt(authToken);
	const { id } = jwt;

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	return user?.id || null;
}

export async function protectedUserId(req: NextRequest) {
	const userId = await getUserId(req);

	if (!userId) {
		throw NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	return userId as string;
}
