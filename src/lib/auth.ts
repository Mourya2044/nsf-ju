import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "NSF_JU_SECRET_JWT_SIGNING_KEY_2026_SWADESHI";
const COOKIE_NAME = "nsf_auth_token";

export interface JWTPayload {
  email: string;
  role: string;
  wing: string;
  name: string;
}

/**
 * Hash plain text password using bcrypt salt factor 10
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain text password against stored hash/string
 */
export async function comparePassword(password: string, storedHash: string): Promise<boolean> {
  // If stored password is already a bcrypt hash (starts with $2a$ or $2b$)
  if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$")) {
    return bcrypt.compare(password, storedHash);
  }
  // Fallback for legacy plain text accounts created in initial setup
  return password === storedHash;
}

/**
 * Sign JWT session token
 */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Extract authenticated user from request (via Cookie or Bearer Token)
 */
export async function getAuthenticatedUser(request: Request) {
  try {
    // 1. Try to get token from Cookie
    const cookieHeader = request.headers.get("cookie") || "";
    let token: string | null = null;

    const cookieMatch = cookieHeader.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    if (cookieMatch) {
      token = decodeURIComponent(cookieMatch[1]);
    }

    // 2. Try to get token from Authorization Header if Cookie isn't present
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.email) {
      return null;
    }

    // Fetch fresh user record from DB
    const user = await prisma.member.findUnique({
      where: { email: decoded.email.toLowerCase() },
    });

    if (!user || user.status !== "Active") {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

/**
 * Attach HTTP-Only Auth Cookie to NextResponse
 */
export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

/**
 * Clear Auth Cookie on Logout
 */
export function clearAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
