import { createClient } from "@/utils/supabase/server";

export default async function Page() {
    const supabase = await createClient();
    const { data: races } = await supabase.from("Races").select();

    return (
        <div>
            <p>Løbs oversigt</p>
            <div className="flex flex-col bg-white">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Navn</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Beskrivelse</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Start dato</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Slut Dato</th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {races && races.map((race) => (
                                        <tr key={race.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-regular text-black">{race.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black ">{race.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{new Date(race.startDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{new Date(race.endDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                <a href={`/loeb/${race.id}`} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Se mere</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}