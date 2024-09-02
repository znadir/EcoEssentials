/**
 * @jest-environment node
 */
import { GET, PATCH } from "./route";
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

it("should update info of the user", async () => {
	const user = {
		id: "test",
		firstName: "john",
		name: "leboss",
		email: "johnleboss@gmail.com",
		passwordHash: "abc",
		receiveEmails: false,
	};

	const updateRequest = {
		name: "john",
		firstName: "bruh",
		email: "johnbruh@mail.com",
		receiveEmails: true,
	};

	prismaMock.user.update.mockResolvedValue({ ...user, ...updateRequest });

	const nextRequest = new NextRequest("http://localhost/api/account", {
		method: "PATCH",
		headers: {
			cookie: "token=test",
		},
		body: JSON.stringify(updateRequest),
	});

	const response = await PATCH(nextRequest);
	const body = await response.json();

	expect(body.user).toEqual({ ...user, ...updateRequest });
});
