"use client";

import { useState } from "react";

type Props = {
  id: string;
  tag: string;
  title: string;
  desc?: string;
};

// Click-to-play "facade": shows a thumbnail and only loads the YouTube
// iframe after a click. Keeps pages fast and privacy-friendly even with
// many videos on screen.
export default function YouTubeCard({ id, tag, title, desc }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-card reveal">
      <div className="yt-facade" onClick={() => setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={`${title} — thumbnail`} loading="lazy" />
            <button className="play" aria-label={`Play: ${title}`}>▶</button>
          </>
        )}
      </div>
      <div className="vbody">
        <div className="vtag">{tag}</div>
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  );
}
