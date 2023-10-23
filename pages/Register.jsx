import Image from 'next/image'
import WebHeader from '@/components/WebHeader'
import WebFooter from '@/components/WebFooter'
import RegisterForm from '@/components/RegisterForm'
import WebHeader1 from '@/components/WebHeader1'

export default function Register() {
  
  return (
    <div className="w-full h-full">
    <WebHeader1/>
    <main className="w-full h-[70vh] mb-20 flex justify-center items-center py-[0rem] px-3">
      <RegisterForm/>
    </main>
    <WebFooter/>
    </div>
  )
}
