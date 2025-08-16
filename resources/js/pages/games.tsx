import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

interface Game {
    title: string;
    tags: string;
    image: string;
    embed: string;
    description: string;
}

interface GamesProps {
    games: Game[];
}

export default function Games({ games }: GamesProps) {
    const [activeGame, setActiveGame] = useState<Game | null>(null);

    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Games</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {games.slice(0, 20).map((game, index) => (
                    <Dialog key={index} onOpenChange={(open) => !open && setActiveGame(null)}>
                        <DialogTrigger asChild>
                            <div onClick={() => setActiveGame(game)} className="mb-4 cursor-pointer rounded border p-4 transition hover:shadow">
                                <img src={game.image} alt={game.title} className="mb-2 h-48 w-full object-cover" />
                                <h2 className="text-lg font-semibold">{game.title}</h2>
                            </div>
                        </DialogTrigger>

                        <DialogContent className="overflow-hidden p-0 sm:max-w-min">
                            {activeGame && (
                                <iframe
                                    src={game.embed}
                                    width="1000"
                                    height="800"
                                    style={{ border: 'none' }}
                                    allowFullScreen
                                    loading="lazy"
                                    title={game.title}
                                ></iframe>
                            )}
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
}
