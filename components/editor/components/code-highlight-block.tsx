// IMPORTS
// ----------------------------------------------------------------------------------------------------

import './code-highlight-block.css';

import { JSX } from 'react';
import type { NodeViewProps } from '@tiptap/react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

import { editorClasses } from '../classes';

// ----------------------------------------------------------------------

export function Code_highlight_block({
  node: { attrs: { language: defaultLanguage } },
  extension,
  updateAttributes,
}: NodeViewProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <NodeViewWrapper className={editorClasses.content.codeBlock}>
      <select
        name="language"
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(e) => updateAttributes({ language: e.target.value })}
        className={editorClasses.content.langSelect}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight.listLanguages().map((lang: string) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <pre>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <NodeViewContent as={'code' as any} />
      </pre>
    </NodeViewWrapper>
  );

}
