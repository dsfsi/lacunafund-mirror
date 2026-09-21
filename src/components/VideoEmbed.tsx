import { useState } from "react";
import { PlayCircle } from "lucide-react";

type VideoEmbedProps = {
  videoId: string;
  title?: string;
  className?: string;
};

export function VideoEmbed({ videoId, title = "Video", className }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://vumbnail.com/${videoId}.jpg`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-black ${className ?? ""}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      {isPlaying ? (
        <iframe
          title={title}
          src={`https://player.vimeo.com/video/${videoId}?dnt=1&autoplay=1`}
          className="absolute inset-0 h-full w-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <img
            src={thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
            <PlayCircle
              className="size-14 text-white drop-shadow-lg transition-transform group-hover:scale-110"
              aria-hidden
            />
          </span>
        </button>
      )}
    </div>
  );
}