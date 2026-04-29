# 🤖 Autonomous Agent Instructions & Configurations

This file contains the core operational directives for any AI Agent (like Antigravity) interacting with the EduBoost SA repository. **All AI models reading this workspace MUST prioritize these instructions.**

## 1. Interaction Paradigm: Elevated Autonomy
Do not wait for micro-managed, line-by-line instructions. Expect high-level "Epics" and execute them autonomously using your available tools. 
- **Prompt Coaching:** Whenever the USER provides a micromanaged prompt (e.g., "Change line 45 in X file"), the Agent **MUST** gently suggest an elevated, goal-oriented version of the prompt for future use.

## 2. Test-Driven Autonomy (TDD Loop)
When tasked with a backend feature or fix, the Agent must autonomously execute the following loop:
1. **Understand:** Read the relevant roadmap/epic.
2. **Test First:** Write integration/unit tests for the expected behavior *before* changing core logic.
3. **Execute:** Run the tests in the terminal (`pytest`). They should fail.
4. **Implement:** Write the core logic.
5. **Verify:** Re-run the tests autonomously. If they fail, read the errors and fix the code. Repeat until green.
6. **Commit:** Once verified, stage and commit the changes.

## 3. Out-Of-The-Box (OOTB) Execution Strategies
Agents must leverage their advanced tooling whenever applicable:
- **Browser Subagents:** When working on the Next.js frontend, do not just assume the React code works. Spawn a browser subagent (`browser_subagent` tool), navigate to the local dev server, visually verify the UI/gamification components, and fix hydration/styling errors autonomously.
- **Chaos Sweeps:** When tasked with security or refactoring, proactively run grep searches across the codebase to ensure system-wide compliance (e.g., POPIA scrubbing, type hinting, linting).
- **Terminal Heavy:** Use background terminal commands to spin up Redis, Postgres, or Celery workers locally to guarantee end-to-end integration before reporting back to the user.

## 4. Roadmap Tracking
All autonomous work is tracked in the following files:
- `audits/roadmaps/Agentic_Execution_Roadmap.md`
- `audits/reports/Agentic_Execution_Report.md`

When executing an Epic, the Agent must update both the Roadmap and the Report upon completion.

## 5. Version Control
All changes MUST be committed and pushed to the remote repository.
- After completing any work (Epic, fix, feature), stage and commit changes
- Push to remote immediately after commit
- Use descriptive commit messages that reference the Epic or task

## 6. Multi-Agent System & Specialization
See `AGENT_DEFINITIONS.md` for a complete reference of specialized agents and their skill sets.

### Available Specialized Agents

**NEW (Skill-Based Agents):**
- **EduBoost Backend Architect** — Async Python, FastAPI concurrency, LLM orchestration, Celery task queues
- **EduBoost Infrastructure & Data Engineer** — Message brokers, Alembic migrations, Kubernetes, DevOps, observability
- **EduBoost Frontend PWA Specialist** — Next.js 14, React 18, Service Workers, offline-first architecture
- **EduBoost Security & Compliance Officer** — IAM, POPIA compliance, Guardian JWT, Zero-PII architecture
- **EduBoost Psychometric Systems Engineer** — IRT models, item bank calibration, Gap-Probe Cascade, CAPS alignment

**EXISTING (General Purpose Agents):**
- **EduBoost Backend Specialist** — Standard FastAPI endpoints, SQLAlchemy models, pytest tests
- **Impact Delivery Agent** — Phase 1-4 improvements, backlog management, feature coordination
- **Phase 0 Executor** — Critical fixes, architecture truth, TDD loop, safety hardening

### Agent Selection Guide

| Situation | Route To |
|-----------|----------|
| Slow API response, async I/O bottleneck, LLM orchestration, Celery tasks | Backend Architect |
| Message broker setup, database migrations, Kubernetes scaling, observability dashboards | Infrastructure & Data Engineer |
| Offline lesson delivery, Service Worker setup, load-shedding resilience | Frontend PWA Specialist |
| POPIA compliance audit, Guardian JWT validation, Zero-PII architecture | Security & Compliance Officer |
| IRT calibration, item bank ingestion, gap detection, CAPS alignment | Psychometric Systems Engineer |
| Standard endpoint implementation, model design, typical testing | Backend Specialist |
| Phase 1-4 improvements, multi-feature coordination | Impact Delivery Agent |
| Critical fixes, architecture truth, safety | Phase 0 Executor |

### Multi-Agent Coordination Patterns

For complex epics requiring multiple specializations:

1. **Define the epic clearly** with success criteria
2. **Identify required skills** from the list above
3. **Execute in sequence**, passing context between agents:
   - Agent A completes its portion → Documents context/assumptions
   - Agent B reads Agent A's context → Executes its portion
   - Continue until epic completion

**Example:** Implementation of offline-first diagnostic test
```
1. Frontend PWA Specialist (design offline caching & sync queue)
2. Backend Architect (ensure async API support for batch uploads)
3. Infrastructure & Data Engineer (message broker capacity planning)
4. Psychometric Systems Engineer (validate offline scoring integrity)
```

### Escalation & Skill Mismatch

If an agent encounters work outside its specialty:
- **Document the blocker clearly**
- **Identify the required skill** from the specialized agents list
- **Escalate to appropriate agent** with full context
- **No agent should attempt work outside its expertise** when a specialized agent is available
