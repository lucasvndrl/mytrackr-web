import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const AUTH0_PUBLIC_KEY = process.env.AUTH0_PUBLIC_KEY || "your-public-key";

const client = jwksClient({ jwksUri: AUTH0_PUBLIC_KEY });

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, null);
      return;
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export function verifyToken(
  bearer: string
): Promise<{ valid: boolean; sub?: string }> {
  const token = bearer.split(" ")[1];
  return new Promise((resolve) => {
    jwt.verify(
      token,
      getKey,
      { algorithms: ["RS256"] },
      (err, decoded: any) => {
        if (err) {
          resolve({ valid: false });
          return;
        }

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          resolve({ valid: false });
          return;
        }

        resolve({ valid: true, sub: decoded.sub });
      }
    );
  });
}

export async function getUserSub(
  request: Request
): Promise<string | undefined> {
  const sub = request.headers.get("sub");

  if (!sub) {
    const token = await verifyToken(request.headers.get("authorization") || "");

    if (!token || !token.sub) {
      return;
    }

    return token.sub;
  }

  return sub;
}

export async function ensureAuthenticated(
  request: Request
): Promise<{ valid: boolean; sub?: string }> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return { valid: false };

  const token = await verifyToken(authHeader);
  return token;
}
