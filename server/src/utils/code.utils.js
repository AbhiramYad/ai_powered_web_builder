export const parseGenerationResponse = (responseText) => {
  let code = '';
  let description = '';

  const normalizedText = responseText || '';
  const lowerText = normalizedText.toLowerCase();
  const htmlMarker = '```html';
  const startIndex = lowerText.indexOf(htmlMarker);

  if (startIndex !== -1) {
    description = normalizedText.slice(0, startIndex).trim();

    const codeStart = startIndex + htmlMarker.length;
    const endIndex = normalizedText.indexOf('```', codeStart);

    if (endIndex !== -1) {
      code = normalizedText.slice(codeStart, endIndex).trim();
    }
  } else {
    const genericMarker = '```';
    const genericStart = normalizedText.indexOf(genericMarker);

    if (genericStart !== -1) {
      description = normalizedText.slice(0, genericStart).trim();
      const genericCodeStart = genericStart + genericMarker.length;
      const genericEnd = normalizedText.indexOf('```', genericCodeStart);

      if (genericEnd !== -1) {
        code = normalizedText.slice(genericCodeStart, genericEnd).trim();

        // If a language tag exists after ``` (e.g. ```javascript), strip that first line.
        const firstLineBreak = code.indexOf('\n');
        if (firstLineBreak !== -1) {
          const firstLine = code.slice(0, firstLineBreak).trim();
          if (/^[a-zA-Z0-9_-]+$/.test(firstLine)) {
            code = code.slice(firstLineBreak + 1).trim();
          }
        }
      }
    } else {
      description = normalizedText.trim();

      // Fallback: support responses that return plain HTML without code fences.
      const htmlStart = lowerText.search(/<!doctype\s+html|<html[\s>]/i);
      if (htmlStart !== -1) {
        description = normalizedText.slice(0, htmlStart).trim();
        code = normalizedText.slice(htmlStart).trim();
      }
    }
  }

  return { description, code };
};