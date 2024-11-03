import { updateRouteAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const supabase = await createClient();
    const { data, error } = await supabase.from("Routes").select().eq("id", id).single();
    if (error) {
        return redirect("/ruter");

    }

    return (
        <form className="flex-1 flex flex-col min-w-64">
            <h1 className="text-2xl font-medium flex justify-center">Rediger ruten {data.name}</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="name">Navn</Label>
                <Input name="name" defaultValue={data.name} required />
                <Label htmlFor="distance">Længde i km</Label>
                <Input name="distance" defaultValue={data.distance} required type="number" />
                <Label htmlFor="elevation">Højdemeter i m</Label>
                <Input name="elevation" defaultValue={data.elevation} required type="number" />
                <Label htmlFor="map_link">Link til ruten</Label>
                <Input name="map_link" defaultValue={data.map_link} type="url" />
                <Label htmlFor="remarks">Bemærkninger</Label>
                <Input name="remarks" defaultValue={data.remarks} />
                <Input name="id" defaultValue={data.id} readOnly className="hidden" />
                <SubmitButton pendingText="Redigere rute..." formAction={updateRouteAction}>
                    Rediger rute
                </SubmitButton>
                <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Tilbage til oversigten">
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <a href="/ruter" >Tilbage til oversigten</a>
                </button>
            </div>
        </form>
    )
}