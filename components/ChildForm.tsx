import React, { useEffect } from 'react';
import { Child, Grade, CourseCategory, CourseType } from '../types';
import { GRADE_LABELS, COURSE_CATEGORY_LABELS, COURSE_TYPE_LABELS, isPreKJunior, isDreamersEligible } from '../constants';
import { canSelectPlusOne } from '../utils/calculations';

interface ChildFormProps {
  child: Child;
  index: number;
  onUpdate: (id: string, updates: Partial<Child>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export const ChildForm: React.FC<ChildFormProps> = ({ child, index, onUpdate, onRemove, canRemove }) => {
  
  // Effect to validate course selection when grade changes
  useEffect(() => {
    // If grade becomes Junior (PreK-3) and Dreamers is selected, reset to Regular
    if (isPreKJunior(child.grade) && child.courseCategory === CourseCategory.DREAMERS) {
      onUpdate(child.id, { 
        courseCategory: CourseCategory.REGULAR, 
        courseType: CourseType.REGULAR_1,
        isPlusOne: false 
      });
    }
  }, [child.grade, child.courseCategory, child.id, onUpdate]);

  // Handle Plus One Validation
  useEffect(() => {
    if (!canSelectPlusOne(child) && child.isPlusOne) {
       onUpdate(child.id, { isPlusOne: false });
    }
  }, [child.courseType, child.courseCategory, child.isPlusOne, child.id, onUpdate, child]);


  const handleCategoryChange = (cat: CourseCategory) => {
    let defaultType = CourseType.REGULAR_1;
    if (cat === CourseCategory.WEEKLY_2) defaultType = CourseType.WEEKLY_2;
    if (cat === CourseCategory.DREAMERS) defaultType = CourseType.DREAMERS_DEV;
    
    onUpdate(child.id, { 
      courseCategory: cat, 
      courseType: defaultType,
      isPlusOne: false // Reset plus one when category changes
    });
  };

  const isDreamersDisabled = isPreKJunior(child.grade);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
      {/* Card Header */}
      <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex justify-between items-center">
        <h3 className="font-bold text-emerald-800 flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm">
            {index + 1}
          </span>
          {index === 0 ? '1人目' : index === 1 ? '2人目' : '3人目'}のお子様
        </h3>
        {canRemove && (
          <button 
            onClick={() => onRemove(child.id)}
            className="text-gray-400 hover:text-red-500 text-sm transition-colors"
          >
            削除
          </button>
        )}
      </div>

      <div className="p-4 md:p-6 space-y-6">
        {/* Grade Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">学年</label>
          <select 
            value={child.grade}
            onChange={(e) => onUpdate(child.id, { grade: e.target.value as Grade })}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block"
          >
            {Object.values(Grade).map((g) => (
              <option key={g} value={g}>{GRADE_LABELS[g]}</option>
            ))}
          </select>
        </div>

        {/* Course Category Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">コースカテゴリー</label>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(CourseCategory).map((cat) => {
              const disabled = cat === CourseCategory.DREAMERS && isDreamersDisabled;
              
              return (
                <label 
                  key={cat} 
                  className={`
                    relative flex items-center p-3 rounded-lg border cursor-pointer transition-colors
                    ${child.courseCategory === cat ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'bg-white border-gray-200 hover:bg-gray-50'}
                    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
                  `}
                >
                  <input
                    type="radio"
                    name={`category-${child.id}`}
                    value={cat}
                    checked={child.courseCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                    disabled={disabled}
                    className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="ml-3 flex flex-col">
                    <span className="block text-sm font-medium text-gray-900">
                      {COURSE_CATEGORY_LABELS[cat]}
                    </span>
                    {disabled && (
                      <span className="block text-xs text-red-500 mt-1">※年少は選択できません</span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Specific Course Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">受講クラス詳細</label>
          
          {child.courseCategory === CourseCategory.REGULAR && (
            <div className="flex gap-2">
              {[CourseType.REGULAR_1, CourseType.REGULAR_2].map(type => (
                <button
                  key={type}
                  onClick={() => onUpdate(child.id, { courseType: type })}
                  className={`flex-1 py-2 px-3 text-sm rounded-md border transition-colors ${
                    child.courseType === type 
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-400'
                  }`}
                >
                  {COURSE_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          )}

          {child.courseCategory === CourseCategory.WEEKLY_2 && (
             <div className="p-3 bg-emerald-50/50 rounded-md border border-emerald-100 text-sm text-emerald-800">
                週2回コース（同一種目）が選択されています
             </div>
          )}

          {child.courseCategory === CourseCategory.DREAMERS && (
            <div className="grid grid-cols-2 gap-2">
              {[CourseType.DREAMERS_DEV, CourseType.DREAMERS_MINI, CourseType.DREAMERS_YOUTH, CourseType.DREAMERS_JUNIOR].map(type => (
                <button
                  key={type}
                  onClick={() => onUpdate(child.id, { courseType: type })}
                  className={`py-2 px-2 text-xs sm:text-sm rounded-md border transition-colors ${
                    child.courseType === type 
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-400'
                  }`}
                >
                  {COURSE_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Plus One Option */}
        <div className="pt-2 border-t border-gray-100">
          <label className={`
            flex items-start p-3 rounded-lg border transition-all
            ${child.isPlusOne ? 'bg-orange-50 border-orange-400' : 'bg-gray-50 border-transparent'}
            ${!canSelectPlusOne(child) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-orange-50/50'}
          `}>
             <input
                type="checkbox"
                checked={child.isPlusOne}
                onChange={(e) => onUpdate(child.id, { isPlusOne: e.target.checked })}
                disabled={!canSelectPlusOne(child)}
                className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-bold text-gray-900">プラスワンオプション (+¥3,500)</span>
                <span className="block text-xs text-gray-600 mt-1">
                  ・マルチスポーツ特典（3種目目）<br/>
                  ・アスリート特典（選抜生が通常クラス追加）
                </span>
                {!canSelectPlusOne(child) && (
                   <span className="block text-xs text-red-500 mt-1 font-medium">※条件を満たしていないため選択できません</span>
                )}
              </div>
          </label>
        </div>

      </div>
    </div>
  );
};