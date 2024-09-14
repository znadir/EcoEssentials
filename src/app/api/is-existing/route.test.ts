/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { GET } from "./route";
import { prismaMock } from "@/app/lib/singleton";

it("should tell an email is existing", async () => {
	const email = "lol@gmail.com";

	prismaMock.user.findUnique.mockResolvedValue({
		id: "abc",
		firstName: "john",
		name: "leboss",
		email: email,
		passwordHash: "abc",
		receiveEmails: false,
	});

	const nextRequest = new NextRequest("http://localhost/api?email=" + email, {
		method: "GET",
	});

	const response = await GET(nextRequest);

	const body = await response.json();

	expect(response.status).toBe(200);
	expect(body.isExisting).toBe(true);
});

it("should tell an email is not existing", async () => {
	const email = "lol@gmail.com";

	prismaMock.user.findUnique.mockResolvedValue(null);

	const nextRequest = new NextRequest("http://localhost/api?email=" + email, {
		method: "GET",
	});

	const response = await GET(nextRequest);

	const body = await response.json();

	expect(response.status).toBe(200);
	expect(body.isExisting).toBe(false);
});
