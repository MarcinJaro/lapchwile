/**
 * Regulamin strefy. Source: "Kopia Regulamin.docx" supplied by the owner
 * on 2026-08-05. Effective date: 31.05.2026. Edit here, nowhere else.
 */

export type RegulaminSection = {
  heading: string;
  points: string[];
};

export const regulaminEffectiveDate = "31 maja 2026";

export const regulaminSections: RegulaminSection[] = [
  {
    heading: "§ 1. Postanowienia ogólne",
    points: [
      "Strefa Łap Chwile (zwana dalej „Strefą”) jest sezonową strefą rodzinnej zabawy na świeżym powietrzu, zlokalizowaną na terenie Portu Pilawa w Nieporęcie.",
      "Organizatorem i operatorem Strefy jest właściciel prowadzący działalność gospodarczą pod nazwą „Łap Chwile Anna Godlewska” („Organizator”).",
      "Wejście na teren Strefy jest równoznaczne z akceptacją niniejszego Regulaminu przez uczestnika oraz opiekuna.",
      "Regulamin jest ogólnodostępny na terenie Strefy oraz na stronie internetowej i profilach społecznościowych Organizatora.",
    ],
  },
  {
    heading: "§ 2. Godziny otwarcia",
    points: [
      "Strefa działa w sezonie letnim. Szczegółowy kalendarz dostępny jest na profilu Facebook i Instagram.",
      "Strefa może zostać zamknięta w przypadku niekorzystnych warunków pogodowych (burza, silny wiatr, ulewny deszcz) lub siły wyższej.",
      "Informacje o bieżącym statusie Strefy publikowane są na bieżąco na Facebooku: facebook.com/lapchwilenieporet.",
    ],
  },
  {
    heading: "§ 3. Warunki wstępu i cennik",
    points: [
      "Wstęp do Strefy jest odpłatny. Aktualne ceny biletów dostępne są przy wejściu oraz na profilach społecznościowych.",
      "Bilet uprawnia do jednorazowego wejścia na teren Strefy w danym dniu.",
      "Dzieci poniżej 3 lat wchodzą bezpłatnie, wyłącznie pod opieką dorosłego.",
      "Organizator może wprowadzać specjalne bilety rodzinne, karnety lub zapisy na konkretną godzinę. Szczegóły podawane są na bieżąco.",
      "Zakupione bilety nie podlegają zwrotowi, chyba że Strefa została zamknięta z przyczyn leżących po stronie Organizatora.",
    ],
  },
  {
    heading: "§ 4. Zasady opieki nad dziećmi",
    points: [
      "Dzieci do lat 7 mogą korzystać ze Strefy wyłącznie pod bezpośrednią, ciągłą opieką dorosłego (rodzica lub pełnoletniego opiekuna).",
      "Opiekun jest odpowiedzialny za bezpieczeństwo dziecka przez cały czas pobytu w Strefie.",
      "Opiekun zobowiązany jest do niezwłocznego reagowania na wszelkie niebezpieczne zachowania dziecka.",
      "Obsługa Strefy nie pełni funkcji opiekunów. Odpowiedzialność za dziecko spoczywa na opiekunie przez cały czas.",
      "Organizator zastrzega sobie prawo do odmowy wstępu lub wyproszenia ze Strefy dzieci bez opieki dorosłego.",
    ],
  },
  {
    heading: "§ 5. Zasady bezpieczeństwa i zachowania",
    points: [
      "Uczestnicy zobowiązani są do zachowania porządku, kultury osobistej oraz poszanowania innych użytkowników i pracowników Strefy.",
      "Zabrania się wspinania na ogrodzenia, barierki, dachy i inne elementy niewyznaczone do zabaw.",
      "Zabrania się biegania w miejscach wyznaczonych tylko do chodzenia (w pobliżu stoisk, gastronomii itp.).",
      "Na terenie Strefy obowiązuje bezwzględny zakaz spożywania alkoholu przez osoby towarzyszące dzieciom podczas korzystania z atrakcji.",
      "Zabrania się wnoszenia i używania niebezpiecznych przedmiotów, w tym ostrych narzędzi, sztucznych ogni, petard i podobnych.",
      "Obsługa ma prawo upomnienia lub wyproszenia ze Strefy każdej osoby naruszającej Regulamin, bez zwrotu opłaty za bilet.",
    ],
  },
  {
    heading: "§ 6. Zasady korzystania z atrakcji",
    points: [
      "Każda atrakcja może posiadać własny regulamin szczegółowy umieszczony przy urządzeniu. Uczestnicy są zobowiązani do jego przestrzegania.",
      "Obsługa atrakcji ma prawo odmowy obsługi lub zatrzymania zabawy w przypadku niezgodnego z przepisami lub niebezpiecznego korzystania.",
      "Ze względów bezpieczeństwa niektóre atrakcje mogą posiadać ograniczenia wiekowe lub wzrostowe. Należy je bezwzględnie przestrzegać.",
      "W przypadku wypadku lub nagłego złego samopoczucia należy niezwłocznie zgłosić się do obsługi Strefy.",
    ],
  },
  {
    heading: "§ 7. Odpowiedzialność",
    points: [
      "Organizator nie ponosi odpowiedzialności za wypadki wynikające z nieprzestrzegania Regulaminu lub instrukcji obsługi atrakcji.",
      "Organizator nie ponosi odpowiedzialności za szkody wynikające z działania siły wyższej (burza, powódź itp.).",
      "Organizator nie odpowiada za rzeczy pozostawione lub zgubione na terenie Strefy.",
      "Rodzice i opiekunowie ponoszą pełną odpowiedzialność za szkody wyrządzone przez ich dzieci osobom trzecim lub mieniu Organizatora.",
      "W przypadku stwierdzenia umyślnego zniszczenia mienia Organizator może dochodzić odszkodowania.",
    ],
  },
  {
    heading: "§ 8. Ochrona danych osobowych (RODO)",
    points: [
      "Administratorem danych osobowych uczestników jest Organizator.",
      "Dane osobowe zbierane są wyłącznie w celach związanych z działalnością Strefy (rezerwacje, konkursy).",
      "Szczegółowe informacje o przetwarzaniu danych dostępne są na stronie internetowej Organizatora.",
      "Fotografie i nagrania wykonywane przez uczestników na własny użytek są dopuszczalne, jednak zabronione jest ich komercyjne wykorzystanie bez zgody Organizatora.",
    ],
  },
  {
    heading: "§ 9. Zasady dotyczące zwierząt",
    points: [
      "Wprowadzanie zwierząt na teren Strefy jest dozwolone wyłącznie po wcześniejszym uzgodnieniu z obsługą.",
      "Właściciel zwierzęcia zobowiązany jest do sprawowania nad nim pełnej kontroli i sprzątania po nim.",
      "Zwierzęta nie mogą przebywać bezpośrednio przy urządzeniach i atrakcjach dla dzieci.",
    ],
  },
  {
    heading: "§ 10. Skargi i sugestie",
    points: [
      "Wszelkie uwagi i reklamacje można składać bezpośrednio obsłudze Strefy lub drogą elektroniczną na adres kontakt@lapchwile.com.",
      "Organizator zobowiązuje się do rozpatrzenia zgłoszenia w terminie 14 dni roboczych.",
    ],
  },
  {
    heading: "§ 11. Postanowienia końcowe",
    points: [
      "Organizator zastrzega sobie prawo do zmiany niniejszego Regulaminu. Zmiany wchodzą w życie z chwilą ich ogłoszenia na terenie Strefy i/lub w mediach społecznościowych.",
      "W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.",
      "Spory wynikłe w związku z działalnością Strefy strony będą starały się rozwiązać polubownie.",
      "Regulamin wchodzi w życie z dniem 31 maja 2026 r.",
    ],
  },
];
