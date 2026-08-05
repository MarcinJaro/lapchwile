/**
 * FAQ content. Questions come from the brief. Answers are BUSINESS DECISIONS
 * and must be confirmed by the owner; until then `answer: null` renders an
 * honest "odpowiedź wkrótce" state and the question is excluded from
 * FAQPage schema. Fill in the answers here, nowhere else.
 */

export type FaqItem = {
  question: string;
  /** TODO: uzupełnić odpowiedzi po ustaleniu zasad z właścicielką. */
  answer: string | null;
};

export const faqItems: FaqItem[] = [
  {
    question: "Czy można przynieść własny tort?",
    answer:
      "Tak, oczywiście. Przywieźcie tort, który solenizant lubi najbardziej, a my zadbamy o talerzyki, świeczki i wspólne sto lat przy ściance Łap Chwile.",
  },
  {
    question: "Czy można zamówić catering?",
    answer:
      "Tak. Współpracujemy z #CHILL, który przygotował specjalne boxy dla naszych gości urodzinowych. Wybór boxu i szczegóły ustalamy przy rezerwacji.",
  },
  {
    question: "Czy imprezy odbywają się podczas deszczu?",
    answer:
      "Tak. Gdy zaczyna padać, przenosimy się do przestronnego namiotu, więc animacje i zabawa trwają dalej bez względu na pogodę.",
  },
  {
    question: "Od ilu dzieci organizowane są urodziny?",
    answer:
      "Nie mamy sztywnego minimum. Jeśli chcesz, możesz zabrać tylko najlepszego kumpla albo kumpelę, a przyjęcie i tak będzie na sto procent.",
  },
  {
    question: "Czy rodzice zostają?",
    answer:
      "Tak, rodzice zostają na miejscu i podglądają zabawę ze strefy relaksu. Kawa w ręku, impreza w zasięgu wzroku, a animacjami zajmujemy się my.",
  },
  {
    /**
     * TODO: właściciel odpowiedział żartem ("Pomidor"), a to pytanie wymaga
     * konkretnej zasady biznesowej. Do potwierdzenia: czy strefa działa zimą.
     */
    question: "Czy można zorganizować urodziny zimą?",
    answer: null,
  },
];

export const answeredFaqItems = faqItems.filter(
  (item): item is FaqItem & { answer: string } => item.answer !== null
);
