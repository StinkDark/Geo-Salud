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

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-content">
                        <p>© 2024 GeoSalud. Todos los derechos reservados.</p>
                        <div className="footer-icons">
                            <span className="icon">©</span>
                            <span>GeoSalud - Conectando Salud y Eficiencia</span>
                        </div>
                    </div>
                </footer>

            </body>
        </html>
    );
}
