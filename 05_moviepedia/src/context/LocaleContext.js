import { createContext, useContext, useState } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
    const [locale, setLocale] = useState(defaultValue);
    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);

    if (!context) {
        throw new Error("반드시 LocalePrivider 안에서 사용하세요.");
    }

    return context.locale;
}

export function useSetLocale() {
    const context = useContext(LocaleContext);

    if (!context) {
        throw new Error("반드시 LocalePrivider 안에서 사용하세요.");
    }

    return context.setLocale;
}

// export default LocaleContext;
