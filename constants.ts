import { Grade, CourseType, CourseCategory } from './types';

// UI Labels
export const GRADE_LABELS: Record<Grade, string> = {
  [Grade.PRE_K_JUNIOR]: '年少 (3歳児)',
  [Grade.PRE_K_MIDDLE]: '年中 (4歳児)',
  [Grade.PRE_K_SENIOR]: '年長 (5歳児)',
  [Grade.ELEM_1]: '小学1年生',
  [Grade.ELEM_2]: '小学2年生',
  [Grade.ELEM_3]: '小学3年生',
  [Grade.ELEM_4]: '小学4年生',
  [Grade.ELEM_5]: '小学5年生',
  [Grade.ELEM_6]: '小学6年生',
  [Grade.JUNIOR_HIGH]: '中学生',
};

export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  [CourseCategory.REGULAR]: '通常クラス (体操・サッカー・チア)',
  [CourseCategory.WEEKLY_2]: '週2回コース (同一種目)',
  [CourseCategory.DREAMERS]: 'チアリーディング選抜・育成 (TSS Dreamers)',
};

export const COURSE_TYPE_LABELS: Record<CourseType, string> = {
  [CourseType.REGULAR_1]: '1種目',
  [CourseType.REGULAR_2]: '2種目パック',
  [CourseType.WEEKLY_2]: '週2回コース',
  [CourseType.DREAMERS_DEV]: '育成クラス',
  [CourseType.DREAMERS_MINI]: '選抜Mini',
  [CourseType.DREAMERS_YOUTH]: '選抜Youth',
  [CourseType.DREAMERS_JUNIOR]: '選抜Junior',
};

// Pricing Constants
export const PLUS_ONE_PRICE = 3500;
export const ANNUAL_FEE_FIRST = 8800;
export const ANNUAL_FEE_SUBSEQUENT = 4400;

export const SIBLING_DISCOUNT_2ND = 1500;
export const SIBLING_DISCOUNT_3RD = 2000;

// Logic Helpers
export const isPreKJunior = (grade: Grade) => grade === Grade.PRE_K_JUNIOR;
export const isPreK = (grade: Grade) => [Grade.PRE_K_JUNIOR, Grade.PRE_K_MIDDLE, Grade.PRE_K_SENIOR].includes(grade);
export const isJuniorHigh = (grade: Grade) => grade === Grade.JUNIOR_HIGH;
export const isDreamersEligible = (grade: Grade) => !isPreK(grade); // Elem + Junior High

// Pricing Tables
export const getRegularPrice = (grade: Grade, type: CourseType): number => {
  const isJunior = isPreKJunior(grade);
  
  if (type === CourseType.REGULAR_1) return isJunior ? 3550 : 7100;
  if (type === CourseType.REGULAR_2) return isJunior ? 6100 : 12200;
  return 0;
};

export const getWeekly2Price = (grade: Grade): number => {
  const isJunior = isPreKJunior(grade);
  return isJunior ? 5250 : 10500;
};

export const getDreamersPrice = (type: CourseType): number => {
  switch (type) {
    case CourseType.DREAMERS_DEV: return 10000;
    case CourseType.DREAMERS_MINI: return 14500;
    case CourseType.DREAMERS_YOUTH: return 18500;
    case CourseType.DREAMERS_JUNIOR: return 18500;
    default: return 0;
  }
};