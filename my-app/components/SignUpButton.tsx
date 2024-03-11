import Link from "next/link";

export default function SignUpButton() {
  return (
    <Link
      href="/signup" // Change href to "/signup"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      SignUp 
    </Link>
  );
}
