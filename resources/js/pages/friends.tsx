import { RightSidebar } from '@/components/feed/RightSidebar';

export default function Friends() {
    return (
        <>
            {/* <MainNavbar /> */}
            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="flex w-full max-w-7xl gap-8">
                    {/* <LeftSidebar /> */}
                    <div className="ml-0 flex max-w-2xl flex-1 flex-col gap-6">
                        <h1 className="mb-4 text-2xl font-bold">Friends</h1>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {[1, 2, 3, 4, 5, 6].map((id) => (
                                <div key={id} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow">
                                    <img src={`/avatar${id}.png`} alt="Friend" className="h-14 w-14 rounded-full object-cover" />
                                    <div>
                                        <div className="text-lg font-semibold">Friend {id}</div>
                                        <div className="text-sm text-gray-500">@friend{id}</div>
                                    </div>
                                    <button className="ml-auto rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                        View
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <RightSidebar />
                </div>
            </main>
        </>
    );
}
