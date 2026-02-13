// src/components/Loading/Loading.jsx

import styles from './Loading.module.css'
import LoadingIcon from '../../../public/logo.png'
const Loading = () => {
  return (
    <main className={styles.container}>
      <img src={LoadingIcon} alt='Moodly Happy Face' />
    </main>
  )
}

export default Loading
