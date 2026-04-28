/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useQR } from './context/QRContext';
import { MainLayout } from './components/layout/MainLayout';
import { QRPreview } from './components/playground/Preview/QRPreview';
import { Accordion } from './components/playground/Sidebar/Accordion';
import { MainOptions } from './components/playground/Sidebar/MainOptions';
import { DotsOptions } from './components/playground/Sidebar/DotsOptions';
import { CornersOptions } from './components/playground/Sidebar/CornersOptions';
import { BackgroundOptions } from './components/playground/Sidebar/BackgroundOptions';
import { ImageOptions } from './components/playground/Sidebar/ImageOptions';
import { QROptions } from './components/playground/Sidebar/QROptions';

import { TemplatesOptions } from './components/playground/Sidebar/TemplatesOptions';
import { LibraryOptions } from './components/playground/Sidebar/LibraryOptions';
import { useAuth } from './context/AuthContext';

import { useQRRedirect } from './hooks/useQRRedirect';

export default function App() {
  useQRRedirect();

  return (
    <MainLayout>
      <div className="w-full flex flex-col lg:flex-row gap-12 items-start max-w-7xl mx-auto">
        {/* Control Panel - Left Side */}
        <div className="w-full lg:w-2/3 space-y-8">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <h2 className="text-xl font-black uppercase tracking-tighter italic text-red-500">Control Panel</h2>
            <div className="h-[2px] flex-1 bg-white/5" />
          </div>

          <div className="flex flex-col border border-white/10 rounded-none overflow-hidden shadow-2xl bg-[#121212]">
            <Accordion title="Presets" defaultOpen={true}>
              <TemplatesOptions />
            </Accordion>

            <Accordion title="Library">
              <LibraryOptions />
            </Accordion>

            <Accordion title="Main Options">
              <MainOptions />
            </Accordion>
            
            <Accordion title="Dots Options">
              <DotsOptions />
            </Accordion>

            <Accordion title="Corners Options">
              <CornersOptions />
            </Accordion>

            <Accordion title="Background Options">
              <BackgroundOptions />
            </Accordion>

            <Accordion title="Image Options">
              <ImageOptions />
            </Accordion>

            <Accordion title="QR Options">
              <QROptions />
            </Accordion>
          </div>

          <div className="pt-8 border-t border-white/5">
            <p className="text-sm text-gray-500 leading-snug font-medium text-center">
              If you have any questions or issues please contact me via email or GitHub Issues.
            </p>
          </div>
        </div>

        {/* Preview Section - Right Side & Sticky */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <h2 className="text-xl font-black uppercase tracking-tighter italic text-blue-500">Preview</h2>
              <div className="h-[2px] flex-1 bg-white/5" />
            </div>
            <div className="bg-[#121212] border border-white/10 p-4 shadow-2xl">
              <QRPreview />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
