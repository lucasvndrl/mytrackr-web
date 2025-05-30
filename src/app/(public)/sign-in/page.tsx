import Button from "@/components/Button";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen flex w-screen">
      <div className="relative w-[50vw] bg-secondary">
        <Image
          src="/companion.jpg"
          alt="Companion"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="w-[60%] bg-background flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
          <h2 className="text-xx-large text-white text-center mb-6">Sign In</h2>
          <Button
            className="bg-secondary-purple text-white rounded w-full"
            redirect="/auth/login"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
