export const tryParseJson = <TText = unknown>(
  text: string
): TText | undefined => {
  let res;
  try {
    res = JSON.parse(text);
  } catch (_) {
    return;
  }
  return res;
};

export const tryStringifyJson = <TValue = unknown>(
  value: TValue,
  space?: number | string
): string | undefined => {
  let res;
  try {
    res = JSON.stringify(value, undefined, space);
  } catch (_) {
    return;
  }
  return res;
};

export const tryPrintJson = <TData = unknown>(
  data: TData,
  space: number | string = 2
) => {
  let res;
  try {
    const tempStr = tryStringifyJson(data, space);

    res = tempStr
      ? tempStr
          .replace(/&/g, "&amp;")
          //.replace(/\\"/g, "&bsol;&quot;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(
            /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/gm,
            (
              match: string,
              indent: string | undefined,
              key: string | undefined,
              value: string | undefined,
              end: string | undefined
            ) => {
              const indentHtml = indent
                ? '<span style="color: gray">' + indent + "</span>"
                : "";
              //key.replace(/"([\w]+)": |(.*): /, "$1$2")
              const keyHtml = key
                ? '<span style="color: brown">' +
                  (key ? key.replace(/..$/, "") : "") +
                  "</span>" +
                  '<span style="color: gray">: </span>'
                : "";
              const valueHtml = value
                ? (/^"/.test(value)
                    ? '<span style="color: olive">'
                    : /true|false/.test(value)
                    ? '<span style="color: teal">'
                    : /null/.test(value)
                    ? '<span style="color: magenta">'
                    : '<span style="color: navy">') +
                  value +
                  "</span>"
                : "";
              const endHtml = end
                ? '<span style="color: gray">' + end + "</span>"
                : "";
              return indentHtml + keyHtml + valueHtml + endHtml;
            }
          )
      : undefined;
  } catch (_) {
    return;
  }
  return res;
};
