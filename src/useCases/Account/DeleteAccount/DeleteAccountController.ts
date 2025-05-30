import { getCachedToken, setCachedToken } from "@/lib/tokenCache";
import { getUserSub } from "@/utils/tokenHandler";
import axios from "axios";
import * as jwt from "jose";
import { DeleteAccountUseCase } from "./DeleteAccountUseCase";

export class DeleteAccountController {
  constructor(private deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    let clientGrantToken;
    let isAccountDeletedAuth0;
    try {
      const userSub = await getUserSub(request);

      if (!userSub) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }
      if (process.env.NODE_ENV !== "test") {
        clientGrantToken = await this.getClientCredentials();

        isAccountDeletedAuth0 = await this.deleteAccountFromAuth0(
          userSub ? userSub : "",
          clientGrantToken
        );
      }

      if (isAccountDeletedAuth0 || process.env.NODE_ENV === "test") {
        await this.deleteAccountUseCase.execute(userSub ? userSub : "");
      } else {
        return Response.json(
          {
            message: "Cannot delete account from Auth0. Try again later.",
          },
          { status: 500 }
        );
      }

      return Response.json({ message: "Account deleted." }, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return Response.json(
        {
          message: error.message || "Unexpected error.",
        },
        { status: error.statusCode || 500 }
      );
    }
  }

  private deleteAccountFromAuth0 = async (
    userId: string,
    token: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        process.env.AUTH0_AUDIENCE + `users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.status === 204;
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      return false;
    }
  };

  private getClientCredentials = async () => {
    const cacheKey = "clientCredentialsToken";

    const cachedToken = getCachedToken(cacheKey);

    if (cachedToken) {
      return cachedToken;
    }

    const response = await axios.post(
      process.env.AUTH0_ISSUER_BASE_URL + "/oauth/token",
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      }
    );

    const accessToken = response.data.access_token;

    if (accessToken) {
      const payload = jwt.decodeJwt(accessToken);
      const now = Math.floor(Date.now() / 1000);

      const exp = typeof payload.exp === "number" ? payload.exp : now + 3600;
      const expiresIn = exp - now;

      setCachedToken(cacheKey, accessToken, expiresIn);
      console.log("Token saved to in-memory cache");
    }

    return accessToken;
  };
}
