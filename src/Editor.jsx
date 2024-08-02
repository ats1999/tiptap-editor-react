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


// icons
import BoldIcon from "./icons/Bold";
import ItalicIcon from "./icons/Italic";
import UnderlineIcon from "./icons/Underline";
import StrikeThroughIcon from "./icons/StrikeThrough";
import CodeIcon from "./icons/Code";
import CodeBlockIcon from "./icons/CodeBlock";
import LinkIcon from "./icons/LinkIcon";
import HighlightIcon from "./icons/Highlight";
import TextColorIcon from "./icons/TextColor";
import SubScriptIcon from "./icons/SubScript";
import SuperScriptIcon from "./icons/SuperScript";
import AlignLeftIcon from "./icons/AlignLeft";
import CenterAlignIcon from "./icons/CenterAlign";
import AlignRightIcon from "./icons/AlignRight";
import AlignJustifyIcon from "./icons/AlignJustify";


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
            <BoldIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <ItalicIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <UnderlineIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <StrikeThroughIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            <CodeIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <CodeBlockIcon/>
          </button>


          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <LinkIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <HighlightIcon/>
          </button>


          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <TextColorIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <SubScriptIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <SuperScriptIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <AlignLeftIcon/>
          </button>


          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <CenterAlignIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <AlignRightIcon/>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <AlignJustifyIcon/>
          </button>
        </div>
      </BubbleMenu>
    </div>
}