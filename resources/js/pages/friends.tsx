import { LeftSidebar } from '@/components/feed/LeftSidebar';
import { RightSidebar } from '@/components/feed/RightSidebar';

export default function Friends() {
    return (
        <>
            <nav className="sticky top-0 z-30 flex w-full items-center justify-between border-b bg-white px-4 py-2 shadow-sm">
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-blue-600 select-none">Larasocial</span>
                </div>
                <div className="flex flex-1 justify-center px-4">
                    <div className="w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search friends..."
                            className="rounded-full border-none bg-gray-100 px-5 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div />
            </nav>
            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="flex w-full max-w-7xl gap-8">
                    <LeftSidebar />
                    <div className="ml-0 flex max-w-2xl flex-1 flex-col gap-6 md:mr-[336px] md:ml-[336px]">
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
