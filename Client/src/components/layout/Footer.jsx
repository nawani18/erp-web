const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 px-6 bg-white border-t border-slate-200 mt-auto z-10 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                {/* Copyright and System Name */}
                <div className="text-center md:text-left">
                    &copy; {currentYear}{" "}
                    <span className="font-semibold text-slate-700">
                        College ERP
                    </span>
                    . All rights reserved.
                </div>

                {/* Version Information */}
                <div className="flex items-center gap-4 font-medium">
                    <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-600">
                        Version 1.0.0-MVP
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
