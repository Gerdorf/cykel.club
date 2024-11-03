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
    const { data, error } = await supabase.from("Races").select().eq("id", id).single();
    if (error) {
        return redirect("/loeb");

    }

    return (
        <div>
            <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800">
                    {data.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase text-gray-500">
                    {new Date(data.startDate).toLocaleDateString()} {data.startDate === data.endDate ? null : ` - ${new Date(data.endDate).toLocaleDateString()}`}
                </p>
                <p className="mt-2 text-gray-500">
                    {data.description}
                </p>
                <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none" href={`/loeb/${id}/rediger`}>
                    Rediger
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </a>
            </div>
            <button type="button" className="min-h-[38px] min-w-[38px] w-[100%] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Tilbage til oversigten">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <a href="/loeb" >Tilbage til oversigten</a>
            </button>
        </div>
    )
}