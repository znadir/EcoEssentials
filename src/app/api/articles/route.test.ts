/**
 * @jest-environment node
 */
import { GET } from "./route";
import { prismaMock } from "@/app/lib/singleton";

it("should return articles", async () => {
	const articles = [
		{
			id: "abc",
			title: "hello world",
			description: "this is a description",
			price: 100,
			images: [],
			reviews: [],
			categories: [],
			user: null,
			userId: null,
		},
	];

	prismaMock.article.findMany.mockResolvedValue(articles);

	const response = await GET({} as any);
	const body = await response.json();

	expect(response.status).toBe(200);
	expect(body.articles).toEqual(articles);
});
