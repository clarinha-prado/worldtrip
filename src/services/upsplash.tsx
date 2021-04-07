import { createApi } from "unsplash-js";

export type PhotoProps = {
    id: number;
    width: number;
    height: number;
    urls: { large: string; regular: string; raw: string; small: string };
    user: {
        username: string;
        name: string;
    };
};

export const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
});

