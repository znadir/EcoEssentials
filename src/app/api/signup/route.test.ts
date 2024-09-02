/**
 * @jest-environment node
 */
import prisma from "@/app/lib/prisma";
import { POST } from "./route";

jest.mock("@/app/lib/prisma", () => ({
	__esModule: true,
	default: {
		user: {
			findUnique: jest.fn(),
			create: jest.fn(),
		},
	},
}));

it("should signup the user", async () => {
	const newUser = {
		name: "john",
		firstName: "patrick",
		email: "johnpatricke54@kmail.com",
		password: "abc",
		receiveEmails: false,
	};
	// mock the request
	(prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
	(prisma.user.create as jest.Mock).mockResolvedValue(newUser);

	const response = await POST({ json: async () => newUser } as any);
	const body = await response.json();

	expect(response.status).toBe(201);
});
