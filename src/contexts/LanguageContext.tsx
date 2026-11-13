import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'en' | 'zh';

const translations = {
  en: {
    navStudio: 'Studio',
    navSpatial: 'Spatial',
    navAgents: 'Agents',
    navHermes: 'Hermes',
    navLibrary: 'Library',
    navKnowledge: 'Knowledge',
    navCommunity: 'Community',
    chat: 'Chat (Ctrl+K)',
    loading: 'Loading...',
    noProject: 'No Project',
    noProjectsFound: 'No projects found',
    settings: 'Settings',
    language: 'Language',
  },
  zh: {
    navStudio: '工作流',
    navSpatial: '空间视图',
    navAgents: '智能体',
    navHermes: 'Hermes',
    navLibrary: '工作流库',
    navKnowledge: '知识库',
    navCommunity: '社区',
    chat: '聊天 (Ctrl+K)',
    loading: '加载中...',
    noProject: '未选择项目',
    noProjectsFound: '没有找到项目',
    settings: '设置',
    language: '语言',
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  return localStorage.getItem('langconfig-language') === 'zh' ? 'zh' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('langconfig-language', language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: (key) => translations[language][key] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}