import React from 'react';
import { SummaryResult } from '../types';

interface SummaryProps {
  summary: SummaryResult;
}

export const Summary: React.FC<SummaryProps> = ({ summary }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* MAIN CARD: Monthly Fee */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-500 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 bg-emerald-500 h-1"></div>
        <div className="p-6 text-center">
          <h2 className="text-emerald-800 font-bold text-lg mb-4 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            月額受講料 合計
          </h2>
          
          <div className="text-5xl font-extrabold text-emerald-600 tracking-tight mb-2">
            {formatCurrency(summary.totalMonthly)}
            <span className="text-lg font-medium text-gray-400 ml-1">/月</span>
          </div>

          <div className="mt-6 bg-emerald-50 rounded-lg p-4 space-y-3 text-sm text-left">
             {summary.childrenResults.map((child, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-emerald-100 last:border-0 pb-2 last:pb-0">
                   <div className="flex flex-col">
                      <span className="font-bold text-gray-700">{idx + 1}人目</span>
                      <div className="text-xs text-gray-500 flex flex-wrap gap-x-2">
                        {child.siblingDiscount > 0 && <span className="text-orange-500 font-medium">兄弟割引 -{formatCurrency(child.siblingDiscount)}</span>}
                        {child.plusOneFee > 0 && <span className="text-blue-600 font-medium">オプション +{formatCurrency(child.plusOneFee)}</span>}
                      </div>
                   </div>
                   <span className="font-bold text-gray-800">{formatCurrency(child.totalMonthly)}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* SECONDARY CARD: Annual Fee */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
           <h3 className="text-gray-600 font-bold text-sm flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
             年会費（年1回・別途）
           </h3>
        </div>
        <div className="p-4">
           <div className="flex justify-between items-end mb-3">
              <span className="text-xs text-gray-500">合計</span>
              <span className="text-xl font-bold text-gray-700">{formatCurrency(summary.totalAnnualFee)}</span>
           </div>
           
           <div className="space-y-1 border-t border-gray-100 pt-2">
              {summary.childrenResults.map((child, idx) => (
                 <div key={idx} className="flex justify-between text-xs text-gray-400">
                    <span>{idx + 1}人目</span>
                    <span>{formatCurrency(child.annualFee)}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Notes */}
      <div className="text-xs text-gray-400 text-center px-2">
        ※表示価格は税込です。<br/>
        ※スポーツ保険料や指定用品代が別途必要となる場合があります。
      </div>
    </div>
  );
};