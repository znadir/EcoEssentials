import { tryCatch } from "@/app/utils";
import { NextRequest } from "next/server";
import { protectedUserId } from "@/app/utils";
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
