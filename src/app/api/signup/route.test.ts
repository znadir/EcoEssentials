/**
 * @jest-environment node
 */
import { POST } from "./route";
import { prismaMock } from "@/app/lib/singleton";

it("should signup the user", async () => {
	const newUser = {
		name: "john",
		firstName: "patrick",
		email: "johnpatricke54@kmail.com",
		password: "12345678",
		receiveEmails: false,
	};
	// mock the request
	prismaMock.user.findUnique.mockResolvedValue(null);
	const { password, ...newUserWithoutPass } = newUser;
	prismaMock.user.create.mockResolvedValue({
		id: "abc",
		...newUserWithoutPass,
		passwordHash: "abc",
	});

	const response = await POST({ json: async () => newUser } as any);
	const body = await response.json();

	expect(response.status).toBe(201);
	expect(body.message).toBe("User created");
	expect(body.token).toBeTruthy();
});
