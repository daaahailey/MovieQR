import Head from "next/head";

export const Seo = ({title, description, url}:any) => {
    return (
        <Head>
            <title>{title} | Movie QR</title>
            <meta
                name="description"
                content={`${description}. Movie QR is where you can share your favourite quotes from movie.`}
            />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:title" content={`${title} | "Movie QR`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || "https://movie-qr.vercel.app"} />
            <meta name="keyword" content="movie quote, movie review"/>
            <meta property="og:article:author" content="Movie QR" />
            {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
    )
}