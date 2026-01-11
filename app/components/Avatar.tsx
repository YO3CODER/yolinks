import React, { useEffect, useState } from 'react'

interface AvatarProps {
    pseudo: string
}

const couleurs = [
    'from-pink-500 via-purple-500 to-indigo-500',
    'from-green-400 via-emerald-500 to-teal-500',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-cyan-400 via-sky-500 to-blue-600',
    'from-fuchsia-500 via-rose-500 to-red-500',
]

const Avatar: React.FC<AvatarProps> = ({ pseudo }) => {
    const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${pseudo}`
    const [indexCouleur, setIndexCouleur] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexCouleur((prev) => (prev + 1) % couleurs.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className={`w-24 rounded-full p-1 bg-linear-to-r transition-all duration-700 ${couleurs[indexCouleur]}`}
            >
                <div className="rounded-full bg-base-100">
                    <img
                        src={avatarUrl}
                        alt={`Avatar de ${pseudo}`}
                        className="w-24 rounded-full"
                    />
                </div>
            </div>

            <p className="font-semibold text-center">
                @{pseudo}🔥
            </p>
        </div>
    )
}

export default Avatar
