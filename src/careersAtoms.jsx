// ─── Careers design tokens + form atoms ──────────────────────────────────────
// The hex values and small controls the Figma careers frames use, named once so
// the careers page, the job pages and the shared application form cannot drift.

export const G      = '#34cc32'
export const DARK   = '#000718'
export const CARD   = '#0f1520'
export const MUTED  = 'rgba(255,255,255,0.7)'
export const DIM    = '#666a74'
export const BORDER = 'rgba(255,255,255,0.1)'

export const BtnGreen = ({ children, style, ...p }) => (
  <button {...p} className="btn-outline" style={{
    background: 'transparent', color: '#fff', border: '1px solid #fff',
    height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif",
    fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.02em', cursor: 'pointer', backdropFilter: 'blur(10px)', ...style,
  }}>{children}</button>
)

export const BtnOutline = ({ children, style, ...p }) => (
  <button {...p} className="btn-outline" style={{
    background: 'transparent', color: G,
    border: `1px solid ${G}`,
    height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif",
    fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.02em', cursor: 'pointer', ...style,
  }}>{children}</button>
)

export const InputField = ({ label, style, ...p }) => (
  <input
    className="input-glow"
    placeholder={label}
    {...p}
    style={{
      flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
      // minHeight: when the row stacks to a column on mobile, flex: 1's zero
      // basis would otherwise collapse the field to its text height.
      height: 46, minHeight: 46, minWidth: 0, padding: '0 15px', color: '#fff',
      fontFamily: "'Archivo', sans-serif", fontSize: 16,
      outline: 'none', boxSizing: 'border-box', ...style,
    }}
  />
)
