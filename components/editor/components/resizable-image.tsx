'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useRef } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export function ResizableImageNodeView({ node, updateAttributes, selected }: NodeViewProps): JSX.Element {

  const wrapperRef = useRef<HTMLDivElement>(null);

  const width: string = node.attrs.width ?? '100%';

  function startResize(e: React.MouseEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();

    const startX      = e.clientX;
    const startWidth  = wrapperRef.current?.offsetWidth ?? 0;
    const parentWidth = wrapperRef.current?.parentElement?.offsetWidth ?? startWidth;

    function onMove(ev: MouseEvent): void {
      const delta    = ev.clientX - startX;
      const newPx    = Math.max(80, startWidth + delta);
      const newPct   = Math.min(100, Math.round((newPx / parentWidth) * 100));
      updateAttributes({ width: `${newPct}%` });
    }

    function onUp(): void {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  return (
    <NodeViewWrapper
      ref={wrapperRef}
      style={{ display: 'block', width, maxWidth: '100%', position: 'relative', lineHeight: 0 }}
    >
      <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>

        {/* eslint-disable-next-line @next/next/no-img-element -- editor-inserted image with arbitrary/blob src; next/image can't optimize without per-domain config */}
        <img
          src={node.attrs.src}
          alt={node.attrs.alt ?? ''}
          title={node.attrs.title ?? undefined}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: 8,
            outline: selected ? '2px solid var(--primary-main)' : 'none',
            outlineOffset: 2,
          }}
          draggable={false}
        />

        {/* Resize handle — only visible when selected */}
        {selected && (
          <div
            onMouseDown={startResize}
            title="Sleep om te vergroten of verkleinen"
            style={{
              position: 'absolute',
              bottom: 6,
              right: 6,
              width: 18,
              height: 18,
              borderRadius: 4,
              background: 'var(--primary-main)',
              cursor: 'nwse-resize',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            {/* Grip dots */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <circle cx="3" cy="7" r="1.2" />
              <circle cx="7" cy="7" r="1.2" />
              <circle cx="7" cy="3" r="1.2" />
            </svg>
          </div>
        )}

      </div>
    </NodeViewWrapper>
  );
}