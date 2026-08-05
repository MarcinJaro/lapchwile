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
  { question: "Czy można przynieść własny tort?", answer: null },
  { question: "Czy można zamówić catering?", answer: null },
  { question: "Czy imprezy odbywają się podczas deszczu?", answer: null },
  { question: "Od ilu dzieci organizowane są urodziny?", answer: null },
  { question: "Czy rodzice zostają?", answer: null },
  { question: "Czy można zorganizować urodziny zimą?", answer: null },
];

export const answeredFaqItems = faqItems.filter(
  (item): item is FaqItem & { answer: string } => item.answer !== null
);
