import type { ContactBlock } from '@/lib/sanity/types';
import { ContactForm } from './ContactForm';

export function Contact({ block }: { block: ContactBlock }) {
  const {
    headline,
    description,
    submitLabel = 'Send message',
    successMessage = 'Thanks! We will be in touch soon.',
    fields = ['name', 'email', 'message'],
  } = block;

  return (
    <div className="container-wide py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        {(headline || description) && (
          <div className="mb-10 text-center">
            {headline && (
              <h2 className="text-3xl font-medium md:text-4xl">{headline}</h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        <ContactForm
          fields={fields}
          submitLabel={submitLabel}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
}
