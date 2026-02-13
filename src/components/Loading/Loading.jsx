

import styles from './Loading.module.css'
import LoadingIcon from '../../assets/logo.png'
const Loading = () => {
  return (
    <main className={styles.container}>
      <img src={LoadingIcon} alt='Moodly Happy Face' />
    </main>
  )
}

export default Loading
