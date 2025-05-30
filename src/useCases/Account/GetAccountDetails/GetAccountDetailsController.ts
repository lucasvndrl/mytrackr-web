import { JwtPayload } from "jsonwebtoken";
import { GetAccountDetailsUseCase } from "./GetAccountDetailsUseCase";
import { verifyToken } from "@/utils/tokenHandler";

export class GetAccountDetailsController {
  constructor(private getAccountDetailsUseCase: GetAccountDetailsUseCase) {}

  async handle(request: Request): Promise<Response> {
    try {
      const sub = request.headers.get("sub");
      let userSub = "";
      if (!sub) {
        const token = await verifyToken(
          request.headers.get("authorization") || ""
        );

        if (!token || !token.sub) {
          return Response.json({ message: "Unauthorized" }, { status: 401 });
        }
        userSub = token.sub;
      } else {
        userSub = sub;
      }

      const account = await this.getAccountDetailsUseCase.execute(userSub);
      if (account === undefined) {
        return Response.json({ message: "Account not found" }, { status: 404 });
      }
      return Response.json(account, { status: 200 });
    } catch (error: any) {
      return Response.json(
        { message: error.message || "Internal Server Error" },
        { status: error.statusCode || 500 }
      );
    }
  }
}
