import { updateAccountSchema } from "@/schemas/accountSchema";
import { updateAccountController } from "@/useCases/Account/UpdateAccount";
import { ensureAuthenticated } from "@/utils/tokenHandler";
import { z } from "zod";

export async function PATCH(request: Request, response: Response) {
  const isAuthenticated = await ensureAuthenticated(request);
  if (!isAuthenticated) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();

    updateAccountSchema.parse(body);
    return await updateAccountController.handle(body, response);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(
        { message: err.errors[0].message },
        {
          status: 400,
        }
      );
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
