import { tryCatch } from "@/app/utils";
import prisma from "@/app/lib/prisma";
import { type NextRequest } from "next/server";
import { getReviewsAvg } from "@/app/api/utils";
import { Prisma } from "@prisma/client";

export const GET = tryCatch(async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("query");
	const category = searchParams.get("category");
	const minPrice = searchParams.get("minPrice");
	const maxPrice = searchParams.get("maxPrice");
	const slugs = searchParams.get("slugs");

	const categories = category ? category.split(",") : null;

	const ANDConditions = [];
	const ORConditions = [];

	if (query) {
		ORConditions.push({
			title: {
				contains: query,
				mode: Prisma.QueryMode.insensitive,
			},
		});

		ORConditions.push({
			description: {
				contains: query,
				mode: Prisma.QueryMode.insensitive,
			},
		});
	}

	if (categories) {
		ANDConditions.push({
			categories: {
				hasSome: categories,
			},
		});
	}

	if (slugs) {
		ANDConditions.push({
			slug: {
				in: slugs.split(","),
			},
		});
	}

	ANDConditions.push({
		price: {
			gte: minPrice ? parseInt(minPrice, 10) : undefined,
			lte: maxPrice ? parseInt(maxPrice, 10) : undefined,
		},
	});

	const articles = await prisma.article.findMany({
		where: {
			AND: ANDConditions,
			OR: ORConditions,
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
