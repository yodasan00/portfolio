import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const SEO: React.FC = () => {
    const { t, i18n } = useTranslation();

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
            "@type": "Person",
            "name": "Yaad Gurung",
            "alternateName": "YaadOS",
            "jobTitle": "Software Developer",
            "image": "/banner.png",
            "url": "https://yaados.dev",
            "sameAs": [
                "https://github.com/yodasan00"
            ],
            "description": t('seo_description', 'Interactive retro OS developer portfolio by Yaad Gurung.'),
            "knowsAbout": [
                "Software Development",
                "Front-End Engineering",
                "Full-Stack Development",
                "Web Performance",
                "Design Systems",
                "React",
                "TypeScript",
                "JavaScript",
                "HTML",
                "CSS",
                "Tailwind CSS"
            ]
        }
    };

    return (
        <Helmet>
            <html lang={i18n.language || 'en'} />
            <title>{t('app_title', 'YaadOS Portfolio | Yaad Gurung — Software Developer')}</title>
            <meta name="description" content={t('seo_description', 'Interactive retro OS developer portfolio by Yaad Gurung.')} />
            <meta name="keywords" content="retro portfolio, YaadOS, Yaad Gurung, Windows 95, interactive portfolio" />


            {/* Social Media Banner */}
            <meta property="og:image" content="https://mewmewdevart.com/banner.png" />
            <meta property="twitter:image" content="https://mewmewdevart.com/banner.png" />

            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
        </Helmet>
    );
};
