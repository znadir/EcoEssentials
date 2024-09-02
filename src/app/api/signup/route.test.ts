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
		password: "abc",
		receiveEmails: false,
	};
	// mock the request
	prismaMock.user.findUnique.mockResolvedValue(null);
	prismaMock.user.create.mockResolvedValue({ id: "abc", ...newUser });

	const response = await POST({ json: async () => newUser } as any);
	const body = await response.json();

	expect(response.status).toBe(201);
	expect(body.message).toBe("User created");
	expect(body.token).toBeTruthy();
});
