import Navbar from "./Navbar";

const ErrorPage = () => {
    return (
        <div>
            <div data-theme="synthwave" className="mx-auto">
                <nav className="max-h-[15vh] fixed top-0 w-full z-50">
                    <Navbar />
                </nav>

                <section className="pt-[15vh] max-w-[1200px] mx-auto z-0 relative pb-10">
                    <div className="h-screen flex justify-center items-center flex-col">
                        <img src="https://www.pietrozanettihome.com/img/404.svg" alt="404 img" className="lg:w-[40vw] md:w-[50vw] w-[80vw]" />
                        <p className="font-poppins lg:text-6xl md:text-4xl text-2xl">Oooops! We lost one.</p>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default ErrorPage;