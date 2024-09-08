import { tryCatch } from "@/app/utils";
import prisma from "@/app/lib/prisma";
import { getReviewsAvg } from "@/app/api/utils";

export const GET = tryCatch(async (request: Request, { params }: { params: { slug: string } }) => {
	const artSlug = params.slug;

	const article = await prisma.article.findUnique({
		where: { slug: artSlug },
		include: { reviews: true },
	});

	if (!article) {
		return Response.json({ message: "Article not found" }, { status: 404 });
	}

	const reviewsAvg = await getReviewsAvg(article.id);

	return Response.json({
		article: {
			...article,
			rating: reviewsAvg,
		},
	});
});
