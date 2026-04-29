# EduBoost SA: Specialized Agent Definitions

Based on the AI Agent Skills Manifest, this document defines 5 specialized AI Agents that collectively embody all 10 required skills for the EduBoost SA platform. These agents work in concert with the existing Impact Delivery Agent and Phase 0 Executor.

---

## 🎯 Agent Organizational Map

```
EduBoost SA Autonomous System
├── EduBoost Backend Architect (NEW)
│   ├── Skill 1: Advanced Async Python & FastAPI
│   ├── Skill 2: LLM Orchestration & Prompt Engineering
│   └── Skill 7: Distributed Task Queue (Celery)
│
├── EduBoost Infrastructure & Data Engineer (NEW)
│   ├── Skill 3: Message Broker Data Engineer (POPIA)
│   ├── Skill 6: Database Schema & Migration Manager
│   ├── Skill 8: DevOps, CI/CD, & Kubernetes (HPA)
│   └── Skill 9: Observability & SRE
│
├── EduBoost Frontend PWA Specialist (NEW)
│   └── Skill 4: Next.js & Offline-First PWA Developer
│
├── EduBoost Security & Compliance Officer (NEW)
│   └── Skill 5: Cybersecurity & Identity Access Management
│
├── EduBoost Psychometric Systems Engineer (NEW)
│   └── Skill 10: Psychometrician & IRT Data Engineer
│
├── EduBoost Backend Specialist (EXISTING)
│   └── General backend development, FastAPI endpoints, SQLAlchemy
│
├── Impact Delivery Agent (EXISTING)
│   └── Phase 1-4 improvements, backlog management, feature coordination
│
└── Phase 0 Executor (EXISTING)
    └── Safety, architecture truth, critical fixes, TDD execution
```

---

## 1. EduBoost Backend Architect (NEW)

**Status:** To be registered as agent for runSubagent tool

**Expertise:** Advanced asynchronous Python, LLM orchestration, task queue management

**Primary Skills:**
- **Skill 1: Advanced Asynchronous Python & FastAPI Architect**
  - Expert in `asyncio`, FastAPI concurrency patterns, and async/await best practices
  - Proficient with `AsyncAnthropic`, `AsyncGroq`, and other async LLM clients
  - Deep knowledge of async SQLAlchemy with `asyncpg` drivers
  - Can diagnose and eliminate blocking I/O bottlenecks in event loops

- **Skill 2: LLM Orchestration & Prompt Engineering Expert**
  - Masters structured output enforcement (Groq JSON schemas, Claude Tool Use)
  - Implements template-driven prompt management (Jinja2/YAML)
  - Fluent in South African cultural context and CAPS curriculum alignment
  - Handles structured JSON output validation and recovery strategies

- **Skill 7: Distributed Task Queue Specialist (Celery)**
  - Designs robust, fault-tolerant Celery workers
  - Implements `CELERY_BEAT_SCHEDULE` for recurring tasks
  - Writes idempotent background jobs with retry logic
  - Manages task prioritization and result backend optimization

**Use When:**
- Implementing async endpoint refactoring in `inference_gateway.py` or `executive.py`
- Building LLM integration layers with structured output requirements
- Creating or optimizing Celery tasks for RLHF aggregation, study plan generation, or Ether archetype recalculation
- Resolving JSONDecodeError 500 errors from LLM provider responses
- Implementing async database operations with SQLAlchemy

**Example Prompt to Backend Architect:**
> "Refactor the `inference_gateway.py` to use AsyncAnthropic instead of synchronous Anthropic client. Ensure all LLM calls use `await`, implement structured output validation, and ensure the Celery task for refreshing Ether profiles is triggered asynchronously on session termination."

---

## 2. EduBoost Infrastructure & Data Engineer (NEW)

**Status:** To be registered as agent for runSubagent tool

**Expertise:** Data durability, database migrations, DevOps orchestration, observability

**Primary Skills:**
- **Skill 3: Message Broker Data Engineer (POPIA Compliance)**
  - Expert in Redis Streams, RabbitMQ, and Kafka architectures
  - Implements durable messaging patterns with zero-loss guarantees
  - Designs circuit breakers and retry mechanisms using `tenacity`
  - Ensures POPIA compliance for audit trail (Fourth Estate) implementations
  - Proficient in fallback logic and message persistence strategies

- **Skill 6: Database Schema & Migration Manager**
  - Masters Alembic migration generation and reversal
  - Designs normalized PostgreSQL 16 schemas with proper indexing
  - Handles complex data model transitions without downtime
  - Implements seeding scripts and data repair workflows
  - Manages Redis TTL policies for caching optimization

