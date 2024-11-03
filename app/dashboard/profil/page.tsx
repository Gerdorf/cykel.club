import { createClient } from "@/utils/supabase/server";
import { data } from "autoprefixer";



export default async function Page() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let metadata = user?.user_metadata;
    return (
        <div>
            <h1>Profil</h1>
            <p>Her kan du se og redigere dine oplysninger.</p>
            {data ? (
                <div>
                    <p>Velkommen, {metadata?.name}!</p>
                    <p>Email: {metadata?.email}</p>
                    <p>Alder: {new Date(metadata?.birthdate).toLocaleDateString()}</p>
                    <p>Alias: {metadata?.alias}</p>
                </div>
            ) : (
                <p>Du er ikke logget ind.</p>
            )}
        </div>
    )
}