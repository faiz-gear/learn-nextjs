import { photos } from '@/app/data'

export default function PhotoPage({ params: { id } }) {
  const photo = photos.find((photo) => photo.id === id)

  return <img style={{ width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} src={photo.src} />
}
