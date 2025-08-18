import { getAccountDetailsController } from "@/useCases/Account/GetAccountDetails";
import { ensureAuthenticated } from "@/utils/tokenHandler";

export async function GET(request: Request) {
  const isAuthenticated = await ensureAuthenticated(request);

  if (!isAuthenticated) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await getAccountDetailsController.handle(request);
}
