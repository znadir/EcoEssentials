import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const toothbrush = await prisma.article.upsert({
		where: {
			slug: "toothbrush",
		},
		update: {},
		create: {
			slug: "bio-toothbrush",
			title:
				"Biodegradable Eco-Friendly Natural Bamboo Charcoal Toothbrushes, FSC Certified and PETA Approved - 12 Count ",
			description:
				"★ GO GREEN! – Why fill up landfills with plastic when you don’t have to? Help the environment, and feel better about your mark on this world with Bamboo Toothbrush! It’s the ecological way to not only keep your mouth fresh for just as long as a normal toothbrush, but help the environment at the same time!\n\n★ SMOOTH & NATURAL BAMBOO HANDLE – will never splinter and is water resistant. Stronger and harder than wood, Bamboo is also more durable and healthier than any plastic. No need to dry the handle after use, just rinse your toothbrush and put back into its holder, just like you would with any other old plastic toothbrush.\n\n★100% RECYCLED BIODEGRADABLE PACKAGING – even the packaging is made in craft paper,no worry about it polluting the environment when you throw it away.\n\n★ GUARANTEED – We love this toothbrush, and we’re sure you will to. However, if for any reason you don’t, no worries! Just send it back our way for a full refund of the purchase price. It’s natural quality with an unbeatable guarantee. Why keep looking when you’ve found your solution right here!\n\n★ PACK OF 12 TOOTHBRUSHES – will last your family a year. Buy a pack of 12 toothbrushes for each person in your household.",
			price: 8.49,
			images: ["https://i.ibb.co/sgyYH67/ecotoothbrush.png"],
			categories: ["health", "hygiene"],
		},
	});
	console.log({ toothbrush });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
