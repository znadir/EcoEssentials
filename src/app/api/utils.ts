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

export async function verifyHcaptchaToken(token: string) {
	const res = await fetch("https://hcaptcha.com/siteverify", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET}`,
	});

	const data = await res.json();

	return data.success;
}
