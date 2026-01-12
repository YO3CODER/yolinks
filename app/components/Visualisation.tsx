import { SocialLink } from '@prisma/client'
import React from 'react'
import Avatar from './Avatar'
import LinkComponent from './LinkComponent'
import EmptyState from './EmptyState'

interface VisualisationProps {
    socialLinks: SocialLink[]
    pseudo: string
    theme: string
}

const truncateLink = (url: string, maxLenght = 20) => {
    return url.length > maxLenght
        ? url.substring(0, maxLenght) + '...'
        : url
}

const Visualisation: React.FC<VisualisationProps> = ({
    socialLinks,
    pseudo,
    theme,
}) => {
    const activeLinks = socialLinks.filter(link => link.active)
    const url = `/page/${pseudo}`

    return (
        <div className="mockup-browser bg-base-200 hidden md:block">
            <div className="mockup-browser-toolbar">
                <div className="input">
                    <span className="text-sm">
                        {truncateLink(url)}
                    </span>
                </div>
            </div>

            <div
                data-theme={theme}
                className="h-full bg-base-100 flex flex-col items-center justify-center space-y-4 p-5"
            >
                <Avatar pseudo={pseudo} />

                <div className="w-full max-w-sm">
                    {activeLinks.length > 0 ? (
                        <div className="w-full space-y-2">
                            {activeLinks.map((link) => (
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
                                IconComponent="Cable"
                                message="Aucun lien disponible 😭"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Visualisation
