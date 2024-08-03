import React from "react";

// icons
import BoldIcon from "../icons/Bold";
import ItalicIcon from "../icons/Italic";
import UnderlineIcon from "../icons/Underline";
import StrikeThroughIcon from "../icons/StrikeThrough";
import CodeIcon from "../icons/Code";
import CodeBlockIcon from "../icons/CodeBlock";
import LinkIcon from "../icons/LinkIcon";
import HighlightIcon from "../icons/Highlight";
import TextColorIcon from "../icons/TextColor";
import SubScriptIcon from "../icons/SubScript";
import SuperScriptIcon from "../icons/SuperScript";
import AlignLeftIcon from "../icons/AlignLeft";
import CenterAlignIcon from "../icons/CenterAlign";
import AlignRightIcon from "../icons/AlignRight";
import AlignJustifyIcon from "../icons/AlignJustify";


export default function BubbleMenuButtons({editor}){
    return     <div className="bubble-menu">
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
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={editor.isActive('codeBlock') ? 'is-active' : ''}
    >
      <CodeBlockIcon/>
    </button>


    <button
      onClick={() => {
        if(editor.isActive('link')){
            editor.chain().focus().unsetLink().run();
        }else{
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('URL', previousUrl);
            
            // cancelled
            if (url === null) {
                return
            }

            // empty
            if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()
        
                return
            }
  
                // update link
            editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run();
        }
      }}
      className={editor.isActive('link') ? 'is-active' : ''}
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

}