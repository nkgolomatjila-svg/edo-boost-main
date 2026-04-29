# EduBoost SA: Comprehensive Implementation Plan
**Status: All Outstanding Features & Tasks**  
**Date: 2026-04-29**

---

## 📊 Project Status Summary

### Completed Work ✅
- **Agentic Execution Roadmap:** 10/10 Epics (100% Complete)
  - Redis Circuit Breaker
  - Celery Job Scheduling
  - Visual E2E Frontend Hardening
  - POPIA Security & Chaos Sweep
  - Gamification Metrics & Observability
  - AI Model Governance & Prompt Versioning
  - Diagnostic Engine IRT Hardening
  - Mastery-Driven Study Plans
  - Gamification System Hardening
  - Parent Dashboard & Reporting Loop

### Outstanding Implementation ⏳
- **EduBoost Improvements Roadmap:** 21/21 Items (0% Complete)
  - Phase 1 (Critical): 6 items
  - Phase 2 (Pipeline): 5 items
  - Phase 3 (Optimization): 5 items
  - Phase 4 (Pedagogical): 5 items

---

## 🔴 Phase 1: Critical Bugs & Security (6 Items)
*Must be resolved before any real learner traffic.*

### Item 1: Delete Dead Code File
- **File:** `app/api/services/lessons_router.py`
- **Issue:** Dead draft superseded by `app/api/routers/lessons.py`, contains non-existent imports
- **Action:** Remove file and add linting rule
- **Priority:** High
- **Complexity:** Trivial
- **Route to Agent:** Phase 0 Executor (Critical fixes)

### Item 2: Fix Guardian Authentication
- **File:** `app/api/routers/auth.py` (guardian login handler)
- **Issue:** Returns JWT without verifying learner exists or email matches
- **Action:** Add database lookup against `learner_identities` table
- **Requirement:** Verify email against stored records before issuing JWT
- **Error Code:** Return HTTP 401 on failure
- **Priority:** Critical
- **Complexity:** Medium
- **Route to Agent:** EduBoost Security & Compliance Officer

### Item 3: Route Frontend Lesson Generation Through Backend
- **Files:** `app/frontend/src/pages/EduBoostApp.jsx`, `app/api/routers/lessons.py`
- **Issue:** Frontend calls Anthropic directly, bypassing Judiciary/Fourth Estate/PII scrubber
- **Action:** Replace `callClaude()` with backend `/api/v1/lessons/generate` endpoint
- **Requirement:** Remove all direct Anthropic LLM calls from frontend
- **Priority:** Critical (POPIA Violation)
- **Complexity:** High
- **Dependency:** Item 5 (Async client must be implemented first)
- **Route to Agent:** EduBoost Backend Architect

### Item 4: Upgrade Learner ID Hashing to Salted SHA-256
- **Files:** `app/api/orchestrator.py`, `app/api/profiler.py`
- **Issue:** Plain SHA-256 hashes vulnerable to brute-force reversal
- **Action:** Replace with `hmac.new(SALT.encode(), learner_id.encode(), 'sha256')`
- **Requirement:** Use `ENCRYPTION_SALT` environment variable
- **Priority:** High
- **Complexity:** Low
- **Route to Agent:** EduBoost Security & Compliance Officer

### Item 5: Replace Synchronous Anthropic with AsyncAnthropic
- **File:** `app/api/core/inference_gateway.py`
- **Issue:** Blocking sync client stalls FastAPI event loop (2–8 seconds/call)
- **Action:** Implement `AsyncAnthropic()` with `await client.messages.create(...)`
- **Requirement:** All LLM calls must be async
- **Priority:** Critical
- **Complexity:** High
- **Route to Agent:** EduBoost Backend Architect

### Item 6: Validate LLM JSON Output with Pydantic
- **File:** `app/api/core/inference_gateway.py`
- **Issue:** Schema mismatches cause opaque 500 errors
- **Action:** Wrap parsing with `model_validate()`, catch `ValidationError`
- **Requirement:** Return HTTP 422 with structured errors
- **Tests:** Verify error handling with invalid JSON responses
- **Priority:** High
- **Complexity:** Medium
- **Dependency:** Item 5 (Async refactoring enables structured validation)
- **Route to Agent:** EduBoost Backend Architect

