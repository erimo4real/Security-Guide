export default function Note({ type = 'info', icon, title, children }) {
  return (
    <div className={`note n-${type}`}>
      <span className="note-ico">{icon}</span>
      <div>
        <b>{title}</b>
        {children}
      </div>
    </div>
  )
}
