import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let metadata = user?.user_metadata;
  return user ? (
    <div className="flex items-center gap-4">
      Velkommen, {metadata?.alias}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Log ud
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex justify-between w-full">
      <div>
        <Link href="/" className="text-2xl font-logo font-bold">Cykel.club</Link>
      </div>

      <div className="gap-2 flex">
        <Button asChild size="auth" variant={"in"}>
          <Link href="/sign-in">Log ind</Link>
        </Button>
        <Button asChild size="auth" variant={"out"}>
          <Link href="/sign-up">Opret konto</Link>
        </Button>
      </div>
    </div>

  );
}
