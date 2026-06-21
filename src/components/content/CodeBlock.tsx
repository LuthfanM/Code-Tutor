"use client";

import { Check, Copy, Play } from "lucide-react";
import { useState } from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
  runnable?: boolean;
  runAfter?: string;
};

type RunResult = {
  output: string[];
  error?: string;
};

const runnableLanguages = new Set(["js", "javascript"]);

function buildRunCode(code: string, runAfter?: string) {
  if (!runAfter) return code;
  const expression = runAfter.includes("(") ? runAfter : `${runAfter}()`;

  return `${code}\n${expression};`;
}

function runJavaScript(code: string, runAfter?: string): Promise<RunResult> {
  return new Promise((resolve) => {
    const workerScript = `
      const formatValue = (value) => {
        if (typeof value === "string") return value;
        if (typeof value === "undefined") return "undefined";
        if (typeof value === "function") return value.toString();

        try {
          return JSON.stringify(value);
        } catch {
          return String(value);
        }
      };

      const output = [];
      const console = {
        log: (...args) => output.push(args.map(formatValue).join(" ")),
        error: (...args) => output.push(args.map(formatValue).join(" ")),
        warn: (...args) => output.push(args.map(formatValue).join(" "))
      };

      self.onmessage = (event) => {
        const sendResult = () => {
          self.postMessage({ output });
        };

        try {
          const fn = new Function("console", event.data);
          const result = fn(console);
          Promise.resolve(result).then(() => {
            setTimeout(sendResult, 250);
          }).catch((error) => {
            self.postMessage({
              output,
              error: error instanceof Error ? error.message : String(error)
            });
          });
        } catch (error) {
          self.postMessage({
            output,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      };
    `;
    const blob = new Blob([workerScript], { type: "text/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    const timeout = window.setTimeout(() => {
      worker.terminate();
      resolve({ output: [], error: "Execution timed out" });
    }, 2000);

    worker.onmessage = (event: MessageEvent<RunResult>) => {
      window.clearTimeout(timeout);
      worker.terminate();
      resolve(event.data);
    };

    worker.postMessage(buildRunCode(code, runAfter));
  });
}

export function CodeBlock({ code, language, runnable = false, runAfter }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const canRun = runnable && runnableLanguages.has(language ?? "");

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function runCode() {
    if (!canRun) return;
    setRunning(true);
    setRunResult(null);
    const result = await runJavaScript(code, runAfter);
    setRunResult(result);
    setRunning(false);
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {language || "code"}
        </span>
        <div className="flex items-center gap-2">
          {canRun ? (
            <button
              type="button"
              onClick={runCode}
              disabled={running}
              className="inline-flex h-8 items-center gap-2 rounded-md border border-emerald-700 px-2.5 text-xs font-semibold text-emerald-100 transition hover:border-emerald-500 hover:bg-emerald-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Play size={14} />
              {running ? "Running" : "Run"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={copyCode}
            className="inline-flex h-8 items-center gap-2 rounded-md border border-slate-700 px-2.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-100">
        <code data-language={language}>{code}</code>
      </pre>
      {runResult ? (
        <div className="border-t border-slate-800 bg-slate-900 px-4 py-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Output
          </div>
          <pre className="min-h-8 overflow-x-auto text-sm leading-6 text-slate-100">
            <code>
              {[
                ...runResult.output,
                ...(runResult.error ? [`Error: ${runResult.error}`] : [])
              ].join("\n") || "(no output)"}
            </code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}
