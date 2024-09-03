import { tryCatch } from "@/app/utils";
import prisma from "@/app/lib/prisma";

export const GET = tryCatch(async (request: Request, { params }: { params: { id: string } }) => {
	const articleId = params.id;

	const article = await prisma.article.findUnique({ where: { id: articleId } });

	return Response.json({
		article,
	});
});
