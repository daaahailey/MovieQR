import Head from 'next/head';

const Login = () => {

    const handleLogin = () => {
        console.log("button clicked")
    }

    return <>
                <Head>
                <title>Movie QR Sign In</title>
                </Head>
                <main>
                    <section >
                        <h1>Sign In</h1>
                        <input type="text" placeholder="Email Address" />
                        <button onClick={handleLogin}>Sign In</button>
                    </section>
                </main>
            </>
}

export default Login;