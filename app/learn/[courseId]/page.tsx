'use client';

import Link from 'next/link';
import { ArrowLeft, CalendarDays, PlayCircle, Radio } from 'lucide-react';
import { useEffect, useState } from 'react';

type Lesson = { title: string; description?: string; videoUrl?: string; isPreview: boolean };
type Course = { title: string; description?: string; lessons: Lesson[]; liveSessions: { title: string; description?: string; startsAt: string; roomUrl?: string; status: string }[]; creatorId?: { name?: string; igUsername?: string } };

function youtubeEmbedUrl(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.hostname === 'youtu.be') return `https://www.youtube.com/embed/${url.pathname.slice(1).split('/')[0]}`;
    if (url.hostname.endsWith('youtube.com')) {
      const id = url.searchParams.get('v') || url.pathname.match(/\/embed\/([^/]+)/)?.[1] || url.pathname.match(/\/shorts\/([^/]+)/)?.[1];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
  } catch { return null; }
  return null;
}

function LessonMedia({ lesson }: { lesson: Lesson }) {
  if (!lesson.videoUrl) return null;
  const embedUrl = youtubeEmbedUrl(lesson.videoUrl);
  if (embedUrl) return <div className="mt-4 aspect-video max-h-[520px] overflow-hidden rounded-2xl bg-black"><iframe className="h-full w-full" src={embedUrl} title={lesson.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
  return <div className="mt-4 flex min-h-[220px] max-h-[560px] justify-center overflow-hidden rounded-2xl bg-black"><video className="h-auto max-h-[560px] w-auto max-w-full object-contain" controls playsInline preload="metadata"><source src={lesson.videoUrl} /></video></div>;
}

export default function CourseLearningPage({ params }: { params: Promise<{ courseId: string }> }) {
  const [course, setCourse] = useState<Course | null>(null); const [error, setError] = useState('');
  useEffect(() => { params.then(({ courseId }) => { const token = localStorage.getItem('token'); fetch(`/api/academy/student/courses/${courseId}`, { headers: { Authorization: `Bearer ${token || ''}` } }).then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.message); setCourse(data.data.course); }).catch((caught) => setError(caught instanceof Error ? caught.message : 'Unable to load course.')); }); }, [params]);
  if (error) return <main className="grid min-h-screen place-items-center p-6 text-center"><div><h1 className="text-2xl font-black">{error}</h1><Link href="/learn" className="mt-4 inline-block text-orange-600">Back to learning space</Link></div></main>;
  if (!course) return <div className="grid min-h-screen place-items-center text-zinc-500">Loading course…</div>;
  return <main className="min-h-screen bg-[#fbf8f5] px-4 py-10 text-zinc-900"><div className="mx-auto max-w-5xl"><Link href="/learn" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500"><ArrowLeft size={15} /> Your learning space</Link><header className="mt-8 rounded-3xl bg-zinc-900 p-7 text-white"><p className="text-xs font-bold uppercase tracking-[.18em] text-orange-300">{course.creatorId?.name || `@${course.creatorId?.igUsername || 'Creator'}`}</p><h1 className="mt-3 text-4xl font-black">{course.title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">{course.description}</p></header><section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]"><div className="space-y-3"><h2 className="text-xl font-black">Course lessons</h2>{course.lessons.map((lesson, index) => <article key={`${lesson.title}-${index}`} className="rounded-2xl border border-orange-100 bg-white p-5"><div className="flex items-start gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-100 text-sm font-black text-orange-700">{index + 1}</span><div className="flex-1"><h3 className="font-bold">{lesson.title}</h3>{lesson.description && <p className="mt-1 text-sm text-zinc-500">{lesson.description}</p>}<LessonMedia lesson={lesson} />{lesson.videoUrl && !youtubeEmbedUrl(lesson.videoUrl) && <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-orange-600"><PlayCircle size={15} /> Open lesson link</a>}</div></div></article>)}</div><aside className="space-y-4"><div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5"><div className="flex items-center gap-2 font-black"><Radio size={17} className="text-cyan-700" /> Live classes</div>{course.liveSessions.length === 0 ? <p className="mt-3 text-sm text-zinc-500">No live sessions scheduled.</p> : <div className="mt-4 space-y-3">{course.liveSessions.map((session, index) => <div key={`${session.title}-${index}`} className="rounded-xl bg-white p-3"><div className="font-bold">{session.title}</div><div className="mt-1 flex items-center gap-1 text-xs text-zinc-500"><CalendarDays size={13} />{new Date(session.startsAt).toLocaleString()}</div>{session.roomUrl && <a href={session.roomUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-cyan-700 px-3 py-2 text-xs font-bold text-white">Join live room</a>}</div>)}</div>}</div></aside></section></div></main>;
}
