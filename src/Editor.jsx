import React from "react";
import { EditorContent, useEditor,BubbleMenu } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import "./editor.css";

// extensions 
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

// marks
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Highlight from '@tiptap/extension-highlight'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
// custom extension
// import BubbleMenu from "./extension/bubble-menu";


// func
import ListKeymap from '@tiptap/extension-list-keymap'
import Placeholder from '@tiptap/extension-placeholder'
import History from '@tiptap/extension-history'


export default function TiptapEditor() {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,

            // extensions 
            Blockquote,
            BulletList,
            OrderedList,
            ListItem,
            HardBreak,
            Heading,
            HorizontalRule,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),

            // marks
            Bold,
            Code,
            Highlight.configure({ multicolor: true }),
            Italic,
            Link,
            Strike,
            Underline,

            // func
            ListKeymap,
            Placeholder,
            History,
        ],
    })


    if (!editor) {
        return <h1>Loading...</h1>
    }


    return <div style={{ border: "1px solid red", padding: "0px", margin: "0px" }}>
        <EditorContent editor={editor} />

        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bubble-menu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            S
          </button>
        </div>
      </BubbleMenu>
    </div>
}