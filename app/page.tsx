import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


export default async function Index() {
  return (
    <div className="flex justify-around max-w-[1440px]">
      <div className="font-display w-6/12 ">
        <p className=" text-heroSM tracking-tight ">Din platform til</p>
        <h1 className="text-heroXL w-6/12 min-w-[425px] font-medium tracking-tight">Cykelløb, Etaper og Resultatstyring</h1>
        <p className="text-lg max-w-[530px] font-light py-8">Tilmeld dig i dag og gør styringen af dine cykelløb nemt og sjovt. Med Cykel.club får du en all-in-one løsning helt gratis</p>
        <div>
          <Button asChild size="auth" variant={"out"}>
            <Link href="/sign-up">Opret konto</Link>
          </Button>

        </div>
      </div>

      <div>
        <Image
          src="https://jakdxnwvgeluegarvyzf.supabase.co/storage/v1/object/public/img/hero.png?t=2024-11-16T21%3A30%3A24.127Z"
          width={500}
          height={500}
          alt="Cykelløb"
          className="h-img w-img" />
      </div>
    </div>
  );
}