---

## 🟠 Phase 2: Pipeline Completion (5 Items)
*Wire up missing Five-Pillar paths from design to runtime.*

### Item 7: Wire Fourth Estate to Redis
- **File:** `app/api/core/fourth_estate.py`
- **Issue:** Currently uses in-memory `deque` capped at 1000 events, lost on restart
- **Action:** Update factory to use `FourthEstate(redis_url=settings.REDIS_URL, ...)`
- **Requirement:** Activate permanent regulatory-grade audit trail
- **Priority:** High
- **Complexity:** Medium
- **Route to Agent:** EduBoost Infrastructure & Data Engineer

### Item 8: Implement Redis Read/Write in Ether Profiler
- **File:** `app/api/core/ether_profiler.py`
- **Issue:** Profiler never saves computed archetypes, every lesson uses defaults
- **Action:** Implement Redis `get` and `setex` for `LearnerEtherProfile` data
- **Requirement:** Store and retrieve player archetype data
- **TTL:** Appropriate for learner profiles (e.g., 7 days)
- **Priority:** High
- **Complexity:** Medium
- **Dependency:** Item 7 (Redis connection required)
- **Route to Agent:** EduBoost Backend Architect

### Item 9: Add GENERATE_STUDY_PLAN and GENERATE_PARENT_REPORT to ActionType
- **Files:** `app/api/models/orchestrator.py`, `app/api/orchestrator.py`
- **Issue:** Endpoints bypass Orchestrator, Judiciary, Fourth Estate
- **Action:** Update `ActionType` enum, add constitutional rules, route through Orchestrator
- **Requirement:** Constitutional rules POPIA_01, PII_01 in corpus
- **Priority:** High
- **Complexity:** Medium
- **Route to Agent:** EduBoost Backend Architect

### Item 10: Implement Lesson Caching & Return lesson_id
- **File:** `app/api/routers/lessons.py`
- **Issue:** Generated lessons not stored, `GET /api/v1/lessons/{lesson_id}` returns 404
- **Action:** Generate UUID `lesson_id`, store JSON in Redis with `SETEX`
- **Requirement:** Include ID in API response
- **Redis TTL:** Appropriate for lesson persistence (e.g., 30 days)
- **Priority:** High
- **Complexity:** Medium
- **Dependency:** Item 7 (Redis for storage)
- **Route to Agent:** EduBoost Backend Architect

### Item 11: Add Input Schema Validation
- **Files:** `app/api/services/study_plan_service.py`, `app/api/services/parent_report_service.py`
- **Issue:** Functions accept raw primitives, may allow PII bypass
- **Action:** Create `StudyPlanParams` and `ParentReportParams` Pydantic models
- **Requirement:** Strict validation, reject unknown keys
- **Priority:** High
- **Complexity:** Low
- **Route to Agent:** EduBoost Backend Specialist

---

## 🟡 Phase 3: Optimization & Developer Experience (5 Items)
*Reduce fragility, improve maintainability, close subtle correctness issues.*

### Item 12: Add Redis Circuit Breaker with Local-Log Fallback
- **File:** `app/api/core/fourth_estate.py`
- **Issue:** If Redis down, audit events lost
- **Action:** Implement circuit breaker with fallback to local JSONL log file
- **Requirement:** Emit Prometheus metrics for fallback rate
- **Tests:** Simulate Redis failure scenarios
- **Priority:** High
- **Complexity:** Medium
- **Dependency:** Item 7 (Redis Fourth Estate setup)
- **Route to Agent:** EduBoost Infrastructure & Data Engineer

### Item 13: Reconcile PII Regex Patterns
- **Files:** `app/api/core/inference_gateway.py`, `app/api/core/judiciary.py`, new `app/api/core/pii_patterns.py`
- **Issue:** Different files use different regex (missing 08x, 09x ranges for phone numbers)
- **Action:** Centralize patterns in `app/api/core/pii_patterns.py`
- **Requirement:** Add regression tests (e.g., mastery scores like `0.62` should not be flagged)
- **Priority:** Medium
- **Complexity:** Low
- **Route to Agent:** EduBoost Backend Specialist