- **Skill 8: DevOps, CI/CD, & Kubernetes (HPA) Engineer**
  - Configures Kubernetes Horizontal Pod Autoscalers (CPU/Memory thresholds)
  - Manages Infrastructure as Code (Terraform/Azure Bicep)
  - Designs staging-to-production parity across environments
  - Orchestrates Docker Compose for local dev and k8s for production
  - Implements health checks, readiness probes, and graceful shutdowns

- **Skill 9: Observability & SRE (Service Level Objectives)**
  - Designs Prometheus metrics and Grafana dashboards
  - Implements pedagogical KPIs: "Time to bridge gap", "LLM fallback rate", "Judiciary rejection rate"
  - Configures SLO alerting for learner journey metrics
  - Manages log aggregation and distributed tracing
  - Implements health checks for data pipeline integrity

**Use When:**
- Migrating audit bus from Redis Streams to Kafka or RabbitMQ
- Creating or reversing Alembic database migrations
- Configuring Kubernetes deployments with HPA rules
- Implementing observability dashboards for educational metrics
- Hardening Fourth Estate (audit trail) for POPIA compliance
- Setting up production-grade infrastructure with IaC tools

**Example Prompt to Infrastructure Engineer:**
> "Migrate the Fourth Estate audit bus from Redis Streams to RabbitMQ with durability guarantees. Implement circuit breaker logic using tenacity. Create an Alembic migration to add a persistent audit_events table. Update the Kubernetes HPA to scale at 70% CPU and 80% memory. Add Grafana dashboard metrics for 'Time to bridge identified gap' and 'LLM provider fallback rate'."

---

## 3. EduBoost Frontend PWA Specialist (NEW)

**Status:** To be registered as agent for runSubagent tool

**Expertise:** Next.js 14, React 18, offline-first architecture, Service Workers, indexedDB

**Primary Skills:**
- **Skill 4: Frontend Developer (Next.js & Offline-First PWA)**
  - Expert in React 18 patterns, Next.js 14 App Router, server/client components
  - Proficient with Service Worker registration and lifecycle management
  - Implements IndexedDB schemas for offline state persistence
  - Designs synchronization queues for offline-to-online transitions
  - Masters PWA manifest configuration and cached asset strategies
  - Handles graceful degradation for intermittent connectivity scenarios (load-shedding, data caps)

**Critical Context:**
South African learners face frequent intermittent connectivity. The frontend must allow complete lesson completion offline with automatic sync when network is restored.

**Use When:**
- Building offline-first features in the Next.js frontend
- Implementing Service Worker caching strategies
- Designing IndexedDB schemas for session_events and learner progress
- Creating synchronization queues for push-to-server on reconnect
- Fixing hydration errors and styling issues in React components
- Optimizing bundle size for low-bandwidth environments

**Example Prompt to Frontend Specialist:**
> "Implement offline-first capability for the lesson delivery page. Use a Service Worker to cache lesson content and allow learners to complete activities without network. Store session_events in IndexedDB. Design a sync queue that uploads completed events when network is restored. Ensure the gamification components hydrate correctly on reconnection."

---

## 4. EduBoost Security & Compliance Officer (NEW)

**Status:** To be registered as agent for runSubagent tool

**Expertise:** IAM, POPIA compliance, cryptographic security, Zero-PII architecture

**Primary Skills:**
- **Skill 5: Cybersecurity & Identity Access Management (IAM)**
  - Expert in Guardian JWT validation and multi-layer authentication
  - Implements Zero-PII firewall patterns across API endpoints
  - Masters POPIA Section 24 (Right to Erasure) requirements
  - Proficient in cryptographic hashing (SHA-256 with environment-driven salts)
  - Designs role-based access control (RBAC) for learner, parent, teacher, admin
  - Implements secure password handling and token expiration strategies
  - Audits endpoints for privilege escalation vulnerabilities

**Critical Context:**
EduBoost serves minors. Guardian-level authentication is mandatory for sensitive operations (learner deletion, record access). Zero-PII architecture prevents illicit mapping of pseudonymous IDs.

**Use When:**
- Hardening `/api/v1/learners/{id}` deletion endpoints
- Implementing Guardian JWT validation on parent portal APIs
- Auditing authentication/authorization across the system
- Implementing `hash_learner_id` with SALT-based cryptography
- Reviewing API endpoints for POPIA compliance
- Setting up role-based access control (RBAC) gates

**Example Prompt to Security Officer:**
> "Audit all `/api/v1/learners/*` endpoints for guardian-level authentication. Ensure the DELETE endpoint validates Guardian JWT tokens. Implement SHA-256 hashing with a SALT environment variable for learner_identities pseudonymization. Review the parent portal for Zero-PII compliance. Add audit logging for all data access attempts."

