import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'Should I take out a loan to buy a car?',
    message: 'Should I take out a loan to buy a car?'
  },
  {
    heading: 'When should I get an umbrella policy?',
    message: 'When should I get an umbrella policy?'
  },
  {
    heading: 'My husband wants to finance a car. What should I do?',
    message: 'My husband wants to finance a car. What should I do?'
  },
  {
    heading: 'Is debt consolidation a good idea?',
    message: 'Is debt consolidation a good idea?'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
