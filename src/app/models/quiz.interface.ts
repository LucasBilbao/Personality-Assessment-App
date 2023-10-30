export interface Quiz {
  personalityCode: string;
  title?: string;
  imgPath?: string;
}

export interface QuizCollection {
  question: string;
  data: Quiz[];
}
