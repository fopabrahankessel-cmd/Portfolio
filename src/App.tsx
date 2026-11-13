import { techIcons } from '@/components/icons/techIcons'
import { Chip } from '@/components/ui/Chip'
import type { TechId } from '@/content/types'

export default function App() {
  return (
    <div className="flex flex-wrap gap-3 p-10">
      {(Object.keys(techIcons) as TechId[]).map((id) => (
        <span key={id} className="scale-150 p-4"><Chip techId={id} /></span>
      ))}
    </div>
  )
}
