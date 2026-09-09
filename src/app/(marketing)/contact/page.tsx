import React from 'react';
import { Metadata } from 'next';
import { ContactContainer } from '@/features/marketing/containers/ContactContainer';

export const metadata: Metadata = {
  title: 'Contact Support & Sales — Kollabary',
  description: 'Get in touch with Kollabary support and enterprise sales team. 24/7 helpdesk, email support, and partnership inquiry response.',
};

export default function ContactPage() {
  return <ContactContainer />;
}
