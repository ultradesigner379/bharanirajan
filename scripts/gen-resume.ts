// Generates a minimal valid placeholder resume PDF at public/resume.pdf.
import { writeFileSync, mkdirSync } from 'node:fs'

const offsets: number[] = []
let buf = '%PDF-1.4\n'

const push = (obj: number, body: string) => {
  offsets[obj] = buf.length
  buf += `${obj} 0 obj\n${body}\nendobj\n`
}

push(1, '<< /Type /Catalog /Pages 2 0 R >>')
push(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
push(
  3,
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
)

const content = [
  'BT /F1 26 Tf 72 710 Td (S. Bharani Rajan) Tj ET',
  'BT /F1 13 Tf 72 684 Td (Ultra Designer (UD) - 3D Animator, Graphic Designer & AI Enthusiast) Tj ET',
  'BT /F1 11 Tf 72 660 Td (Chennai, Tamil Nadu, India  |  +91 6369010630  |  bharanirajan360@gmail.com) Tj ET',
  'BT /F1 11 Tf 72 636 Td (This is a placeholder resume. Replace public/resume.pdf with the real file.) Tj ET',
].join('\n')
push(4, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`)
push(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')

const xrefStart = buf.length
buf += `xref\n0 ${offsets.length}\n0000000000 65535 f \n`
for (let i = 1; i < offsets.length; i++) {
  buf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n'
}
buf += `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

mkdirSync('public', { recursive: true })
writeFileSync('public/resume.pdf', buf, 'latin1')
console.log('Wrote public/resume.pdf', buf.length, 'bytes')
