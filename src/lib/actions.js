'use server'

// Contact-form server action. Validation happens here so it also covers
// clients with JS disabled.
// TODO: wire real delivery (email / CRM / sheet) — submissions currently only
// reach the server log.
export async function submitContact(prevState, formData) {
  const data = {
    name: (formData.get('name') || '').toString().trim(),
    phone: (formData.get('phone') || '').toString().trim(),
    company: (formData.get('company') || '').toString().trim(),
    designation: (formData.get('designation') || '').toString().trim(),
    email: (formData.get('email') || '').toString().trim(),
    requirements: (formData.get('requirements') || '').toString().trim(),
  }

  // Errors echo the submitted values back: React 19 resets the form after the
  // action runs, and the fields re-fill from these via defaultValue.
  if (!data.name || !data.email) {
    return { ok: false, error: 'Please fill in at least your name and email.', values: data }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: 'That email address doesn’t look right.', values: data }
  }

  console.log('[contact] submission:', JSON.stringify(data))
  return { ok: true }
}

// Reality-check quiz form (home + solutions). `context` is the quiz state —
// page, chosen answers, module — serialized to JSON by <AuditForm />.
export async function submitAudit(prevState, formData) {
  const data = {
    name: (formData.get('name') || '').toString().trim(),
    email: (formData.get('email') || '').toString().trim(),
    phone: (formData.get('phone') || '').toString().trim(),
    company: (formData.get('company') || '').toString().trim(),
    website: (formData.get('website') || '').toString().trim(),
    context: (formData.get('context') || '').toString(),
  }

  // Echo the typed fields (not the quiz context) so a failed submit keeps them.
  const values = { name: data.name, email: data.email, phone: data.phone, company: data.company, website: data.website }
  if (!data.name || !data.email || !data.company) {
    return { ok: false, error: 'Please fill in your name, email and company.', values }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: 'That email address doesn’t look right.', values }
  }

  console.log('[audit] submission:', JSON.stringify(data))
  // First name for the greeting; company labels the client's office in the
  // delivery scene (casing preserved exactly as typed).
  return { ok: true, name: data.name.split(/\s+/)[0], company: data.company }
}
