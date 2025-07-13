import { cn } from "@/lib/utils";
import { Cinzel } from "next/font/google";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const font = Cinzel({
  subsets: ["latin-ext"],
});

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("font-semibold text-xl", font.className, className)}>
      Verse Vault
    </Link>
  );
};
export default Logo;
