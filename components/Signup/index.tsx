import Link from "next/link";
import GoogleSignupSignInButton from "../GoogleSignupButton";

export default function Signup() {
  return (
    <div className="mx-auto my-auto w-80 h-[calc(100%-52px)]">
      <div className="py-14">
        <p className="text-2xl text-blue-700 mb-3 font-bold">Signup</p>
        <div className="border-2 rounded-md border-blue-700 py-4 px-2">
          <div className="py-2 px-2">
            <input
              type="text"
              id="fname-input"
              aria-label="fname-input"
              className="w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400"
              placeholder="First Name"
            />
          </div>
          <div className="py-2 px-2">
            <input
              type="text"
              id="lname-input"
              aria-label="lname-input"
              className="w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400"
              placeholder="Last Name"
            />
          </div>
          <div className="py-2 px-2">
            <input
              type="email"
              id="email-input"
              aria-label="email-input"
              className="w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400"
              placeholder="Email"
            />
          </div>
          <div className="py-2 px-2">
            <input
              type="password"
              id="password-input"
              aria-label="password-input"
              className="w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400"
              placeholder="Password"
            />
          </div>
          <div className="py-2 px-2">
            <input
              type="password"
              id="cpassword-input"
              aria-label="cpassword-input"
              className="w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400"
              placeholder="Confirmed Password"
            />
          </div>
          <div className="py-2 px-2 ">
            <button className="cursor-pointer w-full bg-blue-700 text-white font-medium text-sm p-2">
              Signup
            </button>
          </div>
          <div className="py-2 px-2">
            <p className="text-center text-sm font-medium">
              Already have an account?{" "}
              <Link className="text-blue-700" href="/login">
                Login
              </Link>
            </p>
          </div>
          <div className="py-2 px-2 flex">
            <GoogleSignupSignInButton type="Signup" />
          </div>
        </div>
      </div>
    </div>
  );
}
