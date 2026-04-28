/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MainLayout } from './components/layout/MainLayout';

export default function App() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Config Panel Placeholder */}
        <div className="lg:col-span-7 bg-[#141414] rounded-2xl border border-white/5 p-6 shadow-xl">
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            Configuration
          </h2>
          <div className="space-y-6 animate-pulse">
            <div className="h-12 bg-white/5 rounded-xl w-full"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-white/5 rounded-xl"></div>
              <div className="h-24 bg-white/5 rounded-xl"></div>
            </div>
            <div className="h-40 bg-white/5 rounded-xl w-full"></div>
          </div>
        </div>

        {/* Preview Placeholder */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-8 flex flex-col items-center justify-center aspect-square shadow-xl sticky top-24">
             <div className="w-64 h-64 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center animate-pulse">
                <p className="text-gray-500 text-sm">QR Preview</p>
             </div>
             <div className="mt-8 w-full grid grid-cols-2 gap-3">
                <div className="h-11 bg-white/5 rounded-xl animate-pulse"></div>
                <div className="h-11 bg-white/5 rounded-xl animate-pulse"></div>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