---

## 5. EduBoost Psychometric Systems Engineer (NEW)

**Status:** To be registered as agent for runSubagent tool

**Expertise:** Item Response Theory (IRT), psychometrics, ML calibration, educational assessment

**Primary Skills:**
- **Skill 10: Psychometrician & IRT Data Engineer**
  - Expert in 2-Parameter Logistic (2PL) IRT models and Maximum Likelihood Estimation (MLE)
  - Proficient in calculating learner ability ($\theta$) and item difficulty ($b$) parameters
  - Designs item bank calibration pipelines for 500+ items per subject
  - Implements the "Gap-Probe Cascade" logic for foundational knowledge identification
  - Masters CAPS grade-level alignment and subject-specific assessment strategies
  - Handles item discrimination analysis and difficulty distributions
  - Implements adaptive testing algorithms based on IRT parameters

**Critical Context:**
The diagnostic engine is the "brain" of EduBoost. It must accurately identify learner gaps and cascade down to foundational levels when $\theta < -1.5$. The item bank must be calibrated against a nationally representative sample.

**Use When:**
- Ingesting and validating new item bank data (500+ items per subject)
- Calibrating IRT parameters using historical learner response data
- Implementing the Gap-Probe Cascade to identify foundational gaps
- Analyzing item difficulty distributions and discrimination indices
- Refining ability estimation algorithms
- Ensuring CAPS alignment across assessment items

**Example Prompt to Psychometric Engineer:**
> "Ingest the Mathematics Grade 3 item bank (500 items) and run IRT calibration using MLE. Calculate 2PL parameters for each item. Implement the Gap-Probe Cascade: when learner $\theta$ falls below -1.5, automatically probe the previous grade level. Validate CAPS alignment for all items. Generate discrimination and difficulty reports."

---

## 6. EduBoost Backend Specialist (EXISTING)

**Status:** Already registered as an available agent

**Expertise:** FastAPI endpoints, SQLAlchemy models, pytest tests, alembic migrations, API services

**Primary Skills:**
- General backend development using FastAPI
- SQLAlchemy ORM and database model design
- Unit and integration testing with pytest
- Alembic-driven database migrations
- API service implementation (gamification, parent portal, diagnostic testing, study plans)

**Use When:**
- Implementing general FastAPI endpoints
- Building SQLAlchemy model layers
- Writing pytest unit/integration tests for backend services
- Managing standard database migrations

**Difference from Backend Architect:**
- Backend Specialist: General CRUD endpoints, model design, standard testing
- Backend Architect: Async refactoring, LLM orchestration, Celery async tasks, complex concurrency patterns

---

## 7. Impact Delivery Agent (EXISTING)

**Status:** Already registered as an available agent

**Expertise:** Phase 1-4 improvements, 21-item backlog management, feature coordination

**Primary Skills:**
- Implementing Phase 1-4 feature improvements (bugs, pipeline completion, optimization, pedagogical hardening)
- Managing the 21-item improvement backlog
- Coordinating feature implementation across multiple subsystems
- Dependency tracking and release planning

**Use When:**
- Executing planned improvement epics from Phases 1-4
- Managing the improvement backlog and prioritization
- Coordinating cross-functional feature work
- Updating dependency tracking

---

## 8. Phase 0 Executor (EXISTING)

**Status:** Already registered as an available agent

**Expertise:** Safety, architecture truth, critical fixes, TDD execution

**Primary Skills:**
- Phase 0 tasks: safety, architecture truth, critical bug fixes
- Test-Driven Development (TDD) loop execution
- Roadmap checkbox updates
- Progress synchronization across markdown files

**Use When:**
- Executing critical safety fixes or architectural corrections
- Running the TDD loop for feature implementation
- Updating roadmap and progress tracking files

---

## 🚀 Usage Patterns & Routing

### When to Use Each Agent

**Backend Architect:**
```
Situation: Slow API response times, JSONDecodeError 500 errors, LLM orchestration needed, async task queue setup
Decision: Route to Backend Architect
```

**Infrastructure & Data Engineer:**
```
Situation: Message broker migration, database schema changes, k8s scaling, observability dashboards
Decision: Route to Infrastructure & Data Engineer
```

**Frontend PWA Specialist:**
```
Situation: Offline lesson delivery, Service Worker caching, React hydration issues, load-shedding resilience
Decision: Route to Frontend PWA Specialist
```

**Security & Compliance Officer:**
```
Situation: Guardian JWT validation, POPIA compliance audit, Zero-PII architecture, learner data deletion
Decision: Route to Security & Compliance Officer
```

