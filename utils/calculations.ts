import { Child, CourseCategory, CourseType, PricingResult, SummaryResult } from '../types';
import { 
  getRegularPrice, 
  getWeekly2Price, 
  getDreamersPrice, 
  PLUS_ONE_PRICE, 
  ANNUAL_FEE_FIRST, 
  ANNUAL_FEE_SUBSEQUENT,
  SIBLING_DISCOUNT_2ND,
  SIBLING_DISCOUNT_3RD
} from '../constants';

export const calculateChildFee = (child: Child): { base: number, plusOne: number } => {
  let base = 0;
  let plusOne = 0;

  switch (child.courseCategory) {
    case CourseCategory.REGULAR:
      base = getRegularPrice(child.grade, child.courseType);
      break;
    case CourseCategory.WEEKLY_2:
      base = getWeekly2Price(child.grade);
      break;
    case CourseCategory.DREAMERS:
      base = getDreamersPrice(child.courseType);
      break;
  }

  if (child.isPlusOne) {
    plusOne = PLUS_ONE_PRICE;
  }

  return { base, plusOne };
};

export const calculateSummary = (children: Child[]): SummaryResult => {
  const childrenResults: PricingResult[] = [];
  let totalMonthlyBase = 0;
  let totalPlusOne = 0;
  let totalSiblingDiscount = 0;
  let totalAnnualFee = 0;

  children.forEach((child, index) => {
    const { base, plusOne } = calculateChildFee(child);
    
    // Annual Fee Logic
    const annualFee = index === 0 ? ANNUAL_FEE_FIRST : ANNUAL_FEE_SUBSEQUENT;
    
    // Sibling Discount Logic (Applied to monthly fee)
    let siblingDiscount = 0;
    if (index === 1) siblingDiscount = SIBLING_DISCOUNT_2ND; // 2nd child
    if (index === 2) siblingDiscount = SIBLING_DISCOUNT_3RD; // 3rd child

    const monthlyTotalForChild = base + plusOne - siblingDiscount;

    childrenResults.push({
      monthlyFee: base,
      plusOneFee: plusOne,
      siblingDiscount,
      annualFee,
      totalMonthly: monthlyTotalForChild
    });

    totalMonthlyBase += base;
    totalPlusOne += plusOne;
    totalSiblingDiscount += siblingDiscount;
    totalAnnualFee += annualFee;
  });

  const totalMonthly = totalMonthlyBase + totalPlusOne - totalSiblingDiscount;

  return {
    childrenResults,
    totalMonthly,
    totalAnnualFee,
    totalSiblingDiscount
  };
};

export const canSelectPlusOne = (child: Child): boolean => {
  // Condition 1: Multi-sports benefit (2 subjects OR Weekly 2)
  if (child.courseType === CourseType.REGULAR_2 || child.courseCategory === CourseCategory.WEEKLY_2) {
    return true;
  }
  // Condition 2: Athlete benefit (Dreamers student)
  if (child.courseCategory === CourseCategory.DREAMERS) {
    return true;
  }
  return false;
};