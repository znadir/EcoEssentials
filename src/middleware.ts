import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

async function verifyJwt(token: string) {
	const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

	const { payload, protectedHeader } = await jose.jwtVerify(token, secretKey, {
		issuer: "issuer",
		audience: "audience",
	});

	return payload;
}

async function isSignedIn(req: NextRequest) {
	const authToken =
		req.cookies.get("token")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");

	if (!authToken) {
		return false;
	}

	try {
		await verifyJwt(authToken || "");
	} catch (error) {
		return false;
	}

	return true;
}

// nextauth >>>
export async function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const isLoggedIn = await isSignedIn(request);

	if (request.nextUrl.pathname.startsWith("/login") && isLoggedIn) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (request.nextUrl.pathname.startsWith("/account") && !isLoggedIn) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
