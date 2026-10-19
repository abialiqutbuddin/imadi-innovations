export function DashboardIntro() {
  return (
    <section style={{ padding: '24px 28px', marginBottom: 28, border: '1px solid var(--theme-elevation-150)', borderRadius: 12, background: 'var(--theme-elevation-50)' }}>
      <p style={{ margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 11, opacity: .65 }}>Imadi Innovations · Website studio</p>
      <h2 style={{ margin: '0 0 12px', fontSize: 27 }}>Your next update starts here.</h2>
      <p style={{ maxWidth: 780, lineHeight: 1.7 }}>Edit a page to add, reorder, or hide its sections. Add a project, service, article, FAQ, or testimonial once, then select it anywhere on the website. Save a draft, open Preview, and publish when you are happy with it.</p>
      <div style={{ display: 'flex', gap: '12px 22px', flexWrap: 'wrap', marginTop: 18 }}>
        <a href="/admin/collections/pages">Edit website pages →</a>
        <a href="/admin/globals/site-settings">Brand, menus & contact →</a>
        <a href="/admin/collections/enquiries">Read enquiries →</a>
        <a href="/admin/globals/email-settings">Email settings →</a>
        <a href="/" target="_blank" rel="noreferrer">Open website ↗</a>
      </div>
      <p style={{ margin: '20px 0 0', fontSize: 12, opacity: .7 }}>Enquiries are stored in this admin inbox. Add only verified client quotes; drafts are private. Administrators can manage team access under Users.</p>
    </section>
  )
}
