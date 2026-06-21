import { CodeBlock } from "@/components/content/CodeBlock";
import { slugifyHeading } from "@/components/content/slugify";

function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.92em]">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

export function MDXContent({ body }: { body: string }) {
  const lines = body.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;
  let codeLang = "";
  let codeRunnable = false;
  let codeRunAfter = "";

  function parseCodeFence(value: string) {
    const [language = "", ...meta] = value.trim().split(/\s+/);
    const runMeta = meta.find((item) => item === "run" || item.startsWith("run="));

    return {
      language,
      runnable: Boolean(runMeta),
      runAfter: runMeta?.startsWith("run=") ? runMeta.replace("run=", "") : ""
    };
  }

  function flushList(key: string) {
    if (!list.length) return;
    blocks.push(
      <ul key={key} className="my-5 list-disc space-y-2 pl-6 text-slate-700">
        {list.map((item, index) => (
          <li key={index}>
            <InlineCode text={item} />
          </li>
        ))}
      </ul>
    );
    list = [];
  }

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      if (inCode) {
        const codeText = code.join("\n");
        blocks.push(
          <CodeBlock
            key={`code-${index}`}
            code={codeText}
            language={codeLang}
            runnable={codeRunnable}
            runAfter={codeRunAfter}
          />
        );
        code = [];
        codeLang = "";
        codeRunnable = false;
        codeRunAfter = "";
        inCode = false;
      } else {
        flushList(`list-${index}`);
        inCode = true;
        const fence = parseCodeFence(line.replace("```", ""));
        codeLang = fence.language;
        codeRunnable = fence.runnable;
        codeRunAfter = fence.runAfter;
      }
      return;
    }

    if (inCode) {
      code.push(line);
      return;
    }

    if (line.startsWith("- ")) {
      list.push(line.replace("- ", ""));
      return;
    }

    flushList(`list-${index}`);

    if (!line.trim()) return;

    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={index} className="mt-2 text-4xl font-bold tracking-normal text-ink">
          {line.replace("# ", "")}
        </h1>
      );
      return;
    }

    if (line.startsWith("## ")) {
      const text = line.replace("## ", "");
      blocks.push(
        <h2 key={index} id={slugifyHeading(text)} className="mt-10 text-2xl font-bold text-ink">
          {text}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      const text = line.replace("### ", "");
      blocks.push(
        <h3 key={index} id={slugifyHeading(text)} className="mt-8 text-xl font-bold text-ink">
          {text}
        </h3>
      );
      return;
    }

    blocks.push(
      <p key={index} className="my-4 leading-8 text-slate-700">
        <InlineCode text={line} />
      </p>
    );
  });

  flushList("list-end");

  return <div className="prose-safe">{blocks}</div>;
}
