import type { CookieConsentConfig } from 'vanilla-cookieconsent'

const getConfig = () => {
  const config: CookieConsentConfig = {
    // root: 'body',
    // autoShow: true,
    // disablePageInteraction: true,
    // hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
      // name: 'cc_cookie',
      // domain: location.hostname,
      // path: '/',
      // sameSite: "Lax",
      // expiresAfterDays: 365,
    },

    /**
     * Callback functions
     */
    // onFirstConsent: ({ cookie }) => {
    //   console.log('onFirstConsent fired', cookie);
    // },

    // onConsent: ({ cookie }) => {
    //   console.log('onConsent fired!', cookie);
    // },

    // onChange: ({ changedCategories, changedServices }) => {
    //   console.log('onChange fired!', changedCategories, changedServices);
    // },

    // onModalReady: ({ modalName }) => {
    //   console.log('ready:', modalName);
    // },

    // onModalShow: ({ modalName }) => {
    //   console.log('visible:', modalName);
    // },

    // onModalHide: ({ modalName }) => {
    //   console.log('hidden:', modalName);
    // },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
      consentModal: {
        layout: 'box inline',
        position: 'bottom left',
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: 'box',
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        enabled: true, // this category is enabled by default
        readOnly: true, // this category cannot be disabled
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^_ga/, // regex: match all cookies starting with '_ga'
            },
            {
              name: '_gid', // string: exact cookie name
            },
          ],
        },

        // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
        services: {
          ga: {
            label: 'Google Analytics',
            onAccept: () => {},
            onReject: () => {},
          },
        },
      },
      ads: {},
    },

    language: {
      default: 'cs',
      translations: {
        cs: {
          consentModal: {
            title: 'Souhlas s využitím cookies',
            description:
              'Využíváme cookies k personalizaci obsahu, analýze návštěvnosti a zároveň ke zlepšení zážitku z našich webových stránek. Prosíme, vyjádřete svůj souhlas s používáním cookies.',
            acceptAllBtn: 'Přijmout',
            acceptNecessaryBtn: 'Odmítnout',
            showPreferencesBtn: 'Nastavení cookies',
            // closeIconLabel: 'Reject all and close modal',
            footer: `
                        <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                    `,
          },
          preferencesModal: {
            title: 'Nastavení cookies',
            acceptAllBtn: 'Přijmout vše',
            acceptNecessaryBtn: 'Odmítnout vše',
            savePreferencesBtn: 'Přijmout vybrané',
            closeIconLabel: 'Zavřít',
            serviceCounterLabel: 'Služba|Služby',
            sections: [
              {
                title: 'Co jsou cookies?',
                description: `Soubory cookie používáme k analýze údajů o našich návštěvnících, ke zlepšení našich webových stránek, zobrazení personalizovaného obsahu a k tomu, abychom vám poskytli skvělý zážitek z webu.`,
              },
              {
                title: 'Nezbytné cookies',
                description:
                  'Tyto soubory cookie jsou nezbytné pro fungování webových stránek, není tedy možné je zakázat. Obvykle se nastavují v reakci na akci, kterou na webu sami provedete, jako je nastavení zabezpečení, přihlášení a vyplňování formulářů. Svůj prohlížeč můžete nastavit tak, aby blokoval soubory cookie nebo o nich zasílal upozornění. Mějte na paměti, že některé stránky nebudou bez těchto souborů fungovat. Tyto soubory cookie neukládají žádné informace, které lze přiřadit konkrétní osobě. Tyto soubory cookie můžeme nastavit my nebo poskytovatelé třetích stran, jejichž služby na webu využíváme. Tyto soubory cookie neukládají žádné informace, které lze přiřadit konkrétní osobě.',

                //this field will generate a toggle linked to the 'necessary' category
                linkedCategory: 'necessary',
                cookieTable: {
                  caption: 'Detail cookie',
                  headers: {
                    name: 'Cookie',
                    domain: 'Doména',
                    desc: 'Popis',
                  },
                  body: [
                    {
                      name: 'cc_cookie',
                      domain: location.hostname,
                      desc: 'Ukládá souhlas uživatele s používáním cookies.',
                    },
                    {
                      name: 'PHPSESSID',
                      domain: location.hostname,
                      desc: 'Ukládá informace o uživatelově relaci.',
                    },
                  ],
                },
              },
              {
                title: 'Analytické cookies',
                description:
                  'Tyto soubory cookie se používají ke zlepšení fungování webových stránek. Umožňují nám rozpoznat a sledovat počet návštěvníků a sledovat, jak návštěvníci web používají. Pomáhají nám zlepšovat způsob, jakým webové stránky fungují, například tím, že uživatelům umožňují snadno najít to, co hledají. Tyto soubory cookie neshromažďují informace, které by vás mohly identifikovat. Pomocí těchto nástrojů analyzujeme a pravidelně zlepšujeme funkčnost našich webových stránek. Získané statistiky můžeme využít ke zlepšení uživatelského komfortu a k tomu, aby byla návštěva webu pro vás jako uživatele zajímavější. Tyto analytické soubory cookie budou použity pouze s vaším souhlasem.',
                linkedCategory: 'analytics',
                cookieTable: {
                  caption: 'Detail cookie',
                  headers: {
                    name: 'Cookie',
                    domain: 'Doména',
                    desc: 'Popis',
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: location.hostname,
                      desc: 'ID používané k identifikaci uživatelů',
                    },
                    {
                      name: '_gid',
                      domain: location.hostname,
                      desc: 'ID slouží k identifikaci uživatelů po dobu 24 hodin od poslední aktivity.',
                    },
                    {
                      name: '_gat',
                      domain: location.hostname,
                      desc: 'Slouží ke sledování počtu požadavků serveru Google Analytics při použití nástroje Google Tag Manager.',
                    },
                    {
                      name: '_ga',
                      domain: location.hostname,
                      desc: 'ID používané k identifikaci uživatelů',
                    },
                  ],
                },
              },
              {
                title: 'Marketingové cookies',
                description:
                  'Používají se ke sledování preferencí webu uživatele za účelem cílení reklamy, tj. zobrazování marketingových a reklamních sdělení (i na stránkách třetích stran), které mohou návštěvníka webu zajímat, v souladu s těmito preferencemi. Marketingové cookies využívají nástroje externích společností. Tyto marketingové soubory cookie budou použity pouze s vaším souhlasem.',
                linkedCategory: 'ads',
              },
              {
                title: 'Více o cookies',
                description:
                  'Pro více informací o cookies a ochraně soukromí: <a href="/privacy-policy" target="_blank">Privacy Policy</a>',
              },
            ],
          },
        },
      },
    },
  }

  return config
}

export default getConfig
