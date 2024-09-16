import { NextResponse, NextRequest } from "next/server";
import prisma from "./lib/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}

export const tryCatch =
	(fn: Function) =>
	async (req: NextRequest, other: any = undefined) => {
		try {
			return await fn(req, other);
		} catch (error) {
			if (error instanceof NextResponse) {
				return error;
			}

			console.error(error);
			return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
		}
	};

export async function signJwt(payload: any) {
	const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

	const token = await new jose.SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setIssuer("issuer")
		.setAudience("audience")
		.sign(secretKey);
	return token;
}

export async function verifyJwt(token: string) {
	const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

	const { payload, protectedHeader } = await jose.jwtVerify(token, secretKey, {
		issuer: "issuer",
		audience: "audience",
	});

	return payload;
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

	let jwt = null;

	try {
		jwt = (await verifyJwt(authToken)) as { id: string };
	} catch (error) {
		return null;
	}

	if (typeof jwt !== "object") {
		return null;
	}

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
