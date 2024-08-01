import {
    Editor, isNodeSelection, isTextSelection, posToDOMRect,
  } from '@tiptap/core'
  import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state'
  import { EditorView } from '@tiptap/pm/view'
  import tippy from 'tippy.js'
  
  export class BubbleMenuView {
    constructor({
      editor,
      element,
      view,
      tippyOptions = {},
      updateDelay = 250,
      shouldShow,
    }) {
      this.editor = editor
      this.element = element
      this.view = view
      this.updateDelay = updateDelay
      this.tippyOptions = tippyOptions
      this.preventHide = false
      this.tippy = undefined
      this.updateDebounceTimer = undefined
  
      this.shouldShow = shouldShow || this.defaultShouldShow
  
      this.element.addEventListener('mousedown', this.mousedownHandler, { capture: true })
      this.view.dom.addEventListener('dragstart', this.dragstartHandler)
      this.editor.on('focus', this.focusHandler)
      this.editor.on('blur', this.blurHandler)
  
      // Detaches menu content from its current parent
      this.element.remove()
      this.element.style.visibility = 'visible'
    }
  
    defaultShouldShow = ({ view, state, from, to }) => {
      const { doc, selection } = state
      const { empty } = selection
  
      const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection)
      const isChildOfMenu = this.element.contains(document.activeElement)
      const hasEditorFocus = view.hasFocus() || isChildOfMenu
  
      if (!hasEditorFocus || empty || isEmptyTextBlock || !this.editor.isEditable) {
        return false
      }
  
      return true
    }
  
    mousedownHandler = () => {
      this.preventHide = true
    }
  
    dragstartHandler = () => {
      this.hide()
    }
  
    focusHandler = () => {
      setTimeout(() => this.update(this.editor.view))
    }
  
    blurHandler = ({ event }) => {
      if (this.preventHide) {
        this.preventHide = false
        return
      }
  
      if (event?.relatedTarget && this.element.parentNode?.contains(event.relatedTarget)) {
        return
      }
  
      this.hide()
    }
  
    tippyBlurHandler = (event) => {
      this.blurHandler({ event })
    }
  
    createTooltip() {
      const { element: editorElement } = this.editor.options
      const editorIsAttached = !!editorElement.parentElement
  
      if (this.tippy || !editorIsAttached) {
        return
      }
  
      this.tippy = tippy(editorElement, {
        duration: 0,
        getReferenceClientRect: null,
        content: this.element,
        interactive: true,
        trigger: 'manual',
        placement: 'top',
        hideOnClick: 'toggle',
        ...this.tippyOptions,
      })
  
      if (this.tippy.popper.firstChild) {
        this.tippy.popper.firstChild.addEventListener('blur', this.tippyBlurHandler)
      }
    }
  
    update(view, oldState) {
      const { state } = view
      const hasValidSelection = state.selection.from !== state.selection.to
  
      if (this.updateDelay > 0 && hasValidSelection) {
        this.handleDebouncedUpdate(view, oldState)
        return
      }
  
      const selectionChanged = !oldState?.selection.eq(view.state.selection)
      const docChanged = !oldState?.doc.eq(view.state.doc)
  
      this.updateHandler(view, selectionChanged, docChanged, oldState)
    }
  
    handleDebouncedUpdate = (view, oldState) => {
      const selectionChanged = !oldState?.selection.eq(view.state.selection)
      const docChanged = !oldState?.doc.eq(view.state.doc)
  
      if (!selectionChanged && !docChanged) {
        return
      }
  
      if (this.updateDebounceTimer) {
        clearTimeout(this.updateDebounceTimer)
      }
  
      this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(view, selectionChanged, docChanged, oldState)
      }, this.updateDelay)
    }
  
    updateHandler = (view, selectionChanged, docChanged, oldState) => {
      const { state, composing } = view
      const { selection } = state
  
      const isSame = !selectionChanged && !docChanged
  
      if (composing || isSame) {
        return
      }
  
      this.createTooltip()
  
      const { ranges } = selection
      const from = Math.min(...ranges.map(range => range.$from.pos))
      const to = Math.max(...ranges.map(range => range.$to.pos))
  
      const shouldShow = this.shouldShow?.({
        editor: this.editor,
        view,
        state,
        oldState,
        from,
        to,
      })
  
      if (!shouldShow) {
        this.hide()
        return
      }
  
      this.tippy?.setProps({
        getReferenceClientRect: this.tippyOptions?.getReferenceClientRect || (() => {
          if (isNodeSelection(state.selection)) {
            let node = view.nodeDOM(from)
  
            const nodeViewWrapper = node.dataset.nodeViewWrapper ? node : node.querySelector('[data-node-view-wrapper]')
  
            if (nodeViewWrapper) {
              node = nodeViewWrapper.firstChild
            }
  
            if (node) {
              return node.getBoundingClientRect()
            }
          }
  
          return posToDOMRect(view, from, to)
        }),
      })
  
      this.show()
    }
  
    show() {
      this.tippy?.show()
    }
  
    hide() {
      this.tippy?.hide()
    }
  
    destroy() {
      if (this.tippy?.popper.firstChild) {
        this.tippy.popper.firstChild.removeEventListener('blur', this.tippyBlurHandler)
      }
      this.tippy?.destroy()
      this.element.removeEventListener('mousedown', this.mousedownHandler, { capture: true })
      this.view.dom.removeEventListener('dragstart', this.dragstartHandler)
      this.editor.off('focus', this.focusHandler)
      this.editor.off('blur', this.blurHandler)
    }
  }
  
  export const BubbleMenuPlugin = (options) => {
    return new Plugin({
      key: typeof options.pluginKey === 'string' ? new PluginKey(options.pluginKey) : options.pluginKey,
      view: view => new BubbleMenuView({ view, ...options }),
    })
  }
  