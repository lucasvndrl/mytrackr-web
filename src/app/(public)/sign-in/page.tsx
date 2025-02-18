import Button from "@/components/Button";
import Image from "next/image";

export default function SignIn() {
  const env = process.env.APP_BASE_URL;
  return (
    <div className="min-h-screen flex w-screen">
      <div className="relative w-[50vw] bg-secondary">
        <Image
          src="/companion.jpg"
          alt="Companion"
          fill
          className="object-cover"
        />
      </div>
      <h1>{env}</h1>
      <div className="w-[60%] bg-background flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
          <h2 className="text-xx-large text-white text-center mb-6">Sign In</h2>
          <a href="/auth/login">Log in</a>
          <Button
            className="bg-secondary-purple text-white rounded w-full"
            redirect="/auth/login"
          >
            Login
          </Button>
          {/* <button
            type="submit"
            className="w-full py-2 bg-secondary-purple text-white rounded"
          >
            Login
          </button> */}
          <p className="text-center text-small text-white mt-4">
            Don't have an account?{" "}
            <a href="#" className="text-gray">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
