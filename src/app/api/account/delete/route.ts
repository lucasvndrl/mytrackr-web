import { auth0 } from "@/lib/auth0";
import { deleteAccountController } from "@/useCases/Account/DeleteAccount";
import { ensureAuthenticated } from "@/utils/tokenHandler";

export async function DELETE(request: Request, response: Response) {
  const session = await auth0.getSession();
  if (session?.user) request.headers.set("sub", `${session?.user.sub}`);
  const isAuthenticated = await ensureAuthenticated(request);
  if (!isAuthenticated) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  return await deleteAccountController.handle(request, response);
}
