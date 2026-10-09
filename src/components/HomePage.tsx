import type { CSSProperties } from "react";
import { projectMedia } from "@/content/media";
import type { Dictionary } from "@/content/types";
import { PROFILE, asset } from "@/lib/site";
import { ContactForm, CopyEmailButton } from "./ContactForm";
import { Effects } from "./Effects";
import { Header } from "./Header";
import { Icon } from "./Icon";
import { JsonLd } from "./JsonLd";
import { ProjectShowcase } from "./ProjectShowcase";
import { Rich } from "./Rich";
import { Terminal } from "./Terminal";

const delay = (i: number) => ({ "--d": `${(i % 4) * 0.08}s` }) as CSSProperties;

export function HomePage({ dict }: { dict: Dictionary }) {
  const { hero, services, projects, ai, experience, process, why, stack, faq, contact, footer } = dict;
  const year = new Date().getFullYear();
  const numberFormat = new Intl.NumberFormat(dict.locale);
  const cvMain = dict.locale === "fr" ? PROFILE.cv.fr : PROFILE.cv.en;
  const cvOther = dict.locale === "fr" ? PROFILE.cv.en : PROFILE.cv.fr;

  return (
    <>
      <JsonLd dict={dict} />
      <a href="#main" className="skip-link">
        {dict.nav.skip}
      </a>
      <div className="bg-decor" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <Header dict={dict} />

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div>
              <div className="status rise">
                <span className="pulse" aria-hidden="true" />
                {hero.status}
              </div>
              <h1 className="rise" style={delay(1)}>
                {hero.titleBefore}
                <span className="grad">{hero.titleHighlight}</span>
                {hero.titleAfter}
              </h1>
              <p className="hero-lead rise" style={delay(2)}>
                <Rich text={hero.lead} />
              </p>
              <div className="hero-ctas rise" style={delay(3)}>
                <a href="#contact" className="btn btn-primary">
                  {hero.ctaPrimary}
                  <Icon name="arrow" />
                </a>
                <a href="#work" className="btn btn-ghost">
                  {hero.ctaSecondary}
                </a>
              </div>
              <div className="hero-meta rise" style={delay(4)}>
                {hero.meta.map((m) => (
                  <span key={m.text}>
                    <Icon name={m.icon} />
                    {m.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-visual rise" style={delay(2)}>
              <Terminal title={hero.terminalTitle} lines={hero.terminal} />
              <div className="profile-card">
                <div className="avatar">
                  <img src={asset(PROFILE.photo)} alt={PROFILE.name} width={56} height={56} />
                </div>
                <div>
                  <strong>{PROFILE.name}</strong>
                  <span>{hero.profileRole}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="stats">
              {dict.stats.map((s, i) => (
                <div className="stat reveal" style={delay(i)} key={s.label}>
                  <div className="stat-num">
                    {s.prefix}
                    <span data-count={s.value}>{numberFormat.format(s.value)}</span>
                    {s.suffix && <em>{s.suffix}</em>}
                  </div>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee">
            {[...dict.marquee, ...dict.marquee].map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>
        </div>

        {/* ---------- Services ---------- */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{services.eyebrow}</span>
              <h2>{services.title}</h2>
              <p>{services.text}</p>
            </div>
            <div className="services-grid">
              {services.items.map((s, i) => (
                <article className="card service reveal" style={delay(i)} key={s.title}>
                  <div className="service-icon">
                    <Icon name={s.icon} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <p className="ideal">
                    → <b>{s.ideal}</b>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Projects ---------- */}
        <section className="section" id="work">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{projects.eyebrow}</span>
              <h2>{projects.title}</h2>
              <p>{projects.text}</p>
            </div>
            <div className="projects">
              {projects.items.map((p) => (
                <article className="card project reveal" key={p.id} id={`project-${p.id}`}>
                  {projectMedia[p.id] ? (
                    <ProjectShowcase project={p} media={projectMedia[p.id]} locale={dict.locale} labels={projects.gallery} />
                  ) : (
                    <div className={`project-visual pv-${p.visual}`}>
                      <span className="pv-tag">{p.tag}</span>
                      <div className="pv-metric">
                        <strong>{p.metric}</strong>
                        <span>{p.metricLabel}</span>
                      </div>
                      <Icon name={p.icon} className="pv-icon" />
                    </div>
                  )}
                  <div className="project-body">
                    <div className="project-meta">
                      {p.meta.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.pitch}</p>
                    <ul className="project-points">
                      {p.points.map((pt) => (
                        <li key={pt}>
                          <Icon name="checkCircle" />
                          <span>
                            <Rich text={pt} />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="chips">
                      {p.stack.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {projectMedia[p.id]?.links && (
                      <div className="project-links">
                        {projectMedia[p.id].links!.map((link) => (
                          <a key={link.href} href={link.href} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
                            {link.label[dict.locale]}
                            <Icon name="external" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <h3 className="sr-only">{projects.moreTitle}</h3>
            <div className="more-projects">
              {projects.more.map((m, i) => (
                <div className="card mini reveal" style={delay(i)} key={m.title}>
                  <div className="service-icon">
                    <Icon name={m.icon} />
                  </div>
                  <div>
                    <h4>{m.title}</h4>
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- AI ---------- */}
        <section className="section" id="ai">
          <div className="container">
            <div className="ai-wrap reveal">
              <div className="ai-grid">
                <div className="section-head">
                  <span className="eyebrow">{ai.eyebrow}</span>
                  <h2>{ai.title}</h2>
                  <p>{ai.text}</p>
                  <ul className="ai-benefits">
                    {ai.benefits.map((b) => (
                      <li key={b}>
                        <Icon name="check" />
                        <span>
                          <Rich text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ol className="pipeline" aria-label={ai.title} style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {ai.steps.map((s, i) => (
                    <li className="pipe-step done reveal" style={delay(i)} key={s.title}>
                      <span className="pipe-num">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>{s.title}</strong>
                        <small>{s.detail}</small>
                      </div>
                      <span className="pipe-badge">{s.badge}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Experience ---------- */}
        <section className="section" id="experience">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{experience.eyebrow}</span>
              <h2>{experience.title}</h2>
              <p>{experience.text}</p>
            </div>
            <div className="timeline">
              {experience.jobs.map((job) => (
                <article className="card job reveal" key={job.company}>
                  <div className="job-date">
                    <b>{job.period}</b>
                    {job.duration}
                  </div>
                  <div>
                    <h3>
                      {job.company} <span>— {job.role}</span>
                    </h3>
                    <span className="job-sector">{job.sector}</span>
                    <ul>
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <div className="chips">
                      {job.stack.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Process ---------- */}
        <section className="section" id="process">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{process.eyebrow}</span>
              <h2>{process.title}</h2>
              <p>{process.text}</p>
            </div>
            <ol className="process" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {process.steps.map((s, i) => (
                <li className="card step reveal" style={delay(i)} key={s.title}>
                  <div className="step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="step-time">{s.time}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Why me ---------- */}
        <section className="section" id="why">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{why.eyebrow}</span>
              <h2>{why.title}</h2>
            </div>
            <div className="why-grid">
              {why.items.map((w, i) => (
                <div className="card why reveal" style={delay(i)} key={w.title}>
                  <div className="service-icon">
                    <Icon name={w.icon} />
                  </div>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Stack ---------- */}
        <section className="section" id="stack">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{stack.eyebrow}</span>
              <h2>{stack.title}</h2>
              <p>{stack.text}</p>
            </div>
            <div className="stack-grid">
              {stack.groups.map((g, i) => (
                <div className="card stack-group reveal" style={delay(i)} key={g.title}>
                  <h3>{g.title}</h3>
                  <div className="chips">
                    {g.key.map((t) => (
                      <span className="chip key" key={t}>
                        {t}
                      </span>
                    ))}
                    {g.other.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="section" id="faq">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">{faq.eyebrow}</span>
              <h2>{faq.title}</h2>
            </div>
            <div className="faq">
              {faq.items.map((item, i) => (
                <details className="reveal" style={delay(i)} key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section className="section" id="contact">
          <div className="container">
            <div className="contact-wrap reveal">
              <div className="contact-grid">
                <div className="contact-info">
                  <span className="eyebrow">{contact.eyebrow}</span>
                  <h2>{contact.title}</h2>
                  <p>{contact.text}</p>
                  <div className="contact-person">
                    <img src={asset(PROFILE.photo)} alt={PROFILE.name} width={64} height={64} loading="lazy" />
                    <div>
                      <strong>{PROFILE.name}</strong>
                      <span>
                        <span className="pulse" aria-hidden="true" />
                        {hero.status}
                      </span>
                    </div>
                  </div>
                  <div className="contact-links">
                    <div className="contact-link">
                      <a href={`mailto:${PROFILE.email}`} className="contact-main">
                        <span className="service-icon">
                          <Icon name="mail" />
                        </span>
                        <span>
                          <small>{contact.emailLabel}</small>
                          <span>{PROFILE.email}</span>
                        </span>
                      </a>
                      <CopyEmailButton label={contact.copy} done={contact.copied} />
                    </div>
                    <div className="contact-link">
                      <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="contact-main">
                        <span className="service-icon">
                          <Icon name="linkedin" />
                        </span>
                        <span>
                          <small>{contact.linkedinLabel}</small>
                          <span>jean-marie-andriatiana</span>
                        </span>
                      </a>
                    </div>
                    <div className="contact-link">
                      <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="contact-main">
                        <span className="service-icon">
                          <Icon name="github" />
                        </span>
                        <span>
                          <small>{contact.githubLabel}</small>
                          <span>github.com/spyle23</span>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="cv-links">
                    <a href={asset(cvMain)} className="btn btn-ghost btn-sm" download>
                      <Icon name="download" />
                      {contact.cvLabel}
                    </a>
                    <a href={asset(cvOther)} className="btn btn-ghost btn-sm" download>
                      {contact.cvOther}
                    </a>
                  </div>
                </div>
                <ContactForm form={contact.form} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            © {year} {PROFILE.name}. {footer.rights} {footer.built}
          </p>
          <div className="footer-links">
            <a className="icon-btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a className="icon-btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a className="icon-btn" href="#top" aria-label={footer.top}>
              <Icon name="arrowUp" />
            </a>
          </div>
        </div>
      </footer>

      <Effects locale={dict.locale} />
    </>
  );
}
