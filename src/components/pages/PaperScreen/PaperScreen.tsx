import { useEffect, useRef } from 'react';
import './PaperScreen.css';
import { useTranslation } from '@/context/LanguageContext';
import { useSound } from '@/context/SoundContext';

interface PaperFoldProps {
    onBack?: () => void;
}

export function PaperFold({ onBack }: PaperFoldProps) {
    const { t } = useTranslation();
    const { playSfx } = useSound();
    const paperRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (paperRef.current) {
            paperRef.current.focus();
        }
    }, []);

    return (
        <main className="paper-wrapper relative">
            {onBack && (
                <button
                    className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[70] bg-(--dark-800) hover:bg-(--rose-600) text-(--gray-300) hover:text-white rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-2xl border-2 border-(--gray-300) cursor-pointer"
                    onClick={() => {
                        playSfx('game_cancel');
                        onBack();
                    }}
                    aria-label="Exit Resume"
                    title="Exit Resume"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}
            <article
                ref={paperRef}
                className="paper-fold outline-none"
                aria-label="Curriculum"
                tabIndex={-1}
            >
                <div className="paper-lines">
                    <section
                        className="paper-text"
                        spellCheck={false}
                    >
                        <h1 className="paper-title">
                            Yaad Gurung
                        </h1>
                        <p className="paper-intro">
                            {t('paper_text_intro')}
                        </p>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_summary_title')}</h2>
                            <p className="paper-section-content">
                                {t('resume_summary_content')}
                            </p>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_skills_title')}</h2>
                            <p className="paper-section-content font-bold mb-1">
                                {t('resume_skills_languages')}
                            </p>
                            <p className="paper-section-content">
                                {t('resume_skills_tools')}
                            </p>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_exp_title')}</h2>
                            <div className="paper-item">
                                <h3 className="paper-role">{t('resume_exp_job1_role')}</h3>
                                <p className="paper-company">{t('resume_exp_job1_company')}</p>
                                <p className="paper-description">{t('resume_exp_job1_desc')}</p>
                            </div>
                            <div className="paper-item">
                                <h3 className="paper-role">{t('resume_exp_job2_role')}</h3>
                                <p className="paper-company">{t('resume_exp_job2_company')}</p>
                                <p className="paper-description">{t('resume_exp_job2_desc')}</p>
                            </div>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_projects_title')}</h2>
                            <div className="paper-item">
                                <h3 className="paper-role">{t('resume_proj1_title')}</h3>
                                <p className="paper-description">{t('resume_proj1_desc')}</p>
                            </div>
                            <div className="paper-item">
                                <h3 className="paper-role">{t('resume_proj2_title')}</h3>
                                <p className="paper-description">{t('resume_proj2_desc')}</p>
                            </div>
                            <div className="paper-item">
                                <h3 className="paper-role">{t('resume_proj3_title')}</h3>
                                <p className="paper-description">{t('resume_proj3_desc')}</p>
                            </div>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_edu_title')}</h2>
                            <div className="paper-education-item">
                                <h3 className="paper-role">{t('resume_edu_college1_course')}</h3>
                                <p className="paper-company">{t('resume_edu_college1_name')} | {t('resume_edu_college1_date')}</p>
                                <p className="paper-description">{t('resume_edu_college1_desc')}</p>
                            </div>
                            <div className="paper-education-item">
                                <h3 className="paper-role">{t('resume_edu_college2_course')}</h3>
                                <p className="paper-company">{t('resume_edu_college2_name')} | {t('resume_edu_college2_date')}</p>
                            </div>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('resume_vol_title')}</h2>
                            <div className="paper-item">
                                <h3 className="paper-role">{t('resume_vol_role')}</h3>
                                <p className="paper-company">{t('resume_vol_org')}</p>
                                <p className="paper-description">{t('resume_vol_desc')}</p>
                            </div>
                        </div>

                        <div className="paper-section">
                            <h2 className="paper-section-title">{t('contact')}</h2>
                            <p className="paper-contact-text">
                                Phone: (+91) 62952-10916
                            </p>
                            <p className="paper-contact-text">
                                Email: <a href="mailto:yaadgurung90@gmail.com" className="paper-link" target="_blank" rel="noopener noreferrer">yaadgurung90@gmail.com</a>
                            </p>
                            <p className="paper-contact-text">
                                Github: <a href="https://github.com/yodasan00" className="paper-link" target="_blank" rel="noopener noreferrer">github.com/yodasan00</a>
                            </p>
                            <p className="paper-contact-text">
                                LinkedIn: <a href="https://www.linkedin.com/in/yaad-gurung-080398365?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="paper-link" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaad-gurung-080398365</a>
                            </p>
                        </div>

                    </section>
                </div>

                <span className="paper-hole hole-top" aria-hidden="true" />
                <span className="paper-hole hole-middle" aria-hidden="true" />
                <span className="paper-hole hole-bottom" aria-hidden="true" />
            </article>
        </main>
    )
}
