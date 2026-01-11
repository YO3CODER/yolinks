"use client"
import Avatar from '@/app/components/Avatar'
import EmptyState from '@/app/components/EmptyState'
import LinkComponent from '@/app/components/LinkComponent'
import Logo from '@/app/components/Logo'
import { getSocialLinks, getUserInfo } from '@/app/server'
import { SocialLink } from '@prisma/client'
import { LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
 
const page = ({params} : {params: Promise <{pseudo : string}>}) => {
    const [pseudo , setPseudo ] = useState<string | null | undefined>(null)
    const [loading , setLoading] = useState<boolean>(true)
    const [links , setLinks] = useState<SocialLink[]>([])
    const [theme , setTheme] = useState<string | null | undefined> (null)
     
    const resolvedParamsAndFetchData = async () => {
        try{
            const resolvedParams = await params ; 
            setPseudo(resolvedParams.pseudo)

            const userInfo = await getUserInfo(resolvedParams.pseudo)
            if(userInfo){
                setPseudo(userInfo.pseudo)
                setTheme(userInfo.theme)
                document.documentElement.setAttribute(
                    "data-theme",
                    userInfo.theme || "retro"
                )
            }

            const fetcheLinks = await getSocialLinks(resolvedParams.pseudo)
            if(fetcheLinks){
                setLinks(fetcheLinks)
            }

            setLoading(false)
        } catch (error){
            toast.error("Cette page n'existe pas ! ")
            setLoading(false)
        }
    }

    useEffect(() =>{
        resolvedParamsAndFetchData()
    }, [params])

    

    return (
        <div className='p-8'>
           <div className='flex flex-col items-center space-y-4'> 
            <Logo/>
            {pseudo ? (
                <div className="flex flex-col items-center space-y-4">
                    <Avatar pseudo={pseudo} />
                   <div className='flex space-x-4 justify-center'> 
                     <Link 
                     href='/sign-up'
                     className="btn btn-sm ">
                     
                     <UserPlus className='w-4 h-4'/>
                     <span>Creer votre page</span>
                     </Link>
                     <Link 
                     href ="/sign-in"
                     className='btn btn-sm'>
                        <LogIn className='w-4 h-4' />
                        <span>Gérer vos liens </span>
                     </Link>
                    </div> 
                    <div className="w-full max-w-sm mx-auto">
                        {loading ? (
                            <div className='my-30 flex justify-center items-center w-full'>
                                <span className='loading loading-spinner loading-lg text-accent'></span>
                            </div>
                        ):
                        links.length > 0 ? (
                            <div className="w-full space-y-2">
                                {links.map((link) => (
                                    <LinkComponent
                                        key={link.id}
                                        socialLink={link}
                                        readonly={true}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center w-full">
                                <EmptyState
                                    IconComponent="Link"
                                    message="Aucun lien disponible 😭"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center p-4 rounded-3xl">
  <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl">
    <h1 className="text-4xl md:text-6xl font-extrabold text-error mb-4 animate-bounce">
      404
    </h1>
    <p className="text-lg md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
      Page non trouvée
    </p>
    <p className="mt-2 text-gray-500 dark:text-gray-400">
      Désolé, la page que vous recherchez n'existe pas.
    </p>
  </div>
</div>

            )}
        </div>
        </div> 
    )
}

export default page