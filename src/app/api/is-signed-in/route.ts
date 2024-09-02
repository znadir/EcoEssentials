import { tryCatch } from "@/app/utils";
import { NextRequest } from "next/server";
import { getUserId } from "@/app/utils";

export const GET = tryCatch(async (request: NextRequest) => {
	const userId = await getUserId(request);

	return Response.json({
		message: "ok",
		userId,
	});
});
