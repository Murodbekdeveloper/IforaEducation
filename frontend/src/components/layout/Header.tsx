import HeaderClient from "./HeaderClient";
import { getCurrentUser } from "@/lib/session";

export default async function Header() {
  const user = await getCurrentUser();
  return <HeaderClient user={user} />;
}
