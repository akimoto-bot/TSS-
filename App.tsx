import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Child, Grade, CourseCategory, CourseType } from './types';
import { calculateSummary } from './utils/calculations';
import { Header } from './components/Header';
import { ChildForm } from './components/ChildForm';
import { Summary } from './components/Summary';

const DEFAULT_CHILD: Omit<Child, 'id'> = {
  grade: Grade.ELEM_1,
  courseCategory: CourseCategory.REGULAR,
  courseType: CourseType.REGULAR_1,
  isPlusOne: false
};

const App: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([
    { ...DEFAULT_CHILD, id: uuidv4() }
  ]);

  const addChild = () => {
    if (children.length >= 3) return;
    setChildren([...children, { ...DEFAULT_CHILD, id: uuidv4() }]);
  };

  const removeChild = (id: string) => {
    if (children.length <= 1) return;
    setChildren(children.filter(c => c.id !== id));
  };

  const updateChild = (id: string, updates: Partial<Child>) => {
    setChildren(children.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const summary = useMemo(() => calculateSummary(children), [children]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-10">
      <Header />
      
      <main className="flex-grow max-w-5xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="mb-4 flex justify-between items-end">
             <div>
               <h2 className="text-xl font-bold text-gray-800">お子様の情報を入力</h2>
               <p className="text-sm text-gray-500">最大3名まで登録できます</p>
             </div>
             {children.length < 3 && (
              <button
                onClick={addChild}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg shadow-md transition-all text-sm font-bold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                子どもを追加
              </button>
            )}
          </div>

          <div className="space-y-6">
            {children.map((child, index) => (
              <ChildForm
                key={child.id}
                child={child}
                index={index}
                onUpdate={updateChild}
                onRemove={removeChild}
                canRemove={children.length > 1}
              />
            ))}
          </div>
          
          {children.length === 3 && (
             <p className="text-center text-gray-500 text-sm mt-4">※3名まで登録済みです</p>
          )}
        </div>

        {/* Right Column: Summary (Sticky on Desktop) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24">
             <Summary summary={summary} />
          </div>
        </div>
        
      </main>

      {/* Mobile Sticky Total (Visible only on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40 pb-safe">
         <div className="flex justify-between items-center max-w-lg mx-auto">
            <div>
               <span className="text-xs text-gray-500 block">月額合計</span>
               <span className="text-xl font-bold text-emerald-700">
                  {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(summary.totalMonthly)}
               </span>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
            >
               詳細を確認
            </button>
         </div>
      </div>
      <style>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

export default App;