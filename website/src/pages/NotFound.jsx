import { Link } from "react-router-dom";
import SubpageShell from "@/pages/SubpageShell";

export default function NotFound() {
  return (
    <SubpageShell>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-medium text-[#1A1A1A] mb-6">Page not found</h1>
        <Link to="/" className="font-body text-sm text-[#A3895D] underline underline-offset-4">Back to home</Link>
      </div>
    </SubpageShell>
  );
}
