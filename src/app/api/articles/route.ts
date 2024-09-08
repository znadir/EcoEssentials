import { tryCatch } from "@/app/utils";
import prisma from "@/app/lib/prisma";
import { type NextRequest } from "next/server";
import { getReviewsAvg } from "@/app/api/utils";

export const GET = tryCatch(async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams;
	const category = searchParams.get("category");
	const minPrice = searchParams.get("minPrice");
	const maxPrice = searchParams.get("maxPrice");

	const categories = category ? category.split(",") : null;

	const whereConditions = [];

	if (categories) {
		whereConditions.push({
			categories: {
				hasSome: categories,
			},
		});
	}

	whereConditions.push({
		price: {
			gte: minPrice ? parseInt(minPrice, 10) : undefined,
			lte: maxPrice ? parseInt(maxPrice, 10) : undefined,
		},
	});

	const articles = await prisma.article.findMany({
		where: {
			AND: whereConditions,
		},
	});

	const articlesWithRating = await Promise.all(
		articles.map(async (article) => {
			const rating = await getReviewsAvg(article.id);

			return {
				...article,
				rating,
			};
		})
	);

	return Response.json({
		articles: articlesWithRating,
	});
});
