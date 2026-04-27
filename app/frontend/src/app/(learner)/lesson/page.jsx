"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLearner } from "../../../context/LearnerContext";
import { LearnerService } from "../../../lib/api/services";
import { SUBJECTS, LESSON_TOPICS } from "../../../components/eduboost/constants";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";

export default function LessonPage() {
  const { learner, setLearner, setBadge } = useLearner();
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [lessonData, setLessonData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGenerate = async () => {
    if (!subject || !topic) return;
    
    setLoading(true);
    setError("");
    setLessonData(null);
    
    try {
      const selectedSubject = SUBJECTS.find(s => s.code === subject);
      const res = await LearnerService.generateLesson({
        learner_id: learner.learner_id,
        grade: learner.grade,
        subject_code: subject,
        subject_label: selectedSubject?.label,
        topic: topic,
        home_language: learner.language || "English",
      });
      
      setLessonData(res.lesson || res);
    } catch (err) {
      console.error("Lesson generation error:", err);
      setError("Failed to generate lesson. Our AI is taking a quick nap, please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const xpAmount = 35;
      await LearnerService.awardXP({
        learner_id: learner.learner_id,
        xp_amount: xpAmount,
        event_type: "lesson_completed",
        lesson_id: lessonData?.id || null
      });

      setLearner(prev => ({ ...prev, xp: (prev.xp || 0) + xpAmount }));
      setBadge(`You earned ${xpAmount} XP! 🌟`);
      router.push("/dashboard");
    } catch (err) {
      console.error("Award XP error:", err);
      // Fallback for demo purposes
      setLearner(prev => ({ ...prev, xp: (prev.xp || 0) + 35 }));
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (lessonData) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
        <Button variant="secondary" onClick={() => setLessonData(null)} className="mb-6">
          ← Choose Another Topic
        </Button>
        
        <Card className="p-8 md:p-12 border-none bg-white shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl">📖</div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: SUBJECTS.find(s => s.code === subject)?.color }}
              >
                {subject}
              </span>
              <span className="text-[var(--muted)] text-sm font-medium">Grade {learner.grade} Lesson</span>
            </div>

            <h1 className="text-4xl font-['Baloo_2'] font-bold text-gray-800 mb-8 leading-tight">
              {lessonData.title}
            </h1>

            <div className="prose prose-blue max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/50 rounded-r-xl">
                {lessonData.summary || "Get ready to explore this exciting topic together!"}
              </p>
              
              <div className="mt-8 space-y-6 text-gray-700 text-lg leading-relaxed">
                {/* Simulated lesson content - in real app, we'd render the structured data */}
                <p>Welcome to your lesson on <strong>{topic}</strong>. Today we are going to learn how this works and why it's important for your Grade {learner.grade} studies.</p>
                <p>Did you know that {topic} is used every day in South Africa? For example, when you go to the store or talk with your friends, you're using these skills!</p>
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-100 p-8 rounded-2xl text-center shadow-inner">
              <h3 className="text-2xl font-bold text-orange-700 mb-4">Ready to finish?</h3>
              <p className="text-orange-600 mb-8 font-medium">Complete this lesson to earn 35 XP and boost your level!</p>
              <Button onClick={handleComplete} disabled={loading} className="px-12 py-4 text-xl shadow-lg shadow-orange-500/30">
                {loading ? <LoadingSpinner size="sm" /> : "🌟 Finish Lesson & Get XP!"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-['Baloo_2'] font-bold text-[var(--text)] mb-2">
          📖 What do you want to learn today?
        </h1>
        <p className="text-[var(--muted)] font-medium">
          Pick a subject and a topic to start your AI-powered adventure.
        </p>
      </header>

      {error && <ErrorMessage message={error} className="mb-8" />}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Subject Selection */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest mb-4">1. Choose Subject</h2>
          {SUBJECTS.map((s) => (
            <button
              key={s.code}
              onClick={() => { setSubject(s.code); setTopic(""); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                subject === s.code 
                  ? "bg-white border-[var(--gold)] shadow-lg scale-[1.02]" 
                  : "bg-transparent border-transparent hover:bg-white/50"
              }`}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
                style={{ backgroundColor: `${s.color}20`, color: s.color }}
              >
                {s.icon}
              </div>
              <span className={`font-bold ${subject === s.code ? "text-gray-800" : "text-[var(--muted)]"}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Topic Selection */}
        <div className="lg:col-span-3">
          <Card className="p-8 border-none bg-white/60 backdrop-blur min-h-[400px] flex flex-col">
            <h2 className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest mb-6">
              {subject ? `2. Select a Topic for ${SUBJECTS.find(s => s.code === subject)?.label}` : "2. Select a Subject first"}
            </h2>

            {!subject ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <div className="text-6xl mb-4">👈</div>
                <p className="font-bold">Select a subject from the list to see available topics.</p>
              </div>
            ) : (
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(LESSON_TOPICS[subject] || []).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                        topic === t
                          ? "bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]"
                          : "bg-white border-gray-100 text-gray-700 hover:border-blue-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">{t}</span>
                        {topic === t && <span className="text-xl">✨</span>}
                      </div>
                      <p className={`text-sm mt-2 ${topic === t ? "text-blue-100" : "text-gray-400"}`}>
                        Interactive Grade {learner.grade} lesson with AI tutor.
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-medium text-gray-500 italic">
                {topic ? `Ready to start learning about ${topic}! 🎉` : "Select a topic to continue..."}
              </div>
              <Button 
                disabled={!subject || !topic || loading} 
                onClick={handleGenerate}
                className="px-12 py-4 shadow-lg shadow-blue-600/20"
              >
                {loading ? <LoadingSpinner size="sm" /> : "🚀 Start Adventure"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
