import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import VideoPlayer from "./playground/components/VideoPlayer";
import { fetchPublicVideosByModule, type BackendVideo } from "../lib/videoApi";

export default function CoursePreviewPage() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();

    const [videos, setVideos] = useState<BackendVideo[]>([]);
    const [currentVideo, setCurrentVideo] = useState<BackendVideo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!moduleId) {
            setError("No module ID provided.");
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPublicVideosByModule(Number(moduleId));
                if (data.length === 0) {
                    setError("No videos available for this module.");
                } else {
                    setVideos(data);
                    setCurrentVideo(data[0]);
                }
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError(err instanceof Error ? err.message : "Failed to load preview.");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        void load();
        return () => controller.abort();
    }, [moduleId]);

    return (
        <div
            className="min-h-screen"
            style={{ background: "var(--color-background-primary)" }}
        >
            {/* Minimal header — no auth required */}
            <header
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{
                    background: "var(--color-background-secondary)",
                    borderColor: "var(--color-border-light)",
                }}
            >
                <button
                    onClick={() => navigate("/")}
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-accent)" }}
                >
                    ← Back to Ateion
                </button>
                <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-text-tertiary)" }}
                >
                    Free Preview
                </span>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                    className="text-sm font-bold px-4 py-1.5 rounded-lg text-white"
                    style={{ background: "var(--color-accent)" }}
                >
                    Sign up free
                </button>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {loading && (
                    <div className="flex items-center justify-center py-24">
                        <div
                            className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: "var(--color-accent)", borderTopColor: "transparent" }}
                        />
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-24">
                        <p className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                            {error}
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 px-6 py-2 rounded-lg text-white text-sm font-bold"
                            style={{ background: "var(--color-accent)" }}
                        >
                            Go Home
                        </button>
                    </div>
                )}

                {!loading && !error && currentVideo && (
                    <>
                        {/* Video Player — reuses the existing Plyr component */}
                        <VideoPlayer
                            videoId={currentVideo.videoId}
                            title={currentVideo.title}
                            loading={false}
                            error={null}
                        />

                        <h1
                            className="mt-6 text-2xl font-bold"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            {currentVideo.title}
                        </h1>

                        {/* Video list */}
                        {videos.length > 1 && (
                            <div className="mt-8">
                                <h2
                                    className="text-sm font-bold uppercase tracking-wider mb-3"
                                    style={{ color: "var(--color-text-tertiary)" }}
                                >
                                    All Lessons in This Module
                                </h2>
                                <ul className="flex flex-col gap-2">
                                    {videos.map((v, i) => (
                                        <li key={v.id}>
                                            <button
                                                onClick={() => setCurrentVideo(v)}
                                                className="w-full text-left px-4 py-3 rounded-xl border transition-all"
                                                style={{
                                                    background:
                                                        currentVideo.id === v.id
                                                            ? "rgba(232,133,106,0.1)"
                                                            : "var(--color-background-secondary)",
                                                    borderColor:
                                                        currentVideo.id === v.id
                                                            ? "var(--color-accent)"
                                                            : "var(--color-border-light)",
                                                    color: "var(--color-text-primary)",
                                                }}
                                            >
                                                <span
                                                    className="text-xs font-bold mr-2"
                                                    style={{ color: "var(--color-accent)" }}
                                                >
                                                    {i + 1}.
                                                </span>
                                                {v.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <div
                            className="mt-10 p-6 rounded-2xl border text-center"
                            style={{
                                background: "var(--color-background-secondary)",
                                borderColor: "var(--color-border-light)",
                            }}
                        >
                            <p
                                className="text-lg font-bold mb-2"
                                style={{ color: "var(--color-text-primary)" }}
                            >
                                Enjoying the preview?
                            </p>
                            <p
                                className="text-sm mb-4"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                Sign up for free to access all lessons, track your progress, and earn XP.
                            </p>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                className="px-8 py-3 rounded-xl text-white font-bold text-sm"
                                style={{ background: "var(--color-accent)" }}
                            >
                                Get Full Access — It's Free
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}