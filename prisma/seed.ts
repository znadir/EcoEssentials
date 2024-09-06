import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const toothbrush = await prisma.article.upsert({
		where: {
			slug: "bio-toothbrush",
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
	const spoons = await prisma.article.upsert({
		where: {
			slug: "compostable-spoons",
		},
		update: {},
		create: {
			slug: "compostable-spoons",
			title:
				"100% Compostable Spoons - 500 Large Disposable Utensils (6.5 in.) Bulk Size Eco Friendly Durable and Heat Resistant Alternative to Plastic Spoons with Convenient Tray",
			description:
				"\n\n✔️ ECO FRIENDLY TESTED / BPI CERTIFIED 100% COMPOSTABLE - Our eco cutlery set is certified by Biodegradable Product Institute and TUV which complies with USA and European ASTM D6400 & EN13432 High Standards. Ensure environmental friendliness by accepting no lower standard than BPI Certified Compostable Utensils made from Renewable and Sustainable Plant Resources - ZERO WASTE. ZERO GUILT. All contents including recyclable packaging are PLASTIC FREE!\n\n✔️ ALL NATURAL PLANT BASED / ALL SAFE - Enjoy your food with Non-GMO Corn Based Cutlery made in a registered facility. This renewable resource (corn) is grown and harvested ethically right here in the USA. No BPA, Chlorine or Toxic Chemicals that may be found in disposable plastic utensils. No Risk of Splinters or Popsicle after taste while eating or tasting like with Wooden Utensils.\n\n✔️ 60 DAY MONEY BACK GUARANTEE - We believe you will be totally satisfied by our safe, environmentally friendly tableware. Perfect for Corporate, Camping, Picnics, Lunches, Catering, BBQs, Party, Wedding and Restaurants. If not, we will gladly give you a full refund! Proudly based in San Diego, CA.",
			price: 68.55,
			images: ["https://i.ibb.co/NL8yscy/cuillerers.png"],
			categories: ["kitchen", "utensils"],
		},
	});
	console.log({ toothbrush, spoons });
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
