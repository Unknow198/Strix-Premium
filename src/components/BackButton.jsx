import { useNavigate } from 'react-router-dom'

export default function BackButton({ to }) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="nature-button-secondary"
    >
      Back
    </button>
  )
}
