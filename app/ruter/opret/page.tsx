import { createRouteAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function CreateRoute(props: { searchParams: Promise<Message>; }) {
    const searchParams = await props.searchParams;
    return (
        <form className="flex-1 flex flex-col min-w-64">
            <h1 className="text-2xl font-medium flex justify-center">Opret Route</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="name">Navn</Label>
                <Input name="name" placeholder="Mont Blanc" required />
                <Label htmlFor="distance">Længde</Label>
                <Input name="distance" placeholder="190 km" required type="number" />
                <Label htmlFor="elevation">Højdemeter</Label>
                <Input name="elevation" placeholder="10000 m" required type="number" />
                <Label htmlFor="map_link">Link til ruten</Label>
                <Input name="map_link" placeholder="https://www.google.com/maps" type="url" />
                <Label htmlFor="remarks">Bemærkninger</Label>
                <Input name="remarks" placeholder="Ruten er ideal for begyndere" />
                <SubmitButton pendingText="Opretter rute..." formAction={createRouteAction}>
                    Opret Rute
                </SubmitButton>
                <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Tilbage til oversigten">
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <a href="/ruter" >Tilbage til oversigten</a>
                </button>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}