### Item 14: Externalize Prompts to Jinja2 Templates
- **Files:** Multiple (all hardcoded prompts), new `app/api/prompts/`
- **Issue:** Prompts hardcoded in Python, difficult to edit for curriculum experts
- **Action:** Move prompts to `.jinja2` files in `/prompts` directory
- **Requirement:** Wire to existing `PromptTemplate` database table for RLHF tracking
- **Prompts to migrate:** Lesson generation, study plan, parent report, diagnostic intro
- **Priority:** Medium
- **Complexity:** Medium
- **Status Note:** Partially completed in Epic 6 (basic structure in place)
- **Route to Agent:** EduBoost Backend Architect

### Item 15: Document Ether Archetypes & Add Development Fixtures
- **File:** `app/api/core/ether_profiler.py`
- **Issue:** Kabbalistic names (KETER, YESOD) opaque to new contributors
- **Action:** Add comprehensive docstrings mapping archetypes to behavioral meanings
- **Fixture:** Create test fixture factory for integration testing
- **Priority:** Low
- **Complexity:** Low
- **Route to Agent:** EduBoost Backend Specialist

### Item 16: Separate Coverage Flags into Makefile
- **Files:** `pytest.ini`, new `Makefile` or `pyproject.toml`
- **Issue:** Coverage flags slow down TDD loop
- **Action:** Move `--cov` flags to dedicated `make coverage` target
- **Priority:** Low
- **Complexity:** Trivial
- **Route to Agent:** Phase 0 Executor

---

## 🟢 Phase 4: Pedagogical & Accessibility Hardening (5 Items)
*Grade R–1 voice, stateful diagnostics, offline support.*

### Item 17: Implement STT/TTS Gateway for Grade R–1
- **Files:** New `app/api/core/voice_gateway.py`, `app/api/routers/voice.py`
- **Issue:** Young learners (5–7 years) can't always read; voice required
- **Action:** Create `VoiceGateway` wrapping Whisper/Google Cloud Speech
- **Requirement:** PII scrubbing for transcripts, add `GENERATE_VOICE_RESPONSE` logic
- **Priority:** Medium
- **Complexity:** High
- **Route to Agent:** EduBoost Backend Architect

### Item 18: Convert Diagnostic Endpoint to Stateful Real-Time Session
- **Files:** `app/api/routers/diagnostics.py`, `app/api/services/diagnostic_service.py`
- **Issue:** Current endpoint simulates answers instead of conducting real session
- **Action:** Implement `/session/start` and `/session/{id}/answer` endpoints
- **Requirement:** Store IRT state in Redis, stateful questionnaire progression
- **Priority:** High
- **Complexity:** High
- **Dependency:** Item 7 (Redis for state), Item 8 (Ether profiles)
- **Tests:** Integration tests with real-time state progression
- **Route to Agent:** EduBoost Psychometric Systems Engineer

### Item 19: Refactor Judiciary to Strategy Pattern
- **File:** `app/api/core/judiciary.py`
- **Issue:** Validation rules diverge per subject (Maths vs. Language); complex if/else
- **Action:** Implement `JudiciaryStrategy` protocol for subject-specific rules
- **Requirement:** Easy addition of new subjects via strategy instances
- **Priority:** Medium
- **Complexity:** Medium
- **Route to Agent:** EduBoost Backend Architect

### Item 20: Implement Celery Tasks for RLHF & Study Plan Regeneration
- **File:** `app/api/tasks/celery_tasks.py`
- **Issue:** Infrastructure ready, but no tasks running
- **Action:** Create tasks for nightly feedback processing (RLHF) and Sunday study plan regeneration
- **Tasks:**
  - `aggregate_rlhf_feedback` (nightly, 02:00 UTC)
  - `regenerate_weekly_study_plans` (Sunday, 22:00 UTC)
- **Priority:** High
- **Complexity:** Medium
- **Route to Agent:** EduBoost Backend Architect

