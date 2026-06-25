import { useEffect, useRef, useState } from "react";

/**
 * Displays one or more n8n workflows inside the project page.
 *
 * The component fetches the selected workflow file, injects its text content
 * into the n8n-demo web component, and displays loading or error states.
 *
 * @param {Object} props
 * @param {Object[]} props.workflows - Workflow entries to display.
 * @param {string} props.workflows[].src - Path to the workflow file.
 * @param {string} [props.workflows[].label] - Optional tab label.
 * @returns {JSX.Element|null} Rendered workflow block or null when empty.
 */
export default function N8nWorkflow({ workflows = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [workflowResult, setWorkflowResult] = useState({
    src: null,
    text: "",
    error: false,
  });

  const demoRef = useRef(null);

  const safeActiveIdx = workflows.length
    ? Math.min(activeIdx, workflows.length - 1)
    : 0;

  const active = workflows[safeActiveIdx];

  const isCurrentWorkflowLoaded = workflowResult.src === active?.src;
  const isLoading = Boolean(active?.src && !isCurrentWorkflowLoaded);
  const hasError = Boolean(isCurrentWorkflowLoaded && workflowResult.error);

  const workflowText =
    isCurrentWorkflowLoaded && !workflowResult.error ? workflowResult.text : "";

  useEffect(() => {
    if (!active?.src) return;

    const controller = new AbortController();

    fetch(active.src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Workflow not found: ${active.src}`);
        }

        return response.text();
      })
      .then((text) => {
        setWorkflowResult({
          src: active.src,
          text,
          error: false,
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;

        console.error(error);

        setWorkflowResult({
          src: active.src,
          text: "",
          error: true,
        });
      });

    return () => controller.abort();
  }, [active?.src]);

  useEffect(() => {
    if (!workflowText || !demoRef.current) return;

    const frame = requestAnimationFrame(() => {
      if (demoRef.current) {
        demoRef.current.workflow = workflowText;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [workflowText, active?.src]);

  if (!workflows.length) return null;

  return (
    <div className="proj-workflow-block">
      {workflows.length > 1 && (
        <div
          className="proj-workflow-tabs"
          role="tablist"
          aria-label="Workflows"
        >
          {workflows.map((workflow, i) => {
            const isActive = i === safeActiveIdx;

            return (
              <button
                key={workflow.src || i}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`proj-workflow-tab ${
                  isActive ? "proj-workflow-tab--active" : ""
                }`}
                onClick={() => setActiveIdx(i)}
              >
                <span className="proj-workflow-tab-dot" />
                <span className="proj-workflow-tab-label">
                  {workflow.label || `Workflow ${i + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="proj-workflow-panel">
        {isLoading && (
          <div className="proj-workflow-state">Chargement du workflow...</div>
        )}

        {hasError && (
          <div className="proj-workflow-state proj-workflow-state--error">
            Impossible de charger ce workflow.
          </div>
        )}

        <div
          className={`proj-workflow ${
            isLoading ? "proj-workflow--loading" : ""
          }`}
        >
          {workflowText && (
            <n8n-demo
              key={`${active.src}-${safeActiveIdx}`}
              ref={demoRef}
              frame="true"
              tidyup="true"
              clicktointeract="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
