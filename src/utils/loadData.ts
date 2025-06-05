import certificationsAr from '@/data/certifications.ar.json';
import certificationsEn from '@/data/certifications.en.json';
import projectsAr from '@/data/projects.ar.json';
import projectsEn from '@/data/projects.en.json';

export function loadProjects(locale: string) {
  return locale === 'ar' ? projectsAr.projects : projectsEn.projects;
}

export function loadCertifications(locale: string) {
  return locale === 'ar' ? certificationsAr.certifications : certificationsEn.certifications;
} 