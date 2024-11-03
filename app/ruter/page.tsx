import { createClient } from "@/utils/supabase/server";

export default async function Ruter() {
    const supabase = await createClient();
    const { data: ruter } = await supabase.from("Routes").select();

    return (
        <div>
            <a href="/ruter/opret">
                <div className="min-h-60 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" >
                    <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                        <p className="mt-2 text-gray-500 dark:text-neutral-400">
                            Klik her for at oprette en ny rute.
                        </p>
                        <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600">
                            Opret rute
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </p>
                    </div>
                </div>
            </a>
            <div className="flex flex-col bg-white">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Navn</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Længde</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Højdemeter</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Link til ruten</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Bemærkninger</th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {ruter && ruter.map((rute) => (
                                        <tr key={rute.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-regular text-black">{rute.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{rute.distance} km</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{rute.elevation} m</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                                <a href={rute.map_link} className="text-blue-600 hover:text-blue-800" hidden={rute.map_link ? false : true}>Link</a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{rute.remarks}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                <a href={`/ruter/${rute.id}`} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Rediger</a>
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