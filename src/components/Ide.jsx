import React, { useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import LangCombobox from './LangCombobox'
import { useEditorStore } from '@/store'

const Ide = () => {
  const editorRef = useRef()

  const { language, code, setCode } = useEditorStore()

  function valchange(el) {
    setCode(el ?? '')
  }

  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  return (
    <div className="h-full flex flex-col">
      <LangCombobox />
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onMount={onMount}
        onChange={function (el) {
          valchange(el)
        }}
      />
    </div>
  )
}

export default Ide
