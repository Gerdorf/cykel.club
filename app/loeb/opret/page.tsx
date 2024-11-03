import { createRaceAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Page(props: { searchParams: Promise<Message>; }) {
    const searchParams = await props.searchParams;
    return (
        <form className="flex-1 flex flex-col min-w-64">
            <h1 className="text-2xl font-medium flex justify-center">Opret løb</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="name">Navn</Label>
                <Input name="name" placeholder="Tour de France" required />
                <Label htmlFor="description">Beskrivelse</Label>
                <Input name="description" placeholder="Det hårdeste løb til dato" />
                <Label htmlFor="startDate">Start dato</Label>
                <Input type="date" name="startDate" required />
                <Label htmlFor="endDate">Slut dato</Label>
                <Input type="date" name="endDate" required />
                <SubmitButton pendingText="Opretter løb..." formAction={createRaceAction}>
                    Opret løb
                </SubmitButton>
                <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Tilbage til oversigten">
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <a href="/loeb" >Tilbage til oversigten</a>
                </button>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}

