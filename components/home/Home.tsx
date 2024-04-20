import Image from 'next/image'
import style from './Home.module.css'
import { Star } from '@material-ui/icons'
import Link from 'next/link'

const HomeMain = () => {
  return (
    <main className={style.main}>
      
      <div className={style.photo}>
      
      </div>
      <div className={style.header}>
     
      </div>
      <div className={style.container}>
       <div className={style.left}>
        <div>
          <h1>
          Byte Bushido  
        <br />
        
        <p>Forjando Guerreiros Digitais com Sabedoria Ancestral</p>
        
        </h1>
        <div className={style.buttons}>
        <Link className={style.login} href={'/login'}>Entrar</Link>
        <Link className={style.login} href={'https://youtube.com.br'}>Youtube</Link>
        <Link className={style.login} href={'/cursos'}>Tutoriais</Link>
        </div>
        <br />
        <Star className={style.icon} style={{ cursor: 'pointer' }} />
        <Star className={style.icon} style={{ cursor: 'pointer' }} />
        <Star className={style.icon} style={{ cursor: 'pointer' }} />
        <Star className={style.icon} style={{ cursor: 'pointer' }} />
        <Star className={style.icon} style={{ cursor: 'pointer' }} />
        </div>
        
       </div>
      
      </div>
    
    </main>
  )
}

export default HomeMain
