import React from 'react';
import styles from './Input.module.scss';
import { languagesMain } from '@/lib/json/languages';

interface LanguageSelectProps {
    selectedLanguage?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    defaultValue?: string;
    id?: string;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ selectedLanguage = 'none', id, onChange, defaultValue }) => {

    const getMatchedLang = () => languagesMain.find((key) => key.code === selectedLanguage)?.name

    return (
        <select id={id} className={styles.select} value={selectedLanguage === 'none' ? selectedLanguage : getMatchedLang()} onChange={onChange} >
            <option value="none" disabled>{defaultValue}</option>
            {languagesMain.map((language) => (
                <option key={language.code} value={language.name}>
                    {language.nativeName}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelect;
