export type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  businessProblem: string[];
  technicalSolution: string[];
  measurableResults: { value: string; label: string }[];
  timeline: { phase: string; title: string; detail: string }[];
  visualization: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "aws-hetzner-migration",
    title: "AWS to Hetzner Migration",
    summary:
      "A business-critical migration that reduced infrastructure cost by more than 90% and implemented automated disaster recovery with RTO under 30 minutes.",
    businessProblem: [
      "AWS monthly cost had reached an unsustainable level and created direct financial pressure.",
      "Disaster recovery readiness was not strong enough for business continuity requirements.",
    ],
    technicalSolution: [
      "Rebuilt infrastructure with Infrastructure as Code for repeatability and risk control.",
      "Migrated workloads to Kubernetes on Hetzner.",
      "Implemented CI/CD automation for build, test, and deployment.",
      "Automated daily and weekly backups with validated restore workflows.",
      "Added monitoring and alerting to increase deployment confidence and reliability.",
    ],
    measurableResults: [
      { value: ">90%", label: "Infrastructure cost reduction" },
      { value: "< 30 min", label: "Tested disaster recovery RTO" },
      { value: "Daily + Weekly", label: "Automated backup schedules" },
    ],
    timeline: [
      {
        phase: "Phase 1",
        title: "Cost & Architecture Audit",
        detail:
          "Analyzed billing drivers, service dependencies, and risk constraints.",
      },
      {
        phase: "Phase 2",
        title: "Infrastructure as Code Rewrite",
        detail:
          "Rebuilt environment provisioning with reproducible infrastructure definitions.",
      },
      {
        phase: "Phase 3",
        title: "Kubernetes Migration on Hetzner",
        detail:
          "Migrated services with controlled rollout and rollback strategies.",
      },
      {
        phase: "Phase 4",
        title: "Backup & Recovery Automation",
        detail: "Implemented scheduled backups and tested recovery workflows.",
      },
      {
        phase: "Phase 5",
        title: "Operational Hardening",
        detail:
          "Added CI/CD quality gates, observability, and operational runbooks.",
      },
    ],
    visualization:
      "AWS Cost Pressure → Infra Audit → IaC Rewrite → Kubernetes on Hetzner → CI/CD + Monitoring → Backup/Restore Automation",
  },
];

export function getCaseStudies() {
  return caseStudies;
}

export function getCaseStudyById(id: string) {
  return caseStudies.find((study) => study.id === id);
}
