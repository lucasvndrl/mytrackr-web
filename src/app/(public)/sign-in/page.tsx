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
        />
      </div>

      <div className="w-[60%] bg-background flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
          <h2 className="text-xx-large text-white text-center mb-6">Sign In</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-white text-primary border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-white text-primary border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue text-white rounded"
            >
              Login
            </button>
          </form>
          <p className="text-center text-small text-secondary mt-4">
            Don't have an account?{" "}
            <a href="#" className="text-red">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
