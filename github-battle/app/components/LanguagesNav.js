import React from 'react'
import PropTypes from 'prop-types'


export default function LanguagesNav({selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='flex-center'>
            {languages.map((language)=>
            <li key={language}>
            <button className={language === selected ? 'btn-clear nav-link nav-selected' : 'btn-clear nav-link'} 
                onClick={() => onUpdateLanguage(language)}>
                    {language}
                </button>
            </li>
            )}
        </ul>
    )
}


LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}