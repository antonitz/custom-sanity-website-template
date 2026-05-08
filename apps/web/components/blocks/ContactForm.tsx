'use client';

import { useState } from 'react';
import { submitContactForm } from '@/app/actions/contact';

type FieldName = 'name' | 'email' | 'phone' | 'company' | 'message';

type Props = {
  fields: FieldName[];
  submitLabel: string;
  successMessage: string;
};

const labels: Record<FieldName, string> = {
  name: 'Your name',
  email: 'Email',
  phone: 'Phone',
  company: 'Company',
  message: 'Message',
};

export function ContactForm({ fields, submitLabel, successMessage }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      e.currentTarget.reset();
    } else {
      setStatus('error');
      setError(result.error || 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-border bg-muted p-8 text-center">
        <p className="text-lg">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field — bots fill this, humans don't see it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />

      {fields.map((field) => {
        const isMessage = field === 'message';
        const isRequired = field === 'name' || field === 'email' || field === 'message';
        const inputType =
          field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text';

        return (
          <div key={field}>
            <label
              htmlFor={field}
              className="mb-1.5 block text-sm font-medium"
            >
              {labels[field]}
              {isRequired && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            {isMessage ? (
              <textarea
                id={field}
                name={field}
                required={isRequired}
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            ) : (
              <input
                id={field}
                name={field}
                type={inputType}
                required={isRequired}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            )}
          </div>
        );
      })}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : submitLabel}
      </button>
    </form>
  );
}
