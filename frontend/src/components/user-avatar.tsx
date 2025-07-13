import { LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

const UserAvatar = () => {
  const { user, logout } = useAuth();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="border border-neutral-300  size-9 rounded-full flex items-center justify-center">
          <User2 />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/my-verses">
          <DropdownMenuItem>My verses</DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="text-red-500" onClick={logout}>
          <LogOut className="text-red-500" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserAvatar;
