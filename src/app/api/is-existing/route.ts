import { tryCatch } from "@/app/utils";
import { NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

// having an endpoint that checks if email is used
// is generally considered bad, but it could help to do more conversions
export const GET = tryCatch(async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams;
	const email = searchParams.get("email");

	const isExistingEmail =
		email &&
		(await prisma.user.findUnique({
			where: {
				email,
			},
		}));

	return Response.json({
		isExisting: !!isExistingEmail,
	});
});
