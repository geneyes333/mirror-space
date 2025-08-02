export function Card({ children, ...props }) {
  return <div style={{ background:'#232334', borderRadius: '1rem', boxShadow:'0 4px 24px #0004', marginBottom:'2rem' }} {...props}>{children}</div>;
}
export function CardContent({ children, ...props }) {
  return <div style={{ padding: '2rem' }} {...props}>{children}</div>;
}