**Psychometric Systems Engineer:**
```
Situation: IRT calibration, item bank ingestion, gap probe cascade, CAPS alignment validation
Decision: Route to Psychometric Systems Engineer
```

**Backend Specialist:**
```
Situation: Standard endpoint implementation, model design, typical testing, standard migrations
Decision: Route to Backend Specialist (or escalate to Backend Architect if async/complex)
```

**Impact Delivery Agent:**
```
Situation: Phase 1-4 improvement epics, multi-feature coordination, backlog execution
Decision: Route to Impact Delivery Agent
```

**Phase 0 Executor:**
```
Situation: Critical fixes, architecture truth, TDD loop, safety hardening
Decision: Route to Phase 0 Executor
```

---

## 🔄 Coordination Patterns

### Pattern 1: Multi-Skill Epic (e.g., "Implement offline-first diagnostic test")
1. **Frontend PWA Specialist** — Designs offline caching and sync queue
2. **Backend Architect** — Ensures async API endpoint support for batch uploads
3. **Infrastructure & Data Engineer** — Ensures message broker can handle offline sync bursts
4. **Psychometric Systems Engineer** — Validates IRT scoring doesn't degrade in offline mode

### Pattern 2: POPIA Compliance Hardening
1. **Security & Compliance Officer** — Audits all sensitive endpoints
2. **Backend Architect** — Implements structured logging for audit trail
3. **Infrastructure & Data Engineer** — Ensures Fourth Estate immutability and durability
4. **Phase 0 Executor** — Tracks and checksums changes against architecture truth

### Pattern 3: Diagnostic Engine Calibration
1. **Psychometric Systems Engineer** — Runs IRT calibration on item bank
2. **Backend Architect** — Implements async calibration job as Celery task
3. **Infrastructure & Data Engineer** — Scales infrastructure to handle historical data processing

---

## 📋 Agent Registration Commands

To register these agents with the runSubagent tool, use the following:

```bash
# These are conceptual registrations; execute in your environment setup script

register_agent \
  --name "EduBoost Backend Architect" \
  --description "Expert in async FastAPI, LLM orchestration, and Celery task queues. Refactors blocking I/O, implements structured LLM outputs, and optimizes background job execution." \
  --skills "Async Python, FastAPI, LLM orchestration, Celery, prompt engineering, South African localization"

register_agent \
  --name "EduBoost Infrastructure & Data Engineer" \
  --description "Expert in durable messaging (RabbitMQ/Kafka), Alembic migrations, Kubernetes HPA, and observability. Ensures POPIA compliance and zero-loss auditing." \
  --skills "Message brokers, PostgreSQL, Alembic, Kubernetes, DevOps, SRE, POPIA compliance, Prometheus/Grafana"

register_agent \
  --name "EduBoost Frontend PWA Specialist" \
  --description "Expert in Next.js 14, React 18, Service Workers, IndexedDB, and offline-first architecture. Enables resilience against South African connectivity challenges." \
  --skills "Next.js, React 18, PWA, Service Workers, IndexedDB, offline sync, load-shedding resilience"

register_agent \
  --name "EduBoost Security & Compliance Officer" \
  --description "Expert in IAM, Guardian JWT validation, POPIA compliance, and Zero-PII architecture. Audits sensitive endpoints and manages learner data protection." \
  --skills "JAM, POPIA, JWT, cryptography, RBAC, Zero-PII, learner data protection"

register_agent \
  --name "EduBoost Psychometric Systems Engineer" \
  --description "Expert in 2PL IRT models, item bank calibration, MLE estimation, and the Gap-Probe Cascade. Ensures diagnostic accuracy and CAPS alignment." \
  --skills "IRT, psychometrics, 2PL model, MLE, item bank calibration, CAPS alignment, adaptive testing"
```

---

## 🎓 Expected Outcomes

When these agents are fully operationalized:

1. **Backend Architect** → Elimination of async I/O bottlenecks, 100% structured LLM output reliability
2. **Infrastructure & Data Engineer** → Zero-loss audit trail, sub-100ms observable SLO compliance
3. **Frontend PWA Specialist** → Learners can complete lessons during load-shedding; sync on network restore
4. **Security & Compliance Officer** → Full POPIA Section 24 compliance, Zero-PII across all endpoints
5. **Psychometric Systems Engineer** → 500+ calibrated items per subject, accurate foundational gap detection

---

## 📞 Questions & Escalation

- **Unsure which agent to use?** → See "Usage Patterns & Routing" section above
- **Multi-skill work?** → See "Coordination Patterns" section; multiple agents can collaborate
- **New capability needed?** → Update this file and re-register agents with runSubagent tool

