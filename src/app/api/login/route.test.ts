/**
 * @jest-environment node
 */
import { POST } from "./route";
import { prismaMock } from "@/app/lib/singleton";
import { hashPassword } from "@/app/utils";

it("should login the user", async () => {
	const credentials = {
		email: "johnleboss@gmail.com",
		password: "abc",
	};

	const hashedPassword = await hashPassword(credentials.password);

	// mock the request
	prismaMock.user.findUnique.mockResolvedValue({
		id: "abc",
		firstName: "john",
		name: "leboss",
		email: credentials.email,
		passwordHash: hashedPassword,
		receiveEmails: false,
	});

	const response = await POST({ json: async () => credentials } as any);

	const body = await response.json();

	expect(response.status).toBe(200);
	expect(body.message).toBe("Logged in.");
	expect(body.token).toBeTruthy();
});
