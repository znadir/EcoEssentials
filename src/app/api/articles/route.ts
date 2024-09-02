import { tryCatch } from "@/app/utils";
import prisma from "@/app/lib/prisma";

export const GET = tryCatch(async () => {
	const articles = await prisma.article.findMany();

	return Response.json({
		articles,
	});
});
