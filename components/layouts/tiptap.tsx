'use client'

import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Button} from "@nextui-org/react";

const Tiptap = () => {
  const editorTitle = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<h1>Title</h1>',
  })

  const editorContent = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
      <>
        <div className="flex flex-col">
          <EditorContent editor={editorTitle}/>
          <EditorContent editor={editorContent}/>
        </div>
        <Button>작성</Button>
        <Button>취소</Button>
      </>
  )
}

export default Tiptap