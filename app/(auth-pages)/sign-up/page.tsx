import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Opret konto</h1>
        <p className="text-sm text text-foreground">
          Har du allerede en konto?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Log ind
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="name">Navn</Label>
          <Input name="name" placeholder="Karoline" required />
          <Label htmlFor="alias">Alias</Label>
          <Input name="alias" placeholder="Karo" required />
          <Label htmlFor="birthdate">Fødselsdag</Label>
          <Input type="date" name="birthdate" required />
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="Karo@ck.dk" required />
          <Label htmlFor="password">Kodeord</Label>
          <Input
            type="password"
            name="password"
            placeholder="Dit kodeord"
            minLength={6}
            required
          />
          <label htmlFor="hs-vertical-checkbox-in-form" className=" h-10 flex px-3 py-2 w-full bg-background border ring-offset-background border-gray-200 rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <input name="privacyPolicy" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-vertical-checkbox-in-form" required />
            <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Accepter <a href="/privatlivspolitik" className="underline">privatlivspolitk</a></span>
          </label>
          <SubmitButton formAction={signUpAction} pendingText="Opretter konto...">
            Opret konto
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
