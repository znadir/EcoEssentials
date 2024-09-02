const bcrypt = require("bcrypt");

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export const tryCatch = (fn: Function) => async (req: Request) => {
	try {
		return await fn(req);
	} catch (error) {
		return Response.json({ error: "Something went wrong." }, { status: 500 });
	}
};
