export enum Grade {
  PRE_K_JUNIOR = 'PRE_K_JUNIOR', // 年少
  PRE_K_MIDDLE = 'PRE_K_MIDDLE', // 年中
  PRE_K_SENIOR = 'PRE_K_SENIOR', // 年長
  ELEM_1 = 'ELEM_1',
  ELEM_2 = 'ELEM_2',
  ELEM_3 = 'ELEM_3',
  ELEM_4 = 'ELEM_4',
  ELEM_5 = 'ELEM_5',
  ELEM_6 = 'ELEM_6',
  JUNIOR_HIGH = 'JUNIOR_HIGH',
}

export enum CourseCategory {
  REGULAR = 'REGULAR',
  WEEKLY_2 = 'WEEKLY_2',
  DREAMERS = 'DREAMERS',
}

export enum CourseType {
  // Regular
  REGULAR_1 = 'REGULAR_1', // 1種目
  REGULAR_2 = 'REGULAR_2', // 2種目パック
  
  // Weekly 2
  WEEKLY_2 = 'WEEKLY_2', // 週2回
  
  // Dreamers (Cheerleading)
  DREAMERS_DEV = 'DREAMERS_DEV', // 育成
  DREAMERS_MINI = 'DREAMERS_MINI', // 選抜Mini
  DREAMERS_YOUTH = 'DREAMERS_YOUTH', // 選抜Youth
  DREAMERS_JUNIOR = 'DREAMERS_JUNIOR', // 選抜Junior
}

export interface Child {
  id: string;
  grade: Grade;
  courseCategory: CourseCategory;
  courseType: CourseType;
  isPlusOne: boolean;
}

export interface PricingResult {
  monthlyFee: number;
  annualFee: number;
  plusOneFee: number;
  siblingDiscount: number;
  totalMonthly: number;
}

export interface SummaryResult {
  childrenResults: PricingResult[];
  totalMonthly: number;
  totalAnnualFee: number;
  totalSiblingDiscount: number;
}