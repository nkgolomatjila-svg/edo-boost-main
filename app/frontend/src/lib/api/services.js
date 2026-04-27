import { fetchApi } from "./client";

export const AuthService = {
  registerLearner: (data) =>
    fetchApi("/learners/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  registerGuardian: (data) =>
    fetchApi("/auth/guardian/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  loginGuardian: (data) =>
    fetchApi("/auth/guardian/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export const LearnerService = {
  getProfile: (learnerId) => fetchApi(`/learners/${learnerId}`),
  
  getGamificationProfile: (learnerId) => 
    fetchApi(`/gamification/learner/${learnerId}/profile`),

  getStudyPlan: (learnerId) => fetchApi(`/study-plans/${learnerId}`),
};

export const ParentService = {
  getLinkedLearners: () => fetchApi("/auth/guardian/linked-learners"),
  
  linkLearner: (learnerId, relationship) =>
    fetchApi("/auth/guardian/link-learner", {
      method: "POST",
      body: JSON.stringify({ learner_id: learnerId, relationship }),
    }),
    
  getReport: (learnerId) => fetchApi(`/parent/learner/${learnerId}/report`),
};
