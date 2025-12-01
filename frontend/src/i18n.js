import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      hero: {
        bio: 'Ben Kaan Güneş. İTÜ MTAL Bilişim Teknolojileri öğrencisiyim. 8 yılı aşkın süredir grafik tasarımla ilgileniyorum ve son yıllarda bu birikimimi profesyonel düzeyde çalışmalarla taçlandırıyorum. Tasarım kimliğimin dışında, Generative AI (Üretken Yapay Zeka) dünyasına ilk çıktığı günden beri büyük bir ilgi duyuyorum; bu teknolojiyi yakından takip ediyor ve teknik altyapısını inceleyerek bağımsız bir uzmanlık alanı olarak kendimi bu yönde geliştiriyorum.',
        explore: 'Çalışmalarımı Keşfet'
      },
      sections: {
        selectedWorks: 'Seçili Çalışmalar',
        skills: 'Yetenekler & Uzmanlık'
      },
      cards: {
        title: 'Projeler',
        subtitle: 'Kategorilere Göz Atın',
        bottomExplore: 'GALERİYİ KEŞFET',
        exploreProject: 'Projeyi İncele',
        worksCount: '{{count}} Çalışma',
        projectListCount: '{{count}} Proje Listeleniyor',
      },
      nav: {
        contact: 'İletişime Geç',
      },
      project: {
        defaultDescription: '{{category}} kategorisindeki {{project}} projesi, yaratıcı tasarım ve teknik mükemmelliğin birleşimini sunmaktadır. Proje, modern tasarım prensipleri ve kullanıcı deneyimi odaklı yaklaşımıyla öne çıkmaktadır.',
        vectorDesign: 'Vektörel Tasarım',
        mannequinView: 'Manken Görünümü'
      },
      skills: {
        title: 'Yetenekler',
        photoshopTitle: 'Photoshop ile Her Şey Mümkün',
        photoshopDesc: 'Yaratıcılığın sınırlarını zorlayın. Her fikir, her hayal edilen görsel gerçeğe dönüşebilir.'
      },
      contact: {
        title: 'İletişime Geç',
        subtitle: 'Bir proje fikriniz mi var? Birlikte harika şeyler yaratalım.',
        infoTitle: 'İletişim Bilgileri',
        email: 'E-posta',
        location: 'Konum',
        locationValue: 'İstanbul, Türkiye',
        social: 'Sosyal Medya',
        formTitle: 'Mesaj Gönder',
        formName: 'İsim',
        formNamePlaceholder: 'Adınız Soyadınız',
        formEmail: 'E-posta',
        formEmailPlaceholder: 'ornek@email.com',
        formMessage: 'Mesaj',
        formMessagePlaceholder: 'Mesajınızı buraya yazın...',
        sendButton: 'Gönder'
      },
      footer: {
        title: 'Birlikte harika\nşeyler yaratalım',
        description: 'Yaratıcı sınırları zorlamak için her zaman yeni zorluklar ve fırsatlar arıyorum.',
        copyright: '© 2025 Kaan Güneş. Tüm hakları saklıdır.',
        rights: '© 2024 Tüm Hakları Saklıdır',
      },
      portfolio: {
        hero: {
          badge: 'PORTFOLIO 2024',
          title: 'Creative',
          subtitle: 'Designer',
          description: 'Sanat, teknoloji ve inovasyonun kesişiminde dijital deneyimler tasarlıyorum',
          scroll: 'AŞAĞI KAYDIR',
        },
        stacked: {
          headerTitle: 'Seçili Çalışmalar',
          headerSubtitle: 'Tasarım, teknoloji ve inovasyonu kapsayan seçilmiş projeler koleksiyonu',
          viewButton: 'Görüntüle',
          hint: 'KEŞFETMEK İÇİN TIKLA YA DA ÜZERİNE GEL',
        },
        categories: {
          socialMedia: {
            title: 'Sosyal Medya',
            subtitle: 'Social Media',
            description: 'Markaların dijital kimliğini oluşturan içerik tasarımları',
            tags: {
              instagram: 'Instagram',
              linkedin: 'LinkedIn',
              twitter: 'Twitter',
            },
          },
          apparel: {
            title: 'Giyim Tasarımları',
            subtitle: 'Apparel & Fashion Designs',
            description: 'Tekstil ve moda endüstrisi için özel baskı tasarımları',
            tags: {
              tshirt: 'T‑Shirt',
              hoodie: 'Hoodie',
              customPrints: 'Özel Baskılar',
            },
          },
          logos: {
            title: 'Logolar',
            subtitle: 'Brand Identity & Logos',
            description: 'Kurumsal kimlik ve marka logosu tasarımları',
            tags: {
              branding: 'Markalaşma',
              identity: 'Kimlik',
              minimalism: 'Minimalizm',
            },
          },
          posters: {
            title: 'Afiş Tasarımları',
            subtitle: 'Poster Designs',
            description: 'Etkinlikler ve kampanyalar için basılı afiş tasarımları',
            tags: {
              print: 'Baskı Tasarımı',
              events: 'Etkinlikler',
              campaigns: 'Kampanyalar',
            },
          },
          iot: {
            title: 'IoT Projelerim',
            subtitle: 'Internet of Things Projects',
            description: 'Akıllı cihaz ve otomasyon sistemleri geliştirmeleri',
            tags: {
              smartHome: 'Akıllı Ev',
              arduino: 'Arduino',
              sensors: 'Sensörler',
            },
          },
          ai: {
            title: 'AI Çalışmalarım',
            subtitle: 'Artificial Intelligence Works',
            description: 'Makine öğrenimi ve yapay zeka uygulamaları',
            tags: {
              ml: 'Makine Öğrenimi',
              cv: 'Görüntü İşleme',
              nlp: 'Doğal Dil İşleme',
            },
          },
        },
      },
    },
  },
  en: {
    translation: {
      hero: {
        bio: "I'm Kaan Güneş. I'm an ITU MTAL Information Technologies student. I've been interested in graphic design for over 8 years and in recent years I have been turning this experience into professional-level work. Beyond my designer identity, I have had a strong interest in the world of Generative AI since it first emerged; I closely follow this technology and study its technical foundations, developing myself in this field as an independent area of expertise.",
        explore: 'Explore My Work'
      },
      sections: {
        selectedWorks: 'Selected Works',
        skills: 'Skills & Expertise'
      },
      cards: {
        title: 'Projects',
        subtitle: 'Browse by Category',
        bottomExplore: 'EXPLORE THE GALLERY',
        exploreProject: 'View Project',
        worksCount: '{{count}} Works',
        projectListCount: '{{count}} Projects Listed',
      },
      nav: {
        contact: 'Get In Touch',
      },
      project: {
        defaultDescription: 'The {{project}} project in the {{category}} category brings together creative design and technical excellence. It stands out with modern design principles and a user-experience–focused approach.',
        vectorDesign: 'Vector Design',
        mannequinView: 'Mannequin View'
      },
      skills: {
        title: 'Skills',
        photoshopTitle: 'Everything is Possible with Photoshop',
        photoshopDesc: 'Push the boundaries of creativity. Every idea, every imagined visual can turn into reality.'
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Have a project in mind? Let\'s create something great together.',
        infoTitle: 'Contact Information',
        email: 'Email',
        location: 'Location',
        locationValue: 'Istanbul, Turkey',
        social: 'Social Media',
        formTitle: 'Send Message',
        formName: 'Name',
        formNamePlaceholder: 'Your Name',
        formEmail: 'Email',
        formEmailPlaceholder: 'example@email.com',
        formMessage: 'Message',
        formMessagePlaceholder: 'Write your message here...',
        sendButton: 'Send'
      },
      footer: {
        title: 'Let\'s create\nsomething together',
        description: 'Always looking for new challenges and opportunities to push creative boundaries.',
        copyright: '© 2025 Kaan Güneş. All rights reserved.',
        rights: '© 2024 All Rights Reserved',
      },
      portfolio: {
        hero: {
          badge: 'PORTFOLIO 2024',
          title: 'Creative',
          subtitle: 'Designer',
          description: 'Crafting digital experiences through the intersection of art, technology, and innovation',
          scroll: 'SCROLL',
        },
        stacked: {
          headerTitle: 'Selected Works',
          headerSubtitle: 'A curated collection of projects spanning design, technology, and innovation',
          viewButton: 'View',
          hint: 'CLICK OR HOVER TO EXPLORE',
        },
        categories: {
          socialMedia: {
            title: 'Social Media',
            subtitle: 'Social Media',
            description: 'Content designs that build the digital identity of brands',
            tags: {
              instagram: 'Instagram',
              linkedin: 'LinkedIn',
              twitter: 'Twitter',
            },
          },
          apparel: {
            title: 'Apparel Designs',
            subtitle: 'Apparel & Fashion Designs',
            description: 'Custom print designs for the textile and fashion industry',
            tags: {
              tshirt: 'T‑Shirt',
              hoodie: 'Hoodie',
              customPrints: 'Custom Prints',
            },
          },
          logos: {
            title: 'Logos',
            subtitle: 'Brand Identity & Logos',
            description: 'Corporate identity and logo designs for brands',
            tags: {
              branding: 'Branding',
              identity: 'Identity',
              minimalism: 'Minimalism',
            },
          },
          posters: {
            title: 'Poster Designs',
            subtitle: 'Poster Designs',
            description: 'Printed poster designs for events and campaigns',
            tags: {
              print: 'Print Design',
              events: 'Events',
              campaigns: 'Campaigns',
            },
          },
          iot: {
            title: 'IoT Projects',
            subtitle: 'Internet of Things Projects',
            description: 'Smart device and automation system development',
            tags: {
              smartHome: 'Smart Home',
              arduino: 'Arduino',
              sensors: 'Sensors',
            },
          },
          ai: {
            title: 'AI Works',
            subtitle: 'Artificial Intelligence Works',
            description: 'Machine learning and artificial intelligence applications',
            tags: {
              ml: 'Machine Learning',
              cv: 'Computer Vision',
              nlp: 'NLP',
            },
          },
        },
      },
    },
  },
  de: {
    translation: {
      hero: {
        bio: 'Ich bin Kaan Güneş. Ich bin Schüler der ITU MTAL im Bereich Informationstechnologien. Seit über 8 Jahren beschäftige ich mich mit Grafikdesign und kröne diese Erfahrung in den letzten Jahren mit professionellen Arbeiten. Neben meiner Designeridentität interessiere ich mich seit dem ersten Aufkommen sehr für die Welt der Generativen KI; ich verfolge diese Technologie aufmerksam, studiere ihre technische Grundlage und entwickle mich in diesem Bereich als eigenständiges Fachgebiet weiter.',
        explore: 'Meine Arbeiten entdecken'
      },
      sections: {
        selectedWorks: 'Ausgewählte Arbeiten',
        skills: 'Fähigkeiten & Expertise'
      },
      cards: {
        title: 'Projekte',
        subtitle: 'Nach Kategorien stöbern',
        bottomExplore: 'GALERIE ENTDECKEN',
        exploreProject: 'Projekt ansehen',
        worksCount: '{{count}} Arbeiten',
        projectListCount: '{{count}} Projekte gelistet',
      },
      nav: {
        contact: 'Kontakt',
      },
      project: {
        defaultDescription: 'Das Projekt {{project}} in der Kategorie {{category}} vereint kreatives Design und technische Exzellenz. Es zeichnet sich durch moderne Designprinzipien und einen nutzerzentrierten Ansatz aus.',
        vectorDesign: 'Vektordesign',
        mannequinView: 'Schaufensterpuppen-Ansicht'
      },
      skills: {
        title: 'Fähigkeiten',
        photoshopTitle: 'Mit Photoshop ist alles möglich',
        photoshopDesc: 'Verschieben Sie die Grenzen der Kreativität. Jede Idee, jedes vorgestellte Bild kann Realität werden.'
      },
      contact: {
        title: 'Kontakt aufnehmen',
        subtitle: 'Haben Sie eine Projektidee? Lassen Sie uns gemeinsam etwas Großartiges schaffen.',
        infoTitle: 'Kontaktinformationen',
        email: 'E-Mail',
        location: 'Standort',
        locationValue: 'Istanbul, Türkei',
        social: 'Soziale Medien',
        formTitle: 'Nachricht senden',
        formName: 'Name',
        formNamePlaceholder: 'Ihr Name',
        formEmail: 'E-Mail',
        formEmailPlaceholder: 'beispiel@email.com',
        formMessage: 'Nachricht',
        formMessagePlaceholder: 'Schreiben Sie Ihre Nachricht hier...',
        sendButton: 'Senden'
      },
      footer: {
        title: 'Lass uns gemeinsam\netwas erschaffen',
        description: 'Immer auf der Suche nach neuen Herausforderungen und Möglichkeiten, kreative Grenzen zu überschreiten.',
        copyright: '© 2025 Kaan Güneş. Alle Rechte vorbehalten.',
        rights: '© 2024 Alle Rechte vorbehalten',
      },
      portfolio: {
        hero: {
          badge: 'PORTFOLIO 2024',
          title: 'Kreativ',
          subtitle: 'Designer',
          description: 'Ich gestalte digitale Erlebnisse an der Schnittstelle von Kunst, Technologie und Innovation',
          scroll: 'SCROLLEN',
        },
        stacked: {
          headerTitle: 'Ausgewählte Arbeiten',
          headerSubtitle: 'Eine kuratierte Sammlung von Projekten aus Design, Technologie und Innovation',
          viewButton: 'Ansehen',
          hint: 'KLICKEN ODER HOVER FÜR MEHR',
        },
        categories: {
          socialMedia: {
            title: 'Social Media',
            subtitle: 'Social Media',
            description: 'Content-Designs, die die digitale Identität von Marken formen',
            tags: {
              instagram: 'Instagram',
              linkedin: 'LinkedIn',
              twitter: 'Twitter',
            },
          },
          apparel: {
            title: 'Bekleidungsdesigns',
            subtitle: 'Apparel & Fashion Designs',
            description: 'Spezielle Druckdesigns für die Textil- und Modebranche',
            tags: {
              tshirt: 'T‑Shirt',
              hoodie: 'Hoodie',
              customPrints: 'Spezialdrucke',
            },
          },
          logos: {
            title: 'Logos',
            subtitle: 'Brand Identity & Logos',
            description: 'Corporate-Identity- und Logodesigns für Marken',
            tags: {
              branding: 'Branding',
              identity: 'Identität',
              minimalism: 'Minimalismus',
            },
          },
          posters: {
            title: 'Posterdesigns',
            subtitle: 'Poster Designs',
            description: 'Plakatdesigns für Events und Kampagnen',
            tags: {
              print: 'Printdesign',
              events: 'Events',
              campaigns: 'Kampagnen',
            },
          },
          iot: {
            title: 'IoT‑Projekte',
            subtitle: 'Internet of Things Projects',
            description: 'Entwicklung von Smart Devices und Automationssystemen',
            tags: {
              smartHome: 'Smart Home',
              arduino: 'Arduino',
              sensors: 'Sensoren',
            },
          },
          ai: {
            title: 'KI‑Arbeiten',
            subtitle: 'Artificial Intelligence Works',
            description: 'Anwendungen im Bereich Machine Learning und Künstliche Intelligenz',
            tags: {
              ml: 'Machine Learning',
              cv: 'Computer Vision',
              nlp: 'NLP',
            },
          },
        },
      },
    },
  },
  it: {
    translation: {
      hero: {
        bio: 'Sono Kaan Güneş. Studio Tecnologie Informatiche presso ITU MTAL. Da oltre 8 anni mi occupo di graphic design e negli ultimi anni ho trasformato questa esperienza in lavori a livello professionale. Oltre alla mia identità di designer, seguo con grande interesse il mondo della Generative AI fin dalla sua comparsa; seguo da vicino questa tecnologia, ne studio le basi tecniche e mi sviluppo in questo ambito come area di competenza indipendente.',
        explore: 'Esplora i miei lavori'
      },
      sections: {
        selectedWorks: 'Lavori Selezionati',
        skills: 'Competenze ed Esperienza'
      },
      cards: {
        title: 'Progetti',
        subtitle: 'Esplora per categoria',
        bottomExplore: 'ESPLORA LA GALLERIA',
        exploreProject: 'Vedi progetto',
        worksCount: '{{count}} lavori',
        projectListCount: '{{count}} progetti elencati',
      },
      nav: {
        contact: 'Contattami',
      },
      project: {
        defaultDescription: 'Il progetto {{project}} nella categoria {{category}} unisce design creativo ed eccellenza tecnica. Si distingue per i principi di design moderni e un approccio incentrato sull’esperienza utente.',
        vectorDesign: 'Design Vettoriale',
        mannequinView: 'Vista Manichino'
      },
      skills: {
        title: 'Competenze',
        photoshopTitle: 'Tutto è possibile con Photoshop',
        photoshopDesc: 'Spingi i confini della creatività. Ogni idea, ogni immagine immaginata può diventare realtà.'
      },
      contact: {
        title: 'Mettiti in contatto',
        subtitle: 'Hai un\'idea per un progetto? Creiamo qualcosa di fantastico insieme.',
        infoTitle: 'Informazioni di contatto',
        email: 'Email',
        location: 'Posizione',
        locationValue: 'Istanbul, Turchia',
        social: 'Social Media',
        formTitle: 'Invia Messaggio',
        formName: 'Nome',
        formNamePlaceholder: 'Il tuo nome',
        formEmail: 'Email',
        formEmailPlaceholder: 'esempio@email.com',
        formMessage: 'Messaggio',
        formMessagePlaceholder: 'Scrivi qui il tuo messaggio...',
        sendButton: 'Invia'
      },
      footer: {
        title: 'Creiamo qualcosa\ninsieme',
        description: 'Sempre alla ricerca di nuove sfide e opportunità per spingere i confini creativi.',
        copyright: '© 2025 Kaan Güneş. Tutti i diritti riservati.',
        rights: '© 2024 Tutti i diritti riservati',
      },
      portfolio: {
        hero: {
          badge: 'PORTFOLIO 2024',
          title: 'Creativo',
          subtitle: 'Designer',
          description: 'Creo esperienze digitali all’incrocio tra arte, tecnologia e innovazione',
          scroll: 'SCORRI',
        },
        stacked: {
          headerTitle: 'Lavori selezionati',
          headerSubtitle: 'Una selezione curata di progetti tra design, tecnologia e innovazione',
          viewButton: 'Vedi',
          hint: 'CLICCA O PASSA IL MOUSE PER ESPLORARE',
        },
        categories: {
          socialMedia: {
            title: 'Social Media',
            subtitle: 'Social Media',
            description: 'Design di contenuti che definiscono l’identità digitale dei brand',
            tags: {
              instagram: 'Instagram',
              linkedin: 'LinkedIn',
              twitter: 'Twitter',
            },
          },
          apparel: {
            title: 'Design per l’abbigliamento',
            subtitle: 'Apparel & Fashion Designs',
            description: 'Design di stampe personalizzate per il settore tessile e moda',
            tags: {
              tshirt: 'T‑Shirt',
              hoodie: 'Felpa',
              customPrints: 'Stampe personalizzate',
            },
          },
          logos: {
            title: 'Loghi',
            subtitle: 'Brand Identity & Logos',
            description: 'Loghi e identità visive per brand e aziende',
            tags: {
              branding: 'Branding',
              identity: 'Identità',
              minimalism: 'Minimalismo',
            },
          },
          posters: {
            title: 'Poster',
            subtitle: 'Poster Designs',
            description: 'Poster stampati per eventi e campagne',
            tags: {
              print: 'Design di stampa',
              events: 'Eventi',
              campaigns: 'Campagne',
            },
          },
          iot: {
            title: 'Progetti IoT',
            subtitle: 'Internet of Things Projects',
            description: 'Sistemi intelligenti e soluzioni di automazione',
            tags: {
              smartHome: 'Smart Home',
              arduino: 'Arduino',
              sensors: 'Sensori',
            },
          },
          ai: {
            title: 'Lavori AI',
            subtitle: 'Artificial Intelligence Works',
            description: 'Applicazioni basate su machine learning e intelligenza artificiale',
            tags: {
              ml: 'Machine Learning',
              cv: 'Computer Vision',
              nlp: 'NLP',
            },
          },
        },
      },
    },
  },
};

const SUPPORTED_LANGUAGES = ['tr', 'en', 'de', 'it'];

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'tr';
  const stored = window.localStorage.getItem('language');
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
  const nav = window.navigator.language || window.navigator.userLanguage;
  if (!nav) return 'tr';
  const base = nav.split('-')[0];
  if (SUPPORTED_LANGUAGES.includes(base)) return base;
  return 'tr';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
