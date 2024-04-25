'use client'

export default function Aboutmepage() {
  return (
    <div>
      <div className="py-6 font-bold bg-stone-400 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Welcome to Our Budget Tracking App</h1>
      </div>

      <div className="text-center py-20 lg:col-span-32 lg:col-start-1 lg:border-r lg:border-gray-800 lg:pt-6 lg:pb-16 lg:pr-8">
        <p className="text-lg leading-relaxed text-gray-700">
          Our budget tracking app is designed to help you take control of your finances and achieve your financial goals. 
          Whether you're saving for a vacation, planning for retirement, or just trying to stay on top of your monthly expenses, 
          our app provides the tools you need to succeed.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          With our intuitive interfaces and powerful features, you can easily track your income, expenses, and savings. 
          Set budgets for different categories, monitor your spending habits, and visualize your financial progress with 
          insightful charts and graphs.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          Say goodbye to financial stress and hello to financial freedom with our budget tracking app. 
        </p>
      </div>
    </div>
  );
}
