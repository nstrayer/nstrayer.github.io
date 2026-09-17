/**
 * Turns a `Table: ...` paragraph immediately following a Markdown table into
 * a semantic HTML caption. Inline Markdown in the caption is preserved.
 */
export const tableCaptions = {
  name: 'table-captions',
  element: {
    filter: ['p'],
    visit(node, context) {
      const firstChild = node.children?.[0];

      if (
        !firstChild ||
        firstChild.type !== 'text' ||
        !/^\s*Table:\s*/i.test(firstChild.value)
      ) {
        return;
      }

      const captionText = context.textContent(node).replace(/^\s*Table:\s*/i, '');
      if (!captionText.trim()) return;

      const parent = context.parent(node);
      const index = context.indexOf(node);
      if (!parent || index === undefined) return;

      let previousIndex = index - 1;
      let previousSibling = parent.children[previousIndex];

      while (
        previousSibling?.type === 'text' &&
        previousSibling.value.trim() === ''
      ) {
        previousSibling = parent.children[--previousIndex];
      }

      if (
        previousSibling?.type !== 'element' ||
        previousSibling.tagName !== 'table'
      ) {
        return;
      }

      const captionChildren = node.children
        .map((child, childIndex) => {
          if (childIndex === 0 && child.type === 'text') {
            return {
              type: 'text',
              value: child.value.replace(/^\s*Table:\s*/i, ''),
            };
          }

          return child;
        })
        .filter((child) => child.type !== 'text' || child.value.length > 0);

      context.prependChild(previousSibling, {
        type: 'element',
        tagName: 'caption',
        properties: {},
        children: captionChildren,
      });
      context.removeNode(node);
    },
  },
};
