/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        MarkdownEditor Utility Function
 * CVM-Role:        Utility Function
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This utility function can merge CodeMirror options
 *                  and return a valid CodeMirror option object. This is
 *                  especially useful if you want to update a large chunk
 *                  of options at once without having to resort to setOption()
 *
 * END HEADER
 */

import { CITEPROC_MAIN_DB } from '@dts/common/citeproc'
import generateKeymap from './generate-keymap'
import MarkdownEditor from './index'

/**
 * Returns CodeMirror default options, with sound settings for Zettlr applied.
 *
 * @return  {any}  The settings object
 */
export default function getCodeMirrorDefaultOptions (mdEditorInstance: MarkdownEditor): any {
  return {
    // Default mode: Markdown multiplex (+ syntax highlighting for code blocks)
    mode: 'multiplex',
    // Apply this theme class to prevent the default theme from overriding
    theme: 'zettlr-markdown', // Can be zettlr-markdown or zettlr-code
    // We have different line heights (headings, e.g.)
    singleCursorHeightPerLine: false,
    // Don't focus on instantiation
    autofocus: false,
    // Necessary to (de)activate the instance programmatically later
    readOnly: true,
    // Use the fold gutter
    foldGutter: true,
    // Keep the cursor 60px below/above the editor edges
    cursorScrollMargin: 60,
    // Disable cursor blinking, as we apply a @keyframes animation
    cursorBlinkRate: 0,
    // Don't show lineNumbers by default. This option will be switched for code.
    lineNumbers: false,
    // Specify the fold gutter
    gutters: ['CodeMirror-foldgutter'],
    // Default fold options
    foldOptions: {
      'widget': '\u00A0\u2026\u00A0', // nbsp ellipse nbsp
      'scanUp': false // Do not search upwards if current line cannot be folded
    },
    // Default direction left-to-right
    direction: 'ltr',
    rtlMoveVisually: true,
    // By default, autoCorrect is off due to the size of the object
    // NOTE that this is _not_ the "autocorrect" option of the CodeMirror,
    // but Zettlr's internal version (capital C instead of lowercase c)
    autoCorrect: false,
    // Set to true to start the distraction free mode
    fullScreen: false,
    // Placeholder for empty instances, necessary to maintain the styling
    placeholder: ' ',
    // Soft-wrap longer lines
    lineWrapping: true,
    // Pandoc requires 4 spaces indentation, which is the default
    indentUnit: 4,
    // Whether or not to use tabs for indentation
    indentWithTabs: false,
    autoCloseBrackets: true,
    // Use the default keyMap (needs to be specified for changes to be applied)
    keyMap: 'default',
    // Retrieve any additional keys
    extraKeys: generateKeymap(),
    /**
     * ZETTLR-SPECIFIC OPTIONS
     *
     * These options regulate internal behaviour of the custom plugins Zettlr
     * uses to display certain things, render elements, and the likes. We need
     * to pass this in the CodeMirror options, because many plugins hook in
     * directly to the CodeMirror instance, and are only instantiated by the
     * MarkdownEditor class.
     */
    zettlr: {
      // Element rendering
      render: {
        citations: true,
        iframes: true,
        images: true,
        links: true,
        math: true,
        tasks: true,
        headingTags: true,
        tables: true,
        emphasis: true
      },
      // Maximum width of images
      imagePreviewWidth: 100,
      // Maximum height of images
      imagePreviewHeight: 100,
      // Zettelkasten elements; necessary for the renderers
      zettelkasten: {
        idRE: '(\\d{14})', // How to determine IDs
        linkStart: '[[', // Zettelkasten link start
        linkEnd: ']]' // Zettelkasten link end
      },
      metadata: {
        path: '', // Absolute path to the current file
        id: '', // ID of the current file
        // Can be undefined (do not offer citation autocomplete), CITEPROC_DB_MAIN
        // (use the main library), or an absolute path (use a file-specific db)
        library: CITEPROC_MAIN_DB
      },
      // The base path used to render the image in case of relative URLs
      markdownImageBasePath: '',
      // The characters used for bold formatting
      markdownBoldFormatting: '**',
      // The characters used for italic formatting
      markdownItalicFormatting: '_',
      // Maps to the editor.citeStyle setting
      citeStyle: 'regular',
      // If set to true, lines will be dimmed in distraction free
      muteLines: true,
      // The algorithm to be used for the readability mode
      readabilityAlgorithm: 'dale-chall',
      // If true, the editor will attempt to keep the cursor in the
      // middle of the line
      typewriterMode: false
    }
  }
}
