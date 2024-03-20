import React, { useState } from 'react';
import '../Dark/DarkMode.css'; // Import du fichier CSS pour styliser le switch
import Form from "../Form/Form";
import SunIcon from '../Dark/SunIcon'; // Import de l'icône de soleil
import { ReactComponent as Moon } from "../Dark/Moon.svg"; // Import de l'icône de croissant de lune

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <div className="container">
                <SunIcon style={{ color: darkMode ? 'grey' : 'yellow' }} />
                {/* Utilisation d'un élément personnalisé pour représenter le switch */}
                <label className="switch">
                    <input type="checkbox" onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
                    <span className="slider round"></span>
                </label>
                <Moon style={{ color: darkMode ? '#c96dfd' : 'grey', width: '20px', height: '20px' }} />
               
            </div>
            <div className="form-container">
                <Form darkMode={darkMode} /> {/* Passez l'état darkMode en tant que prop au composant Form */}
            </div>
        </div>
    );
};
export default DarkMode;
