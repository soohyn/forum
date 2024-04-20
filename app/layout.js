import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";
import DarkMode from "./DarkMode";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  let res = cookies().get("mode");

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${
          res !== undefined && res.value === "dark" ? "dark-mode" : ""
        }`}
      >
        <div className="navbar">
          <Link href="/" className="logo">
            Soohyeon Forum
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>

          {session ? (
            <>
              <span>{session.user.name}</span>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
          <DarkMode mode={res?.value} />
        </div>
        {children}
      </body>
    </html>
  );
}
