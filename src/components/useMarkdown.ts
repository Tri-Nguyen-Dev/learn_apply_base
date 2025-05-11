import markdownit from 'markdown-it'
import hljs from 'highlight.js';


export const useMarkdownFormat = () => {
    const md = markdownit({
        // Enable HTML tags in source
        html: false,

        // Use '/' to close single tags (<br />).
        // This is only for full CommonMark compatibility.
        xhtmlOut: false,

        // Convert '\n' in paragraphs into <br>
        breaks: false,

        // CSS language prefix for fenced blocks. Can be
        // useful for external highlighters.
        langPrefix: 'language-',

        // Autoconvert URL-like text to links
        linkify: false,

        // Enable some language-neutral replacement + quotes beautification
        // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
        typographer: false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '“”‘’',

        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externally.
        // If result starts with <pre... internal wrapper is skipped.
        highlight: function (str: string, lang: string) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre><code>${hljs.highlight(str, {language: lang}).value}</code><button class="copy-btn">Copy</button></pre>`;
                } catch (__) {
                }
            }
            return `<pre><code>${md.utils.escapeHtml(str)}</code><button class="copy-btn"">Copy</button></pre>`;
        }
    });

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const code = token.content.trim();
        const lang = token.info.trim();

        // Check if the language is "mermaid"
        if (lang === 'mermaid') {
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
            // Return a placeholder div for Mermaid
            setTimeout(() => {
                mermaid.init(undefined, `#${id}`);
            }, 0);
            return `<div class="mermaid" id="${id}">${code}</div>`;
        }

        // For other languages, use default rendering
        return `<pre><code>${md.utils.escapeHtml(code)}</code></pre>`;
    };

    const renderedMarkdown = (content: string) => {
        return md.render('```javascript\nconsole.log("Hello, World!");\n```');
    }

    return {
        renderedMarkdown
    }
}
