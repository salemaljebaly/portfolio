import certificationsAr from '@/data/certifications.ar.json';
import certificationsEn from '@/data/certifications.en.json';
import projectsAr from '@/data/projects.ar.json';
import projectsEn from '@/data/projects.en.json';
import timelineAr from '@/data/timeline.ar.json';
import timelineEn from '@/data/timeline.en.json';

export function loadProjects(locale: string) {
  return locale === 'ar' ? projectsAr.projects : projectsEn.projects;
}

export function loadCertifications(locale: string) {
  return locale === 'ar' ? certificationsAr.certifications : certificationsEn.certifications;
}

export function loadTimeline(locale: string) {
  return locale === 'ar' ? timelineAr.timeline : timelineEn.timeline;
} 