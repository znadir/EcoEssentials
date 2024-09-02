/**
 * @jest-environment node
 */
import { GET } from "./route";
import { prismaMock } from "@/app/lib/singleton";
import { NextRequest } from "next/server";

it("should get info of the user", async () => {
	const user = {
		id: "abc",
		firstName: "john",
		name: "leboss",
		email: "johnleboss@gmail.com",
		passwordHash: "abc",
		receiveEmails: false,
	};

	const userWithoutPass = { ...user, passwordHash: undefined };

	prismaMock.user.findUnique.mockResolvedValue(user);

	const nextRequest = new NextRequest("http://localhost/api", {
		method: "GET",
		headers: {
			cookie: "token=test",
		},
	});

	const response = await GET(nextRequest);
	const body = await response.json();

	expect(response.status).toBe(200);
	expect(body.user).toEqual(userWithoutPass);
});