### Item 21: Add Offline-Mode Service Worker & Local Lesson Cache
- **Files:** `app/frontend/src/lib/serviceWorker.ts`, `app/frontend/src/lib/offlineDB.ts`
- **Issue:** South African learners have intermittent internet; need offline resilience
- **Action:** Implement Next.js service worker with IndexedDB caching
- **Requirement:** Cache last 5 lessons and current study plan locally
- **Capability:** Learners complete lessons offline, sync on reconnect
- **Priority:** Medium
- **Complexity:** High
- **Route to Agent:** EduBoost Frontend PWA Specialist

---

## 📋 Implementation Sequence (Dependency-Aware)

### Wave 1: Foundation (Must Complete First)
1. ✅ Item 5: AsyncAnthropic (enables Items 3, 6)
2. Item 6: LLM JSON validation (enables Item 9)
3. Item 4: Salted SHA-256 (security hardening)

### Wave 2: Fourth Estate & Storage
4. Item 7: Wire Fourth Estate to Redis (enables Items 8, 10, 12)
5. Item 12: Redis Circuit Breaker (supports Item 7)
6. Item 8: Ether Redis caching (depends on Item 7)
7. Item 10: Lesson caching (depends on Item 7)

### Wave 3: Orchestrator & Pipelines
8. Item 9: Add ActionType enums (depends on Item 6)
9. Item 2: Fix guardian auth (security)
10. Item 3: Frontend → Backend routing (depends on Item 5, Item 9)
11. Item 11: Input schema validation

### Wave 4: Code Quality & Hardening
12. Item 1: Delete dead code
13. Item 13: Reconcile PII patterns
14. Item 14: Externalize prompts
15. Item 15: Document Ether archetypes
16. Item 16: Separate coverage flags

### Wave 5: Advanced Features
17. Item 18: Stateful diagnostic sessions (depends on Item 7, Item 8)
18. Item 19: Judiciary Strategy Pattern (supports Item 17)
19. Item 17: Voice gateway
20. Item 20: Celery RLHF tasks (depends on Item 9)
21. Item 21: Offline service worker (depends on Item 18)

---

## 🚀 Agent Routing Summary

| Phase | Agent | Items |
|-------|-------|-------|
| **1: Critical** | Backend Architect | 3, 5, 6 |
| | Security Officer | 2, 4 |
| | Phase 0 Executor | 1 |
| **2: Pipeline** | Backend Architect | 8, 9, 10 |
| | Backend Specialist | 11 |
| | Infrastructure Engineer | 7 |
| **3: Optimization** | Infrastructure Engineer | 12 |
| | Backend Specialist | 13, 15, 16 |
| | Backend Architect | 14 |
| **4: Pedagogical** | Psychometric Engineer | 18 |
| | Backend Architect | 17, 19, 20 |
| | Frontend PWA Specialist | 21 |

---

## 📊 Metrics & Success Criteria

### Critical Success Factors
- All Phase 1 items complete before production launch
- Async refactoring eliminates FastAPI event loop blocking
- POPIA compliance verified through security sweep
- Fourth Estate immutability confirmed through tests

### Performance Targets
- API endpoint latency: < 500ms p99
- LLM provider fallback rate: < 2%
- Audit trail durability: 99.99% (zero loss)

### Test Coverage Targets
- All new code: > 90% coverage
- Fourth Estate module: > 95% coverage
- Security-critical functions: 100% coverage

---

## 📝 Next Steps

1. **Commit Agent Definitions** — Push AGENT_DEFINITIONS.md and updated AGENT_INSTRUCTIONS.md
2. **Wave 1 Implementation** — Route Items 5, 6, 4 to appropriate agents
3. **Wave 2 Foundation** — Execute Fourth Estate Redis integration
4. **Ongoing Tracking** — Update ACTIVE_TASKS.md as each item completes
5. **Final Verification** — Run full test suite and security sweep before production deployment

---

**Last Updated:** 2026-04-29  
**Roadmap Checksum:** All 21 items catalogued and sequenced  
**Next Review:** Upon completion of Phase 1
