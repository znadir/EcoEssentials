import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const articles = [
		{
			slug: "bio-toothbrush",
			title:
				"Biodegradable Eco-Friendly Natural Bamboo Charcoal Toothbrushes, FSC Certified and PETA Approved - 12 Count ",
			description:
				"★ GO GREEN! – Why fill up landfills with plastic when you don’t have to? Help the environment, and feel better about your mark on this world with Bamboo Toothbrush! It’s the ecological way to not only keep your mouth fresh for just as long as a normal toothbrush, but help the environment at the same time!\n\n★ SMOOTH & NATURAL BAMBOO HANDLE – will never splinter and is water resistant. Stronger and harder than wood, Bamboo is also more durable and healthier than any plastic. No need to dry the handle after use, just rinse your toothbrush and put back into its holder, just like you would with any other old plastic toothbrush.\n\n★100% RECYCLED BIODEGRADABLE PACKAGING – even the packaging is made in craft paper,no worry about it polluting the environment when you throw it away.\n\n★ GUARANTEED – We love this toothbrush, and we’re sure you will to. However, if for any reason you don’t, no worries! Just send it back our way for a full refund of the purchase price. It’s natural quality with an unbeatable guarantee. Why keep looking when you’ve found your solution right here!\n\n★ PACK OF 12 TOOTHBRUSHES – will last your family a year. Buy a pack of 12 toothbrushes for each person in your household.",
			price: 8.49,
			images: ["/articles/ecotoothbrush.png"],
			categories: ["new", "zero-waste", "personal-care"],
			reviews: {
				create: [
					{
						username: "John Doe",
						stars: 4,
						comment: "I love this product! It is amazing. I will definitely buy it again!",
					},
					{
						username: "Jane Doe",
						stars: 1,
						comment: "The toothbrush is not good. It is very hard and it hurts my gums.",
					},
					{
						username: "Alice Doe",
						stars: 5,
						comment: "I love this toothbrush. It is very soft and it cleans my teeth very well.",
					},
				],
			},
		},
		{
			slug: "compostable-spoons",
			title:
				"100% Compostable Spoons - 500 Large Disposable Utensils (6.5 in.) Bulk Size Eco Friendly Durable and Heat Resistant Alternative to Plastic Spoons with Convenient Tray",
			description:
				"✔️ ECO FRIENDLY TESTED / BPI CERTIFIED 100% COMPOSTABLE - Our eco cutlery set is certified by Biodegradable Product Institute and TUV which complies with USA and European ASTM D6400 & EN13432 High Standards. Ensure environmental friendliness by accepting no lower standard than BPI Certified Compostable Utensils made from Renewable and Sustainable Plant Resources - ZERO WASTE. ZERO GUILT. All contents including recyclable packaging are PLASTIC FREE!\n\n✔️ ALL NATURAL PLANT BASED / ALL SAFE - Enjoy your food with Non-GMO Corn Based Cutlery made in a registered facility. This renewable resource (corn) is grown and harvested ethically right here in the USA. No BPA, Chlorine or Toxic Chemicals that may be found in disposable plastic utensils. No Risk of Splinters or Popsicle after taste while eating or tasting like with Wooden Utensils.\n\n✔️ 60 DAY MONEY BACK GUARANTEE - We believe you will be totally satisfied by our safe, environmentally friendly tableware. Perfect for Corporate, Camping, Picnics, Lunches, Catering, BBQs, Party, Wedding and Restaurants. If not, we will gladly give you a full refund! Proudly based in San Diego, CA.",
			price: 68.55,
			images: ["/articles/spoons.png"],
			categories: ["new", "eco-home"],
			reviews: {
				create: [
					{
						username: "John Doe",
						stars: 4,
						comment: "I love this product! It is amazing. I will definitely buy it again!",
					},
					{
						username: "Jane Doe",
						stars: 1,
						comment: "The spoons are not good. They are very hard and they break easily.",
					},
					{
						username: "Alice Doe",
						stars: 5,
						comment:
							"I love these spoons. They are very durable and they are perfect for my parties.",
					},
				],
			},
		},
		{
			slug: "clean-people",
			title:
				"The Clean People Fabric Softener Sheets - Dryer Sheets - Softens & Removes Static Cling - Vegan Laundry Softener With Essential Oils - Fresh Scent, 120 Pack ",
			description:
				"Our Fabric Softener Dryer Sheet is gentle enough for even the most sensitive skin. Our fabric softener is free of animal products and contains only plant-based ingredients, and recyclable packaging.\n\nThese eco friendly dryer sheets are scientifically formulated with clean ingredients to leave your clothes feeling soft with reduced static cling\n\nOur all dryer sheets have completely plastic free packaging and are powered by plant based ingredients. That means no phosphates, parabens, phthalates, chlorine bleach, artificial dyes, petroleum, ammonia!",
			price: 14.99,
			images: ["/articles/cleanpeople.png"],
			categories: ["new", "personal-care", "fashion"],
			reviews: {
				create: [
					{
						username: "John Doe",
						stars: 4,
						comment: "I love this product! It is amazing. I will definitely buy it again!",
					},
					{
						username: "Jane Doe",
						stars: 2,
						comment: "The fabric softener is not good. It is very hard and it hurts my skin.",
					},
					{
						username: "Alice Doe",
						stars: 5,
						comment: "I love this fabric softener. It is very soft and it smells very well.",
					},
				],
			},
		},
		{
			slug: "airnex",
			title:
				"AIRNEX Biodegradable Natural Kitchen Sponge - Compostable Cellulose and Coconut Walnut Scrubber Sponge - Eco Friendly Sponges for Dishes (12 Pack)",
			description:
				"🍃NATURAL SPONGES FOR DISHES - Airnex's sponges are made with biodegradable white cellulose and scrubbers containing coconut fiber. These plant-based kitchen sponges are a sure way to green-up your kitchen!\n\n🍃THE HEALTHIER WAY OF CLEANING DISHES - Our natural dish sponge can last long without being stinky! Unlike its plastic counterpart, it has porous structure helps it dry up quickly, lessening the chances for illness-causing compounds to breed.\n\n🍃ERGONOMIC SHAPE - Rectangular dishwashing sponges can be a hassle or tiring for you to hold, so we designed this eco friendly dish sponge with a unique S shape for easier use. Lesser risk of straining your hands while cleaning!",
			price: 14.99,
			images: ["/articles/plant-based-sponge.jpg"],
			categories: ["new", "zero-waste", "eco-home"],
			reviews: {
				create: [
					{
						username: "John Doe",
						stars: 4,
						comment: "I love this product! It is amazing. I will definitely buy it again!",
					},
					{
						username: "Jane Doe",
						stars: 1,
						comment: "The sponge is not good. It is very hard and it hurts my hands.",
					},
					{
						username: "Alice Doe",
						stars: 4,
						comment: "I love this sponge. It is very soft and it cleans my dishes very well.",
					},
				],
			},
		},
		{
			slug: "toilet",
			title:
				"Eco Friendly Toilet Cleaner Sheets - Binbata 60 Strips Disposable Quick Foaming Toilet Cleaner Strips, Efficiently Remove Stains & Odors with Ocean Dew Scent, Plastic Free Biodegradable Septic Safe",
			description:
				"-【𝐏𝐎𝐖𝐄𝐑𝐅𝐔𝐋 𝐃𝐄𝐂𝐎𝐍𝐓𝐀𝐌𝐈𝐍𝐀𝐓𝐈𝐎𝐍】Binbata quick foaming toilet cleaner strips with highly efficient active ingredients, the dense foam effectively decomposes stubborn stains such as urine, fecal, and grease stains attached to the toilet surface, forms a long-lasting protective layer after cleaning, prevents dirt and keeps your toilet bright and clean.\n\n- 【𝐎𝐂𝐄𝐀𝐍 𝐃𝐄𝐖 𝐒𝐂𝐄𝐍𝐓】Our liquidless toilet cleaner sheets release the natural ocean dew scent, make the toilet clean and fresh, unlike artificial perfume with pungent smell.\n\n- 【𝐍𝐄𝐔𝐓𝐑𝐀𝐋 & 𝐆𝐄𝐍𝐓𝐋𝐄 𝐇𝐀𝐑𝐌𝐋𝐄𝐒𝐒 𝐈𝐍𝐆𝐑𝐄𝐃𝐈𝐄𝐍𝐓𝐒】The ingredients of our septic safe toilet bowl cleaner sheets are safe, mild and non-irritating. It does not contain any bleach, chlorine or harsh chemicals, scientific descaling without hurting the glaze, so you can use it with confidence.",
			price: 15.99,
			images: ["/articles/toilet-cleaner-strips.png"],
			categories: ["new", "eco-home", "personal-care"],
			reviews: {
				create: [
					{
						username: "John Doe",
						stars: 4,
						comment: "I love this product! It is amazing. I will definitely buy it again!",
					},
					{
						username: "Jane Doe",
						stars: 0,
						comment: "The toilet cleaner is not good. It is very hard and it hurts my nose.",
					},
					{
						username: "Alice Doe",
						stars: 4.5,
						comment: "I love this toilet cleaner. It is very soft and it smells very well.",
					},
				],
			},
		},
		{
			slug: "swedish",
			title:
				"Swedish Dishcloths for Kitchen Dishes, 8 Pack Reusable Cleaning Cloths Replace Paper Towels Swedish Towels Cleaning Rags Eco Friendly Biodegradable for Home Office Wipes",
			description:
				"Swedish Dish Cloths Set: Swedish Kitchen dish cloths include 8 colorful patterns, which are printed for distinguish various use and matching home décor. Each of kitchen towels is 20 x 18 cm/ 8 x 7 inches, maximize drawer space and use this to wipe our counters stove, clean up house spills and easy to throw in washing machine for quick disinfecting.",
			price: 12.99,
			images: ["/articles/swedish-paper.jpg"],
			categories: ["new", "eco-home"],
		},
	];

	for (const article of articles) {
		const articleUpserted = await prisma.article.upsert({
			where: { slug: article.slug },
			update: {},
			create: article,
		});

		console.log({ articleUpserted });
	}
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
