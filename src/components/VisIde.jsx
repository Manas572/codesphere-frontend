import { useEditorStore, Visualization } from '@/store'
import React, { useEffect, useRef } from 'react'
import { Editor } from '@monaco-editor/react'

const VisIde = () => {
  const { code } = useEditorStore()
  const { steps, stepno } = Visualization()

  const editorRef = useRef(null)
  const monacoRef = useRef(null)
  const decorationIdsRef = useRef([])

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco
  }

  const highlightLine = (lineNumber) => {
    if (!editorRef.current || !monacoRef.current) return

    const editor = editorRef.current
    const monaco = monacoRef.current

    decorationIdsRef.current = editor.deltaDecorations(
      decorationIdsRef.current,
      [
        {
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          options: {
            isWholeLine: true,
            className: 'current-execution-line',
            glyphMarginClassName: 'current-execution-glyph',
          },
        },
      ]
    )

    editor.revealLineInCenter(lineNumber)
  }

  useEffect(() => {
    if (!steps.length) return
    highlightLine(steps[stepno].line)
  }, [stepno, steps])

  return (
    <div className="h-full flex flex-col">
      <Editor
        height="100%"
        theme="vs-dark"
        value={code}
        onMount={handleEditorDidMount}
        options={{
          readOnly: true,
          domReadOnly: true,
          cursorBlinking: "solid",
          renderLineHighlight: "none",
          selectionHighlight: false,
          occurrencesHighlight: false,
          glyphMargin: true,
        }}
      />
    </div>
  )
}

export default VisIde
