'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

export const getHostname = () => process.env.NEXT_PUBLIC_WEBSITE_URL

const rows = [
  {
    key: 1,
    name: '_ga',
    domain: getHostname(),
    desc: 'ID používané k identifikaci uživatelů',
  },
  {
    key: 2,
    name: '_gid',
    domain: getHostname(),
    desc: 'ID slouží k identifikaci uživatelů po dobu 24 hodin od poslední aktivity.',
  },
  {
    key: 3,
    name: '_gat',
    domain: getHostname(),
    desc: 'Slouží ke sledování počtu požadavků serveru Google Analytics při použití nástroje Google Tag Manager.',
  },
  {
    key: 4,
    name: '_ga',
    domain: getHostname(),
    desc: 'ID používané k identifikaci uživatelů',
  },
]

const columns = [
  {
    key: 'name',
    label: 'Cookie',
  },
  {
    key: 'domain',
    label: 'Doména',
  },
  {
    key: 'desc',
    label: 'Popis',
  },
]

interface PrivacyPolicyProps {
  pageData: {
    attributes: {
      name: string
      address: string
      vat: string
      email: string
      dateStart: string
    }
  }
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ pageData }) => {
  if (!pageData || !pageData.attributes) {
    return <div>Načítání...</div>
  }

  return (
    <main className="container pt-16">
      <div className="flex flex-row space-x-4 mb-10">
        <Icon icon="material-symbols:cookie-outline" className="text-6xl text-primary" />

        <h1 className="text-h1 text-primary">Podmínky práce s cookies na webu</h1>
      </div>

      <article className="prose max-w-none dark:prose-invert">
        <p>
          Naše společnost {pageData.attributes.name}, se sídlem na adrese{' '}
          {pageData.attributes.address}, IČO {pageData.attributes.vat} (dále jen &quot;my&quot;),
          využívá soubory cookie pro zajištění hladkého fungování a zlepšení našich internetových
          stránek. Cílem tohoto dokumentu, nazvaného &quot;Zásady používání souborů cookie&quot;
          (dále jen &quot;zásady&quot;), je poskytnout vám informace o tom, jak s těmito soubory
          nakládáme, včetně zpracování osobních údajů, a seznámit vás s vašimi právy podle zákona o
          elektronických komunikacích č. 127/2005 Sb. a nařízení GDPR č. 2016/679. Jako uživatel
          našeho webu jste povinni se seznámit s těmito zásadami. V případě nejasností nebo dotazů
          nás kontaktujte na e-mailu: {pageData.attributes.email}
        </p>

        <h2>Co rozumíme pod pojmem soubory cookie?</h2>

        <p>
          Soubory cookie jsou malé datové soubory, které nám umožňují sbírat informace o našich
          návštěvnících pro zlepšení našich služeb, personalizaci obsahu a zajistění uživatelsky
          přívětivého prostředí na našem webu.
        </p>

        <h2>Funkční cookie</h2>

        <p>
          Tyto soubory jsou klíčové pro základní funkčnost webu a nelze je vypnout. Aktivují se v
          reakci na vaše akce, jako je nastavení soukromí, přihlášení či vyplňování formulářů. Pokud
          tyto soubory zablokujete, může to ovlivnit fungování stránky. Tyto soubory nesbírají
          informace, které by vás osobně identifikovaly.
        </p>

        <h2>Analytické cookie</h2>

        <p>
          Pomáhají nám zlepšovat naše webové stránky tím, že shromažďují informace o tom, jak
          návštěvníci stránku používají. Díky nim můžeme analyzovat návštěvnost a vylepšovat naše
          služby, aby byly pro uživatele co nejpřívětivější. Tyto soubory neuchovávají žádné osobní
          údaje.
        </p>

        <Table
          aria-label="Analytické soubory cookie"
          classNames={{
            wrapper: ['bg-secondary-500 border-none shadow-none'],
            th: ['bg-transparent text-primary border-none'],
          }}
        >
          <TableHeader columns={columns}>
            {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows}>
            {item => (
              <TableRow key={item.key}>
                {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <h2>Marketingové cookie</h2>

        <p>
          Tyto soubory slouží k personalizaci reklamních sdělení tak, aby byly pro vás co
          nejrelevantnější. Zaznamenávají vaše preference a návštěvy na webu a informace z nich
          mohou být sdíleny s externími reklamními partnery. Tyto soubory používáme pouze s vaším
          souhlasem.
        </p>

        <h2>Jak můžete svá práva uplatnit</h2>

        <p>
          Máte možnost kdykoliv změnit své preference týkající se souborů cookie a již uložené
          soubory cookie můžete odstranit. Více informací najdete v nápovědě vašeho prohlížeče.
          Souhlas s používáním souborů cookie je možné kdykoliv odvolat.
        </p>

        <h2>Aktualizace těchto zásad</h2>

        <p>
          Tyto zásady nabývají účinnosti od {pageData.attributes.dateStart}. V případě potřeby si
          vyhrazujeme právo na jejich aktualizaci. Doporučujeme vám pravidelně kontrolovat
          nejnovější verzi těchto zásad na našem webu. Jakékoli změny vstupují v platnost okamžitě
          po zveřejnění.
        </p>
      </article>
    </main>
  )
}

export default PrivacyPolicy
