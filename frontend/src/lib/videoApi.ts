export interface BackendVideo {
    id: number;
    title: string;
    videoId: string;
    durationSeconds: number;
    moduleId: number;
    thumbnailUrl?: string;
}

// ─── AUTHENTICATED fetch (existing) ──────────────────────────────────────────
export const fetchBackendVideos = async (): Promise<BackendVideo[]> => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiUrl}/videos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            throw new Error("Authentication required. Please log in.");
        }
        throw new Error("Failed to fetch videos from the server.");
    }

    return response.json();
};

// ─── PUBLIC fetch — NO token, NO localStorage ─────────────────────────────────
// Calls GET /api/videos/public/module/{moduleId}
// VITE_API_BASE_URL already ends with "/api" (e.g. "https://xxx.onrender.com/api"),
// so we append "/videos/public/module/{moduleId}" — never "/api/videos/...".
export const fetchPublicVideosByModule = async (moduleId: number): Promise<BackendVideo[]> => {
    const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api")
        .replace(/\/+$/, ""); // strip trailing slash if present

    const url = `${base}/videos/public/module/${moduleId}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // ⚠️  No Authorization header. This is intentional for the public route.
        },
    });

    if (!response.ok) {
        throw new Error(`Public video fetch failed: ${response.status}`);
    }

    return response.json();
};