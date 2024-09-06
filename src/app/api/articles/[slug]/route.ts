import { tryCatch } from "@/app/utils";
import prisma from "@/app/lib/prisma";

export const GET = tryCatch(async (request: Request, { params }: { params: { slug: string } }) => {
	const artSlug = params.slug;

	const article = await prisma.article.findUnique({ where: { slug: artSlug } });

	return Response.json({
		article,
	});
});
