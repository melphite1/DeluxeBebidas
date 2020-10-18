import React from 'react';
import '../styles/HeaderFooter.css';

function Footer() {
	const year = new Date().getFullYear()
    return (
        <footer>
              <p> &copy; Deluxe - Todos los derechos reservados {year}</p>
        </footer>
    )
}

export default Footer