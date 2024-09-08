import prisma from "@/app/lib/prisma";

export async function getReviewsAvg(articleId: string) {
	const ratingAgg = await prisma.review.aggregate({
		where: { articleId },
		_avg: { stars: true },
	});

	const rating = ratingAgg._avg.stars || 0;

	const ceiledRating = Math.ceil(rating / 0.5) * 0.5;

	return ceiledRating;
}
