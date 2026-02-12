import Link from "next/link";

export default function CaseStudyPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto border rounded-2xl bg-card p-8 sm:p-10">
          <p className="text-sm uppercase tracking-wide text-primary font-medium mb-3">
            Featured Case Study
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            AWS to Hetzner Migration
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Re-architected platform infrastructure with IaC and Kubernetes to
            reduce monthly cloud cost by <b>more than 90%</b> while implementing
            an automated disaster recovery workflow with{" "}
            <b>RTO under 30 minutes</b>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-lg border p-4 bg-background">
              <p className="text-3xl font-bold text-primary">&gt;90%</p>
              <p className="text-sm text-muted-foreground">Cost Reduction</p>
            </div>
            <div className="rounded-lg border p-4 bg-background">
              <p className="text-3xl font-bold text-primary">&lt; 30 min</p>
              <p className="text-sm text-muted-foreground">
                Disaster Recovery RTO
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-background">
              <p className="text-3xl font-bold text-primary">Daily + Weekly</p>
              <p className="text-sm text-muted-foreground">Automated Backups</p>
            </div>
          </div>
          <Link
            href="/case-study"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Read Full Case Study
          </Link>
        </div>
      </div>
    </section>
  );
}
