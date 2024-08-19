import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


function TextEditor({editorState,setEditorState,onEditorStateChange,view}) {
   
  
    return (
      <div className='w-full min-h-[300px] bg-white p-4 rounded-md mt-4 border-[1px] border-black'>
        <Editor
          readOnly={view}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </div>
    );
  }
  
  export default TextEditor;