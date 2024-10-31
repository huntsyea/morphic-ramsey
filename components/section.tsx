'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import {
  Check,
  Copy,
  BookCheck,
  Film,
  Image,
  MessageCircleMore,
  Newspaper,
  Repeat2,
  Search
} from 'lucide-react'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'

interface SectionProps {
  children: ReactNode
  title?: string
  className?: string
  separator?: boolean
  size?: 'sm' | 'md' | 'lg'
  content?: string
}

export function Section({
  children,
  title,
  className,
  separator = false,
  size = 'md',
  content
}: SectionProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const iconSize = 16
  const iconClassName = 'mr-1.5 text-muted-foreground'

  let icon: ReactNode
  switch (title) {
    case 'Images':
      icon = <Image size={iconSize} className={iconClassName} />
      break
    case 'Videos':
      icon = <Film size={iconSize} className={iconClassName} />
      break
    case 'Sources':
      icon = <Newspaper size={iconSize} className={iconClassName} />
      break
    case 'Answer':
      icon = <BookCheck size={iconSize} className={iconClassName} />
      break
    case 'Related':
      icon = <Repeat2 size={iconSize} className={iconClassName} />
      break
    case 'Follow-up':
      icon = <MessageCircleMore size={iconSize} className={iconClassName} />
      break
    default:
      icon = <Search size={iconSize} className={iconClassName} />
  }

  const handleCopy = () => {
    if (content) {
      copyToClipboard(content)
    }
  }

  return (
    <>
      {separator && <Separator className="my-2 bg-primary/10" />}
      <section
        className={cn(
          `${size === 'sm' ? 'py-1' : size === 'lg' ? 'py-4' : 'py-2'}`,
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between py-2">
            <h2 className="flex items-center leading-none">
              {icon}
              {title}
            </h2>
            {content && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy content</span>
              </Button>
            )}
          </div>
        )}
        {children}
      </section>
    </>
  )
}
