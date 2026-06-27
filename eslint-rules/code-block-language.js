// eslint-rules/code-block-language.js
// STD-DOC-002 Markdown Formatting v2.4 -- ESLint enforcement
// Enforces section 5.4: every fenced code block must specify a language.
// If the exact language is unknown, `text` or `bash` must be used as a fallback.

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require language specification in fenced code blocks (STD-DOC-002 section 5.4)",
    },
    messages: {
      missingLanguage:
        "Code block must specify a language. Use 'text' or 'bash' if unknown (STD-DOC-002 section 5.4).",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode || context.getSourceCode();
    const text = sourceCode.getText();
    const lines = text.split("\n");

    // Match opening fences without a language: ``` without anything after
    const fenceRegex = /^```(\s*)$/;

    return {
      Program() {
        lines.forEach((line, index) => {
          if (fenceRegex.test(line)) {
            context.report({
              loc: { line: index + 1, column: 0 },
              messageId: "missingLanguage",
            });
          }
        });
      },
    };
  },
};