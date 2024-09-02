const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export const tryCatch = (fn: Function) => async (req: Request) => {
	try {
		return await fn(req);
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Something went wrong." }, { status: 500 });
	}
};

export async function signJwt(payload: any) {
	return await jwt.sign(payload, process.env.JWT_SECRET);
}
