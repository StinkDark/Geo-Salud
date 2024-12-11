import "../globals.css";
import Navbar from "../componentes/Navbar";

export default function Layout({ children }) {
    return (
        <html lang="es">
            <body>
                
                {/* Navbar principal */}
                <Navbar />

                {/* Contenido principal */}
                <main className="main-content">
                    {children}
                </main>

            </body>
        </html>
    );
}
